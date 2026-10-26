import fs from 'node:fs/promises'
import { openAsBlob } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { quotedInfo, unwrapMessage } from '../../funcoes/mensagem.js'
import { collectUrls } from '../../funcoes/midia.js'

const LIMITE_MB = 100
const LIMITE = LIMITE_MB * 1024 * 1024
const TEMPO_UPLOAD = 120_000

// Ordem de envio: PussyBox primeiro. Se ele falhar, Catbox (link fixo) e,
// por último, Litterbox (link que some depois de 72 horas).
const HOSTS = [
{ nome: 'PussyBox', url: 'https://pussybox.moe/user/api.php', campo: 'fileToUpload', extras: { reqtype: 'fileupload' } },
{ nome: 'Catbox', url: 'https://catbox.moe/user/api.php', campo: 'fileToUpload', extras: { reqtype: 'fileupload' } },
{ nome: 'Litterbox', url: 'https://litterbox.catbox.moe/resources/internals/api.php', campo: 'fileToUpload', extras: { reqtype: 'fileupload', time: '72h' }, expira: '72 horas' }
]

const TIPOS = [
['imageMessage', 'foto', 'image/jpeg'],
['videoMessage', 'video', 'video/mp4'],
['ptvMessage', 'video', 'video/mp4'],
['audioMessage', 'audio', 'audio/ogg'],
['documentMessage', 'arquivo', 'application/octet-stream'],
['stickerMessage', 'figurinha', 'image/webp']
]

const EXT = {
'image/jpeg': 'jpg',
'image/png': 'png',
'image/webp': 'webp',
'image/gif': 'gif',
'video/mp4': 'mp4',
'video/3gpp': '3gp',
'video/webm': 'webm',
'audio/ogg': 'ogg',
'audio/mpeg': 'mp3',
'audio/mp4': 'm4a',
'audio/aac': 'aac',
'application/pdf': 'pdf',
'application/zip': 'zip',
'application/x-zip-compressed': 'zip',
'application/x-rar-compressed': 'rar',
'application/vnd.rar': 'rar',
'application/x-7z-compressed': '7z',
'application/vnd.android.package-archive': 'apk',
'text/plain': 'txt'
}

function numero(valor) {
if (typeof valor === 'bigint') return Number(valor)
if (typeof valor?.toNumber === 'function') return valor.toNumber()
return Number(valor || 0)
}

function extDe(mimetype, padrao = 'bin') {
const mime = String(mimetype || '').split(';')[0].trim().toLowerCase()
return EXT[mime] || /^[a-z]+\/([a-z0-9]{2,5})$/.exec(mime)?.[1] || padrao
}

