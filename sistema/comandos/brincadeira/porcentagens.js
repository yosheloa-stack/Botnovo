import { display, random, sendAkameMedia } from '../../funcoes/brincadeiras.js'

const data = {
baiana: ['imgbaiana', 'baiana', '💤'],
baiano: ['imgbaiano', 'baiano', '💤'],
bebado: ['imgbebado', 'bêbado(a)', '🍺'],
beta: ['imgbeta', 'beta', '😂'],
carioca: ['imgcarioca', 'carioca', '🌴'],
corno: ['imgcorno', 'corno', '🐂'],
cu: ['cu', 'dono(a) do maior cu', '🍑'],
feio: ['imgfeio', 'feio(a)', '👹'],
fiel: ['fielcmd', 'fiel', '💍'],
fumar: ['imgfumar', 'fumante', '🚬'],
gado: ['imggado', 'gado(a)', '🐮'],
gay: ['imggay', 'gay na zoeira', '🏳️‍🌈'],
gostosa: ['imggostosa', 'gostosa', '🔥'],
gostoso: ['imggostoso', 'gostoso', '🔥'],
linda: ['lindacmd', 'linda', '✨'],
lindo: ['lindocmd', 'lindo', '✨'],
louco: ['imglouco', 'louco', '🤪'],
macaca: ['imgmacaca', 'macaca na zoeira', '🐒'],
macaco: ['imgmacaco', 'macaco na zoeira', '🐒'],
nazista: ['imgnazista', 'nazista na zoeira', '📊'],
puta: ['imgputa', 'puta na zoeira', '📊'],
safada: ['imgsafada', 'safada', '😏'],
safado: ['imgsafado', 'safado', '😏'],
sigma: ['imgsigma', 'sigma', '🗿🍷'],
vesgo: ['imgvesgo', 'vesgo(a)', '👀']
}

function comment(command, value) {
if (command === 'corno') return value >= 70 ? 'Vish... essa porcentagem aí tá suspeita KKKKK' : 'Hoje os chifres passaram longe... eu acho 😹'
if (command === 'feio') return value >= 70 ? 'O espelho pediu férias depois dessa KKKKK' : 'Tá tranquilo, o espelho ainda aguenta 😹'
if (command === 'fiel') return value >= 70 ? 'Pode confiar... pelo menos o Aurora disse 😹' : 'Hmmm... melhor ficar de olho 👀'
if (command === 'gado') return value >= 70 ? 'Muuuuuito gado KKKKK 🐮' : 'Ainda dá pra salvar 😹'
if (command === 'sigma') return value >= 70 ? '🗿🍷 simplesmente sigma.' : 'Ainda falta um pouco de vinho e postura 😹'
if (command === 'fumar') return value >= 70 ? 'Cadê o isqueiro desse cidadão? 🚬💀' : 'Pulmão respirando aliviado por enquanto 😹'
return value >= 70 ? 'Vish... essa porcentagem aí tá alta KKKKK' : value >= 40 ? 'Hmm... ficou no meio termo 😹' : 'Hoje passou longe KKKKK'
}

export default {name: 'baiana',aliases: Object.keys(data).filter((x) => x !== 'baiana'),category: 'brincadeira',description: 'Porcentagens de zoeira da Akame com as mídias originais',groupOnly: true,async run(system){
const item = data[system.command]
if (!item) return
const target = system.targetInfo()?.jid ? system.targetInfo() : system.senderInfo
const value = random(100)
const caption = `⏤͟͟͞͞𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨 𝐩𝐫𝐨𝐧𝐭𝐨! 𖤐⃝🎭
•
> ${display(target)} ficou com *${value}%* de ${item[1]} ${item[2]}
>
> ${comment(system.command, value)}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
return sendAkameMedia(system, item[0], caption, [target], caption)
}
}
