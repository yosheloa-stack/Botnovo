// A voz da Aurora: algumas respostas saem como mensagem de voz, feitas na
// Fish Audio (POST /v1/tts). A chave fica no ambiente (FISH_AUDIO_API_KEY),
// nunca no repositório. Deu ruim na API: a resposta sai em texto, como sempre.
//
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
  misteriosa: { id: 'eb81775a43bc469dafda02de59d13cb7', nome: 'Julia', jeito: 'doce, calma e misteriosa' }
}
const numeroEnv = (nome, padrao) => {
  const n = Number(process.env[nome])
  return process.env[nome] !== undefined && process.env[nome] !== '' && Number.isFinite(n) ? n : padrao
}

export const vozLigada = () => Boolean(String(process.env.FISH_AUDIO_API_KEY || '').trim())

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
- Palavras inteiras e claras: "você", "porque", "também" (nada de vc, pq, tbm, cê).
- Fala de gente: "ahh", "hmm", "tipo", "né", "olha", "nossa", "aí", uma vírgula onde você respiraria, reticências quando pensa.
- Marcações de voz (em inglês, entre colchetes, fora do texto falado), no máximo 2 por áudio: emoção no começo da frase ([happy], [excited], [playful], [soft tone], [slightly sad], [whispering]) e som ou pausa no meio ([laughing], [chuckling], [sighing], [break], [long-break]).
- Exemplo: [playful] ahh para, kkk... [break] tô aqui sim, ué. [chuckling] fala, o que você quer?`

// Faz o áudio. Devolve { audio: Uint8Array, mimetype } ou null (aí vai texto).
// escolha(): { voz, velocidade } que o criador escolheu no zap (#auroravoz).
export function createVoz({ fetch: fetchFn = globalThis.fetch, converter = paraOgg, agora = () => Date.now(), log = () => {}, escolha = () => ({}) } = {}) {
  let dia = ''
  let usados = 0
  let semCreditoAte = 0

  function cabeHoje() {
    const hoje = new Date(agora() - 3 * 3600_000).toISOString().slice(0, 10)
    if (hoje !== dia) { dia = hoje; usados = 0 }
    return usados < numeroEnv('AURORA_AUDIO_DIA', 80)
  }

  async function pedir(texto, modelo) {
    // Um pouco mais devagar e estável: a voz animada correndo fica difícil de entender.
    const minha = escolha() || {}
    const velocidade = Math.min(1.5, Math.max(0.6, Number(minha.velocidade) || numeroEnv('FISH_AUDIO_VELOCIDADE', VELOCIDADE_PADRAO)))
    const corpo = { text: texto, format: 'opus', latency: 'normal', normalize: true, language: 'pt', temperature: 0.6, top_p: 0.7, prosody: { speed: velocidade } }
    corpo.reference_id = String(minha.voz || process.env.FISH_AUDIO_VOZ || '').trim() || VOZ_PADRAO
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 30_000)
    try {
      const res = await fetchFn(API, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${String(process.env.FISH_AUDIO_API_KEY).trim()}`,
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
      const modelo = String(process.env.FISH_AUDIO_MODELO || '').trim()
      let r = await pedir(texto, modelo)
      // Sem crédito no plano pago (402): tenta o modelo do plano grátis uma vez.
      if (r.status === 402 && modelo !== 's2.1-pro-free') r = await pedir(texto, 's2.1-pro-free')
      if (!r.audio) {
        log(`Fish Audio respondeu ${r.status}${r.motivo ? ': ' + r.motivo : ''}`)
        if (r.status === 401 || r.status === 402) semCreditoAte = agora() + 30 * 60_000
        return null
      }
      // O ogg que a Fish Audio manda vem "em streaming" (sem duração certa) e o
      // WhatsApp mostra 0:00 ou não toca: passa pelo ffmpeg pra virar uma
      // mensagem de voz certinha. Sem ffmpeg, vai o original se já for ogg.
      const convertido = await converter(r.audio)
      const audio = convertido && ehOgg(convertido) ? convertido : ehOgg(r.audio) ? r.audio : null
      if (!audio) { log('o áudio da Fish Audio não veio em ogg/opus e não deu pra converter'); return null }
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

// Qualquer áudio → ogg/opus de mensagem de voz (precisa do ffmpeg).
export function paraOgg(entrada) {
  return new Promise((resolve) => {
    let p
    try {
      p = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', 'pipe:0', '-vn', '-map_metadata', '-1', '-ac', '1', '-ar', '48000', '-c:a', 'libopus', '-b:a', '48k', '-vbr', 'on', '-application', 'voip', '-avoid_negative_ts', 'make_zero', '-f', 'ogg', 'pipe:1'])
    } catch { return resolve(null) }
    const partes = []
    p.stdout.on('data', (c) => partes.push(c))
    p.on('error', () => resolve(null))
    p.on('close', (code) => resolve(code === 0 ? new Uint8Array(Buffer.concat(partes)) : null))
    p.stdin.on('error', () => {})
    p.stdin.end(Buffer.from(entrada))
  })
}
