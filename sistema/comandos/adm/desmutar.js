export default {name: 'desmutar',aliases: [],category: 'adm',description: 'Desmuta usuário',groupOnly: true,adminOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
const keys = new Set([info.number, info.pnJid, info.lidJid, info.jid, info.display.replace(/^@/, '')].filter(Boolean))
system.db.muted[system.from] = (system.db.muted[system.from] ?? []).filter((x) => !keys.has(x))
await system.save()
const display = info.number || info.display.replace(/^@/, '')
await system.reply(system.messages.unmuted(display, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [info.jid, system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
