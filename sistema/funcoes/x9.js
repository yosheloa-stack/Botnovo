import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { proto } from 'zapo-js'
import { groupState } from './banco.js'
import { participantIdentity, resolveIdentity } from './jid.js'
import { isViewOnce, mediaInfo, unwrapMessage } from './mensagem.js'
import { verifiedSendOptions } from './meta.js'
import { necessarios as currentNecessarios } from './necessarios.js'

const cache = new Map()
const order = []
const cacheLimit = 400
const mediaLimit = 25 * 1024 * 1024
const tempDir = path.join(os.tmpdir(), 'aurora-x9')

// IDs de mensagens que o próprio Aurora enviou pela API da Zapo.
// Isso diferencia eco multi-device (fromMe) de uma mensagem realmente enviada pelo bot.
const localSent = new Set()
const localSentOrder = []
const localSentLimit = 1200

// Revokes automáticos do Aurora (antivisu, X9viewOnce, anti-mídia etc.).
// Evita que o X9 denuncie uma exclusão feita pelo próprio sistema de proteção.
const suppressedProtocol = new Set()
const suppressedOrder = []
const suppressedLimit = 600

const sentX9 = new Set()
const sentOrder = []
const seenViewOnce = new Set()
const seenViewOnceOrder = []

const footer = `•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`

function keyOf(jid = '', id = '') {
return `${jid}:${id}`
}

function boundedAdd(set, list, value, limit) {
if (!value) return
if (!set.has(value)) list.push(value)
set.add(value)
while (list.length > limit) set.delete(list.shift())
}

export function trackLocalSent(event = {}) {
const id = event?.key?.id || event?.id || event?.messageId || ''
if (id) boundedAdd(localSent, localSentOrder, id, localSentLimit)
}

export function createOutgoingX9Tracker() {
return (event) => {
try { trackLocalSent(event) } catch {}
}
}

export function isLocalSentMessage(id = '') {
return Boolean(id && localSent.has(id))
}

export function suppressX9Protocol(jid = '', id = '') {
const key = keyOf(jid, id)
if (jid && id) boundedAdd(suppressedProtocol, suppressedOrder, key, suppressedLimit)
}

function consumeSuppressedProtocol(jid = '', id = '') {
const key = keyOf(jid, id)
if (!suppressedProtocol.has(key)) return false
suppressedProtocol.delete(key)
return true
}

function markViewOnceSeen(jid = '', id = '') {
const key = keyOf(jid, id)
if (jid && id) boundedAdd(seenViewOnce, seenViewOnceOrder, key, 800)
}

function wasViewOnceSeen(jid = '', id = '') {
return seenViewOnce.has(keyOf(jid, id))
}

async function x9Send(client, jid, content, options = {}) {
const finalOptions = verifiedSendOptions(
currentNecessarios()?.verificado === true,
jid,
'Aurora System',
options
)
const result = await client.message.send(jid, content, finalOptions)
const id = result?.id || result?.key?.id || result?.messageId
if (id) {
boundedAdd(sentX9, sentOrder, id, 600)
boundedAdd(localSent, localSentOrder, id, localSentLimit)
}
return result
}

function hour() {
return new Date().toLocaleTimeString('pt-BR', {
hour: '2-digit',
minute: '2-digit',
timeZone: 'America/Fortaleza'
})
}

