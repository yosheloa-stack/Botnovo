export default {name: 'reiniciar',aliases: [],category: 'dono',description: 'Reinicia o bot',ownerOnly: true,async run(system){
await system.reply(system.messages.restarting())
setTimeout(() => process.exit(75), 500)
}
}