function nomeSeguro(nome, mimetype) {
const limpo = String(nome || '').replace(/[\\/:*?"<>|\r\n]/g, '').trim().slice(0, 90)
if (!limpo) return `aurora-${Date.now()}.${extDe(mimetype)}`
return /\.[a-z0-9]{1,5}$/i.test(limpo) ? limpo : `${limpo}.${extDe(mimetype)}`
}

function midiaDe(message) {
const m = unwrapMessage(message)
if (!m) return null
for (const [chave, tipo, mimePadrao] of TIPOS) {
const node = m[chave]
if (!node) continue
const mimetype = String(node.mimetype || mimePadrao)
return {
tipo,
mimetype,
tamanho: numero(node.fileLength),
nome: nomeSeguro(node.fileName, mimetype)
}
}
return null
}

function textoDe(message) {
const m = unwrapMessage(message)
return String(m?.conversation ?? m?.extendedTextMessage?.text ?? '').trim()
}

function tamanhoTexto(bytes) {
if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
if (bytes >= 1024) return `${Math.ceil(bytes / 1024)} KB`
return `${bytes} bytes`
}

function linkDaResposta(texto) {
if (/^https?:\/\/\S+$/i.test(texto)) return texto
try {
const urls = collectUrls(JSON.parse(texto))
return (urls.find((x) => /url|link|file/i.test(x.trail)) || urls[0])?.url || ''
} catch {
return ''
}
}

async function enviarPara(host, arquivo, nome, mimetype) {
const form = new FormData()
for (const [chave, valor] of Object.entries(host.extras || {})) form.append(chave, valor)
// openAsBlob lê do disco aos poucos: um vídeo de 100 MB não vai inteiro pra RAM.
form.append(host.campo, await openAsBlob(arquivo, { type: mimetype }), nome)

const res = await fetch(host.url, {
method: 'POST',
body: form,
headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36' },
signal: AbortSignal.timeout(TEMPO_UPLOAD)
})
const texto = (await res.text()).trim()
if (!res.ok) throw new Error(`HTTP ${res.status} ${texto.slice(0, 80)}`)
const link = linkDaResposta(texto)
if (!link) throw new Error(texto.slice(0, 120) || 'resposta vazia')
return link
}

async function subir(arquivo, nome, mimetype) {
const falhas = []
for (const host of HOSTS) {
try {
return { host, link: await enviarPara(host, arquivo, nome, mimetype) }
} catch (err) {
falhas.push(`${host.nome}: ${err?.message || err}`)
console.error('[ UPLOAD ]', host.nome, err?.message || err)
}
}
throw new Error(falhas.join(' | '))
}

export default {name: 'upload',aliases: ['imgpralink', 'tourl', 'uploadlink'],category: 'download',description: 'Sobe foto, vídeo, áudio, PDF, ZIP ou qualquer arquivo e devolve o link',async run(system){
const quoted = quotedInfo(system.event)
const midiaMarcada = quoted ? midiaDe(quoted.message) : null
const midiaAtual = midiaDe(system.event?.message)
const info = midiaMarcada || midiaAtual
// Zapo aceita o Proto.IMessage cru da mensagem marcada (mesmo jeito do #fig).
const source = midiaMarcada ? quoted.message : system.event

// Sem arquivo: /upload <texto> (ou marcando um texto) vira um .txt com link.
const texto = info ? '' : (system.q || (quoted ? textoDe(quoted.message) : ''))
if (!info && !texto) {
return system.reply(
`• Marque/responda uma *foto, vídeo, áudio, PDF, ZIP ou qualquer arquivo* com *${system.prefix}upload*.\n` +
`• Também funciona mandando o arquivo com *${system.prefix}upload* na legenda.\n` +
`• Texto também vira link: *${system.prefix}upload seu texto*`
)
}

if (info?.tamanho > LIMITE) {
return system.reply(`• ❌ Esse arquivo tem ${tamanhoTexto(info.tamanho)}. O limite é ${LIMITE_MB} MB.`)
}

const dir = path.join(os.tmpdir(), 'aurora-upload')
await fs.mkdir(dir, { recursive: true })
const arquivo = path.join(dir, `${Date.now()}-${crypto.randomUUID()}`)
const nome = info ? info.nome : `texto-${Date.now()}.txt`
const mimetype = info ? info.mimetype : 'text/plain'

try {
if (info) {
try {
await system.client.message.downloadToFile(source, arquivo, { maxBytes: LIMITE })
} catch (err) {
console.error('[ UPLOAD ] download', err)
if (/max|limit|exceed/i.test(String(err?.message || ''))) {
return system.reply(`• ❌ Esse arquivo passa de ${LIMITE_MB} MB.`)
}
return system.reply('• ❌ Não consegui baixar esse arquivo. Tente marcar uma mensagem mais recente e use o comando de novo.')
}
} else {
await fs.writeFile(arquivo, texto, 'utf8')
}

const { size } = await fs.stat(arquivo)
if (!size) return system.reply('• ❌ O arquivo veio vazio. Tente mandar de novo.')

await system.reply('• ⏳ Subindo o arquivo, aguarde...')

let enviado
try {
enviado = await subir(arquivo, nome, mimetype)
} catch {
return system.reply('• ❌ Não consegui subir o arquivo agora. Tente de novo em alguns minutos.')
}

return system.reply(
`• ✅ *Upload feito!*\n` +
`• 📎 Arquivo: ${nome}\n` +
`• 📦 Tamanho: ${tamanhoTexto(size)}\n` +
`• 🔗 Link: ${enviado.link}` +
(enviado.host.expira ? `\n• ⏳ Esse link vale ${enviado.host.expira}.` : '')
)
} finally {
try { await fs.unlink(arquivo) } catch {}
}
}
}
