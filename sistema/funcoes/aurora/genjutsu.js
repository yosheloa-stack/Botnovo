// O GENJUTSU DA AURORA: a pessoa manda um vídeo e uma foto, a Aurora pede à
// Higgsfield (API Genjutsu) e devolve o vídeo com quem está na foto fazendo
// os mesmos movimentos do vídeo. "Troca X por Y" usa a troca de objeto.
//
// A API da Higgsfield tem saldo próprio em dólar (console da Higgsfield, não
// o plano do site) e cobra só vídeo que deu certo. A chave fica SÓ no
// ambiente do Square Cloud, nunca no repositório:
//
// HIGGSFIELD_KEY_ID        ID da chave da API
// HIGGSFIELD_KEY_SECRET    segredo da chave
//   (também aceita HF_API_KEY_ID / HF_API_KEY_SECRET, ou HIGGSFIELD_API_KEY=id:segredo)
// AURORA_GENJUTSU_RES      480p, 720p (padrão) ou 1080p
// AURORA_GENJUTSU_MAX_SEG  tamanho máximo do vídeo em segundos (padrão 15; a API aceita de 4 a 30)
//
// Quem pode pedir e quantos vídeos por dia: #genjutsu (só o criador muda).
import crypto from 'node:crypto'
import { semAcento } from './ia.js'

const API = 'https://api.higgsfield.ai'
export const ENDPOINTS = {
  personagem: 'higgsfield/genjutsu/motion-transfer/v1.0',
  troca: 'higgsfield/genjutsu/object-swap/v1.0'
}
export const MIN_SEG = 4

const env = (nome) => String(process.env[nome] || '').trim()
export function credencial() {
  const id = env('HIGGSFIELD_KEY_ID') || env('HF_API_KEY_ID')
  const segredo = env('HIGGSFIELD_KEY_SECRET') || env('HF_API_KEY_SECRET')
  if (id && segredo) return `${id}:${segredo}`
  const junto = env('HIGGSFIELD_API_KEY') || env('HF_KEY')
  return junto.includes(':') ? junto : ''
}
export const genjutsuLigado = () => Boolean(credencial())
export const resolucao = () => ['480p', '720p', '1080p'].includes(env('AURORA_GENJUTSU_RES')) ? env('AURORA_GENJUTSU_RES') : '720p'
export function maxSegundos() {
  const n = Number(env('AURORA_GENJUTSU_MAX_SEG'))
  return Number.isFinite(n) && n >= MIN_SEG ? Math.min(30, Math.floor(n)) : 15
}

// ── a pessoa pediu o vídeo? ──────────────────────────────────────────────────
// "aurora coloca eu nesse vídeo", "bota meu personagem no vídeo", "faz o
// genjutsu", "troca o carro do vídeo por uma moto". Pergunta ("como faz o
// genjutsu?") e negação ficam com a conversa normal, pra ela explicar.
// forte: falou "genjutsu" (vai mesmo sem vídeo, pra ela explicar o que falta).
export function pediuGenjutsu(texto = '') {
  const t = semAcento(texto)
  if (/\b(como|quanto|qual|quando|o que|oque|nao|pq|porque|por que)\b|\?/.test(t)) return null
  const genjutsu = /\bgenjutsu\b/.test(t)
  const VIDEO = '(video|videos|videozinho|clipe)'
  const FORTE = '(coloc\\w*|poe|bot[ae]\\w*|mete|enfia|troc\\w*|substitu\\w*|transform\\w*|anim\\w*)'
  // "faz/cria/gera/muda" só valem colados no vídeo ("faz tempo que não vejo vídeo" não é pedido).
  const FRACO = '(faz\\w*|faca|gera\\w*|cria\\w*|muda\\w*)'
  const pedido = genjutsu
    || new RegExp(`\\b${FORTE}\\b[\\s\\S]{0,60}\\b${VIDEO}\\b|\\b${VIDEO}\\b[\\s\\S]{0,40}\\b${FORTE}\\b`).test(t)
    || new RegExp(`\\b${FRACO}\\s+(um |o |esse |este |meu |nesse |neste |no |isso no )?${VIDEO}\\b`).test(t)
  if (!pedido) return null
  const troca = /\b(troc\w*|substitu\w*)\b[\s\S]{0,80}\b(por|pelo|pela)\b/.test(t)
  return { modo: troca ? 'troca' : 'personagem', forte: genjutsu }
}

