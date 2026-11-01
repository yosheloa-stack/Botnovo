// node --test test/yosh.test.js
// A IA Yosh no bot (pedido do dono, 2026-11-01): uma IA separada da Aurora que
// responde pela API do site (/v1/yosh), paga pelo saldo da key da Yosh. Cada
// grupo tem a sua conversa, a resposta vai no idioma do grupo, a imagem chega
// como foto e o erro do site vira uma frase curta (sem detalhe técnico).
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-yosh-'))
process.chdir(pasta)
process.env.AUTOSYSTEM_TOKEN = 'key-teste'
process.env.AUTO_SYSTEM_URL = 'https://site.teste'

let pedidos = []
let resposta = () => ({ sucesso: true, resposta: 'Oi, eu sou a Yosh!' })
globalThis.fetch = async (url, op = {}) => {
  const u = new URL(String(url))
  pedidos.push({ u, op })
  if (u.pathname.startsWith('/v1/yosh/arquivo/')) {
    return { ok: true, status: 200, headers: { get: () => 'image/png' }, arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer }
  }
  const corpo = resposta(u)
  return { ok: corpo.sucesso !== false, status: corpo.sucesso === false ? (corpo.status || 402) : 200, text: async () => JSON.stringify(corpo) }
}

const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
const yosh = await import(path.join(raiz, 'sistema/comandos/geral/yosh.js'))
const cmd = yosh.default

const GP = '120363000000000001@g.us'
const sistema = (args, extra = {}) => {
  const replies = []
  return { replies, isGroup: true, from: GP, prefix: '#', args, senderNumber: '55119' + Math.random().toString().slice(2, 8),
    config: { autoSystem: { url: 'https://site.teste', token: 'key-teste' } }, reply: async (m) => { replies.push(m); return m }, ...extra }
}

test('o comando é yosh, separado da aurora', () => {
  assert.equal(cmd.name, 'yosh')
  assert.ok(!cmd.vipOnly)
  assert.ok(!cmd.aliases.includes('aurora'))
})

test('#yosh mensagem: pergunta ao site na conversa do grupo, no idioma do grupo', async () => {
  pedidos = []
  const s = sistema(['qual', 'a', 'capital?'])
  await cmd.run(s)
  const p = pedidos[0].u
  assert.equal(p.pathname, '/v1/yosh')
  assert.equal(p.searchParams.get('mensagem'), 'qual a capital?')
  assert.equal(p.searchParams.get('conversa'), yosh.conversaDe(GP))
  assert.equal(p.searchParams.get('idioma'), 'pt')
  assert.equal(pedidos[0].op.headers['X-Api-Key'], 'key-teste')
  assert.equal(s.replies.at(-1), 'Oi, eu sou a Yosh!')
  banco.setIdiomaGrupo(GP, 'es')
  pedidos = []
  await cmd.run(sistema(['hola']))
  assert.equal(pedidos[0].u.searchParams.get('idioma'), 'es')
  banco.setIdiomaGrupo(GP, 'pt')
})

test('#yosh imagem: manda prompt e tamanho e devolve a foto', async () => {
  pedidos = []
  resposta = (u) => (u.pathname === '/v1/yosh/imagem' ? { sucesso: true, imagem: 'https://site.teste/v1/yosh/arquivo/abc.png' } : { sucesso: true })
  const s = sistema(['imagem', 'um', 'dragão', 'voando', '16:9'])
  await cmd.run(s)
  const p = pedidos.find((x) => x.u.pathname === '/v1/yosh/imagem').u
  assert.equal(p.searchParams.get('prompt'), 'um dragão voando')
  assert.equal(p.searchParams.get('tamanho'), '16:9')
  const foto = s.replies.at(-1)
  assert.equal(foto.type, 'image')
  assert.deepEqual([...foto.media], [1, 2, 3])
})

test('#yosh criar, chat e reset usam conversas certas', async () => {
  pedidos = []
  resposta = () => ({ sucesso: true, resposta: 'ok', apagadas: 1 })
  await cmd.run(sistema(['criar', 'fast', 'oi']))
  assert.equal(pedidos[0].u.pathname, '/v1/yosh/reset')
  assert.equal(pedidos[1].u.searchParams.get('modelo'), 'fast')
  pedidos = []
  await cmd.run(sistema(['chat', 'vendas', 'oi']))
  assert.equal(pedidos[0].u.searchParams.get('conversa'), yosh.conversaDe(GP, 'vendas'))
  assert.notEqual(yosh.conversaDe(GP, 'vendas'), yosh.conversaDe(GP))
  assert.ok(yosh.conversaDe(GP, 'vendas').length <= 40)
  pedidos = []
  const s = sistema(['reset'])
  await cmd.run(s)
  assert.equal(pedidos[0].u.pathname, '/v1/yosh/reset')
})

test('erros viram frase curta; sem saldo avisa pra recarregar a key da Yosh', async () => {
  resposta = () => ({ sucesso: false, codigo: 'saldo_insuficiente', erro: 'saldo da key insuficiente: custa R$ 0,10' })
  const s = sistema(['oi'])
  await cmd.run(s)
  assert.match(s.replies.at(-1), /sem saldo/)
  assert.match(yosh.falaDoErro({ codigo: 'fechado' }), /manutenção/)
  assert.match(yosh.falaDoErro({ erro: 'a geração da imagem falhou' }), /imagem falhou/)
  assert.match(yosh.falaDoErro({}), /Não foi possível conectar/)
})

test('sem nada depois do comando mostra a ajuda; freio por pessoa', async () => {
  const s = sistema([])
  await cmd.run(s)
  assert.match(s.replies[0], /IA YOSH/)
  assert.equal(yosh.livre('t', 2, 1000, 0), true)
  assert.equal(yosh.livre('t', 2, 1000, 1), true)
  assert.equal(yosh.livre('t', 2, 1000, 2), false)
  assert.equal(yosh.livre('t', 2, 1000, 1500), true)
})