function messageText(message) {
const m = unwrapMessage(message)
if (!m) return ''
let interactive = ''
try {
interactive = JSON.parse(m?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id || ''
} catch {}
return String(
m?.conversation
?? m?.extendedTextMessage?.text
?? m?.imageMessage?.caption
?? m?.videoMessage?.caption
?? m?.documentMessage?.caption
?? m?.buttonsResponseMessage?.selectedButtonId
?? m?.listResponseMessage?.singleSelectReply?.selectedRowId
?? m?.templateButtonReplyMessage?.selectedId
?? interactive
?? ''
).trim()
}

async function metadata(client, jid) {
try { return await client.group.queryGroupMetadata(jid) } catch { return null }
}

function rawIdentityValue(value) {
if (!value || typeof value !== 'object') return value || ''
return value.pnJid
?? value.phoneJid
?? value.jid
?? value.lidJid
?? value.id
?? value.participant
?? value.userJid
?? value.actorJid
?? ''
}

function mentionInfo(value, participants = []) {
const raw = rawIdentityValue(value)
const info = resolveIdentity(raw, participants)
return {
jid: info.pnJid || info.jid || String(raw || ''),
text: info.display || (raw ? `@${String(raw).split('@')[0].split(':')[0]}` : '@usuario')
}
}

function eventActor(event = {}, client = null) {
const primary = event.actorJid
?? event.actor
?? event.authorJid
?? event.initiatorJid
?? event.senderJid
?? event.adminJid
?? event.admin
?? event.by
?? event.author
?? event.key?.participant
?? event.participant
?? ''
const alt = event.actorAlt
?? event.authorAlt
?? event.senderAlt
?? event.key?.participantAlt
?? event.participantAlt
?? ''
if (primary || alt) return { jid: primary, pnJid: alt }
if (event?.key?.fromMe && client) {
const creds = client.getCredentials?.() || {}
return { jid: creds.meLid || creds.meJid || '', pnJid: creds.meJid || '' }
}
return ''
}

function recursiveFind(value, matcher, depth = 0) {
if (!value || typeof value !== 'object' || depth > 9) return null
for (const [key, current] of Object.entries(value)) {
if (matcher(key, current)) return { key, value: current }
const nested = recursiveFind(current, matcher, depth + 1)
if (nested) return nested
}
return null
}

function recursiveStringArray(value, keyRx, depth = 0) {
if (!value || typeof value !== 'object' || depth > 9) return []
for (const [key, current] of Object.entries(value)) {
if (keyRx.test(key) && Array.isArray(current)) {
const list = current.map((x) => typeof x === 'string' ? x : x?.name || x?.text || '').filter(Boolean)
if (list.length) return list
}
const nested = recursiveStringArray(current, keyRx, depth + 1)
if (nested.length) return nested
}
return []
}

async function cleanupEntry(entry) {
if (!entry?.mediaPath) return
try { await fs.unlink(entry.mediaPath) } catch {}
}

async function trimCache() {
while (order.length > cacheLimit) {
const old = order.shift()
const entry = cache.get(old)
cache.delete(old)
await cleanupEntry(entry)
}
}

export async function cacheIncomingX9(system) {
if (!system?.isGroup || Number(system.group?.x9) !== 1) return
const id = system.event?.key?.id
if (!id || isLocalSentMessage(id)) return
const k = keyOf(system.from, id)
const media = mediaInfo(system.msg)
const sender = {
jid: system.senderInfo?.lidJid || system.senderInfo?.jid || system.sender,
pnJid: system.senderInfo?.pnJid || system.senderAlt || ''
}
const entry = {
id,
jid: system.from,
sender,
text: messageText(system.msg),
kind: system.kind,
viewOnce: isViewOnce(system.msg),
mediaType: media?.type || '',
mediaLabel: media?.label || '',
mimetype: media?.mimetype || '',
ptt: Boolean(media?.ptt),
mediaPath: '',
key: { ...system.event?.key }
}

if (media) {
try {
await fs.mkdir(tempDir, { recursive: true })
const ext = media.type === 'image' ? 'jpg' : media.type === 'video' ? 'mp4' : 'ogg'
const file = path.join(tempDir, `${Date.now()}-${crypto.randomUUID()}.${ext}`)
await system.client.message.downloadToFile(system.event, file, { maxBytes: mediaLimit })
entry.mediaPath = file
} catch {}
}

if (cache.has(k)) await cleanupEntry(cache.get(k))
cache.set(k, entry)
order.push(k)
await trimCache()

if (entry.viewOnce && !wasViewOnceSeen(system.from, id)) {
markViewOnceSeen(system.from, id)
const user = mentionInfo(entry.sender, system.metadata?.participants || [])
await x9Send(system.client, system.from, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐕𝐢𝐞𝐰 𝐎𝐧𝐜𝐞! 𖤐⃝👁️
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${user.text}
> *[${media?.emoji || '👁️'}]* • *ᴍɪ́ᴅɪᴀ:* ${media?.label || 'Visualização única'}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: user.jid ? [user.jid] : [] })
}
}

