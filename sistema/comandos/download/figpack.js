import {
  MAX_FIGURINHAS, sessaoFigpack, iniciarFigpack, cancelarFigpack, adicionarInicial, gerarFigpack
} from '../../funcoes/figpack.js'

// #figpack criar → manda as fotos → #figpack gerar. Pack sem nome, sem autor, sem assinatura.
export default {name:'figpack',aliases:['fazerpack'],category:'download',description:'Monta um pack de figurinhas com as fotos enviadas',async run(system){
const acao = String(system.args?.[0] || '').toLowerCase()
const p = system.prefix

if (!acao) {
return system.reply(
`🧊 *FIGPACK*\n\n` +
`• ${p}figpack criar — inicia um pack\n` +
`• ${p}figpack status — vê o progresso\n` +
`• ${p}figpack gerar — monta e envia o pack\n` +
`• ${p}figpack cancelar — cancela\n\n` +
`Depois de criar, envie as fotos (até ${MAX_FIGURINHAS}).`
)
}

if (acao === 'criar' || acao === 'novo') {
const s = iniciarFigpack(system)
await adicionarInicial(system, s)
return system.reply(`✅ Figpack iniciado.\n🧊 Figurinhas: ${s.itens.length}/${MAX_FIGURINHAS}\n\nAgora envie suas fotos. Quando quiser concluir, use ${p}figpack gerar.`)
}

if (acao === 'status') {
const s = sessaoFigpack(system)
if (!s) return system.reply(`⚠️ Nenhum figpack aberto. Use ${p}figpack criar.`)
return system.reply(`🧊 Figurinhas: ${s.itens.length}/${MAX_FIGURINHAS}`)
}

if (acao === 'cancelar' || acao === 'apagar') {
return system.reply(cancelarFigpack(system) ? '🗑️ Figpack cancelado.' : '⚠️ Nada para cancelar.')
}

if (acao === 'gerar' || acao === 'pronto' || acao === 'concluir') {
const s = sessaoFigpack(system)
if (!s) return system.reply(`⚠️ Nenhum figpack aberto. Use ${p}figpack criar.`)
if (!s.itens.length) return system.reply('❌ Envie pelo menos uma foto antes de gerar.')
try {
const total = await gerarFigpack(system, s)
cancelarFigpack(system)
return system.reply(`✅ Figpack pronto — ${total}/${MAX_FIGURINHAS} figurinhas.`)
} catch (err) {
console.warn('[ FIGPACK ] gerar:', err?.stack || err?.message || err)
return system.reply('❌ Não consegui gerar o pack. As fotos continuam salvas; tente de novo.')
}
}

return system.reply(`❌ Opção inválida. Use: criar, status, gerar ou cancelar.`)
}
}
