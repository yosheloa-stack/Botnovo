import { prepareMenuHeader } from '../menus/capa.js'
const clean = (value = '') => String(value ?? '').trim()

const labels = {
antiPv: 'AntiPV',
antiFake: 'AntiFake',
antiLink: 'AntiLink',
antiAudio: 'AntiÁudio',
antiVideo: 'AntiVídeo',
antiFoto: 'AntiFoto',
antiSticker: 'AntiSticker',
antiDocumento: 'AntiDocumento',
antiStatus: 'AntiStatus',
antiCanal: 'AntiCanal',
bemVindo: 'Bem-vindo',
autoSticker: 'AutoSticker',
autoBan: 'AutoBan',
soAdm: 'Só ADM',
verificado: 'Verificado',
botoes: 'Botões',
antiVisu: 'AntiVisu',
x9ViewOnce: 'X9viewOnce',
x9: 'X9'
}

function enabled(system) {
return system?.necessarios?.botoes !== false
}

function titleFor(key, fallback = '') {
return labels[key] || fallback || clean(key).replace(/^./, c => c.toUpperCase())
}

export async function sendReplyButtons(system, { text = '', footer = 'Aurora System', buttons = [], header = null, mentions = [] } = {}) {
if (!enabled(system)) return false
const rows = (Array.isArray(buttons) ? buttons : [])
.filter((x) => x?.id && x?.text)
.slice(0, 3)

if (!rows.length) return false

try {
await system.send({
interactiveMessage: {
...(header ? { header } : {}),
body: { text: clean(text) },
footer: { text: clean(footer) || 'Aurora System' },
nativeFlowMessage: {
buttons: rows.map((button) => ({
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: clean(button.text).slice(0, 40),
id: clean(button.id),
disabled: false
})
})),
messageParamsJson: ''
}
}
}, system.from, { mentions })
return true
} catch (err) {
console.error('[ AURORA ] Falha ao enviar quick replies:', err?.message || err)
return false
}
}

export async function sendToggleButtons(system, { key, command, current = 0, owner = false } = {}) {
if (!enabled(system)) return false
const name = titleFor(key, command)
const prefix = system.prefix || '!'
const actor = owner ? 'Configuração global do Aurora' : 'Configuração deste grupo'

return sendReplyButtons(system, {
text: `⏤͟͟͞͞𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐫 ${name}! 𖤐⃝⚙️
•
> *[🛡️]* • *${name}* está ${Number(current) === 1 || current === true ? 'ativado ✅' : 'desativado ❌'} no momento.
> *[⚙️]* • ${actor}
•
> Escolha uma opção abaixo. 💚`,
footer: '𓂃 ࣪˖ ִֶָ𐀔 AURORA SYSTEM 𐀔 ִֶָ˖ ࣪𓂃',
buttons: [
{ id: `${prefix}${command} 1`, text: '✅ ᴀᴛɪᴠᴀʀ' },
{ id: `${prefix}${command} 0`, text: '❌ ᴅᴇsᴀᴛɪᴠᴀʀ' }
]
})
}

