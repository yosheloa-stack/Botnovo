// AVISO DE COMPRA NO WHATSAPP DO DONO.
//
// O site (Kasane) monta um aviso pronto para cada compra aprovada e deixa numa
// fila. Este passo puxa a fila com o mesmo token do aluguel, manda cada aviso
// para o número que o site informa (ajuste "WhatsApp que recebe as compras" no
// admin) e devolve ao site os que foram entregues. O que falhar continua na
// fila do site e é tentado de novo na próxima volta.

const clean = (value = '') => String(value ?? '').trim()
const digits = (value = '') => String(value ?? '').replace(/\D/g, '')
// Mesmo número com ou sem o nono dígito do Brasil.
const semNono = (n) => digits(n).replace(/^55(\d{2})9(\d{8})$/, '55$1$2')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Números do Brasil podem estar no WhatsApp com ou sem o nono dígito; a
// consulta ao servidor diz qual é o certo. O resultado fica guardado.
const jidPorNumero = new Map()
export async function destino(client, numero) {
  if (jidPorNumero.has(numero)) return jidPorNumero.get(numero)
  const candidatos = [numero]
  const br = numero.match(/^55(\d{2})(\d{8,9})$/)
  if (br) candidatos.push(br[2].length === 9 && br[2].startsWith('9') ? `55${br[1]}${br[2].slice(1)}` : `55${br[1]}9${br[2]}`)
  if (typeof client?.profile?.getLidsByPhoneNumbers === 'function') {
    for (const n of candidatos) {
      try {
        const [r] = await client.profile.getLidsByPhoneNumbers([n])
        if (r?.exists && clean(r.phoneJid)) {
          jidPorNumero.set(numero, clean(r.phoneJid))
          return clean(r.phoneJid)
        }
      } catch {}
    }
  }
  // Sem a consulta, manda para o número como veio, sem guardar.
  return `${numero}@s.whatsapp.net`
}

// O NÚMERO DO CLIENTE (avisos de entrega): igual ao `destino`, mas diz
// também se o WhatsApp confirmou a conta. A consulta NÃO é a palavra final:
// ela volta "não existe" também quando o WhatsApp limita as consultas
// (rate-overlimit) ou não ecoa o número, e por isso o aviso do Craft Land de
// uma cliente com número certo foi largado como "sem WhatsApp" (01/11). Sem
// confirmação, manda mesmo assim para o jeito que o WhatsApp guarda o número.
export async function destinoCliente(client, numero) {
  if (jidPorNumero.has(numero)) return { jid: jidPorNumero.get(numero), confirmado: true }
  const candidatos = candidatosBr(numero)
  if (typeof client?.profile?.getLidsByPhoneNumbers === 'function') {
    for (const n of candidatos) {
      try {
        const [r] = await client.profile.getLidsByPhoneNumbers([n])
        if (r?.exists && clean(r.phoneJid)) {
          jidPorNumero.set(numero, clean(r.phoneJid))
          if (clean(r.lidJid)) lidPorNumero.set(numero, clean(r.lidJid))
          return { jid: clean(r.phoneJid), confirmado: true }
        }
        if (clean(r?.lidJid) && !lidPorNumero.has(numero)) lidPorNumero.set(numero, clean(r.lidJid))
      } catch {}
    }
  }
  return { jid: `${candidatos[0]}@s.whatsapp.net`, confirmado: false }
}
// Celular do Brasil: o WhatsApp guarda COM o nono dígito os DDDs 11 a 28 e SEM
// ele os outros (31 em diante). O jeito provável vem primeiro.
function candidatosBr(numero) {
  const br = numero.match(/^55(\d{2})(\d{8,9})$/)
  if (!br) return [numero]
  const ddd = Number(br[1])
  const com = br[2].length === 9 ? br[2] : '9' + br[2]
  const sem = br[2].length === 9 && br[2].startsWith('9') ? br[2].slice(1) : br[2]
  if (!/^[6-9]/.test(sem)) return [numero]  // fixo: não tem nono dígito
  const lista = ddd <= 28 ? [com, sem] : [sem, com]
  return lista.map((x) => `55${br[1]}${x}`)
}
const lidPorNumero = new Map()
export const erroSemWhatsapp = () => Object.assign(new Error('esse número não tem WhatsApp'), { semWhatsapp: true })

