import { banGp } from '../../funcoes/banco.js'
export default {name:'bangp',aliases:[],category:'dono',description:'Bloqueia um grupo inteiro',ownerOnly:true,groupOnly:true,async run(system){banGp(system.from);return system.reply('• 🚫 Este grupo foi bloqueado de usar o Aurora. O dono continua com acesso.')}}
