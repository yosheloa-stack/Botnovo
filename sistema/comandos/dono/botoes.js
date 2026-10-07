import { parseToggle } from '../../funcoes/toggle.js'
import { sendToggleButtons } from '../../funcoes/botoes.js'
import { necessarios as getNecessarios, setNecessario } from '../../funcoes/necessarios.js'

export default {name: 'botoes',aliases: ['buttons', 'button'],category: 'dono',description: 'Ativa/desativa os botões e listas do Aurora',ownerOnly: true,async run(system){
const value = parseToggle(system.args[0])
const flags = getNecessarios()
system.necessarios = flags

if (value === null) {
const sent = await sendToggleButtons(system, {
key: 'botoes',
command: 'botoes',
current: flags.botoes ? 1 : 0,
owner: true
})
if (sent) return
return system.reply(`⏤͟͟͞͞𝐁𝐨𝐭𝐨̃𝐞𝐬 𝐝𝐨 𝐀𝐮𝐫𝐨𝐫𝐚! 𖤐⃝🔘\n•\n> *[⚙️]* • *sᴛᴀᴛᴜs:* ${flags.botoes ? 'Ativado ✅' : 'Desativado ❌'}\n>\n> Use *${system.prefix}botoes 1* para ativar.\n> Use *${system.prefix}botoes 0* para desativar.\n•\n> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`)
}

await setNecessario('botoes', Boolean(value))
system.necessarios = getNecessarios()

return system.reply(`⏤͟͟͞͞𝐁𝐨𝐭𝐨̃𝐞𝐬 ${value ? '𝐚𝐭𝐢𝐯𝐚𝐝𝐨𝐬' : '𝐝𝐞𝐬𝐚𝐭𝐢𝐯𝐚𝐝𝐨𝐬'}! 𖤐⃝🔘\n•\n> Os botões e listas do Aurora foram ${value ? 'ativados' : 'desativados'} com sucesso.\n>\n> *[⚙️]* • *sᴛᴀᴛᴜs:* ${value ? 'Ativado ✅' : 'Desativado ❌'}\n•\n> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`)
}
}
