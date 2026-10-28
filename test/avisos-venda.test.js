// node test/avisos-venda.test.js
// Avisos de venda pelo launcher: o número fixo pode estar conectado como bot de
// cliente (sem o token do site). O launcher busca a fila e pede ao bot certo,
// pelo canal interno, que mande o aviso.
import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { criarAvisosVenda, enviarPorIpc } from '../sistema/clientes/avisosVenda.js'

const resposta = (obj) => ({ ok: true, status: 200, text: async () => JSON.stringify(obj) })
const site = () => {
  const chamadas = []
  const fetchImpl = async (url, opcoes = {}) => {
    const caminho = url.replace('https://site.test', '')
    chamadas.push([caminho, opcoes.body ? JSON.parse(opcoes.body) : undefined, opcoes.headers?.['X-Aurora-Token']])
    if (caminho.startsWith('/api/bot/avisos-compra/pendentes')) {
      return resposta({ ok: true, numero: '5544991853469', remetente: '5567981517686', avisos: [{ id: 'p1', texto: '*Aviso de teste*' }] })
    }
    return resposta({ ok: true })
  }
  return { chamadas, fetchImpl }
}
// Um processo de bot de mentira que responde ao pedido de aviso.
const filhoFalso = ({ ok = true } = {}) => {
  const f = new EventEmitter()
  f.recebidos = []
  f.send = (msg) => {
    f.recebidos.push(msg)
    setImmediate(() => f.emit('message', { tipo: 'aviso_venda_ok', id: msg.id, ok, ...(ok ? {} : { erro: 'falhou' }) }))
  }
  return f
}
const silencio = { log() {}, warn() {}, error() {} }

test('bot de cliente no número fixo manda o aviso e o site recebe a entrega', async () => {
  const s = site()
  const outro = filhoFalso(), fixo = filhoFalso()
  const avisos = criarAvisosVenda({
    site: { url: 'https://site.test', token: 'tk' }, fetchImpl: s.fetchImpl, log: silencio,
    canais: () => [{ numero: '5511999998888', filho: outro }, { numero: '556781517686', filho: fixo }]
  })
  await avisos.volta()
  assert.equal(s.chamadas[0][0], '/api/bot/avisos-compra/pendentes?bot=556781517686')
  assert.equal(s.chamadas[0][2], 'tk')
  assert.equal(outro.recebidos.length, 0, 'outro bot mandou o aviso de venda')
  assert.equal(fixo.recebidos.length, 1)
  assert.equal(fixo.recebidos[0].para, '5544991853469')
  assert.equal(fixo.recebidos[0].texto, '*Aviso de teste*')
  assert.deepEqual(s.chamadas[1].slice(0, 2), ['/api/bot/avisos-compra/entregues', { ids: ['p1'] }])
})

test('sem bot no número fixo, nem busca a fila (os avisos esperam no site)', async () => {
  const s = site()
  const avisos = criarAvisosVenda({
    site: { url: 'https://site.test', token: 'tk' }, fetchImpl: s.fetchImpl, log: silencio,
    canais: () => [null, { numero: '5511999998888', filho: filhoFalso() }]
  })
  await avisos.volta()
  assert.equal(s.chamadas.length, 0)
})

test('se o bot não conseguir mandar, o aviso fica na fila do site', async () => {
  const s = site()
  const avisos = criarAvisosVenda({
    site: { url: 'https://site.test', token: 'tk' }, fetchImpl: s.fetchImpl, log: silencio,
    canais: () => [{ numero: '5567981517686', filho: filhoFalso({ ok: false }) }]
  })
  await avisos.volta()
  assert.equal(s.chamadas.filter(([c]) => c.includes('/entregues')).length, 0, 'marcou entregue um aviso que não saiu')
})

test('pedido pelo canal interno falha se o bot desligar antes de responder', async () => {
  const f = new EventEmitter()
  f.send = () => setImmediate(() => f.emit('exit', 1))
  await assert.rejects(enviarPorIpc(f, '5544991853469', 'oi'), /desligou/)
})
