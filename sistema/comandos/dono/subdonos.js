import { listaSubdonos } from '../../funcoes/subdonos.js'

export default {name: 'subdonos',aliases: ['listasubdono', 'listsubdono'],category: 'dono',description: 'Lista os subdonos do bot',ownerOnly: true,async run(system){
const lista = listaSubdonos()
if (!lista.length) return system.reply(`- 📋 Nenhum subdono ainda. Para colocar: *${system.prefix}addsubdono @pessoa*`)
await system.reply(`- 📋 Subdonos do bot:\n\n${lista.map((n, i) => `${i + 1}. @${n}`).join('\n')}`, { mentions: lista.map((n) => `${n}@s.whatsapp.net`) })
}
}
