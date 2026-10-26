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
