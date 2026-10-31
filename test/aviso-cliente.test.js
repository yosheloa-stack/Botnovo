// node test/aviso-cliente.test.js
// Avisos de entrega pro CLIENTE (up de guilda, Craft Land, likes, plano
// acabando): o site manda cada aviso já com o número do cliente (Brasil ou de
// fora, com o código do país) e o texto no idioma dele. O bot só repassa.
import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { createAvisoCompra } from '../sistema/funcoes/avisoCompra.js'
import { criarAvisosVenda } from '../sistema/clientes/avisosVenda.js'

const FILA = [
  { id: 'c1', numero: '5511988887777', texto: '*Craft Land entregue*' },
  { id: 'c2', numero: '19175551234', texto: '*Likes delivered*' },
  { id: 'c3', numero: '525500000000', texto: '*Tu plan está por terminar*' }
]
const site = (avisos = FILA) => {
  const chamadas = []
  const api = async (config, caminho, options = {}) => {
    chamadas.push([caminho, options.body])
    if (caminho.startsWith('/api/bot/avisos-compra/pendentes')) return { ok: true, numero: '5544991853469', remetente: '5567981517686', avisos: [] }
    if (caminho.startsWith('/api/bot/avisos-cliente/pendentes')) return { ok: true, avisos }
    return { ok: true }
  }
  return { api, chamadas }
}
// O WhatsApp de mentira: 525500000000 não tem conta.
const bot = () => {
  const enviados = []
  return {
    enviados,
    client: {
      getCredentials: () => ({ meJid: '5567981517686:3@s.whatsapp.net' }),
      profile: { getLidsByPhoneNumbers: async ([n]) => [n.startsWith('5255') ? { exists: false } : { exists: true, phoneJid: `${n}@s.whatsapp.net` }] },
      message: { send: async (jid, m) => { enviados.push([jid, m.text]) } }
    }
  }
}

test('manda cada aviso pro número do cliente, de qualquer país, e devolve o que saiu', async () => {
  const s = site(), b = bot()
  await createAvisoCompra({ client: b.client, config: {}, api: s.api, pausaClienteMs: 0 })()
  assert.ok(s.chamadas.some(([c]) => c === '/api/bot/avisos-cliente/pendentes?bot=5567981517686'))
  assert.deepEqual(b.enviados, [
    ['5511988887777@s.whatsapp.net', '*Craft Land entregue*'],
    ['19175551234@s.whatsapp.net', '*Likes delivered*']
  ])
  assert.deepEqual(s.chamadas.at(-1), ['/api/bot/avisos-cliente/entregues', { ids: ['c1', 'c2'], sem_whatsapp: ['c3'] }])
})

test('falha no envio para a volta e deixa o resto na fila do site', async () => {
  const s = site(), b = bot()
  b.client.message.send = async () => { throw new Error('rate-overlimit') }
  await createAvisoCompra({ client: b.client, config: {}, api: s.api, pausaClienteMs: 0 })()
  assert.equal(s.chamadas.filter(([c]) => c === '/api/bot/avisos-cliente/entregues').length, 0)
})

test('site ainda sem a fila de clientes (404): o aviso de compra continua e a fila espera', async () => {
  const chamadas = []
  const api = async (config, caminho) => {
    chamadas.push(caminho)
    if (caminho.startsWith('/api/bot/avisos-cliente')) throw new Error('HTTP 404')
    return { ok: true, numero: '5544991853469', remetente: '5567981517686', avisos: [{ id: 'p1', texto: 'compra' }] }
  }
  const b = bot()
  const volta = createAvisoCompra({ client: b.client, config: {}, api, pausaClienteMs: 0 })
  const avisoErro = console.warn; console.warn = () => {}
  try { await volta(); await volta() } finally { console.warn = avisoErro }
  assert.equal(b.enviados.filter(([, t]) => t === 'compra').length, 2)
  assert.equal(chamadas.filter((c) => c.startsWith('/api/bot/avisos-cliente')).length, 1, 'bateu de novo na porta que não existe')
})

test('pelo launcher: o bot do número fixo manda, e número sem WhatsApp volta como tal', async () => {
  const chamadas = []
  const resposta = (obj) => ({ ok: true, status: 200, text: async () => JSON.stringify(obj) })
  const fetchImpl = async (url, opcoes = {}) => {
    const caminho = url.replace('https://site.test', '')
    chamadas.push([caminho, opcoes.body ? JSON.parse(opcoes.body) : undefined])
    if (caminho.startsWith('/api/bot/avisos-compra/pendentes')) return resposta({ ok: true, numero: '5544991853469', remetente: '5567981517686', avisos: [] })
    if (caminho.startsWith('/api/bot/avisos-cliente/pendentes')) return resposta({ ok: true, avisos: FILA.slice(1) })
    return resposta({ ok: true })
  }
  const filho = new EventEmitter()
  filho.recebidos = []
  filho.send = (msg) => {
    filho.recebidos.push(msg)
    if (msg.tipo !== 'aviso_venda') return
    const sem = msg.para.startsWith('5255')
    setImmediate(() => filho.emit('message', { tipo: 'aviso_venda_ok', id: msg.id, ok: !sem, ...(sem ? { sem_whatsapp: true, erro: 'sem' } : {}) }))
  }
  const silencio = { log() {}, warn() {}, error() {} }
  const ow = console.warn, ol = console.log; console.warn = () => {}; console.log = () => {}
  try {
    const avisos = criarAvisosVenda({ site: { url: 'https://site.test', token: 'tk' }, fetchImpl, log: silencio,
      canais: () => [{ numero: '5567981517686', filho }] })
    await avisos.volta()
  } finally { console.warn = ow; console.log = ol }
  const enviados = filho.recebidos.filter((m) => m.tipo === 'aviso_venda')
  assert.deepEqual(enviados.map((m) => [m.para, m.cliente]), [['19175551234', true], ['525500000000', true]])
  assert.deepEqual(chamadas.at(-1), ['/api/bot/avisos-cliente/entregues', { ids: ['c2'], sem_whatsapp: ['c3'] }])
})
