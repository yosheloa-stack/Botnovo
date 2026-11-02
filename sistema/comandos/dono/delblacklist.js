import { delListaNegra, numeroDoLid } from '../../funcoes/banco.js'
import { lerNumeros } from '../../funcoes/listaNegra.js'

export default {name: 'delblacklist',aliases: ['dellistanegra', 'delbl', 'rmblacklist', 'unblacklist'],category: 'dono',description: 'Tira números da lista negra',ownerOnly: true,async run(system){
let { numeros } = lerNumeros(system.args || [])
if (!numeros.length) {
  const info = system.targetInfo?.() || {}
  const n = info.number || (info.lidJid ? numeroDoLid(info.lidJid) : '')
  if (!n) return system.reply(`- 🧩 Use: *${system.prefix}delblacklist número* (com DDI, pode mandar vários).`)
  numeros = [n]
}
const saiu = [], nao = []
for (const n of numeros) (delListaNegra(n) ? saiu : nao).push(n)
const linhas = []
if (saiu.length) linhas.push(`- ✅ Saiu da lista negra: ${saiu.join(', ')}`)
if (nao.length) linhas.push(`- ⚠️ Não estava na lista: ${nao.join(', ')}`)
return system.reply(linhas.join('\n'))
}
}
