// CÓDIGO DE CONEXÃO (pareamento por número) do WhatsApp.
//
// Antes o bot pedia o código uma vez só e nunca mais: quando o WhatsApp
// avisava que o código tinha vencido (ou a conexão reabria e o código antigo
// morria), o bot continuava mostrando o MESMO código, que já não funcionava
// (Yosh, 07/11: "demorei, deu errado e fica aparecendo o mesmo código").
// Agora:
// - O WhatsApp pediu pra renovar (evento auth_pairing_required): pede outro.
// - O código antigo morreu (o Zapo apagou a sessão de pareamento ao reabrir a
//   conexão): o próximo giro do QR (auth_qr) pede outro.
// - O mesmo código não aparece duas vezes (vem pelo evento e pelo retorno).
// - Renova no máximo `maxRenovacoes` vezes, e o 429 do WhatsApp (pedidos
//   demais) faz esperar 15 min, depois 30, até 1 h.
export function criarPareamento({
  numero,                // async () => número do bot só com dígitos ('' = não sabe)
  pedirCodigo,           // async (numero) => código
  mostrar,               // (codigo, { novo }) => void
  codigoVivo = () => true, // o WhatsApp ainda aceita o código atual?
  semNumero = () => {},
  maxRenovacoes = 20,
  agora = Date.now,
  log = console
} = {}) {
  let codigo = ''
  let mostrouAlgum = false
  let renovacoes = 0
  let avisouLimite = false
  let emAndamento = null
  let pausaAte = 0
  let pausas = 0
  let avisouPausa = 0

  function registrar(c) {
    const novo = String(c ?? '').trim()
    if (!novo || novo === codigo) return false
    codigo = novo
    const info = { novo: mostrouAlgum }
    mostrouAlgum = true
    mostrar(novo, info)
    return true
  }

  // Trocar o código conta como renovação; passou do limite, para de pedir.
  function podeRenovar() {
    if (renovacoes >= maxRenovacoes) {
      if (!avisouLimite) {
        avisouLimite = true
        log.warn(`[ AURORA CONEXÃO ] O código de conexão já foi renovado ${renovacoes} vezes sem ninguém usar. Não peço outro agora.`)
      }
      return false
    }
    renovacoes++
    codigo = ''
    return true
  }

  async function executar() {
    if (agora() < pausaAte) {
      if (agora() - avisouPausa > 5 * 60_000) {
        avisouPausa = agora()
        log.warn(`[ AURORA CONEXÃO ] O WhatsApp limitou os pedidos de código de conexão. Tento de novo às ${new Date(pausaAte).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' })}.`)
      }
      return null
    }
    const n = String(await numero() || '').replace(/\D/g, '')
    if (!n) { semNumero(); return null }
    try {
      const c = await pedirCodigo(n)
      registrar(c)
      pausas = 0
      return c
    } catch (err) {
      const msg = String(err?.message ?? err)
      if (/429|rate-?overlimit/i.test(msg)) {
        const minutos = Math.min(60, 15 * 2 ** pausas)
        pausas++
        pausaAte = agora() + minutos * 60_000
        avisouPausa = agora()
        log.error(`[ ERRO ] O WhatsApp limitou os pedidos de código de conexão (429). Vou esperar ${minutos} min antes de pedir outro; não reinicie o app nesse meio tempo.`)
        return null
      }
      log.error('[ ERRO ] Não foi possível gerar o código de pareamento.', msg)
      return null
    }
  }

  function rodar() {
    emAndamento = executar().finally(() => { emAndamento = null })
    return emAndamento
  }

  return {
    registrar,
    atual: () => codigo,
    // Giro do QR / conexão pronta: pede só se ainda não há código valendo.
    pedir() {
      if (emAndamento) return emAndamento
      if (codigo) {
        if (codigoVivo()) return Promise.resolve(null)
        log.warn('[ AURORA CONEXÃO ] O código de conexão anterior venceu; pedindo um novo.')
        if (!podeRenovar()) return Promise.resolve(null)
      }
      return rodar()
    },
    // O WhatsApp avisou que o código precisa ser renovado.
    renovar() {
      if (emAndamento) return emAndamento
      if (codigo) {
        log.warn('[ AURORA CONEXÃO ] O WhatsApp pediu um código de conexão novo.')
        if (!podeRenovar()) return Promise.resolve(null)
      }
      return rodar()
    },
    // Conectou: zera tudo (uma queda depois começa do zero).
    conectou() { codigo = ''; renovacoes = 0; avisouLimite = false }
  }
}
