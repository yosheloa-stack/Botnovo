import { db, ensureGroupState, groupState, saveGroupState, saveState, userProfile, getDonoAluguel, aluguelOk, getPersonalizacaoAluguel } from '../funcoes/banco.js'
import {
digits,
findParticipant,
isGroupJid,
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
    const data = await client.group.queryGroupMetadata(jid)
    groupMetadataCache.set(jid, { data, expires: Date.now() + GROUP_METADATA_TTL })
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


export async function makeSystem({ client, event, config, registry, necessarios = {} }) {
// Re-sincroniza o canal em TODA mensagem. Isso elimina o mesmo tipo de
// snapshot antigo que já causou o bug do #verificado.
bindCanalConfig(config)
const from = event?.key?.remoteJid ?? ''
const sender = event?.key?.participant ?? event?.participant ?? from
const senderAlt = event?.key?.participantAlt ?? event?.participantAlt ?? event?.key?.remoteJidAlt ?? ''
const text = extractText(event?.message)
const prefix = String(config.prefix || '!')
// Aceita o prefixo escolhido pelo dono e o padrão / usado pelos clientes.
const raw = text.startsWith(prefix) ? text.slice(prefix.length).trim() : text.startsWith('/') ? text.slice(1).trim() : ''
const parts = raw ? raw.split(/\s+/) : []
const commandRaw = (parts.shift() ?? '').toLowerCase()
const command = commandRaw === 'menú' ? 'menu' : commandRaw
const args = parts
const q = args.join(' ')
const isGroup = isGroupJid(from)
const ownerNumbers = [
digits(config.owner?.number),
...Array.from({ length: 6 }, (_, i) => digits(necessarios?.[`numero_dono${i + 1}`]))
].filter(Boolean)
let metadata = null
let isAdmin = false
let isBotAdmin = false

if (isGroup) {
try {
metadata = await cachedGroupMetadata(client, from)
} catch {}
}

const participants = metadata?.participants ?? []
const senderInfo = resolveIdentityPair(sender, senderAlt, participants)
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
const isDonoAluguel = Boolean(isGroup && senderNumber && getDonoAluguel(from) === senderNumber && aluguelOk(from))
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

// Marca exclusivamente mensagens enviadas no grupo alugado. Nunca altera dados globais.
const branding = () => {
if (!system.isGroup || !aluguelOk(from)) return ''
return String(getPersonalizacaoAluguel(from)?.nome || '').trim().slice(0, 48)
}
const substituirMarca = (value, nome, depth = 0) => {
if (!nome || depth > 12) return value
if (typeof value === 'string') return value.replace(/aurora(?:[\\s\\u00a0]+system)?/gi, nome).replace(/𝐀𝐔𝐑𝐎𝐑𝐀(?:\\s+𝐒𝐘𝐒𝐓𝐄𝐌)?/g, nome).replace(/𝑨𝑼𝑹𝑶𝑹𝑨/g, nome).replace(/ᴀᴜʀᴏʀᴀ(?:\\s+sʏsᴛᴇᴍ)?/gi, nome).replace(/ᴬᵁᴿᴼᴿᴬ/g, nome)
if (Array.isArray(value)) return value.map(item => substituirMarca(item, nome, depth + 1))
if (!value || typeof value !== 'object' || Buffer.isBuffer(value) || value instanceof Uint8Array) return value
const result = { ...value }
for (const key of ['text','caption','footer','title','description','contentText','footerText','selectedDisplayText','messageParamsJson']) {
if (typeof result[key] === 'string' && key !== 'messageParamsJson') result[key] = substituirMarca(result[key], nome, depth + 1)
}
for (const key of ['interactiveMessage','body','header','nativeFlowMessage','buttons','sections','rows','templateMessage','hydratedTemplate','extendedTextMessage','conversation','imageMessage','videoMessage']) {
if (result[key] && typeof result[key] === 'object') result[key] = substituirMarca(result[key], nome, depth + 1)
}
return result
}

const sendVisible = async (content, jid = from, options = {}) => {
let payload = typedContent(substituirMarca(content, jid === from ? branding() : ''))
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
system.send = (content, jid = from, options = {}) => sendVisible(content, jid, options)
system.revoke = () => client.message.send(from, { type: 'revoke', target: event })

return system
}
