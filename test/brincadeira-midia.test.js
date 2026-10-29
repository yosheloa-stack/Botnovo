// node test/brincadeira-midia.test.js
// GIF/imagem guardado no próprio bot (sistema/midia/brincadeiras/<chave>.mp4)
// vai antes do link: o comando de zoeira não fica só no texto quando a
// hospedagem de fora (catbox) sai do ar.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const { sendAkameMedia, midiaLocal } = await import(path.join(raiz, 'sistema/funcoes/brincadeiras.js'))
const pasta = path.join(raiz, 'sistema/midia/brincadeiras')

const sistema = () => {
  const s = { config: {}, from: 'g@g.us', enviados: [], respostas: [] }
  s.send = async (c) => { s.enviados.push(c); return 'ok' }
  s.reply = async (t) => { s.respostas.push(t); return 'ok' }
  return s
}

test('arquivo do próprio bot vai como GIF, sem baixar nada', async () => {
  fs.mkdirSync(pasta, { recursive: true })
  const arq = path.join(pasta, 'teste-zoeira.mp4')
  fs.writeFileSync(arq, Buffer.from('000000186674797069736f6d', 'hex'))
  try {
    assert.equal(midiaLocal('teste-zoeira').mimetype, 'video/mp4')
    const s = sistema()
    await sendAkameMedia(s, 'teste-zoeira', 'legenda', ['1@s.whatsapp.net'], 'texto')
    assert.equal(s.respostas.length, 0)
    assert.equal(s.enviados[0].type, 'video')
    assert.equal(s.enviados[0].gifPlayback, true)
    assert.equal(s.enviados[0].media, arq)
    assert.ok(fs.existsSync(arq)) // não apaga o arquivo do bot depois de enviar
  } finally {
    fs.rmSync(arq, { force: true })
  }
})

test('sem arquivo e sem link: só o texto', async () => {
  assert.equal(midiaLocal('nao-existe-isso'), null)
  assert.equal(midiaLocal('../core/handler'), null)
  const s = sistema()
  await sendAkameMedia(s, 'nao-existe-isso', 'legenda', [], 'texto')
  assert.deepEqual(s.respostas, ['texto'])
})
