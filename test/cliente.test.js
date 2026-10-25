// node test/cliente.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { lerMarca } from '../sistema/funcoes/cliente.js'

test('lerMarca aceita só valores seguros', () => {
  const m = lerMarca(JSON.stringify({ nome: '  Bot da Ana ', dono: '+55 11 9', idioma: 'xx', foto: 'http://x/a.jpg', estilo: 'azul', expira: 'nada' }))
  assert.deepEqual(m, { nome: 'Bot da Ana', dono: '55119', donoNome: '', idioma: 'pt', foto: '', estilo: '', expira: '' })
  assert.equal(lerMarca('{quebrado').nome, 'Bot')
  assert.equal(lerMarca(JSON.stringify({ donoNome: ' Ana ' })).donoNome, 'Ana')
  assert.equal(lerMarca(JSON.stringify({ estilo: 'vermelho', foto: 'https://x/a.jpg' })).estilo, 'vermelho')
})

test('boas-vindas no idioma da dona, sem nada da casa', async () => {
  const { textoBoasVindas } = await import('../sistema/funcoes/boasVindas.js')
  const pt = textoBoasVindas({ nome: 'Bot da Ana', donoNome: 'Ana', idioma: 'pt' }, '#', 'https://site/aluguel-bot')
  assert.match(pt, /Olá, Ana! Seu bot \*Bot da Ana\*/)
  assert.match(pt, /#rgaluguel/)
  assert.match(pt, /#configurarff 0/)
  assert.match(textoBoasVindas({ nome: 'B', idioma: 'es' }), /Cómo configurarlo/)
  assert.match(textoBoasVindas({ nome: 'B', idioma: 'en' }, '!'), /!rgaluguel/)
  for (const t of [pt, textoBoasVindas({ nome: 'B', idioma: 'en' })]) assert.doesNotMatch(t, /aurora|yoshi/i)
})
