// node test/sem-botao.test.js
// Menu com botão/lista (mensagem interativa) pode não aparecer para quem
// recebe: os botões começam desligados até o dono ligar com #botoes 1.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-sem-botao-'))
process.chdir(pasta)
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')
fs.mkdirSync(process.env.AURORA_DATA_DIR, { recursive: true })
// Arquivo antigo, de antes da mudança: botoes ligado sem a dona ter escolhido.
fs.writeFileSync(path.join(process.env.AURORA_DATA_DIR, 'necessarios.json'), JSON.stringify({ botoes: true, verificado: false }))

const nec = await import(path.join(raiz, 'sistema/funcoes/necessarios.js'))

test('botões começam desligados, até o dono escolher com #botoes', async () => {
  const flags = await nec.loadNecessarios()
  assert.equal(flags.botoes, false)
  await nec.setNecessario('botoes_escolhido', true)
  await nec.setNecessario('botoes', true)
  const salvo = JSON.parse(fs.readFileSync(path.join(process.env.AURORA_DATA_DIR, 'necessarios.json'), 'utf8'))
  assert.equal(salvo.botoes, true)
  assert.equal((await nec.loadNecessarios()).botoes, true)
})
