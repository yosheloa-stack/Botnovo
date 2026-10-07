import { saveConfig } from '../../funcoes/config.js'

export default {name: 'setprefix',aliases: [],category: 'dono',description: 'Troca prefixo',ownerOnly: true,async run(system){
if (!system.args[0] || system.args[0].length>3) return system.reply(system.messages.prefixUsage(system.prefix))
system.config.prefix = system.args[0]
await saveConfig(system.config)
await system.reply(system.messages.prefixDone(system.args[0]))
}
}
