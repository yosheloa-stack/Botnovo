import { listAdv } from '../../funcoes/banco.js'
export default {name:'advlist',aliases:['listadv'],category:'adm',description:'Lista advertências',groupOnly:true,adminOnly:true,async run(system){
 const list=listAdv(system.from); if(!list.length) return system.reply('• ✅ Ninguém possui advertências neste grupo.')
 const mentions=[]; const body=list.map((x,i)=>{const id=String(x.user); if(id.includes('@')) mentions.push(id); const n=x.nome||id.split('@')[0]; return `${i+1}. @${n} — *${x.n} ADV*\n   Motivo: ${x.motivo||'Sem motivo'}`}).join('\n\n')
 return system.reply(`⏤͟͟͞͞𝐀𝐝𝐯 𝐋𝐢𝐬𝐭! 𖤐⃝⚠️\n•\n${body}`,{mentions})
}}
