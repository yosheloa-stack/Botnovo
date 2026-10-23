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
    const atuais = await getGroups()
    let jid = atualizacao ? clean(item?.grupo_jid) : ''
    let preview = null
    if (!jid) {
      preview = await client.group.queryGroupInviteInfo(code)
      jid = clean(preview?.jid)
    }
    if (!jid) throw new Error('o WhatsApp não retornou o grupo deste convite')
    let meta = atuais.find((g) => g?.jid === jid) || null
    if (!meta && !atualizacao) meta = await client.group.joinGroupViaInvite(code)
    if (!meta && atualizacao) throw new Error('bot não está mais no grupo configurado')
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
  let cachedGroups = null, groupsCachedAt = 0, groupRetryAfter = 0, groupFailures = 0
  const getGroups = async () => {
    const now = Date.now()
    if (Array.isArray(cachedGroups) && now - groupsCachedAt < GROUP_CACHE_MS) return cachedGroups
    if (now < groupRetryAfter) {
      if (Array.isArray(cachedGroups)) return cachedGroups
      throw new Error('GROUP_RATE_LIMIT_COOLDOWN')
    }
    try {
      const groups = await client.group.queryAllGroups()
      if (!Array.isArray(groups)) throw new Error('listagem de grupos inválida')
      cachedGroups = groups
      groupsCachedAt = Date.now()
      groupFailures = 0
      groupRetryAfter = 0
      return groups
    } catch (err) {
      if (isRateLimit(err)) {
        groupFailures = Math.min(groupFailures + 1, 6)
        const backoff = Math.min(GROUP_RETRY_BASE_MS * (2 ** (groupFailures - 1)), GROUP_RETRY_MAX_MS)
        groupRetryAfter = Date.now() + backoff + Math.floor(Math.random() * 15_000)
        console.warn('[ AURORA ALUGUEL ] Limite de consultas de grupos (429). Próxima consulta em aproximadamente ' + Math.ceil(backoff / 60_000) + ' minuto(s).')
        if (Array.isArray(cachedGroups)) return cachedGroups
        throw new Error('GROUP_RATE_LIMIT_COOLDOWN')
      }
      throw err
    }
  }

  const sync = async () => {
    if (stopped || running || Date.now() < retryAfter) return
    running = true
    try {
      await sairVencidos(client, config)
      const gruposAtuais = await getGroups()
      if (Array.isArray(gruposAtuais) && gruposAtuais.length > 0 && Date.now() >= groupRetryAfter) {
        const ids = new Set(gruposAtuais.map(g => clean(g?.jid)))
        for (const alugado of listAluguel()) {
          if (Number(alugado?.ate) <= Date.now() || ids.has(clean(alugado?.gp))) continue
          const pedidoAnterior = ultimoPedidoAluguel(alugado.gp)
          if (pedidoAnterior?.pedido) await resultado(config, { pedido_id: pedidoAnterior.pedido, status: 'erro', erro: 'BOT_FORA_DO_GRUPO' })
        }
      }
      const data = await api(config, '/api/bot/alugueis/pendentes')
      authFailureLogged = false
      retryAfter = 0
      for (const item of (Array.isArray(data?.alugueis) ? data.alugueis : [])) {
        await ativarUm(client, config, item, getGroups)
        await sleep(400)
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

  const start = () => {
    if (timer || stopped) return
    void sync()
    timer = setInterval(() => { void sync() }, 15_000)
    timer.unref?.()
  }
  const stop = () => {
    stopped = true
    if (timer) clearInterval(timer)
    timer = null
  }
  return { start, stop, sync }
}
