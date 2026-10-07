import { youtube } from '../../funcoes/youtube.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'

export default {name: 'playvideo',aliases: ['ytvideo', 'playvid', 'ytmp4'],category: 'download',description: 'Pesquisa no Tokito APIs, mostra o resultado e envia vídeo',async run(system){
if (!system.q)
return system.reply(system.messages.playVideoUsage(system.prefix))
await system.reply(system.messages.searchingVideo())
const info = await youtube.resolve(system.q, system.config)
await youtube.result(system, info, 'video')
let media
try {
media = await downloadFile(youtube.video(info.url, system.config), system.config, 'mp4')
if (media.ext !== 'mp4' && !media.mimetype.startsWith('video/'))
throw new Error('A API não retornou um vídeo MP4 válido.')
return await system.send({
type: 'video',
media: media.path,
mimetype: media.mimetype.startsWith('video/') ? media.mimetype : 'video/mp4',
gifPlayback: false
})
}
finally {
await cleanup(media)
}
}
}
