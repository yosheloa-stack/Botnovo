import { MAX_FIGURINHAS, MIN_FIGURINHAS, buscarImagens, montarFigurinhas, gerarFigpack } from '../../funcoes/figpack.js'

// #figpack tema → o bot busca as imagens, monta o pack sozinho e manda no chat.
// O pack sai sem nome, sem autor e sem assinatura.
export default {name:'figpack',aliases:['fazerpack'],category:'download',description:'Monta e envia um pack de figurinhas de um tema',async run(system){
const tema = String(system.q || '').trim()
if (!tema) return system.reply(`🧊 Use: *${system.prefix}figpack tema*\nEx.: *${system.prefix}figpack gatos*\nO bot monta o pack sozinho (até ${MAX_FIGURINHAS} figurinhas).`)

await system.reply(`⏳ Montando o pack: ${tema}...`)
try {
console.log('[ FIGPACK ] buscando:', tema, '| chat:', system.from)
const urls = await buscarImagens(tema, system.config)
if (!urls.length) return system.reply('❌ Não achei imagens para esse tema. Tente outro.')
const itens = await montarFigurinhas(urls)
console.log('[ FIGPACK ] figurinhas prontas:', itens.length, 'de', urls.length, 'imagens')
if (itens.length < MIN_FIGURINHAS) return system.reply('❌ Não consegui montar figurinhas suficientes. Tente outro tema.')
await gerarFigpack(system, itens)
console.log('[ FIGPACK ] pack enviado')
} catch (err) {
console.warn('[ FIGPACK ]', err?.stack || err?.message || err)
return system.reply(`❌ Não consegui montar o pack (${err?.message || 'erro'}). Tente de novo.`)
}
}
}
