import test from 'node:test'
import assert from 'node:assert/strict'
import figpack from '../sistema/comandos/download/figpack.js'
import { handleFigpack } from '../sistema/funcoes/figpack.js'

const webp = (n) => {
  const b = Buffer.alloc(32)
  b.write('RIFF', 0); b.write('WEBP', 8); b.writeUInt8(n, 20)
  return new Uint8Array(b)
}

function fake(args, event, enviados, respostas, bytes) {
  return {
    from: 'g@g.us', senderKey: 'u1', prefix: '#', args, event,
    client: { message: { downloadBytes: async () => bytes } },
    reply: async (t) => { respostas.push(t) },
    send: async (c) => { enviados.push(c) }
  }
}
const imagem = { key: {}, message: { imageMessage: { mimetype: 'image/jpeg' } } }

test('figpack: pack sai sem nome, sem publisher e sem assinatura', async () => {
  const enviados = []; const respostas = []
  await figpack.run(fake(['criar'], { key: {}, message: {} }, enviados, respostas, webp(1)))
  assert.match(respostas[0], /iniciado/)
  assert.equal(await handleFigpack(fake([], imagem, enviados, respostas, webp(1))), true)
  assert.equal(await handleFigpack(fake([], imagem, enviados, respostas, webp(2))), true)
  await figpack.run(fake(['gerar'], { key: {}, message: {} }, enviados, respostas, webp(1)))
  const pack = enviados[0]
  assert.equal(pack.type, 'sticker-pack')
  assert.equal(pack.name, '')
  assert.equal(pack.publisher, '')
  assert.equal(pack.stickers.length, 2)
  const tudo = JSON.stringify(respostas)
  assert.doesNotMatch(tudo, /tokito|dylan|channel/i)
})

test('figpack: gerar sem criar avisa', async () => {
  const respostas = []
  await figpack.run({ ...fake(['gerar'], { key: {}, message: {} }, [], respostas, webp(1)), senderKey: 'outro' })
  assert.match(respostas[0], /Nenhum figpack/)
})
