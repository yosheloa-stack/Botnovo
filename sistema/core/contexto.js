import { db, ensureGroupState, groupState, saveGroupState, saveState, userProfile, getDonoAluguel, aluguelOk, lembrarLid, numeroDoLid } from '../funcoes/banco.js'
import { erroParaCliente } from '../funcoes/marca.js'
import { modoCliente } from '../funcoes/cliente.js'
import {
digits,
variantesNumero,
mesmoNumero,
findParticipant,
isGroupJid,
participantLidJid,
participantPnJid,
resolveIdentity,
resolveIdentityPair,
targetIdentityFromMessage,
userJid
} from '../funcoes/jid.js'
import { verifiedSeal } from '../funcoes/meta.js'
import { applyCanalToContent, bindCanalConfig, canalSendOptions } from '../funcoes/canal.js'
import { necessarios as liveNecessarios, saveNecessarios } from '../funcoes/necessarios.js'
import messages from '../funcoes/global.js'
import fs from 'node:fs/promises'

function unwrapOne(message) {
if (!message) return message
return message?.ephemeralMessage?.message
?? message?.viewOnceMessage?.message
?? message?.viewOnceMessageV2?.message
?? message?.viewOnceMessageV2Extension?.message
?? message?.deviceSentMessage?.message
?? message?.groupMentionedMessage?.message
?? message?.botInvokeMessage?.message
?? message?.documentWithCaptionMessage?.message
?? message
}

function unwrap(message) {
let current = message
for (let i = 0; i < 8; i++) {
const next = unwrapOne(current)
if (!next || next === current) break
current = next
}
return current
}

