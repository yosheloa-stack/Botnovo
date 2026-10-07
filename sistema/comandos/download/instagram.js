import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
export default {name:'instagram',aliases:['insta','ig'],category:'download',description:'Baixa Instagram pela Tokito APIs',async run(system){
 const link=system.args[0];if(!link)return system.reply(`• Exemplo: *${system.prefix}instagram link*`);let f
 try{f=await downloadFile(apiUrl(system.config,'/api/insta-video',{url:link},'tokitoApi'),system.config,'mp4');if(f.mimetype.startsWith('image/'))return system.send({type:'image',media:f.path,mimetype:f.mimetype,caption:'• 📸 Instagram • Aurora System'});return system.send({type:'video',media:f.path,mimetype:f.mimetype.startsWith('video/')?f.mimetype:'video/mp4',caption:'• 📸 Instagram • Aurora System',gifPlayback:false})}finally{await cleanup(f)}
}}
