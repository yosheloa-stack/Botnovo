// node test/aurora-voz.test.js
// A voz da Aurora (Fish Audio): quando sai áudio, quando fica no texto, e o
// texto como sempre quando a API falha. O fetch da Fish Audio é falso.
import test from 'node:test'
import assert from 'node:assert/strict'
import { falaPraEleven, provedorVoz, limparAudio, pediuAudio, fraseDoAudio, blocoVoz, pedidoDeDirecao, direcaoValida, ESTILOS, duracaoOgg, paraOgg, ofereceuAudio, topou, textoFalado, podeFalar, semTagsDeVoz, createVoz, ehOgg } from '../sistema/funcoes/aurora/voz.js'

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
  assert.deepEqual({ text: pedidos[0].corpo.text, ref: pedidos[0].corpo.reference_id, fmt: pedidos[0].corpo.format }, { text: '[Brazilian Portuguese accent] oii tudo bem?', ref: 'voz123', fmt: 'opus' })
  assert.equal(pedidos[0].corpo.prosody.speed, 0.85, 'um pouco mais devagar pra entender')
  assert.equal(pedidos[0].corpo.language, 'pt-BR')
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

test('o áudio sai com a duração certa (senão o WhatsApp mostra 0:00)', async (t) => {
  const { spawnSync } = await import('node:child_process')
  if (spawnSync('ffmpeg', ['-version']).status !== 0) return t.skip('sem ffmpeg aqui')
  const mp3 = spawnSync('ffmpeg', ['-loglevel', 'error', '-f', 'lavfi', '-i', 'sine=d=3', '-f', 'mp3', 'pipe:1']).stdout
  const ogg = await limparAudio(mp3)
  assert.equal(ehOgg(ogg), true)
  assert.equal(duracaoOgg(ogg), 3)
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  const { fetch } = fishFalsa([{ status: 200, audio: ogg }])
  const r = await createVoz({ fetch }).falar('oi')
  assert.equal(r.seconds, 3)
})

test('áudio vazio (só cabeçalho) não vai pro zap: sai texto', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-falsa'
  const { fetch } = fishFalsa([{ status: 200, audio: new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0, 2, 0, 0]) }])
  assert.equal(await createVoz({ fetch, converter: async () => null }).falar('oi tudo bem'), null)
  assert.equal(await createVoz({ fetch: async () => { throw new Error('não devia chamar') } }).falar(' / '), null, 'sem fala, nem chama a Fish')
})

test('jeito de falar: vai pra IA e o diretor de voz não pode mexer nas palavras', () => {
  assert.match(blocoVoz(ESTILOS.sombria), /JEITO DE FALAR NOS SEUS ÁUDIOS: doce, educada/)
  assert.doesNotMatch(blocoVoz(''), /JEITO DE FALAR/)
  assert.match(pedidoDeDirecao('oi', ESTILOS.sombria)[0].content, /sombrio/)
  const frase = 'Você fica sentado aí... culpando a si mesmo o tempo todo.'
  assert.equal(direcaoValida(frase, '[soft tone] Você fica sentado aí... [break] [sinister] culpando a si mesmo o tempo todo.'), '[soft tone] Você fica sentado aí... [break] [sinister] culpando a si mesmo o tempo todo.')
  assert.equal(direcaoValida(frase, '[soft tone] Você fica parado aí culpando a si mesmo o tempo todo.'), '', 'trocou palavra')
  assert.equal(direcaoValida(frase, frase), '', 'sem marcação nenhuma')
  assert.equal(direcaoValida(frase, ''), '')
})

test('ElevenLabs: com a chave dela, é ela quem fala, com a voz escolhida e o v3', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-fish'
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  assert.equal(provedorVoz(), 'ElevenLabs')
  const pedidos = []
  const fetch = async (url, opcoes) => {
    pedidos.push({ url, headers: opcoes.headers, corpo: JSON.parse(opcoes.body) })
    if (pedidos.length === 2) return new Response(JSON.stringify({ detail: { status: 'model_not_found', message: 'sem v3' } }), { status: 400 })
    return new Response(OGG, { status: 200 })
  }
  const voz = createVoz({ fetch, escolha: () => ({ voz: '24522123b5804bf691a8450d9187f03e' }) })
  const r = await voz.falar('[playful] oii kkk... tô aqui')
  assert.ok(r)
  assert.equal(pedidos[0].url, 'https://api.elevenlabs.io/v1/text-to-speech/NS7yU4WmAouJsg84X3Mg?output_format=opus_48000_64', 'ID da Fish não serve: usa a padrão')
  assert.equal(pedidos[0].headers['xi-api-key'], 'chave-eleven')
  assert.equal(pedidos[0].corpo.model_id, 'eleven_v3')
  assert.equal(pedidos[0].corpo.language_code, 'pt')
  assert.equal(pedidos[0].corpo.text, '[playful] oii [laughs] ha ha… tô aqui')
  // v3 não liberado na conta: tenta o multilingual v2, sem as marcações
  await createVoz({ fetch, escolha: () => ({ voz: 'AbCdEfGhIjKlMnOpQrSt' }) }).falar('[sighing] ai ai… [break] tá bom')
  assert.match(pedidos[1].url, /text-to-speech\/AbCdEfGhIjKlMnOpQrSt\?/)
  assert.equal(pedidos[2].corpo.model_id, 'eleven_multilingual_v2')
  assert.equal(pedidos[2].corpo.text, 'ai ai… tá bom')
  assert.equal(pedidos[2].corpo.language_code, undefined)
  delete process.env.ELEVENLABS_API_KEY
  assert.equal(provedorVoz(), 'Fish Audio')
})

test('falaPraEleven: marcações da Fish viram as da ElevenLabs', () => {
  assert.equal(falaPraEleven('[Brazilian Portuguese accent] [whispering] oi [break] [chuckling] tudo?'), '[whispers] oi … [chuckles] tudo?')
  assert.equal(falaPraEleven('[soft tone] oi [long-break] tchau', 'eleven_multilingual_v2'), 'oi… tchau')
})

test('ElevenLabs recusou (402, voz da biblioteca no plano grátis): vai pela Fish Audio', async () => {
  process.env.FISH_AUDIO_API_KEY = 'chave-fish'
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  const urls = []
  const logs = []
  const fetch = async (url) => {
    urls.push(String(url))
    if (String(url).includes('elevenlabs')) return new Response(JSON.stringify({ detail: { status: 'payment_required', message: 'Free users cannot use library voices via the API.' } }), { status: 402 })
    return new Response(OGG, { status: 200 })
  }
  const voz = createVoz({ fetch, log: (m) => logs.push(m) })
  assert.ok(await voz.falar('oi tudo bem'))
  assert.match(urls[0], /elevenlabs/)
  assert.match(urls[1], /fish\.audio/)
  assert.match(logs[0], /402: Free users cannot use library voices[\s\S]*Fish Audio/)
  assert.ok(await voz.falar('oi de novo'))
  assert.equal(urls.filter((u) => u.includes('elevenlabs')).length, 1, 'não insiste na ElevenLabs por 30 min')
  assert.equal(voz.vaiFalar({ pediu: true }), true, 'a Fish continua falando')
  delete process.env.ELEVENLABS_API_KEY
})
