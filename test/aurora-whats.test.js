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
const pedidosLike = []
const pedidosInfo = []
const pedidosVoz = []
let respostaIa = 'oi, tô aqui 😌'
globalThis.fetch = async (url, opcoes = {}) => {
  if (String(url).includes('/v2/ai/chat/completions')) {
    pedidosIa.push(JSON.parse(opcoes.body))
    return new Response(JSON.stringify({ choices: [{ finish_reason: 'stop', message: { content: respostaIa } }] }), { status: 200 })
  }
  if (String(url).includes('api.elevenlabs.io/v1/voices')) {
    return new Response(JSON.stringify({ voices: [{ voice_id: 'NS7yU4WmAouJsg84X3Mg', name: 'Aurora BR' }, { voice_id: 'XyZ0123456789abcdEFG', name: 'Luna Calma' }] }), { status: 200 })
  }
  if (String(url).includes('api.elevenlabs.io/v1/text-to-speech')) {
    pedidosVoz.push(JSON.parse(opcoes.body).text)
    return new Response(new Uint8Array([0x4f, 0x67, 0x67, 0x53, 0, 2, ...new Array(2000).fill(0)]), { status: 200 })
  }
  if (String(url).includes('/v1/info')) {
    pedidosInfo.push(new URL(String(url)).searchParams.get('uid'))
    return new Response(JSON.stringify({ sucesso: true, uid: '10524352928', nick: 'BR_teste', nivel: 60, likes: 1000 }), { status: 200 })
  }
  if (String(url).includes('/v1/like')) {
    pedidosLike.push(new URL(String(url)).searchParams.get('uid'))
    return new Response(JSON.stringify({ sucesso: true, uid: '8123124352', nick: 'BR_lizin', likes_enviados: 220, likes_antes: 100, likes_depois: 320 }), { status: 200 })
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
    { jid: '5544911112222@s.whatsapp.net' },
    { jid: '77665544332211@lid', displayName: 'TROPA DE ELITE' },
    { jid: '11112222333344@lid', phoneNumber: '5544933334444@s.whatsapp.net' }
  ] }) },
  message: { send: async (jid, conteudo, opcoes) => { enviados.push({ jid, conteudo, opcoes }) } },
  presence: { sendChatstate: async (jid, { state }) => { estados.push(state) } },
  profile: { getLidsByPhoneNumbers: async ([n]) => [n === '5544977776666' ? { exists: true, phoneJid: n + '@s.whatsapp.net', lidJid: '123123123123@lid' } : { exists: false }] }
}
const config = { prefix: '#', owner: { number: '5544900000000' }, connection: { number: BOT }, autoSystem: { url: 'https://autolikesystem.com.br', token: 'token-de-teste' } }
const comandos = new Map()
const handler = createHandler({ client, config, registry: { commands: comandos, plugins: [] } })

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
const citandoBot = (participant, texto = 'Só cola aqui o número do ID do jogador') => ({ stanzaId: 'BOTMSG', participant, quotedMessage: { conversation: texto } })

