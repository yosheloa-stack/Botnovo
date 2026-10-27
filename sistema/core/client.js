import fs from 'node:fs/promises'
import chalk from 'chalk'
import { createPinoLogger, createStore, WaClient } from 'zapo-js'
import { createFileStore } from './store.js'
import { loadConfig } from '../funcoes/config.js'
import { loadNecessarios } from '../funcoes/necessarios.js'
import { loadState, importNecessarios, boasVindasEnviada, marcarBoasVindas } from '../funcoes/banco.js'
import { loadPlugins } from './loader.js'
import { createHandler } from './handler.js'
import { createGroupHandler } from './eventos.js'
import { createOutgoingX9Tracker, createProtocolX9Handler, createInteractionX9Handler, createGroupX9Handler, createCallX9Handler, createUnavailableX9Handler } from '../funcoes/x9.js'
import { showConnected, showPairing, showStart } from '../funcoes/terminal.js'
import { runHora } from '../funcoes/hora.js'
import { installCanalGlobal } from '../funcoes/canal.js'
import { createAluguelWorker } from '../funcoes/aluguel.js'
import { installMarcaAluguel } from '../funcoes/marcaAluguel.js'
import { avisarGerente, marcaCliente, modoCliente } from '../funcoes/cliente.js'
import { destino } from '../funcoes/avisoCompra.js'
import { textoBoasVindas } from '../funcoes/boasVindas.js'

const restartCode = 75
let desligando = false

// Logger do Zapo sem enxurrada: o mesmo aviso (ex.: 'socket open failed'
// durante uma queda de rede) aparece no máximo uma vez por minuto, com quantas
// vezes se repetiu.
function semEnxurrada(base, vistos = new Map()) {
const filtrar = (nivel) => (message, context) => {
const agora = Date.now()
const visto = vistos.get(message)
if (visto && agora - visto.ultimo < 60_000) { visto.repetidas++; return }
if (vistos.size > 300) vistos.clear()
vistos.set(message, { ultimo: agora, repetidas: 0 })
base[nivel](message, visto?.repetidas ? { ...(context || {}), repetidas: visto.repetidas } : context)
}
return {
get level() { return base.level },
trace: (message, context) => base.trace(message, context),
debug: (message, context) => base.debug(message, context),
info: (message, context) => base.info(message, context),
warn: filtrar('warn'),
error: filtrar('error'),
child: (bindings, options) => semEnxurrada(base.child(bindings, options), vistos)
}
}
const sessionId = 'aurora'
const digits = (value = '') => String(value).replace(/\D/g, '')

