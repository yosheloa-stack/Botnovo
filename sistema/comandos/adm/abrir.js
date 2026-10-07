export default {name: 'abrir',aliases: [],category: 'adm',description: 'Abre o grupo',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
await system.client.group.setSetting(system.from, 'announcement', false)
await system.reply(system.messages.groupOpened(system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
