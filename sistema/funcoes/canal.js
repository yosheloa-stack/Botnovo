import { normalizeChannel } from './config.js'

const object = (value) => value && typeof value === 'object' && !Array.isArray(value)

let liveConfig = null
let liveJid = '0@newsletter'
let liveLink = ''

export function bindCanalConfig(config) {
if (config && typeof config === 'object') liveConfig = config
const { jid, link } = normalizeChannel(config || liveConfig || {})
liveJid = jid
liveLink = link || ''
return canalAtual()
}

export function canalAtual() {
if (liveConfig && typeof liveConfig === 'object') {
const { jid, link } = normalizeChannel(liveConfig)
liveJid = jid
liveLink = link || ''
}
return {
active: Boolean(liveJid && liveJid !== '0@newsletter' && liveJid.endsWith('@newsletter')),
jid: liveJid,
link: liveLink
}
}

function newsletterInfo() {
const canal = canalAtual()
if (!canal.active) return null
return {
newsletterJid: `${canal.jid}`,
newsletterName: 'Aurora System',
// O proto atual usa valor numérico. Mantemos 1 apenas como referência válida
// para o cabeçalho de encaminhamento; o CTA de canal agora é explícito.
serverMessageId: 1
}
}

export function canalContext(extra = {}) {
const base = object(extra) ? { ...extra } : {}
const info = newsletterInfo()
if (!info) return base

return {
...base,
isForwarded: true,
forwardingScore: 1,
forwardedNewsletterMessageInfo: info
}
}

export function canalSendOptions(options = {}) {
const out = object(options) ? { ...options } : {}
if (!canalAtual().active) return out
out.contextInfo = canalContext(out.contextInfo)
return out
}

export function canalCtaButton() {
const { active, link } = canalAtual()
if (!active || !link) return null
return {
name: 'cta_url',
buttonParamsJson: JSON.stringify({
display_text: 'Ver canal',
url: link
})
}
}

function withContext(node) {
if (!object(node)) return node
return { ...node, contextInfo: canalContext(node.contextInfo) }
}

function withChannelCta(interactive = {}) {
if (!object(interactive)) return interactive
const button = canalCtaButton()
const current = Array.isArray(interactive?.nativeFlowMessage?.buttons)
? interactive.nativeFlowMessage.buttons
: []

let buttons = current
if (button) {
const hasChannelCta = current.some((item) => {
if (item?.name !== 'cta_url') return false
try {
const params = JSON.parse(item?.buttonParamsJson || '{}')
return params?.url === canalAtual().link || params?.display_text === 'Ver canal'
} catch {
return false
}
})
if (!hasChannelCta) buttons = [...current, button]
}

const nativeFlowMessage = button || current.length
? {
...(object(interactive.nativeFlowMessage) ? interactive.nativeFlowMessage : {}),
buttons,
messageVersion: Number(interactive?.nativeFlowMessage?.messageVersion || 1),
messageParamsJson: interactive?.nativeFlowMessage?.messageParamsJson ?? ''
}
: interactive.nativeFlowMessage

return {
...interactive,
...(nativeFlowMessage ? { nativeFlowMessage } : {}),
contextInfo: canalContext(interactive.contextInfo)
}
}

function textInteractive(text = '') {
const button = canalCtaButton()
if (!button) {
return {
extendedTextMessage: {
text: String(text),
contextInfo: canalContext()
}
}
}

return {
interactiveMessage: {
body: { text: String(text) },
nativeFlowMessage: {
buttons: [button],
messageVersion: 1,
messageParamsJson: ''
},
contextInfo: canalContext()
}
}
}

// Aplica o canal aos payloads raw. Quando existe link público, texto puro vira
// Interactive Native Flow com CTA real "Ver canal". Mensagens interativas já
// existentes apenas recebem o botão extra, preservando listas/quick replies.
export function applyCanalToRaw(content) {
if (!object(content) || !canalAtual().active) return content

const apply = (message) => {
if (!object(message)) return message

for (const wrapper of [
'ephemeralMessage',
'viewOnceMessage',
'viewOnceMessageV2',
'viewOnceMessageV2Extension',
'documentWithCaptionMessage',
'deviceSentMessage'
]) {
const inner = message?.[wrapper]?.message
if (object(inner)) {
return {
...message,
[wrapper]: {
...message[wrapper],
message: apply(inner)
}
}
}
}

if (object(message?.interactiveMessage)) {
return {
...message,
interactiveMessage: withChannelCta(message.interactiveMessage)
}
}

for (const key of [
'buttonsMessage',
'listMessage',
'imageMessage',
'videoMessage',
'ptvMessage',
'audioMessage',
'documentMessage',
'extendedTextMessage',
'contactMessage',
'contactsArrayMessage',
'locationMessage',
'liveLocationMessage',
'orderMessage',
'productMessage',
'stickerMessage'
]) {
if (object(message?.[key])) return { ...message, [key]: withContext(message[key]) }
}

if (typeof message.conversation === 'string' && message.conversation) {
const { conversation, ...rest } = message
return { ...rest, ...textInteractive(conversation) }
}

return message
}

return apply(content)
}

// Conteúdo tipado da Zapo passa por aqui ANTES do builder. Texto é convertido
// em proto interativo para o CTA existir de verdade; demais tipos continuam no
// builder normal e recebem o contexto pelo terceiro argumento do send().
export function applyCanalToContent(content) {
if (!canalAtual().active) return content
if (!object(content)) return content

if (content.type === 'text' && typeof content.text === 'string' && canalAtual().link) {
return textInteractive(content.text)
}

return applyCanalToRaw(content)
}

function isControlContent(content) {
if (!object(content)) return false
const type = String(content.type || '').trim().toLowerCase()
return [
'revoke', 'reaction', 'poll-vote', 'event-response',
'pin', 'unpin', 'keep', 'unkeep'
].includes(type) || Boolean(content.protocolMessage)
}

export function installCanalGlobal(client, config) {
bindCanalConfig(config)
const box = client?.message
if (!box || typeof box.send !== 'function' || box.__auroraCanalGlobal) return false

const original = box.send.bind(box)
box.send = async (jid, content, options = {}) => {
const isEdit = Boolean(options?.editKey)
if (isEdit || isControlContent(content)) return original(jid, content, options)

const payload = applyCanalToContent(content)
const sendOptions = canalSendOptions(options)
return original(jid, payload, sendOptions)
}

Object.defineProperty(box, '__auroraCanalGlobal', {
value: true,
enumerable: false,
configurable: false
})
return true
}
