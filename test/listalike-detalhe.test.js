// node test/listalike-detalhe.test.js — #listalike mostra Nick, ID, inicial, hoje e total
import test from 'node:test'
import assert from 'node:assert/strict'
import m from '../sistema/funcoes/global.js'
test('lista detalhada por ID', () => {
  const t = m.ffList([{ uid: '123456789', nick: 'Yosh', likes_inicial: 1000, likes_hoje: 220, likes_entregues: 4400 }, { uid: '987654321' }])
  assert.match(t, /Nick: Yosh\nID: 123456789\nLikes inicial: 1\.000\nLikes hoje: 220\nTotal recebido: 4\.400/)
  assert.match(t, /Nick: —\nID: 987654321\nLikes inicial: —\nLikes hoje: —\nTotal recebido: —/)
  assert.match(m.ffList([]), /Nenhum ID/)
})
