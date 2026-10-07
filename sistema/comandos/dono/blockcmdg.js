import { addGcmd } from '../../funcoes/banco.js'
const lock=new Set(['blockcmdg','unblockcmdg','listbcmdglobal','botoff','boton'])
export default {name:'blockcmdg',aliases:[],category:'dono',description:'Bloqueia comando globalmente',ownerOnly:true,async run(system){
 const c=String(system.args[0]||'').replace(/^[!./#]+/,'').toLowerCase(); if(!c) return system.reply(`• Exemplo: *${system.prefix}blockcmdg play*`); if(lock.has(c)) return system.reply('• ❌ Esse comando não pode ser bloqueado.')
 addGcmd(c); return system.reply(`• 🚫 Comando *${system.prefix}${c}* bloqueado globalmente.`)
}}