test('responder (citar) a mensagem do bot pelo LID chama a Aurora, mesmo só com número', async () => {
  const saiu = await respostaDe(mensagem('123456789', citandoBot(`${BOT_LID}@lid`)))
  assert.equal(saiu.length, 1)
  assert.equal(saiu[0].conteudo.text, 'oi, tô aqui 😌')
  assert.equal(saiu[0].opcoes.quote?.key?.id, 'MSG' + n, 'responde citando quem falou')
  assert.deepEqual(estados.slice(0, 1), ['composing'])
  const ultimo = pedidosIa.at(-1)
  assert.equal(ultimo.model, 'cubic')
  assert.match(ultimo.messages.at(-1).content, /\[Yosh\] 123456789\n\(respondendo a uma mensagem SUA: "Só cola aqui/)
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

test('quem não é o criador pede like: ela não executa, só conversa', async () => {
  banco.auroraCriador('5544900001111')
  const antes = pedidosIa.length
  await respostaDe(mensagem('aurora manda like no 8123124352'))
  assert.deepEqual(pedidosLike, [])
  assert.equal(pedidosIa.length, antes + 1)
  assert.doesNotMatch(pedidosIa.at(-1).messages.at(-1).content, /CRIADOR/)
})

test('pediu like: ela responde e o bot manda de verdade, sem gastar a IA', async () => {
  banco.auroraCriador('5544911112222')
  const antes = pedidosIa.length
  const inicio = enviados.length
  await handler(mensagem('aurora faz o envio pro 8123124352'))
  const fim = Date.now() + 6000
  while (enviados.length < inicio + 2 && Date.now() < fim) await new Promise((r) => setTimeout(r, 50))
  const saiu = enviados.slice(inicio)
  assert.equal(saiu.length, 2)
  assert.match(saiu[0].conteudo.text, /8123124352/)
  assert.match(saiu[1].conteudo.text, /Enviados: 220/)
  assert.deepEqual(pedidosLike, ['8123124352'])
  assert.equal(pedidosIa.length, antes)
})

test('"faz o envio pra mim" sem ID usa o último ID da conversa', async () => {
  const inicio = enviados.length
  await handler(mensagem('aurora faz o envio pra mim aí'))
  const fim = Date.now() + 6000
  while (enviados.length < inicio + 2 && Date.now() < fim) await new Promise((r) => setTimeout(r, 50))
  assert.deepEqual(pedidosLike, ['8123124352', '8123124352'])
})

test('ela vê os membros do grupo pelo nome e marca de verdade', async () => {
  respostaIa = 'olha o @5544911112222 aí 😏'
  const saiu = await respostaDe(mensagem('aurora quem tá no grupo?'))
  respostaIa = 'oi, tô aqui 😌'
  assert.match(pedidosIa.at(-1).messages[0].content, /MEMBROS DESTE GRUPO \(fora você: 3[\s\S]*- Yosh: @5544911112222\n- TROPA DE ELITE: @77665544332211/)
  assert.deepEqual(saiu[0].opcoes.mentions, ['5544911112222@s.whatsapp.net'])
})

test('perguntou do erro: ela recebe o motivo real do último comando que quebrou', async () => {
  comandos.set('tiktok', { name: 'tiktok', run: async () => { throw new Error('Falha ao baixar mídia: HTTP 502') } })
  await respostaDe(mensagem('#tiktok https://vt.tiktok.com/x'))
  await respostaDe(mensagem('aurora qual foi o erro?'))
  assert.match(pedidosIa.at(-1).messages[0].content, /ÚLTIMO ERRO DE COMANDO[\s\S]*#tiktok de Yosh[\s\S]*HTTP 502/)
})

test('#auroramulher: só o criador escolhe, e ela passa a ser tratada como a mulher dele', async () => {
  const { default: cmd } = await import(path.join(raiz, 'sistema/comandos/dono/auroramulher.js'))
  comandos.set('auroramulher', cmd)
  banco.auroraCriador('5544900001111')
  assert.match((await respostaDe(mensagem('#auroramulher 5544911112222')))[0].conteudo.text, /Só o criador/)
  assert.equal(banco.auroraEsposa(), '5568984111797', 'já vem fixo')
  banco.auroraCriador('5544911112222')
  assert.match((await respostaDe(mensagem('#auroramulher 5568 98411-0000')))[0].conteudo.text, /556898411000/)
  banco.auroraEsposa('5544911112222')
  banco.auroraCriador('5544900001111')
  await respostaDe(mensagem('aurora oi'))
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /^\[Yosh, ESPOSA DO CRIADOR\]/)
})

const privado = (texto, key) => ({ key: { id: 'PV' + (++n), fromMe: false, ...key }, pushName: 'Yosh', message: { conversation: texto } })

test('no privado vem só o LID: ela reconhece o criador pelo número alternativo', async () => {
  banco.auroraCriador('5544911112222')
  await respostaDe(privado('oi aurora', { remoteJid: '55555555555@lid', remoteJidAlt: '5544911112222@s.whatsapp.net' }))
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /^\[Yosh, CRIADOR\] oi aurora/)
})

test('no privado sem número nenhum: pergunta o LID do criador ao WhatsApp', async () => {
  banco.auroraCriador('5544977776666')
  await respostaDe(privado('oi aurora', { remoteJid: '123123123123@lid' }))
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /^\[Yosh, CRIADOR\] oi aurora/)
  await respostaDe(privado('oi aurora', { remoteJid: '999999999999@lid' }))
  assert.doesNotMatch(pedidosIa.at(-1).messages.at(-1).content, /CRIADOR/)
})

test('a mulher do criador sem nome no zap vira Hemi', async () => {
  banco.auroraCriador('5544900001111')
  banco.auroraEsposa('5544911112222')
  const ev = privado('oi aurora', { remoteJid: '5544911112222@s.whatsapp.net' }); delete ev.pushName
  await respostaDe(ev)
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /^\[Hemi, ESPOSA DO CRIADOR\] oi aurora/)
  await respostaDe(privado('oi de novo', { remoteJid: '5544911112222@s.whatsapp.net' }))
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /^\[Yosh, ESPOSA DO CRIADOR\]/, 'com nome no zap, usa o nome dela')
})

test('marcou alguém pelo código (LID): a Aurora recebe o nome, não um "ID"', async () => {
  banco.auroraCriador('5544911112222')
  await respostaDe(mensagem('@77665544332211 testa aí', { ...citandoBot(`${BOT}@s.whatsapp.net`), mentionedJid: ['77665544332211@lid'] }))
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /@TROPA DE ELITE \(pessoa marcada\) testa aí/)
  assert.doesNotMatch(pedidosIa.at(-1).messages[0].content, /CONSULTA DO ID( \(|:)/)
})

test('LID visto no grupo com o número: no privado só com o LID, ela sabe quem é', async () => {
  assert.equal(banco.numeroDoLid('11112222333344@lid'), '5544933334444')
  banco.auroraCriador('5544933334444')
  await respostaDe(privado('oi aurora', { remoteJid: '11112222333344@lid' }))
  assert.match(pedidosIa.at(-1).messages.at(-1).content, /^\[Yosh, CRIADOR\] oi aurora/)
})

test('ela sugeriu /info e o criador disse "faz aí": o bot roda o /info de verdade', async () => {
  banco.auroraCriador('5544911112222')
  pedidosInfo.length = 0
  const antes = pedidosIa.length
  const inicio = enviados.length
  await handler(mensagem('Faz aí', { stanzaId: 'BOTMSG2', participant: `${BOT}@s.whatsapp.net`, quotedMessage: { conversation: 'entendi! manda o comando /info 10524352928 que eu puxo os dados' } }))
  const fim = Date.now() + 6000
  while (enviados.length < inicio + 2 && Date.now() < fim) await new Promise((r) => setTimeout(r, 50))
  assert.deepEqual(pedidosInfo, ['10524352928'])
  assert.match(enviados[inicio].conteudo.text, /10524352928/)
  assert.equal(pedidosIa.length, antes, 'não gastou a IA')
})

test('"marca o tropa aí": ela acha pelo nome e a marcação sai de verdade', async () => {
  respostaIa = 'pronto, tá marcado! 👋'
  const saiu = await respostaDe(mensagem('aurora marca o tropa aí'))
  assert.match(pedidosIa.at(-1).messages[0].content, /AGORA pediram pra marcar "tropa": é TROPA DE ELITE\. Marque escrevendo @77665544332211/)
  assert.match(saiu[0].conteudo.text, /^@77665544332211 pronto/)
  assert.deepEqual(saiu[0].opcoes.mentions, ['77665544332211@lid'])
  const nada = await respostaDe(mensagem('aurora marca o dylan aí'))
  respostaIa = 'oi, tô aqui 😌'
  assert.match(pedidosIa.at(-1).messages[0].content, /pediram pra marcar "dylan", mas ninguém com esse nome/)
  assert.equal(nada[0].opcoes?.mentions, undefined)
})

test('pediram áudio: a resposta sai como mensagem de voz; sem a chave, sai texto', async () => {
  respostaIa = '[playful] oii, tô aqui sim kkk 😌'
  process.env.ELEVENLABS_API_KEY = 'chave-falsa'
  const saiu = await respostaDe(mensagem('aurora manda um áudio'))
  assert.match(pedidosIa.at(-1).messages[0].content, /ESTA RESPOSTA VAI SAIR EM ÁUDIO/)
  assert.equal(saiu[0].conteudo.type, 'audio')
  assert.equal(saiu[0].conteudo.ptt, true)
  assert.equal(saiu[0].conteudo.mimetype, 'audio/ogg; codecs=opus')
  assert.equal(pedidosVoz.at(-1), '[playful] oii, tô aqui sim [laughs]')
  delete process.env.ELEVENLABS_API_KEY
  const texto = await respostaDe(mensagem('aurora manda um áudio'))
  respostaIa = 'oi, tô aqui 😌'
  assert.match(pedidosIa.at(-1).messages[0].content, /^(?![\s\S]*VAI SAIR EM ÁUDIO)/, 'sem chave, ela nem pensa em áudio')
  assert.equal(texto[0].conteudo.text, 'oii, tô aqui sim kkk 😌', 'em texto as marcações de voz somem')
})

test('#auroravoz: só o criador troca a voz e a velocidade', async () => {
  const { default: cmd } = await import(path.join(raiz, 'sistema/comandos/dono/auroravoz.js'))
  comandos.set('auroravoz', cmd)
  banco.auroraCriador('5544900001111')
  assert.match((await respostaDe(mensagem('#auroravoz luna')))[0].conteudo.text, /Só o criador/)
  banco.auroraCriador('5544911112222')
  assert.match((await respostaDe(mensagem('#auroravoz')))[0].conteudo.text, /ELEVENLABS_API_KEY/, 'sem a chave, avisa')
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  await respostaDe(mensagem('#auroravoz lenta'))
  assert.equal(banco.auroraVelocidade(), 0.75)
  assert.match((await respostaDe(mensagem('#auroravoz xpto')))[0].conteudo.text, /Não achei essa voz/)
  assert.match((await respostaDe(mensagem('#auroravoz estilo sombria')))[0].conteudo.text, /sombrio/)
  assert.match(banco.auroraEstilo(), /sombrio/)
  await respostaDe(mensagem('#auroravoz estilo calma e sussurrando'))
  assert.equal(banco.auroraEstilo(), 'calma e sussurrando')
  await respostaDe(mensagem('#auroravoz estilo 0'))
  assert.equal(banco.auroraEstilo(), '')
  await respostaDe(mensagem('#auroravoz luna'))
  assert.equal(banco.auroraVoz(), 'XyZ0123456789abcdEFG')
  await respostaDe(mensagem('#auroravoz padrao'))
  assert.equal(banco.auroraVoz(), '')
  delete process.env.ELEVENLABS_API_KEY
})

test('ela ofereceu áudio, o criador respondeu "S pode": sai áudio de verdade', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-falsa'
  respostaIa = '[happy] Yosh, você é demais, viu?'
  const saiu = await respostaDe(mensagem('S pode', citandoBot(`${BOT}@s.whatsapp.net`, 'aaai meu lord, você é tudo 😳💕 posso mandar um áudio dizendo isso?')))
  delete process.env.ELEVENLABS_API_KEY
  respostaIa = 'oi, tô aqui 😌'
  assert.equal(saiu[0].conteudo.type, 'audio')
  assert.equal(pedidosVoz.at(-1), '[happy] Yosh, você é demais, viu?')
})

