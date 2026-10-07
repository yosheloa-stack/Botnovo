export function digits(value = '') {
return String(value).replace(/\D/g, '')
}

export function jidNumber(jid = '') {
const base = String(jid).split('@')[0].split(':')[0]
return digits(base)
}

export function isLidJid(jid = '') {
return String(jid).toLowerCase().endsWith('@lid')
}

export function isPnJid(jid = '') {
const value = String(jid).toLowerCase()
return value.endsWith('@s.whatsapp.net') || value.endsWith('@c.us')
}

export function userJid(value = '') {
if (isPnJid(value)) return `${jidNumber(value)}@s.whatsapp.net`
const raw = String(value).trim()
if (/^@\d+$/.test(raw)) return `${digits(raw)}@s.whatsapp.net`
if (raw.includes('@')) return ''
const n = digits(raw)
return n ? `${n}@s.whatsapp.net` : ''
}

export function isGroupJid(jid = '') {
return String(jid).endsWith('@g.us')
}

function unique(values = []) {
return [...new Set(values.map((x) => String(x || '').trim()).filter(Boolean))]
}

export function participantJids(p = {}) {
return unique([
p.jid,
p.lidJid,
p.pnJid,
p.phoneJid,
p.phoneNumber,
p.lid,
p.id
])
}

export function participantPnJid(p = {}) {
const direct = [p.pnJid, p.phoneJid, p.phoneNumber, p.jid, p.id]
for (const value of direct) {
if (isPnJid(value)) return `${jidNumber(value)}@s.whatsapp.net`
const normalized = userJid(value)
if (normalized) return normalized
}
return ''
}

export function participantLidJid(p = {}) {
for (const value of [p.lidJid, p.lid, p.jid, p.id]) {
if (isLidJid(value)) return String(value)
}
return ''
}

// O JID primário do participante acompanha o addressingMode do grupo no Zapo.
// Preserve p.jid para ações; PN/LID alternativos servem para identificação/exibição.
export function participantJid(p = {}) {
return String(p.jid || participantLidJid(p) || participantPnJid(p) || p.id || '')
}

export function participantNumber(p = {}) {
return jidNumber(participantPnJid(p))
}

export function participantDisplayJid(p = {}) {
return participantPnJid(p) || participantJid(p)
}

export function participantIdentity(p = {}) {
const jid = participantJid(p)
const pnJid = participantPnJid(p)
const lidJid = participantLidJid(p)
const number = jidNumber(pnJid)
return {
jid,
pnJid,
lidJid,
number,
displayJid: pnJid || jid,
display: number ? `@${number}` : (jid ? `@${jidNumber(jid)}` : '')
}
}

export function findParticipant(participants = [], value = '') {
const raw = String(value || '').trim()
if (!raw) return null
const rawNumber = jidNumber(raw)
const lid = isLidJid(raw)
const pn = isPnJid(raw)

for (const p of participants) {
const ids = participantJids(p)
if (ids.includes(raw)) return p
}

if (lid) {
return participants.find((p) => jidNumber(participantLidJid(p)) === rawNumber) || null
}

if (pn || !raw.includes('@')) {
return participants.find((p) => participantNumber(p) === rawNumber) || null
}

return null
}

export function resolveIdentity(value = '', participants = []) {
const raw = String(value || '').trim()
if (!raw) return participantIdentity({})

const found = findParticipant(participants, raw)
if (found) return participantIdentity(found)

if (isLidJid(raw)) {
return {
jid: raw,
pnJid: '',
lidJid: raw,
number: '',
displayJid: raw,
display: `@${jidNumber(raw)}`
}
}

const pnJid = isPnJid(raw) ? `${jidNumber(raw)}@s.whatsapp.net` : userJid(raw)
if (pnJid) {
const number = jidNumber(pnJid)
return {
jid: pnJid,
pnJid,
lidJid: '',
number,
displayJid: pnJid,
display: `@${number}`
}
}

return participantIdentity({})
}

export function resolveIdentityPair(primary = '', alt = '', participants = []) {
const first = resolveIdentity(primary, participants)
const second = resolveIdentity(alt, participants)
const jid = first.jid || second.jid
const pnJid = first.pnJid || second.pnJid
const lidJid = first.lidJid || second.lidJid
const number = jidNumber(pnJid)
return {
jid,
pnJid,
lidJid,
number,
displayJid: pnJid || jid,
display: number ? `@${number}` : (jid ? `@${jidNumber(jid)}` : '')
}
}

function contextInfoFromMessage(message = {}) {
const m = message?.ephemeralMessage?.message
?? message?.viewOnceMessage?.message
?? message?.viewOnceMessageV2?.message
?? message?.viewOnceMessageV2Extension?.message
?? message?.deviceSentMessage?.message
?? message?.groupMentionedMessage?.message
?? message?.botInvokeMessage?.message
?? message?.documentWithCaptionMessage?.message
?? message

return m?.extendedTextMessage?.contextInfo
?? m?.imageMessage?.contextInfo
?? m?.videoMessage?.contextInfo
?? m?.documentMessage?.contextInfo
?? m?.audioMessage?.contextInfo
?? null
}

export function rawTargetFromMessage(event, args = []) {
const context = contextInfoFromMessage(event?.message)
const mentioned = context?.mentionedJid
if (Array.isArray(mentioned) && mentioned[0]) return mentioned[0]
if (context?.participant) return context.participant
return userJid(args[0])
}

export function targetIdentityFromMessage(event, args = [], participants = []) {
return resolveIdentity(rawTargetFromMessage(event, args), participants)
}

export function targetFromMessage(event, args = [], participants = []) {
return targetIdentityFromMessage(event, args, participants).jid
}