export async function sendMenuList(system) {
if (!enabled(system)) return false
const p = system.prefix || '!'

const menuRows = [
{ header: '🎮 VIP', title: '◈ ғʀᴇᴇ ғɪʀᴇ ᴠɪᴘ', description: 'Área Free Fire VIP', id: `${p}menuff`, disabled: false },
{ header: '🎭 DIVERSÃO', title: '✦ ʙʀɪɴᴄᴀᴅᴇɪʀᴀs', description: 'Jogos, ranks, casal e brincadeiras', id: `${p}menubn`, disabled: false },
{ header: '🛡️ ADMIN', title: '♜ ᴀᴅᴍɪɴɪsᴛʀᴀᴄ̧ᴀ̃ᴏ', description: 'Controle e proteção do grupo', id: `${p}menuadm`, disabled: false },
{ header: '👑 DONO', title: '♛ ᴍᴇɴᴜ ᴅᴏ ᴅᴏɴᴏ', description: 'Configurações do proprietário', id: `${p}menudono`, disabled: false },
{ header: '📥 MÍDIA', title: '⇩ ᴅᴏᴡɴʟᴏᴀᴅs', description: 'Play, vídeo e downloads', id: `${p}menudown`, disabled: false },
{ header: '🖼️ FIG', title: '✦ ғɪɢᴜʀɪɴʜᴀs', description: 'Fig, Brat e pacotes de figurinhas', id: `${p}menufig`, disabled: false }
]

const profileRows = [
{ header: '👤 PERFIL', title: '◉ ᴍᴇᴜ ᴘᴇʀғɪʟ', description: 'Veja seu perfil no Aurora', id: `${p}perfil`, disabled: false },
{ header: '✏️ BIO', title: '✎ ᴀʟᴛᴇʀᴀʀ ʙɪᴏ', description: 'Defina a bio do seu perfil', id: `${p}setbio`, disabled: false },
{ header: '👑 CRIADOR', title: '♛ ᴄʀɪᴀᴅᴏʀ', description: 'Informações do criador', id: `${p}criador`, disabled: false },
{ header: '👁️ REVELAR', title: '◉ ʀᴇᴠᴇʟᴀʀ', description: 'Revela mídia de visualização única', id: `${p}revelar`, disabled: false }
]

const list = {
title: '「 💚 」𝐀𝐔𝐑𝐎𝐑𝐀 𝐋𝐈𝐒𝐓「 💚 」',
sections: [
{
title: '『 ✨ 𝐌𝐄𝐍𝐔𝐒 』',
highlight_label: '✨',
rows: menuRows
},
{
title: '『 👤 𝐏𝐄𝐑𝐅𝐈𝐋 』',
highlight_label: '👤',
rows: profileRows
}
]
}

const cargo = system.isOwner ? 'Dono' : system.isAdmin ? 'Admin' : 'Membro'
const vip = system.isVip || system.isOwner ? 'Sim ✅' : 'Não ❌'
const hora = new Date().toLocaleTimeString('pt-BR', {
hour: '2-digit',
minute: '2-digit',
timeZone: 'America/Fortaleza'
})
const grupo = system.isGroup ? (system.metadata?.subject || 'Grupo') : 'Privado'
const usuario = system.senderNumber ? `@${system.senderNumber}` : `@${system.pushName || 'usuario'}`
const mentionJid = system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender
const zapo = '1.8.2'
const header = await prepareMenuHeader(system)

const body = `⏤͟͟͞͞𝐀𝐮𝐫𝐨𝐫𝐚 𝐌𝐞𝐧𝐮! 𖤐⃝💚
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${usuario}
> *[🛡️]* • *ᴄᴀʀɢᴏ:* ${cargo}
> *[💎]* • *ᴠɪᴘ:* ${vip}
> *[⚡]* • *ᴘʀᴇғɪxᴏ:* ${p}
> *[🕐]* • *ʜᴏʀᴀ:* ${hora}
> *[👥]* • *ɢʀᴜᴘᴏ:* ${grupo}
> *[🟢]* • *ᴢᴀᴘᴏ:* v${zapo}
•
> Escolha uma categoria no botão abaixo. 💚`

try {
await system.send({
interactiveMessage: {
...(header ? { header } : {}),
body: { text: body },
footer: { text: '𓂃 ࣪˖ ִֶָ𐀔 AURORA SYSTEM • Dev: YoshiGGX 𐀔 ִֶָ˖ ࣪𓂃' },
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify(list)
}
],
messageParamsJson: ''
}
}
}, system.from, { mentions: mentionJid ? [mentionJid] : [] })
return true
} catch (err) {
console.error('[ AURORA ] Falha ao enviar Menu List completo:', err?.message || err)
return false
}
}

