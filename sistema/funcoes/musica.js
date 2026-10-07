import { downloadFile, cleanup } from './midia.js'
import { safeName } from './api.js'

function mention(system) {
return system.senderNumber ? `@${system.senderNumber}` : system.pushName
}

function mentionJid(system) {
return system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender
}

export async function capa(system, caption = '', thumb = '', options = {}) {
let cover
const mentions = Array.isArray(options.mentions) ? options.mentions : [mentionJid(system)]
try {
if (thumb) {
try {
cover = await downloadFile(thumb, system.config, 'jpg')
if (!String(cover.mimetype || '').startsWith('image/')) throw new Error('Capa inválida')
return await system.send({
type: 'image',
media: cover.path,
mimetype: cover.mimetype,
caption
}, system.from, { mentions })
} catch (err) {
console.log('[ MUSICA CAPA ]', err?.message || err)
}
}
return await system.reply(caption, { mentions })
} finally {
await cleanup(cover)
}
}

export async function resultado(system, info = {}, thumb = '') {
const dados = {
title: info.title || '-',
duration: info.duration || '-',
views: info.views ?? '-',
author: info.author || '-',
url: info.url || '-'
}
const caption = system.messages.playResult(dados, 'audio', mention(system))
return capa(system, caption, thumb)
}

export async function enviar(system, url, title = 'audio', mimetype = 'audio/mpeg') {
let media
try {
media = await downloadFile(url, system.config, mimetype.includes('mp4') ? 'm4a' : 'mp3')
const mime = String(media.mimetype || '').startsWith('audio/') ? media.mimetype : mimetype
return await system.send({
type: 'audio',
media: media.path,
mimetype: mime,
fileName: `${safeName(title)}.mp3`,
ptt: false
})
} finally {
await cleanup(media)
}
}

export default { capa, resultado, enviar }
