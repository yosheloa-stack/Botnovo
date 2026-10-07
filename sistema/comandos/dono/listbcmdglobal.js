import { listGcmd } from '../../funcoes/banco.js'
export default {name:'listbcmdglobal',aliases:[],category:'dono',description:'Lista bloqueios globais',ownerOnly:true,async run(system){const a=listGcmd();return system.reply(a.length?`⏤͟͟͞͞𝐂𝐦𝐝 𝐆𝐥𝐨𝐛𝐚𝐥! 𖤐⃝🚫\n•\n${a.map((x,i)=>`${i+1}. ${system.prefix}${x}`).join('\n')}`:'• ✅ Nenhum comando está bloqueado globalmente.')}}
