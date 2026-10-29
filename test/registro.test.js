// node test/registro.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { criarLoggerZapo, carimbo, instalarHorario } from '../sistema/funcoes/registro.js'

function saida() {
  const linhas = []
  const s = { linhas }
  for (const nivel of ['log', 'warn', 'error']) s[nivel] = (...args) => linhas.push({ nivel, texto: args.join(' ') })
  return s
}

// Relógio de mentira: cada teste anda o tempo na mão.
function relogio(inicio = 1_000_000) {
  let t = inicio
  const agora = () => t
  agora.andar = (ms) => { t += ms }
  return agora
}

test('queda rápida do WhatsApp (as linhas de JSON) não sai na hora: cada queda vira 1 oscilação no resumo', () => {
  const out = saida()
  const agora = relogio()
  const log = criarLoggerZapo({ saida: out, agora, timer: false })
  log.warn('received stream:error with code', { code: 503 })
  log.warn('socket runtime error event')
  log.warn('socket runtime error', { message: 'websocket runtime error' })
  assert.equal(out.linhas.length, 0)
  agora.andar(3.5 * 60_000)
  log.warn('socket runtime error event')
  log.warn('socket runtime error', { message: 'websocket runtime error' })
  log.resumir()
  assert.equal(out.linhas.length, 1)
  assert.equal(out.linhas[0].nivel, 'log')
  assert.match(out.linhas[0].texto, /^\[ AURORA CONEXÃO \] .*2 oscilações rápidas/)
  assert.doesNotMatch(out.linhas[0].texto, /[{}]/)
})

test('resumo sem nada pra contar não escreve nada', () => {
  const out = saida()
  const log = criarLoggerZapo({ saida: out, agora: relogio(), timer: false })
  log.resumir()
  assert.equal(out.linhas.length, 0)
})

test('reenvio de mensagem que expirou também entra no resumo, não sai solto', () => {
  const out = saida()
  const log = criarLoggerZapo({ saida: out, agora: relogio(), timer: false })
  log.warn('placeholder resend: request failed', { batchSize: 1, message: 'peer data operation timed out after 120000ms (id=3EB0)' })
  assert.equal(out.linhas.length, 0)
  log.resumir()
  assert.equal(out.linhas.length, 1)
  assert.match(out.linhas[0].texto, /1 pedido de reenvio/)
})

test('o resumo zera depois de escrito', () => {
  const out = saida()
  const log = criarLoggerZapo({ saida: out, agora: relogio(), timer: false })
  log.warn('socket runtime error event')
  log.resumir()
  log.resumir()
  assert.equal(out.linhas.length, 1)
  assert.match(out.linhas[0].texto, /1 oscilação rápida/)
})

test('aviso de verdade sai na hora, numa linha legível (sem JSON)', () => {
  const out = saida()
  const log = criarLoggerZapo({ saida: out, agora: relogio(), timer: false })
  log.warn('received stream:error replaced, stopping client')
  log.error('noise handshake failed', { message: 'bad mac' })
  log.warn('received stream:error with code', { code: 401 })
  assert.deepEqual(out.linhas.map((l) => l.nivel), ['warn', 'error', 'warn'])
  assert.equal(out.linhas[0].texto, '[ AURORA WHATSAPP ] Aviso: received stream:error replaced, stopping client')
  assert.equal(out.linhas[1].texto, '[ AURORA WHATSAPP ] Erro: noise handshake failed (message: bad mac)')
  assert.equal(out.linhas[2].texto, '[ AURORA WHATSAPP ] Aviso: received stream:error with code (code: 401)')
})

test('o mesmo aviso repetido sai no máximo 1 vez por minuto, contando as repetições', () => {
  const out = saida()
  const agora = relogio()
  const log = criarLoggerZapo({ saida: out, agora, timer: false })
  log.warn('socket open failed', { message: 'ECONNREFUSED' })
  log.warn('socket open failed', { message: 'ECONNREFUSED' })
  log.warn('socket open failed', { message: 'ECONNREFUSED' })
  assert.equal(out.linhas.length, 1)
  agora.andar(61_000)
  log.warn('socket open failed', { message: 'ECONNREFUSED' })
  assert.equal(out.linhas.length, 2)
  assert.match(out.linhas[1].texto, /\(\+2 vezes desde o último aviso\)$/)
})

