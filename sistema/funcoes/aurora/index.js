// AURORA COM IA NO WHATSAPP — a ponte entre o handler e o miolo (ia.js).
//
// Só no bot da casa: bot de cliente não tem a Aurora, menos o que roda no
// número da casa (o dono alugou pro próprio número; o gerente liga AURORA_IA).
// Grupo alugado por cliente começa com ela desligada (lá o bot leva a marca
// do cliente; o admin liga com #aurora 1 se quiser).
//
// A chave é a API key da conta da Square Cloud com a permissão ai:chat — a
// mesma do suporte com IA do site. Vem SÓ do ambiente: SQUARECLOUD_API_KEY
// (ou SQUARECLOUD_AI_KEY). Nunca no config.json.

import { createAurora, deveResponder, chamouAurora, trocarMarcacoes, textoPrecos, textoClima, acaoDoCriador, acharId, FRASES_LIKE, FRASES_INFO, blocoMembros, acharMarcacoes, SEM_MEMBROS, pediuMarcar, acharMembro, garantirMarcacao, LIMITES } from './ia.js'
import { createVoz, vozLigada, pediuAudio, ofereceuAudio, topou, podeFalar, semTagsDeVoz, BLOCO_VOZ } from './voz.js'
import { extractText } from '../../core/contexto.js'
import { contextInfoFromMessage, quotedInfo, quotedTarget } from '../mensagem.js'
import { autoSystem } from '../auto.js'
import { pedirAoSite } from '../rede.js'
import { auroraIaLigada, auroraNoGrupo, auroraCriador, auroraEsposa, auroraVoz, auroraVelocidade, tokenAluguelSalvo, numeroDoLid, aluguelOk, getDonoAluguel, hasCmd, hasGcmd } from '../banco.js'
import likeCmd from '../../comandos/ff/like.js'
import infoCmd from '../../comandos/ff/info.js'
import { modoCliente } from '../cliente.js'
import { digits, mesmoNumero, jidNumber, participantIdentity, variantesNumero } from '../jid.js'

// Este processo tem a IA? O bot da casa sempre; bot de cliente só o do número da casa.
export const iaNesteBot = () => !modoCliente || process.env.AURORA_IA === '1'

const GATEWAY = () => String(process.env.SQUARECLOUD_AI_URL || 'https://api.squarecloud.app/v2/ai').replace(/\/+$/, '')
export const chaveIa = () => String(process.env.SQUARECLOUD_API_KEY || process.env.SQUARECLOUD_AI_KEY || '').trim()
const maxDia = () => {
  const n = Number(process.env.AURORA_MAX_DIA)
  return Number.isInteger(n) && n >= 0 ? n : LIMITES.maxDiaPadrao
}

let configAtual = {}
const siteBase = () => String(configAtual?.autoSystem?.url || process.env.AUTOSYSTEM_URL || 'https://autolikesystem.com.br').replace(/\/+$/, '')

async function chamar(messages) {
  const resposta = await fetch(GATEWAY() + '/chat/completions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + chaveIa(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'cubic', messages, max_completion_tokens: 350, temperature: 1.0 }),
    signal: AbortSignal.timeout(45_000)
  })
  let data = null
  try { data = await resposta.json() } catch {}
  return { status: resposta.status, data }
}

// Preços das páginas públicas do site, guardados 15 minutos.
let precosCache = { at: 0, texto: null }
async function buscarPrecos() {
  if (precosCache.texto && Date.now() - precosCache.at < 15 * 60_000) return precosCache.texto
  const json = async (caminho) => {
    try {
      const r = await pedirAoSite(siteBase() + caminho, { timeoutMs: 10_000, headers: { Accept: 'application/json' } })
      return r.ok ? await r.json() : null
    } catch { return null }
  }
  const [planos, loja, whats, tg] = await Promise.all([
    json('/api/planos-publico'), json('/api/loja-publica'),
    json('/api/aluguel-bot/planos'), json('/api/aluguel-bot/planos?plataforma=telegram')
  ])
  const texto = textoPrecos({ planos, loja, whats, tg }) || null
  if (texto) precosCache = { at: Date.now(), texto }
  else console.warn('[ AURORA IA ] não consegui ler os preços do site agora')
  return texto || precosCache.texto
}

