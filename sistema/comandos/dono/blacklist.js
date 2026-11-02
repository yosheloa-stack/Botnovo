import { listaNegra } from '../../funcoes/banco.js'

export default {name: 'blacklist',aliases: ['listanegra', 'bl', 'listblacklist'],category: 'dono',description: 'Mostra a lista negra',ownerOnly: true,async run(system){
const lista = listaNegra()
if (!lista.length) return system.reply(`- ✅ A lista negra está vazia.\n- Para pôr alguém: *${system.prefix}addblacklist número*`)
const data = (at) => at ? new Date(at).toLocaleDateString('pt-BR', { timeZone: 'America/Fortaleza' }) : ''
const linhas = lista.map((x, i) => `${i + 1}. ${x.numero}${x.motivo ? ` — ${x.motivo}` : ''}${x.at ? ` (${data(x.at)})` : ''}`)
return system.reply(`⏤͟͟͞͞𝐋𝐢𝐬𝐭𝐚 𝐍𝐞𝐠𝐫𝐚! 𖤐⃝🚫\n•\n${linhas.join('\n')}\n•\n> Total: ${lista.length}. Entrou num grupo onde eu sou ADM, eu removo na hora.\n> Tirar: *${system.prefix}delblacklist número*`)
}
}