test('o criador pede "manda um áudio falando X": ela fala X igualzinho, só com a entonação marcada', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-falsa'
  banco.auroraCriador('5544911112222')
  const antes = pedidosIa.length
  respostaIa = '[excited] bom dia grupo, [break] bora de like'
  const saiu = await respostaDe(mensagem('aurora manda um áudio falando bom dia grupo, bora de like'))
  respostaIa = '[excited] bom dia gente, bora'
  const trocou = await respostaDe(mensagem('aurora manda um áudio falando bom dia grupo, bora de like'))
  delete process.env.ELEVENLABS_API_KEY
  respostaIa = 'oi, tô aqui 😌'
  assert.equal(saiu[0].conteudo.type, 'audio')
  assert.equal(pedidosVoz.at(-2), '[excited] bom dia grupo, [break] bora de like', 'a IA só marcou a entonação')
  assert.equal(pedidosVoz.at(-1), 'bom dia grupo, bora de like', 'a IA mexeu nas palavras: vai a frase pura')
  assert.equal(trocou[0].conteudo.type, 'audio')
  assert.equal(pedidosIa.length, antes + 2, 'uma chamada de direção por áudio')
})

test('o criador diz "Envia novamente ID": o bot manda o like de verdade, sem a IA', async () => {
  banco.auroraCriador('5544911112222')
  const antes = pedidosIa.length
  const inicio = pedidosLike.length
  await handler(mensagem('aurora envia novamente 8772807697'))
  const fim = Date.now() + 6000
  while (pedidosLike.length === inicio && Date.now() < fim) await new Promise((r) => setTimeout(r, 50))
  assert.equal(pedidosLike.at(-1), '8772807697', JSON.stringify(enviados.slice(-3).map((e) => e.conteudo.text)))
  assert.equal(pedidosIa.length, antes, 'não gastou a IA')
})

