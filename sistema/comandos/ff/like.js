import { autoSystem } from '../../funcoes/auto.js'

export default {name: 'like',aliases: [],category: 'ff',vipOnly: false,description: 'Envia likes',async run(system){
const uid = system.args[0]
if (!uid) return system.reply(system.messages.ffLikeUsage(system.prefix))
const d = await autoSystem.like(system.config, uid, system.args[1])
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffLikeError())))
await system.reply(system.messages.ffLike(d, uid, system.erroApi(d.aviso, '')))
}
}
