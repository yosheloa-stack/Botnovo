import crypto from 'node:crypto'
import { mediaInfo, quotedInfo } from './mensagem.js'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { sticker } from './figurinha.js'

// Pack de figurinhas SEM nome, SEM autor/publisher e SEM assinatura.
export const MAX_FIGURINHAS = 30
const EXPIRA_MS = 60 * 60 * 1000
// Depois da última foto, espera esse tempo e já monta o pack sozinho.
export const ESPERA_MS = Number(process.env.FIGPACK_ESPERA_MS) || 6000
const sessoes = new Map()

// O WhatsApp exige a capa do pack em JPEG 252x252 (o Zapo envia como image/jpeg).
// Mandar o WebP aqui faz o pack não aparecer/abrir.
export async function capaJpeg(webp) {
  const buffer = Buffer.from(webp.buffer, webp.byteOffset, webp.byteLength)
  try {
    const sharp = (await import('sharp')).default
    const out = await sharp(buffer).resize(252, 252, { fit: 'fill' }).jpeg({ quality: 80 }).toBuffer()
    if (out?.length) return new Uint8Array(out.buffer, out.byteOffset, out.byteLength)
  } catch {}
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'figpack-'))
  const entrada = path.join(dir, 'in.webp')
  const saida = path.join(dir, 'out.jpg')
  try {
    await fs.writeFile(entrada, buffer)
    await new Promise((resolve, reject) => {
      const p = spawn('ffmpeg', ['-y', '-i', entrada, '-vf', 'scale=252:252', '-frames:v', '1', '-q:v', '5', saida], { stdio: ['ignore', 'ignore', 'pipe'] })
      let err = ''
      p.stderr.on('data', (d) => { err += String(d) })
      p.once('error', reject)
      p.once('close', (code) => code === 0 ? resolve() : reject(new Error(err.trim().split('\n').slice(-3).join(' ') || `ffmpeg código ${code}`)))
    })
    const out = await fs.readFile(saida)
    return new Uint8Array(out.buffer, out.byteOffset, out.byteLength)
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

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
  if (!sessao) return false
  const info = mediaInfo(system.event?.message)
  if (info?.type !== 'image') return false
  try {
    if (await adicionar(system, sessao, system.event, info)) {
      if (sessao.timer) clearTimeout(sessao.timer)
      sessao.timer = setTimeout(() => finalizarFigpack(system, sessao), sessao.itens.length >= MAX_FIGURINHAS ? 300 : ESPERA_MS)
      sessao.timer.unref?.()
    }
  } catch (err) {
    console.warn('[ FIGPACK ] não consegui converter a foto:', err?.stack || err?.message || err)
    system.reply('⚠️ Não consegui ler uma das fotos. Mande de novo.').catch(() => {})
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
    coverThumbnail: await capaJpeg(sessao.itens[0].webp)
  })
  return stickers.length
}

// Monta e envia o pack sozinho quando as fotos acabam.
export async function finalizarFigpack(system, sessao) {
  if (sessoes.get(chave(system)) !== sessao || !sessao.itens.length) return
  sessoes.delete(chave(system))
  console.log('[ FIGPACK ] montando pack com', sessao.itens.length, 'figurinhas | chat:', system.from)
  try {
    await gerarFigpack(system, sessao)
    console.log('[ FIGPACK ] pack enviado')
  } catch (err) {
    console.warn('[ FIGPACK ] gerar:', err?.stack || err?.message || err)
    system.reply('❌ Não consegui montar o pack (' + (err?.message || 'erro') + '). Mande `' + system.prefix + 'figpack` e as fotos de novo.').catch(() => {})
  }
}