// MANDA O AVISO PRO CLIENTE E CONFERE O ACK. O WhatsApp pode RECUSAR a
// mensagem sem dar erro no envio (ack com erro, ex.: 463 pra quem nunca falou
// com o bot): sem esta conferência o aviso contava como entregue e sumia.
// Recusou: tenta pelo endereço LID do contato e, sem a conta confirmada, pelo
// outro jeito do número (com/sem o nono dígito).
export async function mandarAoCliente(client, numero, texto, opcoes) {
  const { jid, confirmado } = await destinoCliente(client, numero)
  if (!confirmado) console.warn('[ AURORA AVISO AO CLIENTE ] O WhatsApp não confirmou a conta de', numero, '— mandando assim mesmo para', jid)
  const manda = (para) => client.message.send(para, { type: 'text', text: texto }, opcoes)
  const tentativas = [jid, lidPorNumero.get(numero), ...(confirmado ? [] : candidatosBr(numero).map((n) => `${n}@s.whatsapp.net`))]
  let r, erro
  for (const para of [...new Set(tentativas.filter(Boolean))]) {
    r = await manda(para); erro = r?.ack?.error
    if (!erro) return r
  }
  if (!confirmado) throw erroSemWhatsapp()
  throw Object.assign(new Error('o WhatsApp recusou a mensagem (erro ' + erro + ')'), { recusado: erro })
}

