// MARCA DO CLIENTE NOS GRUPOS ALUGADOS.
//
// No grupo de quem alugou o bot não pode aparecer nada da casa: nem o nome
// Aurora, nem o "dev: YoshiGGX", nem o site. Este arquivo só mexe em texto
// (não lê banco), para poder ser testado sozinho: quem decide se o grupo é
// alugado e passa nome/dono é o marcaAluguel.js.
//
// O texto do bot usa letras "enfeitadas" (𝐀𝐮𝐫𝐨𝐫𝐚, 𝙰𝚞𝚛𝚘𝚛𝚊, ᴀᴜʀᴏʀᴀ, 𝑨𝑼𝑹𝑶𝑹𝑨...).
// Por isso cada letra é reduzida à letra simples antes de procurar, e o nome
// do cliente volta escrito no mesmo enfeite da palavra trocada.

const PEQUENAS = { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ' }
const DE_PEQUENA = Object.fromEntries(Object.entries(PEQUENAS).filter(([a, b]) => a !== b).map(([a, b]) => [b, a]))
// Blocos "Mathematical Alphanumeric" sem buracos (negrito, itálico, negrito
// itálico, script negrito, fraktur negrito, sem serifa e variações, mono).
// Maiúscula A = base, minúscula a = base + 26.
const ESTILOS = [0x1D400, 0x1D434, 0x1D468, 0x1D4D0, 0x1D56C, 0x1D5A0, 0x1D5D4, 0x1D608, 0x1D63C, 0x1D670]
const ITALICO = 0x1D434

const SUMIU = '\u0002'
const ROTULO_DONO = { pt: 'Dono', es: 'Dueño', en: 'Owner' }

// Tudo que entrega a casa, procurado no texto já reduzido a letras simples.
// 1) crédito do criador (com ou sem "dev:"), 2) Aurora / Aurora System,
// 3) Auto System, 4) endereço do site.
const PROCURA = /(?:(dev|criador|desenvolvedor|developer|creator)( *: *))?\*?yoshi ?ggx\*?|aurora(?: +system)?|auto ?(?:like ?)?system|(?:https?:\/\/)?(?:www\.)?autolikesystem\.com(?:\.br)?[^\s)\]}>*_~]*/g

function letraSimples(ch) {
  if (ch.length === 1 && ch.charCodeAt(0) < 128) return ch.toLowerCase()
  if (/\s/.test(ch)) return ' '
  if (DE_PEQUENA[ch]) return DE_PEQUENA[ch]
  const n = ch.normalize('NFKC')
  if (/^[A-Za-z]$/.test(n)) return n.toLowerCase()
  // Um caractere por posição: assim o índice do texto reduzido é o mesmo do
  // texto original (contado em letras, não em unidades UTF-16).
  return '\u0001'
}

function estiloDe(ch) {
  const cp = ch.codePointAt(0)
  if (DE_PEQUENA[ch]) return { tipo: 'pequena' }
  for (const base of ESTILOS) if (cp >= base && cp < base + 52) return { tipo: 'math', base }
  return { tipo: 'simples' }
}

function ehMaiuscula(ch) {
  const cp = ch.codePointAt(0)
  for (const base of ESTILOS) if (cp >= base && cp < base + 52) return cp - base < 26
  if (DE_PEQUENA[ch]) return false
  const n = ch.normalize('NFKC')
  return /^[A-Z]$/.test(n)
}

