import { youtube } from '../../funcoes/youtube.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'

export default {name: 'playdoc',aliases: ['ytdoc'],category: 'download',description: 'Pesquisa no Tokito APIs, mostra o resultado e envia MP3 como documento',async run(system){
if (!system.q)
return system.reply(system.messages.playDocUsage(system.prefix))
await system.reply(system.messages.searchingDoc())
const info = await youtube.resolve(system.q, system.config)
await youtube.result(system, info, 'doc')
let media
try {
media = await youtube.audioMp3(info, system.config)
const safe = String(info.title || 'audio').replace(/[\\/:*?"<>|]/g, '').slice(0, 90) || 'audio'
return await system.send({
type: 'document',
media: media.path,
mimetype: media.mimetype || 'audio/mpeg',
fileName: `${safe}.mp3`
})
}
catch (err) {
console.error('[ PLAY ]', err)
return system.reply('Eita, não consegui pegar essa música agora 😅\nTenta de novo daqui a pouco ou procura outra, tá? 💙')
}
finally {
await cleanup(media)
}
}
}
