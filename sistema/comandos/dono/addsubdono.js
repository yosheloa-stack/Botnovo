import { addSubdono, ehDonoPrincipal } from '../../funcoes/subdonos.js'

export default {name: 'addsubdono',aliases: ['subdono', 'addsubdona'],category: 'dono',description: 'Dá acesso de dono a uma pessoa (subdono)',ownerOnly: true,async run(system){
if (!ehDonoPrincipal(system.config, system.senderNumber)) return system.reply('- 🔒 Só o dono principal do bot pode colocar ou tirar subdono.')
const info = system.targetInfo()
if (!info.jid) return system.reply(`- 🧩 Use: *${system.prefix}addsubdono @pessoa* (ou responda a mensagem dela, ou mande o número com DDI).`)
if (!info.number) return system.reply(system.messages.phoneUnavailable())
const r = await addSubdono(system.config, info.number)
if (r === 'dono') return system.reply('- ⚠️ Esse número já é o dono principal do bot.')
if (r === 'ja') return system.reply(`- ⚠️ @${info.number} já é subdono.`, { mentions: [info.jid] })
if (r === 'cheio') return system.reply(`- ⚠️ O bot já tem 5 subdonos, o máximo. Para colocar outro, tire um com *${system.prefix}delsubdono*.`)
await system.reply(`- ✅ @${info.number} agora é subdono e pode usar os comandos de dono.`, { mentions: [info.jid] })
}
}
