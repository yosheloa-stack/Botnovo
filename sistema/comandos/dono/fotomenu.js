import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'

const dir = path.resolve('sistema/menus')
const menuFiles = ['fotomenu.mp4', 'fotomenu.png', 'fotomenu.jpg', 'fotomenu.jpeg', 'fotomenu.webp']

function unwrap(message) {
if (!message) return message
return message?.ephemeralMessage?.message
?? message?.viewOnceMessage?.message
?? message?.viewOnceMessageV2?.message
?? message?.viewOnceMessageV2Extension?.message
?? message?.documentWithCaptionMessage?.message
?? message
}

function mediaFrom(message) {
const m = unwrap(message)
if (!m) return null
if (m.imageMessage) return { type: 'image', mimetype: m.imageMessage.mimetype || 'image/jpeg', message: m }
if (m.videoMessage) return { type: 'video', mimetype: m.videoMessage.mimetype || 'video/mp4', message: m }
return null
}

function quotedMessage(message) {
const m = unwrap(message)
return m?.extendedTextMessage?.contextInfo?.quotedMessage
?? m?.imageMessage?.contextInfo?.quotedMessage
?? m?.videoMessage?.contextInfo?.quotedMessage
?? m?.documentMessage?.contextInfo?.quotedMessage
?? null
}

function imageExt(mimetype = '') {
const mime = String(mimetype).toLowerCase()
if (mime.includes('png')) return 'png'
if (mime.includes('webp')) return 'webp'
return 'jpg'
}

async function clearOld() {
await Promise.all(menuFiles.map(async (name) => {
try { await fs.unlink(path.join(dir, name)) } catch {}
}))
}

export default {name: 'fotomenu',aliases: ['setfotomenu', 'setmenu'],category: 'dono',description: 'Salva foto ou vídeo/GIF dos menus',ownerOnly: true,async run(system){
const current = mediaFrom(system.msg)
const quoted = mediaFrom(quotedMessage(system.msg))
const selected = current || quoted
if (!selected) return system.reply(system.messages.menuMediaRequired(system.prefix))
await fs.mkdir(dir, { recursive: true })
const ext = selected.type === 'video' ? 'mp4' : imageExt(selected.mimetype)
const finalFile = path.join(dir, `fotomenu.${ext}`)
const tempDir = path.join(os.tmpdir(), 'aurora-system')
const tempFile = path.join(tempDir, `fotomenu-${crypto.randomUUID()}.${ext}`)
await fs.mkdir(tempDir, { recursive: true })
try {
const source = current ? system.event : selected.message
await system.client.message.downloadToFile(source, tempFile, { maxBytes: 80 * 1024 * 1024 })
await clearOld()
await fs.copyFile(tempFile, finalFile)
await system.reply(system.messages.menuMediaSaved(selected.type))
} finally {
try { await fs.unlink(tempFile) } catch {}
}
}
}
