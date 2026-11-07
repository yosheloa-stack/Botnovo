// node test/pareamento.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { criarPareamento } from '../sistema/funcoes/pareamento.js'

function relogio(inicio = 1_000_000) {
  let t = inicio
  const agora = () => t
  agora.andar = (ms) => { t += ms }
  return agora
}
const calado = { log() {}, warn() {}, error() {} }

// WhatsApp de mentira: cada pedido devolve um código diferente.
function montar({ vivo = () => true, maxRenovacoes, falha } = {}) {
  const mostrados = []
  let n = 0
  const pedidos = []
  const agora = relogio()
  const p = criarPareamento({
    numero: async () => '5511999999999',
    pedirCodigo: async (numero) => {
      pedidos.push(numero)
      if (falha) { const f = falha; falha = null; throw f }
      return 'CODIGO' + String(++n).padStart(2, '0')
    },
    mostrar: (codigo, info) => mostrados.push({ codigo, ...info }),
    codigoVivo: () => vivo(),
    maxRenovacoes,
    agora,
    log: calado
  })
  return { p, mostrados, pedidos, agora }
}

test('primeiro pedido mostra o código; QR girando não pede outro enquanto ele vale', async () => {
  const { p, mostrados, pedidos } = montar()
  await p.pedir()
  await p.pedir()
  await p.pedir()
  assert.equal(pedidos.length, 1)
  assert.deepEqual(mostrados.map((m) => m.codigo), ['CODIGO01'])
  assert.equal(mostrados[0].novo, false)
})

test('o mesmo código vindo pelo evento e pelo retorno aparece uma vez só', async () => {
  const { p, mostrados } = montar()
  p.registrar('CODIGO01')
  await p.pedir()
  p.registrar('CODIGO01')
  assert.equal(mostrados.length, 1)
})

test('WhatsApp pede pra renovar (código venceu): sai um código NOVO, não o mesmo', async () => {
  const { p, mostrados, pedidos } = montar()
  await p.pedir()
  await p.renovar()
  assert.equal(pedidos.length, 2)
  assert.deepEqual(mostrados.map((m) => m.codigo), ['CODIGO01', 'CODIGO02'])
  assert.equal(mostrados[1].novo, true)
  assert.equal(p.atual(), 'CODIGO02')
})

test('conexão reabriu e o código antigo morreu: o próximo giro do QR pede um código novo', async () => {
  let vivo = true
  const { p, mostrados } = montar({ vivo: () => vivo })
  await p.pedir()
  vivo = false
  await p.pedir()
  assert.deepEqual(mostrados.map((m) => m.codigo), ['CODIGO01', 'CODIGO02'])
  vivo = true
  await p.pedir()
  assert.equal(mostrados.length, 2)
})

test('renova no máximo N vezes (não fica pedindo código pra sempre)', async () => {
  const { p, pedidos } = montar({ maxRenovacoes: 2 })
  await p.pedir()
  await p.renovar()
  await p.renovar()
  await p.renovar()
  await p.renovar()
  assert.equal(pedidos.length, 3)
})

test('pedidos ao mesmo tempo viram um só', async () => {
  const { p, pedidos } = montar()
  await Promise.all([p.pedir(), p.pedir(), p.renovar()])
  assert.equal(pedidos.length, 1)
})

test('429 do WhatsApp: espera 15 min antes de pedir de novo, depois volta a pedir', async () => {
  const { p, pedidos, mostrados, agora } = montar({ falha: new Error('rate-overlimit 429') })
  await p.pedir()
  assert.equal(pedidos.length, 1)
  agora.andar(5 * 60_000)
  await p.pedir()
  assert.equal(pedidos.length, 1)
  agora.andar(11 * 60_000)
  await p.pedir()
  assert.equal(pedidos.length, 2)
  assert.equal(mostrados[0].codigo, 'CODIGO01')
})

test('erro comum: o próximo giro tenta de novo', async () => {
  const { p, pedidos, mostrados } = montar({ falha: new Error('timeout') })
  await p.pedir()
  await p.pedir()
  assert.equal(pedidos.length, 2)
  assert.equal(mostrados.length, 1)
})

test('sem número: avisa e não pede código', async () => {
  let avisou = 0
  const p = criarPareamento({
    numero: async () => '',
    pedirCodigo: async () => { throw new Error('não devia pedir') },
    mostrar: () => { throw new Error('não devia mostrar') },
    semNumero: () => { avisou++ },
    log: calado
  })
  await p.pedir()
  await p.pedir()
  assert.equal(avisou, 2)
})
