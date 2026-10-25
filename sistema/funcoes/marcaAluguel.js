import { aluguelOk, getDonoAluguel, getIdiomaGrupo, getPersonalizacaoAluguel } from './banco.js'
import { trocarMarca } from './marca.js'

const clean = (value = '') => String(value ?? '').trim()

// Marca do grupo alugado ativo: nome que o cliente deu ao bot (ou "Bot"),
// número de quem alugou e idioma do grupo. Fora de grupo alugado: null.
export function marcaDoGrupo(jid) {
  const gp = clean(jid)
  if (!gp.endsWith('@g.us') || !aluguelOk(gp)) return null
  return {
    nome: clean(getPersonalizacaoAluguel(gp)?.nome).slice(0, 48) || 'Bot',
    dono: getDonoAluguel(gp),
    idioma: getIdiomaGrupo(gp)
  }
}

// Quote do selo "verificado" (vcard falso) pode carregar o nome Aurora. Um
// quote que é a mensagem real do usuário fica como está.
function trocarQuote(quote, marca) {
  if (!quote || typeof quote !== 'object') return quote
  if (quote?.key?.remoteJid !== 'status@broadcast') return quote
  return { ...quote, pushName: trocarMarca(quote.pushName, marca), message: trocarMarca(quote.message, marca) }
}

// Todo envio para um grupo alugado passa por aqui: comandos, menus, boas-vindas,
// X9, horários, aviso de ativação. Assim nada da casa escapa por um caminho
// que não usa system.reply.
export function installMarcaAluguel(client) {
  const box = client?.message
  if (!box || typeof box.send !== 'function' || box.__auroraMarcaAluguel) return false
  const original = box.send.bind(box)
  box.send = async (jid, content, options = {}) => {
    let marca = null
    try { marca = marcaDoGrupo(jid) } catch {}
    if (!marca || !content || !['object', 'string'].includes(typeof content) || content.type === 'revoke' || content.type === 'reaction') {
      return original(jid, content, options)
    }
    const conteudo = trocarMarca(content, marca)
    let opcoes = options
    if (options && typeof options === 'object') {
      const { quote, ...resto } = options
      opcoes = trocarMarca(resto, marca)
      if (quote) opcoes.quote = trocarQuote(quote, marca)
      // O rodapé passa a citar o dono: a menção precisa ir junto para virar @.
      if (marca.dono && JSON.stringify(conteudo).includes('@' + marca.dono)) {
        const jidDono = marca.dono + '@s.whatsapp.net'
        const atuais = Array.isArray(opcoes.mentions) ? opcoes.mentions : []
        if (!atuais.includes(jidDono)) opcoes.mentions = [...atuais, jidDono]
      }
    }
    return original(jid, conteudo, opcoes)
  }
  Object.defineProperty(box, '__auroraMarcaAluguel', { value: true, enumerable: false, configurable: false })
  return true
}
