import { canalSendOptions } from './canal.js'
const META_NUMBER = '13135550002'
const META_JID = `${META_NUMBER}@s.whatsapp.net`

const safeName = (value = '') => String(value || 'Usuário').replace(/[\r\n]+/g, ' ').trim() || 'Usuário'

/**
 * Mesmo SeloMeta do Tokito V10.
 * Para texto/mídia tipada ele vai em options.quote da Zapo.
 */
export function verifiedSeal(pushName = 'Usuário') {
const name = safeName(pushName)
const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${name};;;\nFN:${name}\nitem1.TEL;waid=${META_NUMBER}:${META_NUMBER}\nitem1.X-ABLabel:Verificado\nEND:VCARD`

return {
key: {
participant: META_JID,
remoteJid: 'status@broadcast',
fromMe: false,
id: 'AURORA-VERIFICADO'
},
participant: META_JID,
pushName: name,
messageTimestamp: Math.floor(Date.now() / 1000),
message: {
contactMessage: {
displayName: name,
vcard,
contextInfo: {
forwardingScore: 1,
isForwarded: true
}
}
}
}
}

/**
 * O gerador do Tokito/Baileys NÃO copia o contextInfo interno da mensagem
 * citada. Ele reduz a quotedMessage ao tipo real (contactMessage, neste caso)
 * e só depois coloca stanzaId/participant/remoteJid no ContextInfo da resposta.
 *
 * Essa diferença era o que faltava no Aurora: estávamos jogando o SeloMeta
 * inteiro dentro de quotedMessage, incluindo um contextInfo aninhado que não
 * existe no payload gerado pelo Tokito.
 */
function quotedMessageFromSeal(pushName = 'Usuário') {
const seal = verifiedSeal(pushName)
const contact = seal?.message?.contactMessage || {}

return {
contactMessage: {
displayName: contact.displayName,
vcard: contact.vcard
}
}
}

/**
 * ContextInfo equivalente ao que generateWAMessageFromContent(..., { quoted })
 * cria no Tokito V10.
 */
export function verifiedQuoteContext(targetJid = '', pushName = 'Usuário', extra = {}) {
const seal = verifiedSeal(pushName)
const base = extra && typeof extra === 'object' && !Array.isArray(extra) ? { ...extra } : {}

// Campos de quote sempre ganham de qualquer contexto antigo.
base.participant = seal.key.participant
base.stanzaId = seal.key.id
base.quotedMessage = quotedMessageFromSeal(pushName)

// Igual ao gerador do Tokito/Baileys: só informa remoteJid quando a origem
// fake do quote é diferente do chat de destino.
if (String(targetJid || '') !== String(seal.key.remoteJid || '')) {
base.remoteJid = seal.key.remoteJid
} else {
delete base.remoteJid
}

return base
}

function cloneWithContext(node, contextInfo) {
if (!node || typeof node !== 'object' || Array.isArray(node)) return node
return { ...node, contextInfo }
}

/**
 * Aplica o quote em mensagens Proto raw no MESMO nível em que o WhatsApp
 * espera o contextInfo. O foco principal é interactiveMessage (quick reply,
 * menu list e demais native-flow), mas deixamos suporte aos wrappers mais
 * comuns para não perder o selo caso algum helper os use depois.
 */
export function applyVerifiedQuoteToRaw(content, targetJid = '', pushName = 'Usuário', extraContext = {}) {
if (!content || typeof content !== 'object' || Array.isArray(content)) return content

const applyToMessage = (message) => {
if (!message || typeof message !== 'object' || Array.isArray(message)) return message

// Wrappers: entra até a mensagem real sem alterar o resto do envelope.
for (const wrapper of [
'ephemeralMessage',
'viewOnceMessage',
'viewOnceMessageV2',
'viewOnceMessageV2Extension',
'documentWithCaptionMessage',
'deviceSentMessage'
]) {
const inner = message?.[wrapper]?.message
if (inner && typeof inner === 'object') {
return {
...message,
[wrapper]: {
...message[wrapper],
message: applyToMessage(inner)
}
}
}
}

const keys = [
'interactiveMessage',
'buttonsMessage',
'listMessage',
'imageMessage',
'videoMessage',
'audioMessage',
'documentMessage',
'extendedTextMessage',
'contactMessage',
'contactsArrayMessage',
'locationMessage',
'liveLocationMessage',
'orderMessage',
'productMessage'
]

for (const key of keys) {
const node = message[key]
if (!node || typeof node !== 'object') continue
const old = node.contextInfo && typeof node.contextInfo === 'object' ? node.contextInfo : {}
const context = verifiedQuoteContext(targetJid, pushName, {
...old,
...(extraContext && typeof extraContext === 'object' ? extraContext : {})
})
return { ...message, [key]: cloneWithContext(node, context) }
}

return message
}

return applyToMessage(content)
}

/**
 * Envios tipados fora de system.reply/system.send (X9, boas-vindas etc.).
 * Neles a própria Zapo monta a citação, igual já acontece no #verificado 1.
 */
export function verifiedSendOptions(enabled, targetJid = '', pushName = 'Usuário', options = {}) {
const out = canalSendOptions({ ...(options && typeof options === 'object' ? options : {}) })
const noQuote = out.noQuote === true || out.quote === false

delete out.noQuote
if (noQuote) {
delete out.quote
return out
}

if (enabled) out.quote = verifiedSeal(pushName)
return out
}

export const metaSeal = verifiedSeal
export const verifiedContext = (_targetJid = '', extra = {}) => ({ ...extra })
