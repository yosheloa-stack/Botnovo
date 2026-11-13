import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import figpack from '../sistema/comandos/download/figpack.js'
import { capaJpeg } from '../sistema/funcoes/figpack.js'

// Imagem de verdade (ffmpeg), com cor diferente para cada uma.
const imagem = (n) => {
  const out = `/tmp/figpack-teste-${n}.jpg`
  const r = spawnSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', `color=c=0x${((n * 17 + 16) % 256).toString(16).padStart(2, '0')}30a0:s=300x300`, '-frames:v', '1', out])
  assert.equal(r.status, 0, 'precisa do ffmpeg para o teste')
  return fs.readFileSync(out)
}

// Simula as 3 fontes. api: a API do bot responde (imagem sempre igual); bing: lista de imagens; pin403: Pinterest bloqueia.
function fakeFetch({ api = true, bing = 0 } = {}) {
  return async (url) => {
    const u = String(url)
    if (u.includes('tokito-apis') || u.includes('/api/pin-image')) {
      return api ? new Response(imagem(1), { status: 200 }) : new Response('', { status: 500 })
    }
    if (u.includes('bing.com/images/async')) {
      if (!bing) return new Response('', { status: 403 })
      const html = Array.from({ length: bing }, (_, i) => `murl&quot;:&quot;https://img.exemplo.com/${i}.jpg&quot;`).join(' ')
      return new Response(html, { status: 200 })
    }
    if (u.includes('img.exemplo.com')) return new Response(imagem(Number(u.match(/(\d+)\.jpg/)[1]) + 2), { status: 200 })
    if (u.includes('pinterest.com')) return new Response('', { status: 403 })
    return new Response('', { status: 200 })
  }
}

const fake = (q, enviados, respostas) => ({
  from: 'g@g.us', prefix: '#', q, config: { tokitoApi: { url: 'https://tokito-apis.com.br', token: 'x' } },
  reply: async (t) => { respostas.push(t) },
  send: async (c) => { enviados.push(c) }
})

test('figpack tema: busca, monta e envia o pack sozinho, sem nome nem publisher', async () => {
  const original = globalThis.fetch
  globalThis.fetch = fakeFetch({ api: true, bing: 40 })
  try {
    const enviados = []; const respostas = []
    await figpack.run(fake('gatos', enviados, respostas))
    assert.equal(enviados.length, 1)
    const pack = enviados[0]
    assert.equal(pack.type, 'sticker-pack')
    assert.equal(pack.name, '')
    assert.equal(pack.publisher, '')
    assert.equal(pack.stickers.length, 30)
    assert.equal(pack.coverThumbnail[0], 0xff) // capa JPEG
    assert.doesNotMatch(JSON.stringify(respostas), /tokito|dylan|channel/i)
  } finally { globalThis.fetch = original }
})

test('figpack: sem tema explica o uso; poucas imagens avisa', async () => {
  const original = globalThis.fetch
  globalThis.fetch = fakeFetch({ api: false, bing: 1 })
  try {
    const enviados = []; const respostas = []
    await figpack.run(fake('', enviados, respostas))
    assert.match(respostas[0], /figpack tema/)
    await figpack.run(fake('x', enviados, respostas))
    assert.equal(enviados.length, 0)
    assert.match(respostas.at(-1), /suficientes/)
  } finally { globalThis.fetch = original }
})

test('figpack: se Bing e Pinterest falham, só com a API do bot avisa que não deu', async () => {
  const original = globalThis.fetch
  globalThis.fetch = fakeFetch({ api: true, bing: 0 })
  try {
    const enviados = []; const respostas = []
    await figpack.run(fake('gatos', enviados, respostas))
    assert.equal(enviados.length, 0)
    assert.match(respostas.at(-1), /suficientes/)
  } finally { globalThis.fetch = original }
})

test('figpack: capa do pack é JPEG', async () => {
  const jpg = await capaJpeg(new Uint8Array(imagem(3)))
  assert.equal(jpg[0], 0xff); assert.equal(jpg[1], 0xd8)
})
