import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import { spawn } from 'node:child_process'

function run(bin, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let stderr = ''
    p.stderr.on('data', (d) => { stderr += String(d) })
    p.once('error', reject)
    p.once('close', (code) => {
      if (code === 0) return resolve()
      const tail = stderr.trim().split('\n').slice(-4).join(' ')
      reject(new Error(tail || `${bin} encerrou com código ${code}`))
    })
  })
}

function asBuffer(value) {
  if (Buffer.isBuffer(value)) return value
  if (value instanceof Uint8Array) {
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength)
  }
  throw new TypeError('Mídia inválida para figurinha.')
}

function isWebp(buffer) {
  return buffer.length >= 12
    && buffer.subarray(0, 4).toString() === 'RIFF'
    && buffer.subarray(8, 12).toString() === 'WEBP'
}

function inputExt(mimetype = '', video = false) {
  const mime = String(mimetype).toLowerCase()
  if (video) return mime.includes('webm') ? 'webm' : 'mp4'
  if (mime.includes('png')) return 'png'
  if (mime.includes('gif')) return 'gif'
  if (mime.includes('webp')) return 'webp'
  return 'jpg'
}

async function tempFile(ext) {
  const dir = path.join(os.tmpdir(), 'aurora-system')
  await fs.mkdir(dir, { recursive: true })
  return path.join(dir, `${Date.now()}-${crypto.randomUUID()}.${ext}`)
}

async function staticWebp(buffer) {
  // Primeiro tenta sharp quando ele estiver disponível. No Termux ele é opcional,
  // então a falta dele não quebra o comando: cai no FFmpeg.
  try {
    const sharp = (await import('sharp')).default
    const out = await sharp(buffer, { animated: true })
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        withoutEnlargement: false
      })
      .webp({ quality: 82 })
      .toBuffer()
    if (out?.length) return out
  } catch {}

  const input = await tempFile('img')
  const output = await tempFile('webp')
  try {
    await fs.writeFile(input, buffer)
    await run('ffmpeg', [
      '-y', '-i', input,
      '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000',
      '-vcodec', 'libwebp',
      '-lossless', '0',
      '-q:v', '78',
      '-preset', 'picture',
      '-an',
      '-vsync', '0',
      output
    ])
    return await fs.readFile(output)
  } catch (err) {
    if (err?.code === 'ENOENT') throw new Error('ffmpeg não está instalado.')
    throw new Error(`Não consegui converter a imagem: ${err?.message || err}`)
  } finally {
    await Promise.allSettled([fs.unlink(input), fs.unlink(output)])
  }
}

async function animatedWebp(buffer, mimetype = 'video/mp4') {
  const input = await tempFile(inputExt(mimetype, true))
  const output = await tempFile('webp')
  try {
    await fs.writeFile(input, buffer)
    await run('ffmpeg', [
      '-y', '-i', input,
      '-t', '10',
      '-vf', 'fps=12,scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000',
      '-vcodec', 'libwebp',
      '-lossless', '0',
      '-q:v', '58',
      '-preset', 'picture',
      '-loop', '0',
      '-an',
      '-vsync', '0',
      output
    ])
    return await fs.readFile(output)
  } catch (err) {
    if (err?.code === 'ENOENT') throw new Error('ffmpeg não está instalado.')
    throw new Error(`Não consegui converter o vídeo com ffmpeg: ${err?.message || err}`)
  } finally {
    await Promise.allSettled([fs.unlink(input), fs.unlink(output)])
  }
}

// Conversor usado pelo comando fig. Recebe bytes diretamente do Zapo e devolve
// bytes WebP, igual ao fluxo do Akame/Tokito: baixa mídia -> converte -> envia sticker.
export async function sticker(input, options = {}) {
  const buffer = asBuffer(input)
  if (!buffer.length) throw new Error('Mídia vazia.')

  if (!options.video && isWebp(buffer)) {
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
  }

  const out = options.video
    ? await animatedWebp(buffer, options.mimetype)
    : await staticWebp(buffer)

  return new Uint8Array(out.buffer, out.byteOffset, out.byteLength)
}

// Compatibilidade com os comandos antigos que ainda esperem webp({path,...}).
export async function webp(file, animated = false) {
  const buffer = await fs.readFile(file.path)
  const bytes = await sticker(buffer, {
    video: animated || String(file.mimetype || '').startsWith('video/') || file.ext === 'gif',
    mimetype: file.mimetype
  })
  const out = await tempFile('webp')
  await fs.writeFile(out, bytes)
  return { path: out, mimetype: 'image/webp', ext: 'webp' }
}
