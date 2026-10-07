import { delCmd } from '../../funcoes/banco.js'
export default {name:'unblockcmd',aliases:[],category:'adm',description:'Libera comando no grupo',groupOnly:true,adminOnly:true,async run(system){
 const c=String(system.args[0]||'').replace(/^[!./#]+/,'').toLowerCase(); if(!c) return system.reply(`• Exemplo: *${system.prefix}unblockcmd play*`)
 delCmd(system.from,c); return system.reply(`• ✅ Comando *${system.prefix}${c}* liberado neste grupo.`)
}}