export async function startAurora() {
const config = await loadConfig()
const flags = await loadNecessarios()
await loadState()
importNecessarios(flags)
const registry = await loadPlugins()
await fs.mkdir('sistema/dados/sessao', { recursive: true })

const logger = semEnxurrada(await createPinoLogger({ level: 'warn', pretty: false }))
const store = createStore({
backends: { file: createFileStore('sistema/dados/sessao') },
providers: {
auth: 'file', signal: 'file', preKey: 'file', session: 'file', identity: 'file',
senderKey: 'file', appState: 'file', privacyToken: 'file',
messages: 'none', threads: 'none', contacts: 'none'
}
})

let media
try {
const { createMediaProcessor } = await import('@zapo-js/media-utils')
media = {
processor: createMediaProcessor(),
generateThumbnail: true,
generateProbe: true,
generateWaveform: false,
normalizeVoiceNote: false
}
} catch {}

const client = new WaClient({
store,
sessionId,
...(media ? { media } : {}),
history: { enabled: false },
addons: { autoDecrypt: true, persistAllSecrets: true },
connectTimeoutMs: 15_000,
nodeQueryTimeoutMs: 30_000
}, logger)

// rgchannel global: injeta o canal no ponto final de todo envio visível.
installCanalGlobal(client, config)
// Grupo alugado: troca nome, criador e site da casa pela marca do cliente.
installMarcaAluguel(client)

let pairingRequested = false
let pairingShown = false

const showPairingCode = (code) => {
if (!code || pairingShown) return
pairingShown = true
showPairing(code)
// Bot da cliente: o código aparece pra ela no site ("Configurar meu bot").
avisarGerente({ tipo: 'codigo', codigo: String(code) })
if (modoCliente) {
// Ela tem 10 minutos para digitar o código; depois o bot desliga e espera
// ela pedir um código novo no site (não fica pedindo código sem parar).
setTimeout(() => {
if (connectionOpen) return
avisarGerente({ tipo: 'codigo_expirou' })
console.warn('[ AURORA CLIENTE ] O código de conexão não foi usado em 10 minutos.')
process.exit(0)
}, 10 * 60_000).unref?.()
}
}

const requestCode = async () => {
if (pairingRequested) return
pairingRequested = true
const number = digits(config.connection?.number)
if (!number) {
pairingRequested = false
console.error(chalk.redBright('[ ERRO ] Configure connection.number no config.json.'))
return
}
try {
const code = await client.auth.requestPairingCode(number)
showPairingCode(code)
} catch (err) {
pairingRequested = false
console.error(chalk.redBright('[ ERRO ] Não foi possível gerar o código de pareamento.'), err?.message ?? err)
}
}

client.on('auth_pairing_required', requestCode)
client.on('auth_qr', requestCode) // fallback: nunca exibe o QR
client.on('auth_pairing_code', ({ code }) => showPairingCode(code))

// O bot da cliente não busca aluguéis nem avisos de compra no site: isso é
// só do bot da casa.
const aluguelWorker = modoCliente ? { start() {}, stop() {}, onGroupEvent: async () => {} } : createAluguelWorker({ client, config })

// CONEXÃO COM O WHATSAPP.
// Queda de rede o próprio Zapo resolve sozinho (reabre o socket a cada 2 s,
// sem evento). O evento 'close' só vem quando o WhatsApp encerra a sessão
// (erro de stream etc.) e aí o Zapo NÃO reconecta: antes o bot esperava 15 s
// e reiniciava o processo inteiro. Agora reconecta aqui mesmo em 5 s; só
// reinicia o processo se em 45 s a conexão não voltar.
let connectionOpen = false
let reconnectTimer = null
let restartTimer = null
let quedas = 0
const limparTimers = () => {
if (reconnectTimer) clearTimeout(reconnectTimer)
if (restartTimer) clearTimeout(restartTimer)
reconnectTimer = restartTimer = null
}
const MOTIVOS = {
stream_error_replaced: 'outra conexão abriu com esta mesma sessão (o bot está rodando em dois lugares?)',
failure_banned: 'o WhatsApp bloqueou este número',
failure_locked: 'o WhatsApp travou esta conta temporariamente',
failure_service_unavailable: 'o WhatsApp está fora do ar',
failure_client_too_old: 'a versão do Zapo ficou velha para o WhatsApp'
}
client.on('connection', (event) => {
const status = String(event?.status || '')
if (status === 'open') {
console.log('[ AURORA CONEXÃO ] WhatsApp conectado', new Date().toISOString(), quedas ? `(voltou depois de ${quedas} queda(s))` : '')
connectionOpen = true
quedas = 0
limparTimers()
if (modoCliente) {
const eu = String(client.getCredentials?.()?.meJid || '').split(/[:@]/)[0]
avisarGerente({ tipo: 'conectado', numero: eu })
void enviarBoasVindas()
}
showConnected()
aluguelWorker.start()
return
}
if (event?.isLogout) {
console.error('[ AURORA ] WhatsApp encerrou a sessão (logout). Verifique o pareamento.')
avisarGerente({ tipo: 'desconectado' })
aluguelWorker.stop()
setTimeout(() => process.exit(0), 500)
return
}
if (status !== 'close' && status !== 'closed') return
connectionOpen = false
aluguelWorker.stop()
const reason = String(event?.reason || event?.code || event?.error?.message || '')
// Desligamento pedido pelo próprio bot (SIGTERM): não reconecta.
if (reason === 'client_disconnected' && desligando) return
if (reconnectTimer || restartTimer) return
quedas++
console.warn('[ AURORA CONEXÃO ] WhatsApp fechou a conexão:', reason || 'sem motivo', MOTIVOS[reason] ? `— ${MOTIVOS[reason]}` : '')
// Sessão aberta em outro lugar / número bloqueado: reconectar na hora só
// derrubaria a outra ponta de novo. Espera bem mais antes de tentar.
const espera = reason === 'stream_error_force_login' ? 0 : reason === 'stream_error_replaced' ? 60_000 : /^failure_(banned|locked)$/.test(reason) ? 10 * 60_000 : 5_000
// "force_login" o próprio Zapo já reconecta; aqui só fica o prazo de 45 s.
const zapoReconecta = reason === 'stream_error_force_login'
reconnectTimer = setTimeout(() => {
reconnectTimer = null
if (connectionOpen) return
if (!zapoReconecta) {
console.log('[ AURORA CONEXÃO ] Reconectando...')
client.connect().catch((err) => console.warn('[ AURORA CONEXÃO ] Reconexão falhou:', err?.message || err))
}
restartTimer = setTimeout(() => {
restartTimer = null
if (!connectionOpen) {
console.warn('[ AURORA CONEXÃO ] A conexão não voltou em 45 s; reiniciando o bot.')
process.exit(restartCode)
}
}, 45_000)
restartTimer.unref?.()
}, espera)
reconnectTimer.unref?.()
})

client.on('stream_failure', (event) => console.error(chalk.redBright('[ ERRO ] Falha no stream:'), event))
client.on('message_send', createOutgoingX9Tracker())
const handleMessage = createHandler({ client, config, registry })
client.on('message', (event) => {
  const rawText = event?.message?.conversation || event?.message?.extendedTextMessage?.text || event?.message?.imageMessage?.caption || event?.message?.buttonsResponseMessage?.selectedButtonId || event?.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ''
  const isPossibleCommand = /^[!/\.]/.test(String(rawText).trim())
  if (isPossibleCommand) console.log('[ AURORA RECEBIMENTO ]', new Date().toISOString(), '| id:', event?.key?.id || '-', '| grupo:', event?.key?.remoteJid || '-', '| comando:', String(rawText).trim().split(/\s+/)[0])
  void Promise.resolve().then(() => handleMessage(event)).catch((err) => {
    console.error('[ AURORA ] Erro isolado no processamento da mensagem:', err?.message || err)
  })
})
client.on('message_protocol', createProtocolX9Handler({ client }))
client.on('message_addon', createInteractionX9Handler({ client }))
client.on('message_unavailable', createUnavailableX9Handler({ client }))
client.on('group', (event) => {
  void aluguelWorker.onGroupEvent(event).catch((err) => {
    console.error('[ AURORA ALUGUEL ] Erro ao tratar evento de participantes:', err?.message || err)
  })
})
client.on('group', createGroupHandler({ client, config, necesarios: flags }))
client.on('group', createGroupX9Handler({ client }))
client.on('call', createCallX9Handler({ client }))

// X9 de leitura removido: receipt/read não gera mais mensagens e não causa flood.
// Horários de grupo são checados a cada 1s. O lock evita duas execuções simultâneas
// caso o WhatsApp demore para confirmar abertura/fechamento.
let horaRodando = false
const horaTick = async () => {
if (horaRodando) return
horaRodando = true
try { await runHora(client, config) } catch {}
finally { horaRodando = false }
}
const horaTimer = setInterval(() => { void horaTick() }, 1_000)
horaTimer.unref?.()

// BOT DA CLIENTE: um dia antes de vencer, avisa a dona no privado (com o link
// de renovação, o único lugar onde o site aparece); vencido, avisa e desliga.
let avisoVence = ''
const conferirValidade = async () => {
const marca = marcaCliente()
const ate = Date.parse(marca?.expira || '')
if (!connectionOpen || !marca?.dono || !Number.isFinite(ate)) return
const falta = ate - Date.now()
const link = String(config?.autoSystem?.url || '').replace(/\/$/, '') + '/aluguel-bot'
const t = {
pt: [`⏳ Seu bot *${marca.nome}* vence em menos de 1 dia.\n\n• Renove em: ${link}\n• Use o mesmo número do bot: grupos e configurações continuam.`, `⛔ O aluguel do seu bot *${marca.nome}* venceu e ele foi desligado.\n\n• Renove em: ${link}`],
es: [`⏳ Tu bot *${marca.nome}* vence en menos de 1 día.\n\n• Renueva en: ${link}\n• Usa el mismo número del bot: grupos y ajustes se mantienen.`, `⛔ El alquiler de tu bot *${marca.nome}* venció y fue apagado.\n\n• Renueva en: ${link}`],
en: [`⏳ Your bot *${marca.nome}* expires in less than 1 day.\n\n• Renew at: ${link}\n• Use the same bot number: groups and settings stay.`, `⛔ Your bot *${marca.nome}* rental has expired and it was turned off.\n\n• Renew at: ${link}`]
}[marca.idioma] || []
const enviar = async (text) => client.message.send(await destino(client, marca.dono), { type: 'text', text }, { semMarca: true }).catch(() => {})
if (falta <= 0) {
await enviar(t[1])
console.warn('[ AURORA CLIENTE ] Aluguel vencido; desligando.')
avisarGerente({ tipo: 'vencido' })
setTimeout(() => process.exit(0), 1500)
} else if (falta < 86_400_000 && avisoVence !== marca.expira) {
avisoVence = marca.expira
await enviar(t[0])
}
}
if (modoCliente) setInterval(() => { void conferirValidade() }, 10 * 60_000).unref?.()

// Primeira conexão (ou dona nova): manda no privado dela o passo a passo do
// menu dono. Já vem no idioma dela, por isso vai sem tradução nem marca.
async function enviarBoasVindas() {
const marca = marcaCliente()
if (!marca?.dono || boasVindasEnviada(marca.dono)) return
await new Promise(r => setTimeout(r, 4000))
if (!connectionOpen) return
try {
await client.message.send(await destino(client, marca.dono), { type: 'text', text: textoBoasVindas(marca, config?.prefix) }, { semMarca: true })
marcarBoasVindas(marca.dono)
console.log('[ AURORA CLIENTE ] Boas-vindas enviadas no privado da dona.')
} catch (err) { console.warn('[ AURORA CLIENTE ] Não consegui mandar as boas-vindas:', err?.message || err) }
}

const shutdown = async () => {
desligando = true
limparTimers()
clearInterval(horaTimer)
aluguelWorker.stop()
try { if (typeof client?.disconnect === 'function') await client.disconnect() } catch {}
try { if (typeof store?.destroy === 'function') await store.destroy() } catch {}
process.exit(0)
}
process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)

showStart()
await client.connect()
}