export async function sendActivationList(system) {
if (!enabled(system)) return false
const p = system.prefix || '!'
const sections = [
{
title: '『 🛡️ 𝐏𝐑𝐎𝐓𝐄𝐂̧𝐎̃𝐄𝐒 』',
highlight_label: '🛡️',
rows: [
{ header: '🛡️ PROTEÇÃO', title: 'AntiFake', description: 'Bloqueia números fora do padrão permitido', id: `${p}antifake`, disabled: false },
{ header: '🔗 PROTEÇÃO', title: 'AntiLink', description: 'Proteção contra links no grupo', id: `${p}antilink`, disabled: false },
{ header: '🎧 MÍDIA', title: 'AntiÁudio', description: 'Controla o envio de áudios', id: `${p}antiaudio`, disabled: false },
{ header: '🎬 MÍDIA', title: 'AntiVídeo', description: 'Controla o envio de vídeos', id: `${p}antivideo`, disabled: false },
{ header: '🖼️ MÍDIA', title: 'AntiFoto', description: 'Controla o envio de fotos', id: `${p}antifoto`, disabled: false },
{ header: '🎭 MÍDIA', title: 'AntiSticker', description: 'Controla o envio de figurinhas', id: `${p}antisticker`, disabled: false },
{ header: '📄 MÍDIA', title: 'AntiDocumento', description: 'Controla documentos no grupo', id: `${p}antidocumento`, disabled: false },
{ header: '📱 PROTEÇÃO', title: 'AntiStatus', description: 'Proteção contra status', id: `${p}antistatus`, disabled: false },
{ header: '📢 PROTEÇÃO', title: 'AntiCanal', description: 'Proteção contra mensagens de canal', id: `${p}anticanal`, disabled: false },
{ header: '👁️ VIEW ONCE', title: 'AntiVisu', description: 'Apaga visualização única', id: `${p}antivisu`, disabled: false },
{ header: '🎥 VIEW ONCE', title: 'X9ViewOnce', description: 'Só permite mídia em visualização única', id: `${p}x9viewonce`, disabled: false }
]
},
{
title: '『 ⚙️ 𝐒𝐈𝐒𝐓𝐄𝐌𝐀𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎 』',
highlight_label: '⚙️',
rows: [
{ header: '👋 GRUPO', title: 'Bem-vindo', description: 'Mensagem automática de entrada', id: `${p}bemvindo`, disabled: false },
{ header: '✨ STICKER', title: 'AutoSticker', description: 'Criação automática de sticker', id: `${p}autosticker`, disabled: false },
{ header: '🚫 MODERAÇÃO', title: 'AutoBan', description: 'Remove automaticamente em infrações', id: `${p}autoban`, disabled: false },
{ header: '👑 PERMISSÃO', title: 'Só ADM', description: 'Restringe comandos aos administradores', id: `${p}soadm`, disabled: false },
{ header: '👀 MONITOR', title: 'X9', description: 'Monitora ações e eventos do grupo', id: `${p}x9`, disabled: false }
]
}
]

if (system.isOwner) {
sections.push({
title: '『 👑 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂̧𝐎̃𝐄𝐒 𝐃𝐎 𝐃𝐎𝐍𝐎 』',
highlight_label: '👑',
rows: [
{ header: '🚷 GLOBAL', title: 'AntiPV', description: 'Bloqueia uso no privado', id: `${p}antipv`, disabled: false },
{ header: '✅ GLOBAL', title: 'Verificado', description: 'Liga ou desliga o selo visual', id: `${p}verificado`, disabled: false }
]
})
}

const list = {
title: '「 ⚙️ 」𝐀𝐓𝐈𝐕𝐀𝐂̧𝐎̃𝐄𝐒「 ⚙️ 」',
sections
}

try {
await system.send({
interactiveMessage: {
body: {
text: `⏤͟͟͞͞𝐀𝐭𝐢𝐯𝐚𝐜̧𝐨̃𝐞𝐬 𝐝𝐨 𝐀𝐮𝐫𝐨𝐫𝐚! 𖤐⃝🛡️\n•\n> Escolha uma proteção na lista.\n> Depois use os botões *Ativar* ou *Desativar*.`
},
footer: { text: '𓂃 ࣪˖ ִֶָ𐀔 AURORA SYSTEM 𐀔 ִֶָ˖ ࣪𓂃' },
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify(list)
}
],
messageParamsJson: ''
}
}
})
return true
} catch (err) {
console.error('[ AURORA ] Falha ao enviar lista de ativações:', err?.message || err)
return false
}
}
