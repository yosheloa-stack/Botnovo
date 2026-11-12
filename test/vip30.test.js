// node test/vip30.test.js
// VIP dura 30 dias: addvip dá/renova, venceu sai sozinho, VIP antigo ganha 30 dias.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-vip-')))
process.env.AURORA_CLIENTE = ''
const banco = await import('../sistema/funcoes/banco.js')
await banco.loadState()

test('VIP dura 30 dias e vence sozinho', () => {
  const dia = 86400000
  banco.darVip('5511999')
  const ate = banco.db().vipAte['5511999']
  assert.ok(ate > Date.now() + 29 * dia && ate <= Date.now() + 30 * dia)
  assert.equal(banco.vencerVips(), false)
  assert.ok(banco.db().vip.includes('5511999'))
  banco.db().vipAte['5511999'] = Date.now() - 1
  assert.equal(banco.vencerVips(), true)
  assert.ok(!banco.db().vip.includes('5511999'))
})

test('tirarVip remove na hora e dados salvos têm teto de 30 dias', async () => {
  banco.darVip('1'); banco.db().vipAte['1'] = Date.now() + 999 * 86400000
  banco.saveState()
  const r = banco.sql.prepare('SELECT ate FROM vip WHERE user=?').get('1')
  assert.ok(r.ate <= Date.now() + 30 * 86400000)
  banco.tirarVip('1')
  assert.ok(!banco.db().vip.includes('1'))
})
