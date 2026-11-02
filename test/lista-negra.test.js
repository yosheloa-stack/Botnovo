// node test/lista-negra.test.js
// Lista negra: o dono cadastra números e, quando um deles entra num grupo, o
// bot remove na hora (antes de qualquer consulta ao WhatsApp), sem dar tempo
// da pessoa mandar mensagem.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-lista-negra-'))
process.chdir(pasta)
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')

const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
const ln = await import(path.join(raiz, 'sistema/funcoes/listaNegra.js'))
const { createGroupHandler } = await import(path.join(raiz, 'sistema/core/eventos.js'))
const addCmd = (await import(path.join(raiz, 'sistema/comandos/dono/addblacklist.js'))).default
const delCmd = (await import(path.join(raiz, 'sistema/comandos/dono/delblacklist.js'))).default
const listCmd = (await import(path.join(raiz, 'sistema/comandos/dono/blacklist.js'))).default

const GRUPO = '120363000000000001@g.us'
const config = { owner: { number: '5511999990000' }, connection: { number: '5511888880000' } }

function clienteFalso({ falhaRemover = false } = {}) {
  const chamadas = []
  const client = {
    chamadas,
    group: {
      removeParticipants: async (gp, jids) => {
        chamadas.push(['remover', gp, [...jids]])
        return jids.map(jid => ({ jid, status: falhaRemover ? '403' : 'ok' }))
      },
      rejectMembershipRequests: async (gp, jids) => { chamadas.push(['recusar', gp, [...jids]]) },
      queryGroupMetadata: async (gp) => { chamadas.push(['metadata', gp]); return { subject: 'Grupo', participants: [] } }
    },
    message: { send: async (to, content, options) => { chamadas.push(['mensagem', to, content, options]) } },
    profile: {
      getLidsByPhoneNumbers: async (nums) => {
        chamadas.push(['lids', [...nums]])
        return nums.map(n => ({ queriedJid: `${n}@s.whatsapp.net`, phoneJid: `${n}@s.whatsapp.net`, lidJid: `${n.slice(-6)}777@lid`, exists: true, invalid: false }))
      }
    }
  }
  return client
}

test('banco: adiciona, não repete, aceita com ou sem o 9 e remove', () => {
  assert.equal(banco.addListaNegra('+55 (21) 98173-6747', 'golpista'), 'ok')
  assert.equal(banco.addListaNegra('5521981736747'), 'ja')
  // Mesmo celular sem o 9 depois do DDD é a mesma pessoa.
  assert.equal(banco.addListaNegra('552181736747'), 'ja')
  assert.ok(banco.naListaNegra('552181736747'))
  assert.equal(banco.naListaNegra('5521981736747').motivo, 'golpista')
  assert.equal(banco.addListaNegra('12'), 'invalido')
  assert.equal(banco.listaNegra().length, 1)
  assert.equal(banco.delListaNegra('552181736747'), true)
  assert.equal(banco.naListaNegra('5521981736747'), null)
  assert.equal(banco.delListaNegra('5521981736747'), false)
})

test('entrou no grupo e está na lista: remove na hora, antes de qualquer consulta', async () => {
  banco.addListaNegra('5521977776666')
  const client = clienteFalso()
  const handler = ln.createListaNegraHandler({ client, config })
  const pronto = handler({ groupJid: GRUPO, action: 'add', participants: [{ jid: '5521977776666@s.whatsapp.net', phoneJid: '5521977776666@s.whatsapp.net' }] })
  // Sem esperar nada: o pedido de remoção já saiu no mesmo instante.
  assert.deepEqual(client.chamadas[0], ['remover', GRUPO, ['5521977776666@s.whatsapp.net']])
  await pronto
  assert.ok(!client.chamadas.some(c => c[0] === 'metadata'), 'não consulta o grupo antes de banir')
  banco.delListaNegra('5521977776666')
})

test('grupo com LID: entra só com o código, o bot sabe de quem é e remove', async () => {
  banco.addListaNegra('5521966665555')
  banco.lembrarLid('99887766@lid', '5521966665555')
  const client = clienteFalso()
  const handler = ln.createListaNegraHandler({ client, config })
  const pronto = handler({ groupJid: GRUPO, action: 'add', participants: [{ jid: '99887766@lid', lidJid: '99887766@lid' }] })
  assert.deepEqual(client.chamadas[0], ['remover', GRUPO, ['99887766@lid']])
  await pronto
  banco.delListaNegra('5521966665555')
})

test('com LID e número juntos, remove pelo endereço que veio no evento e guarda o par', async () => {
  banco.addListaNegra('5521955554444')
  const client = clienteFalso()
  const handler = ln.createListaNegraHandler({ client, config })
  await handler({ groupJid: GRUPO, action: 'add', participants: [{ jid: '11223344@lid', lidJid: '11223344@lid', phoneJid: '5521955554444@s.whatsapp.net' }] })
  assert.deepEqual(client.chamadas[0], ['remover', GRUPO, ['11223344@lid']])
  assert.equal(banco.numeroDoLid('11223344@lid'), '5521955554444')
  banco.delListaNegra('5521955554444')
})

test('quem não está na lista, o dono e o próprio bot não são removidos', async () => {
  banco.addListaNegra('5511999990000') // dono por engano
  const client = clienteFalso()
  const handler = ln.createListaNegraHandler({ client, config })
  await handler({ groupJid: GRUPO, action: 'add', participants: [
    { jid: '5521900001111@s.whatsapp.net', phoneJid: '5521900001111@s.whatsapp.net' },
    { jid: '5511999990000@s.whatsapp.net', phoneJid: '5511999990000@s.whatsapp.net' }
  ] })
  await handler({ groupJid: GRUPO, action: 'remove', participants: [{ jid: '5521977776666@s.whatsapp.net' }] })
  assert.deepEqual(client.chamadas, [])
  banco.delListaNegra('5511999990000')
})

