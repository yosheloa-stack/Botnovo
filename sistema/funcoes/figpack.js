import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { sticker } from './figurinha.js'
import { apiUrl } from './api.js'

// Pack de figurinhas SEM nome, SEM autor/publisher e SEM assinatura.

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

export const MAX_FIGURINHAS = 30
export const MIN_FIGURINHAS = 3

const UA = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36'
const PIN_BASE = 'https://br.pinterest.com'

// Fonte 1: API do bot (a mesma do #pinsearch). Cada chamada traz uma imagem; as repetidas caem fora.
function urlsApi(config, tema) {
  return Array.from({ length: 12 }, (_, i) => apiUrl(config, '/api/pin-image', { titulo: tema, cache: `${Date.now()}-${i}` }))
}

// Fonte 2: busca de imagens do Bing (aberta, sem chave), com filtro de conteúdo adulto.
async function urlsBing(tema) {
  const q = new URLSearchParams({ q: tema, first: '1', count: '60', adlt: 'strict', mmasync: '1' })
  const r = await fetch(`https://www.bing.com/images/async?${q}`, { headers: { 'user-agent': UA, 'accept-language': 'pt-BR,pt;q=0.9' }, signal: AbortSignal.timeout(20000) })
  if (!r.ok) throw new Error(`Bing respondeu HTTP ${r.status}`)
  const html = await r.text()
  return [...html.matchAll(/murl&quot;:&quot;(https?:[^&]+?)&quot;/g)].map((m) => m[1])
}

// Fonte 3: Pinterest direto (costuma dar 403 em servidor; fica por último).
async function urlsPinterest(tema) {
  const home = await fetch(PIN_BASE, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) })
  const cookie = (home.headers.getSetCookie?.() || []).map((c) => String(c).split(';')[0].trim()).join('; ')
  const params = new URLSearchParams({
    source_url: `/search/pins/?q=${tema}`,
    data: JSON.stringify({ options: { isPrefetch: false, query: tema, scope: 'pins', bookmarks: [''], page_size: 60 }, context: {} }),
    _: String(Date.now())
  })
  const r = await fetch(`${PIN_BASE}/resource/BaseSearchResource/get/?${params}`, { headers: { 'user-agent': UA, cookie, accept: 'application/json' }, signal: AbortSignal.timeout(30000) })
  if (!r.ok) throw new Error(`Pinterest respondeu HTTP ${r.status}`)
  const data = await r.json()
  return (data?.resource_response?.data?.results || []).map((x) => x?.images?.orig?.url).filter(Boolean)
}

// Junta as fontes na ordem; se uma falhar, segue para a próxima.
export async function buscarImagens(tema, config) {
  const fontes = [
    ['API do bot', async () => urlsApi(config, tema)],
    ['Bing', () => urlsBing(tema)],
    ['Pinterest', () => urlsPinterest(tema)]
  ]
  const urls = []
  const erros = []
  for (const [nome, buscar] of fontes) {
    try {
      const achadas = await buscar()
      console.log(`[ FIGPACK ] fonte ${nome}:`, achadas.length, 'imagens')
      urls.push(...achadas)
    } catch (err) {
      erros.push(`${nome}: ${err?.message || err}`)
      console.warn(`[ FIGPACK ] fonte ${nome} falhou:`, err?.message || err)
    }
  }
  if (!urls.length && erros.length) throw new Error(erros.join(' | '))
  return [...new Set(urls)]
}

async function baixar(url) {
  const r = await fetch(url, { headers: { 'user-agent': UA, ...(url.includes('pinimg') ? { referer: 'https://www.pinterest.com/' } : {}) }, signal: AbortSignal.timeout(20000) })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const bytes = new Uint8Array(await r.arrayBuffer())
  if (!bytes.length || bytes.length > 10 * 1024 * 1024) throw new Error('imagem vazia ou grande demais')
  return bytes
}

// Baixa e converte as imagens em figurinhas (várias ao mesmo tempo), até o limite.
export async function montarFigurinhas(urls) {
  const itens = []
  const hashes = new Set()
  let i = 0
  const worker = async () => {
    while (itens.length < MAX_FIGURINHAS) {
      const url = urls[i++]
      if (!url) return
      try {
        const webp = await sticker(await baixar(url), { video: false, mimetype: 'image/jpeg' })
        const hash = crypto.createHash('sha256').update(webp).digest('hex')
        if (hashes.has(hash) || itens.length >= MAX_FIGURINHAS) continue
        hashes.add(hash)
        itens.push({ webp, hash })
      } catch (err) {
        console.warn('[ FIGPACK ] imagem ignorada:', err?.message || err)
      }
    }
  }
  await Promise.all(Array.from({ length: 5 }, worker))
  return itens
}

export async function gerarFigpack(system, itens) {
  const id = `figpack-${crypto.randomBytes(12).toString('hex')}`
  const trayName = `${id}.webp`
  const stickers = itens.map((it, i) => ({
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
    trayIcon: { media: itens[0].webp, fileName: trayName },
    coverThumbnail: await capaJpeg(itens[0].webp)
  })
  return stickers.length
}
