import fs from 'node:fs/promises'
import chalk from 'chalk'
import { createStore, WaClient } from 'zapo-js'
import { createFileStore } from './store.js'
import { loadConfig } from '../funcoes/config.js'
import { loadNecessarios } from '../funcoes/necessarios.js'
import { loadState, importNecessarios, boasVindasEnviada, marcarBoasVindas, auroraCriador } from '../funcoes/banco.js'
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
import { destino, destinoCliente } from '../funcoes/avisoCompra.js'
import { textoBoasVindas } from '../funcoes/boasVindas.js'
import { criarLoggerZapo } from '../funcoes/registro.js'

const restartCode = 75
let desligando = false

const sessionId = 'aurora'
const digits = (value = '') => String(value).replace(/\D/g, '')

// Número do WhatsApp deste bot, guardado junto da sessão a cada conexão. Se a
// sessão cair e o config não tiver connection.number (o config.json do Git só
// tem o modelo), o código de pareamento sai com este número.
const ARQUIVO_NUMERO = 'sistema/dados/sessao/numero-conectado.txt'
async function numeroSalvo() {
try { return digits(await fs.readFile(ARQUIVO_NUMERO, 'utf8')) } catch { return '' }
}
async function salvarNumero(numero) {
if (!digits(numero)) return
try { await fs.writeFile(ARQUIVO_NUMERO, digits(numero) + '\n', 'utf8') } catch {}
}

// Registro de cada resposta: quando o grupo diz que o bot não respondeu, o
// log mostra se o WhatsApp aceitou, recusou (ack com erro) ou travou o envio.
function registrarEnvios(client) {
const box = client?.message
if (!box || typeof box.send !== 'function') return
const original = box.send.bind(box)
box.send = async (jid, content, options) => {
const tipo = typeof content === 'string' ? 'text' : String(content?.type || Object.keys(content || {})[0] || '?')
if (tipo === 'reaction' || tipo === 'revoke' || jid === 'status@broadcast') return original(jid, content, options)
const inicio = Date.now()
const lento = setTimeout(() => console.warn('[ AURORA ENVIO ] WhatsApp ainda não confirmou', tipo, 'para', jid, 'depois de 30 s'), 30_000)
try {
const r = await original(jid, content, options)
const erro = r?.ack?.error
console[erro ? 'warn' : 'log']('[ AURORA ENVIO ]', tipo, 'para', jid, erro ? `RECUSADO pelo WhatsApp (erro ${erro})` : 'ok', 'em', Date.now() - inicio, 'ms', r?.attempts > 1 ? `(${r.attempts} tentativas)` : '')
return r
} catch (err) {
console.error('[ AURORA ENVIO ] Falhou', tipo, 'para', jid, 'depois de', Date.now() - inicio, 'ms:', err?.message || err)
throw err
} finally {
clearTimeout(lento)
}
}
}

