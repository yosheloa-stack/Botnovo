import { apiUrl, apiJson, resultOf } from '../../funcoes/api.js'
import musica from '../../funcoes/musica.js'

function user(system) {
return system.senderNumber ? `@${system.senderNumber}` : system.pushName
}

export default {name:'applemusic',aliases:['apple', 'am'],category:'download',description:'Pesquisa música ou baixa link do Apple Music',async run(system){
if (!system.q) return system.reply(`• Exemplo: *${system.prefix}applemusic Vem Cá*`)
await system.reply(system.messages.searchingAudio())

try {
let m = null
let direct = ''
const isLink = /^https?:\/\/music\.apple\.com\//i.test(system.q)

try {
const data = await apiJson(apiUrl(system.config, '/api/applemusic-play', { text: system.q }))
m = resultOf(data)
} catch (err) {
if (!isLink) throw err
direct = apiUrl(system.config, '/api/applemusic-audio', { url: system.q })
}

if (!m || typeof m !== 'object') {
if (!direct) return system.reply('• ❌ Música não encontrada.')
m = { title: 'Apple Music', artist: 'Apple Music', url: system.q }
}

const title = m.titulo || m.title || system.q
const artist = m.artista || m.artist || m.artists || 'Não encontrado'
const album = m.album || 'Não informado'
const genre = m.genero || m.genre || 'Não informado'
const release = m.lancamento || m.release_at || m.release_date || 'Não informado'
const duration = m.duracao || m.duration || 'Não encontrado'
const link = m.link || m.url || (isLink ? system.q : '')
const thumb = m.capa || m.thumbnail || m.image || ''
const audio = m.download_url || m.downloadUrl || m.audio || m.preview || direct || ''

const caption = `⏤͟͟͞͞𝐀𝐩𝐩𝐥𝐞 𝐌𝐮𝐬𝐢𝐜! 𖤐⃝🍎
•
> ╭ 🍎 𝐀𝐏𝐏𝐋𝐄 𝐌𝐔𝐒𝐈𝐂
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${user(system)}
> *[🎶]* • *ᴛɪ́ᴛᴜʟᴏ:* *${title}*
> *[🎤]* • *ᴀʀᴛɪsᴛᴀ:* ${artist}
> *[💿]* • *ᴀ́ʟʙᴜᴍ:* ${album}
> *[🎼]* • *ɢᴇ̂ɴᴇʀᴏ:* ${genre}
> *[📅]* • *ʟᴀɴᴄ̧ᴀᴍᴇɴᴛᴏ:* ${release}
> *[⏱️]* • *ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ:* ${duration}
> *[🔗]* • *ʟɪɴᴋ:* ${link || 'Indisponível'}
•
> *[⏳]* • ᴇɴᴠɪᴀɴᴅᴏ ᴀ́ᴜᴅɪᴏ...`

await musica.capa(system, caption, thumb)

if (!audio) return system.reply('• ❌ A API não retornou o áudio.')
return musica.enviar(system, audio, title, String(audio).includes('.m4a') ? 'audio/mp4' : 'audio/mpeg')
} catch (err) {
console.error('[ APPLE MUSIC ]', err?.message || err)
return system.reply(`• ❌ Erro ao buscar a música: ${err?.message || 'falha desconhecida'}`)
}
}
}
