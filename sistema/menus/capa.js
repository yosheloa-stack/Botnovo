import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { canalAtual } from '../funcoes/canal.js'

const dir = path.resolve('sistema/menus')
const pkg = JSON.parse(fsSync.readFileSync(new URL('../../package.json', import.meta.url), 'utf8'))
const zapoVersion = String(pkg.dependencies?.['zapo-js'] || '-').replace(/^[^0-9]*/, '')
const video = path.join(dir, 'fotomenu.mp4')
const images = [
['fotomenu.png', 'image/png'],
['fotomenu.jpg', 'image/jpeg'],
['fotomenu.jpeg', 'image/jpeg'],
['fotomenu.webp', 'image/webp']
]

async function exists(file) {
try {
await fs.access(file)
return true
} catch {
return false
}
}

export async function getMenuMedia() {
if (await exists(video)) return { type: 'video', file: video, mimetype: 'video/mp4' }
for (const [name, mimetype] of images) {
const file = path.join(dir, name)
if (await exists(file)) return { type: 'image', file, mimetype }
}
return null
}

export async function prepareMenuHeader(system) {
const media = await getMenuMedia()
if (!media) return null
try {
const uploaded = await system.client.message.upload(media.file, {
type: media.type,
mimetype: media.mimetype
})
if (!uploaded) return null
if (media.type === 'video') {
return {
hasMediaAttachment: true,
videoMessage: {
...uploaded,
mimetype: uploaded?.mimetype || media.mimetype,
gifPlayback: true
}
}
}
return {
hasMediaAttachment: true,
imageMessage: {
...uploaded,
mimetype: uploaded?.mimetype || media.mimetype
}
}
} catch (err) {
console.error('[ AURORA ] Falha ao preparar capa do Menu List:', err?.message || err)
return null
}
}

export async function sendMenu(system, texto) {
const media = await getMenuMedia()
const mentionJid = system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender
const options = mentionJid ? { mentions: [mentionJid] } : {}

// Com RGChannel ativo + link público, o menu vira Interactive Native Flow.
// Assim a capa continua aparecendo e o núcleo consegue anexar o CTA real
// "Ver canal" no MESMO card, em vez de depender do preview automático do link.
const canal = canalAtual()
if (canal.active && canal.link) {
const header = media ? await prepareMenuHeader(system) : null
return system.send({
interactiveMessage: {
...(header ? { header } : {}),
body: { text: String(texto || '') },
footer: { text: '𓂃 ࣪˖ ִֶָ𐀔 AURORA SYSTEM 𐀔 ִֶָ˖ ࣪𓂃' },
nativeFlowMessage: {
buttons: [],
messageVersion: 1,
messageParamsJson: ''
}
}
}, system.from, options)
}

if (media?.type === 'video') {
return system.send({
type: 'video',
media: media.file,
mimetype: media.mimetype,
gifPlayback: true,
caption: texto
}, system.from, options)
}
if (media?.type === 'image') {
return system.send({
type: 'image',
media: media.file,
mimetype: media.mimetype,
caption: texto
}, system.from, options)
}
return system.reply(texto, options)
}

export function menuData(system) {
const cargo = system.isOwner ? 'Dono' : system.isAdmin ? 'Admin' : 'Membro'
const vip = Boolean(system.isVip || system.isOwner)
const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Fortaleza' })
const usuario = system.senderNumber ? `@${system.senderNumber}` : `@${system.pushName || 'usuario'}`
const grupo = system.isGroup ? (system.metadata?.subject || 'Grupo') : 'Privado'
return ['Aurora System', usuario, cargo, vip, hora, system.prefix, grupo, zapoVersion]
}
