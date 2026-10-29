// node test/aurora-whats.test.js
// A Aurora no handler de verdade: citar uma mensagem do bot (pelo número ou
// pelo LID), marcar o bot ou falar "aurora" chama ela; comando continua sendo
// comando. O gateway da Square Cloud é falso (fetch trocado).
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-ia-')))
process.env.AURORA_CLIENTE = ''
process.env.SQUARECLOUD_API_KEY = 'chave-de-teste'

const pedidosIa = []
globalThis.fetch = async (url, opcoes = {}) => {
  if (String(url).includes('/v2/ai/chat/completions')) {
    pedidosIa.push(JSON.parse(opcoes.body))
    return new Response(JSON.stringify({ choices: [{ finish_reason: 'stop', message: { content: 'oi, tô aqui 😌' } }] }), { status: 200 })
  }
  return new Response('{}', { status: 404 })
}

const { loadState } = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await loadState()
const { createHandler } = await import(path.join(raiz, 'sistema/core/handler.js'))
const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
// Os 5 s entre chamadas são do plano da Square Cloud; aqui não precisa esperar.
const { LIMITES } = await import(path.join(raiz, 'sistema/funcoes/aurora/ia.js'))
LIMITES.intervaloMs = 20

const BOT = '5567981517686'
const BOT_LID = '99887766554433'
const GRUPO = '120363000000000001@g.us'
const enviados = []
const estados = []
const client = {
  getCredentials: () => ({ meJid: `${BOT}:3@s.whatsapp.net`, meLid: `${BOT_LID}:3@lid` }),
  group: { queryGroupMetadata: async () => ({ subject: 'Teste', participants: [
    { jid: `${BOT}@s.whatsapp.net`, isAdmin: true },
    { jid: '5544911112222@s.whatsapp.net' }
  ] }) },
  message: { send: async (jid, conteudo, opcoes) => { enviados.push({ jid, conteudo, opcoes }) } },
  presence: { sendChatstate: async (jid, { state }) => { estados.push(state) } }
}
const config = { prefix: '#', owner: { number: '5544900000000' }, connection: { number: BOT }, autoSystem: { url: 'https://autolikesystem.com.br' } }
const handler = createHandler({ client, config, registry: { commands: new Map(), plugins: [] } })

let n = 0
function mensagem(texto, contextInfo) {
  n++
  return {
    key: { id: 'MSG' + n, remoteJid: GRUPO, participant: '5544911112222@s.whatsapp.net', fromMe: false },
    pushName: 'Yosh',
    message: contextInfo ? { extendedTextMessage: { text: texto, contextInfo } } : { conversation: texto }
  }
}
async function respostaDe(evento, esperaMs = 6000) {
  const antes = enviados.length
  await handler(evento)
  const fim = Date.now() + esperaMs
  while (enviados.length === antes && Date.now() < fim) await new Promise((r) => setTimeout(r, 50))
  return enviados.slice(antes)
}
const citandoBot = (participant) => ({ stanzaId: 'BOTMSG', participant, quotedMessage: { conversation: 'Só cola aqui o número do ID do jogador' } })

test('responder (citar) a mensagem do bot pelo LID chama a Aurora, mesmo só com número', async () => {
  const saiu = await respostaDe(mensagem('123456789', citandoBot(`${BOT_LID}@lid`)))
  assert.equal(saiu.length, 1)
  assert.equal(saiu[0].conteudo.text, 'oi, tô aqui 😌')
  assert.equal(saiu[0].opcoes.quote?.key?.id, 'MSG' + n, 'responde citando quem falou')
  assert.deepEqual(estados.slice(0, 1), ['composing'])
  const ultimo = pedidosIa.at(-1)
  assert.equal(ultimo.model, 'cubic')
  assert.match(ultimo.messages.at(-1).content, /\[Yosh\] 123456789\n\(respondendo a: "Só cola aqui/)
})

test('citar pelo número, marcar o bot e falar "aurora" no meio também chamam', async () => {
  for (const evento of [
    mensagem('e aí', citandoBot(`${BOT}@s.whatsapp.net`)),
    mensagem('@bot fala comigo', { mentionedJid: [`${BOT_LID}@lid`] }),
    mensagem('Aqui id Aurora 8123124352')
  ]) assert.equal((await respostaDe(evento)).length, 1, evento.message.conversation || evento.message.extendedTextMessage.text)
})

test('conversa do grupo e comando não chamam a Aurora', async () => {
  const antes = pedidosIa.length
  assert.equal((await respostaDe(mensagem('bom dia grupo'), 300)).length, 0)
  await respostaDe(mensagem('#comandoquenaoexiste aurora'), 300)
  assert.equal(pedidosIa.length, antes)
})

test('admin desligou no grupo: ela fica quieta', async () => {
  banco.auroraNoGrupo(GRUPO, 0)
  const antes = pedidosIa.length
  assert.equal((await respostaDe(mensagem('aurora oi'), 300)).length, 0)
  assert.equal(pedidosIa.length, antes)
  banco.auroraNoGrupo(GRUPO, 1)
})
