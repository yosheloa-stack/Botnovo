// node test/bem-vindo-cliente.test.js
// Bem-vindo no bot da cliente: quando a pessoa que entrou não tem foto de
// perfil, vai a imagem do menu que a dona cadastrou (#fotomenu), não a arte
// da Aurora. Sem imagem do menu, só o texto.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-bv-cliente-'))
process.chdir(pasta)
process.env.AURORA_CLIENTE = '1'
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')
process.env.AURORA_MARCA = JSON.stringify({ nome: 'Bot da Ana', dono: '5511999990000', idioma: 'pt' })

const baixados = []
globalThis.fetch = async (url) => {
  baixados.push(String(url))
  return new Response(new Uint8Array([0xff, 0xd8, 0xff, 0xe0, ...new Array(64).fill(0)]), { status: 200, headers: { 'content-type': 'image/jpeg' } })
}

const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await banco.loadState()
const { sendWelcomeParticipant } = await import(path.join(raiz, 'sistema/funcoes/boasvindas.js'))

const enviados = []
const comFoto = { value: false }
const client = {
  profile: { getProfilePicture: async () => { if (comFoto.value) return { url: 'https://pps.whatsapp.net/foto-da-pessoa.jpg' }; throw new Error('sem foto') } },
  message: { send: async (jid, conteudo) => { enviados.push(conteudo) } }
}
const args = { client, config: { prefix: '#' }, groupJid: '120363000000000003@g.us', group: { bemVindo: 1, legendabv: 'Oi #numero#' }, participant: { jid: '5544911112222@s.whatsapp.net' }, action: 'add', metadata: { subject: 'G', participants: [] } }

test('sem imagem do menu e sem foto da pessoa: só texto, nada da Aurora', async () => {
  enviados.length = 0; baixados.length = 0
  await sendWelcomeParticipant(args)
  assert.equal(enviados.length, 1)
  assert.equal(enviados[0].type, 'text')
  assert.deepEqual(baixados, [])
})

test('com #fotomenu cadastrada: a imagem do menu vai no bem-vindo', async () => {
  fs.mkdirSync('sistema/menus', { recursive: true })
  const foto = path.resolve('sistema/menus/fotomenu.png')
  fs.writeFileSync(foto, 'png')
  enviados.length = 0
  await sendWelcomeParticipant(args)
  assert.equal(enviados.length, 1)
  assert.equal(enviados[0].type, 'image')
  assert.equal(enviados[0].media, foto)
  assert.match(enviados[0].caption, /Oi @5544911112222/)
})

test('pessoa com foto de perfil: continua a foto dela', async () => {
  comFoto.value = true
  enviados.length = 0; baixados.length = 0
  await sendWelcomeParticipant(args)
  assert.equal(enviados[0].type, 'image')
  assert.deepEqual(baixados, ['https://pps.whatsapp.net/foto-da-pessoa.jpg'])
  comFoto.value = false
})
