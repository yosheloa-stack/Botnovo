import { downloadFile, cleanup } from './midia.js'

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
throw lastError || new Error('Nenhum resultado encontrado no YouTube.')
}

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
result: showResultCard,
search: (query, config) => searchYouTube(query, config, 1),
searchMany: (query, config, limit = 8) => searchYouTube(query, config, limit),
resolve: resolveYouTube,
audio: (url, config) => directDownload('audio', url, config),
video: (url, config) => directDownload('video', url, config)
}
