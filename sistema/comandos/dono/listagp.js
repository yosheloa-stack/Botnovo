export default {name: 'listagp',aliases: [],category: 'dono',description: 'Lista grupos',ownerOnly: true,async run(system){
const groups = await system.client.group.queryAllGroups()
const list = Array.isArray(groups)?groups:Object.values(groups ?? {})
await system.reply(system.messages.groups(list.slice(0, 100)))
}
}
