// GERENTE DOS BOTS DAS CLIENTES (WhatsApp no número delas).
//
// Quem compra o aluguel do WhatsApp ganha o próprio bot, no número que ela
// cadastrou no site. Este gerente roda junto do bot da casa (no launcher):
// a cada 30 s pergunta ao site quais bots devem estar ligados e mantém um
// processo do Aurora por cliente, cada um na pasta de dados dela
// (sistema/dados/clientes/<pedido>). Mesmo modelo do bot do Telegram
// (Bot-aluguel-tg, src/gerente.js).
//
// O processo da cliente avisa por mensagem (IPC): código de conexão gerado,
// conectado, desconectado, código vencido, aluguel vencido. O gerente repassa
// ao site, que mostra tudo na tela "Configurar meu bot".
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { criarLogRaro, motivoDaFalha, pedirAoSite, respostaEstranha } from '../funcoes/rede.js'
import { NUMERO_BOT_DA_CASA } from '../funcoes/config.js'
import { mesmoNumero } from '../funcoes/jid.js'

const INDEX = fileURLToPath(new URL('../../index.js', import.meta.url))
const limpo = (v) => String(v ?? '').trim()
const nomePasta = (pedido) => limpo(pedido).replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 80)

// Variáveis do bot da casa que o bot da cliente NÃO pode herdar.
// AURORA_PREFIX também é da casa: cada bot de cliente guarda o próprio
// prefixo (#setprefix) na pasta dele. A chave da Square Cloud (Aurora com IA)
// também, menos no número da casa (ver IA_DA_CASA).
const IA_DA_CASA = ['SQUARECLOUD_API_KEY', 'SQUARECLOUD_AI_KEY', 'AURORA_MAX_DIA', 'AURORA_CRIADOR', 'ELEVENLABS_API_KEY', 'ELEVENLABS_VOZ', 'ELEVENLABS_MODELO', 'AURORA_AUDIO_CHANCE', 'AURORA_AUDIO_DIA']
const SO_DA_CASA = ['AURORA_SITE_TOKEN', 'AURORA_RENTAL_TOKEN', 'AUTO_SYSTEM_TOKEN', 'AUTOSYSTEM_TOKEN', 'AURORA_PREFIX', 'AURORA_OWNER_NUMBER', 'AURORA_CONNECTION_NUMBER', 'AURORA_CONFIG_FILE', 'AURORA_DATA_DIR', 'AURORA_MARCA', 'AURORA_CLIENTE', 'AURORA_IA', ...IA_DA_CASA]

// A Aurora com IA é do bot da casa. Quando o número da casa está ligado como
// bot de cliente (o dono alugou pro próprio número, é ele que manda os avisos
// de compra), esse bot também tem a IA. AURORA_IA_NUMERO troca o número.
export const temIaDaCasa = (botNumero) => {
  const numero = limpo(process.env.AURORA_IA_NUMERO) || NUMERO_BOT_DA_CASA
  return Boolean(limpo(botNumero)) && (mesmoNumero(numero, botNumero) || mesmoNumero(botNumero, numero))
}

export function marcaDo(c) {
  return {
    nome: limpo(c.nome_bot),
    dono: limpo(c.dono_numero).replace(/\D/g, ''),
    donoNome: limpo(c.dono_nome),
    idioma: limpo(c.idioma) || 'pt',
    foto: limpo(c.foto_menu),
    estilo: limpo(c.estilo_menu),
    expira: limpo(c.expira)
  }
}