function protocolTypeName(type) {
const Type = proto?.Message?.ProtocolMessage?.Type || {}
for (const [name, value] of Object.entries(Type)) if (value === type) return name
return String(type ?? '')
}

function protocolKind(p = {}) {
const name = protocolTypeName(p.type).toUpperCase()
if (name.includes('REVOKE')) return 'revoke'
if (name.includes('MESSAGE_EDIT') || name.includes('EDIT')) return 'edit'
if (p.editedMessage || p.message?.editedMessage) return 'edit'
return ''
}

function protocolTarget(p = {}, event = {}) {
const key = p.key || p.messageKey || p.targetKey || p.editedMessage?.key || {}
return {
remoteJid: key.remoteJid || event?.key?.remoteJid || '',
id: key.id || p?.targetId || p?.messageId || '',
participant: key.participant || key.participantJid || '',
participantAlt: key.participantAlt || ''
}
}

export function createProtocolX9Handler({ client }) {
return async (event) => {
try {
const p = event?.protocolMessage
if (!p) return
const target = protocolTarget(p, event)
const groupJid = target.remoteJid
if (!groupJid.endsWith('@g.us') || Number(groupState(groupJid).x9) !== 1) return
const targetId = target.id
if (!targetId) return
if (sentX9.has(targetId) || isLocalSentMessage(targetId)) return
if (consumeSuppressedProtocol(groupJid, targetId)) return

const kind = protocolKind(p)
if (!kind) return
const cached = cache.get(keyOf(groupJid, targetId))
const actor = eventActor(event, client)

if (kind === 'revoke') {
const author = cached?.sender || { jid: target.participant, pnJid: target.participantAlt }
const meta = await metadata(client, groupJid)
const participants = meta?.participants || []
const authorInfo = mentionInfo(author, participants)
const actorInfo = mentionInfo(actor, participants)
const sameActor = actorInfo.jid && authorInfo.jid && String(actorInfo.jid) === String(authorInfo.jid)
const whoLine = actorInfo.jid && !sameActor
? `\n> *[🛡️]* • *ᴀᴘᴀɢᴀᴅᴀ ᴘᴏʀ:* ${actorInfo.text}`
: ''
const content = cached?.text
? cached.text
: cached?.mediaLabel
? `[${cached.mediaLabel}]`
: 'Conteúdo não estava mais no cache.'

await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐀𝐮𝐫𝐨𝐫𝐚! 𖤐⃝👀
•
> *[🗑️]* • Uma mensagem foi apagada.
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${authorInfo.text}${whoLine}
> *[💬]* • *ᴄᴏɴᴛᴇᴜ́ᴅᴏ:* ${content}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: [...new Set([authorInfo.jid, actorInfo.jid].filter(Boolean))] })

if (cached?.mediaPath) {
try {
await x9Send(client, groupJid, {
type: cached.mediaType,
media: cached.mediaPath,
mimetype: cached.mimetype,
...(cached.mediaType !== 'audio' && cached.text ? { caption: `👀 Mídia apagada de ${authorInfo.text}` } : {}),
...(cached.mediaType === 'audio' ? { ptt: cached.ptt } : {})
}, { mentions: authorInfo.jid ? [authorInfo.jid] : [] })
} catch {}
}
return
}

if (kind === 'edit') {
const newMessage = p.editedMessage?.message || p.editedMessage || p.message?.editedMessage?.message || p.message || event?.message
const after = messageText(newMessage)
if (!after) return
const author = cached?.sender || { jid: target.participant || rawIdentityValue(actor), pnJid: target.participantAlt || '' }
const meta = await metadata(client, groupJid)
const info = mentionInfo(author, meta?.participants || [])
const before = cached?.text || 'Texto anterior não estava mais no cache.'
await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐝𝐞 𝐄𝐝𝐢𝐜̧𝐚̃𝐨! 𖤐⃝✏️
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${info.text}
> *[📄]* • *ᴀɴᴛᴇs:* ${before}
> *[✏️]* • *ᴅᴇᴘᴏɪs:* ${after}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: info.jid ? [info.jid] : [] })
if (cached) cached.text = after
}
} catch (err) {
console.error('[ AURORA ] X9 protocol:', err?.message || err)
}
}
}

