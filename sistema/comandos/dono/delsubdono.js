import { delSubdono, ehDonoPrincipal } from '../../funcoes/subdonos.js'

export default {name: 'delsubdono',aliases: ['rmsubdono', 'delsubdona'],category: 'dono',description: 'Tira o acesso de dono de um subdono',ownerOnly: true,async run(system){
if (!ehDonoPrincipal(system.config, system.senderNumber)) return system.reply('- 🔒 Só o dono principal do bot pode colocar ou tirar subdono.')
const info = system.targetInfo()
if (!info.jid) return system.reply(`- 🧩 Use: *${system.prefix}delsubdono @pessoa* (ou responda a mensagem dela, ou mande o número com DDI).`)
if (!info.number) return system.reply(system.messages.phoneUnavailable())
if (!await delSubdono(info.number)) return system.reply(`- ⚠️ @${info.number} não é subdono.`, { mentions: [info.jid] })
await system.reply(`- ✅ @${info.number} não é mais subdono.`, { mentions: [info.jid] })
}
}
