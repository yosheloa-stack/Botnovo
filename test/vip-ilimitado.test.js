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