// O pedido vira prompt só na troca ("troca o carro por uma moto"): sem o
// nome dela e sem o pedido de vídeo.
export function promptDaTroca(texto = '') {
  return String(texto).replace(/^\s*(oi|ei|eai|e ai)?[\s,]*aurora[\s,:!]*/i, '').replace(/\s+/g, ' ').trim().slice(0, 500)
}

// ── as mídias: a da mensagem, a citada e as que a pessoa mandou há pouco ────
// Cada item: { tipo: 'video'|'image', seconds, mimetype, fonte }. Pega o
// primeiro vídeo e até 4 fotos, nessa ordem de preferência.
export function escolherMidias(listas = []) {
  let video = null
  const imagens = []
  const vistos = new Set()
  for (const m of listas.flat().filter(Boolean)) {
    // A mesma mensagem pode vir como "atual" e como "recente": conta uma vez.
    const id = m.fonte?.key?.id || m
    if (vistos.has(id)) continue
    vistos.add(id)
    if (m.tipo === 'video' && !video) video = m
    else if (m.tipo === 'image' && imagens.length < 4) imagens.push(m)
  }
  return { video, imagens }
}

// Guarda as últimas fotos e vídeos de cada conversa por 20 minutos (só a
// referência da mensagem; baixa na hora do pedido).
export function createRecentes({ agora = Date.now, vidaMs = 20 * 60_000, max = 1000 } = {}) {
  const mapa = new Map()
  return {
    guardar(conversa, item) {
      const lista = (mapa.get(conversa) || []).filter((x) => agora() - x.at < vidaMs)
      lista.unshift({ ...item, at: agora() })
      mapa.delete(conversa)
      mapa.set(conversa, lista.slice(0, 4))
      if (mapa.size > max) mapa.delete(mapa.keys().next().value)
    },
    pegar(conversa) { return (mapa.get(conversa) || []).filter((x) => agora() - x.at < vidaMs) },
    esquecer(conversa) { mapa.delete(conversa) }
  }
}

// ── quem pode e quantos por dia ─────────────────────────────────────────────
// Dia de Brasília (UTC-3), pra zerar à meia-noite daqui.
export const diaBrasilia = (ms = Date.now()) => new Date(ms - 3 * 3_600_000).toISOString().slice(0, 10)
export const POR_PESSOA_DIA = 1

// quem: criador | donos | todos. O criador nunca entra no limite do dia.
export function podePedir({ quem = 'todos', ehCriador = false, ehDono = false, uso = { total: 0, pessoas: {} }, pessoa = '', maxDia = 3 }) {
  if (ehCriador) return { sim: true }
  if (quem === 'criador') return { sim: false, motivo: 'so_criador' }
  if (quem === 'donos' && !ehDono) return { sim: false, motivo: 'so_donos' }
  if (uso.total >= maxDia) return { sim: false, motivo: 'limite_dia' }
  if (pessoa && Number(uso.pessoas?.[pessoa] || 0) >= POR_PESSOA_DIA) return { sim: false, motivo: 'limite_pessoa' }
  return { sim: true }
}

export function conferirVideo(seconds, max = maxSegundos()) {
  const s = Number(seconds) || 0
  if (s && s < MIN_SEG) return 'curto'
  if (s && s > max) return 'longo'
  return ''
}

