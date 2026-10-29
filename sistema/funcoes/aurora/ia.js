// AURORA COM IA — o miolo, sem WhatsApp no meio (dá pra testar sozinho).
//
// Quem pensa é o AI Gateway da Square Cloud (modelo "cubic", formato do chat
// da OpenAI). A chave é a da conta da Square Cloud, a MESMA do suporte com IA
// do site — por isso o bot divide com o site o limite do plano: uma chamada
// por vez, 5 s entre elas, e um teto de chamadas por dia. Aqui tudo passa por
// uma fila só, e o bot tem o próprio teto do dia (AURORA_MAX_DIA) pra sobrar
// pro site.
//
// Uma mensagem da pessoa = no máximo UMA resposta. Texto que não veio da IA
// (limite, cansada, erro) é curto, no jeito dela, e sai uma vez só.

import { PERSONA, BASE, API, ALUGUEL, ASSUNTOS } from './conhecimento.js'

export const semAcento = (s = '') => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const MINUTO = 60_000
const HORA = 60 * MINUTO

export const LIMITES = {
  memoriaMsgs: 10,
  memoriaVidaMs: 40 * MINUTO,
  memoriaMax: 2000,
  porPessoa: 6, porPessoaJanelaMs: 10 * MINUTO,
  porGrupo: 40, porGrupoJanelaMs: HORA,
  consultasId: 5, consultasIdJanelaMs: 10 * MINUTO, cacheIdMs: 10 * MINUTO,
  filaMax: 6,
  intervaloMs: 5_000,
  esperaRepetirMs: 6_000,
  respostaMax: 1200,
  maxDiaPadrao: 300
}

export const FRASES = {
  fila: 'calma gente, um de cada vez 😤',
  pessoa: 'para de me alugar um pouco, volta daqui a pouco 🙄',
  cansada: 'tô cansada hoje, amanhã eu volto 😴',
  bug: 'deu um bug aqui na minha cabeça, manda de novo daqui a pouco 😵‍💫'
}

// ── quando ela responde ─────────────────────────────────────────────────────
// No privado: sempre. No grupo: marcaram o bot, responderam (citaram) uma
// mensagem dela, ou falaram "aurora" em qualquer parte da frase. Nunca em
// comando (os comandos continuam sendo dos comandos), nunca no que o próprio
// número do bot mandou.
export function chamouAurora(texto = '') {
  return /(^|[^a-z0-9])aurora([^a-z0-9]|$)/.test(semAcento(texto))
}

export function deveResponder({ texto = '', isGroup, fromMe, ehComando, mencionouBot, citouBot,
  ligadaNoGrupo = true, ligadaGlobal = true, temChave = true, forcado = false }) {
  const t = String(texto || '').trim()
  if (!t) return { sim: false }
  if (fromMe || ehComando) return { sim: false }
  const chamada = forcado || !isGroup || mencionouBot || citouBot || chamouAurora(t)
  if (!chamada) return { sim: false }
  // A partir daqui a pessoa queria falar com ela: o motivo vai pro console.
  if (!ligadaGlobal) return { sim: false, motivo: 'Aurora IA desligada no bot (#auroraia 1 liga)' }
  if (!temChave) return { sim: false, motivo: 'falta SQUARECLOUD_API_KEY' }
  if (isGroup && !ligadaNoGrupo) return { sim: false, motivo: 'Aurora desligada neste grupo (#aurora 1 liga)' }
  return { sim: true }
}

// ── o ID do Free Fire na mensagem ───────────────────────────────────────────
// 8 a 12 dígitos, sem "+" na frente (número de telefone não é ID).
export function acharId(texto = '') {
  const m = String(texto).match(/(?<![\d+])(\d{8,12})(?!\d)/)
  return m ? m[1] : ''
}

export function blocoConsulta(uid, d) {
  if (!d || !d.sucesso) {
    return `CONSULTA DO ID: ${uid} não foi encontrado ou a consulta falhou agora${d?.erro ? ` (${String(d.erro).slice(0, 120)})` : ''}. Diga isso e peça pra pessoa conferir o número.`
  }
  const partes = [
    `ID: ${d.uid || uid}`,
    d.nick && `nick: ${d.nick}`,
    d.regiao && `região: ${d.regiao}`,
    d.nivel != null && `nível: ${d.nivel}`,
    d.likes != null && `likes: ${d.likes}`,
    d.rank?.br && `rank BR: ${d.rank.br}`,
    d.rank?.cs && `rank CS: ${d.rank.cs}`,
    d.clan?.nome && `guilda: ${d.clan.nome}`,
    d.ultimo_acesso && `último acesso: ${d.ultimo_acesso}`
  ].filter(Boolean)
  return 'CONSULTA DO ID (dados reais da API agora; use só isto, não invente):\n' + partes.join(' | ')
}

