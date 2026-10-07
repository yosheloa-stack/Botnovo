import { quotedInfo, mediaInfo } from '../../funcoes/mensagem.js'
import { sticker } from '../../funcoes/figurinha.js'

function sourceFor(system, quoted, useQuoted) {
  // Zapo aceita o evento completo OU um Proto.IMessage cru.
  // Para mensagem respondida, quoted.message já é exatamente o Proto.IMessage
  // que contém imageMessage/videoMessage; não monte um evento falso com key.
  return useQuoted ? quoted?.message : system.event
}

export default {name:'fig',aliases:['figurinha', 'sticker', 's', 'st', 'stk', 'f', 'fsticker', 'fstiker'],category:'download',description:'Transforma foto ou vídeo em figurinha',async run(system){
    const quoted = quotedInfo(system.event)
    const quotedMedia = quoted ? mediaInfo(quoted.message) : null
    const currentMedia = mediaInfo(system.event?.message)
    const info = quotedMedia || currentMedia
    const useQuoted = Boolean(quotedMedia)

    if (!info || !['image', 'video'].includes(info.type)) {
      return system.reply(
        `• Marque/responda uma *foto ou vídeo* com *${system.prefix}fig*.\n` +
        `• Também funciona enviando a mídia com *${system.prefix}fig* na legenda.`
      )
    }

    if (info.type === 'video' && Number(info.seconds || 0) >= 11) {
      return system.reply('• ❌ O vídeo precisa ter no máximo 10 segundos para virar figurinha.')
    }

    try {
      const source = sourceFor(system, quoted, useQuoted)

      // Figurinhas são mídias pequenas. Baixar em memória evita arquivo temporário
      // antes da conversão e funciona tanto com evento normal quanto com quotedMessage.
      const bytes = await system.client.message.downloadBytes(source, {
        maxBytes: 50 * 1024 * 1024
      })

      if (!bytes?.byteLength) throw new Error('A mídia foi baixada vazia.')

      const webp = await sticker(bytes, {
        video: info.type === 'video',
        mimetype: info.mimetype,
        pack: system.pushName || 'Aurora',
        author: system.config?.bot?.name || system.config?.name || 'Aurora System'
      })

      return await system.send({
        type: 'sticker',
        media: webp,
        mimetype: 'image/webp'
      })
    } catch (err) {
      const message = String(err?.message || err || '')
      console.error('[ FIG ]', err)

      if (/ffmpeg|ENOENT.*ffmpeg|spawn ffmpeg/i.test(message)) {
        return system.reply('• ❌ Não consegui converter o vídeo. No Termux, instale o FFmpeg com: *pkg install ffmpeg*')
      }

      if (/sharp|conversor|converter a imagem/i.test(message)) {
        return system.reply('• ❌ Não consegui converter a imagem. No Termux, instale o FFmpeg com: *pkg install ffmpeg*')
      }

      if (/404|410|reupload|expir|download|mídia|media/i.test(message)) {
        return system.reply('• ❌ Não consegui baixar essa mídia. Tente responder uma foto/vídeo mais recente e use o comando novamente.')
      }

      return system.reply(`• ❌ Não consegui criar a figurinha.\n• Erro: ${message.slice(0, 180) || 'desconhecido'}`)
    }
  }
}
