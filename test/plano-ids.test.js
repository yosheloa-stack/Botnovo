// BOT ALUGADO FALA DIRETO COM O SITE (pedido do Yosh, 08/11).
// O bot da cliente manda o pedido do aluguel (X-Aurora-Aluguel) e o token do
// aluguel (X-Aurora-Token) em cada chamada, sem key de ninguém: o site usa a
// key da casa e conta os IDs do dia no plano do bot. No grupo nunca aparece
// nada de site, API, key, conta ou de outras pessoas.
import test from 'node:test'
import assert from 'node:assert/strict'
import { autoSystem } from '../sistema/funcoes/auto.js'
import { erroParaCliente } from '../sistema/funcoes/marca.js'

const config = { autoSystem: { url: 'https://site.test', token: 'key-da-casa' } }
function captura(resposta = { sucesso: true }) {
  const pedidos = []
  globalThis.fetch = async (url, opcoes) => {
    pedidos.push({ url: String(url), headers: opcoes.headers })
    return { ok: true, status: 200, text: async () => JSON.stringify(resposta) }
  }
  return pedidos
}
const comAluguel = async (fn) => {
  process.env.AURORA_ALUGUEL_PEDIDO = 'abc123'
  process.env.AURORA_ALUGUEL_TOKEN = 'token-aluguel'
  try { return await fn() } finally { delete process.env.AURORA_ALUGUEL_PEDIDO; delete process.env.AURORA_ALUGUEL_TOKEN }
}

test('bot alugado: fala direto com o site, sem key de ninguém', async () => {
  const pedidos = captura()
  await comAluguel(() => autoSystem.like({ autoSystem: { url: 'https://site.test' } }, '123456789'))
  assert.equal(pedidos.length, 1, 'sem key o bot nem chamou o site')
  assert.equal(pedidos[0].headers['X-Api-Key'], undefined)
  assert.equal(pedidos[0].headers['X-Aurora-Aluguel'], 'abc123')
  assert.equal(pedidos[0].headers['X-Aurora-Token'], 'token-aluguel')
})

test('bot da casa: segue com a key dele e não manda pedido de aluguel', async () => {
  const pedidos = captura()
  await autoSystem.like(config, '123456789')
  assert.equal(pedidos[0].headers['X-Api-Key'], 'key-da-casa')
  assert.equal(pedidos[0].headers['X-Aurora-Aluguel'], undefined)
  assert.equal(pedidos[0].headers['X-Aurora-Token'], undefined)
})

test('limite do plano: o aviso do site chega inteiro pro grupo', async () => {
  const aviso = '📊 Os 100 IDs de hoje já foram usados. Volta à meia-noite (horário de Brasília).'
  captura({ sucesso: false, codigo: 'BOT_PLAN_LIMIT', erro: aviso })
  const d = await comAluguel(() => autoSystem.like(config, '123456789'))
  assert.equal(d.sucesso, false)
  assert.equal(erroParaCliente(d.erro, 'padrão'), aviso)
})

test('queda de conexão: a frase não cita API nem site', async () => {
  globalThis.fetch = async () => { throw new TypeError('fetch failed') }
  const d = await comAluguel(() => autoSystem.info(config, '123456789'))
  assert.equal(d.sucesso, false)
  assert.doesNotMatch(d.erro, /api|site|servi/i)
})

test('erro do site que cita site, API, key, conta ou outras pessoas vira a frase padrão', () => {
  for (const e of ['chave não encontrada — confira se é a mesma do painel (Chaves da API)', 'cota esgotada (10/10)',
    'conta do dono da chave está inativa', 'esse ID já está cadastrado por outro cliente', 'o site está em manutenção — volta já já',
    'muitos pedidos seguidos nesta conta', 'Não foi possível consultar a API agora.', 'você não tem likes de 2K na conta']) {
    assert.equal(erroParaCliente(e, 'padrão'), 'padrão', e)
  }
  assert.equal(erroParaCliente('jogador não encontrado', 'padrão'), 'jogador não encontrado')
})