// `meuNumero` e `enviar` mudam conforme quem manda: o bot da casa usa o
// próprio WhatsApp; o launcher (avisosVenda.js) usa o bot de cliente que
// estiver conectado no número fixo. `enviar(numero, texto)` manda um aviso.
// `enviarCliente(numero, texto)` manda um aviso de entrega pro cliente e lança
// um erro com `semWhatsapp` quando o número não tem WhatsApp.
export function createAvisoCompra({ client, config, api, meuNumero, enviar, enviarCliente, aoSaberRemetente, aoSaberDestino, pausaClienteMs = 3000 }) {
  let pausaAte = 0, ultimoErro = ''
  let avisouOutro = false
  meuNumero = meuNumero || (() => digits(String(client.getCredentials?.()?.meJid || '').split(/[:@]/)[0]) || digits(config?.connection?.number))
  enviar = enviar || (async (numero, texto) => client.message.send(await destino(client, numero), { type: 'text', text: texto }))
  enviarCliente = enviarCliente || ((numero, texto) => mandarAoCliente(client, numero, texto))

  // AVISOS PRO CLIENTE (entregas e plano acabando). Cada aviso vem com o
  // número do cliente, já com o código do país (Brasil ou de fora). O site
  // só entrega esta fila para o bot no número fixo, igual à de compras.
  let pausaClienteAte = 0, ultimoErroCliente = ''
  async function avisosDeClientes() {
    if (Date.now() < pausaClienteAte) return
    let data
    try {
      data = await api(config, '/api/bot/avisos-cliente/pendentes?bot=' + encodeURIComponent(meuNumero()))
    } catch (err) {
      const message = clean(err?.message || err)
      pausaClienteAte = Date.now() + (/404|not found|não encontrad/i.test(message) ? 10 * 60_000 : 60_000)
      if (message !== ultimoErroCliente && !/não configurada/i.test(message)) console.warn('[ AURORA AVISO AO CLIENTE ] Fila indisponível:', message)
      ultimoErroCliente = message
      return
    }
    ultimoErroCliente = ''
    const avisos = Array.isArray(data?.avisos) ? data.avisos : []
    const entregues = [], semWhatsapp = [], recusados = []
    for (const aviso of avisos) {
      const id = clean(aviso?.id), texto = clean(aviso?.texto), numero = digits(aviso?.numero)
      if (!id || !texto || numero.length < 8) continue
      try {
        await enviarCliente(numero, texto)
        entregues.push(id)
        console.log('[ AURORA AVISO AO CLIENTE ] Enviado:', id)
      } catch (err) {
        if (err?.semWhatsapp) { semWhatsapp.push(id); console.warn('[ AURORA AVISO AO CLIENTE ] Sem WhatsApp:', id); continue }
        // recusa é deste número (os outros podem sair): anota e segue
        if (err?.recusado) { recusados.push({ id, erro: err.recusado }); console.warn('[ AURORA AVISO AO CLIENTE ] Recusado pelo WhatsApp:', id, '(erro ' + err.recusado + ')'); continue }
        console.error('[ AURORA AVISO AO CLIENTE ] Falha ao enviar', id, '-', err?.message || err)
        break
      }
      // devagar: muita mensagem seguida pra números diferentes é o que o
      // WhatsApp mais bloqueia
      await sleep(pausaClienteMs)
    }
    if (!entregues.length && !semWhatsapp.length && !recusados.length) return
    try {
      await api(config, '/api/bot/avisos-cliente/entregues', { method: 'POST', body: { ids: entregues, sem_whatsapp: semWhatsapp, ...(recusados.length ? { recusados } : {}) } })
    } catch (err) {
      console.error('[ AURORA AVISO AO CLIENTE ] Não confirmou no site:', err?.message || err)
    }
  }

  return async function avisosDeCompra() {
    // as compras primeiro (o dono), depois os clientes; uma falha não segura a outra
    try { await avisosDoDono() } finally { await avisosDeClientes() }
  }
  async function avisosDoDono() {
    if (Date.now() < pausaAte) return
    let data
    try {
      // Só o bot no número fixo manda os avisos: o site confere este número e
      // não entrega a fila para outro.
      data = await api(config, '/api/bot/avisos-compra/pendentes?bot=' + encodeURIComponent(meuNumero()))
    } catch (err) {
      const message = clean(err?.message || err)
      // Site ainda sem esta porta (404) ou token recusado: espera um pouco
      // em vez de repetir a cada 15 s. A mensagem só aparece uma vez.
      pausaAte = Date.now() + (/404|not found|não encontrad/i.test(message) ? 10 * 60_000 : 60_000)
      if (message !== ultimoErro && !/não configurada/i.test(message)) console.warn('[ AURORA AVISO DE COMPRA ] Fila indisponível:', message)
      ultimoErro = message
      return
    }
    ultimoErro = ''
    const remetente = digits(data?.remetente)
    if (remetente) aoSaberRemetente?.(remetente)
    if (remetente && semNono(remetente) !== semNono(meuNumero())) {
      if (!avisouOutro) console.warn('[ AURORA AVISO DE COMPRA ] Os avisos de venda saem só do número', remetente, '— este bot está no', meuNumero() || 'número desconhecido')
      avisouOutro = true
      return
    }
    avisouOutro = false
    const numero = clean(data?.numero).replace(/\D/g, '')
    const avisos = Array.isArray(data?.avisos) ? data.avisos : []
    // Quem recebe os avisos é o criador (a Aurora usa pra saber quem manda nela).
    if (numero) aoSaberDestino?.(numero)
    if (!numero || !avisos.length) return
    const entregues = []
    for (const aviso of avisos) {
      const id = clean(aviso?.id), texto = clean(aviso?.texto)
      if (!id || !texto) continue
      try {
        await enviar(numero, texto)
        entregues.push(id)
        console.log('[ AURORA AVISO DE COMPRA ] Enviado:', id)
      } catch (err) {
        console.error('[ AURORA AVISO DE COMPRA ] Falha ao enviar', id, '-', err?.message || err)
        break
      }
      await sleep(1500)
    }
    if (!entregues.length) return
    try {
      await api(config, '/api/bot/avisos-compra/entregues', { method: 'POST', body: { ids: entregues } })
    } catch (err) {
      // Se o site não souber que saiu, manda de novo na próxima volta: melhor
      // um aviso repetido do que uma compra sem aviso.
      console.error('[ AURORA AVISO DE COMPRA ] Não confirmou no site:', err?.message || err)
    }
  }
}
export { semNono }
