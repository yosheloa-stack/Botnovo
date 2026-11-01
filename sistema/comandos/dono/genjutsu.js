import { auroraGenjutsuQuem, auroraGenjutsuDia, auroraGenjutsuUso } from '../../funcoes/banco.js'
import { ehCriador, conhecerPessoas, iaNesteBot } from '../../funcoes/aurora/index.js'
import { genjutsuLigado, resolucao, maxSegundos, diaBrasilia, POR_PESSOA_DIA } from '../../funcoes/aurora/genjutsu.js'

// #genjutsu              → mostra como está o vídeo Genjutsu da Aurora
// #genjutsu todos|donos|criador → quem pode pedir vídeo
// #genjutsu limite N     → quantos vídeos por dia no bot inteiro (0 = nenhum pros outros)
// Só o criador muda. Ele mesmo não entra no limite.
const QUEM = { todos: 'todo mundo', donos: 'só os donos do bot', criador: 'só você (criador)' }
export default {name: 'genjutsu',aliases: ['auroravideo'],category: 'dono',description: 'Vídeo Genjutsu da Aurora (Higgsfield): quem pode e limite por dia',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
await conhecerPessoas(system)
if (!ehCriador(system)) return system.reply('Só o criador pode mudar isso.')
const p = system.prefix
const arg = String(system.args[0] || '').toLowerCase()
if (QUEM[arg]) {
auroraGenjutsuQuem(arg)
return system.reply(`Pronto 🎬 agora quem pede vídeo pra Aurora: ${QUEM[arg]}.`, { semMarca: true })
}
if (arg === 'limite') {
const n = Number(system.args[1])
if (!Number.isFinite(n) || n < 0) return system.reply(`Use: ${p}genjutsu limite 3`, { semMarca: true })
auroraGenjutsuDia(n)
return system.reply(`Pronto 🎬 agora são até ${auroraGenjutsuDia()} vídeos por dia no bot (você não conta).`, { semMarca: true })
}
const uso = auroraGenjutsuUso(diaBrasilia())
return system.reply([
'*Vídeo Genjutsu da Aurora (Higgsfield)*',
`Chave da API: ${genjutsuLigado() ? 'configurada' : 'falta HIGGSFIELD_KEY_ID e HIGGSFIELD_KEY_SECRET no Square Cloud'}`,
`Quem pode pedir: ${QUEM[auroraGenjutsuQuem()]} (${p}genjutsu todos / donos / criador)`,
`Vídeos hoje: ${uso.total} de ${auroraGenjutsuDia()} (${p}genjutsu limite N), ${POR_PESSOA_DIA} por pessoa; você não conta`,
`Qualidade: ${resolucao()} | vídeo de 4 a ${maxSegundos()} segundos`,
'',
'Como pedir: manda um vídeo, depois a foto de quem vai entrar nele, e fala "aurora coloca no vídeo" (ou responde o vídeo com a foto).'
].join('\n'), { semMarca: true })
}
}
