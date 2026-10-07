export default {name: 'membros',aliases: [],category: 'adm',description: 'Mostra membros',groupOnly: true,async run(system){
const meta = system.metadata ?? await system.client.group.queryGroupMetadata(system.from)
await system.reply(system.messages.members(meta))
}
}
