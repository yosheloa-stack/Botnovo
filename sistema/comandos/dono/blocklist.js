export default {name: 'blocklist',aliases: [],category: 'dono',description: 'Lista bloqueados',ownerOnly: true,async run(system){
await system.reply(system.messages.blockList(system.db.blocked))
}
}
