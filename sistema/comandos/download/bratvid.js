import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
import { webp } from '../../funcoes/figurinha.js'
export default {name:'bratvid',aliases:['bratvd','bratv','bladevid','bladevd'],category:'download',description:'Cria figurinha Brat animada',async run(system){if(!system.q)return system.reply(`• Exemplo: *${system.prefix}bratvid Aurora*`);let raw,stk;try{raw=await downloadFile(apiUrl(system.config,'/api/stickers/brat-vid',{text:system.q},'akameApi'),system.config,'mp4');stk=await webp(raw,true);return system.send({type:'sticker',media:stk.path,mimetype:'image/webp'})}finally{await cleanup(raw,stk)}}}
