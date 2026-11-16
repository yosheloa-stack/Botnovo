import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { getCachedViewOnce } from '../../funcoes/viewonce.js'
import { isViewOnce, mediaInfo, quotedInfo, quotedTarget } from '../../funcoes/mensagem.js'

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

// chave da mensagem marcada: se quem enviou foi o proprio numero do bot (dono usando o numero
// conectado) a chave precisa de fromMe=true, senao o download falha so pra dono/adm
const target = quotedTarget(system) || {}
const baseKey = { remoteJid: system.from, id: quoted.id, ...(quoted.participant ? { participant: quoted.participant } : {}) }
const keys = [
{ ...baseKey, fromMe: Boolean(target.fromMe) },
{ ...baseKey, fromMe: !target.fromMe },
{ remoteJid: system.from, id: quoted.id, fromMe: Boolean(target.fromMe) }
]
const attempts = [
...keys.map((key) => ({ key, message: quoted.message })),
quoted.message
]

try {
const cached = getCachedViewOnce(system.from, quoted.id)
if (cached) {
await system.send({
type: cached.info.type,
media: cached.file,
mimetype: cached.info.mimetype,
...(cached.info.type !== 'audio' && cached.info.caption ? { caption: cached.info.caption } : {}),
...(cached.info.type === 'audio' ? { ptt: cached.info.ptt } : {})
}, system.from)
return
}
let lastErr = null
let ok = false
for (const source of attempts) {
try {
await system.client.message.downloadToFile(source, file, { maxBytes: 80 * 1024 * 1024 })
ok = true
break
} catch (e) {
lastErr = e
}
}
if (!ok) throw lastErr || new Error('download falhou')
await system.send({
type: info.type,
media: file,
mimetype: info.mimetype,
...(info.type !== 'audio' && info.caption ? { caption: info.caption } : {}),
...(info.type === 'audio' ? { ptt: info.ptt } : {})
}, system.from)
} catch (err) {
console.warn('[ REVELAR ] falhou:', err?.message || err, '| id citado:', quoted.id, '| participante citado:', quoted.participant || '-', '| fromMe estimado:', Boolean(target.fromMe), '| sem copia guardada (mensagem enviada antes do bot ligar ou nao baixou)')
return system.reply(`❌ Não consegui recuperar essa visualização única. O bot só consegue revelar as que chegaram no grupo depois de ele ligar, e a mídia precisa ter sido baixada na hora.`)
} finally {
try { await fs.unlink(file) } catch {}
}
}
}
