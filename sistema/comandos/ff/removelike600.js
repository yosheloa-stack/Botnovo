import { remover } from '../../funcoes/auto600.js'

export default {name: 'removelike600',aliases: ['delautolike600'],category: 'ff',ownerOnly: true,description: 'Tira um ID do AutoLike 300/600 (dono)',async run(system){
if (!system.args[0]) return system.reply(`- Uso: ${system.prefix}removelike600 uid`)
await remover(system, system.args[0])
}
}
