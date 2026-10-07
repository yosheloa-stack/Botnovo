export default {name: 'nomegp',aliases: [],category: 'adm',description: 'Altera nome do grupo',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
if (!system.q) return system.reply(system.messages.groupNameUsage(system.prefix))
await system.client.group.setSubject(system.from, system.q)
await system.reply(system.messages.groupNameDone(system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
