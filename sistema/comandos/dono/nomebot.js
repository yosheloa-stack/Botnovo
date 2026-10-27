import { modoCliente, trocarNomeLocal } from '../../funcoes/cliente.js'

export default {name: 'nomebot',aliases: ['setnome', 'setnomebot', 'nomedobot', 'trocarnome'],category: 'dono',description: 'Troca o nome do bot (menu e WhatsApp)',ownerOnly: true,async run(system){
const nome = system.q.replace(/\s+/g, ' ').trim()
if (!nome) return system.reply(`- 🧩 Use: *${system.prefix}nomebot novo nome*`)
if (nome.length > 25) return system.reply('- ⚠️ O nome pode ter no máximo 25 letras.')
if (modoCliente) trocarNomeLocal(nome)
let noWhatsapp = true
try { await system.client.profile.setPushName(nome) } catch (err) {
noWhatsapp = false
console.warn('[ NOMEBOT ] setPushName:', err?.message || err)
}
if (!modoCliente && !noWhatsapp) return system.reply('- ❌ Não consegui trocar o nome agora. Tente de novo em alguns minutos.')
await system.reply(noWhatsapp ? `- ✅ Nome do bot trocado para: *${nome}*` : `- ✅ Nome do bot no menu trocado para: *${nome}*`)
}
}
