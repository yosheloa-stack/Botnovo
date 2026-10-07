function unwrapOne(message) {
if (!message) return message
return message?.ephemeralMessage?.message
?? message?.viewOnceMessage?.message
?? message?.viewOnceMessageV2?.message
?? message?.viewOnceMessageV2Extension?.message
?? message?.deviceSentMessage?.message
?? message?.groupMentionedMessage?.message
?? message?.botInvokeMessage?.message
?? message?.documentWithCaptionMessage?.message
?? message
}

export function unwrapMessage(message) {
let current = message
for (let i = 0; i < 8; i++) {
const next = unwrapOne(current)
if (!next || next === current) break
current = next
}
return current
}

export function isViewOnce(message) {
let current = message
for (let i = 0; i < 8 && current; i++) {
if (current?.viewOnceMessage?.message || current?.viewOnceMessageV2?.message || current?.viewOnceMessageV2Extension?.message) return true
const next = current?.ephemeralMessage?.message
?? current?.deviceSentMessage?.message
?? current?.groupMentionedMessage?.message
?? current?.botInvokeMessage?.message
?? current?.documentWithCaptionMessage?.message
?? null
if (!next) break
current = next
}
const m = unwrapMessage(message)
return Boolean(
m?.imageMessage?.viewOnce
|| m?.videoMessage?.viewOnce
|| m?.audioMessage?.viewOnce
)
}

export function mediaInfo(message) {
const m = unwrapMessage(message)
if (!m) return null
if (m.imageMessage) return {
type: 'image',
label: 'Foto',
emoji: '📷',
mimetype: m.imageMessage.mimetype || 'image/jpeg',
ptt: false,
caption: m.imageMessage.caption || '',
message: m
}
if (m.videoMessage) return {
type: 'video',
label: 'Vídeo',
emoji: '🎥',
mimetype: m.videoMessage.mimetype || 'video/mp4',
ptt: false,
caption: m.videoMessage.caption || '',
seconds: Number(m.videoMessage.seconds || m.videoMessage.duration || 0),
message: m
}
if (m.audioMessage) return {
type: 'audio',
label: 'Áudio',
emoji: '🎙️',
mimetype: m.audioMessage.mimetype || 'audio/ogg; codecs=opus',
ptt: Boolean(m.audioMessage.ptt),
caption: '',
message: m
}
return null
}

export function contextInfoFromMessage(message = {}) {
const m = unwrapMessage(message)
return m?.extendedTextMessage?.contextInfo
?? m?.imageMessage?.contextInfo
?? m?.videoMessage?.contextInfo
?? m?.documentMessage?.contextInfo
?? m?.audioMessage?.contextInfo
?? m?.stickerMessage?.contextInfo
?? null
}

export function quotedInfo(event = {}) {
const context = contextInfoFromMessage(event?.message)
if (!context?.stanzaId || !context?.quotedMessage) return null
return {
id: context.stanzaId,
participant: context.participant || '',
remoteJid: event?.key?.remoteJid || '',
message: context.quotedMessage,
context
}
}

function sameBaseJid(a = '', b = '') {
const base = (value) => String(value || '').split('@')[0].split(':')[0]
return Boolean(a && b && base(a) === base(b))
}

export function quotedTarget(system) {
const quoted = quotedInfo(system?.event)
if (!quoted) return null
const creds = system.client?.getCredentials?.() || {}
const own = [
creds.meJid,
creds.meLid,
creds.me?.jid,
system.config?.connection?.number ? `${String(system.config.connection.number).replace(/\D/g, '')}@s.whatsapp.net` : ''
].filter(Boolean)

const participant = quoted.participant || ''
const fromMe = participant
? own.some((jid) => sameBaseJid(jid, participant))
: false

return {
remoteJid: system.from,
id: quoted.id,
fromMe,
...(participant && !fromMe ? { participant } : {})
}
}
