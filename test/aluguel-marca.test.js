// node test/aluguel-marca.test.js
// Usa um banco temporário (o bot abre sistema/dados/dados.db relativo à pasta
// atual), então roda numa pasta vazia e não toca no banco do repositório.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-teste-')))
const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
const { installMarcaAluguel, marcaDoGrupo } = await import(path.join(raiz, 'sistema/funcoes/marcaAluguel.js'))

const GRUPO = '120363000000000001@g.us'
const OUTRO = '120363000000000002@g.us'
banco.setAluguel(GRUPO, 30)
banco.setDonoAluguel(GRUPO, '5511999998888')
banco.setPersonalizacaoAluguel(GRUPO, { nome: 'Kira Bot' })

function clienteFalso() {
  const enviados = []
  const client = { message: { send: async (jid, content, options) => { enviados.push({ jid, content, options }); return { id: 'x' } } } }
  installMarcaAluguel(client)
  return { client, enviados }
}

test('marca só existe em grupo com aluguel ativo', () => {
  assert.deepEqual(marcaDoGrupo(GRUPO), { nome: 'Kira Bot', dono: '5511999998888', idioma: 'pt' })
  assert.equal(marcaDoGrupo(OUTRO), null)
  assert.equal(marcaDoGrupo('5511999998888@s.whatsapp.net'), null)
})

test('todo envio ao grupo alugado sai com a marca do cliente e menciona o dono', async () => {
  const { client, enviados } = clienteFalso()
  await client.message.send(GRUPO, { type: 'text', text: '┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕\n┃╎୨୧ ᴅᴇᴠ: YoshiGGX' }, { mentions: ['1@s.whatsapp.net'] })
  const [e] = enviados
  assert.equal(e.content.text, '┣━〔 • 𝑲𝑰𝑹𝑨 𝑩𝑶𝑻 • 💚 〕\n┃╎୨୧ ᴅᴏɴᴏ: @5511999998888')
  assert.deepEqual(e.options.mentions, ['1@s.whatsapp.net', '5511999998888@s.whatsapp.net'])
})

test('grupo sem aluguel (do dono do bot) continua Aurora', async () => {
  const { client, enviados } = clienteFalso()
  await client.message.send(OUTRO, { type: 'text', text: 'Aurora System • Dev: YoshiGGX' })
  assert.equal(enviados[0].content.text, 'Aurora System • Dev: YoshiGGX')
})

test('selo verificado (vcard falso) também troca o nome; quote real do usuário não é mexido', async () => {
  const { client, enviados } = clienteFalso()
  const selo = { key: { remoteJid: 'status@broadcast', id: 'AURORA-VERIFICADO' }, pushName: 'Aurora System', message: { contactMessage: { displayName: 'Aurora System', vcard: 'FN:Aurora System' } } }
  await client.message.send(GRUPO, { type: 'text', text: 'ok' }, { quote: selo })
  assert.equal(enviados[0].options.quote.pushName, 'Kira Bot')
  assert.equal(enviados[0].options.quote.message.contactMessage.vcard, 'FN:Kira Bot')
  assert.equal(enviados[0].options.quote.key.id, 'AURORA-VERIFICADO')
  const real = { key: { remoteJid: GRUPO, id: 'ABC' }, message: { conversation: 'fala aurora' } }
  await client.message.send(GRUPO, { type: 'text', text: 'ok' }, { quote: real })
  assert.equal(enviados[1].options.quote, real)
})

test('aluguel encerrado volta ao normal', async () => {
  const VENCIDO = '120363000000000003@g.us'
  banco.setAluguel(VENCIDO, 1)
  banco.delAluguel(VENCIDO)
  assert.equal(marcaDoGrupo(VENCIDO), null)
})

test('autolike: o grupo alugado só enxerga os IDs cadastrados nele', () => {
  banco.addAutolikeGrupo(GRUPO, '123456789')
  banco.addAutolikeGrupo(GRUPO, '123456789')
  banco.addAutolikeGrupo(GRUPO, ' 987654321 ')
  assert.deepEqual(banco.autolikesDoGrupo(GRUPO), ['123456789', '987654321'])
  assert.deepEqual(banco.autolikesDoGrupo(OUTRO), [])
  banco.delAutolikeGrupo(GRUPO, '123456789')
  assert.deepEqual(banco.autolikesDoGrupo(GRUPO), ['987654321'])
})
