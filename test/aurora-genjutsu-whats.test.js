// node test/aurora-genjutsu-whats.test.js
// O vídeo Genjutsu no handler de verdade: a pessoa manda o vídeo, depois a
// foto pedindo "aurora coloca eu nesse vídeo", e o vídeo pronto volta no zap.
// A Higgsfield, a Square Cloud e o WhatsApp são falsos.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-genjutsu-')))
process.env.AURORA_CLIENTE = ''
process.env.SQUARECLOUD_API_KEY = 'chave-de-teste'
process.env.HIGGSFIELD_KEY_ID = 'id-teste'
process.env.HIGGSFIELD_KEY_SECRET = 'segredo-teste'
delete process.env.AURORA_GENJUTSU_QUEM
delete process.env.AURORA_GENJUTSU_DIA

const MP4 = new Uint8Array([0, 0, 0, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, ...new Array(100).fill(0)])
const pedidosIa = []
const pedidosHf = []
let envioHf = 200
globalThis.fetch = async (url, opcoes = {}) => {
  const u = String(url)
  if (u.includes('/v2/ai/chat/completions')) {
    pedidosIa.push(JSON.parse(opcoes.body))
    return new Response(JSON.stringify({ choices: [{ finish_reason: 'stop', message: { content: 'oi 😌' } }] }), { status: 200 })
  }
  if (u === 'https://api.higgsfield.ai/files/generate-upload-url') {
    pedidosHf.push({ u, corpo: JSON.parse(opcoes.body), auth: opcoes.headers.Authorization })
    const n = pedidosHf.filter((p) => p.u === u).length
    return new Response(JSON.stringify({ upload_url: `https://s3.falso/up${n}`, public_url: `https://cdn.falso/arq${n}`, upload_headers: {} }), { status: 200 })
  }
  if (u.startsWith('https://s3.falso/')) { pedidosHf.push({ u, auth: opcoes.headers.Authorization }); return new Response('', { status: 200 }) }
  if (u.startsWith('https://api.higgsfield.ai/higgsfield/genjutsu/')) {
    pedidosHf.push({ u, corpo: JSON.parse(opcoes.body), auth: opcoes.headers.Authorization })
    if (envioHf !== 200) return new Response(JSON.stringify({ detail: 'Not enough balance' }), { status: envioHf })
    return new Response(JSON.stringify({ status: 'queued', request_id: 'r1', status_url: 'https://api.higgsfield.ai/requests/r1/status' }), { status: 200 })
  }
  if (u === 'https://api.higgsfield.ai/requests/r1/status') return new Response(JSON.stringify({ status: 'completed', request_id: 'r1', video: { url: 'https://cdn.falso/saida.mp4' } }), { status: 200 })
  if (u === 'https://cdn.falso/saida.mp4') return new Response(MP4, { status: 200, headers: { 'content-type': 'video/mp4' } })
  return new Response('{}', { status: 404 })
}

const { loadState } = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await loadState()
const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
const { createHandler } = await import(path.join(raiz, 'sistema/core/handler.js'))
const { LIMITES } = await import(path.join(raiz, 'sistema/funcoes/aurora/ia.js'))
const { PAUSAS, diaBrasilia } = await import(path.join(raiz, 'sistema/funcoes/aurora/genjutsu.js'))
LIMITES.intervaloMs = 20
PAUSAS.fill(10)

const BOT = '5567981517686'
const GRUPO = '120363000000000002@g.us'
const enviados = []
const baixados = []
const client = {
  getCredentials: () => ({ meJid: `${BOT}:3@s.whatsapp.net`, meLid: '99887766554433:3@lid' }),
  group: { queryGroupMetadata: async () => ({ subject: 'Teste', participants: [{ jid: `${BOT}@s.whatsapp.net`, isAdmin: true }, { jid: '5544911112222@s.whatsapp.net' }, { jid: '5544955556666@s.whatsapp.net' }] }) },
  message: {
    send: async (jid, conteudo, opcoes) => { enviados.push({ jid, conteudo, opcoes }) },
    downloadToFile: async (fonte, arquivo) => { baixados.push(fonte?.key?.id || '?'); fs.writeFileSync(arquivo, Buffer.from('midia')) }
  },
  presence: { sendChatstate: async () => {} },
  profile: { getLidsByPhoneNumbers: async ([n]) => [{ exists: false }] }
}
const config = { prefix: '#', owner: { number: '5544900000000' }, connection: { number: BOT }, autoSystem: { url: 'https://autolikesystem.com.br', token: 't' } }
const handler = createHandler({ client, config, registry: { commands: new Map(), plugins: [] } })
banco.auroraCriador('5544900001111')

