import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
import { webp } from '../../funcoes/figurinha.js'
export default {name:'brat',aliases:['bratimg','blade'],category:'download',description:'Cria figurinha Brat',async run(system){if(!system.q)return system.reply(`• Exemplo: *${system.prefix}brat Aurora*`);let raw,stk;try{raw=await downloadFile(apiUrl(system.config,'/api/stickers/brat-img',{text:system.q},'akameApi'),system.config,'png');stk=await webp(raw,false);return system.send({type:'sticker',media:stk.path,mimetype:'image/webp'})}finally{await cleanup(raw,stk)}}}
