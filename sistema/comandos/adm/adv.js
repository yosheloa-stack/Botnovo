import { addAdv } from '../../funcoes/banco.js'

export default {name:'adv', aliases:['advertir'], category:'adm', description:'Adverte um membro', groupOnly:true, adminOnly:true,async run(system){
  const info=system.targetInfo()
  if(!info.jid) return system.reply(`• Exemplo: *${system.prefix}adv @usuario motivo*`)
  const motivo=system.args.filter(a=>!a.startsWith('@')).join(' ').trim() || 'Sem motivo'
  const user=info.number || info.pnJid || info.lidJid || info.jid
  const nome=info.number || info.display?.replace(/^@/,'') || user
  const n=addAdv(system.from,user,nome,motivo)
  await system.reply(`⏤͟͟͞͞𝐀𝐝𝐯𝐞𝐫𝐭𝐞̂𝐧𝐜𝐢𝐚! 𖤐⃝⚠️\n•\n> Usuário: @${nome}\n> Advertências: *${n}*\n> Motivo: ${motivo}`,{mentions:[info.jid]})
}}
