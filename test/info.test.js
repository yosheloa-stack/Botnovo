// O /info: texto sem traço e o cartão do jogador como imagem.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import global from '../sistema/funcoes/global.js'
import { traduzir } from '../sistema/funcoes/traduzir.js'

const perfil = { sucesso: true, nick: 'BR_lizin', uid: '8123124352', regiao: 'BR', nivel: 56, likes: 44964,
  rank: { br: 'Prata III', cs: null }, clan: { nome: 'FLUXO W7M' }, credito: { pontuacao: 100 },
  conta_criada: '2023-08-11 23:20:33 UTC', ultimo_acesso: '1792459610', social: { assinatura: 'NÃO SE ASSUSTE' } }

test('o /info sai sem traço nenhum e sem campo vazio', () => {
  const t = global.ffInfo(perfil)
  for (const parte of ['BR_lizin', '8123124352', '44.964', 'Prata III', 'FLUXO W7M', '11/08/2023', 'NÃO SE ASSUSTE']) assert.match(t, new RegExp(parte))
  assert.doesNotMatch(t, /^- |: -$|—|Rank CS/m)
  assert.doesNotMatch(global.ffInfo({ nick: 'X' }), /UID|Likes|-/)
})

test('a legenda do cartão sai no idioma do grupo, e a imagem passa intacta', () => {
  const imagem = new Uint8Array([1, 2, 3])
  const msg = traduzir({ type: 'image', media: imagem, mimetype: 'image/png', caption: global.ffInfo(perfil) }, 'es')
  assert.equal(msg.media, imagem)
  assert.match(msg.caption, /Región:/)
  assert.match(msg.caption, /Gremio:/)
})
