export default {name: 'sairgp',aliases: [],category: 'dono',description: 'Sai do grupo atual',ownerOnly: true,groupOnly: true,async run(system){
await system.reply(system.messages.leaving())
await system.client.group.leaveGroup([system.from])
}
}
