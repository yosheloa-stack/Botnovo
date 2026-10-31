import { auroraVoz, auroraVelocidade } from '../../funcoes/banco.js'
import { ehCriador, conhecerPessoas, iaNesteBot } from '../../funcoes/aurora/index.js'
import { VOZES, VOZ_PADRAO, VELOCIDADE_PADRAO } from '../../funcoes/aurora/voz.js'

// #auroravoz fofa → troca a voz dos áudios da Aurora. #auroravoz lenta /
// rapida / normal muda a velocidade. Só o criador muda; fica salvo no bot.
const VELOCIDADES = { lenta: 0.75, devagar: 0.75, normal: VELOCIDADE_PADRAO, rapida: 1, rápida: 1 }
export default {name: 'auroravoz',aliases: ['vozaurora'],category: 'dono',description: 'Escolhe a voz dos áudios da Aurora',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
await conhecerPessoas(system)
if (!ehCriador(system)) return system.reply('Só o criador pode mudar isso.')
const arg = String(system.args[0] || '').toLowerCase()
const p = system.prefix
const atual = Object.values(VOZES).find((v) => v.id === (auroraVoz() || VOZ_PADRAO))
if (!arg) {
const lista = Object.entries(VOZES).map(([k, v]) => `• ${p}auroravoz ${k} — ${v.nome} (${v.jeito})`).join('\n')
return system.reply(`🎙️ Voz da Aurora: ${atual?.nome || auroraVoz()} | velocidade ${auroraVelocidade() || VELOCIDADE_PADRAO}\n\n${lista}\n\nVelocidade: ${p}auroravoz lenta / normal / rapida`, { semMarca: true })
}
if (VELOCIDADES[arg]) {
auroraVelocidade(VELOCIDADES[arg])
return system.reply(`Pronto 🎙️ agora ela fala ${arg === 'normal' ? 'no normal' : arg === 'lenta' || arg === 'devagar' ? 'mais devagar' : 'mais rápido'}.`, { semMarca: true })
}
const escolhida = VOZES[arg] || (/^[a-f0-9]{32}$/.test(arg) ? { id: arg, nome: arg } : null)
if (!escolhida) return system.reply(`Não conheço essa voz. Manda ${p}auroravoz pra ver a lista.`)
auroraVoz(escolhida.id)
return system.reply(`Pronto 🎙️ a voz da Aurora agora é a ${escolhida.nome}.`, { semMarca: true })
}
}
