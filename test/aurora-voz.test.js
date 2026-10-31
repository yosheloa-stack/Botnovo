// node test/aurora-voz.test.js
// A voz da Aurora (Fish Audio): quando sai áudio, quando fica no texto, e o
// texto como sempre quando a API falha. O fetch da Fish Audio é falso.
import test from 'node:test'
import assert from 'node:assert/strict'
import { pediuAudio, ofereceuAudio, topou, textoFalado, podeFalar, semTagsDeVoz, createVoz, ehOgg } from '../sistema/funcoes/aurora/voz.js'

const OGG = new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0, 2, 0, 0])

test('pediuAudio: só quando pedem áudio de verdade', () => {
  assert.equal(pediuAudio('aurora manda um áudio'), true)
  assert.equal(pediuAudio('responde em audio'), true)
  assert.equal(pediuAudio('quero ouvir sua voz'), true)
  assert.equal(pediuAudio('fala comigo por áudio aí'), true)
  assert.equal(pediuAudio('não manda áudio'), false)
  assert.equal(pediuAudio('o áudio do vídeo tá ruim'), false)
  assert.equal(pediuAudio('bom dia aurora'), false)
})

test('textoFalado e podeFalar: link, marcação, ID e lista ficam no texto', () => {
  assert.equal(textoFalado('oi *amor* 😍💜 tudo bem?'), 'oi amor tudo bem?')
  assert.equal(textoFalado('para kkkk... tô aqui 😂'), 'para [laughing] ha ha… [break] tô aqui [laughing]')
  assert.equal(textoFalado('[playful] ahh para [break] tô aqui'), '[playful] ahh para [break] tô aqui')
  assert.equal(textoFalado('vc sabe pq? q nada, tbm n sei'), 'você sabe porque? que nada, também não sei')
  assert.equal(textoFalado('Vc é top'), 'você é top')
  assert.equal(semTagsDeVoz('[playful] ahh para, [break] tô aqui [chuckling].'), 'ahh para, tô aqui.')
  assert.equal(semTagsDeVoz('oi [Yosh] tudo'), 'oi tudo')
  assert.equal(podeFalar('oii, tô bem sim e você? 😌'), true)
  assert.equal(podeFalar('entra em https://autolikesystem.com.br'), false)
  assert.equal(podeFalar('olha o @5544911112222 aí'), false)
  assert.equal(podeFalar('o ID 10524352928 tá certo'), false)
  assert.equal(podeFalar('usa #like 123'), false)
  assert.equal(podeFalar('- um\n- dois'), false)
  assert.equal(podeFalar('a'.repeat(300)), false)
  assert.equal(podeFalar('a'.repeat(300), { pediu: true }), true)
  assert.equal(podeFalar('custa R$ 10'), false)
})

function fishFalsa(respostas) {
  const pedidos = []
  const fetch = async (url, opcoes) => {
    pedidos.push({ url, headers: opcoes.headers, corpo: JSON.parse(opcoes.body) })
    const r = respostas.shift()
    if (r.status !== 200) return new Response(JSON.stringify({ status: r.status, message: r.msg || 'erro' }), { status: r.status })
    return new Response(r.audio, { status: 200 })
  }
  return { fetch, pedidos }
}

test('sem chave: nada de áudio', async () => {
  delete process.env.FISH_AUDIO_API_KEY
  const voz = createVoz({ fetch: async () => { throw new Error('não devia chamar') } })
  assert.equal(voz.vaiFalar({ pediu: true }), false)
  assert.equal(await voz.falar('oi'), null)
})

