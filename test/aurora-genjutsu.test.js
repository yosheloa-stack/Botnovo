// node test/aurora-genjutsu.test.js
// O vídeo Genjutsu da Aurora (Higgsfield): quando é pedido, quem pode, quais
// mídias ela usa e a conversa com a API (o fetch da Higgsfield é falso).
import test from 'node:test'
import assert from 'node:assert/strict'
import { pediuGenjutsu, promptDaTroca, escolherMidias, createRecentes, podePedir, conferirVideo, diaBrasilia, createGenjutsu, erroHttp, falaDoErro, credencial, FALAS, ENDPOINTS } from '../sistema/funcoes/aurora/genjutsu.js'

test('pediuGenjutsu: pedido de vídeo de verdade, não conversa', () => {
  assert.deepEqual(pediuGenjutsu('aurora coloca eu nesse vídeo'), { modo: 'personagem', forte: false })
  assert.deepEqual(pediuGenjutsu('Aurora bota meu personagem no video'), { modo: 'personagem', forte: false })
  assert.deepEqual(pediuGenjutsu('nesse vídeo coloca eu aurora'), { modo: 'personagem', forte: false })
  assert.deepEqual(pediuGenjutsu('aurora faz o genjutsu'), { modo: 'personagem', forte: true })
  assert.deepEqual(pediuGenjutsu('aurora troca o carro do vídeo por uma moto'), { modo: 'troca', forte: false })
  assert.equal(pediuGenjutsu('aurora como faz o genjutsu?'), null, 'pergunta fica com a conversa')
  assert.equal(pediuGenjutsu('aurora não coloca no vídeo'), null)
  assert.equal(pediuGenjutsu('faz tempo que não vejo vídeo'), null)
  assert.equal(pediuGenjutsu('aurora manda o video do autolike'), null)
  assert.equal(pediuGenjutsu('bom dia aurora'), null)
})

test('promptDaTroca: tira o nome dela', () => {
  assert.equal(promptDaTroca('Aurora, troca o carro por uma moto'), 'troca o carro por uma moto')
  assert.equal(promptDaTroca('oi aurora   troca  o gato'), 'troca o gato')
})

test('escolherMidias: primeiro vídeo e até 4 fotos, na ordem mensagem → citada → recentes', () => {
  const v1 = { tipo: 'video', seconds: 8 }, v2 = { tipo: 'video', seconds: 9 }
  const f1 = { tipo: 'image' }, f2 = { tipo: 'image' }
  assert.deepEqual(escolherMidias([f1, v1, [v2, f2]]), { video: v1, imagens: [f1, f2] })
  assert.deepEqual(escolherMidias([null, null, []]), { video: null, imagens: [] })
  const muitas = Array.from({ length: 6 }, () => ({ tipo: 'image' }))
  assert.equal(escolherMidias([muitas]).imagens.length, 4)
  const igual = { tipo: 'image', fonte: { key: { id: 'X' } } }
  assert.equal(escolherMidias([igual, null, [{ ...igual }]]).imagens.length, 1, 'mesma mensagem conta uma vez')
})

test('createRecentes: guarda 20 min, a mais nova primeiro, no máximo 4', () => {
  let t = 0
  const r = createRecentes({ agora: () => t })
  r.guardar('c', { tipo: 'video' })
  t = 1000; r.guardar('c', { tipo: 'image' })
  assert.deepEqual(r.pegar('c').map((x) => x.tipo), ['image', 'video'])
  t = 21 * 60_000
  assert.deepEqual(r.pegar('c'), [])
  for (let i = 0; i < 6; i++) r.guardar('c', { tipo: 'image' })
  assert.equal(r.pegar('c').length, 4)
  r.esquecer('c')
  assert.deepEqual(r.pegar('c'), [])
})