// ── a API ───────────────────────────────────────────────────────────────────
export class ErroGenjutsu extends Error {
  constructor(codigo, detalhe = '') {
    super(`${codigo}${detalhe ? ': ' + detalhe : ''}`)
    this.codigo = codigo
    this.detalhe = detalhe
  }
}
const detalheDe = (data) => {
  const d = data?.detail ?? data?.error ?? data?.message ?? ''
  return (typeof d === 'string' ? d : JSON.stringify(d)).slice(0, 300)
}
// Os códigos da Higgsfield: 401 chave, 403 sem saldo, 429 fila cheia, 422/400 pedido inválido.
export function erroHttp(status, data) {
  const detalhe = detalheDe(data)
  if (status === 401) return new ErroGenjutsu('chave', detalhe)
  if (status === 402 || status === 403) return new ErroGenjutsu('saldo', detalhe)
  if (status === 429 || status === 423 || status === 503) return new ErroGenjutsu('ocupado', detalhe)
  if (status === 400 || status === 422) return new ErroGenjutsu('invalido', detalhe)
  return new ErroGenjutsu('api', `HTTP ${status}${detalhe ? ' ' + detalhe : ''}`)
}

export const PAUSAS = [5_000, 5_000, 10_000, 10_000, 15_000]
export function createGenjutsu({ fetchFn = globalThis.fetch, esperar = (ms) => new Promise((r) => setTimeout(r, ms)), chave = credencial, limiteMs = 25 * 60_000, agora = Date.now } = {}) {
  const cabecalho = () => ({ Authorization: 'Key ' + chave() })
  async function json(resposta) { try { return await resposta.json() } catch { return null } }

  async function subir(buffer, mimetype) {
    const tipo = String(mimetype || '').split(';')[0].trim().toLowerCase()
    const r = await fetchFn(API + '/files/generate-upload-url', {
      method: 'POST',
      headers: { ...cabecalho(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ content_type: tipo }),
      signal: AbortSignal.timeout(30_000)
    })
    const data = await json(r)
    if (!r.ok) throw erroHttp(r.status, data)
    if (!data?.upload_url || !data?.public_url) throw new ErroGenjutsu('api', 'upload sem endereço')
    // A credencial da Higgsfield nunca vai pro endereço de upload.
    const put = await fetchFn(data.upload_url, {
      method: 'PUT',
      headers: { 'Content-Type': tipo, ...(data.upload_headers || {}) },
      body: buffer,
      signal: AbortSignal.timeout(120_000)
    })
    if (!put.ok) throw new ErroGenjutsu('api', `upload HTTP ${put.status}`)
    return data.public_url
  }

  async function pedir(modo, corpo) {
    const r = await fetchFn(`${API}/${ENDPOINTS[modo] || ENDPOINTS.personagem}`, {
      method: 'POST',
      headers: { ...cabecalho(), 'Content-Type': 'application/json', 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(60_000)
    })
    const data = await json(r)
    if (!r.ok) throw erroHttp(r.status, data)
    if (!data?.request_id) throw new ErroGenjutsu('api', 'sem request_id')
    return data
  }

  async function acompanhar(pedido) {
    const url = pedido.status_url || `${API}/requests/${pedido.request_id}/status`
    const inicio = agora()
    for (let i = 0; ; i++) {
      await esperar(PAUSAS[Math.min(i, PAUSAS.length - 1)])
      let r, data
      try {
        r = await fetchFn(url, { headers: cabecalho(), signal: AbortSignal.timeout(30_000) })
        data = await json(r)
      } catch (err) {
        if (agora() - inicio > limiteMs) throw new ErroGenjutsu('demorou', err?.message || '')
        continue
      }
      if (r.status === 401) throw erroHttp(401, data)
      const status = data?.status
      if (status === 'completed') {
        const out = data?.video?.url || data?.videos?.[0]?.url || ''
        if (!out) throw new ErroGenjutsu('api', 'pronto sem vídeo')
        return out
      }
      if (status === 'nsfw') throw new ErroGenjutsu('nsfw')
      if (status === 'failed' || status === 'canceled') throw new ErroGenjutsu('falhou', detalheDe(data))
      if (agora() - inicio > limiteMs) throw new ErroGenjutsu('demorou')
    }
  }

  // video/imagens: { buffer, mimetype }. Devolve o endereço do vídeo pronto.
  async function gerar({ modo = 'personagem', video, imagens = [], prompt = '', res = resolucao(), aoEnviar } = {}) {
    if (!chave()) throw new ErroGenjutsu('chave', 'sem chave')
    const video_url = await subir(video.buffer, video.mimetype || 'video/mp4')
    const image_urls = []
    for (const img of imagens.slice(0, 4)) image_urls.push(await subir(img.buffer, img.mimetype || 'image/jpeg'))
    const pedido = await pedir(modo, { video_url, image_urls, prompt: modo === 'troca' ? String(prompt || '') : '', resolution: res })
    if (aoEnviar) await aoEnviar(pedido)
    return acompanhar(pedido)
  }

  return { gerar, subir, pedir, acompanhar }
}

// ── o que ela fala ──────────────────────────────────────────────────────────
export const FALAS = {
  so_criador: () => 'esse truque de vídeo é só pro meu criador, amor 😌',
  so_donos: () => 'esse truque de vídeo é só pros donos do bot 😌',
  limite_dia: () => 'cansei de fazer vídeo hoje kkkk 😴 os vídeos de hoje acabaram, amanhã tem mais',
  limite_pessoa: () => 'você já ganhou seu vídeo hoje 😌 amanhã faço outro pra você',
  ocupado: () => 'tô terminando outro vídeo agora ⏳ espera ele sair e me pede de novo',
  sem_midia: (max) => `pra fazer o genjutsu eu preciso de um *vídeo* (de ${MIN_SEG} a ${max} segundos) e de uma *foto* de quem vai entrar nele 🎬\n\nmanda o vídeo, depois a foto, e me fala "aurora coloca no vídeo" (ou responde o vídeo com a foto escrevendo isso)`,
  sem_video: (max) => `cadê o vídeo? 👀 me manda um de ${MIN_SEG} a ${max} segundos (ou responde ele) e me pede de novo`,
  sem_foto: () => 'falta a foto de quem vai entrar no vídeo 📸 manda ela e me pede de novo',
  curto: () => `esse vídeo é curtinho demais 😅 precisa de pelo menos ${MIN_SEG} segundos`,
  longo: (max) => `esse vídeo é grandão 😵 corta pra até ${max} segundos e manda de novo`,
  comecou: () => 'bora 🎬✨ tô montando teu vídeo, leva uns minutinhos… te mando aqui quando ficar pronto',
  pronto: () => 'prontinho ✨🎬',
  nsfw: () => 'a Higgsfield barrou esse vídeo (achou conteúdo sensível) 😬 tenta com outro',
  falhou: () => 'deu ruim no vídeo 😕 tenta de novo daqui a pouco (não gastou nada)',
  saldo: () => 'acabou o saldo da API da Higgsfield 😕 coloca crédito no console da Higgsfield (é o saldo da API, não o plano do site)',
  chave: () => 'a Higgsfield recusou a chave 😕 confere HIGGSFIELD_KEY_ID e HIGGSFIELD_KEY_SECRET no Square Cloud',
  baixar: () => 'não consegui baixar o vídeo ou a foto do zap 😕 manda de novo e me pede'
}

// O criador vê o motivo de verdade; os outros, o genérico.
export function falaDoErro(err, ehCriador = false) {
  const c = err?.codigo
  if (c === 'nsfw') return FALAS.nsfw()
  if (c === 'ocupado') return FALAS.ocupado()
  if (ehCriador && (c === 'saldo' || c === 'chave')) return FALAS[c]()
  if (ehCriador && c === 'invalido') return `a Higgsfield não aceitou o pedido 😕 (${String(err.detalhe || '').slice(0, 200)})`
  return FALAS.falhou()
}
