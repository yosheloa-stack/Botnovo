import { parseToggle } from '../../funcoes/toggle.js'
import { sendToggleButtons } from '../../funcoes/botoes.js'

export default {name: 'x9',aliases: [],category: 'adm',description: 'Ativa ou desativa o monitor X9',groupOnly: true,adminOnly: true,async run(system){
const value = parseToggle(system.args[0])
if (value === null) {
const sent = await sendToggleButtons(system, {
key: 'x9',
command: 'x9',
current: system.group?.x9 ?? 0
})
if (sent) return
return system.reply(`Use *${system.prefix}x9 1* para ativar ou *${system.prefix}x9 0* para desativar.`)
}

system.group.x9 = value
await (system.saveGroup?.() ?? system.save())
const admin = system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender
const mention = system.senderNumber ? `@${system.senderNumber}` : '@admin'

return system.reply(`⏤͟͟͞͞𝐗𝟗 𝐀𝐮𝐫𝐨𝐫𝐚! 𖤐⃝👀
•
> ${value ? 'O monitoramento X9 foi ativado.' : 'O monitoramento X9 foi desativado.'}
> *[👤]* • *ᴀᴄ̧ᴀ̃ᴏ ᴅᴇ:* ${mention}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`, { mentions: [admin] })
}
}
