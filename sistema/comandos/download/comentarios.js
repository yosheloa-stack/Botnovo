import { apiUrl } from '../../funcoes/api.js'
import { downloadFile, cleanup } from '../../funcoes/midia.js'
import { tipoLink, comentariosDoVideo } from '../../funcoes/comentarios.js'

const EMOJI = { tiktok: '🎵', instagram: '📸' }
const NOME = { tiktok: 'TikTok', instagram: 'Instagram' }
const ROTA = { tiktok: '/api/tiktok-video', instagram: '/api/insta-video' }

function corta(txt, n = 180) {
  const t = String(txt || '')
  return t.length > n ? `${t.slice(0, n - 1)}…` : t
}

function blocoComentarios(plataforma, total, itens) {
  const linhas = itens
    .map((c, i) => `> *${i + 1}.* *${corta(c.autor, 40)}*${c.likes ? ` ❤️ ${c.likes}` : ''}\n> ${corta(c.texto)}`)
    .join('\n>\n')
  return `⏤͟͟͞͞𝐂𝐨𝐦𝐞𝐧𝐭𝐚́𝐫𝐢𝐨𝐬! 𖤐⃝💬
•
> ╭ 💬 ${NOME[plataforma].toUpperCase()}
> *[💬]* • *ᴄᴏᴍᴇɴᴛᴀ́ʀɪᴏs:* ${total}
> *[📄]* • *ᴍᴏsᴛʀᴀɴᴅᴏ:* ${itens.length}
•
${linhas}`
}

export default {
  name: 'comentarios',
  aliases: ['coments', 'comentario', 'cmt', 'cmts'],
  category: 'download',
  description: 'Baixa o vídeo do TikTok/Instagram e mostra os comentários dele',
  async run(system) {
    const link = system.args[0]
    const plataforma = tipoLink(link)
    if (!link || !plataforma) {
      return system.reply(
        `• Baixa o vídeo e mostra os comentários de um link do *TikTok* ou *Instagram*.\n` +
        `• Exemplo: *${system.prefix}comentarios link*`
      )
    }

    await system.reply(`• ${EMOJI[plataforma]} Baixando o vídeo e os comentários do ${NOME[plataforma]}, aguarde...`)

    // 1) Vídeo — a mesma API que os comandos #tiktok/#instagram já usam.
    let f
    try {
      f = await downloadFile(apiUrl(system.config, ROTA[plataforma], { url: link }, 'tokitoApi'), system.config, 'mp4')
      const ehImg = f.mimetype.startsWith('image/')
      await system.send({
        type: ehImg ? 'image' : 'video',
        media: f.path,
        mimetype: ehImg ? f.mimetype : (f.mimetype.startsWith('video/') ? f.mimetype : 'video/mp4'),
        caption: `• ${EMOJI[plataforma]} ${NOME[plataforma]} • Aurora System`,
        gifPlayback: false
      })
    } catch (err) {
      console.error('[ COMENTARIOS ] video', err?.message || err)
      await system.reply(`• ❌ Não consegui baixar o vídeo do ${NOME[plataforma]}. Confere se o link está certo.`)
    } finally {
      await cleanup(f)
    }

    // 2) Comentários — se falhar, o vídeo já foi; não trava a resposta.
    try {
      const { total, itens } = await comentariosDoVideo(link, system.config)
      if (!itens.length) {
        return system.reply(
          plataforma === 'instagram'
            ? '• 💬 Não consegui pegar os comentários desse link do Instagram (o Instagram costuma fechar os comentários para APIs grátis).'
            : '• 💬 Esse vídeo está sem comentários (ou estão fechados).'
        )
      }
      return system.send(blocoComentarios(plataforma, total, itens))
    } catch (err) {
      console.error('[ COMENTARIOS ] coments', err?.message || err)
      return system.reply('• 💬 O vídeo foi, mas não consegui pegar os comentários agora. Tente de novo em instantes.')
    }
  }
}
