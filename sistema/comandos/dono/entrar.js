export default {name: 'entrar',aliases: [],category: 'dono',description: 'Entra em grupo',ownerOnly: true,async run(system){
if (!system.args[0]) return system.reply(system.messages.enterUsage(system.prefix))
const code = system.args[0].split('chat.whatsapp.com/')[1]?.split(/[?&#]/)[0] ?? system.args[0]
await system.client.group.joinGroupViaInvite(code)
await system.reply(system.messages.entered())
}
}
