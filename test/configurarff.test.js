// node test/configurarff.test.js
// #configurarff vale só pro bot de quem configurou. Num grupo com vários bots
// (o da casa e os das clientes), todos recebem o mesmo "#configurarff 3": antes
// qualquer ADM do grupo mudava o limite em TODOS os bots de uma vez. Agora cada
// bot só muda pelo dono dele (dona, subdono, quem alugou o grupo) ou quando o
// ADM marca/responde aquele bot. E o limite passa a contar no #like.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-configff-'))
process.chdir(pasta)
process.env.AUTOSYSTEM_TOKEN = 'teste'
process.env.AUTO_SYSTEM_URL = 'https://site.teste'

const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
const { configurarFF } = await import(path.join(raiz, 'sistema/funcoes/configFF.js'))
const like = (await import(path.join(raiz, 'sistema/comandos/ff/like.js'))).default
const messages = (await import(path.join(raiz, 'sistema/funcoes/global.js'))).default

const GP = '120363000000000001@g.us'
const pessoa = (extra = {}) => ({ isGroup: true, from: GP, prefix: '#', args: [], isOwner: false, isAdmin: false, isDonoAluguel: false, senderKey: '5511900000001', ...extra })

test('ADM que não marcou o bot não muda o limite deste bot', () => {
  banco.setLimiteFF(GP, 5)
  const r = configurarFF(pessoa({ isAdmin: true, args: ['3'] }), { mirouEsteBot: false, nomeBot: 'Bot da Ana' })
  assert.equal(banco.getLimiteFF(GP), 5)
  assert.match(r, /marque o bot/i)
  assert.match(r, /Bot da Ana/)
})

test('ADM que marcou (ou respondeu) este bot muda só ele', () => {
  const r = configurarFF(pessoa({ isAdmin: true, args: ['@5511988887777', '3'] }), { mirouEsteBot: true, nomeBot: 'Bot da Ana' })
  assert.equal(banco.getLimiteFF(GP), 3)
  assert.match(r, /3 IDs por usuário\/dia/)
  assert.match(r, /Bot da Ana/)
})

test('dono do bot (dona ou subdono) e quem alugou o grupo mudam sem marcar', () => {
  configurarFF(pessoa({ isOwner: true, args: ['4'] }), { mirouEsteBot: false, nomeBot: 'B' })
  assert.equal(banco.getLimiteFF(GP), 4)
  configurarFF(pessoa({ isAdmin: true, isDonoAluguel: true, args: ['0'] }), { mirouEsteBot: false, nomeBot: 'B' })
  assert.equal(banco.getLimiteFF(GP), 0)
})

test('membro comum não muda e número inválido é recusado', () => {
  banco.setLimiteFF(GP, 2)
  assert.match(configurarFF(pessoa({ args: ['9'] }), { mirouEsteBot: true, nomeBot: 'B' }), /Somente o dono/)
  assert.match(configurarFF(pessoa({ isOwner: true, args: ['500'] }), { mirouEsteBot: false, nomeBot: 'B' }), /de 1 a 100/)
  assert.equal(banco.getLimiteFF(GP), 2)
  assert.match(configurarFF(pessoa({ isAdmin: true }), { mirouEsteBot: false, nomeBot: 'B' }), /Limite atual: \*2 IDs/)
  assert.match(configurarFF(pessoa({ isOwner: true, args: ['1'] }), { mirouEsteBot: false, nomeBot: 'B', idioma: 'es' }), /1 IDs por usuario\/día/)
})

test('cada bot tem o próprio banco: mudar num não muda no outro', () => {
  const script = (acao) => `const b = await import(${JSON.stringify(path.join(raiz, 'sistema/funcoes/banco.js'))}); ${acao}`
  const botA = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-botA-'))
  const botB = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-botB-'))
  const rodar = (cwd, acao) => execFileSync(process.execPath, ['--no-warnings', '--input-type=module', '-e', script(acao)], { cwd, env: { ...process.env, AURORA_CLIENTE: '1' }, encoding: 'utf8' }).trim()
  rodar(botA, `b.setLimiteFF(${JSON.stringify(GP)}, 7)`)
  rodar(botB, `b.setLimiteFF(${JSON.stringify(GP)}, 2)`)
  assert.equal(rodar(botA, `console.log(b.getLimiteFF(${JSON.stringify(GP)}))`), '7')
  assert.equal(rodar(botB, `console.log(b.getLimiteFF(${JSON.stringify(GP)}))`), '2')
})

test('#like conta no limite do grupo; envio que falhou não gasta; dono não conta', async () => {
  const respostas = []
  let ok = true
  globalThis.fetch = async () => new Response(JSON.stringify(ok ? { sucesso: true, nickname: 'X', likes_antes: 1, likes_depois: 2, likes_enviados: 1 } : { sucesso: false, erro: 'falhou' }), { status: 200 })
  const sys = (extra = {}) => ({ ...pessoa({ senderKey: '5511900000099', command: 'like', ...extra }), args: ['123456789'], config: {}, messages, erroApi: (e, p) => e || p, reply: async (t) => { respostas.push(String(t)) } })
  banco.setLimiteFF(GP, 2)
  ok = false
  await like.run(sys())
  ok = true
  await like.run(sys())
  await like.run(sys())
  respostas.length = 0
  await like.run(sys())
  assert.match(respostas.at(-1), /limite diário de \*2 IDs\* acabou/)
  // Outra pessoa e o dono do bot continuam podendo.
  respostas.length = 0
  await like.run(sys({ senderKey: '5511900000050' }))
  assert.doesNotMatch(respostas.at(-1), /acabou/)
  await like.run(sys({ isOwner: true }))
  assert.doesNotMatch(respostas.at(-1), /acabou/)
  // Sem limite (0): não para.
  banco.setLimiteFF(GP, 0)
  respostas.length = 0
  await like.run(sys())
  assert.doesNotMatch(respostas.at(-1), /acabou/)
})

test('grupo que nunca configurou fica sem limite (como sempre funcionou na prática)', () => {
  assert.equal(banco.getLimiteFF('120363000000000999@g.us'), 0)
})
