// node test/tirar400.test.js
// #tirar400 ID: o dono do site manda o ID do Autolike 400 e o site tira ele
// do Turbo automático e do Autolike 220 de quem tinha, avisando no WhatsApp.
// O bot só repassa o ID e responde quantos saíram e quantos foram avisados.
import test from 'node:test'
import assert from 'node:assert/strict'
import { idDoComando, tirar400 } from '../sistema/funcoes/tirar400.js'

test('o ID sai do texto do comando', () => {
  assert.equal(idDoComando('#tirar400 81818181', '#'), '81818181')
  assert.equal(idDoComando('#TIRAR400   1234 5678', '#'), '12345678')
  assert.equal(idDoComando('!tira400 ID: 99887766', '!'), '99887766')
  assert.equal(idDoComando('#tirar400', '#'), '', 'o 400 do nome do comando virou ID')
})

const siteFalso = (resposta, status = 200) => {
  const chamadas = []
  const fetchImpl = async (url, op) => {
    chamadas.push({ url, metodo: op.method, token: op.headers['X-Aurora-Token'], corpo: JSON.parse(op.body) })
    return { ok: status < 400, status, text: async () => JSON.stringify(resposta) }
  }
  return { chamadas, fetchImpl }
}
const base = 'https://site.test'

test('#tirar400 ID: manda pro site com o token e diz de onde saiu e quem foi avisado', async () => {
  const s = siteFalso({ ok: true, uid: '81818181', nick: 'Fulano*Rei', turbo: 1, autolike: 2, avisados: 2, sem_aviso: 1, esperando: 0 })
  const r = await tirar400({ base, token: 'tk', fetchImpl: s.fetchImpl }, '81818181')
  assert.deepEqual(s.chamadas, [{ url: base + '/api/bot/tirar400', metodo: 'POST', token: 'tk', corpo: { uid: '81818181' } }])
  assert.match(r, /FulanoRei \(ID 81818181\)/)
  assert.match(r, /Turbo automático: 1 conta/)
  assert.match(r, /Autolike 220: 2 contas/)
  assert.match(r, /2 pessoas vão receber o aviso no WhatsApp/)
  assert.match(r, /1 pessoa não tem WhatsApp/)
})

test('nada pra tirar, sem ID e erros viram frase clara', async () => {
  const n = siteFalso({ ok: true, uid: '81818181', turbo: 0, autolike: 0, avisados: 0, sem_aviso: 0, esperando: 0 })
  assert.match(await tirar400({ base, token: 'tk', fetchImpl: n.fetchImpl }, '81818181'), /Nada pra tirar/)
  const vazio = siteFalso({})
  assert.match(await tirar400({ base, token: 'tk', fetchImpl: vazio.fetchImpl, prefixo: '#' }, ''), /#tirar400 ID/)
  assert.equal(vazio.chamadas.length, 0, 'chamou o site sem ID')
  const fora = siteFalso({ ok: false, erro: 'esse ID não está num plano do Autolike 400 valendo' }, 404)
  await assert.rejects(tirar400({ base, token: 'tk', fetchImpl: fora.fetchImpl }, '123123123'), /Autolike 400/)
  await assert.rejects(tirar400({ base, token: '', fetchImpl: fora.fetchImpl }, '123123123'), /token/)
})
