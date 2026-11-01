// node test/aviso-geral.test.js
// #aviso texto: o criador manda um aviso pra todos os clientes com número no
// site. O bot só repassa o texto pro site (que põe na fila de cada cliente e
// solta um por vez, espaçado) e responde quantos vão receber e até quando.
import test from 'node:test'
import assert from 'node:assert/strict'
import { textoDoAviso, avisoGeral } from '../sistema/funcoes/avisoGeral.js'

test('o texto do aviso sai inteiro, com as quebras de linha, sem o comando', () => {
  assert.equal(textoDoAviso('#aviso Promoção hoje!\n\n*2 dias grátis*', '#'), 'Promoção hoje!\n\n*2 dias grátis*')
  assert.equal(textoDoAviso('#AVISO   oi', '#'), 'oi')
  assert.equal(textoDoAviso('!aviso\nlinha 1\nlinha 2', '!'), 'linha 1\nlinha 2')
  assert.equal(textoDoAviso('#aviso', '#'), '')
})

const siteFalso = (resposta, status = 200) => {
  const chamadas = []
  const fetchImpl = async (url, op) => {
    chamadas.push({ url, metodo: op.method || 'GET', token: op.headers['X-Aurora-Token'], corpo: op.body ? JSON.parse(op.body) : null })
    return { ok: status < 400, status, text: async () => JSON.stringify(resposta) }
  }
  return { chamadas, fetchImpl }
}
const base = 'https://site.test'

test('#aviso texto: manda pro site com o token e o número de quem pediu', async () => {
  const s = siteFalso({ ok: true, total: 120, espaco_s: 40, termina_em: '2026-11-01T08:00:00.000Z', geral: { na_fila: 120 } })
  const r = await avisoGeral({ base, token: 'tk', fetchImpl: s.fetchImpl }, { texto: 'Promoção!', de: '5511999990000' })
  assert.deepEqual(s.chamadas, [{ url: base + '/api/bot/avisos-cliente/geral', metodo: 'POST', token: 'tk', corpo: { texto: 'Promoção!', de: '5511999990000' } }])
  assert.match(r, /120 clientes/)
  assert.match(r, /40 s/)
  assert.match(r, /05:00/, 'a hora do fim não saiu no horário de Brasília: ' + r)
  assert.match(r, /aviso cancelar/)
})

test('#aviso cancelar e #aviso sozinho (andamento)', async () => {
  const c = siteFalso({ ok: true, cancelados: 7, geral: { na_fila: 0 } })
  const r = await avisoGeral({ base, token: 'tk', fetchImpl: c.fetchImpl }, { cancelar: true })
  assert.deepEqual(c.chamadas[0].corpo, { cancelar: true })
  assert.match(r, /7/)
  const a = siteFalso({ ok: true, geral: { na_fila: 3, enviados: 10, sem_whatsapp: 1, recusados: 0, espaco_s: 40, termina_em: '2026-11-01T08:00:00.000Z',
    ultimo: { texto: 'Promoção!', criado: '2026-11-01T07:00:00.000Z', total: 14 } } })
  const st = await avisoGeral({ base, token: 'tk', fetchImpl: a.fetchImpl, prefixo: '#' }, {})
  assert.equal(a.chamadas[0].metodo, 'GET')
  assert.match(st, /Promoção!/)
  assert.match(st, /10 enviados/)
  assert.match(st, /3 na fila/)
  assert.match(st, /#aviso texto/)
})

test('erro do site e falta de token viram uma frase clara', async () => {
  const e = siteFalso({ ok: false, erro: 'você já mandou esse mesmo aviso agora há pouco' }, 400)
  await assert.rejects(avisoGeral({ base, token: 'tk', fetchImpl: e.fetchImpl }, { texto: 'x' }), /já mandou/)
  await assert.rejects(avisoGeral({ base, token: '', fetchImpl: e.fetchImpl }, { texto: 'x' }), /token/)
})
