import fs from 'node:fs/promises'
import chalk from 'chalk'
import { createPinoLogger, createStore, WaClient } from 'zapo-js'
import { createFileStore } from './store.js'
import { loadConfig } from '../funcoes/config.js'
import { loadNecessarios } from '../funcoes/necessarios.js'
import { loadState, importNecessarios } from '../funcoes/banco.js'
import { loadPlugins } from './loader.js'
import { createHandler } from './handler.js'
import { uniqueIncoming } from './protecaoFluxo.js'
import { createGroupHandler } from './eventos.js'
import { createOutgoingX9Tracker, createProtocolX9Handler, createInteractionX9Handler, createGroupX9Handler, createCallX9Handler, createUnavailableX9Handler } from '../funcoes/x9.js'
import { showConnected, showPairing, showStart } from '../funcoes/terminal.js'
import { runHora } from '../funcoes/hora.js'
import { installCanalGlobal } from '../funcoes/canal.js'
import { createAluguelWorker } from '../funcoes/aluguel.js'

const restartCode = 75
const sessionId = 'aurora'
const digits = (value = '') => String(value).replace(/\D/g, '')

export async function startAurora() {
const config = await loadConfig()
const flags = await loadNecessarios()
await loadState()
importNecessarios(flags)
const registry = await loadPlugins()
await fs.mkdir('sistema/dados/sessao', { recursive: true })

const logger = await createPinoLogger({ level: 'warn', pretty: false })
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

let pairingRequested = false
let pairingShown = false

const showPairingCode = (code) => {
if (!code || pairingShown) return
pairingShown = true
showPairing(code)
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

const aluguelWorker = createAluguelWorker({ client, config })

let connectionOpen = false
let reconnectTimer = null
client.on('connection', (event) => {
const status = String(event?.status || '')
if (status === 'open') {
console.log('[ AURORA CONEXÃO ] WhatsApp conectado', new Date().toISOString())
connectionOpen = true
if (reconnectTimer) clearTimeout(reconnectTimer)
reconnectTimer = null
showConnected()
aluguelWorker.start()
return
}
if (event?.isLogout) {
console.error('[ AURORA ] WhatsApp encerrou a sessão (logout). Verifique o pareamento.')
aluguelWorker.stop()
setTimeout(() => process.exit(0), 500)
return
}
if (status === 'close' || status === 'closed') {
connectionOpen = false
aluguelWorker.stop()
console.warn('[ AURORA ] Conexão WhatsApp fechada:', JSON.stringify({ status, reason: event?.reason || event?.code || event?.error?.message || null }))
if (reconnectTimer) return
// Evita reiniciar por uma oscilação transitória que o cliente consiga recuperar.
reconnectTimer = setTimeout(() => {
reconnectTimer = null
if (!connectionOpen) process.exit(restartCode)
}, 15_000)
reconnectTimer.unref?.()
}
})

client.on('stream_failure', (event) => console.error(chalk.redBright('[ ERRO ] Falha no stream:'), event))
client.on('message_send', createOutgoingX9Tracker())
const handleMessage = createHandler({ client, config, registry })
client.on('message', (event) => {
  const rawText = event?.message?.conversation || event?.message?.extendedTextMessage?.text || event?.message?.imageMessage?.caption || ''
  const isPossibleCommand = /^[!/\.]/.test(String(rawText).trim())
  if (isPossibleCommand) console.log('[ AURORA RECEBIMENTO ]', new Date().toISOString(), '| id:', event?.key?.id || '-', '| grupo:', event?.key?.remoteJid || '-', '| comando:', String(rawText).trim().split(/\s+/)[0])
  if (!uniqueIncoming(event)) {
    if (isPossibleCommand) console.warn('[ AURORA RECEBIMENTO ] evento duplicado ignorado:', event?.key?.id || '-')
    return
  }
  void Promise.resolve().then(() => handleMessage(event)).catch((err) => {
    console.error('[ AURORA ] Erro isolado no processamento da mensagem:', err?.message || err)
  })
})
client.on('message_protocol', createProtocolX9Handler({ client }))
client.on('message_addon', createInteractionX9Handler({ client }))
client.on('message_unavailable', createUnavailableX9Handler({ client }))
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

const shutdown = async () => {
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
