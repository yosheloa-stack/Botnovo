import { findParticipant } from '../../funcoes/jid.js'
import { sendReplyButtons } from '../../funcoes/botoes.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'

function participantName(system, info, profile) {
if (info.number === system.senderNumber || info.jid === system.senderInfo?.jid) return system.pushName
const p = findParticipant(system.metadata?.participants || [], info.jid || info.pnJid || info.lidJid)
return profile?.name || p?.notify || p?.name || p?.pushName || info.display || 'Usuário'
}

function ids(info = {}) {
return [info.jid, info.pnJid, info.lidJid, info.number].filter(Boolean).map(String)
}

function sameSaved(info = {}, saved = {}) {
const set = new Set(ids(info))
return [saved.jid, saved.pnJid, saved.lidJid, saved.number].filter(Boolean).some((x) => set.has(String(x)))
}

function relationship(system, info) {
if (!system.isGroup) return { text: 'Solteiro(a)', mentions: [] }
const couples = Array.isArray(system.db.relationships?.couples) ? system.db.relationships.couples : []
const couple = couples.find((x) => x.group === system.from && (sameSaved(info, x.a) || sameSaved(info, x.b)))
if (!couple) return { text: 'Solteiro(a)', mentions: [] }
const partnerSaved = sameSaved(info, couple.a) ? couple.b : couple.a
const partner = system.resolveIdentity(partnerSaved.jid || partnerSaved.pnJid || partnerSaved.lidJid || partnerSaved.number)
const text = partner.number ? `Namorando @${partner.number} 💚` : 'Namorando 💚'
return { text, mentions: [partner.pnJid || partner.jid || partner.lidJid].filter(Boolean) }
}

async function prepareProfileHeader(system, url = '') {
if (!url) return null
let file
try {
file = await downloadFile(url, system.config, 'jpg')
const uploaded = await system.client.message.upload(file.path, {
type: 'image',
mimetype: file.mimetype || 'image/jpeg'
})
if (!uploaded) return null
return {
hasMediaAttachment: true,
imageMessage: {
...uploaded,
mimetype: uploaded?.mimetype || file.mimetype || 'image/jpeg'
}
}
} catch (err) {
console.error('[ AURORA ] Falha ao preparar foto do perfil:', err?.message || err)
return null
} finally {
await cleanup(file)
}
}

async function sendProfileCard(system, { text, pictureUrl = '', mentions = [] } = {}) {
const header = await prepareProfileHeader(system, pictureUrl)
const sent = await sendReplyButtons(system, {
text,
footer: '𓂃 ࣪˖ ִֶָ𐀔 AURORA SYSTEM • PERFIL 𐀔 ִֶָ˖ ࣪𓂃',
header,
mentions,
buttons: [
{ id: `${system.prefix}ping`, text: 'ϟ ᴘɪɴɢ' },
{ id: `${system.prefix}menu`, text: '⌂ ᴍᴇɴᴜ' }
]
})
return sent
}

export default {name:'perfil',aliases:['profile', 'meuperfil'],category:'geral',description:'Mostra o perfil do usuário no Aurora',async run(system){
const target = system.targetInfo()
const info = target?.jid || target?.pnJid || target?.lidJid ? target : system.senderInfo
const key = info.number || info.lidJid || info.jid || system.senderKey
const isSelf = key === system.senderKey || (info.number && info.number === system.senderNumber)
const profile = isSelf ? system.profile : (system.db.profiles?.[key] || {
bio: 'Sem bio definida.', commands: 0, firstSeen: null, lastSeen: null, name: ''
})
const participant = findParticipant(system.metadata?.participants || [], info.jid || info.pnJid || info.lidJid)
const isAdmin = Boolean(participant?.isAdmin || participant?.isSuperAdmin || participant?.admin === 'admin' || participant?.admin === 'superadmin')
const cargo = isSelf && system.isOwner ? 'Dono' : isAdmin ? 'Admin' : 'Membro'
const vip = isSelf ? Boolean(system.isVip || system.isOwner) : Boolean(info.number && system.db.vip.includes(info.number))
const mention = info.number ? `@${info.number}` : (info.display || '@usuário')
const jid = info.pnJid || info.jid || info.lidJid || system.sender
const rel = relationship(system, info)
const text = system.messages.profile({
name: participantName(system, info, profile),
mention,
bio: profile?.bio,
cargo,
vip,
commands: profile?.commands,
relationship: rel.text,
firstSeen: profile?.firstSeen,
lastSeen: profile?.lastSeen,
prefix: system.prefix
})
let pictureUrl = ''
try {
const picture = await system.client?.profile?.getProfilePicture?.(jid, 'image')
pictureUrl = String(picture?.url || '').trim()
} catch {}

if (!pictureUrl) {
try {
const { mediaLink } = await import('../../funcoes/brincadeiras.js')
pictureUrl = mediaLink('avatarPadrao')
} catch {}
}

const mentions = [jid, ...rel.mentions].filter(Boolean)
const interactive = await sendProfileCard(system, { text, pictureUrl, mentions })
if (interactive) return

// Fallback quando os botões estiverem desligados ou o WhatsApp não aceitar o interativo.
if (pictureUrl) {
try {
const { sendRemoteImage } = await import('../../funcoes/brincadeiras.js')
return sendRemoteImage(system, pictureUrl, text, [info, ...rel.mentions])
} catch {}
}
return system.reply(text, { mentions })
}
}