// Escreve `texto` no mesmo enfeite de `amostra` (a palavra que sai).
export function noEstilo(texto, amostra) {
  const letras = Array.from(amostra).filter((ch) => /^[a-z]$/.test(letraSimples(ch)))
  if (!letras.length) return texto
  const estilo = estiloDe(letras[0])
  const tudoMaiusculo = estilo.tipo !== 'pequena' && letras.length > 1 && letras.every(ehMaiuscula)
  const fonte = tudoMaiusculo ? texto.toUpperCase() : texto
  if (estilo.tipo === 'simples') return fonte
  let out = ''
  for (const ch of fonte.normalize('NFD')) {
    const lower = ch.toLowerCase()
    if (estilo.tipo === 'pequena') {
      out += /^[a-z]$/.test(lower) ? PEQUENAS[lower] : ch
      continue
    }
    if (/^[A-Z]$/.test(ch)) out += String.fromCodePoint(estilo.base + ch.charCodeAt(0) - 65)
    else if (/^[a-z]$/.test(ch)) out += ch === 'h' && estilo.base === ITALICO ? 'ℎ' : String.fromCodePoint(estilo.base + 26 + ch.charCodeAt(0) - 97)
    else out += ch
  }
  return out.normalize('NFC')
}

// ESTILO DO MENU que a cliente escolheu no site: troca os ícones verdes do
// Aurora pelos do estilo (rosa, vermelho ou preto) em todas as mensagens.
export const ESTILOS_MENU = {
  rosa: [['💚', '🩷'], ['🟢', '🌸'], ['୨୧', '♡'], ['✨', '💗'], ['❦', '✿'], ['🍀', '🌷']],
  vermelho: [['💚', '❤️'], ['🟢', '🔴'], ['୨୧', '♥'], ['✨', '🔥'], ['❦', '♦'], ['🍀', '🌹'], ['♡', '♥']],
  preto: [['💚', '🖤'], ['🟢', '⚫'], ['୨୧', '†'], ['✨', '🌑'], ['❦', '✠'], ['🍀', '🥀'], ['♡', '†']]
}
// Os ícones de cada linha do menu (👤 💎 🛡️...) também saem: cada linha e
// cada título ganham o próximo ícone do estilo, em rodízio (Yosh, 25/10: "é
// pra trocar, não manter os ícones"). A prévia do site usa a mesma lista.
export const ICONES_MENU = {
  rosa: ['🌸', '🎀', '💗', '🌷'],
  vermelho: ['❤️', '🌹', '🔥', '🍒'],
  preto: ['🖤', '🥀', '🕷️', '🦇']
}
const EMOJI = '\\p{Extended_Pictographic}(?:\\uFE0F|\\u200D\\p{Extended_Pictographic}|[\\u{1F3FB}-\\u{1F3FF}])*'
const ICONE_DO_MENU = new RegExp(`(^┃╎୨୧ |〔 • [^•〕\\n]+ • )${EMOJI}(?=\\s)`, 'gmu')
export function aplicarEstilo(texto, estilo) {
  const trocas = ESTILOS_MENU[estilo]
  if (!trocas || typeof texto !== 'string' || !texto) return texto
  const icones = ICONES_MENU[estilo]
  let i = 0
  let out = texto.replace(ICONE_DO_MENU, (_, antes) => antes + icones[i++ % icones.length])
  for (const [de, para] of trocas) if (out.includes(de)) out = out.split(de).join(para)
  return out
}

// Troca a marca da casa num texto. `marca` = { nome, dono, donoNome, idioma, estilo }.
// Devolve o texto novo; se nada mudou, devolve o mesmo texto.
export function trocarMarcaTexto(texto, marca) {
  if (typeof texto !== 'string' || !texto || !marca) return texto
  return aplicarEstilo(trocarSoMarca(texto, marca), marca.estilo)
}

