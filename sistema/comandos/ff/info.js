import { autoSystem } from '../../funcoes/auto.js'

export default {name: 'info',aliases: [],category: 'ff',vipOnly: true,description: 'Consulta jogador Free Fire',async run(system){
if (!system.args[0]) return system.reply(system.messages.ffInfoUsage(system.prefix))
const d = await autoSystem.info(system.config, system.args[0])
if (!d.sucesso) return system.reply(system.messages.apiError(d.erro || system.messages.ffInfoError()))
await system.reply(system.messages.ffInfo(d))
}
}