let n = 0
const evento = (quem, message) => ({ key: { id: 'M' + (++n), remoteJid: GRUPO, participant: `${quem}@s.whatsapp.net`, fromMe: false }, pushName: 'Ana', message })
const video = (quem, seconds = 8) => evento(quem, { videoMessage: { mimetype: 'video/mp4', seconds } })
const foto = (quem, caption, contextInfo) => evento(quem, { imageMessage: { mimetype: 'image/jpeg', caption, ...(contextInfo ? { contextInfo } : {}) } })
async function rodar(ev, quantas = 1, esperaMs = 6000) {
  const antes = enviados.length
  await handler(ev)
  const fim = Date.now() + esperaMs
  while (enviados.length < antes + quantas && Date.now() < fim) await new Promise((r) => setTimeout(r, 20))
  await new Promise((r) => setTimeout(r, 50))
  return enviados.slice(antes)
}

test('manda o vídeo, depois a foto pedindo: o vídeo pronto volta no zap', async () => {
  assert.equal((await rodar(video('5544911112222'), 1, 200)).length, 0, 'vídeo sozinho não chama ninguém')
  const saiu = await rodar(foto('5544911112222', 'aurora coloca eu nesse vídeo'), 2)
  assert.equal(saiu.length, 2)
  assert.match(saiu[0].conteudo.text, /tô montando teu vídeo/)
  assert.equal(saiu[1].conteudo.type, 'video')
  assert.equal(saiu[1].conteudo.caption, 'prontinho ✨🎬')
  assert.ok(saiu[1].conteudo.media?.byteLength > 0)
  const envio = pedidosHf.find((p) => p.u.includes('/genjutsu/'))
  assert.equal(envio.u, 'https://api.higgsfield.ai/higgsfield/genjutsu/motion-transfer/v1.0')
  assert.equal(envio.auth, 'Key id-teste:segredo-teste')
  assert.deepEqual(envio.corpo, { video_url: 'https://cdn.falso/arq1', image_urls: ['https://cdn.falso/arq2'], prompt: '', resolution: '720p' })
  assert.ok(pedidosHf.filter((p) => p.u.startsWith('https://s3.falso/')).every((p) => !p.auth), 'a chave não vai pro upload')
  assert.deepEqual(pedidosIa, [], 'não gasta a IA de conversa')
  assert.deepEqual(banco.auroraGenjutsuUso(diaBrasilia()), { total: 1, pessoas: { 5544911112222: 1 } })
})

test('a mesma pessoa de novo no dia: já ganhou o dela', async () => {
  await rodar(video('5544911112222'), 1, 200)
  const saiu = await rodar(foto('5544911112222', 'aurora coloca eu nesse vídeo'))
  assert.match(saiu[0].conteudo.text, /já ganhou seu vídeo hoje/)
})

test('responder o vídeo com a foto também vale; vídeo longo é recusado', async () => {
  const v = video('5544955556666', 40)
  await rodar(v, 1, 200)
  const saiu = await rodar(foto('5544955556666', 'aurora bota eu no vídeo', { stanzaId: v.key.id, participant: '5544955556666@s.whatsapp.net', quotedMessage: v.message }))
  assert.match(saiu[0].conteudo.text, /corta pra até 15 segundos/)
})

test('falou "genjutsu" sem mídia: ela explica o que falta', async () => {
  const saiu = await rodar(evento('5544977778888', { conversation: 'aurora faz um genjutsu' }))
  assert.match(saiu[0].conteudo.text, /preciso de um \*vídeo\*/)
})

test('sem saldo na Higgsfield: membro ouve o genérico e o vídeo volta pro limite', async () => {
  envioHf = 403
  const antes = banco.auroraGenjutsuUso(diaBrasilia()).total
  await rodar(video('5544966667777'), 1, 200)
  const saiu = await rodar(foto('5544966667777', 'aurora coloca eu nesse vídeo'), 2)
  assert.match(saiu.at(-1).conteudo.text, /deu ruim no vídeo/)
  assert.equal(banco.auroraGenjutsuUso(diaBrasilia()).total, antes, 'não contou')
  envioHf = 200
})

test('só o criador: os outros ouvem que é exclusivo', async () => {
  banco.auroraGenjutsuQuem('criador')
  await rodar(video('5544988889999'), 1, 200)
  const saiu = await rodar(foto('5544988889999', 'aurora coloca eu nesse vídeo'))
  assert.match(saiu[0].conteudo.text, /só pro meu criador/)
  banco.auroraGenjutsuQuem('todos')
})

test('conversa sobre vídeo sem mídia nem "genjutsu" segue pra IA', async () => {
  const antes = pedidosIa.length
  await rodar(evento('5544900002222', { conversation: 'aurora coloca o link do vídeo do autolike' }))
  assert.equal(pedidosIa.length, antes + 1)
})