function trocarSoMarca(texto, marca) {
  const letras = Array.from(texto)
  const simples = letras.map(letraSimples).join('')
  PROCURA.lastIndex = 0
  if (!PROCURA.test(simples)) return texto
  PROCURA.lastIndex = 0

  const nome = String(marca.nome || '').trim() || 'Bot'
  const dono = String(marca.dono || '').replace(/\D/g, '')
  const donoNome = String(marca.donoNome || '').trim()
  const rotulo = ROTULO_DONO[marca.idioma] || ROTULO_DONO.pt
  let out = '', fim = 0, m
  while ((m = PROCURA.exec(simples))) {
    const ini = m.index, ate = ini + m[0].length
    const original = letras.slice(ini, ate).join('')
    out += letras.slice(fim, ini).join('')
    const achado = m[0]
    if (/yoshi ?ggx/.test(achado)) {
      // O crédito vira o dono do aluguel (o nome, se ela cadastrou; senão a
      // menção do número); sem dono cadastrado, some.
      if (donoNome) out += m[1] ? `${noEstilo(rotulo, letras.slice(ini, ini + m[1].length).join(''))}${m[2]}${donoNome}` : donoNome
      else if (dono) out += m[1] ? `${noEstilo(rotulo, letras.slice(ini, ini + m[1].length).join(''))}${m[2]}@${dono}` : `@${dono}`
      else out += SUMIU
    } else if (/autolikesystem/.test(achado)) {
      out += SUMIU // endereço do site some
    } else {
      out += noEstilo(nome, original)
    }
    fim = ate
  }
  out += letras.slice(fim).join('')
  return out.includes(SUMIU) ? limparLinhas(out) : out
}

// Onde algo foi apagado, sai junto o "•" que o separava. Linha que só tinha a
// marca (ex.: "┃╎୨୧ ᴅᴇᴠ: YoshiGGX" sem dono) fica só com enfeite e sai inteira.
// (୨୧ são algarismos oriá do enfeite; por isso só conta letra ou 0-9.)
function limparLinhas(texto) {
  return texto.split('\n').map((linha) => {
    if (!linha.includes(SUMIU)) return linha
    const limpa = linha.replace(/[ \t]*(?:•[ \t]*)?\u0002/g, '')
    return /\p{L}|[0-9]/u.test(limpa) ? limpa : null
  }).filter((linha) => linha !== null).join('\n')
}

// Campos que nunca são texto para o usuário (ids, jids, mídia).
const PULAR = new Set(['id', 'jid', 'remoteJid', 'participant', 'stanzaId', 'mentions', 'mentionedJid', 'media', 'url', 'mimetype', 'directPath', 'mediaKey', 'fileSha256', 'fileEncSha256', 'jpegThumbnail', 'thumbnail', 'editKey', 'target', 'key'])

// Percorre a mensagem inteira (texto, legenda, rodapé, listas, botões, vcard)
// trocando a marca. Não altera o objeto recebido.
export function trocarMarca(valor, marca, nivel = 0) {
  if (!marca || nivel > 14) return valor
  if (typeof valor === 'string') return trocarMarcaTexto(valor, marca)
  if (Array.isArray(valor)) return valor.map((item) => trocarMarca(item, marca, nivel + 1))
  if (!valor || typeof valor !== 'object' || Buffer.isBuffer(valor) || ArrayBuffer.isView(valor) || valor instanceof ArrayBuffer) return valor
  if (Object.getPrototypeOf(valor) !== Object.prototype && Object.getPrototypeOf(valor) !== null) return valor
  const out = {}
  for (const [k, v] of Object.entries(valor)) {
    if (PULAR.has(k)) out[k] = v
    else if (typeof v === 'string' && /Json$/.test(k) && v) {
      // buttonParamsJson / paramsJson: troca dentro do JSON sem quebrá-lo.
      try { out[k] = JSON.stringify(trocarMarca(JSON.parse(v), marca, nivel + 1)) } catch { out[k] = v }
    } else out[k] = trocarMarca(v, marca, nivel + 1)
  }
  return out
}

// Erro da API mostrado no grupo alugado: se citar site, hospedagem ou vier em
// HTML, vai a mensagem padrão do comando.
export function erroParaCliente(erro, padrao) {
  const e = String(erro || '').trim()
  if (!e) return padrao
  return /https?:\/\/|www\.|\.com\b|\.br\b|square ?cloud|cloudflare|<[a-z!/]/i.test(e) ? padrao : e
}
