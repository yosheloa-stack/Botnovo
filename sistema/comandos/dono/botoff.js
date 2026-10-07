import { setNecessario } from '../../funcoes/necessarios.js'
export default {name:'botoff',aliases:[],category:'dono',description:'Deixa o bot só para o dono',ownerOnly:true,async run(system){
 await setNecessario('botoff',true); return system.reply('• 📴 *BOT OFF* ativado. Agora somente o dono pode usar o Aurora.')
}}
