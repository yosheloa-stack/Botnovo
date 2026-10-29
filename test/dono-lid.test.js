// node test/dono-lid.test.js
// No privado, o WhatsApp pode mandar a conversa pelo @lid (um id interno, não
// é o telefone). O número de verdade vem em remoteJidAlt. Sem ler ele, a dona
// do bot (ex.: cliente dos EUA, +1) aparecia como "Membro" no menu.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-dono-lid-'))
process.chdir(pasta)
process.env.AURORA_CLIENTE = '1'
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')
process.env.AURORA_MARCA = JSON.stringify({ nome: 'CIBER LIKES', dono: '18257503459', idioma: 'es' })

const { loadNecessarios } = await import(path.join(raiz, 'sistema/funcoes/necessarios.js'))
const { makeSystem } = await import(path.join(raiz, 'sistema/core/contexto.js'))
await loadNecessarios()

const registry = { plugins: [], commands: new Map() }
const cfg = { prefix: '/', owner: { number: '18257503459' }, connection: { number: '5511000000000' } }
const privado = (key) => ({ key: { id: 'X' + Math.random(), fromMe: false, isGroup: false, ...key }, message: { conversation: '/menu' }, pushName: 'Cibeer' })

test('dona no privado pelo @lid é reconhecida pelo número em remoteJidAlt', async () => {
  const s = await makeSystem({ client: {}, event: privado({ remoteJid: '207734512345678@lid', remoteJidAlt: '18257503459@s.whatsapp.net' }), config: cfg, registry })
  assert.equal(s.senderNumber, '18257503459')
  assert.equal(s.isOwner, true)
})

test('privado pelo número continua igual', async () => {
  const s = await makeSystem({ client: {}, event: privado({ remoteJid: '18257503459@s.whatsapp.net', remoteJidAlt: '207734512345678@lid' }), config: cfg, registry })
  assert.equal(s.senderNumber, '18257503459')
  assert.equal(s.isOwner, true)
})

test('outra pessoa pelo @lid continua membro', async () => {
  const s = await makeSystem({ client: {}, event: privado({ remoteJid: '209999999999999@lid', remoteJidAlt: '5511977776666@s.whatsapp.net' }), config: cfg, registry })
  assert.equal(s.senderNumber, '5511977776666')
  assert.equal(s.isOwner, false)
})

test('no grupo o remetente continua vindo do participante', async () => {
  const ev = { key: { id: 'G1', fromMe: false, isGroup: true, remoteJid: '120363000000000000@g.us', participant: '207734512345678@lid', participantAlt: '18257503459@s.whatsapp.net' }, message: { conversation: '/menu' }, pushName: 'Cibeer' }
  const client = { group: { queryGroupMetadata: async () => ({ subject: 'G', participants: [] }) } }
  const s = await makeSystem({ client, event: ev, config: cfg, registry })
  assert.equal(s.senderNumber, '18257503459')
  assert.equal(s.isOwner, true)
})
