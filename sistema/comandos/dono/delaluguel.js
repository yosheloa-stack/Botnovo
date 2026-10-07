import { delAluguel } from '../../funcoes/banco.js'
export default {name:'delaluguel',aliases:[],category:'dono',description:'Remove aluguel do grupo',ownerOnly:true,groupOnly:true,async run(system){delAluguel(system.from);return system.reply('• ✅ Aluguel deste grupo removido.')}}
