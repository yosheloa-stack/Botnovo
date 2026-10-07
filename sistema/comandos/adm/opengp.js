import { setHora } from '../../funcoes/banco.js'
const ok=v=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v)
export default {name:'opengp',aliases:[],category:'adm',description:'Programa horário para abrir',groupOnly:true,adminOnly:true,botAdminOnly:true,async run(system){
 const h=system.args[0]||''; if(!ok(h)) return system.reply(`• Use: *${system.prefix}opengp 07:00*`)
 setHora(system.from,'abrir',h); return system.reply(`• 🔓 Grupo programado para abrir às *${h}*.`)
}}
