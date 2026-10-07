const choices = ['pedra', 'papel', 'tesoura']
const emoji = { pedra: '🪨', papel: '📄', tesoura: '✂️' }

export default {name: 'ppt',aliases: ['pedrapapeltesoura'],category: 'brincadeira',description: 'Pedra, papel e tesoura',async run(system){
const player = String(system.args[0] || '').toLowerCase()
if (!choices.includes(player)) return system.reply(`Use: *${system.prefix}ppt pedra*, *${system.prefix}ppt papel* ou *${system.prefix}ppt tesoura*`)
const bot = choices[Math.floor(Math.random() * choices.length)]
let result = 'Empate 😹'
if ((player === 'pedra' && bot === 'tesoura') || (player === 'papel' && bot === 'pedra') || (player === 'tesoura' && bot === 'papel')) result = 'Você ganhou! 🏆'
else if (player !== bot) result = 'Aurora ganhou KKKKK 😹'
return system.reply(`⏤͟͟͞͞𝐏𝐞𝐝𝐫𝐚, 𝐩𝐚𝐩𝐞𝐥 𝐞 𝐭𝐞𝐬𝐨𝐮𝐫𝐚! 𖤐⃝🎮
•
> Você: ${emoji[player]} *${player}*
> Aurora: ${emoji[bot]} *${bot}*
>
> ${result}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`)
}
}
