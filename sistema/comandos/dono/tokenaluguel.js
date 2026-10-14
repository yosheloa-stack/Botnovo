import { tokenAluguelSalvo } from '../../funcoes/banco.js'

// Salva o mesmo AURORA_RENTAL_TOKEN das Credenciais do site. Fica no banco do
// bot (fora do Git) e só é aceito no privado, pra ninguém ver o token.
export default {name:'tokenaluguel',aliases:['senhaaluguel'],category:'dono',description:'Salva o token do aluguel automático',ownerOnly:true,async run(system){
if (system.isGroup) return system.reply('• ❌ Mande este comando no *privado* do bot, pra ninguém ver o token.')
const novo = String(system.q || '').trim()
if (novo.length < 8) return system.reply(`• Use: *${system.prefix}tokenaluguel SEU_TOKEN*\n• É o mesmo AURORA_RENTAL_TOKEN das Credenciais do site.`)
tokenAluguelSalvo(novo)
return system.reply('• ✅ Token do aluguel salvo. Em até 15 segundos o bot busca os aluguéis pagos no site.')
}}
