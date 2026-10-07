import { quotedInfo, unwrapMessage } from '../../funcoes/mensagem.js'
import { saveConfig, normalizeChannel, applyChannel } from '../../funcoes/config.js'
import { bindCanalConfig } from '../../funcoes/canal.js'

function textoDaMensagem(message = {}) {
const m = unwrapMessage(message)
if (!m) return ''
return String(
m?.conversation
?? m?.extendedTextMessage?.text
?? m?.imageMessage?.caption
?? m?.videoMessage?.caption
?? m?.documentMessage?.caption
?? ''
).trim()
}

function conviteDoTexto(value = '') {
const text = String(value || '').trim()
const match = text.match(/(?:https?:\/\/)?(?:www\.)?(?:whatsapp\.com|wa\.me)\/channel\/([A-Za-z0-9_-]+)/i)
return match?.[1] || ''
}

function nomeDoCanal(meta = {}) {
const raw = meta?.name
?? meta?.newsletterName
?? meta?.title
?? meta?.subject
?? meta?.threadMetadata?.name
?? meta?.thread_metadata?.name
?? 'Canal do WhatsApp'
if (typeof raw === 'string' || typeof raw === 'number') return String(raw).trim() || 'Canal do WhatsApp'
if (raw && typeof raw === 'object') {
return String(raw?.text ?? raw?.content ?? raw?.name ?? raw?.title ?? raw?.subject ?? raw?.displayName ?? 'Canal do WhatsApp').trim()
}
return 'Canal do WhatsApp'
}

function seguidores(meta = {}) {
const value = meta?.subscribersCount
?? meta?.subscriberCount
?? meta?.subscribers_count
?? meta?.subscriber_count
?? meta?.followersCount
?? meta?.followers_count
?? meta?.threadMetadata?.subscribersCount
?? meta?.thread_metadata?.subscribers_count
return Number.isFinite(Number(value)) ? Number(value) : null
}

export default {name: 'rgchannel',aliases: [],category: 'dono',description: 'Registra o canal global do Aurora no config.json',ownerOnly: true,async run(system){
const quoted = quotedInfo(system.event)
const quotedText = quoted ? textoDaMensagem(quoted.message) : ''
const entrada = String(system.q || quotedText || '').trim()

if (!entrada) {
const { jid, link } = normalizeChannel(system.config)
const ativo = jid !== '0@newsletter' && jid.endsWith('@newsletter')
return system.reply(
`⏤͟͟͞͞𝐑𝐆 𝐂𝐡𝐚𝐧𝐧𝐞𝐥! 𖤐⃝📢\n•\n` +
`> *Status:* ${ativo ? '✅ Ativo' : '❌ Desativado'}\n` +
`${ativo ? `> *ID:* ${jid}\n${link ? `> *Link:* ${link}\n` : ''}` : ''}` +
`•\n` +
`> Use: *${system.prefix}rgchannel link-do-canal*\n` +
`> Ou responda uma mensagem que tenha o link do canal com *${system.prefix}rgchannel*.\n` +
`> Para desativar: *${system.prefix}rgchannel 0*`
)
}

if (entrada === '0') {
applyChannel(system.config, { jid: '0@newsletter', link: '' })
await saveConfig(system.config)
bindCanalConfig(system.config)
return system.reply('• ✅ Canal global desativado com sucesso.')
}

try {
let meta
let jid = ''
let link = ''

const jidEntrada = entrada.match(/\b\d+@newsletter\b/i)?.[0] || (entrada.endsWith('@newsletter') ? entrada : '')
if (jidEntrada) {
jid = jidEntrada
meta = await system.client.newsletter.fetch(jid)
// Um JID @newsletter não contém o código público do convite. Se este mesmo
// canal já tinha link salvo, reaproveita; caso contrário o CTA fica indisponível
// até o dono registrar usando o link público do canal.
const atual = normalizeChannel(system.config)
link = atual.jid === jid ? atual.link : ''
} else {
const invite = conviteDoTexto(entrada)
if (!invite) {
return system.reply(
`• ❌ Não achei um link de canal válido.\n\n` +
`> Exemplo: *${system.prefix}rgchannel https://whatsapp.com/channel/SEU_CODIGO*`
)
}
link = `https://whatsapp.com/channel/${invite}`
meta = await system.client.newsletter.fetchByInvite(invite)
jid = String(meta?.jid || meta?.id || meta?.newsletterJid || '').trim()
}

if (!jid || !jid.endsWith('@newsletter')) {
return system.reply('• ❌ Consegui acessar o canal, mas o WhatsApp não retornou o ID dele.')
}

// O JID continua sendo a identidade do canal; o link público é salvo apenas
// para montar o botão CTA "Ver canal" nas mensagens seguintes.
applyChannel(system.config, { jid, link })
await saveConfig(system.config)
bindCanalConfig(system.config)

const nome = nomeDoCanal(meta)
const total = seguidores(meta)

return system.reply(
`⏤͟͟͞͞𝐂𝐚𝐧𝐚𝐥 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨! 𖤐⃝📢\n•\n` +
`> *[📛]* • *ɴᴏᴍᴇ:* ${nome}\n` +
`${total === null ? '' : `> *[👥]* • *sᴇɢᴜɪᴅᴏʀᴇs:* ${total.toLocaleString('pt-BR')}\n`}` +
`${link ? `> *[🖇️]* • *ʟɪɴᴋ:* ${link}\n` : '> *[🖇️]* • *ʟɪɴᴋ:* não salvo — registre pelo link para ativar o botão Ver canal\n'}` +
`> *[🆔]* • *ɪᴅ:* ${jid}\n` +
`•\n> ✅ Canal e link do CTA salvos e aplicados imediatamente.`
)
} catch (err) {
console.error('[ AURORA ] rgchannel:', err?.message || err)
return system.reply('• ❌ Não consegui acessar esse canal. Confira se o link ainda é válido e tente novamente.')
}
}
}
