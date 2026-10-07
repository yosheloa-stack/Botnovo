import { listVipCmd } from '../../funcoes/banco.js'
export default {name:'listcmdvip',aliases:[],category:'dono',description:'Lista comandos VIP',ownerOnly:true,async run(system){const a=listVipCmd();return system.reply(a.length?`⏤͟͟͞͞𝐂𝐦𝐝 𝐕𝐈𝐏! 𖤐⃝💎\n•\n${a.map((x,i)=>`${i+1}. ${system.prefix}${x}`).join('\n')}`:'• Nenhum comando VIP configurado.')}}
