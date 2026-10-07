import { apiUrl, apiJson, resultOf } from '../../funcoes/api.js'
import musica from '../../funcoes/musica.js'

function user(system) {
return system.senderNumber ? `@${system.senderNumber}` : system.pushName
}

export default {name:'spotify',aliases:['sp'],category:'download',description:'Pesquisa música ou baixa link do Spotify',async run(system){
if (!system.q) return system.reply(`• Exemplo: *${system.prefix}spotify Vem Cá*`)
await system.reply(system.messages.searchingAudio())

try {
let m
const isLink = /^https?:\/\/(open\.)?spotify\.com\//i.test(system.q)

if (isLink) {
try {
const data = await apiJson(apiUrl(system.config, '/api/spotify-play', {
query: system.q,
q: system.q
}))
m = resultOf(data)
} catch {
const data = await apiJson(apiUrl(system.config, '/api/downloads/spotify-mp3', {
url: system.q,
proxy: 'false'
}))
m = resultOf(data)
}
} else {
const data = await apiJson(apiUrl(system.config, '/api/spotify-play', {
query: system.q,
q: system.q
}))
m = resultOf(data)
}

if (!m || typeof m !== 'object') return system.reply('• ❌ Música não encontrada.')

const title = m.titulo || m.title || system.q
const artist = m.artista || m.artist || m.artistas || m.artists || 'Não encontrado'
const album = m.album || m.album_name || m.albumName || 'Spotify'
const popularity = m.popularidade ?? m.popularity ?? 0
const release = m.lancamento || m.release_at || m.release_date || m.releaseDate || 'Não informado'
const duration = m.duracao || m.duration || '0:00'
const link = m.link || m.url || m.spotify_url || (isLink ? system.q : '')
const thumb = m.capa || m.thumbnail || m.image || m.cover || m.album?.images?.[0]?.url || ''
const audio = m.download_url || m.downloadUrl || m.download || m.audio || m.url_audio || ''

const caption = `⏤͟͟͞͞𝐒𝐩𝐨𝐭𝐢𝐟𝐲 𝐌𝐮𝐬𝐢𝐜! 𖤐⃝🎧
•
> ╭ 🟢 𝐒𝐏𝐎𝐓𝐈𝐅𝐘
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${user(system)}
> *[🎶]* • *ᴛɪ́ᴛᴜʟᴏ:* *${title}*
> *[🎤]* • *ᴀʀᴛɪsᴛᴀ:* ${artist}
> *[💿]* • *ᴀ́ʟʙᴜᴍ:* ${album}
> *[🔥]* • *ᴘᴏᴘᴜʟᴀʀɪᴅᴀᴅᴇ:* ${popularity}%
> *[📅]* • *ʟᴀɴᴄ̧ᴀᴍᴇɴᴛᴏ:* ${release}
> *[⏱️]* • *ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ:* ${duration}
> *[🔗]* • *ʟɪɴᴋ:* ${link || 'Indisponível'}
•
> *[⏳]* • ᴇɴᴠɪᴀɴᴅᴏ ᴀ́ᴜᴅɪᴏ...`

await musica.capa(system, caption, thumb)

if (!audio) return system.reply('• ❌ A API encontrou a música, mas não retornou o áudio.')
return musica.enviar(system, audio, title)
} catch (err) {
console.error('[ SPOTIFY ]', err?.message || err)
return system.reply(`• ❌ Erro ao buscar a música: ${err?.message || 'falha desconhecida'}`)
}
}
}
