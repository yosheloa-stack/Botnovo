// node test/config-keys.test.js
// As keys da Tokito e da Akame vêm da variável de ambiente (Square Cloud):
// o repositório é público e não guarda key.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-config-keys-')))
process.env.TOKITO_API_TOKEN = 'tokito_teste'
process.env.AKAME_API_TOKEN = ' ak_teste \n'
const { loadConfig } = await import(path.join(raiz, 'sistema/funcoes/config.js'))

test('keys da Tokito e da Akame vêm do ambiente', async () => {
  const c = await loadConfig()
  assert.equal(c.tokitoApi.token, 'tokito_teste')
  assert.equal(c.akameApi.token, 'ak_teste')
  assert.equal(c.tokitoApi.url, 'https://tokito-apis.com.br')
  assert.equal(c.akameApi.url, 'https://akame-apis.shop')
})

test('o config.json do repositório não tem key de verdade', () => {
  const c = JSON.parse(fs.readFileSync(path.join(raiz, 'config.json'), 'utf8'))
  assert.equal(c.tokitoApi.token, 'token')
  assert.equal(c.akameApi.token, 'token')
})
