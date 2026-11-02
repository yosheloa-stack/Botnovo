import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
import { videoTikTok } from '../../funcoes/comentarios.js'

export default {name:'tiktok',aliases:['tt'],category:'download',description:'Baixa vídeo do TikTok',async run(system){
 const link=system.args[0];if(!link)return system.reply(`• Exemplo: *${system.prefix}tiktok link*`)
 // Baixa por fonte grátis (tikwm), sem depender da API Tokito. Se falhar, cai pra Tokito.
 let fonte
 try{ fonte=(await videoTikTok(link,system.config)).url }
 catch(e){ console.error('[ TIKTOK ] tikwm, caindo pra Tokito:',e?.message||e); fonte=apiUrl(system.config,'/api/tiktok-video',{url:link},'tokitoApi') }
 let f
 try{
  f=await downloadFile(fonte,system.config,'mp4')
  return system.send({type:'video',media:f.path,mimetype:f.mimetype.startsWith('video/')?f.mimetype:'video/mp4',caption:'• 🎵 TikTok • Aurora System',gifPlayback:false})
 }catch(err){
  console.error('[ TIKTOK ]',err?.message||err)
  return system.reply('• ❌ Não consegui baixar esse vídeo do TikTok. Confere se o link está certo.')
 }finally{await cleanup(f)}
}}
