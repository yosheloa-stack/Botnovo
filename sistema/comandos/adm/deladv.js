import { delAdv } from '../../funcoes/banco.js'
export default {name:'deladv',aliases:[],category:'adm',description:'Remove advertência',groupOnly:true,adminOnly:true,async run(system){
 const info=system.targetInfo(); if(!info.jid) return system.reply(`• Exemplo: *${system.prefix}deladv @usuario*`)
 const user=info.number||info.pnJid||info.lidJid||info.jid; const n=delAdv(system.from,user); const nome=info.number||info.display?.replace(/^@/,'')||user
 await system.reply(`• ✅ Advertência removida de @${nome}.\n• Restantes: *${n}*`,{mentions:[info.jid]})
}}
