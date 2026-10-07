import { getHora } from '../../funcoes/banco.js'
export default {name:'infoclosegp',aliases:[],category:'adm',description:'Mostra horários e como usar',groupOnly:true,adminOnly:true,async run(system){
 const h=getHora(system.from); return system.reply(`⏤͟͟͞͞𝐇𝐨𝐫𝐚́𝐫𝐢𝐨 𝐝𝐨 𝐆𝐫𝐮𝐩𝐨! 𖤐⃝⏰\n•\n> Fechar: *${h?.fechar||'Não definido'}*\n> Abrir: *${h?.abrir||'Não definido'}*\n•\n> ${system.prefix}closegp 22:00\n> ${system.prefix}opengp 07:00\n> ${system.prefix}rm_closegp`)}}
