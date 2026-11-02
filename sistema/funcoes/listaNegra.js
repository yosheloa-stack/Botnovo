// LISTA NEGRA. O dono cadastra números (#addblacklist) e, quando um deles
// entra em qualquer grupo onde o bot é ADM, o bot remove na hora: o pedido de
// remoção sai no mesmo instante em que o aviso de entrada chega, sem consultar
// nada antes, então a pessoa não tem tempo de mandar mensagem.
//
// Grupo com LID manda só o código da pessoa (@lid). Por isso, ao cadastrar um
// número o bot já pergunta ao WhatsApp o LID dele e guarda o par (lembrarLid);
// assim a entrada é reconhecida na hora, sem consulta.
import { naListaNegra, lembrarLid, numeroDoLid, getIdiomaGrupo } from './banco.js'
import { participantPnJid, participantLidJid, participantJid, jidNumber, variantesNumero } from './jid.js'
import { necessarios as necessariosAtuais } from './necessarios.js'
import { actionFailure } from './acao.js'

const ENTRADA = new Set(['add', 'invite', 'join', 'joined', 'participant_add'])
const PEDIDO = new Set(['created_membership_requests', 'membership_approval_request'])

// Dono, subdonos e o próprio bot nunca são removidos, nem por engano.
export function numerosProtegidos(config = {}, client = null) {
  let flags = {}
  try { flags = necessariosAtuais() || {} } catch {}
  const cred = client?.getCredentials?.() ?? null
  const eu = cred?.meJid ?? cred?.me?.jid ?? client?.user?.id ?? ''
  return new Set([
    config?.owner?.number,
    config?.connection?.number,
    jidNumber(eu),
    ...Array.from({ length: 6 }, (_, i) => flags?.[`numero_dono${i + 1}`])
  ].flatMap((n) => variantesNumero(n)))
}

// Número da pessoa a partir do que veio no evento: o telefone, ou o LID já
// conhecido. Quando os dois vêm juntos, guarda o par pra próxima vez.
export function numeroDoParticipante(p = {}) {
  if (typeof p === 'string') p = { jid: p }
  const pn = participantPnJid(p)
  const lid = participantLidJid(p)
  let n = pn ? jidNumber(pn) : ''
  if (n && lid) lembrarLid(lid, n)
  if (!n && lid) n = numeroDoLid(lid)
  return n
}

// Devolve { jid, numero, motivo } se a pessoa estiver na lista (e não for
// dono nem o bot); senão null.
export function participanteNaListaNegra(p, protegidos = null) {
  const numero = numeroDoParticipante(p)
  if (!numero) return null
  if (protegidos && protegidos.has(numero)) return null
  const item = naListaNegra(numero)
  if (!item) return null
  const jid = typeof p === 'string' ? p : participantJid(p)
  return jid ? { jid, numero, motivo: item.motivo } : null
}

function texto(groupJid, pt, es, en) {
  let lang = 'pt'
  try { lang = getIdiomaGrupo(groupJid) || 'pt' } catch {}
  return lang === 'es' ? es : lang === 'en' ? en : pt
}

async function avisar(client, groupJid, text, mentions = []) {
  try { await client.message.send(groupJid, { type: 'text', text }, { mentions, contextInfo: mentions.length ? { mentionedJid: mentions } : {} }) } catch {}
}

export function createListaNegraHandler({ client, config }) {
  return async (event) => {
    try {
      const groupJid = String(event?.groupJid || event?.chatJid || '')
      if (!groupJid.endsWith('@g.us')) return
      const action = String(event?.action || '').toLowerCase()
      const entrou = ENTRADA.has(action)
      const pediu = PEDIDO.has(action)
      if (!entrou && !pediu) return
      const lista = [
        ...(Array.isArray(event?.participants) ? event.participants : []),
        ...(pediu && Array.isArray(event?.membershipRequests) ? event.membershipRequests : [])
      ]
      if (!lista.length) return
      const protegidos = numerosProtegidos(config, client)
      const alvos = lista.map((p) => participanteNaListaNegra(p, protegidos)).filter(Boolean)
      if (!alvos.length) return
      const jids = [...new Set(alvos.map((a) => a.jid))]

      if (pediu) {
        // Grupo com aprovação: recusa o pedido de quem está na lista.
        try {
          await client.group.rejectMembershipRequests(groupJid, jids)
          console.log('[ AURORA LISTA NEGRA ] Pedido recusado:', alvos.map((a) => a.numero).join(', '), '| grupo:', groupJid)
        } catch (err) {
          console.warn('[ AURORA LISTA NEGRA ] Não deu pra recusar o pedido:', err?.message || err)
        }
        return
      }

      // O pedido de remoção sai aqui, antes de qualquer outra espera.
      let falhou = null
      try {
        falhou = actionFailure(await client.group.removeParticipants(groupJid, jids))
      } catch (err) {
        falhou = { status: err?.message || 'erro' }
      }
      const marcados = alvos.map((a) => `@${a.numero}`).join(', ')
      const mentions = alvos.map((a) => `${a.numero}@s.whatsapp.net`)
      if (falhou) {
        console.warn('[ AURORA LISTA NEGRA ] Não removeu', alvos.map((a) => a.numero).join(', '), '| grupo:', groupJid, '| motivo:', falhou?.status || falhou?.code || '?')
        await avisar(client, groupJid, texto(groupJid,
          `• ⚠️ ${marcados} está na *lista negra*, mas eu não consegui remover. Me deixa *ADM* do grupo pra eu banir na hora.`,
          `• ⚠️ ${marcados} está en la *lista negra*, pero no pude eliminarlo. Hazme *ADM* del grupo para expulsarlo al instante.`,
          `• ⚠️ ${marcados} is on the *blacklist*, but I couldn't remove them. Make me an *ADM* of the group so I can ban right away.`), mentions)
        return
      }
      console.log('[ AURORA LISTA NEGRA ] Removido na entrada:', alvos.map((a) => a.numero).join(', '), '| grupo:', groupJid)
      await avisar(client, groupJid, texto(groupJid,
        `• 🚫 ${marcados} está na *lista negra* e foi removido.`,
        `• 🚫 ${marcados} está en la *lista negra* y fue eliminado.`,
        `• 🚫 ${marcados} is on the *blacklist* and was removed.`), mentions)
    } catch (err) {
      console.error('[ AURORA LISTA NEGRA ] Erro no evento do grupo:', err?.message || err)
    }
  }
}

// Lê os números de um comando: "5521988887777 +55 21 98888-6666 motivo".
// Pedaços curtos seguidos (+55 21 98888-6666) viram um número só; o que não
// é número vira o motivo.
export function lerNumeros(args = []) {
  const numeros = []
  const resto = []
  let atual = ''
  const fechar = () => { if (atual.length >= 8) numeros.push(atual); else if (atual) resto.push(atual); atual = '' }
  for (const raw of args.flatMap((a) => String(a).split(','))) {
    const t = raw.trim()
    if (!t) continue
    if (/^@?\+?[\d().\-]+$/.test(t) && /\d/.test(t)) {
      const d = t.replace(/\D/g, '')
      if (d.length >= 8 && !atual) { numeros.push(d); continue }
      atual += d
      if (atual.length >= 10) fechar()
      continue
    }
    fechar()
    resto.push(t)
  }
  fechar()
  return { numeros: [...new Set(numeros)], motivo: resto.join(' ').trim() }
}