test('com chave: pediram áudio, vem ogg/opus com a voz escolhida', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  process.env.FISH_AUDIO_VOZ = 'voz123'
  const { fetch, pedidos } = fishFalsa([{ status: 200, audio: OGG }])
  const voz = createVoz({ fetch })
  assert.equal(voz.vaiFalar({ pediu: true }), true)
  assert.equal(voz.vaiFalar({ sorte: 0.99 }), false, 'sem pedir, só às vezes')
  assert.equal(voz.vaiFalar({ sorte: 0.01 }), true)
  const r = await voz.falar('oii *tudo* bem? 😌')
  assert.deepEqual([...r.audio], [...OGG])
  assert.equal(r.mimetype, 'audio/ogg; codecs=opus')
  assert.equal(pedidos[0].url, 'https://api.fish.audio/v1/tts')
  assert.equal(pedidos[0].headers.authorization, 'Bearer chave-falsa')
  assert.deepEqual({ text: pedidos[0].corpo.text, ref: pedidos[0].corpo.reference_id, fmt: pedidos[0].corpo.format }, { text: 'oii tudo bem?', ref: 'voz123', fmt: 'opus' })
  assert.equal(pedidos[0].corpo.prosody.speed, 0.85, 'um pouco mais devagar pra entender')
})

test('402 sem crédito: tenta o modelo grátis; falhou de novo: texto e pausa', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  const { fetch, pedidos } = fishFalsa([{ status: 402 }, { status: 200, audio: OGG }])
  const voz = createVoz({ fetch })
  assert.ok(await voz.falar('oi'))
  assert.equal(pedidos[1].headers.model, 's2.1-pro-free')
  const ruim = fishFalsa([{ status: 402 }, { status: 402 }])
  const voz2 = createVoz({ fetch: ruim.fetch })
  assert.equal(await voz2.falar('oi'), null)
  assert.equal(voz2.vaiFalar({ pediu: true }), false, 'pausa um tempo sem crédito')
})

test('veio em outro formato: converte; não deu pra converter: texto', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  const mp3 = new Uint8Array([0x49, 0x44, 0x33, 4])
  const a = fishFalsa([{ status: 200, audio: mp3 }])
  assert.deepEqual([...(await createVoz({ fetch: a.fetch, converter: async () => OGG }).falar('oi')).audio], [...OGG])
  const b = fishFalsa([{ status: 200, audio: mp3 }])
  assert.equal(await createVoz({ fetch: b.fetch, converter: async () => null }).falar('oi'), null)
  assert.equal(ehOgg(OGG), true)
})

test('sem FISH_AUDIO_VOZ: usa a voz padrão (Loli)', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  delete process.env.FISH_AUDIO_VOZ
  const { fetch, pedidos } = fishFalsa([{ status: 200, audio: OGG }])
  await createVoz({ fetch }).falar('oi')
  assert.equal(pedidos[0].corpo.reference_id, '97630cc4349d4a169bf242b8c819081c')
})

test('a voz e a velocidade escolhidas no zap (#auroravoz) ganham do padrão', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  process.env.FISH_AUDIO_VOZ = 'da-variavel'
  const { fetch, pedidos } = fishFalsa([{ status: 200, audio: OGG }, { status: 200, audio: OGG }])
  let escolha = { voz: '24522123b5804bf691a8450d9187f03e', velocidade: 0.75 }
  const voz = createVoz({ fetch, escolha: () => escolha })
  await voz.falar('oi')
  assert.equal(pedidos[0].corpo.reference_id, '24522123b5804bf691a8450d9187f03e')
  assert.equal(pedidos[0].corpo.prosody.speed, 0.75)
  escolha = {}
  await voz.falar('oi')
  assert.equal(pedidos[1].corpo.reference_id, 'da-variavel')
  delete process.env.FISH_AUDIO_VOZ
})

test('ela ofereceu áudio e a pessoa topou: conta como pedido', () => {
  assert.equal(ofereceuAudio('aaai meu lord, você é tudo 😳💕 posso mandar um áudio dizendo isso?'), true)
  assert.equal(ofereceuAudio('quer ouvir minha voz?'), true)
  assert.equal(ofereceuAudio('o áudio do vídeo tava ruim'), false)
  assert.equal(topou('S pode'), true)
  assert.equal(topou('manda aí'), true)
  assert.equal(topou('sim'), true)
  assert.equal(topou('não precisa'), false)
  assert.equal(topou('pode não'), false)
  assert.equal(topou('sim, mas antes me fala quanto custa o plano mensal do bot e como pago'), false)
})
