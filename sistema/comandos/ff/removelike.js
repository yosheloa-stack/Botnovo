import { autoSystem } from '../../funcoes/auto.js'

export default {name: 'removelike',aliases: [],category: 'ff',vipOnly: true,description: 'Remove ID do autolike',async run(system){
const uid = system.args[0]
if (!uid) return system.reply(system.messages.ffRemoveUsage(system.prefix))
const d = await autoSystem.remove(system.config, uid)
if (!d.sucesso) return system.reply(system.messages.apiError(d.erro || system.messages.ffRemoveError()))
await system.reply(system.messages.ffRemoved(d.uid ?? uid))
}
}