// Clima de verdade pelo Open-Meteo (grátis, sem chave). Cidade do Brasil
// primeiro; 10 min de cache por cidade.
const climaCache = new Map()
async function buscarClima(cidade) {
  const chave = String(cidade).toLowerCase().trim()
  const c = climaCache.get(chave)
  if (c && Date.now() - c.at < 10 * 60_000) return c.texto
  const json = async (url) => {
    const r = await fetch(url, { signal: AbortSignal.timeout(10_000), headers: { Accept: 'application/json' } })
    return r.ok ? r.json() : null
  }
  const geo = (extra) => json(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json${extra}`)
  try {
    const g = (await geo('&countryCode=BR'))?.results?.[0] || (await geo(''))?.results?.[0]
    if (!g) return null
    const dados = await json(`https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1`)
    const texto = textoClima({ nome: g.name, estado: g.admin1, pais: g.country }, dados) || null
    if (texto) { climaCache.set(chave, { at: Date.now(), texto }); if (climaCache.size > 300) climaCache.delete(climaCache.keys().next().value) }
    return texto
  } catch (err) {
    console.warn('[ AURORA IA ] clima indisponível:', err?.message || err)
    return null
  }
}

// O painel do site pro criador: mesmo token do aluguel (o bot de cliente no
// número da casa recebe pelo gerente, em AURORA_SITE_TOKEN). 1 min de cache.
let painelCache = { at: 0, d: null }
const tokenSite = () => String(process.env.AURORA_SITE_TOKEN || process.env.AURORA_RENTAL_TOKEN || configAtual?.autoSystem?.rentalToken || (() => { try { return tokenAluguelSalvo() } catch { return '' } })() || '').trim()
async function buscarPainel() {
  if (painelCache.d && Date.now() - painelCache.at < 60_000) return painelCache.d
  const token = tokenSite()
  if (!token) { console.warn('[ AURORA IA ] painel do site: sem token (AURORA_SITE_TOKEN / #tokenaluguel)'); return null }
  try {
    const r = await pedirAoSite(siteBase() + '/api/bot/aurora/painel', { timeoutMs: 15_000, headers: { Accept: 'application/json', 'X-Aurora-Token': token } })
    const d = r.ok ? await r.json() : null
    if (!d?.ok) { console.warn('[ AURORA IA ] painel do site respondeu', r.status); return null }
    painelCache = { at: Date.now(), d }
    return d
  } catch (err) {
    console.warn('[ AURORA IA ] painel do site indisponível:', err?.message || err)
    return null
  }
}

export const aurora = createAurora({
  chamar,
  buscarClima,
  buscarPainel,
  consultarId: (uid) => autoSystem.info(configAtual, uid),
  buscarPrecos,
  maxDia
})

// ── quem é o bot, quem foi marcado, quem foi citado ─────────────────────────
const base = (jid) => String(jid || '').split('@')[0].split(':')[0]
function idsDoBot(system) {
  const c = system.client?.getCredentials?.() || {}
  return [c.meJid, c.meLid, c.lidJid, c.me?.jid, c.me?.lid, digits(system.config?.connection?.number)].map(base).filter(Boolean)
}
export function mencionouBot(system) {
  const marcados = contextInfoFromMessage(system.msg)?.mentionedJid || []
  const meus = idsDoBot(system)
  return marcados.some((jid) => meus.includes(base(jid)))
}
// Responder (citar) uma mensagem do bot chama a Aurora, seja o número (@s.whatsapp.net)
// ou o LID dele (@lid) que vier na citação.
export function citouBot(system) {
  const q = quotedInfo(system.event)
  if (!q?.participant) return false
  return Boolean(quotedTarget(system)?.fromMe) || idsDoBot(system).includes(base(q.participant))
}

// Os membros do grupo com o nome que o bot já viu (perfil de quem já falou)
// ou o nome que o próprio WhatsApp mandou. Sem lista no cache (WhatsApp
// limitou ou demorou), pergunta de novo uma vez.
export async function membrosDoGrupo(system) {
  let participantes = system.metadata?.participants || []
  if (!participantes.length) {
    try {
      const meta = await Promise.race([
        system.client.group.queryGroupMetadata(system.from),
        new Promise((_, nao) => setTimeout(() => nao(new Error('demorou 8 s')), 8_000))
      ])
      participantes = meta?.participants || []
    } catch (err) {
      console.warn('[ AURORA IA ] não consegui ver os membros do grupo:', err?.message || err)
    }
  }
  const meus = idsDoBot(system)
  const perfis = system.db?.profiles || {}
  const lista = []
  for (const p of participantes) {
    const id = participantIdentity(p)
    const doLid = !id.number && id.lidJid ? numeroDoLid(id.lidJid) : ''
    if (doLid) Object.assign(id, { number: doLid, pnJid: `${doLid}@s.whatsapp.net` })
    const tag = id.number || jidNumber(id.lidJid || id.jid)
    if (!tag || meus.includes(tag)) continue
    const perfil = perfis[id.number] || perfis[id.lidJid] || perfis[id.jid]
    const visto = String(perfil?.name || '').trim()
    const nome = (visto && visto !== 'Usuário' ? visto : String(p?.displayName || p?.username || '').trim())
    lista.push({ tag, lid: base(id.lidJid), jid: id.pnJid || id.jid, nome, admin: Boolean(p?.isAdmin || p?.isSuperAdmin || p?.admin === 'admin' || p?.admin === 'superadmin') })
  }
  return lista
}

// O criador é quem recebe os avisos de compra (ver auroraCriador). Dono,
// subdono ou admin do bot não contam: só ele vê o sistema por dentro e
// manda ela agir.
//
// No privado o WhatsApp costuma mandar só o LID (o código interno da pessoa,
// @lid), sem o número. Por isso o LID de cada um fica guardado: aprendido
// quando a pessoa fala num grupo (lá vem os dois) ou perguntado ao WhatsApp.
const lids = new Map() // número -> { lid, at }
const lidDe = (numero) => lids.get(digits(numero))?.lid || ''
const quemFala = (system) => [system.senderInfo?.lidJid, system.sender, system.senderAlt]
  .filter((j) => String(j || '').endsWith('@lid')).map(base)
function mesmaPessoa(system, numero) {
  if (!numero) return false
  if (system.senderNumber && mesmoNumero(system.senderNumber, numero)) return true
  const lid = lidDe(numero)
  return Boolean(lid && quemFala(system).includes(lid))
}
export const ehCriador = (system) => mesmaPessoa(system, auroraCriador())
export const ehEsposa = (system) => mesmaPessoa(system, auroraEsposa())

// Garante o LID do criador e da mulher dele antes de decidir quem fala.
export async function conhecerPessoas(system) {
  for (const numero of [auroraCriador(), auroraEsposa()].filter(Boolean)) {
    const n = digits(numero)
    const lid = base(system.senderInfo?.lidJid)
    if (lid && system.senderNumber && mesmoNumero(system.senderNumber, n)) { lids.set(n, { lid, at: Date.now() }); continue }
    const salvo = lids.get(n)
    if (salvo?.lid || (salvo && Date.now() - salvo.at < 10 * 60_000)) continue
    lids.set(n, { lid: '', at: Date.now() })
    const perguntar = system.client?.profile?.getLidsByPhoneNumbers
    if (typeof perguntar !== 'function' || !quemFala(system).length) continue
    for (const v of variantesNumero(n)) {
      try {
        const [r] = await Promise.race([
          perguntar.call(system.client.profile, [v]),
          new Promise((_, nao) => setTimeout(() => nao(new Error('demorou')), 8_000))
        ])
        if (r?.exists && r.lidJid) { lids.set(n, { lid: base(r.lidJid), at: Date.now() }); break }
      } catch {}
    }
  }
}

// Grupo sem escolha feita: ligada, menos em grupo alugado por cliente.
export function ligadaNoGrupo(system) {
  const escolha = auroraNoGrupo(system.from)
  if (escolha !== null) return escolha
  const dono = getDonoAluguel(system.from)
  if (!dono || !aluguelOk(system.from)) return true
  const donosDoBot = [system.config?.owner?.number, ...Array.from({ length: 6 }, (_, i) => system.necessarios?.[`numero_dono${i + 1}`])]
  return donosDoBot.some((n) => n && mesmoNumero(n, dono))
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))
async function digitando(system, estado) {
  try { await system.client?.presence?.sendChatstate?.(system.from, { state: estado }) } catch {}
}

// O último erro de comando de cada conversa, pra ela explicar o de verdade.
const errosRecentes = new Map()
export function anotarErro(system, err) {
  if (!system?.command || !system.from) return
  errosRecentes.set(system.from, { comando: system.command, quem: String(system.pushName || '').slice(0, 30), at: Date.now(), motivo: err?.message || String(err || '') })
  if (errosRecentes.size > 500) errosRecentes.delete(errosRecentes.keys().next().value)
}

const textoCitado = (system) => { const q = quotedInfo(system.event); return q ? extractText(q.message) : '' }

// Pediram like: ela responde no jeito dela e o bot roda o mesmo #like ID
// (mesmos limites e mensagens do comando). Não gasta chamada da IA.
// O criador mandou ela fazer (like ou info): ela responde no jeito dela e o
// bot roda o mesmo comando, com as mesmas mensagens. Não gasta chamada da IA.
const ACOES = { like: { cmd: likeCmd, frases: FRASES_LIKE }, info: { cmd: infoCmd, frases: FRASES_INFO } }
async function executar(system, texto, comando, uid) {
  const { cmd, frases } = ACOES[comando]
  const conversa = `${system.from}:${system.senderKey}`
  const frase = frases[Math.floor(Math.random() * frases.length)](uid)
  await system.reply(frase, modoCliente ? { semMarca: true } : {})
  aurora.anotar(conversa, `[${nomeDe(system)}] ${texto.slice(0, 800)}`, frase + ` (o bot rodou ${system.prefix}${comando} ${uid})`)
  system.command = comando
  system.args = [uid]
  system.q = uid
  await cmd.run(system)
}

// O nome do zap; a mulher do criador sem nome no zap é a Hemi.
function nomeDe(system) {
  const nome = String(system.pushName || '').trim()
  const vazio = !nome || nome === 'Usuário'
  if (vazio && ehEsposa(system)) return 'Hemi'
  return (vazio ? 'alguém' : nome).slice(0, 40)
}

// Quem foi marcado na mensagem, com nome (ou número) no lugar do código.
function marcadosNa(system, membros) {
  const meus = idsDoBot(system)
  const perfis = system.db?.profiles || {}
  return (contextInfoFromMessage(system.msg)?.mentionedJid || []).map((jid) => {
    const tag = base(jid)
    if (meus.includes(tag)) return { tag, nome: 'Aurora (você)' }
    const m = membros.find((x) => x.tag === tag || x.lid === tag)
    const numero = m?.jid?.endsWith('@s.whatsapp.net') ? base(m.jid) : String(jid).endsWith('@lid') ? numeroDoLid(jid) : tag
    const perfil = perfis[numero] || perfis[jid]
    const nome = m?.nome || (perfil?.name && perfil.name !== 'Usuário' ? perfil.name : '')
    return { tag, nome: String(nome).slice(0, 30), numero }
  })
}

function pedidoDeMarcar(pedido, alvo) {
  if (!pedido) return ''
  return alvo
    ? `\n- AGORA pediram pra marcar "${pedido}": é ${String(alvo.nome).slice(0, 30)}. Marque escrevendo @${alvo.tag} na resposta.`
    : `\n- AGORA pediram pra marcar "${pedido}", mas ninguém com esse nome aparece na lista. Diga que não achou e peça pra marcarem a pessoa (ou mandarem o número). Não diga que marcou.`
}

// Algumas respostas saem em áudio (Fish Audio); se falhar, vai o texto.
const voz = createVoz({ log: (m) => console.warn('[ AURORA VOZ ]', m), escolha: () => ({ voz: auroraVoz(), velocidade: auroraVelocidade() }) })

// A última coisa que ela disse na conversa (no grupo, a memória é do grupo).
function ultimaFalaDela(conversa) {
  const msgs = aurora._memoria(conversa) || []
  for (let i = msgs.length - 1; i >= 0; i--) if (msgs[i].role === 'assistant') return String(msgs[i].content || '')
  return ''
}

async function conversar(system, texto) {
  const conversa = `${system.from}:${system.senderKey}`
  const citado = textoCitado(system)
  const membros = system.isGroup ? await membrosDoGrupo(system) : []
  // "marca o dylan aí": acha o membro pelo nome e a marcação sai de verdade.
  const pedido = system.isGroup ? pediuMarcar(texto) : ''
  const pediuVoz = vozLigada() && (pediuAudio(texto) || (topou(texto) && ofereceuAudio(citado && citouBot(system) ? citado : ultimaFalaDela(conversa))))
  const emAudio = voz.vaiFalar({ pediu: pediuVoz })
  const alvo = pedido ? acharMembro(pedido, membros) : null
  texto = trocarMarcacoes(texto, marcadosNa(system, membros))
  if (system.isGroup) console.log('[ AURORA IA ] membros que ela vê:', membros.length, `(${membros.filter((m) => m.nome).length} com nome) |`, system.from)
  await digitando(system, 'composing')
  // O "digitando…" some sozinho depois de uns segundos: renova enquanto espera a fila.
  const renovar = setInterval(() => { void digitando(system, 'composing') }, 10_000)
  const inicio = Date.now()
  let resposta = null
  try {
    resposta = await aurora.responder({
      conversa,
      grupo: system.isGroup ? system.from : '',
      texto,
      nome: nomeDe(system),
      ehAdmin: Boolean(system.isAdmin),
      ehCriador: ehCriador(system),
      ehEsposa: ehEsposa(system),
      citado,
      citadoDela: Boolean(citado) && citouBot(system),
      prefixo: system.prefix,
      membros: system.isGroup ? (blocoMembros(membros) ? blocoMembros(membros) + pedidoDeMarcar(pedido, alvo) : SEM_MEMBROS) : '',
      erro: errosRecentes.get(system.from) || null,
      voz: emAudio ? BLOCO_VOZ : ''
    })
    if (resposta) {
      const falta = Math.min(4_000, 800 + resposta.length * 25) - (Date.now() - inicio)
      if (falta > 0) await esperar(falta)
    }
  } finally {
    clearInterval(renovar)
    await digitando(system, 'paused')
  }
  // No bot de cliente do número da casa, a resposta sai sem a troca de marca:
  // senão "Aurora" vira o nome do bot e o endereço do site some da resposta.
  if (!resposta) return
  const opcoes = modoCliente ? { semMarca: true } : {}
  resposta = garantirMarcacao(resposta, alvo)
  const mentions = acharMarcacoes(resposta, membros)
  if (emAudio && !mentions.length && podeFalar(resposta, { pediu: true })) {
    await digitando(system, 'recording')
    const fala = await voz.falar(resposta)
    await digitando(system, 'paused')
    if (fala) return system.reply({ type: 'audio', media: fala.audio, mimetype: fala.mimetype, ptt: true }, opcoes)
  }
  // Em texto, as marcações de voz ([laughing], [break]…) somem.
  await system.reply(semTagsDeVoz(resposta), mentions.length ? { ...opcoes, mentions } : opcoes)
}

// Devolve true quando a mensagem é da Aurora (o handler para por aqui).
// forcado: veio do comando #aurora texto.
export function handleAurora(system, { forcado = false, texto } = {}) {
  if (!iaNesteBot()) return false
  configAtual = system.config || configAtual
  const t = String(texto ?? system.text ?? '').trim()
  const p = String(system.prefix || '#')
  const ehComando = !forcado && (t.startsWith(p) || t.startsWith('/'))
  if (!forcado && system.isGroup && Number(system.group?.soAdm) === 1 && !system.isAdmin && !system.isOwner) {
    if (chamouAurora(t)) console.log('[ AURORA IA ] ignorou: grupo no modo só admin |', system.from)
    return false
  }
  const decisao = deveResponder({
    texto: t,
    isGroup: system.isGroup,
    fromMe: Boolean(system.event?.key?.fromMe),
    ehComando,
    mencionouBot: system.isGroup && mencionouBot(system),
    citouBot: system.isGroup && citouBot(system),
    ligadaNoGrupo: !system.isGroup || ligadaNoGrupo(system),
    ligadaGlobal: auroraIaLigada(),
    temChave: Boolean(chaveIa()),
    forcado
  })
  if (!decisao.sim) {
    if (decisao.motivo) console.log('[ AURORA IA ] ignorou:', decisao.motivo, '|', system.from)
    return false
  }
  const bloqueado = (c) => hasGcmd(c) || (system.isGroup && hasCmd(system.from, c))
  const tarefa = (async () => {
    await conhecerPessoas(system)
    const acao = ehCriador(system) ? acaoDoCriador(t, textoCitado(system)) : null
    const uid = acao?.comando && !bloqueado(acao.comando) ? acao.uid || aurora.ultimoId(`${system.from}:${system.senderKey}`) : ''
    return uid ? executar(system, t, acao.comando, uid) : conversar(system, t)
  })()
  void tarefa.catch((err) => console.error('[ AURORA IA ] falha ao responder:', err?.message || err))
  return true
}

export const esquecerAurora = (system) => aurora.esquecer(`${system.from}:${system.senderKey}`)
export const estadoAurora = () => ({ ...aurora.estado(), temChave: Boolean(chaveIa()), ligada: auroraIaLigada(), criador: auroraCriador(), esposa: auroraEsposa() })

if (iaNesteBot() && !chaveIa()) console.log('[ AURORA IA ] desligada: falta SQUARECLOUD_API_KEY no ambiente')
