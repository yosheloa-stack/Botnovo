import { listCmd } from '../../funcoes/banco.js'
export default {name:'listblock',aliases:[],category:'adm',description:'Lista comandos bloqueados no grupo',groupOnly:true,adminOnly:true,async run(system){
 const a=listCmd(system.from); return system.reply(a.length?`⏤͟͟͞͞𝐂𝐦𝐝 𝐁𝐥𝐨𝐜𝐤! 𖤐⃝🚫\n•\n${a.map((x,i)=>`${i+1}. ${system.prefix}${x}`).join('\n')}`:'• ✅ Nenhum comando está bloqueado neste grupo.')
}}
