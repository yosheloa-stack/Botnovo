// node test/anti-spam-menu.test.js
// Anti-spam do menu: no grupo "Likes gratis RK" a mesma pessoa mandou #menu 5
// vezes em 3 minutos e o bot mandou a imagem do menu 5 vezes. Agora o mesmo
// menu não volta pro grupo em menos de 1 minuto, nem pra mesma pessoa em menos
// de 5 minutos; quem repete recebe um aviso curto uma vez e depois o bot fica
// quieto. Os outros comandos (#like, #info...) não mudam.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-anti-spam-menu-')))
process.env.AURORA_CLIENTE = ''

const spam = await import(path.join(raiz, 'sistema/funcoes/antiSpamMenu.js'))
const { controleMenu, desfazerMenu, limparAntiSpamMenu, ANTI_SPAM_MENU } = spam

const MIN = 60_000
const G = '120363431934983925@g.us'
const G2 = '120363000000000099@g.us'

test('ignora o que não é menu', () => {
  limparAntiSpamMenu()
  for (const comando of ['like', 'info', 'fechar', 'black', '']) {
    assert.equal(controleMenu({ comando, grupo: G, remetente: 'a', agora: 0 }), null, comando)
  }
})

test('log real: 5x #menu da mesma pessoa a cada ~45 s vira 1 menu + 1 aviso', () => {
  limparAntiSpamMenu()
  // 11:06:19, 11:07:07, 11:07:56, 11:08:42, 11:09:33 (em segundos desde 11:06:19)
  const tempos = [0, 48, 97, 143, 194].map((s) => s * 1000)
  const acoes = tempos.map((agora) => controleMenu({ comando: 'menu', grupo: G, remetente: '5355718620', agora }).acao)
  assert.deepEqual(acoes, ['enviar', 'avisar', 'ignorar', 'ignorar', 'ignorar'])
  // Depois de 5 minutos a pessoa pode pedir de novo.
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: '5355718620', agora: 5 * MIN + 1 }).acao, 'enviar')
})

test('outra pessoa no mesmo grupo logo depois: aviso; depois de 1 min: menu', () => {
  limparAntiSpamMenu()
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'a', agora: 0 }).acao, 'enviar')
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'b', agora: 20_000 }).acao, 'avisar')
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'b', agora: 30_000 }).acao, 'ignorar')
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'c', agora: MIN + 1 }).acao, 'enviar')
})

test('grupos diferentes e menus diferentes não se bloqueiam', () => {
  limparAntiSpamMenu()
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'a', agora: 0 }).acao, 'enviar')
  assert.equal(controleMenu({ comando: 'menu', grupo: G2, remetente: 'b', agora: 1000 }).acao, 'enviar')
  assert.equal(controleMenu({ comando: 'menuff', grupo: G, remetente: 'a', agora: 2000 }).acao, 'enviar')
  assert.equal(controleMenu({ comando: 'menuadm', grupo: G, remetente: 'b', agora: 3000 }).acao, 'enviar')
})

test('apelidos do menu principal contam como o mesmo menu', () => {
  limparAntiSpamMenu()
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'a', agora: 0 }).acao, 'enviar')
  for (const comando of ['help', 'menuprincipal', 'list', 'menus', 'menú']) {
    assert.notEqual(controleMenu({ comando, grupo: G, remetente: 'a', agora: 1000 }).acao, 'enviar', comando)
  }
})

test('dono do bot nunca é barrado', () => {
  limparAntiSpamMenu()
  for (let i = 0; i < 4; i++) {
    assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'dono', dono: true, agora: i * 1000 }).acao, 'enviar')
  }
})

test('no privado vale só o limite da pessoa', () => {
  limparAntiSpamMenu()
  assert.equal(controleMenu({ comando: 'menu', grupo: '', remetente: 'a', agora: 0 }).acao, 'enviar')
  assert.equal(controleMenu({ comando: 'menu', grupo: '', remetente: 'b', agora: 1000 }).acao, 'enviar')
  assert.equal(controleMenu({ comando: 'menu', grupo: '', remetente: 'a', agora: 2000 }).acao, 'avisar')
})

test('se o envio do menu falhar, a pessoa pode tentar de novo na hora', () => {
  limparAntiSpamMenu()
  const r = controleMenu({ comando: 'menu', grupo: G, remetente: 'a', agora: 0 })
  assert.equal(r.acao, 'enviar')
  desfazerMenu(r)
  assert.equal(controleMenu({ comando: 'menu', grupo: G, remetente: 'a', agora: 1000 }).acao, 'enviar')
})

test('memória não cresce sem limite', () => {
  limparAntiSpamMenu()
  for (let i = 0; i < 20_000; i++) controleMenu({ comando: 'menu', grupo: 'g' + i + '@g.us', remetente: 'p' + i, agora: i })
  assert.ok(spam.tamanhoAntiSpamMenu() <= ANTI_SPAM_MENU.maxEntradas * 3, String(spam.tamanhoAntiSpamMenu()))
})

// ---- No handler de verdade ----
const { loadState } = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await loadState()
const { createHandler } = await import(path.join(raiz, 'sistema/core/handler.js'))

const BOT = '5567981517686'
const enviados = []
const client = {
  getCredentials: () => ({ meJid: `${BOT}:3@s.whatsapp.net`, meLid: `99887766554433:3@lid` }),
  group: { queryGroupMetadata: async () => ({ subject: 'Likes gratis RK', participants: [
    { jid: `${BOT}@s.whatsapp.net`, isAdmin: true },
    { jid: '5355718620@s.whatsapp.net' },
    { jid: '573187091501@s.whatsapp.net' }
  ] }) },
  message: { send: async (jid, conteudo, opcoes) => { enviados.push({ jid, conteudo, opcoes }) } },
  presence: { sendChatstate: async () => {} },
  profile: { getLidsByPhoneNumbers: async () => [] }
}
const config = { prefix: '#', owner: { number: '5544900000000' }, connection: { number: BOT } }
const rodou = []
const menuPlugin = { name: 'menu', aliases: ['help', 'menuprincipal'], async run(system) { rodou.push(system.command); await system.reply('MENU') } }
const likePlugin = { name: 'like', async run(system) { rodou.push('like'); await system.reply('LIKE') } }
const comandos = new Map([['menu', menuPlugin], ['help', menuPlugin], ['menuprincipal', menuPlugin], ['like', likePlugin]])
const handler = createHandler({ client, config, registry: { commands: comandos, plugins: [] } })

let n = 0
const msg = (texto, quem) => ({
  key: { id: 'M' + (++n), remoteJid: G, participant: quem + '@s.whatsapp.net', fromMe: false },
  pushName: 'Daikel',
  message: { conversation: texto }
})

test('handler: #menu repetido manda o menu 1 vez, avisa 1 vez e depois fica quieto; #like segue normal', async () => {
  limparAntiSpamMenu()
  rodou.length = 0
  enviados.length = 0
  for (let i = 0; i < 5; i++) await handler(msg('#menu', '5355718620'))
  assert.deepEqual(rodou, ['menu'], 'o menu só rodou uma vez')
  assert.equal(enviados.length, 2, 'menu + 1 aviso')
  assert.equal(enviados[0].conteudo.text, 'MENU')
  assert.match(enviados[1].conteudo.text, /menu/i)
  assert.equal(enviados[1].opcoes?.quote?.key?.id, 'M2', 'o aviso responde a 2ª mensagem')

  for (let i = 0; i < 3; i++) await handler(msg('#like 123456789', '5355718620'))
  assert.deepEqual(rodou, ['menu', 'like', 'like', 'like'], '#like não é afetado')
})
