import { youtube } from '../../funcoes/youtube.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'

export default {name: 'play',aliases: ['ytplay', 'playaudio', 'ytaudio'],category: 'download',description: 'Pesquisa no Tokito APIs, mostra o resultado e envia áudio',async run(system){
if (!system.q)
return system.reply(system.messages.playUsage(system.prefix))
await system.reply(system.messages.searchingAudio())
const info = await youtube.resolve(system.q, system.config)
await youtube.result(system, info, 'audio')
let media
try {
media = await youtube.audioMp3(info, system.config)
const safe = String(info.title || 'audio').replace(/[\\/:*?"<>|]/g, '').slice(0, 90) || 'audio'
return await system.send({
type: 'audio',
media: media.path,
mimetype: media.mimetype || 'audio/mpeg',
fileName: `${safe}.mp3`,
ptt: false,
...(media.seconds ? { seconds: media.seconds } : {})
})
}
catch (err) {
console.error('[ PLAY ]', err)
return system.reply(`• ❌ Não consegui baixar agora.\n• Motivo: ${String(err?.message || err).slice(0, 700)}`)
}
finally {
await cleanup(media)
}
}
}
