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

import { createAurora, deveResponder, textoPrecos, LIMITES } from './ia.js'
import { extractText } from '../../core/contexto.js'
import { contextInfoFromMessage, quotedInfo, quotedTarget } from '../mensagem.js'
import { autoSystem } from '../auto.js'
import { pedirAoSite } from '../rede.js'
import { auroraIaLigada, auroraNoGrupo, aluguelOk, getDonoAluguel } from '../banco.js'
import { modoCliente } from '../cliente.js'
import { digits, mesmoNumero } from '../jid.js'

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

export const aurora = createAurora({
  chamar,
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

async function conversar(system, texto) {
  const conversa = `${system.from}:${system.senderKey}`
  const citado = (() => { const q = quotedInfo(system.event); return q ? extractText(q.message) : '' })()
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
      nome: String(system.pushName || 'alguém').slice(0, 40),
      ehAdmin: Boolean(system.isAdmin),
      ehDono: Boolean(system.isOwner),
      citado,
      prefixo: system.prefix
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
  if (resposta) await system.reply(resposta, modoCliente ? { semMarca: true } : {})
}

// Devolve true quando a mensagem é da Aurora (o handler para por aqui).
// forcado: veio do comando #aurora texto.
export function handleAurora(system, { forcado = false, texto } = {}) {
  if (!iaNesteBot()) return false
  configAtual = system.config || configAtual
  const t = String(texto ?? system.text ?? '').trim()
  const p = String(system.prefix || '#')
  const ehComando = !forcado && (t.startsWith(p) || t.startsWith('/'))
  if (!forcado && system.isGroup && Number(system.group?.soAdm) === 1 && !system.isAdmin && !system.isOwner) return false
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
  void conversar(system, t).catch((err) => console.error('[ AURORA IA ] falha ao responder:', err?.message || err))
  return true
}

export const esquecerAurora = (system) => aurora.esquecer(`${system.from}:${system.senderKey}`)
export const estadoAurora = () => ({ ...aurora.estado(), temChave: Boolean(chaveIa()), ligada: auroraIaLigada() })

if (iaNesteBot() && !chaveIa()) console.log('[ AURORA IA ] desligada: falta SQUARECLOUD_API_KEY no ambiente')
