// CONEXÃO COM O SITE (Kasane).
//
// A rede da hospedagem derruba conexão parada: reaproveitar uma conexão morta
// dá "fetch failed (ECONNRESET)". Por isso cada pedido ao site abre conexão
// nova (Connection: close) e, se a conexão cair logo no começo, tenta de novo
// na hora, uma vez. Mesmo modelo do bot do Telegram (Bot-aluguel-tg).

// O pedido nem chegou ao site: dá pra mandar de novo sem risco.
export const conexaoCaiu = (err) => err?.name !== 'TimeoutError' && err?.name !== 'AbortError' &&
  /ECONNRESET|EPIPE|ECONNABORTED|ECONNREFUSED|UND_ERR_SOCKET|UND_ERR_CLOSED|other side closed|socket hang up/i.test(`${err?.cause?.code || ''} ${err?.cause?.message || ''} ${err?.message || ''}`)

// Motivo legível de uma falha de rede (o "fetch failed" sozinho não diz nada).
export function motivoDaFalha(err) {
  if (err?.name === 'TimeoutError') return 'o site demorou demais para responder'
  const causa = err?.cause?.code || err?.cause?.message || ''
  return `${err?.message || err}${causa ? ` (${causa})` : ''}`
}

// Resposta que não é JSON (ex.: a página do Square Cloud quando o site está
// fora do ar ou reiniciando) vira uma frase curta, nunca o HTML inteiro.
export function respostaEstranha(texto, status) {
  const t = String(texto || '')
  if (/^\s*</.test(t)) {
    const titulo = (t.match(/<title[^>]*>([^<]*)/i)?.[1] || '').replace(/\s+/g, ' ').trim().slice(0, 80)
    return `o site respondeu uma página em vez dos dados (HTTP ${status}${titulo ? `, "${titulo}"` : ''}): ele parece fora do ar ou reiniciando`
  }
  return t.replace(/\s+/g, ' ').trim().slice(0, 200) || `HTTP ${status}`
}

// fetch com conexão nova e uma nova tentativa imediata quando a conexão cai
// nos primeiros segundos. Um pedido que já rodou um tempo no site (ex.: /v1/like)
// não é repetido: ele pode ter sido feito.
export async function pedirAoSite(url, { timeoutMs = 20_000, headers = {}, fetchImpl = fetch, ...opcoes } = {}) {
  for (let tentativa = 1; ; tentativa++) {
    const inicio = Date.now()
    try {
      return await fetchImpl(url, {
        ...opcoes,
        headers: { ...headers, Connection: 'close' },
        signal: AbortSignal.timeout(timeoutMs)
      })
    } catch (err) {
      if (tentativa === 1 && conexaoCaiu(err) && Date.now() - inicio < 5_000) continue
      throw err
    }
  }
}

// Console sem enxurrada: a mesma falha aparece no máximo uma vez por minuto,
// com quantas vezes aconteceu no meio; quando volta a funcionar, avisa uma vez.
export function criarLogRaro({ intervaloMs = 60_000, escrever = console.warn, agora = Date.now } = {}) {
  const estado = new Map()
  return {
    falha(chave, ...partes) {
      const e = estado.get(chave) || { ultimo: -Infinity, contagem: 0, falhando: false }
      e.contagem++
      e.falhando = true
      if (agora() - e.ultimo >= intervaloMs) {
        escrever(...partes, ...(e.contagem > 1 ? [`(${e.contagem}x no último minuto)`] : []))
        e.ultimo = agora()
        e.contagem = 0
      }
      estado.set(chave, e)
    },
    voltou(chave, texto) {
      const e = estado.get(chave)
      if (!e?.falhando) return
      estado.delete(chave)
      if (texto) console.log(texto)
    }
  }
}