test('trace/debug/info do Zapo não aparecem; child usa a mesma contagem', () => {
  const out = saida()
  const log = criarLoggerZapo({ saida: out, agora: relogio(), timer: false })
  assert.equal(log.level, 'warn')
  log.info('socket opened')
  log.debug('x')
  log.trace('y')
  const filho = log.child({ module: 'comms' })
  filho.warn('socket runtime error event')
  assert.equal(out.linhas.length, 0)
  log.resumir()
  assert.match(out.linhas[0].texto, /1 oscilação rápida/)
})

test('carimbo usa a hora de Brasília', () => {
  // 2026-10-29 10:03:05 UTC = 07:03:05 em Brasília
  assert.equal(carimbo(new Date(Date.UTC(2026, 9, 29, 10, 3, 5))), '29/10 07:03:05')
})

test('instalarHorario põe data e hora só nas linhas com etiqueta [ ... ]', () => {
  const out = saida()
  const quando = new Date(Date.UTC(2026, 9, 29, 10, 3, 5))
  instalarHorario(out, { agora: () => quando })
  instalarHorario(out, { agora: () => quando }) // de novo não duplica
  out.log('[ AURORA CONEXÃO ] WhatsApp conectado')
  out.warn('\x1b[31m[ ERRO ]\x1b[39m Falha no stream:', 'x')
  out.log('        ✓ Conectado com sucesso')
  out.error(new Error('boom'))
  assert.equal(out.linhas[0].texto, '29/10 07:03:05 [ AURORA CONEXÃO ] WhatsApp conectado')
  assert.equal(out.linhas[1].texto, '29/10 07:03:05 \x1b[31m[ ERRO ]\x1b[39m Falha no stream: x')
  assert.equal(out.linhas[2].texto, '        ✓ Conectado com sucesso')
  assert.equal(out.linhas.length, 4)
})

test('bot de cliente não desenha o logo nem o banner: as linhas iam uma por uma pro terminal da casa', async () => {
  const { showStart, showConnected, showPairing } = await import('../sistema/funcoes/terminal.js')
  const out = saida()
  showStart({ cliente: true, saida: out })
  showConnected({ cliente: true, saida: out })
  assert.equal(out.linhas.length, 0)
  showPairing('ABCD1234', { cliente: true, saida: out })
  assert.deepEqual(out.linhas.map((l) => l.texto), ['[ AURORA CONEXÃO ] Código de pareamento: ABCD-1234'])
})

test('bot da casa: código de pareamento numa linha só, com etiqueta (ganha o horário)', async () => {
  const { showPairing } = await import('../sistema/funcoes/terminal.js')
  const out = saida()
  showPairing('N2K61JHJ', { cliente: false, saida: out })
  assert.equal(out.linhas.length, 1)
  const texto = out.linhas[0].texto.replace(/\x1b\[[0-9;]*m/g, '')
  assert.match(texto, /^\[ AURORA CONEXÃO \] Código de pareamento: N2K6-1JHJ/)
})

test('falha no código de pareamento: o Zapo não repete o erro (o bot já explica numa linha)', () => {
  const out = saida()
  const log = criarLoggerZapo({ saida: out, agora: relogio(), timer: false })
  log.error('wa auth client error', { message: 'companion hello iq failed (429: rate-overlimit)' })
  log.error('wa client error', { message: 'companion hello iq failed (429: rate-overlimit)' })
  assert.equal(out.linhas.length, 0)
})

test('o mesmo erro contado por duas partes do Zapo sai uma vez só', () => {
  const out = saida()
  const agora = relogio()
  const log = criarLoggerZapo({ saida: out, agora, timer: false })
  log.error('wa auth client error', { message: 'bad thing' })
  log.error('wa client error', { message: 'bad thing' })
  assert.equal(out.linhas.length, 1)
  agora.andar(61_000)
  log.error('wa client error', { message: 'bad thing' })
  assert.equal(out.linhas.length, 2)
})

test('texto da falha do pareamento: 429 vira explicação em português', async () => {
  const { motivoPareamento } = await import('../sistema/funcoes/terminal.js')
  assert.match(motivoPareamento('companion hello iq failed (429: rate-overlimit)'), /pedidos de código demais.*espere/i)
  assert.equal(motivoPareamento('outra coisa'), 'outra coisa')
})

test('bot da casa continua com o logo e o banner', async () => {
  const { showStart, showConnected } = await import('../sistema/funcoes/terminal.js')
  const out = saida()
  showStart({ cliente: false, saida: out })
  showConnected({ cliente: false, saida: out })
  assert.ok(out.linhas.some((l) => l.texto.includes('S Y S T E M')))
  assert.ok(out.linhas.some((l) => l.texto.includes('Conectado com sucesso')))
})
