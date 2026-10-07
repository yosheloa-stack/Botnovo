import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
export default {name:'facebook',aliases:['fb'],category:'download',description:'Baixa Facebook pela Tokito APIs',async run(system){const link=system.args[0];if(!link)return system.reply(`• Exemplo: *${system.prefix}facebook link*`);let f;try{f=await downloadFile(apiUrl(system.config,'/api/facebook',{url:link},'tokitoApi'),system.config,'mp4');return system.send({type:'video',media:f.path,mimetype:'video/mp4',caption:'• 📘 Facebook • Aurora System'})}finally{await cleanup(f)}}}