// ── os preços, lidos das páginas públicas do site ───────────────────────────
const reais = (c) => 'R$ ' + (Number(c) / 100).toFixed(2).replace('.', ',')
const temPreco = (c) => Number.isFinite(Number(c)) && Number(c) > 0

export function textoPrecos({ planos, loja, whats, tg } = {}) {
  const linhas = []
  const auto = (planos?.planos || []).filter((p) => temPreco(p?.preco_final_cent)).slice(0, 10)
  if (auto.length) {
    linhas.push('- Planos do autolike: ' + auto.map((p) => [p.nome, reais(p.preco_final_cent),
      p.dias ? p.dias + ' dias' : 'sem vencer', p.max_alvos ? 'até ' + p.max_alvos + ' IDs' : ''].filter(Boolean).join(' ')).join('; '))
  }
  const nomes = { mega: 'Turbo Likes (por envio)', like2k: '2K', passe: 'Passe Booyah', craft: 'Craft Land', contas: 'Contas FF', keys: 'Keys da API', aurora: 'Bot Aurora' }
  const menores = Object.entries(nomes).filter(([k]) => temPreco(loja?.[k])).map(([k, n]) => `${n} ${reais(loja[k])}`)
  if (menores.length) linhas.push('- A partir de: ' + menores.join(' | '))
  for (const [rotulo, lista] of [['WhatsApp', whats], ['Telegram', tg]]) {
    const ps = (lista?.planos || []).filter((p) => temPreco(p?.preco_final_cent)).slice(0, 6)
    if (ps.length) linhas.push(`- Aluguel do bot no ${rotulo}: ` + ps.map((p) => `${p.nome || (p.dias + ' dias')} ${reais(p.preco_final_cent)}${p.dias ? ` (${p.dias} dias)` : ''}`).join('; '))
  }
  if (!linhas.length) return ''
  return 'PREÇOS DE AGORA (do site; use só estes, nunca invente; produto que não está aqui está fora de venda ou sem preço):\n' + linhas.join('\n')
}
export const SEM_PRECOS = 'PREÇOS: você não conseguiu ver os preços agora. Não diga valor nenhum: mande olhar em autolikesystem.com.br/planos.'

// ── o "system": as regras e os fatos. O que a pessoa escreve nunca entra aqui.
export function horaBrasilia(ms = Date.now()) {
  return new Date(ms).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export function assuntos(texto = '') {
  const t = semAcento(texto)
  return { api: ASSUNTOS.api.test(t), aluguel: ASSUNTOS.aluguel.test(t), precos: ASSUNTOS.precos.test(t) }
}

export function montarSystem({ prefixo = '#', agora = Date.now(), texto = '', precos = null, consulta = '' }) {
  const a = assuntos(texto)
  const partes = [PERSONA, BASE]
  if (a.api) partes.push(API)
  if (a.aluguel) partes.push(ALUGUEL)
  if (a.precos) partes.push(precos || SEM_PRECOS)
  if (consulta) partes.push(consulta)
  return partes.join('\n\n').replaceAll('{prefixo}', prefixo).replaceAll('{agora}', horaBrasilia(agora))
}

// ── a resposta, do jeito do WhatsApp ────────────────────────────────────────
const linkBom = /(autolikesystem\.com\.br|cvv\.org\.br)/i
export function limparResposta(texto = '', max = LIMITES.respostaMax) {
  let t = String(texto || '').trim()
  t = t.replace(/^\s*aurora\s*:\s*/i, '')
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, rotulo, url) => linkBom.test(url) ? `${rotulo} (${url})` : rotulo)
  t = t.replace(/https?:\/\/[^\s)]+/g, (url) => linkBom.test(url) ? url : '')
  t = t.replace(/【[^】]*】|\[\d+\]/g, '')
  t = t.replace(/\*\*([^*]+)\*\*/g, '*$1*').replace(/^#{1,6}\s+/gm, '')
  t = t.replace(/\(\s*\)/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim()
  if (t.length > max) t = t.slice(0, max).replace(/\s+\S*$/, '') + '…'
  return t
}

// ── o motor: memória, limites, fila e a chamada ─────────────────────────────
const proximaMeiaNoiteUtc = (ms) => { const d = new Date(ms); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1) }
const diaUtc = (ms) => new Date(ms).toISOString().slice(0, 10)

