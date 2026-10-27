import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// O config.json padrão fica junto do código (o bot de cliente roda em outra
// pasta, a de dados dele).
const file = fileURLToPath(new URL('../../config.json', import.meta.url))
const userFile = path.resolve(process.env.AURORA_CONFIG_FILE || 'sistema/dados/config.user.json')
const merge = (base, extra) => {
  const result = { ...base, ...extra }
  for (const key of ['owner', 'connection', 'autoSystem', 'tokitoApi', 'akameApi']) {
    result[key] = { ...(base[key] || {}), ...(extra[key] || {}) }
  }
  return result
}

const clean = (value = '') => String(value ?? '').replace(/[\r\n]+/g, ' ').trim()
export const NUMERO_BOT_DA_CASA = '5567981517686'

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
const defaults = JSON.parse(raw)
let userConfig = {}
try { userConfig = JSON.parse(await fs.readFile(userFile, 'utf8')) } catch (err) {
  if (err?.code !== 'ENOENT') console.warn('[ AURORA ] Configuração personalizada inválida:', err?.message || err)
}
const config = merge(defaults, userConfig)
if (process.env.AURORA_PREFIX) config.prefix = clean(process.env.AURORA_PREFIX)
config.prefix = String(config.prefix || '!').slice(0, 3)

// Segredos e dados da hospedagem não precisam ir para o Git.
// Variáveis de ambiente têm prioridade e deixam o mesmo pacote utilizável
// em desenvolvimento e na Square Cloud.
config.owner = { ...(config.owner || {}) }
config.connection = { ...(config.connection || {}) }
config.autoSystem = { ...(config.autoSystem || {}) }
if (process.env.AURORA_OWNER_NUMBER) config.owner.number = clean(process.env.AURORA_OWNER_NUMBER)
if (process.env.AURORA_CONNECTION_NUMBER) config.connection.number = clean(process.env.AURORA_CONNECTION_NUMBER)
// O BOT DA CASA TEM NÚMERO FIXO (pedido do dono, 27/10): é ele que manda os
// avisos de venda do site. Os bots das clientes (AURORA_CLIENTE=1) usam o
// número de cada uma e não passam por aqui.
if (process.env.AURORA_CLIENTE !== '1') config.connection.number = NUMERO_BOT_DA_CASA
if (process.env.AUTOSYSTEM_URL || process.env.KASANE_URL) {
config.autoSystem.url = clean(process.env.AUTOSYSTEM_URL || process.env.KASANE_URL)
}
if (process.env.AUTO_SYSTEM_TOKEN || process.env.AUTOSYSTEM_TOKEN) config.autoSystem.token = clean(process.env.AUTO_SYSTEM_TOKEN || process.env.AUTOSYSTEM_TOKEN)
config.autoSystem.rentalToken = clean(process.env.AURORA_RENTAL_TOKEN || config.autoSystem.rentalToken || '')

applyChannel(config, normalizeChannel(config))
return config
}

export async function saveConfig(config) {
  if (!config || typeof config !== 'object') throw new TypeError('Configuração inválida')
  let previous = {}
  try { previous = JSON.parse(await fs.readFile(userFile, 'utf8')) } catch (err) {
    if (err?.code !== 'ENOENT') throw err
  }
  const next = merge(previous, config)
  for (const section of ['owner', 'connection', 'autoSystem', 'tokitoApi', 'akameApi']) {
    next[section] = { ...(previous[section] || {}), ...(config[section] || {}) }
  }
  // Segredos de ambiente nunca devem ser gravados por cima dos valores do arquivo.
  const overrides = [
    ['AURORA_OWNER_NUMBER', 'owner', 'number'],
    ['AURORA_CONNECTION_NUMBER', 'connection', 'number'],
    ['AUTO_SYSTEM_TOKEN', 'autoSystem', 'token'],
    ['AUTOSYSTEM_TOKEN', 'autoSystem', 'token'],
    ['AURORA_RENTAL_TOKEN', 'autoSystem', 'rentalToken']
  ]
  for (const [env, section, key] of overrides) {
    if (process.env[env]) next[section][key] = previous[section]?.[key] || ''
  }
  if (process.env.AUTOSYSTEM_URL || process.env.KASANE_URL) {
    next.autoSystem.url = previous.autoSystem?.url || ''
  }
  await fs.mkdir(path.dirname(userFile), { recursive: true })
  const temp = userFile + '.tmp'
  await fs.writeFile(temp, JSON.stringify(next, null, 2) + '\n', 'utf8')
  await fs.rename(temp, userFile)
}
