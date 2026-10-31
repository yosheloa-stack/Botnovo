import { auroraVoz, auroraVelocidade, auroraEstilo } from '../../funcoes/banco.js'
import { ehCriador, conhecerPessoas, iaNesteBot } from '../../funcoes/aurora/index.js'
import { ESTILOS, vozLigada, vozesEleven, ehIdEleven, ELEVEN_VOZ_PADRAO } from '../../funcoes/aurora/voz.js'
import { semAcento } from '../../funcoes/aurora/ia.js'

// #auroravoz NOME → troca a voz dos áudios da Aurora (uma voz da conta na ElevenLabs, pelo nome ou ID). #auroravoz lenta /
// rapida / normal muda a velocidade. #auroravoz estilo sombria (ou um texto
// livre) muda o jeito de falar: tom, emoção e ritmo dos áudios. Só o criador muda; fica salvo no bot.
// normal = 0: a voz fala na velocidade dela.
const VELOCIDADES = { lenta: 0.75, devagar: 0.75, normal: 0, rapida: 1.1, rápida: 1.1 }
export default {name: 'auroravoz',aliases: ['vozaurora'],category: 'dono',description: 'Escolhe a voz dos áudios da Aurora',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
await conhecerPessoas(system)
if (!ehCriador(system)) return system.reply('Só o criador pode mudar isso.')
const arg = String(system.args[0] || '').toLowerCase()
if (arg === 'estilo' || arg === 'jeito') {
const resto = system.args.slice(1).join(' ').trim()
const prontos = Object.keys(ESTILOS).map((k) => `${system.prefix}auroravoz estilo ${k}`).join('\n')
if (!resto) return system.reply(`🎭 Jeito de falar: ${auroraEstilo() || 'natural'}\n\n${prontos}\n\nOu escreva do seu jeito: ${system.prefix}auroravoz estilo calma, sussurrando, com risada no fim\n${system.prefix}auroravoz estilo 0 volta pro natural`, { semMarca: true })
if (resto === '0') { auroraEstilo(''); return system.reply('Pronto 🎭 ela volta a falar no jeito natural.', { semMarca: true }) }
auroraEstilo(ESTILOS[resto.toLowerCase()] || resto)
return system.reply(`Pronto 🎭 nos áudios ela agora fala assim: ${auroraEstilo()}`, { semMarca: true })
}
const p = system.prefix
if (VELOCIDADES[arg] !== undefined) {
auroraVelocidade(VELOCIDADES[arg])
return system.reply(`Pronto 🎙️ agora ela fala ${arg === 'normal' ? 'no normal' : arg === 'lenta' || arg === 'devagar' ? 'mais devagar' : 'mais rápido'}.`, { semMarca: true })
}
const velocidade = auroraVelocidade() ? `velocidade ${auroraVelocidade()}` : 'velocidade normal'
const rodape = `\n\nVelocidade: ${p}auroravoz lenta / normal / rapida\nJeito de falar: ${p}auroravoz estilo`
// As vozes são as da conta na ElevenLabs; escolhe pelo nome ou pelo ID.
if (!vozLigada()) return system.reply('A voz da Aurora tá desligada: falta a ELEVENLABS_API_KEY no Square Cloud.')
{
const vozes = await vozesEleven()
const idAtual = ehIdEleven(auroraVoz()) ? auroraVoz() : (process.env.ELEVENLABS_VOZ || ELEVEN_VOZ_PADRAO)
const nomeAtual = vozes.find((v) => v.id === idAtual)?.nome || idAtual
if (!arg) {
const lista = vozes.slice(0, 20).map((v) => `• ${p}auroravoz ${v.nome}`).join('\n') || '(não consegui ler as vozes da sua conta agora; dá pra usar o ID: ' + p + 'auroravoz ID)'
return system.reply(`🎙️ Voz da Aurora (ElevenLabs): ${nomeAtual} | ${velocidade}\n\n${lista}${rodape}`, { semMarca: true })
}
if (arg === 'padrao' || arg === 'padrão') { auroraVoz(''); return system.reply('Pronto 🎙️ ela volta pra voz padrão.', { semMarca: true }) }
const bruto = system.args.join(' ').trim()
const procurado = semAcento(bruto)
const achada = vozes.find((v) => semAcento(v.nome) === procurado) || vozes.find((v) => semAcento(v.nome).startsWith(procurado)) || (ehIdEleven(system.args[0]) ? { id: system.args[0], nome: system.args[0] } : null)
if (!achada) return system.reply(`Não achei essa voz na sua conta da ElevenLabs. Manda ${p}auroravoz pra ver a lista.`)
auroraVoz(achada.id)
return system.reply(`Pronto 🎙️ a voz da Aurora agora é a ${achada.nome}.`, { semMarca: true })
}
}
}
