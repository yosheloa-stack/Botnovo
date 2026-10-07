import { setNecessario } from '../../funcoes/necessarios.js'
export default {name:'boton',aliases:[],category:'dono',description:'Libera o bot para todos',ownerOnly:true,async run(system){
 await setNecessario('botoff',false); return system.reply('• 🟢 *BOT ON* ativado. O Aurora voltou a responder normalmente.')
}}