function addonGroupJid(event = {}) {
return event?.key?.remoteJid
?? event?.remoteJid
?? event?.chatJid
?? event?.messageKey?.remoteJid
?? event?.targetKey?.remoteJid
?? ''
}

function reactionPayload(event = {}) {
return event.reaction
?? event.reactionMessage
?? event.addon?.reaction
?? event.addon?.reactionMessage
?? recursiveFind(event, (key) => /^(reaction|reactionMessage)$/i.test(key))?.value
?? null
}

function pollPayload(event = {}) {
return event.pollVote
?? event.pollUpdate
?? event.pollUpdateMessage
?? event.addon?.pollVote
?? event.addon?.pollUpdateMessage
?? recursiveFind(event, (key) => /^(pollVote|pollUpdate|pollUpdateMessage|vote)$/i.test(key))?.value
?? null
}

export function createInteractionX9Handler({ client }) {
return async (event) => {
try {
const groupJid = addonGroupJid(event)
if (!groupJid.endsWith('@g.us') || Number(groupState(groupJid).x9) !== 1) return
const reaction = reactionPayload(event)
const poll = pollPayload(event)
if (!reaction && !poll) return // comentários/addons genéricos ficam fora do X9

const meta = await metadata(client, groupJid)
const actor = eventActor(event, client)
const info = mentionInfo(actor, meta?.participants || [])

if (reaction) {
const emoji = reaction.text || reaction.emoji || reaction.reaction || event?.emoji || '—'
await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐝𝐞 𝐑𝐞𝐚𝐜̧𝐚̃𝐨! 𖤐⃝${emoji || '👀'}
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${info.text}
> *[😂]* • *ʀᴇᴀᴄ̧ᴀ̃ᴏ:* ${emoji || 'Removida'}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: info.jid ? [info.jid] : [] })
return
}

const selected = Array.isArray(event?.selectedOptionNames)
? event.selectedOptionNames
: Array.isArray(poll?.selectedOptionNames)
? poll.selectedOptionNames
: recursiveStringArray(event, /selectedOptionNames|selectedOptions|optionNames/i)
await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐝𝐞 𝐄𝐧𝐪𝐮𝐞𝐭𝐞! 𖤐⃝📊
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${info.text}
> *[✅]* • *ᴠᴏᴛᴏ:* ${selected.join(', ') || 'Voto atualizado'}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: info.jid ? [info.jid] : [] })
} catch (err) {
console.error('[ AURORA ] X9 interação:', err?.message || err)
}
}
}

function participantList(event = {}) {
return Array.isArray(event.participants) ? event.participants : []
}

function targetIdentities(event = {}, roster = []) {
return participantList(event).map((p) => {
const direct = participantIdentity(p)
if (direct.jid || direct.pnJid) return direct
return resolveIdentity(p?.jid || p?.id || p, roster)
})
}

export function createGroupX9Handler({ client }) {
return async (event) => {
try {
const groupJid = event?.groupJid || ''
if (!groupJid || Number(groupState(groupJid).x9) !== 1) return
const action = String(event?.action || '').toLowerCase()
if (!action) return

const meta = await metadata(client, groupJid)
const roster = meta?.participants || []
const targets = targetIdentities(event, roster)
const actorValue = eventActor(event, client)
const actorInfo = mentionInfo(actorValue, roster)
const targetJids = targets.map((x) => x.pnJid || x.jid).filter(Boolean)
const actorIsTarget = Boolean(actorInfo.jid && targetJids.some((jid) => String(jid) === String(actorInfo.jid)))
const mentions = [...new Set([
...(!actorIsTarget ? [actorInfo.jid] : []),
...targetJids
].filter(Boolean))]
const targetText = targets.map((x) => x.display || `@${String(x.displayJid || x.jid || '').split('@')[0]}`).filter(Boolean).join(', ') || '@usuario'
const by = actorInfo.jid && !actorIsTarget ? ` por ${actorInfo.text}` : ''

let emoji = '🛡️'
let sentence = ''
if (/promot|make.?admin|admin_add/.test(action)) sentence = `${targetText} foi promovido${by}. 👑`
else if (/demot|remove.?admin|admin_remove/.test(action)) sentence = `${targetText} foi rebaixado${by}. ⬇️`
else if (/^(add|join|joined|participant_add)$/.test(action)) sentence = by ? `${targetText} foi adicionado${by}. ➕` : `${targetText} entrou no grupo. ➕`
else if (/^(remove|leave|left|participant_remove)$/.test(action)) sentence = by ? `${targetText} foi removido${by}. 🥾` : `${targetText} saiu do grupo. 🚪`
else if (action.includes('subject') || action === 'rename' || action.includes('name')) {
const name = event.subject || event.newSubject || event.value || meta?.subject || 'Novo nome'
sentence = `O nome do grupo foi alterado${by}.\n> *[🏷️]* • *ɴᴏᴠᴏ ɴᴏᴍᴇ:* ${name}`
emoji = '🏷️'
} else if (action.includes('description') || action.includes('desc')) {
sentence = `A descrição do grupo foi alterada${by}.`
emoji = '📝'
} else if (action.includes('setting') || action.includes('announce') || action.includes('restrict')) {
sentence = `Uma configuração do grupo foi alterada${by}.`
emoji = '⚙️'
} else return

await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐝𝐨 𝐆𝐫𝐮𝐩𝐨! 𖤐⃝${emoji}
•
> ${sentence}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions })
} catch (err) {
console.error('[ AURORA ] X9 grupo:', err?.message || err)
}
}
}

