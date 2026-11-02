// node test/tiktok.test.js
// #tiktok: baixa o vídeo pela fonte grátis (tikwm), sem depender da API Tokito.
// Se o tikwm falhar, cai pra Tokito. Aqui a API é falsa: nada sai da máquina.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-tiktok-')))
const arquivoPlugin = path.join(raiz, 'sistema/comandos/download/tiktok.js')

let plugin
let versao = 0
test.beforeEach(async () => { plugin = (await import(`${arquivoPlugin}?t=${++versao}`)).default })

const VIDEO = Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32, 0x00, 0x00, 0x00, 0x00])

const fetchOriginal = globalThis.fetch
let chamadas = []
let respostaVideoInfo = []
test.beforeEach(() => {
  chamadas = []
  respostaVideoInfo = []
  globalThis.fetch = async (url) => {
    const u = String(url)
    chamadas.push(u)
    if (u.includes('tikwm.test/api/?') || u.includes('tikwm.test/api/%3F')) {
      const r = respostaVideoInfo.shift() || { status: 200, body: JSON.stringify({ code: 0, data: { play: 'https://tikwm.test/video/x.mp4', title: 't' } }) }
      return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json' } })
    }
    if (u.includes('tikwm.test/video/') || u.includes('tokito.test')) {
      return new Response(VIDEO, { status: 200, headers: { 'content-type': 'video/mp4', 'content-length': String(VIDEO.length) } })
    }
    return new Response('', { status: 404 })
  }
})
test.after(() => { globalThis.fetch = fetchOriginal })

function sistema(args) {
  const replies = []
  const enviados = []
  return {
    args,
    q: args.join(' '),
    prefix: '#',
    config: { tokitoApi: { url: 'https://tokito.test', token: 'K' }, tikwm: { url: 'https://tikwm.test' } },
    reply: async (t) => { replies.push(t) },
    send: async (c) => { enviados.push(c) },
    replies,
    enviados
  }
}
const enviouVideo = (s) => s.enviados.find((e) => e && typeof e === 'object' && e.type === 'video')

test('baixa pela fonte grátis (tikwm), sem tocar na Tokito', async () => {
  const s = sistema(['https://www.tiktok.com/@x/video/123'])
  await plugin.run(s)
  assert.ok(chamadas.some((u) => u.includes('tikwm.test/api/?')), chamadas.join('\n'))
  assert.ok(!chamadas.some((u) => u.includes('/api/tiktok-video')), 'não devia chamar a Tokito')
  const video = enviouVideo(s)
  assert.ok(video)
  assert.match(video.caption, /TikTok/)
})

test('se o tikwm falhar, cai pra Tokito', async () => {
  respostaVideoInfo = [{ status: 200, body: JSON.stringify({ code: -1, msg: 'sem vídeo' }) }]
  const s = sistema(['https://www.tiktok.com/@x/video/123'])
  await plugin.run(s)
  assert.ok(chamadas.some((u) => u.includes('tokito.test') && u.includes('/api/tiktok-video')), chamadas.join('\n'))
  assert.ok(enviouVideo(s))
})

test('sem link: ensina a usar', async () => {
  const s = sistema([])
  await plugin.run(s)
  assert.equal(chamadas.length, 0)
  assert.match(s.replies[0], /tiktok link/)
})
