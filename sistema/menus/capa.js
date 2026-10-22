import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { randomUUID } from 'node:crypto'
import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'
import { getPersonalizacaoAluguel, aluguelOk } from '../funcoes/banco.js'

const dir = path.resolve('sistema/menus')
const pkg = JSON.parse(fsSync.readFileSync(new URL('../../package.json', import.meta.url), 'utf8'))
const zapoVersion = String(pkg.dependencies?.['zapo-js'] || '-').replace(/^[^0-9]*/, '')
const video = path.join(dir, 'fotomenu.mp4')
const images = [
['fotomenu.png', 'image/png'],
['fotomenu.jpg', 'image/jpeg'],
['fotomenu.jpeg', 'image/jpeg'],
['fotomenu.webp', 'image/webp']
]

async function exists(file) {
try {
await fs.access(file)
return true
} catch {
return false
}
}

async function baixarCapa(url) {
  const parsed = new URL(url)
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('URL da capa inválida')
  const host = parsed.hostname.toLowerCase()
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || isIP(host)) throw new Error('host de capa não permitido')
  const addresses = await lookup(host, { all: true })
  if (!addresses.length || addresses.some(({ address }) => {
    if (address.includes(':')) return !/^(2[0-9a-f]{3}:|3[0-9a-f]{3}:)/i.test(address) || address.toLowerCase().startsWith('fc') || address.toLowerCase().startsWith('fd')
    const a = address.split('.').map(Number)
    return a[0] === 0 || a[0] === 10 || a[0] === 127 || a[0] >= 224 || (a[0] === 169 && a[1] === 254) || (a[0] === 172 && a[1] >= 16 && a[1] <= 31) || (a[0] === 192 && a[1] === 168) || (a[0] === 100 && a[1] >= 64 && a[1] <= 127)
  })) throw new Error('host privado não permitido')
  const response = await fetch(url, { signal: AbortSignal.timeout(10000), redirect: 'error' })
  if (!response.ok) throw new Error('download da capa HTTP ' + response.status)
  const mime = (response.headers.get('content-type') || '').split(';')[0].toLowerCase()
  if (!['image/png','image/jpeg','image/webp'].includes(mime)) throw new Error('formato de capa inválido')
  if (Number(response.headers.get('content-length') || 0) > 5_000_000) throw new Error('capa maior que 5 MB')
  const chunks = []
  let size = 0
  for await (const chunk of response.body) {
    size += chunk.length
    if (size > 5_000_000) throw new Error('capa maior que 5 MB')
    chunks.push(chunk)
  }
  const ext = mime === 'image/png' ? '.png' : mime === 'image/webp' ? '.webp' : '.jpg'
  const file = path.join(os.tmpdir(), 'aurora-menu-' + randomUUID() + ext)
  await fs.writeFile(file, Buffer.concat(chunks))
  return { type: 'image', file, mimetype: mime, temporary: true }
}
async function resolverCapa(media) {
  if (!media || !/^https:\/\//i.test(media.file)) return media
  return baixarCapa(media.file)
}

export async function getMenuMedia(system = null) {
const personal = system?.isGroup && aluguelOk(system.from) ? getPersonalizacaoAluguel(system.from) : null
if (personal?.foto) return { type: 'image', file: personal.foto, mimetype: 'image/jpeg' }
if (await exists(video)) return { type: 'video', file: video, mimetype: 'video/mp4' }
for (const [name, mimetype] of images) {
const file = path.join(dir, name)
if (await exists(file)) return { type: 'image', file, mimetype }
}
return null
}

export async function prepareMenuHeader(system) {
const media = await getMenuMedia(system)
if (!media) return null
try {
const resolved = await resolverCapa(media)
try {
const uploaded = await system.client.message.upload(resolved.file, {
type: resolved.type,
mimetype: resolved.mimetype
})
if (!uploaded) return null
if (resolved.type === 'video') {
return {
hasMediaAttachment: true,
videoMessage: {
...uploaded,
mimetype: uploaded?.mimetype || resolved.mimetype,
gifPlayback: true
}
}
}
return {
hasMediaAttachment: true,
imageMessage: {
...uploaded,
mimetype: uploaded?.mimetype || media.mimetype
}
}
} finally { if (resolved.temporary) await fs.unlink(resolved.file).catch(() => {}) }
} catch (err) {
console.error('[ AURORA ] Falha ao preparar capa do Menu List:', err?.message || err)
return null
}
}

export async function sendMenu(system, texto) {
const media = await getMenuMedia(system)
const mentionJid = system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender
const options = mentionJid ? { mentions: [mentionJid] } : {}

let resolved = media
try {
resolved = await resolverCapa(media)
if (resolved?.type === 'video') {
return await system.send({
type: 'video',
media: resolved.file,
mimetype: resolved.mimetype,
gifPlayback: true,
caption: texto
}, system.from, options)
}
if (resolved?.type === 'image') {
return await system.send({
type: 'image',
media: resolved.file,
mimetype: resolved.mimetype,
caption: texto
}, system.from, options)
}
return await system.reply(texto, options)
} catch (err) {
console.error('[ AURORA ] Falha ao enviar menu com mídia:', err?.message || err)
return system.reply(texto, options)
} finally {
if (resolved?.temporary) await fs.unlink(resolved.file).catch(() => {})
}
}

export function menuData(system) {
const cargo = system.isOwner ? 'Dono' : system.isAdmin ? 'Admin' : 'Membro'
const vip = Boolean(system.isVip || system.isOwner)
const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Fortaleza' })
const usuario = system.senderNumber ? `@${system.senderNumber}` : `@${system.pushName || 'usuario'}`
const grupo = system.isGroup ? (system.metadata?.subject || 'Grupo') : 'Privado'
const personal = system.isGroup && aluguelOk(system.from) ? getPersonalizacaoAluguel(system.from) : null
return [personal?.nome || 'Aurora System', usuario, cargo, vip, hora, system.prefix, grupo, zapoVersion]
}