export function criarGerente({
  site,            // { url, token }
  autoSystem = {}, // { url, token } da API de likes (key da casa)
  pastaBase = path.resolve('sistema/dados/clientes'),
  intervaloMs = 30_000,
  fetchImpl = fetch,
  spawnImpl = spawn,
  log = console
} = {}) {
  const bots = new Map() // pedido -> estado
  // Site fora do ar (ou ainda sem esta rota): uma linha a cada 10 minutos.
  const logSite = criarLogRaro({ intervaloMs: 10 * 60_000 })
  let timer = null, parado = false, rodando = false

  async function chamar(caminho, { method = 'GET', body } = {}) {
    let r
    try {
      r = await pedirAoSite(`${site.url}${caminho}`, {
        method,
        fetchImpl,
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Aurora-Token': site.token },
        ...(body ? { body: JSON.stringify(body) } : {})
      })
    } catch (err) { throw new Error(motivoDaFalha(err)) }
    const texto = await r.text()
    let data
    try { data = JSON.parse(texto) } catch { throw new Error(respostaEstranha(texto, r.status)) }
    if (!r.ok) throw new Error(data?.erro || `HTTP ${r.status}`)
    return data
  }

  async function contar(pedido, resultado) {
    try {
      await chamar('/api/bot/wa/clientes/resultado', { method: 'POST', body: { resultados: [{ pedido, ...resultado }] } })
    } catch (err) {
      log.warn('[ AURORA CLIENTES ] Não consegui avisar o site:', err?.message || err)
    }
  }

  const pastaDe = (pedido) => path.join(pastaBase, nomePasta(pedido))
  const sessaoDe = (pedido) => path.join(pastaDe(pedido), 'sistema', 'dados', 'sessao')
  const temSessao = (pedido) => {
    try { return fs.readdirSync(sessaoDe(pedido), { recursive: true }).some((f) => String(f).endsWith('.bin')) } catch { return false }
  }
  const apagarSessao = (pedido) => { try { fs.rmSync(sessaoDe(pedido), { recursive: true, force: true }) } catch {} }

  const tokenDo = (c) => limpo(c.api_key) || autoSystem.token || ''

  function ligar(estado) {
    const c = estado.conf
    const pasta = pastaDe(c.pedido)
    fs.mkdirSync(pasta, { recursive: true })
    const env = { ...process.env }
    for (const k of SO_DA_CASA) delete env[k]
    Object.assign(env, {
      AURORA_CLIENTE: '1',
      AURORA_CONNECTION_NUMBER: limpo(c.bot_numero),
      AURORA_OWNER_NUMBER: limpo(c.dono_numero),
      AURORA_DATA_DIR: path.join(pasta, '.aurora-data'),
      AURORA_MARCA: JSON.stringify(marcaDo(c)),
      ...(autoSystem.url ? { AUTOSYSTEM_URL: autoSystem.url } : {}),
      // A dona pode escolher no site usar a key da conta dela: aí os likes
      // pedidos no bot saem do plano dela, não da key da casa.
      ...(tokenDo(c) ? { AUTOSYSTEM_TOKEN: tokenDo(c) } : {})
    })
    if (temIaDaCasa(c.bot_numero)) {
      env.AURORA_IA = '1'
      for (const k of IA_DA_CASA) if (process.env[k]) env[k] = process.env[k]
      // Pra Aurora ler o painel do site quando o criador pergunta.
      if (site?.token) env.AURORA_SITE_TOKEN = site.token
    }
    const nome = limpo(c.nome_bot) || limpo(c.bot_numero)
    const filho = spawnImpl(process.execPath, ['--disable-warning=ExperimentalWarning', INDEX], { cwd: pasta, env, stdio: ['ignore', 'pipe', 'pipe', 'ipc'] })
    estado.filho = filho
    estado.inicio = Date.now()
    estado.conectado = false
    for (const saida of [filho.stdout, filho.stderr]) {
      saida?.setEncoding?.('utf8')
      let resto = ''
      saida?.on?.('data', (parte) => {
        const linhas = (resto + parte).split('\n')
        resto = linhas.pop()
        for (const l of linhas) if (l.trim()) log.log(`[ cliente ${nome} ] ${l}`)
      })
    }
    filho.on('message', (msg) => {
      const tipo = msg?.tipo
      if (tipo === 'codigo') void contar(c.pedido, { codigo: limpo(msg.codigo).slice(0, 16) })
      else if (tipo === 'conectado') { estado.conectado = true; estado.numero = limpo(msg.numero).replace(/\D/g, ''); estado.falhas = 0; void contar(c.pedido, { ok: true, numero: limpo(msg.numero) }) }
      else if (tipo === 'desconectado') { estado.conectado = false; estado.motivo = 'desconectado'; void contar(c.pedido, { ok: false, erro: 'desconectado' }) }
      else if (tipo === 'codigo_expirou') { estado.motivo = 'codigo_expirou'; void contar(c.pedido, { ok: false, erro: 'codigo_expirou' }) }
      else if (tipo === 'vencido') estado.motivo = 'vencido'
    })
    filho.on('exit', (code) => {
      estado.filho = null
      estado.conectado = false
      if (estado.parando || parado) return
      if (code === 0) {
        // Saída limpa: desconectado pelo celular, código não usado ou aluguel
        // vencido. Fica desligado até a cliente pedir código novo no site.
        estado.esperandoCodigo = true
        if (estado.motivo === 'desconectado' || estado.motivo === 'codigo_expirou') apagarSessao(c.pedido)
        return
      }
      // Caiu ou pediu reinício (75): liga de novo, esperando mais a cada queda seguida.
      estado.falhas = Date.now() - estado.inicio > 120_000 ? 0 : Math.min((estado.falhas || 0) + 1, 5)
      const espera = Math.min(5_000 * (2 ** estado.falhas), 60_000)
      estado.religar = setTimeout(() => { estado.religar = null; if (!estado.filho && !estado.parando && !parado) ligar(estado) }, espera)
      estado.religar.unref?.()
    })
    log.log(`[ AURORA CLIENTES ] Bot ligado: ${nome} (${limpo(c.bot_numero)})`)
  }

  function desligar(estado, apagar = false) {
    estado.parando = true
    if (estado.religar) clearTimeout(estado.religar)
    const filho = estado.filho
    const depois = () => { if (apagar) apagarSessao(estado.conf.pedido) }
    if (filho && filho.exitCode === null) {
      filho.once('exit', depois)
      filho.kill('SIGTERM')
    } else depois()
  }

  async function sincronizar() {
    if (rodando || parado) return
    rodando = true
    try {
      const data = await chamar('/api/bot/wa/clientes')
      logSite.voltou('lista', '[ AURORA CLIENTES ] Conexão com o site voltou.')
      const lista = Array.isArray(data?.clientes) ? data.clientes : []
      const vistos = new Set()
      for (const c of lista) {
        const pedido = limpo(c?.pedido)
        if (!pedido || !/^\d{8,15}$/.test(limpo(c.bot_numero))) continue
        vistos.add(pedido)
        const seq = Number(c.codigo_pedido) || 0
        let estado = bots.get(pedido)
        if (estado && estado.conf.bot_numero !== c.bot_numero) {
          // Trocou o número do bot: a sessão antiga não serve mais.
          desligar(estado, true)
          bots.delete(pedido)
          estado = null
        }
        if (!estado) {
          estado = { conf: c, seq, esperandoCodigo: false, falhas: 0 }
          bots.set(pedido, estado)
          // Sem sessão salva, só liga quando ela pedir o código no site.
          if (temSessao(pedido) || seq > 0) ligar(estado)
          else estado.esperandoCodigo = true
          continue
        }
        const marcaMudou = JSON.stringify(marcaDo(estado.conf)) !== JSON.stringify(marcaDo(c))
        const donoMudou = estado.conf.dono_numero !== c.dono_numero || tokenDo(estado.conf) !== tokenDo(c)
        estado.conf = c
        if (seq > estado.seq) {
          // Pediu código novo: liga de novo do zero (se já estava conectado,
          // o site nem oferece o botão).
          estado.seq = seq
          estado.esperandoCodigo = false
          estado.motivo = ''
          if (estado.filho) {
            if (!estado.conectado) {
              estado.parando = true
              estado.filho.once('exit', () => { estado.parando = false; apagarSessao(pedido); ligar(estado) })
              estado.filho.kill('SIGTERM')
            }
          } else { apagarSessao(pedido); ligar(estado) }
          continue
        }
        if (donoMudou && estado.filho) {
          // A dona e a key vão no ambiente do processo: precisa reiniciar.
          estado.parando = true
          estado.filho.once('exit', () => { estado.parando = false; ligar(estado) })
          estado.filho.kill('SIGTERM')
        } else if (marcaMudou && estado.filho?.connected) {
          estado.filho.send({ tipo: 'marca', marca: marcaDo(c) })
        }
      }
      for (const [pedido, estado] of bots) {
        if (vistos.has(pedido)) continue
        // Saiu da lista (venceu ou foi cancelado): desliga, guarda a pasta
        // para uma renovação com o mesmo número.
        desligar(estado)
        bots.delete(pedido)
        log.log(`[ AURORA CLIENTES ] Bot desligado: ${limpo(estado.conf.nome_bot) || estado.conf.bot_numero}`)
      }
    } catch (err) {
      const msg = String(err?.message || err)
      if (!/não configurada/i.test(msg)) logSite.falha('lista', '[ AURORA CLIENTES ] Lista do site indisponível:', msg)
    } finally { rodando = false }
  }

  return {
    bots,
    sincronizar,
    // Bots de cliente conectados agora, com o número de cada um (os avisos de
    // venda saem pelo que estiver no número fixo da casa, ver avisosVenda.js).
    canais: () => [...bots.values()].filter((e) => e.conectado && e.filho?.connected)
      .map((e) => ({ numero: e.numero || limpo(e.conf.bot_numero), filho: e.filho })),
    iniciar() {
      if (timer) return
      void sincronizar()
      timer = setInterval(() => { void sincronizar() }, intervaloMs)
      timer.unref?.()
    },
    parar() {
      parado = true
      if (timer) clearInterval(timer)
      timer = null
      for (const estado of bots.values()) desligar(estado)
    }
  }
}
