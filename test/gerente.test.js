// node test/gerente.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { criarGerente, marcaDo } from '../sistema/clientes/gerente.js'

const quieto = { log() {}, warn() {} }
const espera = () => new Promise((r) => setTimeout(r, 10))

function cenario(lista) {
  const pastaBase = fs.mkdtempSync(path.join(os.tmpdir(), 'gerente-'))
  const pedidos = []
  const filhos = []
  const fetchImpl = async (url, opcoes) => {
    pedidos.push({ url, opcoes })
    const corpo = url.endsWith('/api/bot/wa/clientes') ? { clientes: lista() } : { ok: true }
    return { ok: true, status: 200, text: async () => JSON.stringify(corpo) }
  }
  const spawnImpl = (cmd, args, opcoes) => {
    const filho = new EventEmitter()
    filho.opcoes = opcoes
    filho.exitCode = null
    filho.connected = true
    filho.enviadas = []
    filho.send = (m) => filho.enviadas.push(m)
    filho.kill = () => { filho.exitCode = 0; queueMicrotask(() => filho.emit('exit', 0)) }
    filhos.push(filho)
    return filho
  }
  const g = criarGerente({ site: { url: 'https://site', token: 'tk' }, pastaBase, fetchImpl, spawnImpl, log: quieto })
  return { g, pedidos, filhos, pastaBase }
}

const cliente = (extra = {}) => ({ pedido: 'p1', bot_numero: '5511999990000', dono_numero: '5511888880000', nome_bot: 'Bot da Ana', idioma: 'pt', estilo_menu: 'rosa', codigo_pedido: 0, ...extra })

test('sem sessão e sem pedido de código: não liga nada', async () => {
  const { g, filhos, pedidos } = cenario(() => [cliente()])
  await g.sincronizar()
  assert.equal(filhos.length, 0)
  assert.equal(pedidos[0].opcoes.headers['X-Aurora-Token'], 'tk')
})

test('pediu código: liga o bot dela com o número e a marca dela, sem nada da casa', async () => {
  process.env.AURORA_RENTAL_TOKEN = 'segredo-da-casa'
  const { g, filhos, pastaBase } = cenario(() => [cliente({ codigo_pedido: 1 })])
  await g.sincronizar()
  delete process.env.AURORA_RENTAL_TOKEN
  assert.equal(filhos.length, 1)
  const env = filhos[0].opcoes.env
  assert.equal(env.AURORA_CLIENTE, '1')
  assert.equal(env.AURORA_CONNECTION_NUMBER, '5511999990000')
  assert.equal(env.AURORA_OWNER_NUMBER, '5511888880000')
  assert.equal(env.AURORA_RENTAL_TOKEN, undefined)
  assert.deepEqual(JSON.parse(env.AURORA_MARCA), { nome: 'Bot da Ana', dono: '5511888880000', idioma: 'pt', foto: '', estilo: 'rosa', expira: '' })
  assert.equal(filhos[0].opcoes.cwd, path.join(pastaBase, 'p1'))
})

test('código e conexão do bot vão para o site', async () => {
  const { g, filhos, pedidos } = cenario(() => [cliente({ codigo_pedido: 1 })])
  await g.sincronizar()
  filhos[0].emit('message', { tipo: 'codigo', codigo: 'ABCD-1234' })
  filhos[0].emit('message', { tipo: 'conectado', numero: '5511999990000' })
  await espera()
  const enviados = pedidos.filter((p) => p.url.endsWith('/resultado')).map((p) => JSON.parse(p.opcoes.body).resultados[0])
  assert.deepEqual(enviados, [{ pedido: 'p1', codigo: 'ABCD-1234' }, { pedido: 'p1', ok: true, numero: '5511999990000' }])
})

test('pedido de código novo reinicia o bot que ainda não conectou', async () => {
  let seq = 1
  const { g, filhos } = cenario(() => [cliente({ codigo_pedido: seq })])
  await g.sincronizar()
  seq = 2
  await g.sincronizar()
  await espera()
  assert.equal(filhos.length, 2)
  assert.equal(filhos[0].exitCode, 0)
})

test('mudou nome/estilo no site: manda a marca nova sem reiniciar', async () => {
  let estilo = 'rosa'
  const { g, filhos } = cenario(() => [cliente({ codigo_pedido: 1, estilo_menu: estilo })])
  await g.sincronizar()
  estilo = 'preto'
  await g.sincronizar()
  assert.equal(filhos.length, 1)
  assert.equal(filhos[0].enviadas.at(-1).marca.estilo, 'preto')
})

test('saiu da lista (venceu): desliga o bot dela', async () => {
  let lista = [cliente({ codigo_pedido: 1 })]
  const { g, filhos } = cenario(() => lista)
  await g.sincronizar()
  lista = []
  await g.sincronizar()
  await espera()
  assert.equal(filhos[0].exitCode, 0)
  assert.equal(g.bots.size, 0)
})

test('desconectado pelo celular: apaga a sessão e espera código novo', async () => {
  const { g, filhos, pastaBase } = cenario(() => [cliente({ codigo_pedido: 1 })])
  await g.sincronizar()
  const sessao = path.join(pastaBase, 'p1', 'sistema', 'dados', 'sessao')
  fs.mkdirSync(sessao, { recursive: true })
  fs.writeFileSync(path.join(sessao, 'creds.bin'), 'x')
  filhos[0].emit('message', { tipo: 'desconectado' })
  filhos[0].emit('exit', 0)
  assert.equal(fs.existsSync(sessao), false)
  assert.equal(g.bots.get('p1').esperandoCodigo, true)
  await g.sincronizar()
  assert.equal(filhos.length, 1)
})

test('marcaDo limpa o número da dona', () => {
  assert.equal(marcaDo({ dono_numero: '+55 (11) 98888-0000' }).dono, '5511988880000')
})
