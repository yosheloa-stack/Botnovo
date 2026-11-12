import { downloadFile, cleanup, bestMediaUrl } from './midia.js'
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'

function cleanBase(value = '') {
return String(value).trim().replace(/\/+$/, '')
}

function apiBlock(config, key) {
const block = config?.[key] || {}
const url = cleanBase(block.url)
const token = String(block.token || '').trim()
if (!url) throw new Error(`Configure ${key}.url no config.json.`)
if (!token) throw new Error(`Configure ${key}.token no config.json.`)
return { url, token }
}

function pick(value, keys, fallback = '') {
for (const key of keys) {
const parts = key.split('.')
let current = value
for (const part of parts) current = current?.[part]
if (current !== undefined && current !== null && current !== '') return current
}
return fallback
}

function bestThumb(item = {}) {
const raw = pick(item, ['thumbnail', 'image', 'imagem', 'thumb', 'thumbnailUrl', 'bestThumbnail.url'])
if (typeof raw === 'string') return raw
const thumbs = item?.thumbnails
if (Array.isArray(thumbs) && thumbs.length) {
const thumb = thumbs[thumbs.length - 1] ?? thumbs[0]
return typeof thumb === 'string' ? thumb : thumb?.url ?? ''
}
const videoId = pick(item, ['videoId', 'id'])
return videoId ? `https://i.ytimg.com/vi/${videoId}/hq720.jpg` : ''
}

function durationOf(item = {}) {
const value = pick(item, ['duration.timestamp', 'timestamp', 'duracao', 'duration'], '-')
if (value && typeof value === 'object') return value.timestamp || value.text || '-'
return String(value || '-')
}

function authorOf(item = {}) {
const value = pick(item, ['author.name', 'author', 'canal', 'channel.name', 'channel'], '-')
if (value && typeof value === 'object') return value.name || value.title || '-'
return String(value || '-')
}

function normalizeVideo(item = {}) {
const videoId = pick(item, ['videoId', 'id'])
const url = pick(item, ['url', 'link', 'videoUrl']) || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : '')
return {
raw: item,
title: String(pick(item, ['title', 'titulo', 'name'], 'Sem título')),
author: authorOf(item),
duration: durationOf(item),
views: pick(item, ['views_formatado', 'views', 'views_count', 'viewCount'], null),
thumbnail: bestThumb(item),
url,
videoId
}
}

function resultItems(data) {
const root = data?.resultado ?? data?.result ?? data?.results ?? data?.data ?? data
if (Array.isArray(root)) return root
if (Array.isArray(root?.videos)) return root.videos
if (Array.isArray(root?.results)) return root.results
if (Array.isArray(root?.items)) return root.items
if (Array.isArray(data?.videos)) return data.videos
if (root && typeof root === 'object') return [root]
return []
}

async function fetchJson(url) {
const response = await fetch(url, {
redirect: 'follow',
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36',
Accept: 'application/json,*/*'
}
})
const text = await response.text()
let data
try { data = JSON.parse(text) }
catch { throw new Error(`A API de pesquisa retornou resposta inválida (HTTP ${response.status}).`) }
if (!response.ok || data?.status === false || data?.success === false) {
const msg = data?.resultado ?? data?.message ?? data?.error ?? `HTTP ${response.status}`
throw new Error(typeof msg === 'string' ? msg : 'Erro na pesquisa do YouTube.')
}
return data
}

function searchCandidates(base, token, query) {
const q = encodeURIComponent(query)
const key = encodeURIComponent(token)
return [
`${base}/api/youtube-search?query=${q}&apikey=${key}`,
`${base}/api/youtube-search?q=${q}&apikey=${key}`,
`${base}/api/youtube-play?query=${q}&apikey=${key}`,
`${base}/api/yt-search?titulo=${q}&apikey=${key}`
]
}

// Reserva: quando a API de pesquisa sai do ar ou muda as rotas (HTTP 404),
// pesquisa direto na página de resultados do YouTube.
function videosDaPagina(html = '') {
const m = String(html).match(/ytInitialData\s*=\s*(\{.+?\});\s*<\/script>/s)
if (!m) return []
let data
try { data = JSON.parse(m[1]) } catch { return [] }
const achados = []
const andar = (no) => {
if (!no || typeof no !== 'object' || achados.length >= 20) return
if (no.videoRenderer?.videoId) { achados.push(no.videoRenderer); return }
for (const v of Array.isArray(no) ? no : Object.values(no)) andar(v)
}
andar(data)
const texto = (t) => t?.simpleText || (t?.runs || []).map((r) => r.text).join('') || ''
return achados.map((v) => ({
videoId: v.videoId,
title: texto(v.title) || 'Sem título',
author: texto(v.ownerText || v.longBylineText) || '-',
duration: texto(v.lengthText) || '-',
views: texto(v.viewCountText) || null,
url: `https://www.youtube.com/watch?v=${v.videoId}`
}))
}

