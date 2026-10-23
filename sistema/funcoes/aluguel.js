import { aluguelOn, delAluguel, listAluguel, setAluguelPedido, transferirAluguelPedido, ultimoPedidoAluguel, setDonoAluguel, setPersonalizacaoAluguel, setIdiomaGrupo, tokenAluguelSalvo } from './banco.js'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const isRateLimit = (error) => /(?:429|rate.overlimit|rate.limit|too many requests)/i.test(String(error?.message || error || ''))
const GROUP_CACHE_MS = 5 * 60_000
const GROUP_RETRY_BASE_MS = 2 * 60_000
const GROUP_RETRY_MAX_MS = 30 * 60_000
const clean = (value = '') => String(value ?? '').trim()
const codeFromLink = (value = '') => {
  const raw = clean(value)
  const m = raw.match(/(?:https?:\/\/)?chat\.whatsapp\.com\/([A-Za-z0-9_-]{10,})/i)
  if (m?.[1]) return m[1]
  return /^[A-Za-z0-9_-]{10,}$/.test(raw) ? raw : ''
}

function base(config) {
  return clean(config?.autoSystem?.url).replace(/\/$/, '')
}
function token(config) {
  const value = clean(process.env.AURORA_RENTAL_TOKEN || tokenAluguelSalvo() || config?.autoSystem?.rentalToken || '')
  if (!value || /^COLOQUE_/i.test(value)) return ''
  return value
}

async function api(config, pathname, options = {}) {
  const host = base(config), secret = token(config)
  if (!host || !secret) throw new Error('integração de aluguel não configurada')
  const response = await fetch(`${host}${pathname}`, {
    method: options.method || 'GET',
    signal: AbortSignal.timeout(20_000),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Aurora-Token': secret
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {})
  })
  const text = await response.text()
  let data
  try { data = JSON.parse(text) } catch { data = { erro: text || `HTTP ${response.status}` } }
  if (!response.ok) throw new Error(data?.erro || `HTTP ${response.status}`)
  return data
}

async function resultado(config, body) {
  try { await api(config, '/api/bot/alugueis/resultado', { method: 'POST', body }) } catch (err) {
    console.error('[ AURORA ALUGUEL ] Falha ao devolver resultado:', err?.message || err)
  }
}

