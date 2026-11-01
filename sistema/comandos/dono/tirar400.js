import { ehCriador, conhecerPessoas, iaNesteBot, tokenDoSite, enderecoDoSite } from '../../funcoes/aurora/index.js'
import { idDoComando, tirar400 } from '../../funcoes/tirar400.js'
import { ehDonoPrincipal } from '../../funcoes/subdonos.js'
import { modoCliente } from '../../funcoes/cliente.js'

// #tirar400 ID → o ID do Autolike 400 sai do Turbo automático e do Autolike
// 220 de quem tinha, e o site avisa essas pessoas no WhatsApp
// (funcoes/tirar400.js). Só o criador (quem recebe os avisos de compra) ou o
// dono do bot da casa, igual ao #aviso.
export default {name: 'tirar400',aliases: ['tira400', 'tirarid400', 'liberar400'],category: 'dono',description: 'Tira o ID do Autolike 400 do Turbo automático e do 220 de quem tinha e avisa no WhatsApp',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
await conhecerPessoas(system)
const numero = system.senderNumber || system.senderInfo?.number || ''
if (!ehCriador(system) && !(!modoCliente && ehDonoPrincipal(system.config, numero))) return system.reply('Só o dono do site pode usar este comando.')
try {
const resposta = await tirar400({ base: enderecoDoSite(system.config), token: tokenDoSite(), prefixo: system.prefix }, idDoComando(system.text, system.prefix))
return system.reply(resposta, { semMarca: true })
} catch (err) {
return system.reply('⚠️ Não deu pra tirar o ID: ' + (err?.message || err), { semMarca: true })
}
}
}
