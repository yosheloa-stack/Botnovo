// PLANOS DE IDs POR DIA DOS BOTS ALUGADOS (pedido do Yosh, 08/11).
// O bot da cliente manda o pedido do aluguel em X-Aurora-Aluguel em cada
// chamada à API: o site conta os IDs do dia no plano do bot (100, 250, 500
// ou 1000) e, no limite, devolve o aviso que vai pro grupo. O bot da casa
// não manda nada.
import test from 'node:test'
import assert from 'node:assert/strict'
import { autoSystem } from '../sistema/funcoes/auto.js'

const config = { autoSystem: { url: 'https://site.test', token: 'key-da-casa' } }
function captura(resposta = { sucesso: true }) {
  const pedidos = []
  globalThis.fetch = async (url, opcoes) => {
    pedidos.push({ url: String(url), headers: opcoes.headers })
    return { ok: true, status: 200, text: async () => JSON.stringify(resposta) }
  }
  return pedidos
}

test('bot alugado: o #like leva a key da casa e o pedido do aluguel', async () => {
  process.env.AURORA_ALUGUEL_PEDIDO = 'abc123'
  const pedidos = captura()
  await autoSystem.like(config, '123456789')
  delete process.env.AURORA_ALUGUEL_PEDIDO
  assert.equal(pedidos[0].headers['X-Api-Key'], 'key-da-casa')
  assert.equal(pedidos[0].headers['X-Aurora-Aluguel'], 'abc123')
})

test('bot da casa: não manda pedido de aluguel', async () => {
  delete process.env.AURORA_ALUGUEL_PEDIDO
  const pedidos = captura()
  await autoSystem.like(config, '123456789')
  assert.equal(pedidos[0].headers['X-Aurora-Aluguel'], undefined)
})

test('limite do plano: o aviso do site chega inteiro pro bot mostrar', async () => {
  process.env.AURORA_ALUGUEL_PEDIDO = 'abc123'
  const aviso = '📊 Este bot já usou os 100 IDs de hoje do plano dele. Volta à meia-noite (horário de Brasília). Para mais IDs por dia, o dono do bot pode aumentar o plano no site.'
  captura({ sucesso: false, codigo: 'BOT_PLAN_LIMIT', erro: aviso })
  const d = await autoSystem.like(config, '123456789')
  delete process.env.AURORA_ALUGUEL_PEDIDO
  assert.equal(d.sucesso, false)
  assert.equal(d.erro, aviso)
  const { erroParaCliente } = await import('../sistema/funcoes/marca.js')
  assert.equal(erroParaCliente(d.erro, 'padrão'), aviso, 'o aviso do plano foi trocado pela frase padrão')
})
