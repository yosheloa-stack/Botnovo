// node test/dono-e-play.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { variantesNumero, mesmoNumero } from '../sistema/funcoes/jid.js'
import { _teste } from '../sistema/funcoes/youtube.js'

test('dono com ou sem o 9 depois do DDD é a mesma pessoa', () => {
  // Cadastrou 98 98466-1655 no site; o WhatsApp dela é 55 98 8466-1655.
  assert.ok(mesmoNumero('5598984661655', '559884661655'))
  assert.ok(mesmoNumero('559884661655', '5598984661655'))
  assert.ok(mesmoNumero('5521981736747', '5521981736747'))
  assert.ok(!mesmoNumero('5598984661655', '559884661656'))
  assert.ok(!mesmoNumero('', '559884661655'))
  assert.deepEqual(variantesNumero('+55 (21) 98173-6747'), ['5521981736747', '552181736747'])
  // Fixo (não começa com 9) e números de fora ficam como estão.
  assert.deepEqual(variantesNumero('552133334444'), ['552133334444', '5521933334444'])
  assert.deepEqual(variantesNumero('12125551234'), ['12125551234'])
  assert.deepEqual(variantesNumero('5491123456789'), ['5491123456789'])
})

test('pesquisa direta no YouTube lê os vídeos da página', () => {
  const data = { contents: { twoColumnSearchResultsRenderer: { primaryContents: { sectionListRenderer: { contents: [
    { itemSectionRenderer: { contents: [
      { adSlotRenderer: {} },
      { videoRenderer: { videoId: 'abc123', title: { runs: [{ text: 'Matuê - ' }, { text: '333' }] }, ownerText: { runs: [{ text: 'Matuê' }] }, lengthText: { simpleText: '3:33' }, viewCountText: { simpleText: '10 mi de visualizações' } } },
      { videoRenderer: { videoId: 'def456', title: { simpleText: 'Outro' } } }
    ] } }
  ] } } } } }
  const html = '<html><script>var ytInitialData = ' + JSON.stringify(data) + ';</script><script>x()</script></html>'
  const v = _teste.videosDaPagina(html)
  assert.equal(v.length, 2)
  assert.deepEqual(v[0], { videoId: 'abc123', title: 'Matuê - 333', author: 'Matuê', duration: '3:33', views: '10 mi de visualizações', url: 'https://www.youtube.com/watch?v=abc123' })
  assert.equal(v[1].author, '-')
  assert.deepEqual(_teste.videosDaPagina('<html>nada</html>'), [])
})

test('play tenta vários provedores de download, sem repetir link', () => {
  const cfg = { akameApi: { url: 'https://a.test', token: 'k' }, tokitoApi: { url: 'https://t.test', token: 'k' } }
  const audio = _teste.downloadCandidates('audio', 'https://www.youtube.com/watch?v=abc', cfg)
  assert.ok(audio.length >= 4)
  assert.equal(new Set(audio).size, audio.length)
  assert.ok(audio[0].startsWith('https://a.test/api/download/youtube-audio?url='))
  assert.ok(audio.some((u) => u.startsWith('https://t.test/')))
  const video = _teste.downloadCandidates('video', 'https://www.youtube.com/watch?v=abc', cfg)
  assert.ok(video.every((u) => !/ytmp3|mp3/.test(u)))
})

test('áudio que não é mp3 é convertido antes de enviar', async () => {
  const http = await import('node:http')
  const { spawnSync } = await import('node:child_process')
  const { youtube } = await import('../sistema/funcoes/youtube.js')
  const fs = await import('node:fs')
  const tmp = '/tmp/aurora-teste.m4a'
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'sine=frequency=440:duration=2', '-c:a', 'aac', tmp])
  if (r.status !== 0) return // sem ffmpeg neste ambiente
  const srv = http.createServer((q, res) => { res.setHeader('content-type', 'audio/mp4'); res.end(fs.readFileSync(tmp)) }).listen(0)
  const port = srv.address().port
  const cfg = { akameApi: { url: `http://127.0.0.1:${port}`, token: 'k' }, tokitoApi: { url: `http://127.0.0.1:${port}`, token: 'k' } }
  try {
    const m = await youtube.audioMp3({ url: 'https://www.youtube.com/watch?v=abc' }, cfg)
    assert.equal(m.mimetype, 'audio/mpeg')
    assert.equal(m.ext, 'mp3')
    assert.ok(fs.readFileSync(m.path).subarray(0, 3).toString() === 'ID3' || fs.readFileSync(m.path)[0] === 0xff)
  } finally { srv.close() }
})

test('chave da Akame vem da variável de ambiente AKAME_API_KEY', async () => {
  const { loadConfig } = await import('../sistema/funcoes/config.js')
  process.env.AKAME_API_KEY = 'ak_teste_123'
  try {
    const cfg = await loadConfig()
    assert.equal(cfg.akameApi.token, 'ak_teste_123')
  } finally { delete process.env.AKAME_API_KEY }
})
