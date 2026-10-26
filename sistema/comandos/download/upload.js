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

// Só o PussyBox (pedido do dono: nenhum outro site). O endereço de upload
// dele ainda não foi confirmado (/user/api.php deu 404), então tenta os dois
// mais comuns.
const HOSTS = [
{ nome: 'PussyBox', url: 'https://pussybox.moe/api/upload', campo: 'file' },
{ nome: 'PussyBox', url: 'https://pussybox.moe/upload', campo: 'file' }
]

// Endereço que recusou fica de fora por um tempo: assim um arquivo grande não
// é mandado de novo, a cada comando, para onde não aceita.
const PAUSA_RECUSA = 60 * 60_000
const PAUSA_FALHA = 10 * 60_000
const foraAte = new Map()

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
headers: { 'User-Agent': 'AuroraSystem/1.2 (bot WhatsApp)', 'Accept': 'application/json, text/plain, */*' },
signal: AbortSignal.timeout(TEMPO_UPLOAD)
})
const texto = (await res.text()).trim()
if (!res.ok) {
const err = new Error(`HTTP ${res.status} ${texto.replace(/\s+/g, ' ').slice(0, 80)}`)
err.status = res.status
throw err
}
const link = linkDaResposta(texto)
if (!link) throw new Error(texto.replace(/\s+/g, ' ').slice(0, 120) || 'resposta vazia')
return link
}

// O PussyBox não publica o endereço de envio. Quando os endereços conhecidos
// falham, o bot lê a página e os scripts do site, escreve no log o que achou
// e tenta os caminhos de upload encontrados. A leitura roda uma vez por
// processo; o caminho que funcionar passa a ser o primeiro da lista.
const SITE = 'https://pussybox.moe'
let pistas = null

async function lerTexto(url) {
const res = await fetch(url, { headers: { 'User-Agent': 'AuroraSystem/1.2 (bot WhatsApp)' }, signal: AbortSignal.timeout(15_000) })
return (await res.text()).slice(0, 3_000_000)
}

export function pistasDoCodigo(codigo) {
const caminhos = new Set()
for (const m of codigo.matchAll(/["'`]((?:https:\/\/pussybox\.moe)?\/[\w\-./]*(?:upload|envia|send|file|arquivo)[\w\-./]*)["'`]/gi)) {
const caminho = m[1].replace(SITE, '')
if (/\.(js|css|png|jpe?g|svg|webp|gif|ico|mp4|mp3)$/i.test(caminho) || /^\/files\/./i.test(caminho)) continue
caminhos.add(caminho)
}
const campos = new Set()
for (const m of codigo.matchAll(/\.append\(\s*["'`]([\w[\]-]+)["'`]/g)) campos.add(m[1])
return { caminhos: [...caminhos].slice(0, 10), campos: [...campos].slice(0, 10) }
}

async function pistasPussybox() {
if (pistas) return pistas
pistas = { scripts: [], caminhos: [], campos: [] }
try {
const html = await lerTexto(`${SITE}/`)
const scripts = [...html.matchAll(/<script[^>]*\bsrc=["']([^"']+)["']/gi)]
.map((m) => new URL(m[1], `${SITE}/`).href)
.filter((url) => url.startsWith(SITE))
.slice(0, 6)
let codigo = html
for (const src of scripts) {
try { codigo += `\n${await lerTexto(src)}` } catch {}
}
pistas = { scripts, ...pistasDoCodigo(codigo) }
} catch (err) {
pistas.erro = String(err?.message || err)
}
console.error('[ UPLOAD ] PussyBox pistas:', JSON.stringify(pistas))
return pistas
}

async function tentar(lista, arquivo, nome, mimetype, falhas) {
for (const host of lista) {
try {
const link = await enviarPara(host, arquivo, nome, mimetype)
foraAte.delete(host.url)
return { host, link }
} catch (err) {
// 413 = arquivo grande demais só para esse endereço: não pausa.
if (err?.status !== 413) foraAte.set(host.url, Date.now() + (err?.status >= 400 && err?.status < 500 ? PAUSA_RECUSA : PAUSA_FALHA))
falhas.push(`${host.nome}: ${err?.message || err}`)
console.error('[ UPLOAD ]', host.nome, host.url, err?.message || err)
}
}
return null
}

async function subir(arquivo, nome, mimetype) {
const falhas = []
const livres = HOSTS.filter((host) => (foraAte.get(host.url) || 0) <= Date.now())
// Todos pausados: tenta todos de novo em vez de recusar sem tentar.
const feito = await tentar(livres.length ? livres : HOSTS, arquivo, nome, mimetype, falhas)
if (feito) return feito

const { caminhos, campos } = await pistasPussybox()
const novos = caminhos
.map((caminho) => ({ nome: 'PussyBox', url: `${SITE}${caminho}`, campo: campos[0] || 'file' }))
.filter((host) => !HOSTS.some((h) => h.url === host.url) && (foraAte.get(host.url) || 0) <= Date.now())
.slice(0, 3)
const achado = await tentar(novos, arquivo, nome, mimetype, falhas)
if (achado) {
HOSTS.unshift(achado.host)
return achado
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
`• 🔗 Link: ${enviado.link}`
)
} finally {
try { await fs.unlink(arquivo) } catch {}
}
}
}
