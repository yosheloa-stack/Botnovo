import { ehCriador, conhecerPessoas, iaNesteBot, tokenDoSite, enderecoDoSite } from '../../funcoes/aurora/index.js'
import { textoDoAviso, avisoGeral } from '../../funcoes/avisoGeral.js'
import { ehDonoPrincipal } from '../../funcoes/subdonos.js'
import { modoCliente } from '../../funcoes/cliente.js'

// #aviso texto → manda o texto pra todos os clientes com número no site (um
// por vez, espaçado, pelo site: funcoes/avisoGeral.js). #aviso cancelar para o
// que ainda não saiu; #aviso pausar segura e #aviso continuar solta (o site
// pausa sozinho quando o bot da casa cai); #aviso sozinho mostra o andamento. Só o criador (quem
// recebe os avisos de compra) ou o dono do bot da casa.
export default {name: 'aviso',aliases: ['avisotodos', 'avisogeral'],category: 'dono',description: 'Manda um aviso pra todos os clientes com WhatsApp no site',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
await conhecerPessoas(system)
const numero = system.senderNumber || system.senderInfo?.number || ''
if (!ehCriador(system) && !(!modoCliente && ehDonoPrincipal(system.config, numero))) return system.reply('Só o dono do site pode mandar aviso pra todos os clientes.')
const texto = textoDoAviso(system.text, system.prefix)
const primeira = texto.split(/\s+/)[0].toLowerCase()
const sozinha = texto.split(/\s+/).length === 1
const acao = !texto ? {}
: sozinha && ['cancelar', 'parar', 'cancela', 'para'].includes(primeira) ? { cancelar: true }
: sozinha && ['pausar', 'pausa', 'segurar'].includes(primeira) ? { pausar: true }
: sozinha && ['continuar', 'continua', 'retomar', 'voltar', 'seguir'].includes(primeira) ? { retomar: true }
: { texto, de: numero }
try {
const resposta = await avisoGeral({ base: enderecoDoSite(system.config), token: tokenDoSite(), prefixo: system.prefix }, acao)
return system.reply(resposta, { semMarca: true })
} catch (err) {
return system.reply('⚠️ Não deu pra mandar o aviso: ' + (err?.message || err), { semMarca: true })
}
}
}
