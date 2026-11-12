import { adicionar, listar, remover } from '../../funcoes/auto600.js'

// AUTOLIKE 300/600 (só o dono do bot). Travado até a liberação paga no site.
//   #autolike600 uid · #autolike600 lista · #autolike600 remover uid
export default {name: 'autolike600',aliases: ['autolike300','autolike400','auto600'],category: 'ff',ownerOnly: true,description: 'AutoLike de 300 a 600 likes (dono)',async run(system){
const a = (system.args[0] || '').toLowerCase()
if (!a) return system.reply(`- ⚡ \`𝙰𝚄𝚃𝙾𝙻𝙸𝙺𝙴 𝟹𝟶𝟶/𝟼𝟶𝟶\`\n\n- Uso: ${system.prefix}autolike600 uid\n- Ficha dos IDs: ${system.prefix}listalike600\n- Tirar um ID: ${system.prefix}removelike600 uid`)
if (['lista', 'list', 'listar'].includes(a)) return listar(system)
if (['remover', 'remove', 'del'].includes(a)) return system.args[1] ? remover(system, system.args[1]) : system.reply(`- Uso: ${system.prefix}removelike600 uid`)
return adicionar(system, system.args[0])
}
}
