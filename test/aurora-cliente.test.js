// node test/aurora-cliente.test.js
// Bot de cliente: só o do número da casa (AURORA_IA=1, ligado pelo gerente)
// tem a Aurora com IA, e a resposta dela sai sem a troca de marca.
import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const rodar = (env, codigo) => {
  const r = spawnSync(process.execPath, ['--input-type=module', '--no-warnings', '-e', codigo], {
    cwd: fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-cliente-')), encoding: 'utf8', timeout: 60_000,
    env: { ...process.env, AURORA_CLIENTE: '1', AURORA_MARCA: JSON.stringify({ nome: 'GGx', dono: '5544900000000' }), AURORA_IA: '', SQUARECLOUD_API_KEY: 'k', ...env }
  })
  const linha = r.stdout.trim().split('\n').filter((l) => l.startsWith('{')).at(-1)
  assert.ok(linha, r.stderr)
  return JSON.parse(linha)
}
const indice = JSON.stringify(path.join(raiz, 'sistema/funcoes/aurora/index.js'))
const conversa = `
  const { LIMITES } = await import(${JSON.stringify(path.join(raiz, 'sistema/funcoes/aurora/ia.js'))})
  LIMITES.intervaloMs = 0
  globalThis.fetch = async () => new Response(JSON.stringify({ choices: [{ finish_reason: 'stop', message: { content: 'sou a Aurora, entra no autolikesystem.com.br' } }] }), { status: 200 })
  const a = await import(${indice})
  const enviados = []
  const system = { isGroup: false, from: '5511@s.whatsapp.net', senderKey: '5511', pushName: 'Yosh', prefix: '#', text: 'oi aurora',
    event: { key: { fromMe: false }, message: { conversation: 'oi aurora' } }, msg: { conversation: 'oi aurora' }, config: {},
    client: {}, reply: async (t, o) => { enviados.push([t, o]) } }
  const tomou = a.handleAurora(system)
  for (let i = 0; i < 100 && !enviados.length; i++) await new Promise((r) => setTimeout(r, 50))
  console.log(JSON.stringify({ ia: a.iaNesteBot(), tomou, enviados }))
`

test('bot de cliente comum: sem Aurora com IA', () => {
  const r = rodar({}, conversa)
  assert.equal(r.ia, false)
  assert.equal(r.tomou, false)
  assert.deepEqual(r.enviados, [])
})

test('bot de cliente no número da casa: Aurora responde, sem trocar a marca', () => {
  const r = rodar({ AURORA_IA: '1' }, conversa)
  assert.equal(r.ia, true)
  assert.equal(r.tomou, true)
  assert.equal(r.enviados.length, 1)
  assert.equal(r.enviados[0][0], 'sou a Aurora, entra no autolikesystem.com.br')
  assert.deepEqual(r.enviados[0][1], { semMarca: true })
})
