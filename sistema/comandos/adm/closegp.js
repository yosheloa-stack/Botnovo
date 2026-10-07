import { setHora } from '../../funcoes/banco.js'
const ok=v=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v)
export default {name:'closegp',aliases:[],category:'adm',description:'Programa horário para fechar',groupOnly:true,adminOnly:true,botAdminOnly:true,async run(system){
 const h=system.args[0]||''; if(!ok(h)) return system.reply(`• Use: *${system.prefix}closegp 22:00*`)
 setHora(system.from,'fechar',h); return system.reply(`• 🔒 Grupo programado para fechar às *${h}*.`)
}}
