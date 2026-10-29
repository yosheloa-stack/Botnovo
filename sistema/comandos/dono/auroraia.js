import { parseToggle } from '../../funcoes/toggle.js'
import { auroraIaLigada } from '../../funcoes/banco.js'
import { estadoAurora, iaNesteBot } from '../../funcoes/aurora/index.js'

// Liga/desliga a Aurora com IA no bot inteiro. Sem argumento, mostra como ela está.
export default {name: 'auroraia',aliases: [],category: 'dono',description: 'Liga/desliga a Aurora (IA) no bot inteiro',ownerOnly: true,async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
const valor = parseToggle(system.args[0])
if (valor !== null) {
auroraIaLigada(valor)
return system.reply(system.messages.toggleResult('aurora ia', valor, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
const e = estadoAurora()
const pausa = e.pausadaAte > Date.now() ? new Date(e.pausadaAte).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : ''
return system.reply([
'*Aurora IA*',
`Ligada: ${e.ligada ? 'sim' : 'não'} (${system.prefix}auroraia 1 / 0)`,
`Chave da Square Cloud: ${e.temChave ? (e.chaveRecusada ? 'recusada pela Square Cloud, confira a SQUARECLOUD_API_KEY' : 'configurada') : 'falta SQUARECLOUD_API_KEY no ambiente'}`,
`Respostas hoje: ${e.hoje} de ${e.max} (zera às 21h)`,
pausa ? `Pausada até: ${pausa} (limite do plano da Square Cloud)` : '',
`Criador (quem recebe os avisos de compra): ${e.criador || 'ainda não sei — chega com a próxima volta dos avisos do site'}`,
`Conversas lembradas: ${e.conversas}`
].filter(Boolean).join('\n'), { semMarca: true })
}
}