test('sem ser ADM: avisa no grupo que o número da lista entrou', async () => {
  banco.addListaNegra('5521944443333')
  const client = clienteFalso({ falhaRemover: true })
  const handler = ln.createListaNegraHandler({ client, config })
  await handler({ groupJid: GRUPO, action: 'add', participants: [{ jid: '5521944443333@s.whatsapp.net', phoneJid: '5521944443333@s.whatsapp.net' }] })
  const aviso = client.chamadas.find(c => c[0] === 'mensagem')
  assert.ok(aviso, 'mandou aviso')
  assert.match(aviso[2].text, /lista negra/i)
  assert.match(aviso[2].text, /ADM/)
  banco.delListaNegra('5521944443333')
})

test('pedido para entrar (grupo com aprovação): recusa quem está na lista', async () => {
  banco.addListaNegra('5521933332222')
  const client = clienteFalso()
  const handler = ln.createListaNegraHandler({ client, config })
  await handler({ groupJid: GRUPO, action: 'created_membership_requests', membershipRequests: [
    { jid: '5521933332222@s.whatsapp.net', phoneJid: '5521933332222@s.whatsapp.net' },
    { jid: '5521911112222@s.whatsapp.net', phoneJid: '5521911112222@s.whatsapp.net' }
  ] })
  assert.deepEqual(client.chamadas[0], ['recusar', GRUPO, ['5521933332222@s.whatsapp.net']])
  assert.equal(client.chamadas.length, 1)
  banco.delListaNegra('5521933332222')
})

test('bem-vindo não sai para quem está na lista negra', async () => {
  banco.addListaNegra('5521922221111')
  await banco.ensureGroupState(GRUPO, { nome: 'Grupo' })
  const g = banco.groupState(GRUPO); g.bemVindo = 1; await banco.saveGroupState(GRUPO, g)
  const client = clienteFalso()
  client.profile.getProfilePicture = async () => { throw new Error('sem foto') }
  const handler = createGroupHandler({ client, config })
  await handler({ groupJid: GRUPO, action: 'add', participants: [{ jid: '5521922221111@s.whatsapp.net', phoneJid: '5521922221111@s.whatsapp.net' }] })
  assert.ok(!client.chamadas.some(c => c[0] === 'mensagem'), 'não mandou bem-vindo')
  // Quem não está na lista continua recebendo o bem-vindo normal.
  await handler({ groupJid: GRUPO, action: 'add', participants: [{ jid: '5521900002222@s.whatsapp.net', phoneJid: '5521900002222@s.whatsapp.net' }] })
  assert.ok(client.chamadas.some(c => c[0] === 'mensagem'), 'mandou bem-vindo pro outro')
  banco.delListaNegra('5521922221111')
})

function sistemaFalso(args, extra = {}) {
  const respostas = []
  const client = clienteFalso()
  return {
    respostas, client, config, args, q: args.join(' '), prefix: '#', isGroup: false, from: '5511999990000@s.whatsapp.net',
    senderNumber: '5511999990000',
    targetInfo: () => ({ jid: '', number: '' }),
    reply: async (texto, opcoes) => { respostas.push(texto) },
    ...extra
  }
}

test('comandos: adicionar vários, listar e tirar', async () => {
  const s = sistemaFalso(['5521988887777', '+55', '21', '98888-6666', 'golpe'])
  await addCmd.run(s)
  assert.ok(banco.naListaNegra('5521988887777'))
  assert.ok(banco.naListaNegra('5521988886666'))
  assert.match(s.respostas[0], /5521988887777/)
  // Já descobre o LID do número, pra banir na hora mesmo em grupo com LID.
  assert.ok(s.client.chamadas.some(c => c[0] === 'lids'))
  assert.equal(banco.numeroDoLid('887777777@lid'), '5521988887777')

  const lista = sistemaFalso([])
  await listCmd.run(lista)
  assert.match(lista.respostas[0], /5521988887777/)
  assert.match(lista.respostas[0], /5521988886666/)

  const tirar = sistemaFalso(['5521988887777'])
  await delCmd.run(tirar)
  assert.equal(banco.naListaNegra('5521988887777'), null)
  assert.ok(banco.naListaNegra('5521988886666'))
  banco.delListaNegra('5521988886666')

  const vazia = sistemaFalso([])
  await listCmd.run(vazia)
  assert.match(vazia.respostas[0], /vazia/i)
})

test('comando por marcação dentro do grupo: põe na lista e já remove de lá', async () => {
  const s = sistemaFalso([], {
    isGroup: true, from: GRUPO, isBotAdmin: true,
    targetInfo: () => ({ jid: '44556677@lid', lidJid: '44556677@lid', pnJid: '5521977775555@s.whatsapp.net', number: '5521977775555', displayJid: '5521977775555@s.whatsapp.net' })
  })
  await addCmd.run(s)
  assert.ok(banco.naListaNegra('5521977775555'))
  assert.ok(s.client.chamadas.some(c => c[0] === 'remover' && c[2][0] === '44556677@lid'))
  banco.delListaNegra('5521977775555')
})

test('comando não deixa pôr o dono nem o número do bot', async () => {
  const s = sistemaFalso(['5511999990000', '5511888880000'])
  await addCmd.run(s)
  assert.equal(banco.naListaNegra('5511999990000'), null)
  assert.equal(banco.naListaNegra('5511888880000'), null)
  assert.match(s.respostas[0], /dono|bot/i)
})
