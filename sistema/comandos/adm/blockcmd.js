import { addCmd, canonicalCmd } from '../../funcoes/banco.js'
const lock=new Set(['blockcmd','unblockcmd','listblock'])
export default {name:'blockcmd',aliases:[],category:'adm',description:'Bloqueia comando no grupo',groupOnly:true,adminOnly:true,async run(system){
 const c=canonicalCmd(system.registry,system.args[0]); if(!c) return system.reply(`• Exemplo: *${system.prefix}blockcmd play*`)
 if(lock.has(c)) return system.reply('• ❌ Esse comando não pode ser bloqueado.')
 addCmd(system.from,c); return system.reply(`• 🚫 Comando *${system.prefix}${c}* bloqueado neste grupo.`)
}}
