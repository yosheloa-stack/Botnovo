import test from 'node:test'
import assert from 'node:assert/strict'
process.env.FIGPACK_ESPERA_MS = '30'
const { default: figpack } = await import('../sistema/comandos/download/figpack.js')
const { handleFigpack } = await import('../sistema/funcoes/figpack.js')

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
// WebP de verdade (a capa JPEG precisa de imagem válida). n muda a cor para não repetir.
const webp = (n) => {
  const out = `/tmp/figpack-teste-${n}.webp`
  const r = spawnSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', `color=c=0x${((n * 20 + 16) % 256).toString(16).padStart(2, '0')}2030:s=512x512`, '-frames:v', '1', out])
  assert.equal(r.status, 0, 'precisa do ffmpeg para o teste')
  return new Uint8Array(fs.readFileSync(out))
}
const espera = (ms) => new Promise((r) => setTimeout(r, ms))

function fake(args, event, enviados, respostas, bytes, senderKey = 'u1') {
  return {
    from: 'g@g.us', senderKey, prefix: '#', args, event,
    client: { message: { downloadBytes: async () => bytes } },
    reply: async (t) => { respostas.push(t) },
    send: async (c) => { enviados.push(c) }
  }
}
const imagem = { key: {}, message: { imageMessage: { mimetype: 'image/jpeg' } } }
const vazio = { key: {}, message: {} }

test('figpack: só #figpack, fotos, e o pack sai sozinho sem nome nem publisher', async () => {
  const enviados = []; const respostas = []
  await figpack.run(fake([], vazio, enviados, respostas, webp(1)))
  assert.match(respostas[0], /Figpack aberto/)
  assert.equal(await handleFigpack(fake([], imagem, enviados, respostas, webp(1))), true)
  assert.equal(await handleFigpack(fake([], imagem, enviados, respostas, webp(2))), true)
  await espera(150)
  const pack = enviados[0]
  assert.equal(pack.type, 'sticker-pack')
  assert.equal(pack.name, '')
  assert.equal(pack.publisher, '')
  assert.equal(pack.stickers.length, 2)
  assert.equal(pack.coverThumbnail[0], 0xff) // capa JPEG
  assert.doesNotMatch(JSON.stringify(respostas), /tokito|dylan|channel/i)
})

test('figpack: foto sem #figpack aberto não faz nada', async () => {
  const enviados = []
  assert.equal(await handleFigpack(fake([], imagem, enviados, [], webp(9), 'outro')), false)
  await espera(80)
  assert.equal(enviados.length, 0)
})

test('figpack: capa do pack é JPEG 252x252, não WebP', async () => {
  const { capaJpeg } = await import('../sistema/funcoes/figpack.js')
  const jpg = await capaJpeg(webp(3))
  assert.equal(jpg[0], 0xff); assert.equal(jpg[1], 0xd8)
})
