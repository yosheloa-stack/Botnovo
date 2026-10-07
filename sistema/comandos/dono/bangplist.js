import { listBanGp } from '../../funcoes/banco.js'
export default {name:'bangplist',aliases:[],category:'dono',description:'Lista grupos bloqueados',ownerOnly:true,async run(system){const a=listBanGp();return system.reply(a.length?`⏤͟͟͞͞𝐆𝐫𝐮𝐩𝐨𝐬 𝐁𝐥𝐨𝐜𝐤! 𖤐⃝🚫\n•\n${a.map((x,i)=>`${i+1}. ${x}`).join('\n')}`:'• ✅ Nenhum grupo está bloqueado.')}}
