// TRADUZ O QUE O BOT MANDA PARA O IDIOMA DO GRUPO (es / en).
//
// Os textos do bot nasceram em português e usam letras enfeitadas
// (𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐢𝐧𝐯𝐚́𝐥𝐢𝐝𝐨!, ᴜsᴜᴀ́ʀɪᴏ:, 𝙰𝚃𝙸𝚅𝙰𝙳𝙾). Em vez de reescrever cada
// mensagem em três idiomas, o envio passa por aqui: cada letra é lida como
// letra comum, as frases do dicionário (traducoes.js) são procuradas, e a
// tradução volta escrita na mesma fonte e com as mesmas maiúsculas.
//
// Não traduz: nome de comando (o que vem colado no prefixo), link, menção,
// tag #nome#. Português passa direto, sem custo.

import { letraComum, naFonte } from './fontes.js'
import { FRASES, ARGUMENTOS } from './traducoes.js'

const POSICAO = { es: 1, en: 2 }
// Caracteres que, colados antes de uma palavra, fazem dela um comando ou tag.
const PREFIXOS = '#/!.$%&+=?@'
const ehLetra = (ch) => /^[\p{L}\p{N}]$/u.test(ch)
const ehMarca = (ch) => /^\p{M}$/u.test(ch)

// Texto → unidades. Cada unidade é uma letra comum minúscula (ou o próprio
// caractere), guardando de qual caractere do original ela veio, a fonte e se
// era maiúscula. Acento vira unidade própria (marca combinada), igual nos
// textos enfeitados (𝐚́) e nos comuns (á).
function unidades(texto) {
  const cps = Array.from(texto)
  const plano = [], origem = [], fonte = [], maiuscula = []
  cps.forEach((cp, i) => {
    const partes = letraComum(cp).fonte !== 'comum' ? [cp] : Array.from(cp.normalize('NFD'))
    for (const u of partes) {
      const { c, fonte: f } = letraComum(u)
      let min = c.toLowerCase()
      if (Array.from(min).length !== 1) min = c
      plano.push(min !== '\n' && /^\s$/u.test(min) ? ' ' : min)
      origem.push(i)
      fonte.push(f)
      maiuscula.push(f !== 'versalete' && c !== min)
    }
  })
  return { cps, plano, origem, fonte, maiuscula }
}

function prepararLista(lista) {
  const porInicio = new Map()
  for (const linha of lista) {
    let pt = linha[0], marca = ''
    if (pt[0] === '~' || pt[0] === '^') { marca = pt[0]; pt = pt.slice(1) }
    const chave = unidades(pt).plano
    if (!chave.length) continue
    const item = { chave, marca, linha, comecaLetra: ehLetra(chave[0]), terminaLetra: ehLetra(chave[chave.length - 1]) }
    if (!porInicio.has(chave[0])) porInicio.set(chave[0], [])
    porInicio.get(chave[0]).push(item)
  }
  for (const itens of porInicio.values()) itens.sort((a, b) => b.chave.length - a.chave.length)
  return porInicio
}
const DICIONARIO = prepararLista(FRASES)
const DICIONARIO_ARGS = new Map(ARGUMENTOS.map((l) => [l[0].toLowerCase(), l]))

const LINK = /(?:https?:\/\/|www\.)\S+|\b[\w-]+\.(?:com|net|org|br|io|me|gg|app|dev)\b\S*|@\d+/giu

function protegidos(texto) {
  const marcados = new Set()
  for (const m of texto.matchAll(LINK)) {
    const ini = Array.from(texto.slice(0, m.index)).length
    const fim = ini + Array.from(m[0]).length
    for (let i = ini; i < fim; i++) marcados.add(i)
  }
  return marcados
}

function antesPermite(plano, i) {
  let k = i - 1
  while (k >= 0 && ehMarca(plano[k])) k--
  if (k < 0) return true
  const p = plano[k]
  if (ehLetra(p) || PREFIXOS.includes(p)) return false
  // SEU_TOKEN, ID_DO_GRUPO: sublinhado no meio de palavra não é borda.
  if (p === '_' && k > 0 && ehLetra(plano[k - 1])) return false
  return true
}

