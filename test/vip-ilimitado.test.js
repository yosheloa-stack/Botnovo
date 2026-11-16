// node test/vip-ilimitado.test.js
// VIP ativo não conta no limite diário de IDs do #configurarff.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('like e dislike não cobram cota de VIP', () => {
  const like = fs.readFileSync(new URL('../sistema/comandos/ff/like.js', import.meta.url), 'utf8')
  const handler = fs.readFileSync(new URL('../sistema/core/handler.js', import.meta.url), 'utf8')
  assert.match(like, /const conta = [^\n]*!system\.isVip/)
  assert.match(handler, /if \(ffDislike && !system\.isVip[^\n]*\) \{/)
  assert.match(handler, /if \(ffDislike && !system\.isVip[^\n]*\) consumirCotaFF/)
})

test('VIP vale com ou sem o 9 do celular', async () => {
  const os = await import('node:os'), path = await import('node:path')
  process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-vip9-')))
  process.env.AURORA_CLIENTE = ''
  const banco = await import('../sistema/funcoes/banco.js')
  await banco.loadState()
  banco.darVip('5511999998888')
  assert.equal(banco.ehVip('551199998888'), true)
  assert.equal(banco.ehVip('5511999998888'), true)
  assert.equal(banco.ehVip('5511911112222'), false)
})
