import { welcomeTagsHelp } from '../../funcoes/boasvindas.js'

export default {name: 'legendabv',aliases: ['setbemvindo'],category: 'adm',description: 'Define a legenda de entrada do bem-vindo',groupOnly: true,adminOnly: true,async run(system){
if (!system.q) return system.reply(welcomeTagsHelp(system.prefix))
system.group.legendabv = system.q
await (system.saveGroup?.() ?? system.save())
return system.reply(`- ✅ Legenda de *boas-vindas* atualizada.\n\n${welcomeTagsHelp(system.prefix)}`)
}
}
