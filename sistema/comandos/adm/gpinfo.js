export default {name: 'gpinfo',aliases: [],category: 'adm',description: 'Informações do grupo',groupOnly: true,async run(system){
const meta = system.metadata ?? await system.client.group.queryGroupMetadata(system.from)
await system.reply(system.messages.groupInfo(meta, system.from))
}
}
