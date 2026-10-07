import { display, mediaLink, memberIdentities, pick, random, requireTarget, sampleMembers, sendAkameMedia, sendMention, sendRemoteImage } from '../../funcoes/brincadeiras.js'

const footer = '> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃'

async function chance(system) {
if (!system.q) return system.reply(`Use: *${system.prefix}chance de chover hoje*`)
const value = random(100)
return system.reply(`⏤͟͟͞͞𝐂𝐡𝐚𝐧𝐜𝐞 𝐜𝐚𝐥𝐜𝐮𝐥𝐚𝐝𝐚! 𖤐⃝🎲
•
> A chance _“${system.q}”_ é de *${value}%*.
>
> ${value >= 70 ? 'Vish... isso aí tá quase confirmado KKKKK' : value >= 40 ? 'Tá meio a meio... perigoso 😹' : 'Pode ficar tranquilo... por enquanto KKKKK'}
•
${footer}`)
}

async function dogolpe(system) {
const target = await requireTarget(system, 'Marque uma pessoa, responda a mensagem ou use o @.')
if (!target) return
const golpes = ['𝐄𝐌 𝐈𝐋𝐔𝐃𝐈𝐑 𝐏𝐄𝐒𝐒𝐎𝐀𝐒', '𝐄𝐌 𝐅𝐄𝐑𝐈𝐑 𝐎𝐒 𝐒𝐄𝐍𝐓𝐈𝐌𝐄𝐍𝐓𝐎𝐒', '𝐄𝐌 𝐃𝐀𝐑 𝐂𝐇𝐈𝐅𝐑𝐄']
const text = `⏤͟͟͞͞𝐄𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐢𝐬𝐭𝐚 𝐝𝐨 𝐠𝐨𝐥𝐩𝐞! 𖤐⃝🎭
•
> ${display(target)} é especialista ${pick(golpes)} 😹
•
${footer}`
return sendMention(system, text, [target])
}

async function shipo(system) {
const target = await requireTarget(system, 'Marque uma pessoa do grupo para encontrar o par dela.')
if (!target) return
const pool = memberIdentities(system).filter((x) => x.jid && x.jid !== target.jid)
if (!pool.length) return system.reply('Não encontrei outra pessoa no grupo para formar o ship.')
const partner = pick(pool)
const pct = random(100)
const text = `⏤͟͟͞͞𝐒𝐡𝐢𝐩 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐨! 𖤐⃝💘
•
> ${display(target)} 💗 ${display(partner)}
>
> Compatibilidade: *${pct}%*
> ${pct >= 80 ? '_Isso aqui tá forte demais KKKKK 💞_' : pct >= 50 ? '_Tem alguma coisa aí... 👀_' : '_Acho melhor continuar só na amizade 😹_'}
•
${footer}`
return sendMention(system, text, [partner, target])
}

async function casal(system) {
const pair = sampleMembers(system, 2)
if (pair.length < 2) return system.reply('Preciso de pelo menos duas pessoas no grupo para formar um casal.')
const pct = random(100)
const caption = `⏤͟͟͞͞𝐂𝐚𝐬𝐚𝐥 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨! 𖤐⃝💞
•
> ${display(pair[0])} ❤️ ${display(pair[1])}
>
> Compatibilidade: *${pct}%*
> ${pct >= 80 ? '_O destino trabalhou bonito aqui 😳💗_' : pct >= 50 ? '_Tem química... só falta coragem KKKKK_' : '_O Aurora tentou, mas não deu 😹_'}
•
${footer}`
return sendAkameMedia(system, 'casal', caption, pair, caption)
}

async function metadinha(system) {
try {
const response = await fetch(mediaLink('metadinhaData'))
if (!response.ok) throw new Error(`HTTP ${response.status}`)
const data = await response.json()
const item = pick(Array.isArray(data) ? data : [])
if (!item?.male || !item?.female) throw new Error('Resposta sem imagens')
await sendRemoteImage(system, item.male, `⏤͟͟͞͞𝐌𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚! 𖤐⃝💑\n•\n> Primeira metade chegou 💚\n•\n${footer}`)
return sendRemoteImage(system, item.female, `⏤͟͟͞͞𝐌𝐞𝐭𝐚𝐝𝐢𝐧𝐡𝐚! 𖤐⃝💑\n•\n> Agora completa com essa aqui 💚\n•\n${footer}`)
} catch (error) {
console.log('[ METADINHA ]', error?.message || error)
return system.reply(system.messages?.commandError?.() || 'Não consegui carregar a metadinha agora.')
}
}

async function morte(system) {
const nome = system.args[0]
if (!nome) return system.reply(`Use: *${system.prefix}${system.command} nome*`)
try {
const base = mediaLink('morteApi') || 'https://api.agify.io/'
const response = await fetch(`${base}?name=${encodeURIComponent(nome)}`)
const data = await response.json()
if (data?.age == null) return system.reply('Não consegui prever a idade para esse nome.')
const caption = `⏤͟͟͞͞𝐏𝐫𝐞𝐯𝐢𝐬𝐚̃𝐨 𝐩𝐫𝐨𝐧𝐭𝐚! 𖤐⃝☠️
•
> *${nome}* ficou com idade prevista de *${data.age} anos*.
>
> É só brincadeira KKKKK 😹
•
${footer}`
return sendAkameMedia(system, 'deathcmd', caption, [system.senderInfo], caption)
} catch {
return system.reply('Não consegui consultar a previsão agora.')
}
}

async function surubao(system) {
const q = Number(system.args[0])
if (!Number.isInteger(q) || q < 1) return system.reply(`Use: *${system.prefix}${system.command} quantidade*`)
if (q > 1000) return system.reply('Calma aí 😹 use um número de até 1000.')
const pool = memberIdentities(system)
if (!pool.length) return system.reply('Não encontrei membros no grupo.')
const selected = []
for (let i = 0; i < q; i++) selected.push(pick(pool))
let text = `⏤͟͟͞͞𝐁𝐚𝐠𝐮𝐧𝐜̧𝐚 𝐦𝐨𝐧𝐭𝐚𝐝𝐚! 𖤐⃝😝\n•\n> ${display(system.senderInfo)} convocou *${q}* pessoa(s):\n>\n`
text += selected.map((x) => `> • ${display(x)}`).join('\n')
text += `\n•\n${footer}`
return sendMention(system, text, [system.senderInfo, ...selected])
}

export default {name: 'chance',aliases: ['dogolpe','metadinha','morte','death','shipo','casal','surubao','suruba'],category: 'brincadeira',description: 'Brincadeiras especiais da Akame',groupOnly: true,async run(system){
if (system.command === 'chance') return chance(system)
if (system.command === 'dogolpe') return dogolpe(system)
if (system.command === 'metadinha') return metadinha(system)
if (['morte','death'].includes(system.command)) return morte(system)
if (system.command === 'shipo') return shipo(system)
if (system.command === 'casal') return casal(system)
if (['surubao','suruba'].includes(system.command)) return surubao(system)
}
}
