import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import { cleanup, downloadFile } from './midia.js'
import { quotedInfo } from './mensagem.js'
import { participantIdentity, resolveIdentity } from './jid.js'
import { verifiedSendOptions } from './meta.js'

const mediaRoot = path.resolve('sistema/dados/grupos/midias')
const linksFile = new URL('../dados/links.json', import.meta.url)

function safeName(value = '') {
return String(value || '').replace(/[^a-zA-Z0-9@._-]+/g, '_')
}

function unwrapOne(message) {
if (!message) return message
return message?.ephemeralMessage?.message
?? message?.viewOnceMessage?.message
?? message?.viewOnceMessageV2?.message
?? message?.viewOnceMessageV2Extension?.message
?? message?.deviceSentMessage?.message
?? message?.documentWithCaptionMessage?.message
?? message
}

function unwrap(message) {
let current = message
for (let i = 0; i < 8; i++) {
const next = unwrapOne(current)
if (!next || next === current) break
current = next
}
return current
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
?? m?.audioMessage?.contextInfo?.quotedMessage
?? null
}

function imageExt(mimetype = '') {
const mime = String(mimetype).toLowerCase()
if (mime.includes('png')) return 'png'
if (mime.includes('webp')) return 'webp'
if (mime.includes('gif')) return 'gif'
return 'jpg'
}

function removeWords(value = '') {
return ['apagar', 'remover', 'delete', 'del', '0', 'off'].includes(String(value).trim().toLowerCase())
}

async function clearSavedMedia(groupJid, base) {
const dir = path.join(mediaRoot, safeName(groupJid))
try {
for (const name of await fs.readdir(dir)) {
if (name.startsWith(`${base}.`)) {
try { await fs.unlink(path.join(dir, name)) } catch {}
}
}
} catch {}
}

export async function saveWelcomeMedia(system, kind = 'entrada') {
const outgoing = kind === 'saida'
const base = outgoing ? 'fundosaiu' : 'fundobv'
const pathKey = outgoing ? 'fundosaiu' : 'fundobv'
const typeKey = outgoing ? 'fundosaiu_tipo' : 'fundobv_tipo'

if (removeWords(system.q)) {
await clearSavedMedia(system.from, base)
system.group[pathKey] = null
system.group[typeKey] = null
await (system.saveGroup?.() ?? system.save())
return system.reply(`- ✅ Fundo de ${outgoing ? 'saída' : 'boas-vindas'} removido.`)
}

const current = mediaFrom(system.msg)
const quoted = mediaFrom(quotedMessage(system.msg))
const quotedData = quotedInfo(system.event)
const selected = current || quoted
if (!selected) {
return system.reply(`- 🖼️ Marque/responda uma *foto* ou *vídeo/GIF* e use *${system.prefix}${base}*.\n- 🗑️ Para remover: *${system.prefix}${base} apagar*`)
}

const dir = path.join(mediaRoot, safeName(system.from))
await fs.mkdir(dir, { recursive: true })
await clearSavedMedia(system.from, base)

const ext = selected.type === 'video' ? 'mp4' : imageExt(selected.mimetype)
const finalPath = path.join(dir, `${base}.${ext}`)
const tempDir = path.join(os.tmpdir(), 'aurora-system')
const tempPath = path.join(tempDir, `${base}-${crypto.randomUUID()}.${ext}`)
await fs.mkdir(tempDir, { recursive: true })

try {
const source = current ? system.event : (quotedData ? {
key: {
remoteJid: system.from,
id: quotedData.id,
fromMe: false,
...(quotedData.participant ? { participant: quotedData.participant } : {})
},
message: quotedData.message
} : selected.message)
try {
await system.client.message.downloadToFile(source, tempPath, { maxBytes: 80 * 1024 * 1024 })
} catch {
await system.client.message.downloadToFile(selected.message, tempPath, { maxBytes: 80 * 1024 * 1024 })
}
await fs.copyFile(tempPath, finalPath)
system.group[pathKey] = path.relative(process.cwd(), finalPath).replace(/\\/g, '/')
system.group[typeKey] = selected.type
await (system.saveGroup?.() ?? system.save())
return system.reply(`- ✅ Fundo de ${outgoing ? 'saída' : 'boas-vindas'} salvo como *${selected.type === 'video' ? 'vídeo/GIF' : 'foto'}*.`)
} finally {
try { await fs.unlink(tempPath) } catch {}
}
}

