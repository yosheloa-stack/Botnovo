import test from 'node:test'
import assert from 'node:assert/strict'
process.env.FIGPACK_ESPERA_MS = '30'
const { default: figpack } = await import('../sistema/comandos/download/figpack.js')
const { handleFigpack } = await import('../sistema/funcoes/figpack.js')

const webp = (n) => {
  const b = Buffer.alloc(32)
  b.write('RIFF', 0); b.write('WEBP', 8); b.writeUInt8(n, 20)
  return new Uint8Array(b)
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
  assert.doesNotMatch(JSON.stringify(respostas), /tokito|dylan|channel/i)
})

test('figpack: foto sem #figpack aberto não faz nada', async () => {
  const enviados = []
  assert.equal(await handleFigpack(fake([], imagem, enviados, [], webp(9), 'outro')), false)
  await espera(80)
  assert.equal(enviados.length, 0)
})
