// node test/cliente.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { lerMarca } from '../sistema/funcoes/cliente.js'

test('lerMarca aceita só valores seguros', () => {
  const m = lerMarca(JSON.stringify({ nome: '  Bot da Ana ', dono: '+55 11 9', idioma: 'xx', foto: 'http://x/a.jpg', estilo: 'azul', expira: 'nada' }))
  assert.deepEqual(m, { nome: 'Bot da Ana', dono: '55119', idioma: 'pt', foto: '', estilo: '', expira: '' })
  assert.equal(lerMarca('{quebrado').nome, 'Bot')
  assert.equal(lerMarca(JSON.stringify({ estilo: 'vermelho', foto: 'https://x/a.jpg' })).estilo, 'vermelho')
})