const dddStateMap = new Map([
['11', 'São Paulo'], ['12', 'São Paulo'], ['13', 'São Paulo'], ['14', 'São Paulo'], ['15', 'São Paulo'], ['16', 'São Paulo'], ['17', 'São Paulo'], ['18', 'São Paulo'], ['19', 'São Paulo'],
['21', 'Rio de Janeiro'], ['22', 'Rio de Janeiro'], ['24', 'Rio de Janeiro'],
['27', 'Espírito Santo'], ['28', 'Espírito Santo'],
['31', 'Minas Gerais'], ['32', 'Minas Gerais'], ['33', 'Minas Gerais'], ['34', 'Minas Gerais'], ['35', 'Minas Gerais'], ['37', 'Minas Gerais'], ['38', 'Minas Gerais'],
['41', 'Paraná'], ['42', 'Paraná'], ['43', 'Paraná'], ['44', 'Paraná'], ['45', 'Paraná'], ['46', 'Paraná'],
['47', 'Santa Catarina'], ['48', 'Santa Catarina'], ['49', 'Santa Catarina'],
['51', 'Rio Grande do Sul'], ['53', 'Rio Grande do Sul'], ['54', 'Rio Grande do Sul'], ['55', 'Rio Grande do Sul'],
['61', 'Distrito Federal'], ['62', 'Goiás'], ['64', 'Goiás'], ['63', 'Tocantins'],
['65', 'Mato Grosso'], ['66', 'Mato Grosso'], ['67', 'Mato Grosso do Sul'],
['68', 'Acre'], ['69', 'Rondônia'],
['71', 'Bahia'], ['73', 'Bahia'], ['74', 'Bahia'], ['75', 'Bahia'], ['77', 'Bahia'],
['79', 'Sergipe'], ['81', 'Pernambuco'], ['87', 'Pernambuco'], ['82', 'Alagoas'], ['83', 'Paraíba'], ['84', 'Rio Grande do Norte'],
['85', 'Ceará'], ['88', 'Ceará'], ['86', 'Piauí'], ['89', 'Piauí'],
['91', 'Pará'], ['93', 'Pará'], ['94', 'Pará'], ['92', 'Amazonas'], ['97', 'Amazonas'],
['95', 'Roraima'], ['96', 'Amapá'], ['98', 'Maranhão'], ['99', 'Maranhão']
])

export function stateFromNumber(value = '') {
const digits = String(value || '').replace(/\D/g, '')
if (!digits.startsWith('55') || digits.length < 4) return '-'
return dddStateMap.get(digits.slice(2, 4)) || '-'
}

export const welcomeTags = [
'#numero#',
'#numerodele#',
'#nome#',
'#nomegrupo#',
'#nomedogp#',
'#prefixo#',
'#nomedobot#',
'#nomebot#',
'#hora#',
'#dia#',
'#data#',
'#ano#',
'#year#',
'#yeah#',
'#estado#',
'#membros#',
'#descrição#'
]

export function welcomeTagsHelp(prefix = '!') {
return `- ✍️ Use: *${prefix}legendabv sua legenda*\n- ✍️ Saída: *${prefix}legendasaiu sua legenda*\n\n*Tags disponíveis:*\n${welcomeTags.join(' • ')}`
}

function tagReplace(text, tag, value) {
return text.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), String(value ?? ''))
}

export function renderWelcome(template, data = {}) {
let text = String(template || '')
const numero = data.numero || '@usuario'
const nomegrupo = data.nomegrupo || 'Grupo'
const nomebot = data.nomebot || 'Aurora System'
const ano = data.ano || new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Fortaleza', year: 'numeric' })
const values = {
'#numero#': numero,
'#numerodele#': numero,
'#nome#': data.nome || 'Usuário',
'#nomegrupo#': nomegrupo,
'#nomedogp#': nomegrupo,
'#prefixo#': data.prefixo || '!',
'#nomedobot#': nomebot,
'#nomebot#': nomebot,
'#hora#': data.hora || '--:--',
'#dia#': data.dia || '-',
'#data#': data.data || '--/--/----',
'#ano#': ano,
'#year#': ano,
'#yeah#': ano,
'#estado#': data.estado || '-',
'#membros#': data.membros ?? 0,
'#descrição#': data.descricao || data.descrição || '-'
}
for (const [tag, value] of Object.entries(values)) text = tagReplace(text, tag, value)
// Compatibilidade com a legenda antiga do Aurora.
text = text.replace(/@user/gi, numero)
return text
}

