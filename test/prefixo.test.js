// node test/prefixo.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { criarGerente } from '../sistema/clientes/gerente.js'

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')

test('#setprefixo (em português) troca o prefixo, igual ao #setprefix', () => {
  // O carregador roda num processo à parte: os comandos importam o banco.
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', `
    const { loadPlugins } = await import(${JSON.stringify(path.join(raiz, 'sistema/core/loader.js'))})
    const { commands } = await loadPlugins()
    console.log(JSON.stringify(['setprefix', 'setprefixo', 'prefixo', 'mudarprefixo'].map((c) => commands.get(c)?.name || null)))
    process.exit(0)
  `], { cwd: fs.mkdtempSync(path.join(os.tmpdir(), 'prefixo-')), encoding: 'utf8', timeout: 60_000 })
  const linha = r.stdout.trim().split('\n').filter((l) => l.startsWith('[')).at(-1)
  assert.deepEqual(JSON.parse(linha || 'null'), ['setprefix', 'setprefix', 'setprefix', 'setprefix'], r.stderr)
})

test('cada bot guarda o próprio prefixo: o da casa não passa pro bot da cliente', async () => {
  process.env.AURORA_PREFIX = '!'
  const filhos = []
  const g = criarGerente({
    site: { url: 'https://site', token: 'tk' },
    pastaBase: fs.mkdtempSync(path.join(os.tmpdir(), 'gerente-')),
    fetchImpl: async (url) => ({ ok: true, status: 200, text: async () => JSON.stringify(url.endsWith('/clientes') ? { clientes: [{ pedido: 'p1', bot_numero: '5511999990000', dono_numero: '5511888880000', codigo_pedido: 1 }] } : { ok: true }) }),
    spawnImpl: (cmd, args, opcoes) => { const f = new EventEmitter(); f.opcoes = opcoes; f.kill = () => {}; filhos.push(f); return f },
    log: { log() {}, warn() {} }
  })
  await g.sincronizar()
  delete process.env.AURORA_PREFIX
  assert.equal(filhos.length, 1)
  assert.equal(filhos[0].opcoes.env.AURORA_PREFIX, undefined)
  assert.equal(filhos[0].opcoes.env.AURORA_CONFIG_FILE, undefined)
})

test('o #setprefix grava na pasta do bot que rodou o comando', () => {
  const salvar = (pasta, prefixo) => spawnSync(process.execPath, ['--input-type=module', '-e', `
    const { loadConfig, saveConfig } = await import(${JSON.stringify(path.join(raiz, 'sistema/funcoes/config.js'))})
    const c = await loadConfig()
    if (${JSON.stringify(prefixo)}) { c.prefix = ${JSON.stringify(prefixo)}; await saveConfig(c) }
    console.log('PREFIXO=' + (await loadConfig()).prefix)
  `], { cwd: pasta, encoding: 'utf8', env: { ...process.env, AURORA_PREFIX: '', AURORA_CONFIG_FILE: '' } })
  const a = fs.mkdtempSync(path.join(os.tmpdir(), 'bot-a-')), b = fs.mkdtempSync(path.join(os.tmpdir(), 'bot-b-'))
  const lido = (r) => r.stdout.match(/PREFIXO=(.*)/)?.[1]
  assert.equal(lido(salvar(a, '.')), '.')
  assert.equal(lido(salvar(b, '$')), '$')
  assert.equal(lido(salvar(a, '')), '.')
  assert.ok(fs.existsSync(path.join(a, 'sistema/dados/config.user.json')))
})