async function buscaDireta(query) {
const response = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=pt&gl=BR`, {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
'Accept-Language': 'pt-BR,pt;q=0.9',
Cookie: 'CONSENT=YES+1'
}
})
if (!response.ok) throw new Error(`YouTube respondeu HTTP ${response.status}.`)
return videosDaPagina(await response.text())
}

export async function searchYouTube(query, config, limit = 1) {
const { url, token } = apiBlock(config, 'tokitoApi')
let lastError
for (const endpoint of searchCandidates(url, token, query)) {
try {
const data = await fetchJson(endpoint)
const items = resultItems(data).map(normalizeVideo).filter((x) => x.url)
if (items.length) return limit === 1 ? items[0] : items.slice(0, limit)
} catch (err) { lastError = err }
}
try {
const items = (await buscaDireta(query)).map(normalizeVideo).filter((x) => x.url)
if (items.length) return limit === 1 ? items[0] : items.slice(0, limit)
} catch (err) {
console.warn('[ YOUTUBE ] Pesquisa direta falhou:', err?.message || err)
}
throw lastError || new Error('Nenhum resultado encontrado no YouTube.')
}

export const _teste = { videosDaPagina, downloadCandidates: (...a) => downloadCandidates(...a) }

function fallbackFromLink(url = '') {
let videoId = ''
try {
const parsed = new URL(url)
if (/youtu\.be$/i.test(parsed.hostname)) videoId = parsed.pathname.split('/').filter(Boolean)[0] ?? ''
else videoId = parsed.searchParams.get('v') ?? parsed.pathname.match(/\/(?:shorts|embed)\/([^/?#]+)/i)?.[1] ?? ''
} catch {}
return {
raw: null, title: 'YouTube', author: '-', duration: '-', views: null,
thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/hq720.jpg` : '',
url, videoId
}
}

export async function resolveYouTube(query, config) {
if (/^https?:\/\//i.test(query)) {
try { return await searchYouTube(query, config, 1) } catch { return fallbackFromLink(query) }
}
return searchYouTube(query, config, 1)
}

function directDownload(kind, youtubeUrl, config) {
const { url, token } = apiBlock(config, 'akameApi')
const isVideo = kind === 'video'
const route = isVideo ? 'ytmp4' : 'ytmp3'
const quality = isVideo ? 360 : 128
return `${url}/api/download/${route}?url=${encodeURIComponent(youtubeUrl)}&quality=${quality}&apikey=${encodeURIComponent(token)}`
}

// Links de download em ordem de tentativa. Provedores de YouTube caem ou mudam
// de rota com frequência, então o play tenta uma lista em vez de uma API só.
function downloadCandidates(kind, youtubeUrl, config, raw = null) {
const isVideo = kind === 'video'
const list = []
const add = (fn) => { try { const u = fn(); if (u) list.push(u) } catch {} }
const alt = (route, extra = {}, param = 'url') => {
const { url, token } = apiBlock(config, 'akameApi')
const q = new URLSearchParams({ [param]: youtubeUrl, ...extra, apikey: token })
return `${url}${route}?${q}`
}
// Rota documentada da Akame: devolve JSON com resultado.download.
add(() => alt(isVideo ? '/api/download/youtube-video' : '/api/download/youtube-audio', { quality: isVideo ? 360 : 128 }, 'url'))
add(() => directDownload(kind, youtubeUrl, config))
if (isVideo) {
add(() => alt('/api/download/ytmp4', { quality: 720 }))
add(() => alt('/api/download/ytmp4'))
add(() => alt('/api/download/youtube-mp4'))
}
else {
add(() => alt('/api/download/ytmp3', { quality: 192 }))
add(() => alt('/api/download/ytmp3'))
add(() => alt('/api/download/youtube-mp3'))
}
const tokito = (route) => {
const { url, token } = apiBlock(config, 'tokitoApi')
const q = new URLSearchParams({ url: youtubeUrl, apikey: token })
return `${url}${route}?${q}`
}
const tokitoRoutes = isVideo
? ['/api/downloads/youtube-mp4', '/api/downloads/ytmp4', '/api/youtube-mp4']
: ['/api/downloads/youtube-mp3', '/api/downloads/ytmp3', '/api/youtube-mp3', '/api/youtube-play']
for (const route of tokitoRoutes) add(() => tokito(route))
const embutido = raw ? bestMediaUrl(raw, isVideo ? 'video' : 'audio') : ''
if (embutido && !/youtube\.com\/watch|youtu\.be\//i.test(embutido)) list.push(embutido)
return [...new Set(list)]
}

// Baixa o áudio/vídeo tentando cada provedor até um funcionar.
export async function baixarYouTube(kind, info, config, ext = kind === 'video' ? 'mp4' : 'mp3', pos = null) {
const url = typeof info === 'string' ? info : info?.url
const raw = typeof info === 'string' ? null : info?.raw
const falhas = []
for (const link of downloadCandidates(kind, url, config, raw)) {
let media
// Nome curto da rota para diagnóstico, sem a chave da API.
const rota = (() => { try { const u = new URL(link); return `${u.hostname}${u.pathname}` } catch { return 'link' } })()
try {
media = await downloadFile(link, config, ext)
return pos ? await pos(media) : media
}
catch (err) {
await cleanup(media)
const motivo = String(err?.message || err)
falhas.push(`${rota}: ${motivo}`)
console.warn('[ YOUTUBE DOWNLOAD ]', rota, motivo)
}
}
throw new Error(falhas.length ? falhas.join(' | ') : 'Nenhum provedor conseguiu baixar este vídeo.')
}
catch (err) {
await cleanup(media)
lastError = err
console.warn('[ YOUTUBE DOWNLOAD ]', String(err?.message || err))
}
}
throw lastError || new Error('Nenhum provedor conseguiu baixar este vídeo.')
}