function depoisPermite(plano, j) {
  const q = plano[j + 1]
  if (q === undefined) return true
  if (ehLetra(q) || ehMarca(q)) return false
  if (q === '_' && plano[j + 2] !== undefined && ehLetra(plano[j + 2])) return false
  return true
}

function comCaixa(traducao, letras, u, fonteDaFrase) {
  if (fonteDaFrase === 'versalete' || !letras.length) return traducao
  const tudoMaiusculo = letras.length > 1 && letras.every((k) => u.maiuscula[k])
  if (tudoMaiusculo) return traducao.toUpperCase()
  if (u.maiuscula[letras[0]]) return traducao.replace(/\p{L}/u, (c) => c.toUpperCase())
  // Frase que começa minúscula: "Use" do dicionário vira "use" aqui.
  return traducao.replace(/^([^\p{L}]*)(\p{Lu})(?=\p{Ll})/u, (_, a, c) => a + c.toLowerCase())
}

function traduzirFrases(texto, pos) {
  const u = unidades(texto)
  const { plano, origem } = u
  const travado = protegidos(texto)
  const trocas = [] // [cpIni, cpFim, texto]
  let i = 0
  while (i < plano.length) {
    const comecaCp = i === 0 || origem[i] !== origem[i - 1]
    const candidatos = comecaCp && !travado.has(origem[i]) ? DICIONARIO.get(plano[i]) : null
    let achou = null
    if (candidatos) {
      for (const item of candidatos) {
        const n = item.chave.length
        const j = i + n - 1
        if (j >= plano.length) continue
        let igual = true
        for (let k = 1; k < n; k++) if (plano[i + k] !== item.chave[k]) { igual = false; break }
        if (!igual) continue
        if (j + 1 < plano.length && origem[j + 1] === origem[j]) continue
        if (item.comecaLetra && !antesPermite(plano, i)) continue
        if (item.terminaLetra && !depoisPermite(plano, j)) continue
        let livre = true
        for (let k = origem[i]; k <= origem[j]; k++) if (travado.has(k)) { livre = false; break }
        if (!livre) continue
        const letras = []
        for (let k = i; k <= j; k++) if (/^[a-z]$/.test(plano[k])) letras.push(k)
        const conta = {}
        for (const k of letras) conta[u.fonte[k]] = (conta[u.fonte[k]] || 0) + 1
        const fonteDaFrase = Object.entries(conta).sort((a, b) => b[1] - a[1])[0]?.[0] || 'comum'
        if (item.marca === '~' && fonteDaFrase === 'comum') continue
        if (item.marca === '^' && (fonteDaFrase === 'versalete' || letras.length < 2 || !letras.every((k) => u.maiuscula[k]))) continue
        const traducao = comCaixa(item.linha[pos], letras, u, fonteDaFrase)
        achou = { j, texto: fonteDaFrase === 'comum' ? traducao.normalize('NFC') : naFonte(traducao, fonteDaFrase) }
        break
      }
    }
    if (achou) {
      trocas.push([origem[i], origem[achou.j], achou.texto])
      i = achou.j + 1
    } else i++
  }
  if (!trocas.length) return texto
  let out = '', fim = 0
  for (const [ini, ate, novo] of trocas) {
    out += u.cps.slice(fim, ini).join('') + novo
    fim = ate + 1
  }
  return out + u.cps.slice(fim).join('')
}