test('a IA diz pro criador que "já processei o like": o bot manda de verdade', async () => {
  banco.auroraCriador('5544911112222')
  const inicio = pedidosLike.length
  respostaIa = 'Já processei o like pro ID 8772807697, Yosh 🔥😏'
  const saiu = await respostaDe(mensagem('aurora como tá o like?'))
  respostaIa = 'oi, tô aqui 😌'
  assert.match(saiu[0].conteudo.text, /8772807697/)
  const fim = Date.now() + 6000
  while (pedidosLike.length === inicio && Date.now() < fim) await new Promise((r) => setTimeout(r, 50))
  assert.equal(pedidosLike.at(-1), '8772807697', 'o criador: o bot manda de verdade o que ela disse que mandou')
})

test('ElevenLabs: #auroravoz lista as vozes da conta, escolhe pelo nome e o áudio sai por ela', async () => {
  process.env.ELEVENLABS_API_KEY = 'chave-eleven'
  banco.auroraCriador('5544911112222')
  try {
    assert.match((await respostaDe(mensagem('#auroravoz')))[0].conteudo.text, /ElevenLabs\): Aurora BR[\s\S]*#auroravoz Luna Calma/)
    assert.match((await respostaDe(mensagem('#auroravoz luna')))[0].conteudo.text, /Luna Calma/)
    assert.equal(banco.auroraVoz(), 'XyZ0123456789abcdEFG')
    respostaIa = 'oii, tô aqui sim'
    const saiu = await respostaDe(mensagem('aurora manda um áudio'))
    assert.equal(saiu[0].conteudo.type, 'audio')
    assert.equal(pedidosVoz.at(-1), 'oii, tô aqui sim')
  } finally {
    delete process.env.ELEVENLABS_API_KEY
    banco.auroraVoz('')
    respostaIa = 'oi, tô aqui 😌'
  }
})
