// node test/mutar.test.js
// /mutar: antes só fazia o bot ignorar a pessoa, a mensagem dela ficava no
// grupo. Agora o bot (sendo ADM) apaga toda mensagem de quem foi mutado —
// inclusive se a pessoa for ADM. Sem ADM, avisa o grupo uma vez.
// E o ">" solto que aparecia quebrado no meio das mensagens do bot some.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-mutar-')))
process.env.AURORA_CLIENTE = ''

const { loadState, db } = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await loadState()
const { createHandler } = await import(path.join(raiz, 'sistema/core/handler.js'))
const { installMarcaAluguel } = await import(path.join(raiz, 'sistema/funcoes/marcaAluguel.js'))
const mutar = (await import(path.join(raiz, 'sistema/comandos/adm/mutar.js'))).default
const desmutar = (await import(path.join(raiz, 'sistema/comandos/adm/desmutar.js'))).default

const BOT = '5567981517686'
const DONO = '5544900000000'
const G = '120363412445963495@g.us' // bot é ADM
const G_SEM_ADM = '120363412445963496@g.us' // bot não é ADM
const FAMAS_LID = '77665544332211@lid'
const FAMAS_PN = '5544933334444@s.whatsapp.net'
const ADM_LID = '11112222333344@lid'
const ADM_PN = '5544955556666@s.whatsapp.net'

const participantes = (botAdm) => [
  { jid: `${BOT}@s.whatsapp.net`, isAdmin: botAdm },
  { jid: `${DONO}@s.whatsapp.net`, isAdmin: true },
  { jid: FAMAS_LID, phoneNumber: FAMAS_PN, displayName: 'FAMAS TM FF' },
  { jid: ADM_LID, phoneNumber: ADM_PN, isAdmin: true },
  { jid: '5544977778888@s.whatsapp.net' }
]
const enviados = []
const client = {
  getCredentials: () => ({ meJid: `${BOT}:3@s.whatsapp.net`, meLid: `99887766554433:3@lid` }),
  group: { queryGroupMetadata: async (jid) => ({ subject: 'GUILDA', participants: participantes(jid === G) }) },
  message: { send: async (jid, conteudo, opcoes) => { enviados.push({ jid, conteudo, opcoes }) } },
  presence: { sendChatstate: async () => {} },
  profile: { getLidsByPhoneNumbers: async () => [] }
}
installMarcaAluguel(client)
const config = { prefix: '/', owner: { number: DONO }, connection: { number: BOT } }
const comandos = new Map([['mutar', mutar], ['desmutar', desmutar]])
const handler = createHandler({ client, config, registry: { commands: comandos, plugins: [] } })

let n = 0
const msg = (grupo, quem, texto, mencoes) => ({
  key: { id: 'M' + (++n), remoteJid: grupo, participant: quem, fromMe: false },
  pushName: 'Teste',
  message: mencoes
    ? { extendedTextMessage: { text: texto, contextInfo: { mentionedJid: mencoes } } }
    : { conversation: texto }
})
const apagou = (id) => enviados.some((e) => e.conteudo?.type === 'revoke' && e.conteudo?.target?.key?.id === id)
const textos = () => enviados.filter((e) => e.conteudo?.type !== 'revoke').map((e) => e.conteudo?.text || e.conteudo || '')

test('/mutar guarda a pessoa por número e por LID', async () => {
  await handler(msg(G, `${DONO}@s.whatsapp.net`, '/mutar @FAMAS', [FAMAS_LID]))
  const lista = db().muted[G] || []
  assert.ok(lista.includes('5544933334444'), JSON.stringify(lista))
  assert.ok(lista.includes(FAMAS_LID), JSON.stringify(lista))
})

test('mensagem de quem foi mutado é apagada (pelo LID ou pelo número)', async () => {
  enviados.length = 0
  const a = msg(G, FAMAS_LID, 'Sua feia')
  await handler(a)
  assert.ok(apagou(a.key.id), 'apagou a mensagem vinda pelo LID')
  const b = msg(G, FAMAS_PN, 'oi de novo')
  await handler(b)
  assert.ok(apagou(b.key.id), 'apagou a mensagem vinda pelo número')
  assert.deepEqual(textos(), [], 'não manda texto nenhum no grupo')
})

test('comando de quem foi mutado também some e não roda', async () => {
  enviados.length = 0
  const c = msg(G, FAMAS_LID, '/desmutar @FAMAS', [FAMAS_LID])
  await handler(c)
  assert.ok(apagou(c.key.id))
  assert.ok((db().muted[G] || []).includes(FAMAS_LID), 'continua mutado')
})

test('quem não está mutado não é apagado', async () => {
  enviados.length = 0
  const d = msg(G, '5544977778888@s.whatsapp.net', 'bom dia')
  await handler(d)
  assert.equal(apagou(d.key.id), false)
})

test('ADM mutado também tem a mensagem apagada', async () => {
  await handler(msg(G, `${DONO}@s.whatsapp.net`, '/mutar @adm', [ADM_LID]))
  enviados.length = 0
  const e = msg(G, ADM_LID, 'sou adm')
  await handler(e)
  assert.ok(apagou(e.key.id))
})

test('/desmutar volta ao normal', async () => {
  await handler(msg(G, `${DONO}@s.whatsapp.net`, '/desmutar @FAMAS', [FAMAS_LID]))
  enviados.length = 0
  const f = msg(G, FAMAS_LID, 'voltei')
  await handler(f)
  assert.equal(apagou(f.key.id), false)
})

test('bot sem ADM: avisa o grupo uma vez que precisa de ADM para apagar', async () => {
  await handler(msg(G_SEM_ADM, `${DONO}@s.whatsapp.net`, '/mutar @FAMAS', [FAMAS_LID]))
  const resposta = textos().at(-1)
  assert.match(resposta, /ADM/i, 'a confirmação do /mutar avisa que precisa de ADM')
  enviados.length = 0
  await handler(msg(G_SEM_ADM, FAMAS_LID, 'um'))
  await handler(msg(G_SEM_ADM, FAMAS_LID, 'dois'))
  const avisos = textos()
  assert.equal(avisos.length, 1, JSON.stringify(avisos))
  assert.match(avisos[0], /ADM/i)
  assert.equal(enviados.some((e) => e.conteudo?.type === 'revoke'), false)
})

test('mensagem do /mutar não tem ">" solto quebrando o layout', async () => {
  enviados.length = 0
  await handler(msg(G, `${DONO}@s.whatsapp.net`, '/mutar @FAMAS', [FAMAS_LID]))
  const texto = textos().at(-1)
  assert.match(texto, /mutado/i)
  assert.match(texto, /ᴀᴄ̧ᴀ̃ᴏ ᴅᴇ/)
  for (const linha of texto.split('\n')) assert.notEqual(linha.trim(), '>', 'linha com ">" sozinho')
})

test('qualquer envio do bot: linha só com ">" é tirada, o resto fica igual', async () => {
  enviados.length = 0
  await client.message.send(G, { type: 'text', text: 'Título\n•\n> linha 1\n>\n> linha 2\n > \n> fim' })
  await client.message.send(G, 'a\n>\nb')
  await client.message.send(G, { type: 'image', media: 'x.jpg', caption: '> um\n>\n> dois' })
  assert.equal(enviados[0].conteudo.text, 'Título\n•\n> linha 1\n> linha 2\n> fim')
  assert.equal(enviados[1].conteudo, 'a\nb')
  assert.equal(enviados[2].conteudo.caption, '> um\n> dois')
})