test('podePedir: todo mundo com limite do dia, 1 por pessoa, criador livre', () => {
  const uso = { total: 0, pessoas: {} }
  assert.deepEqual(podePedir({ quem: 'todos', uso, pessoa: '55', maxDia: 3 }), { sim: true })
  assert.equal(podePedir({ quem: 'todos', uso: { total: 3, pessoas: {} }, pessoa: '55', maxDia: 3 }).motivo, 'limite_dia')
  assert.equal(podePedir({ quem: 'todos', uso: { total: 1, pessoas: { 55: 1 } }, pessoa: '55', maxDia: 3 }).motivo, 'limite_pessoa')
  assert.deepEqual(podePedir({ quem: 'todos', ehCriador: true, uso: { total: 99, pessoas: {} }, maxDia: 3 }), { sim: true })
  assert.equal(podePedir({ quem: 'criador', uso, maxDia: 3 }).motivo, 'so_criador')
  assert.equal(podePedir({ quem: 'donos', uso, maxDia: 3 }).motivo, 'so_donos')
  assert.deepEqual(podePedir({ quem: 'donos', ehDono: true, uso, maxDia: 3 }), { sim: true })
  assert.equal(podePedir({ quem: 'todos', uso, maxDia: 0 }).motivo, 'limite_dia')
})

test('conferirVideo e diaBrasilia', () => {
  assert.equal(conferirVideo(3, 15), 'curto')
  assert.equal(conferirVideo(16, 15), 'longo')
  assert.equal(conferirVideo(10, 15), '')
  assert.equal(conferirVideo(0, 15), '', 'sem duração: a API confere')
  // 01:00 UTC ainda é o dia anterior em Brasília.
  assert.equal(diaBrasilia(Date.UTC(2026, 10, 2, 1, 0)), '2026-11-01')
  assert.equal(diaBrasilia(Date.UTC(2026, 10, 2, 4, 0)), '2026-11-02')
})

test('credencial: só do ambiente, id:segredo', () => {
  const antes = { ...process.env }
  delete process.env.HIGGSFIELD_KEY_ID; delete process.env.HIGGSFIELD_KEY_SECRET; delete process.env.HF_API_KEY_ID; delete process.env.HF_API_KEY_SECRET; delete process.env.HIGGSFIELD_API_KEY; delete process.env.HF_KEY
  assert.equal(credencial(), '')
  process.env.HIGGSFIELD_KEY_ID = 'abc'; process.env.HIGGSFIELD_KEY_SECRET = 'xyz'
  assert.equal(credencial(), 'abc:xyz')
  delete process.env.HIGGSFIELD_KEY_ID; delete process.env.HIGGSFIELD_KEY_SECRET
  process.env.HIGGSFIELD_API_KEY = 'id1:seg1'
  assert.equal(credencial(), 'id1:seg1')
  process.env.HIGGSFIELD_API_KEY = 'semdoispontos'
  assert.equal(credencial(), '')
  for (const k of Object.keys(process.env)) if (!(k in antes)) delete process.env[k]
  Object.assign(process.env, antes)
})

function higgsfieldFalsa(statusSeq, { envio = 200 } = {}) {
  const pedidos = []
  let i = 0
  const fetchFn = async (url, opts = {}) => {
    pedidos.push({ url, opts })
    const resp = (status, body) => ({ ok: status < 300, status, json: async () => body })
    if (url.endsWith('/files/generate-upload-url')) {
      const n = pedidos.filter((p) => p.url.endsWith('/files/generate-upload-url')).length
      return resp(200, { upload_url: `https://s3.falso/up${n}`, public_url: `https://cdn.falso/arq${n}`, upload_headers: { 'x-amz-acl': 'private' } })
    }
    if (url.startsWith('https://s3.falso/')) return resp(200, {})
    if (url.includes('/higgsfield/genjutsu/')) return envio === 200 ? resp(200, { status: 'queued', request_id: 'r1', status_url: 'https://api.higgsfield.ai/requests/r1/status' }) : resp(envio, { detail: 'Not enough balance' })
    if (url.endsWith('/requests/r1/status')) return resp(200, statusSeq[Math.min(i++, statusSeq.length - 1)])
    throw new Error('url inesperada ' + url)
  }
  return { fetchFn, pedidos }
}
const entrada = { video: { buffer: Buffer.from('mp4'), mimetype: 'video/mp4' }, imagens: [{ buffer: Buffer.from('jpg'), mimetype: 'image/jpeg' }] }

