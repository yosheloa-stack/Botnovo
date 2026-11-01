// #configurarff: limite de IDs por pessoa/dia no grupo, só deste bot.
//
// Cada bot (o da casa e cada bot de cliente) tem o próprio banco, então o
// limite já fica guardado bot por bot e grupo por grupo. O problema era quem
// podia mudar: num grupo com vários bots, todos recebem o mesmo
// "#configurarff 3" e qualquer ADM do grupo mudava o limite em TODOS de uma
// vez. Agora cada bot só muda pelo dono dele (dona, subdono, ou quem alugou o
// grupo no bot da casa) ou quando o ADM marca/responde aquele bot.
import { getLimiteFF, setLimiteFF } from './banco.js'

const T = {
  soNoGrupo: ['⚠️ Use este comando dentro do grupo.', '⚠️ Usa este comando dentro del grupo.', '⚠️ Use this command in a group.'],
  semPermissao: [
    (b) => `🔒 Somente o dono do bot *${b}* ou um administrador deste grupo pode configurar o Free Fire.`,
    (b) => `🔒 Solo el dueño del bot *${b}* o un administrador puede configurar Free Fire.`,
    (b) => `🔒 Only the owner of the bot *${b}* or a group admin can configure Free Fire.`
  ],
  marque: [
    (b, p, n) => `🔒 O limite do bot *${b}* é do dono dele. Se você é ADM e quer mudar só este bot, marque o bot junto: *${p}configurarff ${n} @${b}* (ou responda uma mensagem dele).`,
    (b, p, n) => `🔒 El límite del bot *${b}* es de su dueño. Si eres ADM y quieres cambiar solo este bot, menciónalo: *${p}configurarff ${n} @${b}* (o responde un mensaje suyo).`,
    (b, p, n) => `🔒 The limit of the bot *${b}* belongs to its owner. If you are an admin and want to change only this bot, tag it: *${p}configurarff ${n} @${b}* (or reply to one of its messages).`
  ],
  invalido: ['Informe um limite de 1 a 100 IDs por dia, ou 0 para sem limite.', 'Indica un límite de 1 a 100 IDs por día, o 0 para sin límite.', 'Enter a limit from 1 to 100 IDs per day, or 0 for no limit.'],
  atual: [
    (b, p, a) => `🎮 *Configurações Free Fire* (bot *${b}*)\n\nLimite atual: *${a ? a + ' IDs por usuário/dia' : 'sem limite'}*\n\nPara alterar: *${p}configurarff 3*\nSem limite: *${p}configurarff 0*\n\nVale somente para este bot, neste grupo.`,
    (b, p, a) => `🎮 *Ajustes de Free Fire* (bot *${b}*)\n\nLímite actual: *${a ? a + ' IDs por usuario/día' : 'sin límite'}*\n\nPara cambiar: *${p}configurarff 3*\nSin límite: *${p}configurarff 0*\n\nVale solo para este bot, en este grupo.`,
    (b, p, a) => `🎮 *Free Fire settings* (bot *${b}*)\n\nCurrent limit: *${a ? a + ' IDs per user/day' : 'no limit'}*\n\nTo change: *${p}configurarff 3*\nNo limit: *${p}configurarff 0*\n\nOnly for this bot, in this group.`
  ],
  feito: [
    (b, n) => n ? `✅ Limite de Free Fire do bot *${b}*: *${n} IDs por usuário/dia*.\nSomente neste bot, neste grupo.` : `✅ Bot *${b}*: Free Fire *sem limite* de IDs neste grupo.`,
    (b, n) => n ? `✅ Límite de Free Fire del bot *${b}*: *${n} IDs por usuario/día*.\nSolo en este bot, en este grupo.` : `✅ Bot *${b}*: Free Fire *sin límite* de IDs en este grupo.`,
    (b, n) => n ? `✅ Free Fire limit for the bot *${b}*: *${n} IDs per user/day*.\nOnly this bot, in this group.` : `✅ Bot *${b}*: Free Fire with *no limit* of IDs in this group.`
  ]
}

const pos = (idioma) => (idioma === 'es' ? 1 : idioma === 'en' ? 2 : 0)

// Devolve o texto da resposta. mirouEsteBot = a mensagem marcou ou respondeu
// este bot (aí o ADM do grupo está falando com ele, não com todos).
export function configurarFF(system, { mirouEsteBot = false, nomeBot = 'Bot', idioma = 'pt' } = {}) {
  const i = pos(idioma)
  const b = String(nomeBot || 'Bot')
  if (!system.isGroup) return T.soNoGrupo[i]
  const donoDoBot = Boolean(system.isOwner || system.isDonoAluguel)
  if (!donoDoBot && !system.isAdmin) return T.semPermissao[i](b)
  // A menção (@bot) pode vir antes ou depois do número.
  const argumento = (system.args || []).find((a) => !String(a).startsWith('@'))
  if (argumento === undefined) return T.atual[i](b, system.prefix, getLimiteFF(system.from))
  const n = Number(argumento)
  if (!Number.isInteger(n) || n < 0 || n > 100) return T.invalido[i]
  if (!donoDoBot && !mirouEsteBot) return T.marque[i](b, system.prefix, n)
  setLimiteFF(system.from, n)
  return T.feito[i](b, n)
}
