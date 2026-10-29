// node test/adm-grupo.test.js
// ADM no grupo recebia "APENAS ADMINISTRADORES" e o bot ADM dizia "BOT SEM
// ADMIN": a leitura dos membros do grupo falhava ou estava velha e o bot
// tratava todo mundo como membro comum.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-adm-grupo-'))
process.chdir(pasta)
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')

const { loadNecessarios } = await import(path.join(raiz, 'sistema/funcoes/necessarios.js'))
const { makeSystem, esquecerGrupo } = await import(path.join(raiz, 'sistema/core/contexto.js'))
await loadNecessarios()

const registry = { plugins: [], commands: new Map() }
const cfg = { prefix: '/', owner: { number: '5511999990000' }, connection: { number: '5511000000000' } }
const creds = { meJid: '5511000000000:12@s.whatsapp.net', meLid: '999:12@lid' }
// Grupo no modo @lid, como a Zapo devolve.
const membros = ({ admSender = true, admBot = true } = {}) => ({
  subject: 'AUTO SYSTEM',
  participants: [
    { jid: '111@lid', isAdmin: admSender, isSuperAdmin: false, phoneNumber: '5511222220000@s.whatsapp.net' },
    { jid: '999@lid', isAdmin: admBot, isSuperAdmin: false, phoneNumber: '5511000000000@s.whatsapp.net' }
  ]
})
const evento = (grupo) => ({ key: { id: 'M' + Math.random(), isGroup: true, remoteJid: grupo, participant: '111@lid', participantAlt: '5511222220000@s.whatsapp.net' }, message: { conversation: '/promover' }, pushName: 'TROPA' })
const cliente = (responder) => {
  const c = { consultas: 0, getCredentials: () => creds, group: { queryGroupMetadata: async () => { c.consultas++; return responder() } } }
  return c
}
const sistema = (client, grupo) => makeSystem({ client, event: evento(grupo), config: cfg, registry })
const espera = (ms) => new Promise((r) => setTimeout(r, ms))

test('ADM e bot ADM reconhecidos no grupo @lid', async () => {
  const s = await sistema(cliente(() => membros()), 'a@g.us')
  assert.equal(s.isAdmin, true)
  assert.equal(s.isBotAdmin, true)
})

test('WhatsApp lento: a resposta que chega depois do prazo fica guardada', async () => {
  const c = cliente(async () => { await espera(5_300); return membros() })
  const s1 = await sistema(c, 'lento@g.us')
  assert.equal(s1.isAdmin, false) // passou dos 5 s
  await espera(600)
  const s2 = await sistema(c, 'lento@g.us')
  assert.equal(s2.isAdmin, true)
  assert.equal(s2.isBotAdmin, true)
  assert.equal(c.consultas, 1)
})

test('leitura falhou: antes de negar, confere de novo no WhatsApp', async () => {
  let falhar = true
  const c = cliente(() => { if (falhar) throw new Error('rate-overlimit 429'); return membros() })
  const s = await sistema(c, 'falha@g.us')
  assert.equal(s.isAdmin, false)
  assert.equal(s.isBotAdmin, false)
  falhar = false
  assert.equal(await s.recarregarAdmins(), true)
  assert.equal(s.isAdmin, true)
  assert.equal(s.isBotAdmin, true)
  // E não fica consultando a cada mensagem negada.
  assert.equal(await s.recarregarAdmins(), false)
})

test('promoveu o bot: o evento do grupo faz o próximo comando ler de novo', async () => {
  let atual = membros({ admBot: false })
  const c = cliente(() => atual)
  assert.equal((await sistema(c, 'promo@g.us')).isBotAdmin, false)
  atual = membros({ admBot: true })
  assert.equal((await sistema(c, 'promo@g.us')).isBotAdmin, false) // ainda no cache
  esquecerGrupo('promo@g.us')
  assert.equal((await sistema(c, 'promo@g.us')).isBotAdmin, true)
})

test('membro comum continua sem ADM depois de conferir', async () => {
  const s = await sistema(cliente(() => membros({ admSender: false })), 'comum@g.us')
  assert.equal(s.isAdmin, false)
  await s.recarregarAdmins()
  assert.equal(s.isAdmin, false)
})