async function ativarUm(client, config, item, getGroups) {
  const pedido = clean(item?.pedido_id), dias = Math.max(1, Math.floor(Number(item?.dias) || 30))
  if (!pedido) return

  const link = clean(item?.grupo_link || item?.invite_code)
  const code = codeFromLink(link)
  if (!code) {
    await resultado(config, { pedido_id: pedido, status: 'erro', erro: 'link de convite inválido' })
    return
  }

  try {
    // A consulta do convite nos dá o JID antes de entrar e evita duplicar uma
    // entrada quando o bot já faz parte do grupo.
    // Em personalizações, o grupo já está vinculado ao pedido.
    // Convites podem ter sido revogados depois da ativação; não dependemos
    // de um link antigo para atualizar nome, imagem e idioma.
    const recuperacao = Boolean(item?.recuperacao_pendente)
    const atualizacao = Boolean(item?.somente_personalizacao)
    let jid = atualizacao ? clean(item?.grupo_jid) : ''
    let preview = null
    if (!jid) {
      preview = await client.group.queryGroupInviteInfo(code)
      jid = clean(preview?.jid)
    }
    if (!jid) throw new Error('o WhatsApp não retornou o grupo deste convite')
    let meta = null
    if (atualizacao) {
      // Personalização nunca tenta entrar em outro grupo.
      meta = await client.group.queryGroupMetadata(jid)
    } else {
      // O banco local não prova participação: tenta entrar de verdade.
      try {
        const entrada = await client.group.joinGroupViaInvite(code)
        meta = typeof entrada === 'object' && entrada ? entrada : { jid }
        console.log('[ AURORA ALUGUEL ] Entrada solicitada pelo convite:', jid)
      } catch (err) {
        const mensagem = clean(err?.message || err)
        if (!/(?:already|participant|member|já.participa|ja.participa)/i.test(mensagem)) throw err
        // Mesmo quando o servidor diz "já participa", verifica a lista real.
        const verificado = await client.group.queryGroupMetadata(jid)
        const me = clean(client?.user?.id || client?.user?.jid || client?.authState?.creds?.me?.id).split(':')[0].split('@')[0]
        const participantes = Array.isArray(verificado?.participants) ? verificado.participants : null
        if (!me || !participantes?.some(p => clean(p?.id || p?.jid || p).split(':')[0].split('@')[0] === me)) {
          throw new Error('participação no grupo não confirmada pelo WhatsApp')
        }
        meta = verificado
        console.log('[ AURORA ALUGUEL ] Bot já participa do grupo, confirmado:', jid)
      }
    }
    if (!meta) throw new Error('não foi possível confirmar a entrada no grupo')

    aluguelOn(true)
    const registro = atualizacao ? { ate: null, repetido: true } : recuperacao ? transferirAluguelPedido(pedido, jid, item?.expira) : setAluguelPedido(jid, dias, pedido)
    const dono = setDonoAluguel(jid, item?.dono_numero)
    const personalizacao = setPersonalizacaoAluguel(jid, { nome: item?.nome_bot, foto: item?.foto_menu })
    const idioma = setIdiomaGrupo(jid, ['pt','es','en'].includes(item?.idioma) ? item.idioma : 'pt')
    await resultado(config, {
      pedido_id: pedido,
      status: 'ativo',
      grupo_jid: jid,
      grupo_nome: clean(meta?.subject || preview?.subject || 'Grupo'),
      ...(item?.somente_personalizacao ? {} : { expira: new Date(Number(registro.ate)).toISOString() })
    })
    if (!registro.repetido && !recuperacao) {
      const validade = new Date(Number(registro.ate)).toLocaleString('pt-BR', { timeZone: config?.timezone || 'America/Sao_Paulo' })
      const linhaDono = dono ? `\n• 👑 ${idioma === 'es' ? 'Dueño del bot' : idioma === 'en' ? 'Bot owner' : 'Dono do bot'}: @${dono}` : ''
      try {
        await client.message.send(jid, {
          type: 'text',
          text: idioma === 'es' ? `• ✅ *${personalizacao.nome || 'Aurora'} activado en este grupo!*${linhaDono}\n• 📅 Válido hasta: *${validade}*\n• Usa *${config?.prefix || '#'}menu* para ver los comandos.` : idioma === 'en' ? `• ✅ *${personalizacao.nome || 'Aurora'} activated in this group!*${linhaDono}\n• 📅 Valid until: *${validade}*\n• Use *${config?.prefix || '#'}menu* to see commands.` : `• ✅ *${personalizacao.nome || 'Aurora'} ativado neste grupo!*${linhaDono}\n• 📅 Válido até: *${validade}*\n• Use *${config?.prefix || '#'}menu* para ver os comandos.`
        }, dono ? { mentions: [`${dono}@s.whatsapp.net`], contextInfo: { mentionedJid: [`${dono}@s.whatsapp.net`] } } : {})
      } catch {}
    }
    console.log(registro.repetido
      ? `[ AURORA ALUGUEL ] Personalização atualizada no grupo ${jid}: nome=${personalizacao.nome || 'padrão'}, foto=${personalizacao.foto ? 'configurada' : 'sem foto'}, idioma=${idioma}`
      : `[ AURORA ALUGUEL ] Ativado: ${jid} até ${new Date(Number(registro.ate)).toLocaleString('pt-BR')}`)
  } catch (err) {
    const msg = clean(err?.message || err || 'não foi possível entrar no grupo').slice(0, 220)
    await resultado(config, { pedido_id: pedido, status: 'erro', erro: msg })
    console.error('[ AURORA ALUGUEL ] Falha no pedido', pedido, '-', msg)
  }
}

