import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.resolve('config.json')

const clean = (value = '') => String(value ?? '').replace(/[\r\n]+/g, ' ').trim()

function normalizeChannelLink(value = '') {
const raw = clean(value)
if (!raw) return ''
const match = raw.match(/(?:https?:\/\/)?(?:www\.)?(?:whatsapp\.com|wa\.me)\/channel\/([A-Za-z0-9_-]+)/i)
if (!match?.[1]) return ''
return `https://whatsapp.com/channel/${match[1]}`
}

// O JID continua sendo a fonte de verdade do canal.
// channelLink existe apenas para o botão CTA "Ver canal", porque o JID
// numérico @newsletter não permite reconstruir o código público do convite.
export function normalizeChannel(config = {}) {
const raw = config?.channel
const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : null
let jid = clean(source?.jid ?? source?.id ?? source?.newsletterJid ?? (typeof raw === 'string' ? raw : ''))
if (!jid || !jid.endsWith('@newsletter')) jid = '0@newsletter'

const link = normalizeChannelLink(
source?.link ?? source?.url ?? source?.inviteLink ?? config?.channelLink ?? ''
)

return { jid, link }
}

export function applyChannel(config = {}, channel = {}) {
const source = channel && typeof channel === 'object' && !Array.isArray(channel) ? channel : null
const raw = source
? (source.jid ?? source.id ?? source.newsletterJid ?? source.channel)
: channel

let jid = clean(raw)
if (!jid || !jid.endsWith('@newsletter')) jid = '0@newsletter'

const suppliedLink = source
? (source.link ?? source.url ?? source.inviteLink ?? '')
: ''
const oldLink = normalizeChannelLink(config?.channelLink ?? '')
const hasExplicitLink = Boolean(source && (
Object.prototype.hasOwnProperty.call(source, 'link')
|| Object.prototype.hasOwnProperty.call(source, 'url')
|| Object.prototype.hasOwnProperty.call(source, 'inviteLink')
))
const link = jid === '0@newsletter'
? ''
: hasExplicitLink
? normalizeChannelLink(suppliedLink)
: oldLink

config.channel = jid
if (jid !== '0@newsletter' && link) config.channelLink = link
else delete config.channelLink

// Campos antigos que não são mais usados.
delete config.channelName
delete config.channelServerId
return { jid, link: config.channelLink || '' }
}

export async function loadConfig() {
const raw = await fs.readFile(file, 'utf8')
const config = JSON.parse(raw)
config.prefix = String(config.prefix || '!').slice(0, 3)

// Segredos e dados da hospedagem não precisam ir para o Git.
// Variáveis de ambiente têm prioridade e deixam o mesmo pacote utilizável
// em desenvolvimento e na Square Cloud.
config.owner = { ...(config.owner || {}) }
config.connection = { ...(config.connection || {}) }
config.autoSystem = { ...(config.autoSystem || {}) }
if (process.env.AURORA_OWNER_NUMBER) config.owner.number = clean(process.env.AURORA_OWNER_NUMBER)
if (process.env.AURORA_CONNECTION_NUMBER) config.connection.number = clean(process.env.AURORA_CONNECTION_NUMBER)
if (process.env.AUTOSYSTEM_URL || process.env.KASANE_URL) {
config.autoSystem.url = clean(process.env.AUTOSYSTEM_URL || process.env.KASANE_URL)
}
if (process.env.AUTOSYSTEM_TOKEN) config.autoSystem.token = clean(process.env.AUTOSYSTEM_TOKEN)
config.autoSystem.rentalToken = clean(process.env.AURORA_RENTAL_TOKEN || config.autoSystem.rentalToken || '')

applyChannel(config, normalizeChannel(config))
return config
}

export async function saveConfig(config) {
if (config && typeof config === 'object') applyChannel(config, normalizeChannel(config))
await fs.writeFile(file, `${JSON.stringify(config, null, 2)}\n`, 'utf8')
}
