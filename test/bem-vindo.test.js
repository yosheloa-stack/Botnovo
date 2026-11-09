// node test/bem-vindo.test.js
// Bem-vindo no bot da casa: quando a pessoa que entrou não tem foto de perfil,
// o bot usava a imagem padrão (arte da Aurora) — inclusive em grupo alugado,
// onde não pode aparecer nada da Aurora. Agora, em grupo alugado, vai a foto
// do menu que o cliente cadastrou; sem ela, só o texto. Grupo da casa segue
// com a imagem padrão.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-bv-')))
process.env.AURORA_CLIENTE = ''

const baixados = []
globalThis.fetch = async (url) => {
  baixados.push(String(url))
  return new Response(new Uint8Array([0xff, 0xd8, 0xff, 0xe0, ...new Array(64).fill(0)]), { status: 200, headers: { 'content-type': 'image/jpeg' } })
}

const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await banco.loadState()
const { sendWelcomeParticipant } = await import(path.join(raiz, 'sistema/funcoes/boasvindas.js'))

const AVATAR_AURORA = JSON.parse(fs.readFileSync(path.join(raiz, 'sistema/dados/links.json'), 'utf8')).avatarPadrao
const enviados = []
const clientSemFoto = {
  profile: { getProfilePicture: async () => { throw new Error('sem foto') } },
  message: { send: async (jid, conteudo) => { enviados.push(conteudo) } }
}
const base = { client: clientSemFoto, config: { prefix: '#' }, participant: { jid: '5544911112222@s.whatsapp.net' }, action: 'add', metadata: { subject: 'Grupo', participants: [] } }
const grupo = { bemVindo: 1, legendabv: 'Bem-vindo #numero#' }

test('grupo da casa: sem foto da pessoa, continua a imagem padrão', async () => {
  enviados.length = 0; baixados.length = 0
  await sendWelcomeParticipant({ ...base, groupJid: '120363000000000001@g.us', group: grupo })
  assert.equal(enviados.length, 1)
  assert.equal(enviados[0].type, 'image')
  assert.deepEqual(baixados, [AVATAR_AURORA])
})

test('grupo alugado sem foto do menu: nada da Aurora, vai só o texto', async () => {
  const gp = '120363000000000002@g.us'
  banco.setAluguel(gp, 30)
  enviados.length = 0; baixados.length = 0
  await sendWelcomeParticipant({ ...base, groupJid: gp, group: grupo })
  assert.equal(enviados.length, 1)
  assert.equal(enviados[0].type, 'text')
  assert.match(enviados[0].text, /Bem-vindo @5544911112222/)
  assert.ok(!baixados.includes(AVATAR_AURORA), 'não baixou a imagem da Aurora')
})

test('fundo próprio do grupo (#fundobv) continua tendo prioridade', async () => {
  const gp = '120363000000000002@g.us'
  const fundo = path.resolve('fundo.jpg')
  fs.writeFileSync(fundo, 'x')
  enviados.length = 0
  await sendWelcomeParticipant({ ...base, groupJid: gp, group: { ...grupo, fundobv: fundo, fundobv_tipo: 'image' } })
  assert.equal(enviados[0].type, 'image')
  assert.equal(enviados[0].media, fundo)
})
