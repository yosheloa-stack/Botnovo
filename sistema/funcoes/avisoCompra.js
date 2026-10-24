// AVISO DE COMPRA NO WHATSAPP DO DONO.
//
// O site (Kasane) monta um aviso pronto para cada compra aprovada e deixa numa
// fila. Este passo puxa a fila com o mesmo token do aluguel, manda cada aviso
// para o número que o site informa (ajuste "WhatsApp que recebe as compras" no
// admin) e devolve ao site os que foram entregues. O que falhar continua na
// fila do site e é tentado de novo na próxima volta.

const clean = (value = '') => String(value ?? '').trim()
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Números do Brasil podem estar no WhatsApp com ou sem o nono dígito; a
// consulta ao servidor diz qual é o certo. O resultado fica guardado.
const jidPorNumero = new Map()
async function destino(client, numero) {
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

export function createAvisoCompra({ client, config, api }) {
  let pausaAte = 0, ultimoErro = ''
  return async function avisosDeCompra() {
    if (Date.now() < pausaAte) return
    let data
    try {
      data = await api(config, '/api/bot/avisos-compra/pendentes')
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
    const numero = clean(data?.numero).replace(/\D/g, '')
    const avisos = Array.isArray(data?.avisos) ? data.avisos : []
    if (!numero || !avisos.length) return
    const jid = await destino(client, numero)
    const entregues = []
    for (const aviso of avisos) {
      const id = clean(aviso?.id), texto = clean(aviso?.texto)
      if (!id || !texto) continue
      try {
        await client.message.send(jid, { type: 'text', text: texto })
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
