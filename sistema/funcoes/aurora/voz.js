// A voz da Aurora: algumas respostas saem como mensagem de voz, feitas na
// ElevenLabs (com ELEVENLABS_API_KEY) ou na Fish Audio (FISH_AUDIO_API_KEY).
// As chaves ficam no ambiente, nunca no repositório. Deu ruim na API: a
// resposta sai em texto, como sempre.
//
// ELEVENLABS_API_KEY  chave da ElevenLabs (com ela, a ElevenLabs é quem fala)
// ELEVENLABS_VOZ      ID da voz; vazio = a voz escolhida pelo criador (ELEVEN_VOZ_PADRAO)
// ELEVENLABS_MODELO   eleven_v3 (padrão, entende [laughs], [whispers]…) ou eleven_multilingual_v2
// FISH_AUDIO_API_KEY  chave da Fish Audio (sem ela, nada de áudio)
// FISH_AUDIO_VOZ      ID do modelo de voz (reference_id); vazio = a "Loli" (VOZ_PADRAO)
// FISH_AUDIO_MODELO   s2.1-pro (padrão), s2-pro, s1, s2.1-pro-free…
// FISH_AUDIO_VELOCIDADE velocidade da fala, 0.6 a 1.5 (padrão 0.85; 1 = normal). O #auroravoz no zap ganha dos dois.
// AURORA_AUDIO_CHANCE chance (0 a 1) de uma resposta curta sair em áudio sem pedirem (padrão 0.2)
// AURORA_AUDIO_DIA    teto de áudios por dia (padrão 80)
import { spawn } from 'node:child_process'
import { semAcento } from './ia.js'

const API = 'https://api.fish.audio/v1/tts'
// "Loli" no fish.audio: voz jovem, animada e brincalhona, em português.
export const VOZ_PADRAO = '97630cc4349d4a169bf242b8c819081c'
export const VELOCIDADE_PADRAO = 0.85
// As vozes que dá pra escolher pelo nome no #auroravoz.
export const VOZES = {
  loli: { id: '97630cc4349d4a169bf242b8c819081c', nome: 'Loli', jeito: 'jovem, animada e brincalhona' },
  fofa: { id: '24522123b5804bf691a8450d9187f03e', nome: 'Garota fofa', jeito: 'moça nova, calma e clara' },
  isabela: { id: '5661bf8cb97740fcb10d2f756abf7779', nome: 'Isabela', jeito: 'suave, meio sussurrada' },
  sunny: { id: 'b7105f831b9644f28b0a92e004d9fd94', nome: 'Sunny', jeito: 'animada, jeito de tiktoker' },
  madura: { id: 'ca0326921a254a7295650b2cf85fe098', nome: 'Mulher de 30', jeito: 'calma e acolhedora' },
  misteriosa: { id: 'eb81775a43bc469dafda02de59d13cb7', nome: 'Julia', jeito: 'doce, calma e misteriosa' },
  rize: { id: '5d83ac54f5c844ee9746112a9310d72f', nome: 'Rize Kamishiro', jeito: 'a da personagem do anime, em português' }
}
const numeroEnv = (nome, padrao) => {
  const n = Number(process.env[nome])
  return process.env[nome] !== undefined && process.env[nome] !== '' && Number.isFinite(n) ? n : padrao
}

const chaveEleven = () => String(process.env.ELEVENLABS_API_KEY || '').trim()
const chaveFish = () => String(process.env.FISH_AUDIO_API_KEY || '').trim()
// A ElevenLabs ganha quando tem a chave dela.
export const provedorVoz = () => chaveEleven() ? 'ElevenLabs' : chaveFish() ? 'Fish Audio' : ''
export const vozLigada = () => Boolean(provedorVoz())

// A voz que o criador escolheu pra ElevenLabs.
export const ELEVEN_VOZ_PADRAO = 'NS7yU4WmAouJsg84X3Mg'
const ELEVEN_API = 'https://api.elevenlabs.io/v1'
// ID da Fish (32 hex) não serve na ElevenLabs e vice-versa.
export const ehIdFish = (id = '') => /^[a-f0-9]{32}$/.test(String(id))
export const ehIdEleven = (id = '') => /^[A-Za-z0-9]{16,32}$/.test(String(id)) && !ehIdFish(id)