// "#ban @usuario", "*#play nome da música*": as palavras de exemplo depois do
// comando. O comando fica como está.
const COMANDO = /(^|[\s*_(「])([#/!.$%&+=?])([a-z][a-z0-9_]{1,30})((?:[ \t]+[^\s*`]+)+)/gmu
function traduzirArgumentos(texto, pos) {
  // O comando pode vir enfeitado (*#𝚜𝚎𝚝𝚋𝚒𝚘 𝚜𝚞𝚊 𝚋𝚒𝚘*): procura na letra comum,
  // um caractere por caractere do original, e troca no original.
  const cps = Array.from(texto)
  const simples = cps.map((cp) => { const l = letraComum(cp); return l.fonte !== 'comum' ? l.c : cp })
  const indice = new Map()
  let o = 0
  simples.forEach((s, i) => { indice.set(o, i); o += s.length })
  indice.set(o, simples.length)
  const trocas = []
  for (const m of simples.join('').matchAll(COMANDO)) {
    const a = indice.get(m.index + m[1].length + m[2].length + m[3].length)
    const b = indice.get(m.index + m[0].length)
    const palavras = [] // [ini, fim] em caracteres
    for (let i = a; i < b; i++) {
      if (/[ \t]/.test(simples[i])) continue
      let j = i
      while (j < b && !/[ \t]/.test(simples[j])) j++
      palavras.push([i, j])
      i = j
    }
    for (let w = 0; w < palavras.length; w++) {
      for (let n = Math.min(3, palavras.length - w); n >= 1; n--) {
        const juntas = palavras.slice(w, w + n).map(([x, y]) => simples.slice(x, y).join('')).join(' ')
        const linha = DICIONARIO_ARGS.get(juntas.toLowerCase())
        if (!linha) continue
        const [ini] = palavras[w], fim = palavras[w + n - 1][1]
        const fonte = cps.slice(ini, fim).map((cp) => letraComum(cp).fonte).find((f) => f !== 'comum') || 'comum'
        trocas.push([ini, fim, fonte === 'comum' ? linha[pos] : naFonte(linha[pos], fonte)])
        w += n - 1
        break
      }
    }
  }
  if (!trocas.length) return texto
  let out = '', fim = 0
  for (const [ini, ate, novoTexto] of trocas) {
    out += cps.slice(fim, ini).join('') + novoTexto
    fim = ate
  }
  return out + cps.slice(fim).join('')
}

export function traduzirTexto(texto, idioma) {
  const pos = POSICAO[idioma]
  if (!pos || typeof texto !== 'string' || !texto) return texto
  return traduzirFrases(traduzirArgumentos(texto, pos), pos)
}

// Campos que não são texto para ler (ids, mídia, cartão de contato).
const PULAR = new Set(['id', 'jid', 'remoteJid', 'participant', 'stanzaId', 'mentions', 'mentionedJid', 'media', 'url', 'mimetype', 'directPath', 'mediaKey', 'fileSha256', 'fileEncSha256', 'jpegThumbnail', 'thumbnail', 'editKey', 'target', 'key', 'vcard', 'fileName', 'sourceUrl', 'copy_code', 'quote'])

// Percorre a mensagem inteira (texto, legenda, rodapé, listas, botões) e
// traduz cada texto. Não altera o objeto recebido.
export function traduzir(valor, idioma, nivel = 0) {
  if (!POSICAO[idioma] || nivel > 14) return valor
  if (typeof valor === 'string') return traduzirTexto(valor, idioma)
  if (Array.isArray(valor)) return valor.map((item) => traduzir(item, idioma, nivel + 1))
  if (!valor || typeof valor !== 'object' || Buffer.isBuffer(valor) || ArrayBuffer.isView(valor) || valor instanceof ArrayBuffer) return valor
  if (Object.getPrototypeOf(valor) !== Object.prototype && Object.getPrototypeOf(valor) !== null) return valor
  const out = {}
  for (const [k, v] of Object.entries(valor)) {
    if (PULAR.has(k)) out[k] = v
    else if (typeof v === 'string' && /Json$/.test(k) && v) {
      try { out[k] = JSON.stringify(traduzir(JSON.parse(v), idioma, nivel + 1)) } catch { out[k] = v }
    } else out[k] = traduzir(v, idioma, nivel + 1)
  }
  return out
}
