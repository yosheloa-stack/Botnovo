export default {name: 'fechar',aliases: [],category: 'adm',description: 'Fecha o grupo',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
await system.client.group.setSetting(system.from, 'announcement', true)
await system.reply(system.messages.groupClosed(system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
