const itens=[['antiFake','Anti Fake'],['antiLink','Anti Link'],['antiAudio','Anti Áudio'],['antiVideo','Anti Vídeo'],['antiFoto','Anti Foto'],['antiSticker','Anti Sticker'],['antiDocumento','Anti Documento'],['antiStatus','Anti Status'],['antiCanal','Anti Canal'],['antiVisu','Anti Visu'],['x9ViewOnce','X9 ViewOnce'],['x9','X9'],['bemVindo','Bem-vindo'],['autoSticker','Auto Sticker'],['autoBan','Auto Ban'],['soAdm','Só ADM']]
export default {name:'status',aliases:['statusgp'],category:'adm',description:'Mostra ativações do grupo',groupOnly:true,adminOnly:true,async run(system){
 const lines=itens.map(([k,n])=>`> ${n}: ${Number(system.group?.[k])===1?'✅ Ativado':'❌ Desativado'}`)
 return system.reply(`⏤͟͟͞͞𝐒𝐭𝐚𝐭𝐮𝐬 𝐝𝐨 𝐆𝐫𝐮𝐩𝐨! 𖤐⃝⚙️\n•\n${lines.join('\n')}`)
}}
