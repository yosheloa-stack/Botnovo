import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { isViewOnce, mediaInfo, quotedInfo } from '../../funcoes/mensagem.js'

function ext(info) {
const mime = String(info?.mimetype || '').toLowerCase()
if (info?.type === 'image') {
if (mime.includes('png')) return 'png'
if (mime.includes('webp')) return 'webp'
return 'jpg'
}
if (info?.type === 'video') return 'mp4'
if (mime.includes('mpeg')) return 'mp3'
if (mime.includes('mp4')) return 'm4a'
return 'ogg'
}

export default {name: 'revelar',aliases: ['revelavisu', 'revelarvisu'],category: 'geral',description: 'Reenvia foto, vídeo ou áudio de visualização única',async run(system){
const quoted = quotedInfo(system.event)
if (!quoted) return system.reply(`❌ Responda em uma mídia de visualização única com *${system.prefix}revelar*.`)
if (!isViewOnce(quoted.message)) return system.reply('❌ A mensagem marcada não é de visualização única.')

const info = mediaInfo(quoted.message)
if (!info || !['image', 'video', 'audio'].includes(info.type)) {
return system.reply('❌ Só consigo revelar foto, vídeo ou áudio de visualização única.')
}

const dir = path.join(os.tmpdir(), 'aurora-revelar')
await fs.mkdir(dir, { recursive: true })
const file = path.join(dir, `${Date.now()}-${crypto.randomUUID()}.${ext(info)}`)

const source = {
key: {
remoteJid: system.from,
id: quoted.id,
fromMe: false,
...(quoted.participant ? { participant: quoted.participant } : {})
},
message: quoted.message
}

try {
try {
await system.client.message.downloadToFile(source, file, { maxBytes: 80 * 1024 * 1024 })
} catch {
await system.client.message.downloadToFile(quoted.message, file, { maxBytes: 80 * 1024 * 1024 })
}
await system.send({
type: info.type,
media: file,
mimetype: info.mimetype,
...(info.type !== 'audio' && info.caption ? { caption: info.caption } : {}),
...(info.type === 'audio' ? { ptt: info.ptt } : {})
}, system.from)
} catch (err) {
return system.reply(`❌ Não consegui recuperar essa visualização única. Ela pode já ter expirado ou ficado indisponível.`)
} finally {
try { await fs.unlink(file) } catch {}
}
}
}