// O WhatsApp só toca o áudio se o arquivo bater com o mimetype enviado. Alguns
// provedores devolvem m4a/webm/mp4 no lugar de mp3: converte para mp3 de verdade.
function ffmpegMp3(entrada, saida) {
return new Promise((resolve, reject) => {
const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-i', entrada, '-vn', '-codec:a', 'libmp3lame', '-b:a', '128k', saida], { stdio: ['ignore', 'ignore', 'pipe'] })
let err = ''
p.stderr.on('data', (d) => { err += d })
p.on('error', reject)
p.on('close', (code) => code === 0 ? resolve() : reject(new Error(err.trim().slice(-200) || `ffmpeg saiu com ${code}`)))
})
}

function duracaoSegundos(arquivo) {
return new Promise((resolve) => {
const p = spawn('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', arquivo], { stdio: ['ignore', 'pipe', 'ignore'] })
let out = ''
p.stdout.on('data', (d) => { out += d })
p.on('error', () => resolve(0))
p.on('close', () => resolve(Math.round(Number.parseFloat(out)) || 0))
})
}

// Sempre passa pelo ffmpeg: valida que é áudio de verdade (arquivo quebrado
// ou página de erro faz o provedor seguinte ser tentado), deixa o cabeçalho
// correto e descobre a duração, que o WhatsApp precisa para tocar (senão 0:00).
async function normalizarMp3(media) {
const saida = media.path.replace(/\.[^.\/]+$/, '') + '-conv.mp3'
try {
await ffmpegMp3(media.path, saida)
const { size } = await fs.stat(saida)
const seconds = await duracaoSegundos(saida)
if (size < 2048 || !seconds) throw new Error('áudio convertido vazio ou sem duração')
await cleanup(media)
return { path: saida, mimetype: 'audio/mpeg', ext: 'mp3', size, seconds }
}
catch (err) {
await cleanup(saida)
// Sem ffmpeg no servidor não dá para validar: usa o arquivo como veio.
if (err?.code === 'ENOENT' && String(media.mimetype).startsWith('audio/')) return media
console.warn('[ YOUTUBE AUDIO ] inválido:', media.mimetype, media.size, String(err?.message || err))
throw err
}
}

export async function baixarAudioMp3(info, config) {
return baixarYouTube('audio', info, config, 'mp3', normalizarMp3)
}

function videoIdFromUrl(url = '') {
try {
const parsed = new URL(url)
if (/youtu\.be$/i.test(parsed.hostname))
return parsed.pathname.split('/').filter(Boolean)[0] || ''
return parsed.searchParams.get('v') || parsed.pathname.match(/\/(?:shorts|embed)\/([^/?#]+)/i)?.[1] || ''
}
catch {
return ''
}
}

function coverCandidates(info = {}) {
const id = info.videoId || videoIdFromUrl(info.url)
const list = []
if (id) {
list.push(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
list.push(`https://i.ytimg.com/vi/${id}/mqdefault.jpg`)
}
if (info.thumbnail)
list.push(info.thumbnail)
return [...new Set(list.filter(Boolean))]
}

async function showResultCard(system, info, type = 'audio') {
const mention = system.senderNumber ? `@${system.senderNumber}` : system.pushName
const caption = system.messages.playResult(info, type, mention)
const covers = coverCandidates(info)
for (const url of covers) {
let cover
try {
cover = await downloadFile(url, system.config, 'jpg')
if (!['image/jpeg', 'image/png'].includes(cover.mimetype))
throw new Error(`Capa inválida: ${cover.mimetype}`)
const sent = await system.send({
type: 'image',
media: cover.path,
mimetype: cover.mimetype,
caption
}, system.from, { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
if (sent?.id || sent?.key || sent)
return sent
}
catch (error) {
console.log('[ YOUTUBE CAPA ]', error?.message || error)
}
finally {
await cleanup(cover)
}
}
return system.reply(caption, { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}

export const youtube = {
download: baixarYouTube,
audioMp3: baixarAudioMp3,
result: showResultCard,
search: (query, config) => searchYouTube(query, config, 1),
searchMany: (query, config, limit = 8) => searchYouTube(query, config, limit),
resolve: resolveYouTube,
audio: (url, config) => directDownload('audio', url, config),
video: (url, config) => directDownload('video', url, config)
}
