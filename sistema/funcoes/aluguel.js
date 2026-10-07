import { aluguelOn, delAluguel, listAluguel, setAluguelPedido, ultimoPedidoAluguel } from './banco.js'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
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
  const value = clean(process.env.AURORA_RENTAL_TOKEN || config?.autoSystem?.rentalToken || '')
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

async function ativarUm(client, config, item) {
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
    const preview = await client.group.queryGroupInviteInfo(code)
    const jid = clean(preview?.jid)
    if (!jid) throw new Error('o WhatsApp não retornou o grupo deste convite')

    const atuais = await client.group.queryAllGroups()
    let meta = atuais.find((g) => g?.jid === jid) || null
    if (!meta) meta = await client.group.joinGroupViaInvite(code)

    aluguelOn(true)
    const registro = setAluguelPedido(jid, dias, pedido)
    await resultado(config, {
      pedido_id: pedido,
      status: 'ativo',
      grupo_jid: jid,
      grupo_nome: clean(meta?.subject || preview?.subject || 'Grupo'),
      expira: new Date(Number(registro.ate)).toISOString()
    })
    console.log(`[ AURORA ALUGUEL ] ${registro.repetido ? 'Confirmado' : 'Ativado'}: ${jid} até ${new Date(Number(registro.ate)).toLocaleString('pt-BR')}`)
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

  const sync = async () => {
    if (stopped || running) return
    running = true
    try {
      await sairVencidos(client, config)
      const data = await api(config, '/api/bot/alugueis/pendentes')
      for (const item of (Array.isArray(data?.alugueis) ? data.alugueis : [])) {
        await ativarUm(client, config, item)
        await sleep(400)
      }
    } catch (err) {
      // Configuração ausente não derruba o bot; os outros comandos continuam.
      if (!/não configurada/i.test(String(err?.message || ''))) {
        console.error('[ AURORA ALUGUEL ] Sincronização:', err?.message || err)
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
