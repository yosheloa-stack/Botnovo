import { autoSystem } from '../../funcoes/auto.js'

export default {name: 'autolike',aliases: [],category: 'ff',vipOnly: true,description: 'Adiciona ID ao autolike',async run(system){
if (!system.args[0]) return system.reply(system.messages.ffAutoUsage(system.prefix))
const uid = system.args.shift()
const options = {}
for (const item of system.args) {
const [key, value] = item.split(' = ')
if (['likes', 'dias', 'qtd'].includes(key) && value) options[key] = value
}
const d = await autoSystem.add(system.config, uid, options)
if (!d.sucesso) return system.reply(system.messages.apiError(d.erro || system.messages.ffAutoError()))
await system.reply(system.messages.ffAuto(d, uid))
}
}
