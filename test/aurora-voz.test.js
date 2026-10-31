// node test/aurora-voz.test.js
// A voz da Aurora (ElevenLabs): quando sai áudio, quando fica no texto, e o
// texto como sempre quando a API falha. O fetch da ElevenLabs é falso.
import test from 'node:test'
import assert from 'node:assert/strict'
import { falaPraEleven, provedorVoz, pediuAudio, fraseDoAudio, blocoVoz, pedidoDeDirecao, direcaoValida, ESTILOS, duracaoOgg, paraOgg, ofereceuAudio, topou, textoFalado, podeFalar, semTagsDeVoz, createVoz, ehOgg, ELEVEN_VOZ_PADRAO } from '../sistema/funcoes/aurora/voz.js'

const OGG = new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0, 2, ...new Array(2000).fill(0)])

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
  assert.equal(textoFalado('para kkkk... tô aqui 😂'), 'para [laughs]… tô aqui [laughs]')
  assert.equal(textoFalado('[mischievously] ahh para… tô aqui'), '[mischievously] ahh para… tô aqui', 'o texto da IA vai como veio')
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

function elevenFalsa(respostas) {
  const pedidos = []
  const fetch = async (url, opcoes) => {
    pedidos.push({ url: String(url), headers: opcoes.headers, corpo: JSON.parse(opcoes.body) })
    const r = respostas.shift()
    if (r.status !== 200) return new Response(JSON.stringify({ detail: { status: 'erro', message: r.msg || 'erro' } }), { status: r.status })
    return new Response(r.audio, { status: 200 })
  }
  return { fetch, pedidos }
}
const semConverter = async () => null

test('sem chave: nada de áudio', async () => {
  delete process.env.ELEVENLABS_API_KEY
  assert.equal(provedorVoz(), '')
  const voz = createVoz({ fetch: async () => { throw new Error('não devia chamar') } })
  assert.equal(voz.vaiFalar({ pediu: true }), false)
  assert.equal(await voz.falar('oi'), null)
})

test('com chave: a ElevenLabs fala o texto da IA como veio, com a voz escolhida e sem mexer no ajuste dela', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  assert.equal(provedorVoz(), 'ElevenLabs')
  const { fetch, pedidos } = elevenFalsa([{ status: 200, audio: OGG }])
  const voz = createVoz({ fetch, converter: semConverter })
  assert.equal(voz.vaiFalar({ pediu: true }), true)
  assert.equal(voz.vaiFalar({ sorte: 0.99 }), false, 'sem pedir, só às vezes')
  assert.equal(voz.vaiFalar({ sorte: 0.01 }), true)
  const r = await voz.falar('[mischievously] oii *tudo* bem? 😌')
  assert.deepEqual([...r.audio], [...OGG])
  assert.equal(r.mimetype, 'audio/ogg; codecs=opus')
  assert.equal(pedidos[0].url, `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOZ_PADRAO}?output_format=opus_48000_64`)
  assert.equal(pedidos[0].headers['xi-api-key'], 'chave-eleven')
  assert.equal(pedidos[0].corpo.model_id, 'eleven_v3')
  assert.equal(pedidos[0].corpo.text, '[mischievously] oii tudo bem?')
  assert.equal(pedidos[0].corpo.voice_settings, undefined, 'vale o ajuste da própria voz')
  assert.equal(pedidos[0].corpo.language_code, 'pt')
  delete process.env.ELEVENLABS_API_KEY
})

test('a voz e a velocidade do #auroravoz ganham; ID antigo da Fish é ignorado', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  process.env.ELEVENLABS_VOZ = 'DaVariavel0000000000'
  const { fetch, pedidos } = elevenFalsa([{ status: 200, audio: OGG }, { status: 200, audio: OGG }, { status: 200, audio: OGG }])
  let escolha = { voz: 'AbCdEfGhIjKlMnOpQrSt', velocidade: 0.75 }
  const voz = createVoz({ fetch, converter: semConverter, escolha: () => escolha })
  await voz.falar('oi')
  assert.match(pedidos[0].url, /text-to-speech\/AbCdEfGhIjKlMnOpQrSt\?/)
  assert.deepEqual(pedidos[0].corpo.voice_settings, { speed: 0.75 })
  escolha = { voz: '5d83ac54f5c844ee9746112a9310d72f' }
  await voz.falar('oi')
  assert.match(pedidos[1].url, /text-to-speech\/DaVariavel0000000000\?/)
  delete process.env.ELEVENLABS_VOZ
  escolha = {}
  await voz.falar('oi')
  assert.match(pedidos[2].url, new RegExp(`text-to-speech/${ELEVEN_VOZ_PADRAO}\\?`))
  delete process.env.ELEVENLABS_API_KEY
})

test('v3 não liberado na conta: tenta o multilingual v2, sem as marcações', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  const { fetch, pedidos } = elevenFalsa([{ status: 400 }, { status: 200, audio: OGG }])
  assert.ok(await createVoz({ fetch, converter: semConverter }).falar('[sighs] ai ai… tá bom'))
  assert.equal(pedidos[1].corpo.model_id, 'eleven_multilingual_v2')
  assert.equal(pedidos[1].corpo.text, 'ai ai… tá bom')
  assert.equal(pedidos[1].corpo.language_code, undefined)
  delete process.env.ELEVENLABS_API_KEY
})

test('falaPraEleven: v3 recebe o texto como veio; v2 sem marcações', () => {
  assert.equal(falaPraEleven('[whispers] oi… [chuckles] tudo?'), '[whispers] oi… [chuckles] tudo?')
  assert.equal(falaPraEleven('[softly] oi… tchau', 'eleven_multilingual_v2'), 'oi… tchau')
})

