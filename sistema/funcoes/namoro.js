import { display, sendAkameMedia } from './brincadeiras.js'

const zone = 'America/Fortaleza'
const footer = '> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃'

function data(info = {}) {
return { jid: info.jid || '', pnJid: info.pnJid || '', lidJid: info.lidJid || '', number: info.number || '' }
}
function values(info = {}) { return [info.jid, info.pnJid, info.lidJid, info.number].filter(Boolean).map(String) }
function same(a = {}, b = {}) { const s = new Set(values(a)); return values(b).some((x) => s.has(x)) }
function resolve(system, saved = {}) { return system.resolveIdentity(saved.jid || saved.pnJid || saved.lidJid || saved.number) }

function store(system) {
system.db.relationships ??= { couples: [], pending: [] }
system.db.relationships.couples = Array.isArray(system.db.relationships.couples) ? system.db.relationships.couples : []
system.db.relationships.pending = Array.isArray(system.db.relationships.pending) ? system.db.relationships.pending : []
return system.db.relationships
}

function coupleOf(system, who) {
return store(system).couples.find((x) => x.group === system.from && (same(who, x.a) || same(who, x.b)))
}

function when(value = Date.now()) {
const d = new Date(Number(value) || Date.now())
return {
date: new Intl.DateTimeFormat('pt-BR', { timeZone: zone, day: '2-digit', month: '2-digit', year: 'numeric' }).format(d),
time: new Intl.DateTimeFormat('pt-BR', { timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
}
}

function duration(ms = 0, compact = false) {
const total = Math.max(0, Number(ms) || 0)
const days = Math.floor(total / 86400000)
const hours = Math.floor((total % 86400000) / 3600000)
const minutes = Math.floor((total % 3600000) / 60000)
if (compact) return `${days}d ${hours}h ${minutes}min`
const parts = []
if (days) parts.push(`${days} ${days === 1 ? 'dia' : 'dias'}`)
if (hours || days) parts.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`)
parts.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`)
return parts.join(', ')
}

export async function askDating(system, target) {
const s = store(system)
if (same(system.senderInfo, target)) return system.reply('Você não pode pedir você mesmo(a) em namoro 😹')
if (coupleOf(system, system.senderInfo)) return system.reply('*Você já está namorando alguém no Aurora. ❤️*')
if (coupleOf(system, target)) return system.reply('Essa pessoa já está em um relacionamento no Aurora.')

s.pending = s.pending.filter((x) => !(x.group === system.from && (same(system.senderInfo, x.from) || same(target, x.to))))
const createdAt = Date.now()
const item = { group: system.from, from: data(system.senderInfo), to: data(target), createdAt }
s.pending.push(item)
await system.save()

const a = resolve(system, item.from)
const b = resolve(system, item.to)
const t = when(createdAt)
const texto = `⏤͟͟͞͞𝐏𝐞𝐝𝐢𝐝𝐨 𝐝𝐞 𝐧𝐚𝐦𝐨𝐫𝐨! 𖤐⃝💍
•
> ${display(a)} acabou de fazer um pedido especial para ${display(b)}... 💗
>
> 💌 _“Aceita namorar comigo?”_
•
> *[📅]* • *ᴅᴀᴛᴀ:* ${t.date}
> *[🕐]* • *ʜᴏʀᴀ:* ${t.time}
>
> ${display(b)}, responda *sim* ou *não*.
> Para cancelar: *${system.prefix}cancelarpedido*
•
${footer}`
return sendAkameMedia(system, 'namorar', texto, [a, b], texto)
}

export async function cancelDating(system) {
const s = store(system)
const index = s.pending.findIndex((x) => x.group === system.from && same(system.senderInfo, x.from))
if (index < 0) return system.reply('Você não possui pedido de namoro pendente para cancelar.')
const pending = s.pending[index]
s.pending.splice(index, 1)
await system.save()
const a = resolve(system, pending.from)
const b = resolve(system, pending.to)
const texto = `⏤͟͟͞͞𝐏𝐞𝐝𝐢𝐝𝐨 𝐜𝐚𝐧𝐜𝐞𝐥𝐚𝐝𝐨! 𖤐⃝💔
•
> ${display(a)} cancelou o pedido de namoro para ${display(b)}.
•
${footer}`
return system.reply(texto, { mentions: [a.jid, b.jid] })
}

export async function endDating(system) {
const s = store(system)
const index = s.couples.findIndex((x) => x.group === system.from && (same(system.senderInfo, x.a) || same(system.senderInfo, x.b)))
if (index < 0) return system.reply('*Você não está namorando ninguém no Aurora. 🤷‍♂️*')
const [couple] = s.couples.splice(index, 1)
const endedAt = Date.now()
await system.save()
const a = resolve(system, couple.a)
const b = resolve(system, couple.b)
const start = when(couple.startedAt)
const end = when(endedAt)
const lived = duration(endedAt - Number(couple.startedAt || endedAt))
const texto = `⏤͟͟͞͞𝐅𝐢𝐦 𝐝𝐞 𝐮𝐦𝐚 𝐡𝐢𝐬𝐭𝐨́𝐫𝐢𝐚... 𖤐⃝💔
•
> ${display(a)} e ${display(b)} não estão mais juntos.
>
> *[📅]* • *ɪɴɪ́ᴄɪᴏ:* ${start.date} às ${start.time}
> *[📅]* • *ᴛᴇ́ʀᴍɪɴᴏ:* ${end.date} às ${end.time}
> *[⏳]* • *ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ:* ${lived}
•
> _Nem toda história dura para sempre..._ 🥀
>
${footer}`
return system.reply(texto, { mentions: [a.jid, b.jid] })
}

export async function myDating(system) {
const couple = coupleOf(system, system.senderInfo)
if (!couple) return system.reply('*Você não está namorando ninguém no Aurora. 🤷‍♂️*')
const a = resolve(system, couple.a)
const b = resolve(system, couple.b)
const start = when(couple.startedAt)
const together = duration(Date.now() - Number(couple.startedAt || Date.now()))
const partner = same(system.senderInfo, couple.a) ? b : a
const texto = `⏤͟͟͞͞𝐌𝐢𝐧𝐡𝐚 𝐝𝐮𝐩𝐥𝐚! 𖤐⃝💗
•
> ${display(a)} 💞 ${display(b)}
>
> *[💍]* • *sᴛᴀᴛᴜs:* Namorando
> *[📅]* • *ᴅᴇsᴅᴇ:* ${start.date} às ${start.time}
> *[⏳]* • *ᴊᴜɴᴛᴏs ʜᴀ́:* ${together}
> *[💕]* • *ᴘᴀʀᴄᴇɪʀᴏ:* ${display(partner)}
•
> ୨୧ _Cada segundo conta quando é com a pessoa certa._ 💚
>
${footer}`
return sendAkameMedia(system, 'imgperfil', texto, [a, b], texto)
}

export async function handleDating(system) {
if (!system.isGroup) return false
const text = String(system.text || '').toLowerCase().trim()
if (!['s','sim','ok','n','nao','não','no'].includes(text)) return false
const s = store(system)
const index = s.pending.findIndex((x) => x.group === system.from && same(system.senderInfo, x.to))
if (index < 0) return false
const pending = s.pending[index]
const a = resolve(system, pending.from)
const b = resolve(system, pending.to)

if (['n','nao','não','no'].includes(text)) {
s.pending.splice(index, 1)
await system.save()
const texto = `⏤͟͟͞͞𝐏𝐞𝐝𝐢𝐝𝐨 𝐫𝐞𝐜𝐮𝐬𝐚𝐝𝐨... 𖤐⃝💔
•
> ${display(b)} recusou o pedido de namoro de ${display(a)}.
>
> _Faz parte... vida que segue 😭_
•
${footer}`
await system.reply(texto, { mentions: [a.jid, b.jid] })
return true
}

const startedAt = Date.now()
s.pending.splice(index, 1)
s.couples.push({ group: system.from, a: pending.from, b: pending.to, startedAt })
await system.save()
const t = when(startedAt)
const texto = `⏤͟͟͞͞𝐀𝐠𝐨𝐫𝐚 𝐞́ 𝐨𝐟𝐢𝐜𝐢𝐚𝐥! 𖤐⃝💞
•
> ${display(a)} 💗 ${display(b)}
>
> _Duas pessoas, uma história começando agora..._ 🌷
•
> *[💍]* • *sᴛᴀᴛᴜs:* Namorando
> *[📅]* • *ɪɴɪ́ᴄɪᴏ:* ${t.date}
> *[🕐]* • *ʜᴏʀᴀ:* ${t.time}
> *[💗]* • *ᴄᴀsᴀʟ:* ${display(a)} + ${display(b)}
•
> ୨୧ 𝚀𝚞𝚎 𝚎𝚜𝚜𝚊 𝚑𝚒𝚜𝚝𝚘́𝚛𝚒𝚊 𝚍𝚞𝚛𝚎 𝚖𝚞𝚒𝚝𝚘 💚
>
${footer}`
await sendAkameMedia(system, 'casal', texto, [a, b], texto)
return true
}