export async function startAurora() {
const config = await loadConfig()
const flags = await loadNecessarios()
await loadState()
importNecessarios(flags)
const registry = await loadPlugins()
await fs.mkdir('sistema/dados/sessao', { recursive: true })

// Avisos do Zapo legíveis e sem enxurrada (sistema/funcoes/registro.js).
const logger = criarLoggerZapo()
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
registrarEnvios(client)

let pairingRequested = false
let pairingShown = false
let avisouSemNumero = false
let semNumero = false

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

// O WhatsApp limita pedidos de código (429 rate-overlimit). Pedir de novo a
// cada 20 s mantém o limite ativo pra sempre: espera 15 min, depois 30, até 1 h.
let pausaCodigoAte = 0
let pausasCodigo = 0
let avisouPausa = 0
const requestCode = async () => {
if (pairingRequested) return
if (Date.now() < pausaCodigoAte) {
if (Date.now() - avisouPausa > 5 * 60_000) {
avisouPausa = Date.now()
console.warn(`[ AURORA CONEXÃO ] O WhatsApp limitou os pedidos de código de conexão. Tento de novo às ${new Date(pausaCodigoAte).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })}.`)
}
return
}
pairingRequested = true
const number = digits(config.connection?.number)
|| digits(String(client.getCredentials?.()?.meJid || '').split(/[:@]/)[0])
|| await numeroSalvo()
if (!number) {
pairingRequested = false
// Uma vez só: o Zapo pede o código de novo a cada tentativa de conexão.
if (!avisouSemNumero) {
avisouSemNumero = true
console.error(chalk.redBright('[ ERRO ] O WhatsApp deste bot está desconectado e falta o número dele para gerar o código de conexão. Defina AURORA_CONNECTION_NUMBER (ou connection.number em sistema/dados/config.user.json).'))
}
// Sem sessão e sem número não há o que tentar: o Zapo ficaria abrindo o
// socket a cada ~3 min só para cair ("websocket runtime error"). O bot da
// casa fica parado (os das clientes seguem) até ter o número.
if (!modoCliente && !semNumero) {
semNumero = true
console.warn('[ AURORA ] Bot principal parado até ter o número; os bots das clientes continuam.')
// Espera o connect() inicial terminar (prazo de 15 s): desconectar no meio
// dele faria o index.js reiniciar o bot em loop.
setTimeout(() => { client.disconnect?.().catch(() => {}) }, 20_000).unref?.()
}
return
}
try {
const code = await client.auth.requestPairingCode(number)
showPairingCode(code)
pausasCodigo = 0
} catch (err) {
pairingRequested = false
const msg = String(err?.message ?? err)
if (/429|rate-?overlimit/i.test(msg)) {
const minutos = Math.min(60, 15 * 2 ** pausasCodigo)
pausasCodigo++
pausaCodigoAte = Date.now() + minutos * 60_000
avisouPausa = Date.now()
console.error(chalk.redBright(`[ ERRO ] O WhatsApp limitou os pedidos de código de conexão (429). Vou esperar ${minutos} min antes de pedir outro; não reinicie o app nesse meio tempo.`))
return
}
console.error(chalk.redBright('[ ERRO ] Não foi possível gerar o código de pareamento.'), msg)
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
// AVISOS DE VENDA: quem busca a fila no site é o launcher; ele pede pelo canal
// interno (IPC) que o bot conectado no número fixo mande cada aviso. Vale pro
// bot da casa e pro bot de cliente (o dono pode ter alugado um pro número fixo).
const avisarLauncher = (msg) => { if (typeof process.send === 'function') try { process.send(msg) } catch {} }
if (typeof process.send === 'function') {
process.on('message', async (msg) => {
if (msg?.tipo === 'aurora_criador') { if (msg.numero) auroraCriador(msg.numero); return }
if (msg?.tipo !== 'aviso_venda') return
const responder = (r) => avisarLauncher({ tipo: 'aviso_venda_ok', id: msg.id, ...r })
if (!connectionOpen) return responder({ ok: false, erro: 'WhatsApp desconectado' })
try {
const para = String(msg.para || '').replace(/\D/g, '')
// aviso de entrega pro cliente: número sem WhatsApp volta como tal (o site tira da fila)
const jid = msg.cliente ? await destinoCliente(client, para) : await destino(client, para)
if (!jid) return responder({ ok: false, sem_whatsapp: true, erro: 'esse número não tem WhatsApp' })
await client.message.send(jid, { type: 'text', text: String(msg.texto || '') }, { semMarca: true })
responder({ ok: true })
} catch (err) { responder({ ok: false, erro: String(err?.message || err) }) }
})
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
console.log('[ AURORA CONEXÃO ] WhatsApp conectado', quedas ? `(voltou depois de ${quedas} queda(s))` : '')
connectionOpen = true
quedas = 0
limparTimers()
const eu = String(client.getCredentials?.()?.meJid || '').split(/[:@]/)[0]
void salvarNumero(eu)
if (modoCliente) {
avisarGerente({ tipo: 'conectado', numero: eu })
void enviarBoasVindas()
} else avisarLauncher({ tipo: 'conectado', numero: eu })
showConnected()
aluguelWorker.start()
return
}
if (event?.isLogout) {
console.error('[ AURORA ] WhatsApp encerrou a sessão (logout). Verifique o pareamento.')
avisarGerente({ tipo: 'desconectado' })
if (!modoCliente) avisarLauncher({ tipo: 'desconectado' })
aluguelWorker.stop()
setTimeout(() => process.exit(0), 500)
return
}
if (status !== 'close' && status !== 'closed') return
connectionOpen = false
aluguelWorker.stop()
const reason = String(event?.reason || event?.code || event?.error?.message || '')
// Desligamento pedido pelo próprio bot (SIGTERM): não reconecta.
if (reason === 'client_disconnected' && (desligando || semNumero)) return
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
  if (isPossibleCommand) console.log('[ AURORA RECEBIMENTO ] id:', event?.key?.id || '-', '| grupo:', event?.key?.remoteJid || '-', '| comando:', String(rawText).trim().split(/\s+/)[0])
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
