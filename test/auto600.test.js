// AUTOLIKE 300/600 NO BOT (pedido do Yosh, 12/11).
// node test/auto600.test.js
// Nasce travado: "comando indisponível para este bot"; liberado pelo site
// (R$ 25 por bot), responde igual ao VIP: ficha com Nick, ID, inicial, hoje e total.
import test from 'node:test'
import assert from 'node:assert/strict'
import { atualizar, liberado, travado, listar, adicionar, remover, rotuloMenu, textoDoAviso, avisoPendente, MSG_INDISPONIVEL } from '../sistema/funcoes/auto600.js'
import messages from '../sistema/funcoes/global.js'
import cmd from '../sistema/comandos/ff/autolike600.js'
import cmdLista from '../sistema/comandos/ff/listalike600.js'
import cmdRemove from '../sistema/comandos/ff/removelike600.js'

const config = { autoSystem: { url: 'https://site.test', token: 'k' } }
let site
function fingeSite(rotas) {
  site = []
  globalThis.fetch = async (url, opcoes) => {
    const u = new URL(String(url))
    site.push({ caminho: u.pathname, params: Object.fromEntries(u.searchParams), headers: opcoes.headers })
    const r = rotas[u.pathname]
    const corpo = typeof r === 'function' ? r(u) : r
    return { ok: (corpo.status || 200) < 400, status: corpo.status || 200, text: async () => JSON.stringify(corpo.json ?? corpo) }
  }
}
function falso(args = []) {
  const respostas = []
  return { config, args, prefix: '#', messages: { ...messages, apiError: (t) => t, ffListError: () => 'erro lista', ffAutoError: () => 'erro auto', ffList: messages.ffList, ffRemoved: messages.ffRemoved },
    erroApi: (e, p) => e || p, reply: async (t) => { respostas.push(t) }, respostas }
}

test('só o dono usa: os três comandos são ownerOnly', () => {
  for (const c of [cmd, cmdLista, cmdRemove]) assert.equal(c.ownerOnly, true)
  assert.ok(cmd.aliases.includes('autolike400'))
})

test('travado: comando indisponível e menu mostra indisponível', async () => {
  fingeSite({ '/v1/auto400/info': { sucesso: true, liberada: false, codigo: 'bot_nao_liberado', preco_cent: 2500, ids: 50, aviso: { id: 'a1', pt: 'Nova atualização: AutoLike de 300 a 600 likes', es: 'x', en: 'y' } } })
  const s = falso(['123456789'])
  await cmd.run(s)
  assert.deepEqual(s.respostas, [MSG_INDISPONIVEL])
  assert.match(MSG_INDISPONIVEL, /indisponível para este bot/)
  assert.match(MSG_INDISPONIVEL, /desenvolvedor/)
  assert.equal(travado(), true)
  assert.match(rotuloMenu(), /indisponível/)
  assert.ok(!site.some((p) => p.caminho === '/v1/auto400/add'), 'chamou o add com o bot travado')
  assert.equal(avisoPendente().id, 'a1')
  assert.match(textoDoAviso(avisoPendente(), 'pt'), /Nova atualização: AutoLike de 300 a 600 likes/)
})

test('liberado: cadastra, lista com a ficha do VIP e remove', async () => {
  fingeSite({
    '/v1/auto400/info': { sucesso: true, liberada: true, preco_cent: 2500, ids: 50, aviso: null },
    '/v1/auto400/add': { sucesso: true, uid: '123456789', nick: 'Yosh', plano: { ids_cadastrados: 1, max_ids: 50 } },
    '/v1/auto400/list': { sucesso: true, plano: { max_ids: 50 }, ids: [{ uid: '123456789', nick: 'Yosh', likes_inicial: 1000, total_recebido: 4400, hoje: { status: 'ok', likes: 420 } }] },
    '/v1/auto400/remove': { sucesso: true, uid: '123456789', removido: true }
  })
  await atualizar(config, { forcar: true })
  assert.equal(liberado(), true)
  assert.match(rotuloMenu(), /dono/)
  const a = falso(['123456789']); await cmd.run(a)
  assert.match(a.respostas[0], /UID: 123456789/)
  assert.match(a.respostas[0], /300 a 600/)
  const l = falso(); await cmdLista.run(l)
  assert.match(l.respostas[0], /Nick: Yosh\nID: 123456789\nLikes inicial: 1\.000\nLikes hoje: 420\nTotal recebido: 4\.400/)
  assert.match(l.respostas[0], /IDs: 1 de 50/)
  const r = falso(['123456789']); await cmdRemove.run(r)
  assert.match(r.respostas[0], /removido/i)
  const sub = falso(['lista']); await cmd.run(sub)
  assert.match(sub.respostas[0], /Nick: Yosh/)
})

test('erro do site no cadastro sai como erro, sem quebrar', async () => {
  fingeSite({
    '/v1/auto400/info': { sucesso: true, liberada: true },
    '/v1/auto400/add': { status: 403, json: { sucesso: false, erro: 'esta key pode ter até 50 IDs' } }
  })
  await atualizar(config, { forcar: true })
  const s = falso(['123456789']); await adicionar(s, '123456789')
  assert.match(s.respostas[0], /50 IDs/)
})

test('o bot alugado manda pedido + token, sem key', async () => {
  process.env.AURORA_ALUGUEL_PEDIDO = 'abc123'; process.env.AURORA_ALUGUEL_TOKEN = 'tok'
  try {
    fingeSite({ '/v1/auto400/info': { sucesso: true, liberada: false } })
    await atualizar({ autoSystem: { url: 'https://site.test' } }, { forcar: true })
    assert.equal(site[0].headers['X-Aurora-Aluguel'], 'abc123')
    assert.equal(site[0].headers['X-Api-Key'], undefined)
  } finally { delete process.env.AURORA_ALUGUEL_PEDIDO; delete process.env.AURORA_ALUGUEL_TOKEN }
})
