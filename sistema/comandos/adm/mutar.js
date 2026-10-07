export default {name: 'mutar',aliases: [],category: 'adm',description: 'Muta usuário no bot',groupOnly: true,adminOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
const key = info.number || info.pnJid || info.lidJid || info.jid
system.db.muted[system.from] ??=[]
if (!system.db.muted[system.from].includes(key)) system.db.muted[system.from].push(key)
await system.save()
const display = info.number || info.display.replace(/^@/, '')
await system.reply(system.messages.muted(display, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [info.jid, system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
