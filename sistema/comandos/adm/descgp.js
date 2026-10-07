export default {name: 'descgp',aliases: [],category: 'adm',description: 'Altera descrição',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
if (!system.q) return system.reply(system.messages.groupDescUsage(system.prefix))
await system.client.group.setDescription(system.from, system.q)
await system.reply(system.messages.groupDescDone(system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
