import {
  MAX_FIGURINHAS, iniciarFigpack, cancelarFigpack, adicionarInicial, finalizarFigpack, ESPERA_MS
} from '../../funcoes/figpack.js'

// #figpack → manda as fotos → o pack sai sozinho. Sem nome, sem autor, sem assinatura.
export default {name:'figpack',aliases:['fazerpack'],category:'download',description:'Monta um pack de figurinhas com as fotos enviadas',async run(system){
const acao = String(system.args?.[0] || '').toLowerCase()

if (acao === 'cancelar') {
return system.reply(cancelarFigpack(system) ? '🗑️ Figpack cancelado.' : '⚠️ Nada para cancelar.')
}

const s = iniciarFigpack(system)
const entrou = await adicionarInicial(system, s)
if (entrou) {
// Já veio com foto (na legenda ou respondida): espera mais fotos e monta sozinho.
s.timer = setTimeout(() => finalizarFigpack(system, s), ESPERA_MS)
s.timer.unref?.()
}
return system.reply(`🧊 Figpack aberto. Envie as fotos (até ${MAX_FIGURINHAS}).\nQuando você parar de enviar, o pack sai sozinho.`)
}
}
