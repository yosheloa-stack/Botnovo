// node test/recursos.test.js — medição de CPU, RAM e mensagens do bot de cliente (11/11).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { criarMedidor } from '../sistema/funcoes/recursos.js'
test('medidor', () => {
  let t = 1_000_000, c = { user: 0, system: 0 }
  const m = criarMedidor({ agora: () => t, cpu: () => c, rss: () => 128 * 1048576, cores: () => 2 })
  m.recebeu(); m.recebeu(); m.enviou()
  t += 60_000; c = { user: 600_000, system: 600_000 }
  assert.deepEqual(m.medir(), { modo: 'processo', cpu_pct: 1, ram_mb: 128, nucleos: 2, uptime_s: 60, msgs_in: 2, msgs_out: 1 })
  assert.deepEqual(m.medir().msgs_in, 0)
})
