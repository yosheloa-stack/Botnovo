import { rmHora } from '../../funcoes/banco.js'
export default {name:'rm_closegp',aliases:['rmclosegp'],category:'adm',description:'Remove horários do grupo',groupOnly:true,adminOnly:true,async run(system){rmHora(system.from);return system.reply('• ✅ Horários automáticos de abrir/fechar removidos.')}}
