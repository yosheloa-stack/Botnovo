// AUTOLIKE 300/600 NO BOT (pedido do Yosh, 12/11).
//
// O comando é só do dono do bot e nasce TRAVADO: o dono libera (R$ 25 por bot)
// nas configurações do bot, no site. Quem sabe se está liberado é o site
// (/v1/auto400/info); aqui fica só a última resposta, pra o menu e o comando
// responderem na hora. Travado, o comando diz "indisponível para este bot" e
// manda falar com o desenvolvedor.
import { autoSystem } from './auto.js'

const estado = { liberada: null, preco_cent: 2500, ids: 50, aviso: null, em: 0 }
const VALE_MS = 60_000

export const liberado = () => estado.liberada === true
export const travado = () => estado.liberada === false
export const precoTexto = () => `R$ ${(estado.preco_cent / 100).toFixed(2).replace('.', ',')}`

// Pergunta ao site (no máximo uma vez por minuto, a não ser que `forcar`).
export async function atualizar(config, { forcar = false } = {}) {
  if (!forcar && Date.now() - estado.em < VALE_MS && estado.liberada !== null) return estado
  const d = await autoSystem.auto600Info(config)
  // Falha de rede (site fora do ar) não muda o que já se sabia.
  if (d?.sucesso === true) {
    estado.liberada = d.liberada !== false
    if (Number(d.preco_cent) > 0) estado.preco_cent = Number(d.preco_cent)
    if (Number(d.ids) > 0) estado.ids = Number(d.ids)
    estado.aviso = d.aviso && d.aviso.id ? d.aviso : null
    estado.em = Date.now()
  } else if (d?.codigo === 'key_nao_liberada' || d?.codigo === 'bot_nao_liberado') {
    estado.liberada = false
    estado.aviso = null
    estado.em = Date.now()
  }
  return estado
}

export const avisoPendente = () => estado.aviso
export async function avisoVisto(config, id) {
  const d = await autoSystem.auto600AvisoVisto(config, id)
  if (d?.sucesso && estado.aviso?.id === id) estado.aviso = null
  return d
}
// O texto do aviso no idioma do bot (o site manda os três).
export const textoDoAviso = (aviso, idioma = 'pt') => String(aviso?.[idioma] || aviso?.pt || aviso?.texto || '')

// No menu: o comando aparece como indisponível enquanto o site diz que está travado.
export const rotuloMenu = () => (travado() ? ' (indisponível)' : ' (dono)')

export const MSG_INDISPONIVEL = '• 🔒 Comando indisponível para este bot. Fale com o desenvolvedor para liberar o AutoLike 300/600 (a liberação é feita nas configurações do bot, no site).'

// ── O QUE OS COMANDOS FAZEM (só o dono chega aqui: ownerOnly no comando) ──
const uidDe = (x) => String(x ?? '').replace(/\D/g, '')
async function liberadoOuAvisa(system) {
  try { await atualizar(system.config) } catch {}
  if (liberado()) return true
  await system.reply(MSG_INDISPONIVEL)
  return false
}
// A ficha de cada ID é a mesma do #listalike do VIP: Nick, ID, likes inicial, hoje e total.
const ficha = (x) => ({ uid: x.uid, nick: x.nick, likes_inicial: x.likes_inicial, likes_hoje: x.hoje?.likes, likes_entregues: x.total_recebido })
export async function listar(system) {
  if (!await liberadoOuAvisa(system)) return
  const d = await autoSystem.auto600List(system.config)
  if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffListError())))
  const lista = Array.isArray(d.ids) ? d.ids.map(ficha) : []
  const plano = d.plano?.max_ids ? `\n\n- 📊 IDs: ${lista.length} de ${d.plano.max_ids}` : ''
  await system.reply(system.messages.ffList(lista, '𝙰𝚄𝚃𝙾𝙻𝙸𝙺𝙴 𝟹𝟶𝟶/𝟼𝟶𝟶') + plano)
}
export async function adicionar(system, uid) {
  if (!await liberadoOuAvisa(system)) return
  const d = await autoSystem.auto600Add(system.config, uidDe(uid))
  if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffAutoError())))
  await system.reply(`- ⚡ \`𝙰𝚄𝚃𝙾𝙻𝙸𝙺𝙴 𝟹𝟶𝟶/𝟼𝟶𝟶\`\n\n- 🆔 UID: ${d.uid ?? uidDe(uid)}\n- 👤 Jogador: ${d.nick || '-'}\n- 💚 Likes por dia: de 300 a 600\n- 📊 IDs: ${d.plano?.ids_cadastrados ?? '-'} de ${d.plano?.max_ids ?? '-'}\n\n- ℹ️ Ele entra na fila de hoje. Use ${system.prefix}listalike600 para ver a ficha.`)
}
export async function remover(system, uid) {
  if (!await liberadoOuAvisa(system)) return
  const d = await autoSystem.auto600Remove(system.config, uidDe(uid))
  if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffListError())))
  await system.reply(system.messages.ffRemoved(d.uid ?? uidDe(uid)))
}
