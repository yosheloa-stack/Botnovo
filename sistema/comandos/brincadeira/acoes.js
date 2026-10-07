import { display, requireTarget, sendAkameMedia } from '../../funcoes/brincadeiras.js'

const actions = {
abraco: ['abraco', '𝐀𝐛𝐫𝐚𝐜̧𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨!', '🫂', (a,b) => `${a} deu um abraço em ${b} 🫂💚`],
beijo: ['beijocmd', '𝐁𝐞𝐢𝐣𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨!', '💋', (a,b) => `${a} acabou de beijar ${b} 😳💗`],
boquete: ['boquete', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😈', (a,b) => `${a} usou *boquete* com ${b} 😈`],
cagar: ['cagar', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '💩', (a,b) => `${a} escolheu ${b} pra essa zoeira KKKKK 💀`],
capinarlote: ['capinarlote', '𝐂𝐚𝐩𝐢𝐧𝐚 𝐚𝐢́!', '🌱', (a,b) => `${a} mandou ${b} capinar um lote KKKKK 🌱`],
carinho: ['carinho', '𝐂𝐚𝐫𝐢𝐧𝐡𝐨 𝐞𝐧𝐯𝐢𝐚𝐝𝐨!', '💚', (a,b) => `${a} deu um carinho em ${b} 💚`],
chute: ['chutecmd', '𝐂𝐡𝐮𝐭𝐞 𝐚𝐩𝐥𝐢𝐜𝐚𝐝𝐨!', '🦵', (a,b) => `${a} deu um chute em ${b} KKKKK 😂`],
comer: ['comer', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😈', (a,b) => `${a} usou *comer* com ${b} 😹`],
gozar: ['Gozar', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😈', (a,b) => `${a} escolheu ${b} pra zoeira 😈`],
leitada: ['leitada', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😈', (a,b) => `${a} usou *leitada* em ${b} 😹`],
louca: ['lavarlouca', '𝐋𝐨𝐮𝐜̧𝐚 𝐭𝐞 𝐞𝐬𝐩𝐞𝐫𝐚!', '🍽️', (a,b) => `${a} mandou ${b} lavar a louça KKKKK 🍽️`],
matar: ['matar', '𝐅 𝐧𝐨 𝐜𝐡𝐚𝐭!', '💀', (a,b) => `${a} acabou de eliminar ${b} 😵‍💫`],
morder: ['morder', '𝐌𝐨𝐫𝐝𝐢𝐝𝐚 𝐞𝐧𝐯𝐢𝐚𝐝𝐚!', '😬', (a,b) => `${a} deu uma mordida em ${b} 😬`],
pgbunda: ['pgbunda', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😹', (a,b) => `${a} usou *pgbunda* com ${b} 😹`],
pgpau: ['pgpau', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😹', (a,b) => `${a} usou *pgpau* com ${b} 😹`],
pgpeito: ['pgpeito', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😹', (a,b) => `${a} usou *pgpeito* com ${b} 😹`],
sentar: ['sentar', '𝐙𝐨𝐞𝐢𝐫𝐚 𝐥𝐢𝐛𝐞𝐫𝐚𝐝𝐚!', '😹', (a,b) => `${a} usou *sentar* com ${b} 😹`],
soco: ['soco', '𝐍𝐨𝐜𝐚𝐮𝐭𝐞!', '🥊', (a,b) => `${a} acabou de nocautear ${b} 🥊💥`],
tapa: ['tapacmd', '𝐓𝐚𝐩𝐚 𝐚𝐩𝐥𝐢𝐜𝐚𝐝𝐨!', '👋', (a,b) => `${a} deu um tapão em ${b} KKKKK 😹`],
tirarft: ['tirarft', '𝐅𝐨𝐭𝐨 𝐭𝐢𝐫𝐚𝐝𝐚!', '📸', (a,b) => `${a} tirou uma foto de ${b} 📸`]
}

const aliasBase = { chutar: 'chute', goza: 'gozar', lavarlouca: 'louca', mata: 'matar', socar: 'soco' }
const aliases = ['beijo','boquete','cagar','capinarlote','carinho','chute','chutar','comer','gozar','goza','leitada','louca','lavarlouca','matar','mata','morder','pgbunda','pgpau','pgpeito','sentar','soco','socar','tapa','tirarft']

export default {name: 'abraco',aliases,category: 'brincadeira',description: 'Ações e GIFs de brincadeira da Akame',groupOnly: true,async run(system){
const base = aliasBase[system.command] || system.command
const action = actions[base]
if (!action) return
const target = await requireTarget(system, 'Marque o alvo, responda a mensagem dele(a) ou use o @.')
if (!target) return
const sender = display(system.senderInfo)
const receiver = display(target)
const caption = `⏤͟͟͞͞${action[1]} 𖤐⃝${action[2]}
•
> ${action[3](sender, receiver)}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
return sendAkameMedia(system, action[0], caption, [target, system.senderInfo], caption)
}
}