export function extractText(message) {
const m = unwrap(message)
if (!m) return ''

let interactive = ''
try {
interactive = JSON.parse(m?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id || ''
} catch {}

return (
m?.conversation ??
m?.extendedTextMessage?.text ??
m?.imageMessage?.caption ??
m?.videoMessage?.caption ??
m?.documentMessage?.caption ??
m?.buttonsResponseMessage?.selectedButtonId ??
m?.listResponseMessage?.singleSelectReply?.selectedRowId ??
m?.templateButtonReplyMessage?.selectedId ??
interactive ??
''
)
}

export function messageKind(message) {
const m = unwrap(message)
if (!m) return 'unknown'
if (m.imageMessage) return 'image'
if (m.videoMessage) return 'video'
if (m.audioMessage) return 'audio'
if (m.stickerMessage) return 'sticker'
if (m.documentMessage || m.documentWithCaptionMessage) return 'document'
if (m.statusMentionMessage || m.groupStatusMentionMessage) return 'status'
if (m.conversation || m.extendedTextMessage) return 'text'
return 'other'
}

function isAdminParticipant(p) {
return Boolean(p?.isAdmin || p?.isSuperAdmin || p?.admin === 'admin' || p?.admin === 'superadmin')
}

function typedContent(content) {
if (typeof content === 'string') return { type: 'text', text: content }
return content
}

function cleanOptions(options = {}) {
const out = { ...options }
delete out.noQuote
return out
}

function unique(values = []) {
return [...new Set(values.filter(Boolean))]
}

// Cache de metadados: não consulta o WhatsApp em cada mensagem.
const GROUP_METADATA_TTL = 60_000
const GROUP_METADATA_COOLDOWN = 120_000
const groupMetadataCache = new Map()
async function cachedGroupMetadata(client, jid) {
  const now = Date.now()
  const cached = groupMetadataCache.get(jid)
  if (cached && now < cached.expires) return cached.data
  try {
    // Metadados não podem travar o processamento de /like e /menu.
    // A consulta subjacente pode continuar, mas não bloqueia o handler.
    const data = await Promise.race([
      client.group.queryGroupMetadata(jid),
      new Promise((_, reject) => setTimeout(() => reject(new Error('group metadata timeout 5s')), 5_000))
    ])
    groupMetadataCache.set(jid, { data, expires: Date.now() + GROUP_METADATA_TTL })
    for (const p of data?.participants || []) {
      const lid = participantLidJid(p), pn = participantPnJid(p)
      if (lid && pn && !String(pn).endsWith('@lid')) lembrarLid(lid, pn)
    }
    if (groupMetadataCache.size > 1000) {
      for (const [key, value] of groupMetadataCache) {
        if (value.expires < Date.now()) groupMetadataCache.delete(key)
      }
    }
    return data
  } catch (err) {
    const limited = /(?:429|rate.overlimit|rate.limit|too many requests)/i.test(String(err?.message || err || ''))
    groupMetadataCache.set(jid, { data: cached?.data || null, expires: Date.now() + (limited ? GROUP_METADATA_COOLDOWN : 15_000) })
    return cached?.data || null
  }
}


let lidsDosDonosAte = 0
async function conhecerLidsDosDonos(client, numeros) {
  if (Date.now() < lidsDosDonosAte || typeof client?.profile?.getLidsByPhoneNumbers !== 'function') return
  lidsDosDonosAte = Date.now() + 60 * 60_000
  const lista = [...new Set(numeros.filter(Boolean))].slice(0, 20)
  try {
    const r = await Promise.race([
      client.profile.getLidsByPhoneNumbers(lista),
      new Promise((_, nao) => setTimeout(() => nao(new Error('demorou')), 5_000))
    ])
    for (const x of r || []) if (x?.exists && x.lidJid) lembrarLid(x.lidJid, x.phoneJid || x.queriedJid)
  } catch {}
}

export async function makeSystem({ client, event, config, registry, necessarios = liveNecessarios() }) {
// Re-sincroniza o canal em TODA mensagem. Isso elimina o mesmo tipo de
// snapshot antigo que já causou o bug do #verificado.
bindCanalConfig(config)
const from = [event?.key?.remoteJid, event?.key?.remoteJidAlt].find(isGroupJid) || event?.key?.remoteJid || event?.key?.remoteJidAlt || ''
const sender = event?.key?.participant || event?.key?.participantAlt || event?.participant || event?.participantAlt || from
// No privado não tem participant: o número (ou o LID) alternativo vem em remoteJidAlt.
const senderAlt = event?.key?.participantAlt || event?.participantAlt || event?.key?.participant || (isGroupJid(from) ? '' : event?.key?.remoteJidAlt || '')
const text = extractText(event?.message)
const prefix = String(config.prefix || '!')
// Cada bot aceita exclusivamente seu prefixo configurado.
const raw = text.startsWith(prefix) ? text.slice(prefix.length).trim() : ''
const parts = raw ? raw.split(/\s+/) : []
const commandRaw = (parts.shift() ?? '').toLowerCase()
const command = commandRaw === 'menú' ? 'menu' : commandRaw
const args = parts
const q = args.join(' ')
const isGroup = isGroupJid(from)
const ownerNumbers = [
config.owner?.number,
...Array.from({ length: 6 }, (_, i) => necessarios?.[`numero_dono${i + 1}`])
].flatMap((n) => variantesNumero(n))
let metadata = null
let isAdmin = false
let isBotAdmin = false

if (isGroup) {
try {
metadata = await cachedGroupMetadata(client, from)
} catch {}
}

const participants = metadata?.participants ?? []
let senderInfo = resolveIdentityPair(sender, senderAlt, participants)
if (senderInfo.lidJid && senderInfo.number) lembrarLid(senderInfo.lidJid, senderInfo.number)
if (!senderInfo.number && senderInfo.lidJid) {
  // Só veio o LID: usa o número já guardado. Sem ele, pergunta ao WhatsApp
  // o LID dos donos (uma vez por hora) — senão o dono vira "não é dono".
  if (!numeroDoLid(senderInfo.lidJid)) await conhecerLidsDosDonos(client, ownerNumbers)
  const n = numeroDoLid(senderInfo.lidJid)
  if (n) senderInfo = { ...senderInfo, number: n, pnJid: `${n}@s.whatsapp.net`, displayJid: `${n}@s.whatsapp.net`, display: `@${n}` }
}
const senderNumber = senderInfo.number
const senderKey = senderNumber || senderInfo.lidJid || senderInfo.jid

if (isGroup && participants.length) {
const senderP = findParticipant(participants, sender) || findParticipant(participants, senderAlt)
isAdmin = isAdminParticipant(senderP)

const credentials = client.getCredentials?.() ?? null
const meJid = credentials?.meJid ?? credentials?.me?.jid ?? ''
const meLid = credentials?.meLid ?? credentials?.lidJid ?? ''
const botP = findParticipant(participants, meJid)
|| findParticipant(participants, meLid)
|| findParticipant(participants, digits(config.connection?.number))
isBotAdmin = isAdminParticipant(botP)
}

if (isGroup) await ensureGroupState(from, { nome: metadata?.subject || 'Grupo' })

// Quem alugou pelo site manda como ADM e VIP, mas só no grupo alugado.
const isDonoAluguel = Boolean(isGroup && senderNumber && mesmoNumero(getDonoAluguel(from), senderNumber) && aluguelOk(from))
if (isDonoAluguel) isAdmin = true

const state = db()
const currentProfile = userProfile(senderKey, {
name: event?.pushName ?? event?.notifyName ?? 'Usuário',
number: senderNumber,
jid: senderInfo?.pnJid || senderInfo?.lidJid || senderInfo?.jid || sender
})
const getTargetInfo = () => targetIdentityFromMessage(event, args, participants)

const system = {
client,
event,
msg: event?.message,
kind: messageKind(event?.message),
from,
sender,
senderAlt,
senderInfo,
senderNumber,
senderKey,
pushName: event?.pushName ?? event?.notifyName ?? 'Usuário',
text,
command,
args,
q,
prefix,
config,
necessarios: liveNecessarios(),
messages,
registry,
plugins: registry.plugins,
commands: registry.commands,
isGroup,
isOwner: Boolean(senderNumber && ownerNumbers.includes(senderNumber)),
isAdmin,
isBotAdmin,
isDonoAluguel,
isVip: Boolean(isDonoAluguel || (senderNumber && state.vip.includes(senderNumber))),
isPremium: Boolean(isDonoAluguel || (senderNumber && state.vip.includes(senderNumber))), // alias legado
metadata,
db: state,
profile: currentProfile,
userProfile,
group: isGroup ? groupState(from) : null,
save: saveState,
saveGroup: () => isGroup ? saveGroupState(from) : Promise.resolve(),
saveNecessarios,
userJid,
resolveIdentity: (value) => resolveIdentity(value, participants),
targetInfo: getTargetInfo,
target: () => getTargetInfo().jid,
targetNumber: () => getTargetInfo().number
}

const normalizeMentions = (values = []) => unique(values.map((value) => {
const info = resolveIdentity(value, participants)
// Para menção real, prioriza o PN (@s.whatsapp.net) quando disponível.
// O JID/LID primário continua sendo usado nas ações de grupo; aqui é apenas menção.
return info.pnJid || info.jid || value
}))

const verifiedOn = () => liveNecessarios()?.verificado === true
const currentSeal = () => verifiedOn()
? verifiedSeal(system.pushName || system.senderNumber || 'Usuário')
: event

// Mesmo modelo do Tokito V10: existe um único "selo" para a resposta inteira.
// Texto/mídia tipada usam options.quote; Proto raw recebe o mesmo quote no
// contextInfo exatamente como generateWAMessageFromContent faria.
Object.defineProperty(system, 'selo', {
enumerable: true,
get: currentSeal
})

const sendOptions = (jid, options = {}) => {
const out = canalSendOptions(cleanOptions(options))
const noQuote = options.noQuote === true || options.quote === false
if (options.quote === false) delete out.quote

const mentions = Array.isArray(out.mentions) ? normalizeMentions(out.mentions) : []
if (mentions.length) out.mentions = mentions
else delete out.mentions

const existingContext = out.contextInfo && typeof out.contextInfo === 'object' ? { ...out.contextInfo } : {}
if (Array.isArray(existingContext.mentionedJid)) {
const normalizedContextMentions = normalizeMentions(existingContext.mentionedJid)
if (normalizedContextMentions.length) existingContext.mentionedJid = normalizedContextMentions
else delete existingContext.mentionedJid
}
if (mentions.length) existingContext.mentionedJid = mentions
if (Object.keys(existingContext).length) out.contextInfo = existingContext
else delete out.contextInfo

if (noQuote) {
delete out.quote
return out
}

// Verificado ON: o SeloMeta ganha de qualquer quote passado pelo comando.
// Verificado OFF: responde normalmente à mensagem original no mesmo chat.
if (verifiedOn()) {
out.quote = currentSeal()
} else if (jid === from) {
out.quote = options.quote || event
} else if (!options.quote) {
delete out.quote
}

return out
}

const sendVisible = async (content, jid = from, options = {}) => {
// A marca do cliente nos grupos alugados é trocada no envio (marcaAluguel.js).
let payload = typedContent(content)
const finalOptions = sendOptions(jid, options)

// No Termux, o pipeline de mídia do Zapo pode tentar reabrir/stagear um caminho
// temporário depois que o comando já limpou o arquivo. Para mídia local pequena
// do Aurora, carregamos o arquivo como Uint8Array antes do envio. O Zapo aceita
// Uint8Array diretamente e usa o caminho sem arquivo temporário na etapa de upload.
if (payload && typeof payload === 'object' && typeof payload.media === 'string' && !/^https?:\/\//i.test(payload.media)) {
try {
const bytes = await fs.readFile(payload.media)
payload = { ...payload, media: new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength) }
} catch (err) {
throw new Error(`Não foi possível abrir a mídia local: ${payload.media} (${err?.message || err})`)
}
}

// Menus/listas/quick replies são Proto/raw e precisam receber o canal no
// próprio nó da mensagem. Aplicar aqui garante que TODO system.send/system.reply
// use o canal mesmo se client.message for exposto pela Zapo por outro caminho.
payload = applyCanalToContent(payload)

// Mesmo princípio do Tokito V10: existe UMA fonte de quote para qualquer saída.
return client.message.send(jid, payload, finalOptions)
}

system.reply = (content, options = {}) => sendVisible(content, from, options)
// Grupo alugado visto por quem não é o dono do bot (o próprio cliente e os
// membros do grupo dele).
// No bot da cliente (modo cliente) vale sempre: a key da API é da casa.
system.noAluguel = Boolean(modoCliente || (isGroup && !system.isOwner && aluguelOk(from)))
// Erro da API: no grupo alugado não pode citar site nem hospedagem.
system.erroApi = (erro, padrao) => modoCliente || (isGroup && aluguelOk(from)) ? erroParaCliente(erro, padrao) : (erro || padrao)
system.send = (content, jid = from, options = {}) => sendVisible(content, jid, options)
system.revoke = () => client.message.send(from, { type: 'revoke', target: event })

return system
}
