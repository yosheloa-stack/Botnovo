import { autoSystem } from '../../funcoes/auto.js'

export default {name: 'listalike',aliases: [],category: 'ff',vipOnly: true,description: 'Lista autolikes',async run(system){
const d = await autoSystem.list(system.config)
if (!d.sucesso) return system.reply(system.messages.apiError(d.erro || system.messages.ffListError()))
const list = d.ids ?? d.lista ?? d.autolikes ?? d.data ?? []
await system.reply(system.messages.ffList(Array.isArray(list) ? list : []))
}
}
