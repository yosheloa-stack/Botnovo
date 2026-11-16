import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { isViewOnce, mediaInfo } from './mensagem.js'

// Guarda a mídia de visualização única assim que ela chega. Quando alguém MARCA a mensagem,
// o WhatsApp manda só uma cópia sem a chave da mídia ("message has no downloadable media"),
// então o /revelar precisa da cópia baixada na hora do envio.
const dir = path.join(os.tmpdir(), 'aurora-viewonce')
const cache = new Map()
const order = []
const LIMIT = 120
const MAX_BYTES = 40 * 1024 * 1024
const TTL_MS = 6 * 60 * 60 * 1000

const keyOf = (jid, id) => `${jid}:${id}`

function extOf(info) {
const mime = String(info?.mimetype || '').toLowerCase()
if (info?.type === 'image') return mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg'
if (info?.type === 'video') return 'mp4'
return mime.includes('mpeg') ? 'mp3' : mime.includes('mp4') ? 'm4a' : 'ogg'
}

async function drop(k) {
const e = cache.get(k)
cache.delete(k)
if (e?.file) { try { await fs.unlink(e.file) } catch {} }
}

export async function cacheViewOnce(system) {
if (!system?.isGroup) return
const id = system.event?.key?.id
if (!id || !isViewOnce(system.msg)) return
const info = mediaInfo(system.msg)
if (!info || !['image', 'video', 'audio'].includes(info.type)) return
const k = keyOf(system.from, id)
if (cache.has(k)) return
await fs.mkdir(dir, { recursive: true })
const file = path.join(dir, `${Date.now()}-${crypto.randomUUID()}.${extOf(info)}`)
await system.client.message.downloadToFile(system.event, file, { maxBytes: MAX_BYTES })
cache.set(k, { file, info, at: Date.now() })
order.push(k)
while (order.length > LIMIT) await drop(order.shift())
}

export function getCachedViewOnce(jid, id) {
const k = keyOf(jid, id)
const e = cache.get(k)
if (!e) return null
if (Date.now() - e.at > TTL_MS) { void drop(k); return null }
return e
}
