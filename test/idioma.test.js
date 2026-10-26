// node test/idioma.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const rodar = (env, codigo) => {
  const r = spawnSync(process.execPath, ['--input-type=module', '--no-warnings', '-e', codigo], {
    cwd: fs.mkdtempSync(path.join(os.tmpdir(), 'idioma-')), encoding: 'utf8', timeout: 60_000,
    env: { ...process.env, AURORA_CLIENTE: '', AURORA_MARCA: '', ...env }
  })
  const linha = r.stdout.trim().split('\n').filter((l) => l.startsWith('{')).at(-1)
  assert.ok(linha, r.stderr)
  return JSON.parse(linha)
}
const banco = JSON.stringify(path.join(raiz, 'sistema/funcoes/banco.js'))
const cliente = JSON.stringify(path.join(raiz, 'sistema/funcoes/cliente.js'))

test('bot da cliente: os grupos falam o idioma que ela escolheu no site e trocam na hora', () => {
  const r = rodar({ AURORA_CLIENTE: '1', AURORA_MARCA: JSON.stringify({ nome: 'Bot', idioma: 'es' }) }, `
    const b = await import(${banco}); const c = await import(${cliente})
    const antes = b.getIdiomaGrupo('1@g.us')
    b.setIdiomaGrupo('2@g.us', 'pt')
    const escolhido = b.getIdiomaGrupo('2@g.us')
    c.trocarMarcaCliente({ nome: 'Bot', idioma: 'en' })
    console.log(JSON.stringify({ antes, escolhido, depois1: b.getIdiomaGrupo('1@g.us'), depois2: b.getIdiomaGrupo('2@g.us') }))
    process.exit(0)
  `)
  assert.deepEqual(r, { antes: 'es', escolhido: 'pt', depois1: 'en', depois2: 'en' })
})

test('bot da casa: grupo sem escolha continua em português', () => {
  const r = rodar({}, `
    const b = await import(${banco})
    const sem = b.getIdiomaGrupo('1@g.us'); b.setIdiomaGrupo('2@g.us', 'es')
    console.log(JSON.stringify({ sem, com: b.getIdiomaGrupo('2@g.us') }))
    process.exit(0)
  `)
  assert.deepEqual(r, { sem: 'pt', com: 'es' })
})
