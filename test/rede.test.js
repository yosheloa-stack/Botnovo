// node test/rede.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { pedirAoSite, conexaoCaiu, respostaEstranha, criarLogRaro } from '../sistema/funcoes/rede.js'

const caiu = () => Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error('read ECONNRESET'), { code: 'ECONNRESET' }) })

test('conexão derrubada na hora: tenta de novo uma vez, em conexão nova', async () => {
  const pedidos = []
  const fetchImpl = async (url, opcoes) => {
    pedidos.push(opcoes)
    if (pedidos.length === 1) throw caiu()
    return { ok: true, status: 200 }
  }
  const r = await pedirAoSite('https://site/x', { fetchImpl, headers: { 'X-Api-Key': 'k' } })
  assert.equal(r.status, 200)
  assert.equal(pedidos.length, 2)
  for (const p of pedidos) {
    assert.equal(p.headers.Connection, 'close')
    assert.equal(p.headers['X-Api-Key'], 'k')
  }
})

test('cai duas vezes seguidas: desiste e mostra o erro', async () => {
  let n = 0
  await assert.rejects(pedirAoSite('https://site/x', { fetchImpl: async () => { n++; throw caiu() } }), /fetch failed/)
  assert.equal(n, 2)
})

test('demora (timeout) não é repetida: o envio pode já estar acontecendo', async () => {
  let n = 0
  const fetchImpl = async () => { n++; throw Object.assign(new Error('timeout'), { name: 'TimeoutError' }) }
  await assert.rejects(pedirAoSite('https://site/x', { fetchImpl }))
  assert.equal(n, 1)
})

test('conexaoCaiu reconhece as quedas comuns e ignora o resto', () => {
  assert.ok(conexaoCaiu(caiu()))
  assert.ok(conexaoCaiu(new Error('other side closed')))
  assert.ok(!conexaoCaiu(Object.assign(new Error('x'), { name: 'TimeoutError' })))
  assert.ok(!conexaoCaiu(new Error('HTTP 500')))
})

test('página HTML do Square Cloud vira frase curta com o título', () => {
  const t = respostaEstranha('<!doctype html><html><head><title>Square Cloud</title></head><body>...</body></html>', 503)
  assert.match(t, /HTTP 503/)
  assert.match(t, /Square Cloud/)
  assert.doesNotMatch(t, /<html|<body/)
})

test('log raro: a mesma falha sai uma vez por minuto, com a contagem, e avisa quando volta', () => {
  let agora = 0
  const linhas = []
  const log = criarLogRaro({ escrever: (...p) => linhas.push(p.join(' ')), agora: () => agora })
  log.falha('sync', 'falhou')
  agora = 15_000; log.falha('sync', 'falhou')
  agora = 30_000; log.falha('sync', 'falhou')
  assert.equal(linhas.length, 1)
  agora = 61_000; log.falha('sync', 'falhou')
  assert.equal(linhas.length, 2)
  assert.match(linhas[1], /3x/)
  const antes = console.log
  const voltas = []
  console.log = (t) => voltas.push(t)
  try { log.voltou('sync', 'voltou'); log.voltou('sync', 'voltou') } finally { console.log = antes }
  assert.deepEqual(voltas, ['voltou'])
})
