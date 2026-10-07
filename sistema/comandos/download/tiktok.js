import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
export default {name:'tiktok',aliases:['tt'],category:'download',description:'Baixa TikTok pela Tokito APIs',async run(system){
 const link=system.args[0];if(!link)return system.reply(`• Exemplo: *${system.prefix}tiktok link*`);let f
 try{f=await downloadFile(apiUrl(system.config,'/api/tiktok-video',{url:link},'tokitoApi'),system.config,'mp4');return system.send({type:'video',media:f.path,mimetype:f.mimetype.startsWith('video/')?f.mimetype:'video/mp4',caption:'• 🎵 TikTok • Aurora System',gifPlayback:false})}finally{await cleanup(f)}
}}