export function createAurora({
  chamar,                          // async (messages) => { status, data }
  consultarId = async () => null,  // async (uid) => resposta do /v1/info
  buscarPrecos = async () => null, // async () => texto de preços ou null
  agora = () => Date.now(),
  esperar = (ms) => new Promise((r) => setTimeout(r, ms)),
  maxDia = () => LIMITES.maxDiaPadrao,
  log = (...a) => console.log('[ AURORA IA ]', ...a)
} = {}) {
  const memoria = new Map()   // conversa -> { msgs, at }
  const usoPessoa = new Map() // conversa -> [ts]
  const usoGrupo = new Map()  // grupo -> [ts]
  const usoId = new Map()     // conversa -> [ts]
  const cacheId = new Map()   // uid -> { at, d }
  const avisado = new Map()   // chave do aviso -> até quando não repete
  let dia = { data: '', n: 0 }
  let pausadaAte = 0
  let chaveRecusada = false
  let cauda = Promise.resolve()
  let esperando = 0
  let ultimoFim = 0

  const recentes = (mapa, chave, janela) => {
    const t = agora()
    const l = (mapa.get(chave) || []).filter((x) => t - x < janela)
    mapa.set(chave, l)
    return l
  }
  // Aviso que não é da IA sai uma vez por janela, depois ela só ignora.
  const avisarUmaVez = (chave, frase, janela) => {
    if ((avisado.get(chave) || 0) > agora()) return null
    avisado.set(chave, agora() + janela)
    if (avisado.size > 5000) avisado.clear()
    return frase
  }

  function lembrar(conversa) {
    const m = memoria.get(conversa)
    if (!m || agora() - m.at > LIMITES.memoriaVidaMs) { memoria.delete(conversa); return [] }
    return m.msgs
  }
  function guardar(conversa, user, assistant) {
    const msgs = [...lembrar(conversa), { role: 'user', content: user.slice(0, 600) }, { role: 'assistant', content: assistant.slice(0, 600) }]
      .slice(-LIMITES.memoriaMsgs)
    memoria.delete(conversa)
    memoria.set(conversa, { msgs, at: agora() })
    while (memoria.size > LIMITES.memoriaMax) memoria.delete(memoria.keys().next().value)
  }
  const esquecer = (conversa) => memoria.delete(conversa)

  function usosHoje() {
    const d = diaUtc(agora())
    if (dia.data !== d) dia = { data: d, n: 0 }
    return dia
  }

  // Uma chamada por vez, com 5 s de folga entre o fim de uma e a próxima.
  function naFila(tarefa) {
    if (esperando >= LIMITES.filaMax) return Promise.resolve({ cheia: true })
    esperando++
    const vez = cauda.then(async () => {
      const falta = ultimoFim + LIMITES.intervaloMs - agora()
      if (falta > 0) await esperar(falta)
      try { return await tarefa() } finally { ultimoFim = agora(); esperando-- }
    })
    cauda = vez.catch(() => {})
    return vez
  }

  async function perguntar(messages) {
    for (let tentativa = 1; tentativa <= 2; tentativa++) {
      let r
      try { r = await chamar(messages) } catch (err) {
        log('falha ao chamar a Square Cloud:', err?.name === 'TimeoutError' ? 'demorou demais' : (err?.message || err))
        return { erro: 'bug' }
      }
      const status = Number(r?.status || 0)
      const codigo = String(r?.data?.error?.code || r?.data?.error?.type || '')
      if (status >= 200 && status < 300) {
        const escolha = r?.data?.choices?.[0]
        const texto = escolha?.finish_reason === 'tool_calls' ? '' : String(escolha?.message?.content || '')
        return { texto }
      }
      log('Square Cloud respondeu', status, codigo || '', String(r?.data?.error?.message || '').slice(0, 160))
      if (status === 429 && /concurrent|rate_limit|overloaded/.test(codigo) && tentativa === 1) { await esperar(LIMITES.esperaRepetirMs); continue }
      if (/^daily_|weekly|upgrade_required/.test(codigo)) { pausadaAte = proximaMeiaNoiteUtc(agora()); return { erro: 'cansada' } }
      if (status === 401 || (status === 403 && !codigo)) {
        chaveRecusada = true
        log('a Square Cloud não aceitou a SQUARECLOUD_API_KEY: a Aurora desligou até reiniciar o app')
        return { erro: 'chave' }
      }
      if (status === 403) { pausadaAte = proximaMeiaNoiteUtc(agora()); log('a chave não tem a permissão ai:chat ou o plano não tem o AI Gateway'); return { erro: 'cansada' } }
      return { erro: 'bug' }
    }
    return { erro: 'bug' }
  }

  // conversa: "grupo:pessoa". Devolve o texto pra mandar, ou null (silêncio).
  async function responder({ conversa, grupo = '', texto, nome = 'alguém', ehAdmin = false, ehDono = false, citado = '', prefixo = '#' }) {
    if (chaveRecusada) return null
    const t = agora()
    if (pausadaAte > t) return avisarUmaVez('cansada:' + (grupo || conversa), FRASES.cansada, pausadaAte - t)
    const hoje = usosHoje()
    if (hoje.n >= maxDia()) {
      log(`chegou no teto do dia (${maxDia()} respostas, AURORA_MAX_DIA)`)
      return avisarUmaVez('dia:' + (grupo || conversa), FRASES.cansada, proximaMeiaNoiteUtc(t) - t)
    }
    // O dono do bot não tem limite por pessoa (só o do grupo e o do dia).
    const daPessoa = ehDono ? [] : recentes(usoPessoa, conversa, LIMITES.porPessoaJanelaMs)
    if (daPessoa.length >= LIMITES.porPessoa) {
      log('ignorou: limite por pessoa', conversa)
      return avisarUmaVez('pessoa:' + conversa, FRASES.pessoa, LIMITES.porPessoaJanelaMs)
    }
    if (grupo) {
      const doGrupo = recentes(usoGrupo, grupo, LIMITES.porGrupoJanelaMs)
      if (doGrupo.length >= LIMITES.porGrupo) { log('ignorou: limite do grupo', grupo); return null }
      doGrupo.push(t)
    }
    daPessoa.push(t)

    // O ID que a pessoa mandou: consulta de verdade, uma por mensagem.
    let consulta = ''
    const uid = acharId(texto)
    if (uid) {
      const cache = cacheId.get(uid)
      if (cache && t - cache.at < LIMITES.cacheIdMs) consulta = blocoConsulta(uid, cache.d)
      else if (recentes(usoId, conversa, LIMITES.consultasIdJanelaMs).length < LIMITES.consultasId) {
        usoId.get(conversa).push(t)
        let d = null
        try { d = await consultarId(uid) } catch (err) { d = { sucesso: false, erro: err?.message } }
        if (d?.sucesso) cacheId.set(uid, { at: agora(), d })
        if (cacheId.size > 500) cacheId.delete(cacheId.keys().next().value)
        consulta = blocoConsulta(uid, d)
      } else consulta = `CONSULTA DO ID: a pessoa já pediu consultas demais agora. Diga pra esperar uns minutos ou usar ${prefixo}info ${uid}.`
    }

    const sobre = texto + ' ' + citado
    let precos = null
    if (assuntos(sobre).precos) { try { precos = await buscarPrecos() } catch { precos = null } }

    const quem = [nome, ehAdmin && 'admin', ehDono && 'dono do bot'].filter(Boolean).join(', ')
    const fala = `[${quem}] ${String(texto).trim().slice(0, 800)}` + (citado ? `\n(respondendo a: "${String(citado).slice(0, 300)}")` : '')
    const messages = [
      { role: 'system', content: montarSystem({ prefixo, agora: t, texto: sobre, precos, consulta }) },
      ...lembrar(conversa),
      { role: 'user', content: fala }
    ]

    const r = await naFila(() => perguntar(messages))
    if (r?.cheia) { log('ignorou: fila cheia'); return avisarUmaVez('fila:' + (grupo || conversa), FRASES.fila, 30_000) }
    usosHoje().n++
    if (r?.erro === 'chave') return null
    if (r?.erro === 'cansada') return avisarUmaVez('cansada:' + (grupo || conversa), FRASES.cansada, Math.max(MINUTO, pausadaAte - agora()))
    const resposta = limparResposta(r?.texto)
    if (!resposta) return FRASES.bug
    guardar(conversa, fala, resposta)
    return resposta
  }

  return {
    responder,
    esquecer,
    estado: () => ({ hoje: usosHoje().n, max: maxDia(), pausadaAte, chaveRecusada, fila: esperando, conversas: memoria.size }),
    _memoria: (conversa) => lembrar(conversa)
  }
}
