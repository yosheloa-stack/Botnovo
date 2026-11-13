import crypto from 'node:crypto'
import { mediaInfo, quotedInfo } from './mensagem.js'
import { sticker } from './figurinha.js'

// Pack de figurinhas SEM nome, SEM autor/publisher e SEM assinatura.
export const MAX_FIGURINHAS = 30
const EXPIRA_MS = 60 * 60 * 1000
const sessoes = new Map()

const chave = (s) => `${s.from}|${s.senderKey}`

export function sessaoFigpack(system) {
  const id = chave(system)
  const s = sessoes.get(id)
  if (s && Date.now() - s.criadoEm > EXPIRA_MS) {
    if (s.timer) clearTimeout(s.timer)
    sessoes.delete(id)
    return null
  }
  return s || null
}

export function iniciarFigpack(system) {
  const id = chave(system)
  const antiga = sessoes.get(id)
  if (antiga?.timer) clearTimeout(antiga.timer)
  const s = { itens: [], hashes: new Set(), criadoEm: Date.now(), timer: null }
  sessoes.set(id, s)
  return s
}

export function cancelarFigpack(system) {
  const id = chave(system)
  const s = sessoes.get(id)
  if (!s) return false
  if (s.timer) clearTimeout(s.timer)
  sessoes.delete(id)
  return true
}

async function adicionar(system, sessao, source, info) {
  if (sessao.itens.length >= MAX_FIGURINHAS) return false
  const bytes = await system.client.message.downloadBytes(source, { maxBytes: 20 * 1024 * 1024 })
  if (!bytes?.byteLength) return false
  const webp = await sticker(bytes, { video: false, mimetype: info.mimetype })
  const hash = crypto.createHash('sha256').update(webp).digest('hex')
  if (sessao.hashes.has(hash)) return false
  sessao.hashes.add(hash)
  sessao.itens.push({ webp, hash })
  return true
}

// Foto na própria mensagem do "criar" ou a foto respondida.
export async function adicionarInicial(system, sessao) {
  const quoted = quotedInfo(system.event)
  const q = quoted ? mediaInfo(quoted.message) : null
  const atual = mediaInfo(system.event?.message)
  const info = q?.type === 'image' ? q : (atual?.type === 'image' ? atual : null)
  if (!info) return false
  try { return await adicionar(system, sessao, info === q ? quoted.message : system.event, info) } catch { return false }
}

// Chamado pelo handler para mensagens sem comando: junta as fotos enviadas.
export async function handleFigpack(system) {
  const sessao = sessaoFigpack(system)
  if (!sessao || system.event?.key?.fromMe) return false
  const info = mediaInfo(system.event?.message)
  if (info?.type !== 'image') return false
  try {
    if (await adicionar(system, sessao, system.event, info)) {
      if (sessao.timer) clearTimeout(sessao.timer)
      sessao.timer = setTimeout(() => {
        const cheio = sessao.itens.length >= MAX_FIGURINHAS
        system.reply(`🧊 Figurinhas: ${sessao.itens.length}/${MAX_FIGURINHAS}\n${cheio ? 'Limite atingido. Use ' + system.prefix + 'figpack gerar' : 'Continue enviando ou use ' + system.prefix + 'figpack gerar'}`).catch(() => {})
      }, 1200)
      sessao.timer.unref?.()
    }
  } catch (err) {
    console.warn('[ FIGPACK ] imagem:', err?.message || err)
  }
  return true
}

export async function gerarFigpack(system, sessao) {
  const id = `figpack-${crypto.randomBytes(12).toString('hex')}`
  const trayName = `${id}.webp`
  const stickers = sessao.itens.map((it, i) => ({
    media: it.webp,
    fileName: `${String(i).padStart(2, '0')}_${it.hash.slice(0, 16)}.webp`,
    emojis: ['🧊'],
    isAnimated: false,
    isLottie: false,
    mimetype: 'image/webp'
  }))
  await system.send({
    type: 'sticker-pack',
    stickerPackId: id,
    name: '',
    publisher: '',
    stickers,
    trayIcon: { media: sessao.itens[0].webp, fileName: trayName },
    coverThumbnail: sessao.itens[0].webp
  })
  return stickers.length
}