export function createCallX9Handler({ client }) {
return async (event) => {
try {
if (String(event?.type || '').toLowerCase() !== 'offer') return
const groupJid = event?.groupJid || ''
if (!groupJid || Number(groupState(groupJid).x9) !== 1) return
const caller = { jid: event?.callCreatorJid || '', pnJid: event?.callerPnJid || '' }
const meta = await metadata(client, groupJid)
const info = mentionInfo(caller, meta?.participants || [])
await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐝𝐞 𝐋𝐢𝐠𝐚𝐜̧𝐚̃𝐨! 𖤐⃝${event?.isVideo ? '📹' : '📞'}
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${info.text}
> *[${event?.isVideo ? '📹' : '📞'}]* • *ᴛɪᴘᴏ:* Ligação de ${event?.isVideo ? 'vídeo' : 'voz'}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: info.jid ? [info.jid] : [] })
} catch (err) {
console.error('[ AURORA ] X9 ligação:', err?.message || err)
}
}
}

export function createUnavailableX9Handler({ client }) {
return async (event) => {
try {
const groupJid = event?.key?.remoteJid || ''
if (!groupJid.endsWith('@g.us')) return
const g = groupState(groupJid)
const id = event?.key?.id || ''

// A Zapo sinaliza view-once consumido como message_unavailable(kind=view_once).
// Se o AntiVisu estiver ativo, ainda tentamos remover o placeholder usando a key real.
if (event?.kind === 'view_once' && Number(g.antiVisu) === 1 && id && !isLocalSentMessage(id)) {
try {
suppressX9Protocol(groupJid, id)
await client.message.send(groupJid, { type: 'revoke', target: event.key })
} catch {}
}

if (Number(g.x9) !== 1) return
if (event?.kind === 'view_once' && wasViewOnceSeen(groupJid, id)) return
if (event?.kind === 'view_once') markViewOnceSeen(groupJid, id)

const sender = { jid: event?.key?.participant || '', pnJid: event?.key?.participantAlt || '' }
const meta = await metadata(client, groupJid)
const info = mentionInfo(sender, meta?.participants || [])
const labels = {
view_once: 'Visualização única',
hosted: 'Hosted',
bot: 'Bot',
other: 'Outra'
}
await x9Send(client, groupJid, {
type: 'text',
text: `⏤͟͟͞͞𝐗𝟗 𝐌𝐞𝐬𝐬𝐚𝐠𝐞! 𖤐⃝⚠️
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${info.text}
> *[⚠️]* • Uma mensagem ficou indisponível.
> *[🧩]* • *ᴛɪᴘᴏ:* ${labels[event?.kind] || event?.kind || 'Desconhecido'}
> *[🕐]* • *ʜᴏʀᴀ:* ${hour()}
${footer}`
}, { mentions: info.jid ? [info.jid] : [] })
} catch (err) {
console.error('[ AURORA ] X9 indisponível:', err?.message || err)
}
}
}
