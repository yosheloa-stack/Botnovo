import { apiUrl, apiJson, resultOf } from '../../funcoes/api.js'
import musica from '../../funcoes/musica.js'

function user(system) {
return system.senderNumber ? `@${system.senderNumber}` : system.pushName
}

export default {name:'soundcloud',aliases:['sc'],category:'download',description:'Pesquisa música ou baixa link do SoundCloud',async run(system){
if (!system.q) return system.reply(`• Exemplo: *${system.prefix}soundcloud MC Poze*`)
await system.reply(system.messages.searchingAudio())

try {
const data = await apiJson(apiUrl(system.config, '/api/soundcloud', {
q: system.q,
query: system.q
}))
const m = resultOf(data)
if (!m || typeof m !== 'object') return system.reply('• ❌ Música não encontrada.')

const title = m.titulo || m.title || system.q
const artist = m.autor || m.artist || m.author || 'SoundCloud'
const genre = m.genero || m.genre || 'Não informado'
const published = m.publicado || m.publication || m.date || m.release_at || 'Não informado'
const likes = m.likes ?? '-'
const comments = m.comentarios ?? m.comments ?? '-'
const duration = m.duracao || m.duration || m.tempo || 'Não encontrado'
const link = m.url || m.link || ''
const thumb = m.imagem || m.image || m.thumbnail || ''
const audio = m.audio || m.download || m.download_url || ''

const caption = `⏤͟͟͞͞𝐒𝐨𝐮𝐧𝐝𝐂𝐥𝐨𝐮𝐝 𝐌𝐮𝐬𝐢𝐜! 𖤐⃝☁️
•
> ╭ ☁️ 𝐒𝐎𝐔𝐍𝐃𝐂𝐋𝐎𝐔𝐃
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${user(system)}
> *[🎶]* • *ᴛɪ́ᴛᴜʟᴏ:* *${title}*
> *[🎤]* • *ᴀᴜᴛᴏʀ:* ${artist}
> *[🎼]* • *ɢᴇ̂ɴᴇʀᴏ:* ${genre}
> *[📅]* • *ᴘᴜʙʟɪᴄᴀᴅᴏ:* ${published}
> *[❤️]* • *ʟɪᴋᴇs:* ${likes}
> *[💬]* • *ᴄᴏᴍᴇɴᴛᴀ́ʀɪᴏs:* ${comments}
> *[⏱️]* • *ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ:* ${duration}
> *[🔗]* • *ʟɪɴᴋ:* ${link || 'Indisponível'}
•
> *[⏳]* • ᴇɴᴠɪᴀɴᴅᴏ ᴀ́ᴜᴅɪᴏ...`

await musica.capa(system, caption, thumb)

if (!audio) return system.reply('• ❌ A API não retornou o áudio.')
return musica.enviar(system, audio, title)
} catch (err) {
console.error('[ SOUNDCLOUD ]', err?.message || err)
return system.reply(`• ❌ Erro ao buscar a música: ${err?.message || 'falha desconhecida'}`)
}
}
}
