// AVISOS DE VENDA PELO LAUNCHER.
//
// O número fixo da casa (NUMERO_BOT_DA_CASA) pode estar conectado como bot da
// casa OU como bot de uma cliente (o dono alugou um bot pro próprio número).
// O bot de cliente não tem o token do site, então quem busca a fila é o
// launcher, que tem: ele escolhe o bot conectado no número que manda os
// avisos e pede pra ele mandar cada um pela conversa interna (IPC).
// Uma busca só, num lugar só: dois bots no mesmo número nunca mandam o mesmo
// aviso duas vezes.
import { randomUUID } from 'node:crypto'
import { createAvisoCompra, semNono } from '../funcoes/avisoCompra.js'
import { NUMERO_BOT_DA_CASA } from '../funcoes/config.js'
import { motivoDaFalha, pedirAoSite, respostaEstranha } from '../funcoes/rede.js'

// Pede a um processo do bot (casa ou cliente) pra mandar um texto.
// `cliente`: aviso de entrega pro cliente (o bot confere se o número tem WhatsApp).
export function enviarPorIpc(filho, para, texto, timeoutMs = 60_000, { cliente = false } = {}) {
  return new Promise((resolve, reject) => {
    const id = randomUUID()
    const fim = (erro) => {
      clearTimeout(prazo)
      filho.off?.('message', ouvir)
      filho.off?.('exit', saiu)
      if (erro) reject(erro)
      else resolve()
    }
    const ouvir = (m) => { if (m?.tipo === 'aviso_venda_ok' && m.id === id) fim(m.ok ? null : Object.assign(new Error(m.erro || 'o bot não conseguiu mandar'), { semWhatsapp: !!m.sem_whatsapp, recusado: m.recusado || null })) }
    const saiu = () => fim(new Error('o bot desligou antes de mandar'))
    const prazo = setTimeout(() => fim(new Error('o bot não respondeu em ' + Math.round(timeoutMs / 1000) + ' s')), timeoutMs)
    filho.on('message', ouvir)
    filho.once('exit', saiu)
    try { filho.send({ tipo: 'aviso_venda', id, para, texto, ...(cliente ? { cliente: true } : {}) }) } catch (err) { fim(err) }
  })
}

export function criarAvisosVenda({ site, canais, intervaloMs = 15_000, fetchImpl = fetch, enviarImpl = enviarPorIpc, log = console }) {
  let remetente = NUMERO_BOT_DA_CASA
  let atual = null
  let timer = null, rodando = false, avisouSemBot = false
  const criadorAvisado = new WeakMap()

  const api = async (config, caminho, { method = 'GET', body } = {}) => {
    let r
    try {
      r = await pedirAoSite(`${site.url}${caminho}`, {
        method, fetchImpl,
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

  const umaVolta = createAvisoCompra({
    config: {}, api,
    meuNumero: () => atual?.numero || '',
    enviar: (numero, texto) => enviarImpl(atual.filho, numero, texto),
    enviarCliente: (numero, texto) => enviarImpl(atual.filho, numero, texto, 60_000, { cliente: true }),
    // O dono pode trocar no admin o número que manda: vale na volta seguinte.
    aoSaberRemetente: (n) => { remetente = n },
    // Quem recebe os avisos é o criador: o bot do número fixo fica sabendo
    // (a Aurora só obedece ele). Manda de novo se o bot reiniciou.
    aoSaberDestino: (n) => {
      if (!atual?.filho || criadorAvisado.get(atual.filho) === n) return
      try { atual.filho.send({ tipo: 'aurora_criador', numero: n }); criadorAvisado.set(atual.filho, n) } catch {}
    }
  })

  async function volta() {
    if (rodando) return
    rodando = true
    try {
      atual = (canais() || []).find((c) => c?.filho && c.numero && semNono(c.numero) === semNono(remetente)) || null
      if (!atual) {
        if (!avisouSemBot) log.warn('[ AURORA AVISO DE COMPRA ] Nenhum bot conectado no número', remetente, '— os avisos de venda esperam na fila do site.')
        avisouSemBot = true
        return
      }
      if (avisouSemBot) log.log('[ AURORA AVISO DE COMPRA ] Bot no número', atual.numero, 'conectado: mandando os avisos de venda.')
      avisouSemBot = false
      await umaVolta()
    } catch (err) {
      log.error('[ AURORA AVISO DE COMPRA ] Erro:', err?.message || err)
    } finally { rodando = false }
  }

  return {
    volta,
    iniciar() {
      if (timer) return
      timer = setInterval(() => { void volta() }, intervaloMs)
      timer.unref?.()
      void volta()
    },
    parar() { if (timer) clearInterval(timer); timer = null }
  }
}
