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
// O WhatsApp de mentira: 525500000000 não tem conta (a consulta diz que não e
// o envio volta com erro).
const bot = () => {
  const enviados = []
  return {
    enviados,
    client: {
      getCredentials: () => ({ meJid: '5567981517686:3@s.whatsapp.net' }),
      profile: { getLidsByPhoneNumbers: async ([n]) => [n.startsWith('5255') ? { exists: false } : { exists: true, phoneJid: `${n}@s.whatsapp.net` }] },
      message: { send: async (jid, m) => { if (jid.startsWith('5255')) return { ack: { error: 404 } }; enviados.push([jid, m.text]) } }
    }
  }
}

test('manda cada aviso pro número do cliente, de qualquer país, e devolve o que saiu', async () => {
  const s = site(), b = bot()
  const ow = console.warn; console.warn = () => {}
  try { await createAvisoCompra({ client: b.client, config: {}, api: s.api, pausaClienteMs: 0 })() } finally { console.warn = ow }
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

test('WhatsApp recusou (ack com erro): tenta pelo LID e, se recusar de novo, avisa o site sem contar como entregue', async () => {
  const s = site([{ id: 'r1', numero: '5582991062601', texto: 'oi' }, { id: 'r2', numero: '5511988887777', texto: 'oi' }])
  const enviados = []
  const client = {
    getCredentials: () => ({ meJid: '5567981517686:3@s.whatsapp.net' }),
    profile: { getLidsByPhoneNumbers: async ([n]) => [{ exists: true, phoneJid: `${n}@s.whatsapp.net`, lidJid: `${n.slice(-6)}@lid` }] },
    message: { send: async (jid) => { enviados.push(jid); return { ack: jid.startsWith('55829') || jid === '062601@lid' ? { error: 463 } : {} } } }
  }
  const ow = console.warn, ol = console.log; console.warn = () => {}; console.log = () => {}
  try { await createAvisoCompra({ client, config: {}, api: s.api, pausaClienteMs: 0 })() } finally { console.warn = ow; console.log = ol }
  // DDD 82: o WhatsApp guarda sem o nono dígito, então a consulta começa por ele
  assert.deepEqual(enviados, ['558291062601@s.whatsapp.net', '062601@lid', '5511988887777@s.whatsapp.net'])
  assert.deepEqual(s.chamadas.at(-1), ['/api/bot/avisos-cliente/entregues', { ids: ['r2'], sem_whatsapp: [], recusados: [{ id: 'r1', erro: 463 }] }])
})

test('recusa pelo LID resolve: conta como entregue', async () => {
  const s = site([{ id: 'l1', numero: '5521977776666', texto: 'oi' }])
  const client = {
    getCredentials: () => ({ meJid: '5567981517686:3@s.whatsapp.net' }),
    profile: { getLidsByPhoneNumbers: async ([n]) => [{ exists: true, phoneJid: `${n}@s.whatsapp.net`, lidJid: '999@lid' }] },
    message: { send: async (jid) => ({ ack: jid.endsWith('@lid') ? {} : { error: 463 } }) }
  }
  const ol = console.log; console.log = () => {}
  try { await createAvisoCompra({ client, config: {}, api: s.api, pausaClienteMs: 0 })() } finally { console.log = ol }
  assert.deepEqual(s.chamadas.at(-1), ['/api/bot/avisos-cliente/entregues', { ids: ['l1'], sem_whatsapp: [] }])
})

test('a consulta diz que não tem conta (limite do WhatsApp), mas o número é de verdade: manda assim mesmo', async () => {
  // a cliente do Craft Land de 01/11: +55 95 98421-4539 com número certo e o aviso largado como "sem WhatsApp"
  const s = site([{ id: 'k1', numero: '5595984214539', texto: '*Craft Land entregue*' }])
  const enviados = []
  const client = {
    getCredentials: () => ({ meJid: '5567981517686:3@s.whatsapp.net' }),
    profile: { getLidsByPhoneNumbers: async ([n]) => [{ queriedJid: `${n}@s.whatsapp.net`, phoneJid: `${n}@s.whatsapp.net`, lidJid: null, exists: false }] },
    message: { send: async (jid) => { enviados.push(jid); return { ack: {} } } }
  }
  const ow = console.warn, ol = console.log; console.warn = () => {}; console.log = () => {}
  try { await createAvisoCompra({ client, config: {}, api: s.api, pausaClienteMs: 0 })() } finally { console.warn = ow; console.log = ol }
  // DDD 95: sem o nono dígito, que é como o WhatsApp guarda
  assert.deepEqual(enviados, ['559584214539@s.whatsapp.net'])
  assert.deepEqual(s.chamadas.at(-1), ['/api/bot/avisos-cliente/entregues', { ids: ['k1'], sem_whatsapp: [] }])
})

test('sem conta confirmada e o jeito provável recusado: tenta o outro (com o nono dígito)', async () => {
  const s = site([{ id: 'k2', numero: '5595984214539', texto: 'oi' }])
  const enviados = []
  const client = {
    getCredentials: () => ({ meJid: '5567981517686:3@s.whatsapp.net' }),
    profile: { getLidsByPhoneNumbers: async () => { throw new Error('rate-overlimit') } },
    message: { send: async (jid) => { enviados.push(jid); return { ack: jid === '559584214539@s.whatsapp.net' ? { error: 479 } : {} } } }
  }
  const ow = console.warn, ol = console.log; console.warn = () => {}; console.log = () => {}
  try { await createAvisoCompra({ client, config: {}, api: s.api, pausaClienteMs: 0 })() } finally { console.warn = ow; console.log = ol }
  assert.deepEqual(enviados, ['559584214539@s.whatsapp.net', '5595984214539@s.whatsapp.net'])
  assert.deepEqual(s.chamadas.at(-1), ['/api/bot/avisos-cliente/entregues', { ids: ['k2'], sem_whatsapp: [] }])
})
