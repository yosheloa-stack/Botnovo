// node test/aviso-compra.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createAvisoCompra } from '../sistema/funcoes/avisoCompra.js'

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')

const site = (remetente) => {
  const chamadas = []
  const api = async (config, caminho, options = {}) => {
    chamadas.push([caminho, options.body])
    if (caminho.startsWith('/api/bot/avisos-compra/pendentes')) {
      return { ok: true, numero: '5544991853469', remetente, avisos: [{ id: 'p1', texto: '*Nova compra aprovada*' }] }
    }
    return { ok: true }
  }
  return { api, chamadas }
}
const bot = (meJid) => {
  const enviados = []
  return {
    enviados,
    client: {
      getCredentials: () => ({ meJid }),
      profile: { getLidsByPhoneNumbers: async ([n]) => [{ exists: true, phoneJid: `${n}@s.whatsapp.net` }] },
      message: { send: async (jid, m) => { enviados.push([jid, m.text]) } }
    }
  }
}

test('o bot no número fixo manda o aviso e diz ao site quem ele é', async () => {
  const s = site('5567981517686'), b = bot('556781517686:12@s.whatsapp.net')
  await createAvisoCompra({ client: b.client, config: {}, api: s.api })()
  assert.equal(s.chamadas[0][0], '/api/bot/avisos-compra/pendentes?bot=556781517686')
  assert.deepEqual(b.enviados, [['5544991853469@s.whatsapp.net', '*Nova compra aprovada*']])
  assert.deepEqual(s.chamadas[1], ['/api/bot/avisos-compra/entregues', { ids: ['p1'] }])
})

test('outro número não manda aviso de venda', async () => {
  const s = site('5567981517686'), b = bot('5511999998888@s.whatsapp.net')
  await createAvisoCompra({ client: b.client, config: {}, api: s.api })()
  assert.deepEqual(b.enviados, [])
  assert.equal(s.chamadas.length, 1, 'marcou como entregue um aviso que não saiu')
})

test('o bot da casa conecta sempre no número fixo; o da cliente não', () => {
  const ler = (env) => {
    const r = spawnSync(process.execPath, ['--input-type=module', '-e', `
      const { loadConfig } = await import(${JSON.stringify(path.join(raiz, 'sistema/funcoes/config.js'))})
      console.log(JSON.stringify((await loadConfig()).connection.number))
    `], { cwd: fs.mkdtempSync(path.join(os.tmpdir(), 'numero-')), encoding: 'utf8', timeout: 30_000,
      env: { ...process.env, AURORA_CLIENTE: '', AURORA_CONNECTION_NUMBER: '', ...env } })
    return JSON.parse(r.stdout.trim().split('\n').at(-1) || 'null')
  }
  assert.equal(ler({}), '5567981517686')
  assert.equal(ler({ AURORA_CONNECTION_NUMBER: '5511999998888' }), '5567981517686')
  assert.equal(ler({ AURORA_CLIENTE: '1', AURORA_CONNECTION_NUMBER: '5511999998888' }), '5511999998888')
})