test('402 (sem crédito/plano): sai texto e pausa a voz um tempo, sem trocar de voz', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  const logs = []
  const { fetch, pedidos } = elevenFalsa([{ status: 402, msg: 'Free users cannot use library voices via the API.' }])
  const voz = createVoz({ fetch, log: (m) => logs.push(m) })
  assert.equal(await voz.falar('oi tudo bem'), null)
  assert.equal(pedidos.length, 1)
  assert.match(logs[0], /ElevenLabs respondeu 402: Free users/)
  assert.equal(voz.vaiFalar({ pediu: true }), false, 'pausa 30 min')
  delete process.env.ELEVENLABS_API_KEY
})

test('veio em outro formato: converte; não deu pra converter: texto', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  const mp3 = new Uint8Array([0x49, 0x44, 0x33, 4])
  const a = elevenFalsa([{ status: 200, audio: mp3 }])
  assert.deepEqual([...(await createVoz({ fetch: a.fetch, converter: async () => OGG }).falar('oi')).audio], [...OGG])
  const b = elevenFalsa([{ status: 200, audio: mp3 }])
  assert.equal(await createVoz({ fetch: b.fetch, converter: semConverter }).falar('oi'), null)
  assert.equal(ehOgg(OGG), true)
  delete process.env.ELEVENLABS_API_KEY
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

test('fraseDoAudio: "manda um áudio falando X" → X', () => {
  assert.equal(fraseDoAudio('Aurora manda um áudio falando eu te amo Hemi'), 'eu te amo Hemi')
  assert.equal(fraseDoAudio('manda áudio dizendo: bom dia grupo, bora de like'), 'bom dia grupo, bora de like')
  assert.equal(fraseDoAudio('aurora fala em áudio "o Yosh é o melhor"'), 'o Yosh é o melhor')
  assert.equal(fraseDoAudio('manda um áudio falando que hoje tem sorteio'), 'hoje tem sorteio')
  assert.equal(fraseDoAudio('fala bom dia pro grupo em áudio'), 'bom dia pro grupo')
  assert.equal(fraseDoAudio('fala comigo por áudio'), '')
  assert.equal(fraseDoAudio('Aurora manda áudio falando essa frase Você fica sentado aí... culpando a si mesmo o tempo todo." / "Você está sempre sentado, culpando a si mesmo.'), 'Você fica sentado aí... culpando a si mesmo o tempo todo. Você está sempre sentado, culpando a si mesmo.')
  assert.equal(fraseDoAudio('manda um áudio " / "'), '')
  assert.equal(fraseDoAudio('manda um áudio'), '')
  assert.equal(fraseDoAudio('fala bom dia pro grupo'), '', 'sem pedir áudio, é conversa normal')
})

test('o áudio sai com a duração certa (senão o WhatsApp mostra 0:00), e o ogg só é reempacotado', async (t) => {
  const { spawnSync } = await import('node:child_process')
  if (spawnSync('ffmpeg', ['-version']).status !== 0) return t.skip('sem ffmpeg aqui')
  const mp3 = spawnSync('ffmpeg', ['-loglevel', 'error', '-f', 'lavfi', '-i', 'sine=d=3', '-f', 'mp3', 'pipe:1']).stdout
  const ogg = await paraOgg(mp3)
  assert.equal(ehOgg(ogg), true)
  assert.equal(duracaoOgg(ogg), 3)
  const copia = await paraOgg(ogg)
  assert.equal(duracaoOgg(copia), 3)
  assert.ok(Math.abs(copia.length - ogg.length) < 200, 'mesmo som, só o pacote')
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  const { fetch } = elevenFalsa([{ status: 200, audio: ogg }])
  const r = await createVoz({ fetch }).falar('oi')
  assert.equal(r.seconds, 3)
  delete process.env.ELEVENLABS_API_KEY
})

test('áudio vazio (só cabeçalho) não vai pro zap: sai texto', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  const { fetch } = elevenFalsa([{ status: 200, audio: new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0, 2, 0, 0]) }])
  assert.equal(await createVoz({ fetch, converter: semConverter }).falar('oi tudo bem'), null)
  assert.equal(await createVoz({ fetch: async () => { throw new Error('não devia chamar') } }).falar(' / '), null, 'sem fala, nem chama a API')
  delete process.env.ELEVENLABS_API_KEY
})

test('jeito de falar: vai pra IA e o diretor de voz não pode mexer nas palavras', () => {
  assert.match(blocoVoz(ESTILOS.sombria), /JEITO DE FALAR NOS SEUS ÁUDIOS: doce, educada/)
  assert.doesNotMatch(blocoVoz(''), /JEITO DE FALAR/)
  assert.match(pedidoDeDirecao('oi', ESTILOS.sombria)[0].content, /sombrio/)
  const frase = 'Você fica sentado aí... culpando a si mesmo o tempo todo.'
  assert.equal(direcaoValida(frase, '[softly] Você fica sentado aí... [sinister] culpando a si mesmo o tempo todo.'), '[softly] Você fica sentado aí... [sinister] culpando a si mesmo o tempo todo.')
  assert.equal(direcaoValida(frase, '[soft tone] Você fica parado aí culpando a si mesmo o tempo todo.'), '', 'trocou palavra')
  assert.equal(direcaoValida(frase, frase), '', 'sem marcação nenhuma')
  assert.equal(direcaoValida(frase, ''), '')
})

