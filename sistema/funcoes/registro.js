// LOG DO TERMINAL ORGANIZADO (pedido do dono em 29/10).
// • criarLoggerZapo: o Zapo escrevia avisos em JSON cru ({"level":40,...}) a
//   cada oscilação da conexão. As quedas rápidas que ele mesmo resolve (erro
//   503, "socket runtime error") viram uma linha de resumo a cada 30 min; o
//   resto sai na hora, numa linha legível, no máximo 1 vez por minuto.
// • instalarHorario: põe data e hora de Brasília nas linhas "[ ... ]".

// Mensagens do Zapo que aparecem juntas numa queda rápida da conexão.
const OSCILACAO = new Set(['socket runtime error event', 'socket runtime error'])
const ehOscilacao = (message, context) =>
  OSCILACAO.has(message) || (message === 'received stream:error with code' && Number(context?.code) === 503)
// Pedido de reenvio de mensagem que o celular não respondeu a tempo.
const ehReenvio = (message) => message === 'placeholder resend: request failed'
// Falha ao pedir o código de pareamento: o client.js já explica numa linha.
const ehPareamento = (context) => /^companion hello/i.test(String(context?.message || ''))

// As linhas de uma mesma queda chegam em menos de 1 s: dentro de 10 s é a mesma.
const MESMA_QUEDA_MS = 10_000

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`

function detalhes(context) {
  const partes = Object.entries(context || {})
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
  return partes.length ? ` (${partes.join(', ')})` : ''
}

export function criarLoggerZapo({ saida = console, agora = Date.now, resumoMs = 30 * 60_000, timer = true } = {}) {
  const vistos = new Map()
  const causas = new Map()
  let oscilacoes = 0
  let reenvios = 0
  let ultimaOscilacao = 0
  let desde = agora()

  function resumir() {
    if (oscilacoes || reenvios) {
      const minutos = Math.max(1, Math.round((agora() - desde) / 60_000))
      const itens = []
      if (oscilacoes) itens.push(plural(oscilacoes, 'oscilação rápida', 'oscilações rápidas') + ' na conexão do WhatsApp')
      if (reenvios) itens.push(plural(reenvios, 'pedido de reenvio de mensagem', 'pedidos de reenvio de mensagem') + ' sem resposta')
      saida.log(`[ AURORA CONEXÃO ] Últimos ${minutos} min: ${itens.join(' e ')}. O próprio Zapo resolve; só preocupa se aparecer "WhatsApp fechou a conexão".`)
    }
    oscilacoes = reenvios = 0
    desde = agora()
  }

  const escrever = (nivel) => (message, context) => {
    const texto = String(message ?? '')
    if (ehOscilacao(texto, context)) {
      if (agora() - ultimaOscilacao > MESMA_QUEDA_MS) oscilacoes++
      ultimaOscilacao = agora()
      return
    }
    if (ehReenvio(texto)) { reenvios++; return }
    if (ehPareamento(context)) return
    const chave = nivel + texto
    // O mesmo erro chega por duas partes do Zapo ("wa auth client error" e
    // "wa client error"): o da outra parte, logo em seguida, não sai.
    const causa = String(context?.message || '')
    const outra = causa && causas.get(causa)
    if (outra && outra.chave !== chave && agora() - outra.quando < 5_000) return
    if (causa) {
      if (causas.size > 300) causas.clear()
      causas.set(causa, { chave, quando: agora() })
    }
    // Mesmo aviso em sequência (ex.: queda de rede longa): 1 vez por minuto.
    const visto = vistos.get(chave)
    if (visto && agora() - visto.ultimo < 60_000) { visto.repetidas++; return }
    if (vistos.size > 300) vistos.clear()
    vistos.set(chave, { ultimo: agora(), repetidas: 0 })
    const extra = visto?.repetidas ? ` (+${visto.repetidas} vezes desde o último aviso)` : ''
    saida[nivel](`[ AURORA WHATSAPP ] ${nivel === 'error' ? 'Erro' : 'Aviso'}: ${texto}${detalhes(context)}${extra}`)
  }

  const nada = () => {}
  const logger = {
    level: 'warn',
    trace: nada,
    debug: nada,
    info: nada,
    warn: escrever('warn'),
    error: escrever('error'),
    child: () => logger,
    resumir,
    parar: () => clearInterval(intervalo)
  }
  const intervalo = timer ? setInterval(resumir, resumoMs) : null
  intervalo?.unref?.()
  return logger
}

const formato = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
})

export function carimbo(data = new Date()) {
  const p = Object.fromEntries(formato.formatToParts(data).map((x) => [x.type, x.value]))
  return `${p.day}/${p.month} ${p.hour}:${p.minute}:${p.second}`
}

const semCor = (s) => s.replace(/\x1b\[[0-9;]*m/g, '')
const INSTALADO = Symbol.for('aurora.horario')

// Só as linhas com etiqueta ("[ AURORA ... ]", "[ cliente ... ]", "[ ERRO ]")
// ganham horário: o logo e o código de pareamento ficam como estão.
export function instalarHorario(alvo = console, { agora = () => new Date() } = {}) {
  if (alvo[INSTALADO]) return
  alvo[INSTALADO] = true
  for (const nivel of ['log', 'info', 'warn', 'error']) {
    const original = alvo[nivel]
    if (typeof original !== 'function') continue
    alvo[nivel] = (...args) => {
      if (typeof args[0] === 'string' && semCor(args[0]).startsWith('[')) args[0] = `${carimbo(agora())} ${args[0]}`
      return original.apply(alvo, args)
    }
  }
}
