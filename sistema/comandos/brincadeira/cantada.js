const cantadas = [
'Você não é atualização do sistema, mas melhorou meu dia inteiro. 😼',
'Se beleza desse XP, você já estaria no nível máximo. 💚',
'Você é Wi-Fi? Porque senti uma conexão forte aqui. 📶',
'Se eu fosse um comando, queria ser o seu favorito. 😹',
'Você tem mapa? Porque eu me perdi no seu sorriso. ✨'
]

const conselhos = [
'Nem toda resposta precisa ser imediata. Às vezes pensar primeiro já resolve metade do problema.',
'Valorize quem também demonstra que quer ficar por perto.',
'Não transforme um erro pequeno em desistência; corrige e segue.',
'Quando algo incomodar, falar com clareza costuma ser melhor do que acumular.',
'Descansar também faz parte de continuar.'
]

const fatos = [
'Polvos têm três corações. 🐙',
'Bananas são bagas do ponto de vista botânico. 🍌',
'O som viaja mais rápido na água do que no ar. 🌊',
'Abelhas conseguem comunicar direção e distância de alimento através de movimentos. 🐝',
'Um dia em Vênus dura mais do que um ano em Vênus. 🪐'
]

export default {name: 'cantada',aliases: ['cantadas', 'conselho', 'conselhos', 'fatos', 'curiosidades'],category: 'brincadeira',description: 'Cantadas, conselhos e curiosidades',async run(system){
const isCantada = ['cantada', 'cantadas'].includes(system.command)
const isFato = ['fatos', 'curiosidades'].includes(system.command)
const list = isCantada ? cantadas : isFato ? fatos : conselhos
const value = list[Math.floor(Math.random() * list.length)]
const title = isCantada ? '𝐂𝐚𝐧𝐭𝐚𝐝𝐚 𝐝𝐚 𝐯𝐞𝐳!' : isFato ? '𝐂𝐮𝐫𝐢𝐨𝐬𝐢𝐝𝐚𝐝𝐞 𝐝𝐚 𝐯𝐞𝐳!' : '𝐂𝐨𝐧𝐬𝐞𝐥𝐡𝐨 𝐝𝐚 𝐯𝐞𝐳!'
const icon = isCantada ? '😏' : isFato ? '🧠' : '💭'
return system.reply(`⏤͟͟͞͞${title} 𖤐⃝${icon}\n•\n> ${value}\n•\n> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`)
}
}
