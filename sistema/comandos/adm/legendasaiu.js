import { welcomeTagsHelp } from '../../funcoes/boasvindas.js'

export default {name: 'legendasaiu',aliases: ['legendasair'],category: 'adm',description: 'Define a legenda de saída do bem-vindo',groupOnly: true,adminOnly: true,async run(system){
if (!system.q) return system.reply(welcomeTagsHelp(system.prefix))
system.group.legendasaiu = system.q
await (system.saveGroup?.() ?? system.save())
return system.reply(`- ✅ Legenda de *saída* atualizada.\n\n${welcomeTagsHelp(system.prefix)}`)
}
}
