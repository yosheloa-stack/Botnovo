import { aluguelOk, getDonoAluguel, getIdiomaGrupo, getPersonalizacaoAluguel } from './banco.js'
import { trocarMarca } from './marca.js'
import { traduzir } from './traduzir.js'
import { marcaCliente, modoCliente } from './cliente.js'

const clean = (value = '') => String(value ?? '').trim()

// Marca do grupo alugado ativo: nome que o cliente deu ao bot (ou "Bot"),
// número de quem alugou e idioma do grupo. Fora de grupo alugado: null.
// No bot da cliente (modo cliente) a marca dela vale em toda conversa.
export function marcaDoGrupo(jid) {
  if (modoCliente) return marcaCliente()
  const gp = clean(jid)
  if (!gp.endsWith('@g.us') || !aluguelOk(gp)) return null
  return {
    nome: clean(getPersonalizacaoAluguel(gp)?.nome).slice(0, 48) || 'Bot',
    dono: getDonoAluguel(gp),
    idioma: getIdiomaGrupo(gp)
  }
}

// Idioma de quem recebe: o do grupo (escolhido no #idioma ou no site); no
// privado do bot da cliente, o que ela escolheu no site; senão português.
export function idiomaDoDestino(jid) {
  const alvo = clean(jid)
  if (alvo.endsWith('@g.us')) return getIdiomaGrupo(alvo)
  if (modoCliente && alvo && alvo !== 'status@broadcast') return marcaCliente()?.idioma || 'pt'
  return 'pt'
}

// Quote do selo "verificado" (vcard falso) pode carregar o nome Aurora. Um
// quote que é a mensagem real do usuário fica como está.
function trocarQuote(quote, marca) {
  if (!quote || typeof quote !== 'object') return quote
  if (quote?.key?.remoteJid !== 'status@broadcast') return quote
  return { ...quote, pushName: trocarMarca(quote.pushName, marca), message: trocarMarca(quote.message, marca) }
}

// Todo envio passa por aqui: comandos, menus, boas-vindas, X9, horários,
// aviso de ativação. Aqui o texto vai para o idioma do grupo e, em grupo
// alugado, nada da casa escapa por um caminho que não usa system.reply.
export function installMarcaAluguel(client) {
  const box = client?.message
  if (!box || typeof box.send !== 'function' || box.__auroraMarcaAluguel) return false
  const original = box.send.bind(box)
  box.send = async (jid, content, options = {}) => {
    // semMarca: só o aviso de renovação no privado da dona leva o link do site.
    if (options && typeof options === 'object' && options.semMarca) {
      const { semMarca, ...resto } = options
      return original(jid, content, resto)
    }
    let marca = null, idioma = 'pt'
    try { marca = marcaDoGrupo(jid) } catch {}
    try { idioma = idiomaDoDestino(jid) } catch {}
    const traduz = idioma === 'es' || idioma === 'en'
    if ((!marca && !traduz) || !content || !['object', 'string'].includes(typeof content) || content.type === 'revoke' || content.type === 'reaction') {
      return original(jid, content, options)
    }
    // Primeiro o idioma, depois a marca: a tradução mantém "Aurora" e o
    // trocarMarca põe o nome da cliente por cima.
    let conteudo = content
    let opcoes = options
    try { if (traduz) conteudo = traduzir(content, idioma) } catch (err) { console.error('[ AURORA IDIOMA ] Falha ao traduzir:', err?.message || err) }
    if (marca) conteudo = trocarMarca(conteudo, marca)
    if (options && typeof options === 'object') {
      const { quote, ...resto } = options
      opcoes = resto
      try { if (traduz) opcoes = traduzir(resto, idioma) } catch {}
      if (marca) opcoes = trocarMarca(opcoes, marca)
      if (quote) opcoes.quote = marca ? trocarQuote(quote, marca) : quote
      // O rodapé passa a citar o dono: a menção precisa ir junto para virar @.
      if (marca?.dono && JSON.stringify(conteudo).includes('@' + marca.dono)) {
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