// As marcações da Fish viram as da ElevenLabs v3 ([laughs], [whispers]…); a
// pausa vira reticências. Nos modelos sem marcação, elas saem.
const PRA_ELEVEN = { laughing: 'laughs', chuckling: 'chuckles', sighing: 'sighs', whispering: 'whispers', gasping: 'gasps', 'soft tone': 'softly', 'slightly mocking': 'sarcastic' }
export function falaPraEleven(texto = '', modelo = 'eleven_v3') {
  let t = String(texto).replace(/\[(long-break|break)\]/gi, '…').replace(/…(\s*…)+/g, '…').replace(/\[brazilian[^\]]*\]\s*/gi, '')
  if (!/v3/.test(modelo)) return semTagsDeVoz(t).replace(/…(\s*…)+/g, '…').trim()
  t = t.replace(/\[([a-z][a-z' -]{1,30})\]/gi, (_, tag) => `[${PRA_ELEVEN[tag.toLowerCase()] || tag.toLowerCase()}]`)
  return t.replace(/[ \t]{2,}/g, ' ').trim()
}

// As vozes da conta na ElevenLabs (pro #auroravoz listar e escolher pelo nome).
export async function vozesEleven(fetchFn = globalThis.fetch) {
  if (!chaveEleven()) return []
  try {
    const res = await fetchFn(`${ELEVEN_API}/voices`, { headers: { 'xi-api-key': chaveEleven() }, signal: AbortSignal.timeout(10_000) })
    if (!res.ok) return []
    const data = await res.json()
    return (data?.voices || []).map((v) => ({ id: String(v.voice_id || ''), nome: String(v.name || '').slice(0, 40), categoria: String(v.category || ''), genero: String(v.labels?.gender || '') })).filter((v) => v.id)
  } catch { return [] }
}

// Uma voz que o plano grátis da ElevenLabs deixa usar pela API: as prontas
// (premade) ou as que o criador fez na conta; de mulher, se tiver.
export function vozGratis(vozes = []) {
  const liberadas = vozes.filter((v) => ['premade', 'generated', 'cloned'].includes(v.categoria))
  return liberadas.find((v) => /female|mulher|feminin/i.test(v.genero) && v.categoria !== 'premade') ||
    liberadas.find((v) => /female|mulher|feminin/i.test(v.genero)) || liberadas[0] || null
}

// "manda um áudio", "fala em áudio", "responde por voz", "quero ouvir sua voz"
export function pediuAudio(texto = '') {
  const t = semAcento(texto)
  if (/\b(nao|sem)\s+(\w+\s+)?(audio|voz)/.test(t)) return false
  return /\b(em|por|num|no|um|uns|outro)\s+(audio|audios|audiozinho|voz)\b|\b(manda|mande|envia|grava|grave|fala|responde|quero ouvir|ouvir)\w*\b.{0,25}\b(audio|audiozinho|voz|vozinha)\b|\bsua voz\b/.test(t)
}

// As marcações de fala da Fish Audio (S2): [break], [laughing], [sighing],
// [excited]… Em texto elas somem.
export const semTagsDeVoz = (texto = '') => String(texto).replace(/[ \t]*\[[a-z][a-z' -]{1,30}\][ \t]*/gi, ' ').replace(/ +([,.!?…])/g, '$1').replace(/[ \t]{2,}/g, ' ').trim()

// "manda um áudio falando: bom dia grupo" → "bom dia grupo" (ela fala igual).
// Com aspas vale o que está entre aspas.
export function fraseDoAudio(texto = '') {
  const t = String(texto).trim()
  if (!/(?<!\p{L})([aá]udio|voz)(?!\p{L})/iu.test(t)) return ''
  const QUOTES = /["“”‘’]/g
  // Tira aspas soltas e o " / " entre frases; precisa sobrar fala de verdade.
  const limpar = (f) => String(f).replace(QUOTES, ' ').replace(/\s+\/\s+/g, ' ').replace(/^[\s:,/-]+|[\s/,-]+$/g, '').replace(/\s{2,}/g, ' ').trim()
  const temFala = (f) => (f.match(/\p{L}/gu) || []).length >= 2
  const depois = t.match(/\b(?:falando|dizendo|que diz|com a frase|repete|repita|fala|diz|falar|dizer)\b([\s\S]{2,600})$/i)
  if (depois) {
    let frase = depois[1].trim()
      .replace(/^(?:(?:em|por|no|num)\s+(?:um\s+)?[aá]udio\b[\s,:]*)/i, '')
      .replace(/^(?:essa frase|esta frase|a frase|assim|isso)\b[\s,:]*/i, '')
      .replace(/^(?::|que\s+)\s*/i, '')
    // "fala comigo por áudio" não é frase pra repetir.
    if (!/^(comigo|com (a gente|ele|ela|eles)|[aá]udio|algo|alguma coisa|qualquer coisa)?\s*$|^(comigo|com (a gente|ele|ela|eles)|algo|alguma coisa|qualquer coisa)\b/i.test(frase)) {
      frase = limpar(frase.replace(/[\s,]*(?:(?:em|por|no|num)\s+)?(?:um\s+)?[aá]udio[\s.!]*$/i, ''))
      if (temFala(frase)) return frase
    }
  }
  const aspas = [...t.matchAll(/["“”]([^"“”]{2,600})["“”]/g)].map((m) => limpar(m[1])).filter(temFala)
  return aspas.length ? limpar(aspas.join(' ')) : ''
}

// Ela ofereceu ("posso mandar um áudio?", "quer ouvir minha voz?") e a
// pessoa topou ("s pode", "manda", "sim"): conta como pedido de áudio.
export function ofereceuAudio(textoDela = '') {
  const t = semAcento(textoDela)
  return /\b(audio|audiozinho|voz)\b/.test(t) && /\?|\b(posso|quer|queres|querem|mando|te mando|bora|topa|gravo)\b/.test(t)
}
export function topou(texto = '') {
  const t = semAcento(texto).replace(/[^a-z\s]/g, ' ').trim()
  return t.length <= 40 && /^(s|ss|sim|simm+|pode|podes|manda|mande|bora|quero|claro|vai|vamo|uhum|aham|ok|okay|blz|beleza|isso|por favor|pfv|sim sim|com certeza|obvio|lógico|logico|demorou|fechou)\b/.test(t) && !/\bnao\b/.test(t)
}

// Abreviação de zap a voz lê errado: "vc" vira "vê cê".
const POR_EXTENSO = { vc: 'você', vcs: 'vocês', pq: 'porque', tb: 'também', tbm: 'também', mds: 'meu Deus', blz: 'beleza', msm: 'mesmo', q: 'que', n: 'não', oq: 'o que', cmg: 'comigo', td: 'tudo', hj: 'hoje', vlw: 'valeu', tmj: 'tamo junto', pfv: 'por favor', pf: 'por favor', obg: 'obrigada', dps: 'depois', agr: 'agora', ngm: 'ninguém', qnd: 'quando', ctz: 'certeza', sla: 'sei lá', bjs: 'beijos', bj: 'beijo', mto: 'muito', mt: 'muito', tlgd: 'tá ligado', slk: 'sério' }
const ABREVIACAO = new RegExp(`(?<![\\p{L}\\d])(${Object.keys(POR_EXTENSO).join('|')})(?![\\p{L}\\d])`, 'giu')

// O que vai pra voz: sem link, sem marcação e sem *negrito*. Risada e
// reticências viram risada e pausa de verdade; o resto dos emojis some.
export function textoFalado(resposta = '') {
  return String(resposta)
    .replace(/https?:\/\/\S+/g, '')
    .replace(/@\d{6,20}/g, '')
    .replace(/[*_~`]/g, '')
    .replace(ABREVIACAO, (a) => POR_EXTENSO[a.toLowerCase()])
    .replace(/(^|\s)(k{3,}|(ha){2,}h?|(he){2,}h?|(ks){2,}|rs(rs)*)(?=[\s.,!?]|$)/gi, (_, a) => `${a}[laughing] ha ha `)
    .replace(/(😂|🤣)+/gu, ' [laughing] ')
    .replace(/(😅|😆|😁)+/gu, ' [chuckling] ')
    .replace(/(😮‍💨|😔|😞|🥲)+/gu, ' [sighing] ')
    .replace(/(\.\.\.|…)(?!\s*\[)/g, '… [break]')
    .replace(/\p{Extended_Pictographic}|\p{Emoji_Modifier}|\u200d|\ufe0f/gu, '')
    .replace(/(\[[a-z' -]+\])(\s*\1)+/gi, '$1')
    .replace(/[ \t]+/g, ' ')
    .replace(/ +([,.!?…])/g, '$1')
    .replace(/\s*\n\s*/g, '\n')
    .trim()
}

// Áudio só pra conversa: link, marcação, ID, lista ou comando ficam no texto
// (ninguém copia um ID de um áudio). Pediram áudio: cabe mais.
export function podeFalar(resposta = '', { pediu = false } = {}) {
  const r = String(resposta)
  if (!r.trim()) return false
  if (/https?:\/\/|www\.|\.com\b|@\d{6,}|\d{8,}/i.test(r)) return false
  if (/^\s*([-•*]|\d+[.)])\s/m.test(r)) return false
  if (/(^|\s)[#/!.][a-z]{2,}\b/i.test(r)) return false
  const falado = semTagsDeVoz(textoFalado(r))
  if (falado.length < 2) return false
  return falado.length <= (pediu ? 600 : 220) && (pediu || !/r\$/i.test(r))
}

export const BLOCO_VOZ = `ESTA RESPOSTA VAI SAIR EM ÁUDIO (mensagem de voz com a sua voz). Você consegue mandar áudio: nunca diga que não manda.
Escreva como quem grava um áudio de verdade pra amiga, falado e não lido:
- Curto: 1 a 3 frases. Nada de emoji, link, lista, @ ou ID.
- Português do Brasil, jeito brasileiro de falar ("você", "tá", "a gente"), nunca de Portugal (nada de "estás", "tu vais", "a falar").
- Palavras inteiras e claras: "você", "porque", "também" (nada de vc, pq, tbm, cê).
- Fala de gente: "ahh", "hmm", "tipo", "né", "olha", "nossa", "aí", uma vírgula onde você respiraria, reticências quando pensa.
- Marcações de voz (em inglês, entre colchetes, fora do texto falado), no máximo 2 por áudio: emoção no começo da frase ([happy], [excited], [playful], [soft tone], [slightly sad], [whispering]) e som ou pausa no meio ([laughing], [chuckling], [sighing], [break], [long-break]).
- Exemplo: [playful] ahh para, kkk... [break] tô aqui sim, ué. [chuckling] fala, o que você quer?`

// Jeitos de falar prontos pro #auroravoz estilo NOME.
export const ESTILOS = {
  sombria: 'doce, educada e calma por fora, falando devagar e baixinho, meio sedutora; de repente o tom fica frio, sombrio e ameaçador, com um sussurro ou uma risadinha sinistra no fim',
  fofa: 'meiga, carinhosa e alegre, voz leve, sorrindo enquanto fala, risadinhas curtas',
  animada: 'empolgada, rápida e expressiva, rindo fácil, como quem conta novidade pra amiga',
  calma: 'tranquila, acolhedora e serena, falando devagar, com pausas pra respirar'
}

// O bloco de áudio da IA, com o jeito de falar que o criador escolheu.
export function blocoVoz(estilo = '') {
  const e = String(estilo || '').trim()
  return e ? `${BLOCO_VOZ}\nJEITO DE FALAR NOS SEUS ÁUDIOS: ${e}. As palavras e as marcações têm que deixar a entonação exatamente assim.` : BLOCO_VOZ
}

// Diretor de voz: a mesma frase, palavra por palavra, só com as marcações
// da Fish Audio no lugar certo pra soar no jeito escolhido.
export function pedidoDeDirecao(frase = '', estilo = '') {
  return [
    { role: 'system', content: `Você é diretor(a) de dublagem. Recebe uma fala em português do Brasil e devolve A MESMA fala, palavra por palavra, só acrescentando marcações de voz da Fish Audio entre colchetes, em inglês, pra entonação ficar assim: ${String(estilo || '').trim() || 'natural, humana e expressiva, como gente de verdade falando'}.
Marcações que funcionam: emoção ou tom no começo da frase ([soft tone], [whispering], [calm], [seductive], [sinister], [cold], [happy], [excited], [sad], [angry], [playful], [slightly mocking]) e som ou pausa no meio ([break], [long-break], [sighing], [chuckling], [laughing], [gasping]). Pode usar intensidade ([very], [slightly]).
Regras: não troque, não tire e não acrescente nenhuma palavra; use de 2 a 6 marcações; responda só com a fala marcada, sem aspas e sem explicação.` },
    { role: 'user', content: String(frase).slice(0, 600) }
  ]
}
const soLetras = (t = '') => semAcento(semTagsDeVoz(t)).replace(/[^a-z0-9]+/g, '')
// A IA mexeu nas palavras? Então não vale: vai a frase como estava.
export function direcaoValida(frase = '', marcada = '') {
  const m = String(marcada || '').trim().replace(/^["“]|["”]$/g, '')
  return m && /\[[a-z]/i.test(m) && soLetras(m) === soLetras(frase) ? m : ''
}

// Faz o áudio. Devolve { audio: Uint8Array, mimetype } ou null (aí vai texto).
// escolha(): { voz, velocidade } que o criador escolheu no zap (#auroravoz).
export function createVoz({ fetch: fetchFn = globalThis.fetch, converter = limparAudio, agora = () => Date.now(), log = () => {}, escolha = () => ({}) } = {}) {
  let dia = ''
  let usados = 0
  let semCreditoAte = 0

  function cabeHoje() {
    const hoje = new Date(agora() - 3 * 3600_000).toISOString().slice(0, 10)
    if (hoje !== dia) { dia = hoje; usados = 0 }
    return usados < numeroEnv('AURORA_AUDIO_DIA', 80)
  }

  async function pedirFish(texto, modelo) {
    // Um pouco mais devagar e estável: a voz animada correndo fica difícil de entender.
    const minha = escolha() || {}
    const velocidade = Math.min(1.5, Math.max(0.6, Number(minha.velocidade) || numeroEnv('FISH_AUDIO_VELOCIDADE', VELOCIDADE_PADRAO)))
    // O sotaque vem da voz; a dica no começo puxa pro português do Brasil.
    const fala = /^\s*\[brazilian/i.test(texto) ? texto : `[Brazilian Portuguese accent] ${texto}`
    const corpo = { text: fala, format: 'opus', opus_bitrate: 64000, latency: 'normal', normalize: true, language: 'pt-BR', temperature: 0.6, top_p: 0.7, prosody: { speed: velocidade } }
    corpo.reference_id = (ehIdFish(minha.voz) ? minha.voz : '') || String(process.env.FISH_AUDIO_VOZ || '').trim() || VOZ_PADRAO
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 30_000)
    try {
      const res = await fetchFn(API, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${chaveFish()}`,
          'content-type': 'application/json',
          ...(modelo ? { model: modelo } : {})
        },
        body: JSON.stringify(corpo),
        signal: ctrl.signal
      })
      if (!res.ok) {
        let motivo = ''
        try { motivo = (await res.json())?.message || '' } catch {}
        return { status: res.status, motivo }
      }
      return { audio: new Uint8Array(await res.arrayBuffer()) }
    } finally {
      clearTimeout(timer)
    }
  }

  async function pedirEleven(texto, modelo, vozForcada = '') {
    const minha = escolha() || {}
    const velocidade = Math.min(1.2, Math.max(0.7, Number(minha.velocidade) || numeroEnv('ELEVENLABS_VELOCIDADE', 0.95)))
    const escolhida = ehIdEleven(minha.voz) ? minha.voz : ''
    const voz = vozForcada || escolhida || String(process.env.ELEVENLABS_VOZ || '').trim() || ELEVEN_VOZ_PADRAO
    const corpo = {
      text: falaPraEleven(texto, modelo),
      model_id: modelo,
      // v3: estabilidade 0.5 é o "Natural" (0 = criativo demais, 1 = robótico).
      voice_settings: /v3/.test(modelo)
        ? { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true, speed: velocidade }
        : { stability: 0.4, similarity_boost: 0.75, style: 0.25, use_speaker_boost: true, speed: velocidade }
    }
    if (/v3|flash|turbo/.test(modelo)) corpo.language_code = 'pt'
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 40_000)
    try {
      const res = await fetchFn(`${ELEVEN_API}/text-to-speech/${encodeURIComponent(voz)}?output_format=opus_48000_64`, {
        method: 'POST',
        headers: { 'xi-api-key': chaveEleven(), 'content-type': 'application/json', accept: 'audio/ogg' },
        body: JSON.stringify(corpo),
        signal: ctrl.signal
      })
      if (!res.ok) {
        let motivo = ''
        try { const d = (await res.json())?.detail; motivo = typeof d === 'string' ? d : d?.message || d?.status || '' } catch {}
        return { status: res.status, motivo: String(motivo) }
      }
      return { audio: new Uint8Array(await res.arrayBuffer()) }
    } finally {
      clearTimeout(timer)
    }
  }

  // Pede pra ElevenLabs (se o v3 não estiver liberado na conta, tenta o
  // multilingual v2, sem as marcações). Ela recusou (sem plano, sem crédito,
  // voz da biblioteca no plano grátis…)? Vai pela Fish Audio, se tiver a chave.
  let elevenParadaAte = 0
  let substituta  // a voz liberada no plano grátis, quando a escolhida não é
  async function pedir(texto) {
    let r = { status: 0, motivo: 'sem chave de voz' }
    // O criador escolheu uma voz da Fish (#auroravoz rize)? Vai direto nela.
    const vozFish = chaveFish() && ehIdFish((escolha() || {}).voz)
    if (chaveEleven() && !vozFish && elevenParadaAte <= agora()) {
      const modelo = String(process.env.ELEVENLABS_MODELO || '').trim() || 'eleven_v3'
      r = await pedirEleven(texto, modelo)
      if (!r.audio && [400, 403, 404, 422].includes(r.status) && modelo !== 'eleven_multilingual_v2') r = await pedirEleven(texto, 'eleven_multilingual_v2')
      // Plano grátis não usa voz da biblioteca pela API: continua na ElevenLabs
      // com uma voz liberada da conta (e avisa uma vez qual).
      if (!r.audio && r.status === 402 && /library voice/i.test(r.motivo)) {
        if (substituta === undefined) {
          substituta = vozGratis(await vozesEleven(fetchFn))
          log(substituta ? `a voz escolhida é da biblioteca e o plano grátis da ElevenLabs não libera pela API; usando a "${substituta.nome}" da sua conta` : 'a voz escolhida é da biblioteca e a conta não tem outra voz liberada')
        }
        if (substituta) {
          r = await pedirEleven(texto, modelo, substituta.id)
          if (!r.audio && [400, 403, 404, 422].includes(r.status) && modelo !== 'eleven_multilingual_v2') r = await pedirEleven(texto, 'eleven_multilingual_v2', substituta.id)
        }
      }
      if (r.audio) return { ...r, provedor: 'ElevenLabs' }
      log(`ElevenLabs respondeu ${r.status}${r.motivo ? ': ' + r.motivo : ''}${chaveFish() ? ' (vou pela Fish Audio)' : ''}`)
      if (r.status === 401 || r.status === 402) elevenParadaAte = agora() + 30 * 60_000
    }
    if (!chaveFish()) return { ...r, provedor: 'ElevenLabs', avisado: true }
    const modelo = String(process.env.FISH_AUDIO_MODELO || '').trim()
    r = await pedirFish(texto, modelo)
    // Sem crédito no plano pago (402): tenta o modelo do plano grátis uma vez.
    if (r.status === 402 && modelo !== 's2.1-pro-free') r = await pedirFish(texto, 's2.1-pro-free')
    return { ...r, provedor: 'Fish Audio' }
  }

  // Decide antes da IA responder, pra ela já escrever pensando na voz.
  // sorte: 0 a 1 (Math.random), só conta quando não pediram.
  function vaiFalar({ pediu = false, sorte = Math.random() } = {}) {
    if (!vozLigada() || semCreditoAte > agora()) return false
    if (!pediu && sorte >= numeroEnv('AURORA_AUDIO_CHANCE', 0.2)) return false
    return cabeHoje()
  }

  async function falar(resposta) {
    const texto = textoFalado(resposta).slice(0, 700)
    if ((semTagsDeVoz(texto).match(/\p{L}/gu) || []).length < 2 || !vozLigada()) return null
    try {
      const r = await pedir(texto)
      if (!r.audio) {
        if (!r.avisado) log(`${r.provedor} respondeu ${r.status}${r.motivo ? ': ' + r.motivo : ''}`)
        if (r.status === 401 || r.status === 402) semCreditoAte = agora() + 30 * 60_000
        return null
      }
      // O ogg que a API manda vem "em streaming" (sem duração certa) e o
      // WhatsApp mostra 0:00 ou não toca: passa pelo ffmpeg pra virar uma
      // mensagem de voz certinha. Sem ffmpeg, vai o original se já for ogg.
      const convertido = await converter(r.audio, r.provedor)
      const audio = convertido && ehOgg(convertido) ? convertido : ehOgg(r.audio) ? r.audio : null
      if (!audio) { log(`o áudio da ${provedorVoz()} não veio em ogg/opus e não deu pra converter`); return null }
      // Áudio vazio (só o cabeçalho) chega no zap como 0:00 e não toca.
      if (audio.length < 1000) { log(`o áudio veio vazio (${audio.length} bytes)`); return null }
      usados++
      const seconds = duracaoOgg(audio)
      return { audio, mimetype: 'audio/ogg; codecs=opus', ...(seconds ? { seconds } : {}) }
    } catch (err) {
      log(`falhou ao gerar o áudio: ${err?.name === 'AbortError' ? 'demorou demais' : err?.message || err}`)
      return null
    }
  }

  return { vaiFalar, falar }
}

// Duração de um ogg/opus: a posição da última página menos o pre-skip, em 48 kHz.
export function duracaoOgg(b) {
  if (!ehOgg(b)) return 0
  const buf = Buffer.from(b.buffer, b.byteOffset, b.byteLength)
  // A maior posição válida entre as páginas (no streaming a última pode vir -1).
  let granulo = 0
  for (let i = buf.indexOf('OggS'); i >= 0 && i + 14 <= buf.length; i = buf.indexOf('OggS', i + 4)) {
    const g = buf.readBigUInt64LE(i + 6)
    if (g < 2n ** 40n && Number(g) > granulo) granulo = Number(g)
  }
  const cabeca = buf.indexOf('OpusHead')
  const preSkip = cabeca >= 0 && cabeca + 12 <= buf.length ? buf.readUInt16LE(cabeca + 10) : 0
  const s = (granulo - preSkip) / 48000
  return Number.isFinite(s) && s > 0 && s < 3600 ? Math.max(1, Math.round(s)) : 0
}

export const ehOgg = (b) => b?.length > 4 && b[0] === 0x4f && b[1] === 0x67 && b[2] === 0x67 && b[3] === 0x53

// Isola a voz: só a faixa da fala (90 Hz a 9,5 kHz), tira o chiado, corta o
// ruído entre as palavras, realça a presença da voz e acerta o volume.
const FILTRO_VOZ = 'highpass=f=90,lowpass=f=9500,afftdn=nf=-30:nr=15:tn=1,agate=threshold=0.015:ratio=3:attack=5:release=200,equalizer=f=3000:t=q:w=1:g=2,acompressor=threshold=-20dB:ratio=3:attack=10:release=150,loudnorm=I=-16:TP=-1.5:LRA=11'

// Tira o chiado (filtro de ruído), corta o grave sujo e acerta o volume. Se o
// ffmpeg do servidor não tiver o filtro, converte sem ele.
// A voz da ElevenLabs já vem limpa: o filtro de ruído aprendia o "ruído" no
// começo da fala e deixava o início robótico. Nela só entra um respiro de
// 150 ms no começo, pro WhatsApp não comer a primeira sílaba.
const FILTRO_LEVE = 'adelay=150:all=1'
export async function limparAudio(entrada, provedor = '') {
  const filtro = provedor === 'ElevenLabs' ? FILTRO_LEVE : FILTRO_VOZ
  return (await paraOgg(entrada, { filtro })) || paraOgg(entrada)
}

// Qualquer áudio → ogg/opus de mensagem de voz (precisa do ffmpeg).
export function paraOgg(entrada, { filtro = '' } = {}) {
  return new Promise((resolve) => {
    let p
    try {
      p = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', 'pipe:0', '-vn', '-map_metadata', '-1', ...(filtro ? ['-af', filtro === true ? FILTRO_VOZ : filtro] : []), '-ac', '1', '-ar', '48000', '-c:a', 'libopus', '-b:a', '48k', '-vbr', 'on', '-application', 'voip', '-avoid_negative_ts', 'make_zero', '-f', 'ogg', 'pipe:1'])
    } catch { return resolve(null) }
    const partes = []
    p.stdout.on('data', (c) => partes.push(c))
    p.on('error', () => resolve(null))
    p.on('close', (code) => resolve(code === 0 ? new Uint8Array(Buffer.concat(partes)) : null))
    p.stdin.on('error', () => {})
    p.stdin.end(Buffer.from(entrada))
  })
}
