// node test/cliente.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { lerMarca } from '../sistema/funcoes/cliente.js'

test('lerMarca aceita só valores seguros', () => {
  const m = lerMarca(JSON.stringify({ nome: '  Bot da Ana ', dono: '+55 11 9', idioma: 'xx', foto: 'http://x/a.jpg', estilo: 'amarelo', expira: 'nada' }))
  assert.deepEqual(m, { nome: 'Bot da Ana', dono: '55119', donoNome: '', idioma: 'pt', foto: '', estilo: '', expira: '' })
  assert.equal(lerMarca('{quebrado').nome, 'Bot')
  assert.equal(lerMarca(JSON.stringify({ donoNome: ' Ana ' })).donoNome, 'Ana')
  assert.equal(lerMarca(JSON.stringify({ estilo: 'vermelho', foto: 'https://x/a.jpg' })).estilo, 'vermelho')
})

test('boas-vindas: passo a passo do menu dono no idioma da dona, sem link nem nada da casa', async () => {
  const { textoBoasVindas } = await import('../sistema/funcoes/boasVindas.js')
  const pt = textoBoasVindas({ nome: 'Bot da Ana', donoNome: 'Ana', idioma: 'pt' }, '#', 'https://site/aluguel-bot')
  const es = textoBoasVindas({ nome: 'B', idioma: 'es' })
  const en = textoBoasVindas({ nome: 'B', idioma: 'en' }, '!')
  assert.match(pt, /Olá, Ana! Seu bot \*Bot da Ana\*/)
  assert.match(es, /Tu bot \*B\* está conectado/)
  assert.match(en, /Your bot \*B\* is connected/)
  for (const cmd of ['rgaluguel', 'fotomenu', 'nomebot', 'fotobot', 'setprefix', 'addsubdono', 'delsubdono', 'subdonos', 'addvip', 'configurarff 3', 'idioma es', 'menudono', 'menu']) {
    assert.ok(pt.includes('#' + cmd), 'pt sem ' + cmd)
    assert.ok(es.includes('#' + cmd), 'es sem ' + cmd)
    assert.ok(en.includes('!' + cmd), 'en sem ' + cmd)
  }
  for (const t of [pt, es, en]) {
    assert.doesNotMatch(t, /https?:|www\.|wa\.me|\.com|aurora|yosh|auto ?system|site/i)
  }
})
