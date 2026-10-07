import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import os from 'node:os'

const mimeExt = {
'audio/mpeg': 'mp3',
'audio/mp4': 'm4a',
'audio/ogg': 'ogg',
'video/mp4': 'mp4',
'video/webm': 'webm',
'image/jpeg': 'jpg',
'image/png': 'png',
'image/webp': 'webp',
'image/gif': 'gif'
}

const extMime = {
mp3: 'audio/mpeg',
m4a: 'audio/mp4',
ogg: 'audio/ogg',
mp4: 'video/mp4',
webm: 'video/webm',
jpg: 'image/jpeg',
jpeg: 'image/jpeg',
png: 'image/png',
webp: 'image/webp',
gif: 'image/gif'
}

function extFromUrl(url = '') {
try {
const pathname = new URL(url).pathname.toLowerCase()
const match = pathname.match(/\.([a-z0-9]{2,5})$/)
return match?.[1] ?? ''
} catch {
return ''
}
}

function manualType(buffer) {
if (!buffer?.length) return null

if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
return { ext: 'jpg', mime: 'image/jpeg' }
}

if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
return { ext: 'png', mime: 'image/png' }
}

if (buffer.length >= 12 && buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP') {
return { ext: 'webp', mime: 'image/webp' }
}

if (buffer.length >= 6 && /^GIF8[79]a$/.test(buffer.subarray(0, 6).toString())) {
return { ext: 'gif', mime: 'image/gif' }
}

if (buffer.length >= 12 && buffer.subarray(4, 8).toString() === 'ftyp') {
const brand = buffer.subarray(8, 12).toString()
if (/^M4A|^M4B|^M4P/i.test(brand)) return { ext: 'm4a', mime: 'audio/mp4' }
return { ext: 'mp4', mime: 'video/mp4' }
}

if (buffer.length >= 3 && buffer.subarray(0, 3).toString() === 'ID3') {
return { ext: 'mp3', mime: 'audio/mpeg' }
}

if (buffer.length >= 2 && buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
return { ext: 'mp3', mime: 'audio/mpeg' }
}

return null
}

async function detectType(buffer) {
try {
const { fileTypeFromBuffer } = await import('file-type')
const detected = await fileTypeFromBuffer(buffer)
if (detected?.mime && detected?.ext) return detected
} catch {}
return manualType(buffer)
}

export async function downloadFile(url, config, fallbackExt = 'bin', depth = 0) {
const response = await fetch(url, {
redirect: 'follow',
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/124 Mobile Safari/537.36',
'Accept': '*/*'
}
})

if (!response.ok) throw new Error(`Falha ao baixar mídia: HTTP ${response.status}`)

const maxMb = 80
const limit = maxMb * 1024 * 1024
const size = Number(response.headers.get('content-length') || 0)
if (size && size > limit) throw new Error(`Mídia maior que o limite de ${maxMb} MB.`)

const ab = await response.arrayBuffer()
if (ab.byteLength > limit) throw new Error(`Mídia maior que o limite de ${maxMb} MB.`)

const buffer = Buffer.from(ab)
const headerMime = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()

if (headerMime.includes('json') || (buffer[0] === 0x7b && buffer[buffer.length - 1] === 0x7d)) {
try {
const data = JSON.parse(buffer.toString('utf8'))
const nested = bestMediaUrl(data, fallbackExt === 'mp4' ? 'video' : 'audio')
if (nested && nested !== url && depth < 2) return downloadFile(nested, config, fallbackExt, depth + 1)
const message = data?.resultado ?? data?.message ?? data?.error ?? 'A API não retornou a mídia esperada.'
throw new Error(typeof message === 'string' ? message : 'A API não retornou a mídia esperada.')
} catch (error) {
if (error instanceof SyntaxError) throw new Error('A API retornou uma resposta inválida no lugar da mídia.')
throw error
}
}

const detected = await detectType(buffer)
const urlExt = extFromUrl(url)

let mimetype = headerMime && headerMime !== 'application/octet-stream' ? headerMime : ''
let ext = mimeExt[mimetype] || ''

if (detected) {
mimetype = detected.mime
ext = detected.ext
} else if (!mimetype && extMime[urlExt]) {
mimetype = extMime[urlExt]
ext = urlExt
} else if (!ext) {
ext = fallbackExt
mimetype = extMime[fallbackExt] ?? headerMime ?? 'application/octet-stream'
}

const tempDir = path.join(os.tmpdir(), 'aurora-system')
await fs.mkdir(tempDir, { recursive: true })
const file = path.join(tempDir, `${Date.now()}-${crypto.randomUUID()}.${ext}`)
await fs.writeFile(file, buffer)

return { path: file, mimetype: mimetype || 'application/octet-stream', ext, size: buffer.length }
}

export async function cleanup(...files) {
for (const file of files.flat()) {
if (!file) continue
try { await fs.unlink(typeof file === 'string' ? file : file.path) } catch {}
}
}

export function collectUrls(value, out = [], trail = '') {
if (typeof value === 'string' && /^https?:\/\//i.test(value)) out.push({ url: value, trail })
else if (Array.isArray(value)) value.forEach((v, i) => collectUrls(v, out, `${trail}.${i}`))
else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => collectUrls(v, out, `${trail}.${k}`))
return out
}

export function bestMediaUrl(result, kind = 'audio') {
const urls = collectUrls(result)
const rx = kind === 'video' ? /(video|mp4|download|url|link)/i : /(audio|mp3|download|url|link)/i
const avoid = /(thumbnail|thumb|image|avatar|cover)/i
const preferred = urls.find((x) => rx.test(x.trail) && !avoid.test(x.trail))
return preferred?.url ?? urls.find((x) => !avoid.test(x.trail))?.url ?? ''
}
