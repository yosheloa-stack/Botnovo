import { auroraEsposa } from '../../funcoes/banco.js'
import { ehCriador, conhecerPessoas, iaNesteBot } from '../../funcoes/aurora/index.js'

// #auroramulher NUMERO → a Aurora reconhece esse número como a mulher do
// criador e trata ela com respeito e carinho. #auroramulher 0 tira.
// Só o criador (o número que recebe os avisos de compra) pode mudar.
export default {name: 'auroramulher',aliases: ['auroraesposa'],category: 'dono',description: 'Escolhe o número da mulher do criador pra Aurora',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
await conhecerPessoas(system)
if (!ehCriador(system)) return system.reply('Só o criador pode mudar isso.')
const arg = String(system.args.join('') || '').replace(/\D/g, '')
if (!arg) return system.reply(`Mulher do criador: ${auroraEsposa() || 'não escolhida'}\nUse: ${system.prefix}auroramulher NUMERO (ou ${system.prefix}auroramulher 0 pra tirar)`, { semMarca: true })
if (arg === '0') { auroraEsposa(''); return system.reply('Pronto, tirei 💜', { semMarca: true }) }
if (arg.length < 10 || arg.length > 15) return system.reply(`Número inválido. Ex.: ${system.prefix}auroramulher 5568999999999`)
auroraEsposa(arg)
return system.reply(`Pronto 💜 a Aurora agora reconhece o ${arg} como a mulher do criador.`, { semMarca: true })
}
}