// Confirma no WhatsApp se o bot ainda participa dos grupos alugados.
// Falhas de rede/rate limit NÃO são tratadas como saída do grupo.
// A lista de grupos da sessão é independente da consulta de metadados.
// Só usamos uma resposta estruturada completa; erros nunca removem aluguéis.
let ultimaLista = 0
const ausenciasConfirmadas = new Map()
let avisoListaIndisponivel = false
async function conferirListaDeGrupos(client, config) {
  if (Date.now() - ultimaLista < 5 * 60_000) return
  ultimaLista = Date.now()
  if (typeof client?.group?.list !== 'function') {
    if (!avisoListaIndisponivel) {
      console.warn('[ AURORA ALUGUEL ] A biblioteca não oferece group.list; verificação de saída por lista indisponível.')
      avisoListaIndisponivel = true
    }
    return
  }
  try {
    const resposta = await Promise.race([
      client.group.list(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout lista de grupos')), 12_000))
    ])
    const grupos = Array.isArray(resposta) ? resposta : Array.isArray(resposta?.groups) ? resposta.groups : null
    if (!grupos) return
    const jids = new Set(grupos.map(g => clean(g?.jid || g?.id)).filter(j => j.endsWith('@g.us')))
    // Lista vazia pode representar sincronização incompleta; não é prova de saída.
    if (!jids.size) {
      console.warn('[ AURORA ALUGUEL ] Lista de grupos vazia; não será usada para confirmar saída.')
      return
    }
    console.log('[ AURORA ALUGUEL ] Lista da sessão consultada:', jids.size, 'grupos')
    for (const item of listAluguel()) {
      if (!(Number(item?.ate) > Date.now())) continue
      const jid = clean(item?.gp)
      if (!jid) continue
      if (jids.has(jid)) { ausenciasConfirmadas.delete(jid); continue }
      const faltas = (ausenciasConfirmadas.get(jid) || 0) + 1
      ausenciasConfirmadas.set(jid, faltas)
      if (faltas < 2) {
        console.warn('[ AURORA ALUGUEL ] Grupo ausente da primeira lista; aguardando segunda confirmação:', jid)
        continue
      }
      const pedido = ultimoPedidoAluguel(jid)?.pedido
      if (!pedido) continue
      try {
        await api(config, '/api/bot/alugueis/resultado', {
          method: 'POST',
          body: { pedido_id: pedido, status: 'erro', erro: 'BOT_FORA_DO_GRUPO', grupo_jid: jid }
        })
        delAluguel(jid)
        console.warn('[ AURORA ALUGUEL ] Grupo ausente da lista da sessão:', jid)
      } catch (err) {
        console.warn('[ AURORA ALUGUEL ] Não foi possível sincronizar saída:', jid, err?.message || err)
      }
    }
  } catch (err) {
    console.warn('[ AURORA ALUGUEL ] Lista de grupos indisponível; nenhum aluguel alterado:', err?.message || err)
  }
}
const proximaConsultaMetadata = new Map()
async function conferirSaidas(client, config) {
  for (const item of listAluguel()) {
    if (!(Number(item?.ate) > Date.now())) continue
    const jid = clean(item?.gp)
    if (!jid) continue
    if (Date.now() < (proximaConsultaMetadata.get(jid) || 0)) continue
    const pedido = ultimoPedidoAluguel(jid)?.pedido
    if (!pedido) continue
    try {
      const meta = await Promise.race([
        client.group.queryGroupMetadata(jid),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout metadata')), 8000))
      ])
      if (!meta) continue
      const me = clean(client?.user?.id || client?.user?.jid || client?.authState?.creds?.me?.id).split(':')[0].split('@')[0]
      const participantes = Array.isArray(meta?.participants) ? meta.participants : null
      if (me && participantes && !participantes.some(p => {
        const id = clean(p?.id || p?.jid || p).split(':')[0].split('@')[0]
        return id === me
      })) {
        await resultado(config, { pedido_id: pedido, status: 'erro', erro: 'BOT_FORA_DO_GRUPO', grupo_jid: jid })
        delAluguel(jid)
        console.warn('[ AURORA ALUGUEL ] Saída confirmada pelo WhatsApp:', jid)
      }
    } catch (err) {
      const message = clean(err?.message || err)
      const espera = /(?:403|forbidden|429|rate.limit)/i.test(message) ? 10 * 60_000 : 2 * 60_000
      proximaConsultaMetadata.set(jid, Date.now() + espera)
      console.warn('[ AURORA ALUGUEL ] Consulta inconclusiva; nova tentativa em', Math.round(espera / 60000), 'minutos:', jid, message)
    }
  }
}

async function sairVencidos(client, config) {
  const agora = Date.now()
  for (const item of listAluguel()) {
    if (Number(item?.ate) > agora) continue
    const jid = clean(item?.gp)
    if (!jid) continue
    try {
      await client.group.leaveGroup([jid])
      delAluguel(jid)
      const ultimo = ultimoPedidoAluguel(jid)
      if (ultimo?.pedido) await resultado(config, { pedido_id: ultimo.pedido, status: 'expirado', grupo_jid: jid })
      console.log('[ AURORA ALUGUEL ] Mensalidade vencida; saí do grupo:', jid)
    } catch (err) {
      console.error('[ AURORA ALUGUEL ] Não consegui sair do grupo vencido', jid, '-', err?.message || err)
    }
  }
}

export function createAluguelWorker({ client, config }) {
  let stopped = false, running = false, timer = null
  let authFailureLogged = false, retryAfter = 0
  // A listagem completa de grupos é dispensável: os JIDs ativos já estão no banco.
  // Consultar group.list bloqueava toda a sincronização quando o WhatsApp respondia 429.
  const getGroups = async () => listAluguel().map((item) => ({ jid: clean(item?.gp) })).filter((item) => item.jid)

  const sync = async () => {
    if (stopped || running || Date.now() < retryAfter) return
    running = true
    try {
      await conferirListaDeGrupos(client, config)
      await conferirSaidas(client, config)
      await sairVencidos(client, config)
      const data = await api(config, '/api/bot/alugueis/pendentes')
      authFailureLogged = false
      retryAfter = 0
      for (const item of (Array.isArray(data?.alugueis) ? data.alugueis : [])) {
        await ativarUm(client, config, item, getGroups)
        await sleep(1000)
      }
    } catch (err) {
      // Configuração ausente não derruba o bot; os outros comandos continuam.
      const message = String(err?.message || err)
      if (/token do Aurora inválido|HTTP 401/i.test(message)) {
        retryAfter = Date.now() + 5 * 60_000
        if (!authFailureLogged) {
          console.error('[ AURORA ALUGUEL ] Autenticação recusada pelo site. Confira se AURORA_RENTAL_TOKEN na Square Cloud do bot é idêntico ao AURORA_RENTAL_TOKEN no site Kasane. Próxima tentativa em 5 minutos.')
          authFailureLogged = true
        }
      } else if (message === 'GROUP_RATE_LIMIT_COOLDOWN') {
        // Evita logs repetidos durante a espera após 429.
      } else if (!/não configurada/i.test(message)) {
        console.error('[ AURORA ALUGUEL ] Sincronização:', message)
      }
    } finally { running = false }
  }

  const onGroupEvent = async (event) => {
    const jid = clean(event?.groupJid || '')
    const pedido = ultimoPedidoAluguel(jid)?.pedido
    if (!pedido) return
    const action = clean(event?.action).toLowerCase()
    if (!['remove', 'leave', 'left', 'participant_remove'].includes(action)) return
    const me = clean(client?.user?.id || client?.user?.jid || client?.authState?.creds?.me?.id).split(':')[0].split('@')[0]
    const participants = Array.isArray(event?.participants) ? event.participants : []
    const saiu = me && participants.some(p => clean(p?.id || p?.jid || p).split(':')[0].split('@')[0] === me)
    if (!saiu) return
    try {
      await api(config, '/api/bot/alugueis/resultado', {
        method: 'POST',
        body: { pedido_id: pedido, status: 'erro', erro: 'BOT_FORA_DO_GRUPO', grupo_jid: jid }
      })
      delAluguel(jid)
      console.warn('[ AURORA ALUGUEL ] Saída confirmada pelo evento de participantes:', jid)
    } catch (err) {
      console.error('[ AURORA ALUGUEL ] Falha ao confirmar saída no site:', err?.message || err)
    }
  }

  const start = () => {
    if (timer) return
    stopped = false
    void sync()
    timer = setInterval(() => { void sync() }, 15_000)
    timer.unref?.()
  }
  const stop = () => {
    stopped = true
    if (timer) clearInterval(timer)
    timer = null
  }
  return { start, stop, sync, onGroupEvent }
}
