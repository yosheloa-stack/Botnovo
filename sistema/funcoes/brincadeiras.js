import fs from 'node:fs'
import { participantIdentity } from './jid.js'
import { downloadFile, cleanup } from './midia.js'

const linksPath = new URL('../dados/links.json', import.meta.url)
let links = {}
try { links = JSON.parse(fs.readFileSync(linksPath, 'utf8')) } catch {}

export function mediaLink(key = '') {
return String(links?.[key] || '').trim()
}

export function random(max = 100) {
return Math.floor(Math.random() * (max + 1))
}

export function pick(list = []) {
return list[Math.floor(Math.random() * list.length)]
}

export function memberIdentities(system, { excludeSender = false } = {}) {
const senderIds = new Set([
String(system.senderInfo?.jid || ''),
String(system.senderInfo?.pnJid || ''),
String(system.senderInfo?.lidJid || '')
].filter(Boolean))

const seen = new Set()
const out = []
for (const raw of system.metadata?.participants ?? []) {
const info = participantIdentity(raw)
if (!info.jid) continue
const key = info.pnJid || info.lidJid || info.jid
if (!key || seen.has(key)) continue
if (excludeSender && [info.jid, info.pnJid, info.lidJid].some((x) => x && senderIds.has(String(x)))) continue
seen.add(key)
out.push(info)
}
return out
}

export function sampleMembers(system, amount = 5, options = {}) {
const pool = [...memberIdentities(system, options)]
const out = []
while (pool.length && out.length < amount) {
const index = Math.floor(Math.random() * pool.length)
out.push(pool.splice(index, 1)[0])
}
return out
}

export function display(info = {}) {
if (info.number) return `@${info.number}`
if (info.display) return info.display
if (info.jid) return `@${String(info.jid).split('@')[0]}`
return '@usuario'
}

export function senderDisplay(system) {
return display(system.senderInfo)
}

export async function requireTarget(system, message = 'Marque o alvo na mensagem, responda a mensagem dele(a) ou use o @.') {
const info = system.targetInfo()
if (!info?.jid) {
await system.reply(message)
return null
}
return info
}

export async function sendMention(system, text, identities = []) {
const mentions = identities.map((x) => typeof x === 'string' ? x : x?.jid).filter(Boolean)
return system.reply(text, { mentions })
}

export async function sendAkameMedia(system, key, caption, identities = [], fallbackText = '') {
const url = mediaLink(key)
const mentions = identities.map((x) => typeof x === 'string' ? x : x?.jid).filter(Boolean)
if (!url) return system.reply(fallbackText || caption, { mentions })

let file
try {
const fallback = /\.mp4(?:$|\?)/i.test(url) ? 'mp4' : 'jpg'
file = await downloadFile(url, system.config, fallback)
if (file.mimetype.startsWith('video/')) {
return await system.send({
type: 'video',
media: file.path,
mimetype: file.mimetype || 'video/mp4',
gifPlayback: true,
caption
}, system.from, { mentions })
}
if (file.mimetype.startsWith('image/')) {
return await system.send({
type: 'image',
media: file.path,
mimetype: file.mimetype,
caption
}, system.from, { mentions })
}
return system.reply(fallbackText || caption, { mentions })
} catch (error) {
console.log(`[ BRINCADEIRA MEDIA:${key} ]`, error?.message || error)
return system.reply(fallbackText || caption, { mentions })
} finally {
await cleanup(file)
}
}

export async function sendRemoteImage(system, url, caption = '', identities = []) {
if (!url) return system.reply(caption || 'Não consegui carregar essa imagem agora.')
const mentions = identities.map((x) => typeof x === 'string' ? x : x?.jid).filter(Boolean)
let file
try {
file = await downloadFile(url, system.config, 'jpg')
return await system.send({ type: 'image', media: file.path, mimetype: file.mimetype, caption }, system.from, { mentions })
} catch (error) {
console.log('[ BRINCADEIRA IMAGEM ]', error?.message || error)
return system.reply(caption || 'Não consegui carregar essa imagem agora.', { mentions })
} finally {
await cleanup(file)
}
}

export async function sendRank(system, title, unit = '%', mediaKey = '') {
const members = sampleMembers(system, 5)
if (!members.length) return system.reply('Não encontrei membros suficientes no grupo para montar o rank.')

const medals = ['🥇','🥈','🥉','4️⃣','5️⃣']
let text = `⏤͟͟͞͞𝐑𝐚𝐧𝐤 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨! 𖤐⃝🏆
•
`
for (let i = 0; i < members.length; i++) {
const value = random(unit === 'cm' ? 40 : 100)
text += `> ${medals[i] || `${i + 1}°`} ${display(members[i])} — *${value}${unit}*
`
}
text += `•
> _${title.replace(/^[^A-ZÀ-Ú0-9]*/i, '').trim()}_
>
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
if (mediaKey) return sendAkameMedia(system, mediaKey, text, members, text)
return sendMention(system, text, members)
}