async function fallbackAvatar() {
try {
const links = JSON.parse(await fs.readFile(linksFile, 'utf8'))
return String(links?.avatarPadrao || '').trim()
} catch {
return ''
}
}

function memberName(raw = {}, info = {}) {
return String(raw?.notify || raw?.name || raw?.pushName || raw?.displayName || info?.display || 'Usuário').trim()
}

function numberText(info = {}) {
if (info.number) return `@${info.number}`
if (info.display) return info.display
if (info.displayJid) return `@${String(info.displayJid).split('@')[0].split(':')[0]}`
return '@usuario'
}

function mediaPath(value = '') {
const raw = String(value || '').trim()
if (!raw) return ''
return path.isAbsolute(raw) ? raw : path.resolve(raw)
}

async function sendCustomBackground(client, groupJid, group, outgoing, caption, options) {
const saved = mediaPath(outgoing ? group.fundosaiu : group.fundobv)
const type = String(outgoing ? group.fundosaiu_tipo : group.fundobv_tipo).toLowerCase()
if (!saved) return false
try { await fs.access(saved) } catch { return false }

if (type === 'video' || /\.mp4$/i.test(saved)) {
await client.message.send(groupJid, {
type: 'video',
media: saved,
mimetype: 'video/mp4',
gifPlayback: true,
caption
}, options)
return true
}

await client.message.send(groupJid, {
type: 'image',
media: saved,
caption
}, options)
return true
}

async function sendProfileImage(client, config, groupJid, jid, caption, options) {
let url = ''
try {
const picture = await client.profile.getProfilePicture(jid, 'image')
url = String(picture?.url || '').trim()
} catch {}
if (!url) url = await fallbackAvatar()
if (!url) return false

let file
try {
file = await downloadFile(url, config, 'jpg')
await client.message.send(groupJid, {
type: 'image',
media: file.path,
mimetype: file.mimetype || 'image/jpeg',
caption
}, options)
return true
} catch (err) {
console.error('[ AURORA ] Foto do bem-vindo:', err?.message || err)
return false
} finally {
await cleanup(file)
}
}

export async function sendWelcomeParticipant({ client, config, necessarios = {}, groupJid, group, participant, action, metadata }) {
const outgoing = action === 'remove' || action === 'leave' || action === 'left'
const roster = metadata?.participants || []
const direct = participantIdentity(participant)
const info = direct.number ? direct : resolveIdentity(direct.jid || participant?.jid || participant?.id || participant, roster)
const jid = info.pnJid || info.jid || info.lidJid
if (!jid) return false

const now = new Date()
const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Fortaleza' })
const dia = now.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'America/Fortaleza' })
const data = now.toLocaleDateString('pt-BR', { timeZone: 'America/Fortaleza' })
const ano = now.toLocaleDateString('pt-BR', { year: 'numeric', timeZone: 'America/Fortaleza' })
const numero = numberText(info)
const template = outgoing ? group.legendasaiu : group.legendabv
const caption = renderWelcome(template, {
numero,
nome: memberName(participant, info),
nomegrupo: metadata?.subject || group.__nome || 'Grupo',
membros: Array.isArray(roster) ? roster.length : 0,
prefixo: config?.prefix || '!',
nomebot: config?.bot?.name || config?.name || 'Aurora System',
hora,
dia,
data,
ano,
estado: stateFromNumber(info.number || numero),
descricao: metadata?.desc || metadata?.description || ''
})

const mentions = [info.pnJid || info.jid || info.lidJid].filter(Boolean)
const options = verifiedSendOptions(
necessarios?.verificado === true,
groupJid,
memberName(participant, info),
{
mentions,
contextInfo: mentions.length ? { mentionedJid: mentions } : {}
}
)

if (await sendCustomBackground(client, groupJid, group, outgoing, caption, options)) return true
if (await sendProfileImage(client, config, groupJid, jid, caption, options)) return true
await client.message.send(groupJid, { type: 'text', text: caption }, options)
return true
}