test('gerar: sobe vídeo e foto, pede o motion transfer e espera ficar pronto', async () => {
  const { fetchFn, pedidos } = higgsfieldFalsa([{ status: 'queued' }, { status: 'in_progress' }, { status: 'completed', video: { url: 'https://cdn.falso/saida.mp4' } }])
  const g = createGenjutsu({ fetchFn, esperar: async () => {}, chave: () => 'id:seg' })
  let enviado = null
  const url = await g.gerar({ ...entrada, res: '720p', aoEnviar: (p) => { enviado = p.request_id } })
  assert.equal(url, 'https://cdn.falso/saida.mp4')
  assert.equal(enviado, 'r1')
  const pedido = pedidos.find((p) => p.url.includes('/higgsfield/genjutsu/'))
  assert.equal(pedido.url, 'https://api.higgsfield.ai/' + ENDPOINTS.personagem)
  assert.equal(pedido.opts.headers.Authorization, 'Key id:seg')
  assert.ok(pedido.opts.headers['Idempotency-Key'])
  assert.deepEqual(JSON.parse(pedido.opts.body), { video_url: 'https://cdn.falso/arq1', image_urls: ['https://cdn.falso/arq2'], prompt: '', resolution: '720p' })
  // A chave nunca vai pro endereço de upload.
  for (const p of pedidos.filter((x) => x.url.startsWith('https://s3.falso/'))) {
    assert.equal(p.opts.headers.Authorization, undefined)
    assert.equal(p.opts.headers['x-amz-acl'], 'private')
  }
  const up = pedidos.find((p) => p.url.endsWith('/files/generate-upload-url'))
  assert.deepEqual(JSON.parse(up.opts.body), { content_type: 'video/mp4' })
})

test('gerar: troca usa object-swap com o pedido como prompt', async () => {
  const { fetchFn, pedidos } = higgsfieldFalsa([{ status: 'completed', video: { url: 'https://cdn.falso/s.mp4' } }])
  const g = createGenjutsu({ fetchFn, esperar: async () => {}, chave: () => 'id:seg' })
  await g.gerar({ ...entrada, modo: 'troca', prompt: 'troca o carro por uma moto', res: '480p' })
  const pedido = pedidos.find((p) => p.url.includes('/higgsfield/genjutsu/'))
  assert.equal(pedido.url, 'https://api.higgsfield.ai/' + ENDPOINTS.troca)
  assert.equal(JSON.parse(pedido.opts.body).prompt, 'troca o carro por uma moto')
})

test('gerar: nsfw, falha, sem saldo e demora viram erros com código', async () => {
  const semEspera = { esperar: async () => {}, chave: () => 'id:seg' }
  await assert.rejects(createGenjutsu({ ...semEspera, fetchFn: higgsfieldFalsa([{ status: 'nsfw' }]).fetchFn }).gerar(entrada), { codigo: 'nsfw' })
  await assert.rejects(createGenjutsu({ ...semEspera, fetchFn: higgsfieldFalsa([{ status: 'failed', error: 'Generation failed' }]).fetchFn }).gerar(entrada), { codigo: 'falhou' })
  await assert.rejects(createGenjutsu({ ...semEspera, fetchFn: higgsfieldFalsa([], { envio: 403 }).fetchFn }).gerar(entrada), { codigo: 'saldo' })
  await assert.rejects(createGenjutsu({ ...semEspera, fetchFn: higgsfieldFalsa([], { envio: 401 }).fetchFn }).gerar(entrada), { codigo: 'chave' })
  let t = 0
  await assert.rejects(createGenjutsu({ ...semEspera, agora: () => (t += 60_000), limiteMs: 5 * 60_000, fetchFn: higgsfieldFalsa([{ status: 'queued' }]).fetchFn }).gerar(entrada), { codigo: 'demorou' })
  await assert.rejects(createGenjutsu({ ...semEspera, chave: () => '' }).gerar(entrada), { codigo: 'chave' })
})

test('erroHttp e falaDoErro: o criador vê o motivo, os outros o genérico', () => {
  assert.equal(erroHttp(403, { detail: 'x' }).codigo, 'saldo')
  assert.equal(erroHttp(429, {}).codigo, 'ocupado')
  assert.equal(erroHttp(422, { detail: [{ msg: 'bad' }] }).codigo, 'invalido')
  assert.equal(erroHttp(500, {}).codigo, 'api')
  assert.equal(falaDoErro(erroHttp(403, {}), true), FALAS.saldo())
  assert.equal(falaDoErro(erroHttp(403, {}), false), FALAS.falhou())
  assert.equal(falaDoErro(erroHttp(401, {}), false), FALAS.falhou())
  assert.equal(falaDoErro({ codigo: 'nsfw' }, false), FALAS.nsfw())
})
