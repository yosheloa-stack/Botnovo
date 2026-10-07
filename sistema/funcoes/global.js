const exports = {}

function prettyNumber(value) {
const raw = String(value ?? '').trim()
if (!raw) return '-'
if (/[a-zA-Z]/.test(raw)) return raw
const n = Number(raw.replace(/[^0-9.-]/g, ''))
if (!Number.isFinite(n)) return raw
return new Intl.NumberFormat('en-US').format(n)
}

function prettyDate(value) {
if (!value) return '-'
const date = new Date(value)
if (Number.isNaN(date.getTime())) return '-'
return date.toLocaleDateString('pt-BR')
}

function prettyDateTime(value) {
if (!value) return '-'
const date = new Date(value)
if (Number.isNaN(date.getTime())) return '-'
return `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

exports.onlyOwner = () => {
return `- 🧊 \`𝙰𝙲𝙴𝚂𝚂𝙾 𝙳𝙾 𝙳𝙾𝙽𝙾\`

> 🧊 ׄ ( ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇ́ ᴇxᴄʟᴜsɪᴠᴏ ᴘᴀʀᴀ ᴏ ᴍᴇᴜ ᴅᴏɴᴏ ᴜᴛɪʟɪᴢᴀʀ. 🙇‍♂️ )`
}

exports.commandNotFound = ({ prefix, command, nome, porcentagem, tempo }) => {
const recebido = command ? `${prefix}${command}` : prefix
return `⏤͟͟͞͞𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐢𝐧𝐯𝐚́𝐥𝐢𝐝𝐨! 𖤐⃝❌
•
> ╭ ❌ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
> *[⌨️]* • *ᴄᴏᴍᴀɴᴅᴏ:* *${recebido}*
> *[🔎]* • *ᴘᴀʀᴇᴄɪᴅᴏ:* *${nome || 'Nenhum'}*
> *[📊]* • *sᴇᴍᴇʟʜᴀɴᴄ̧ᴀ:* ${porcentagem || '0%'}
> *[⏱️]* • *ᴛᴇᴍᴘᴏ:* ${tempo || '0 ms'}
•
> *[💡]* • *𝚄𝚜𝚎 ${prefix}𝚖𝚎𝚗𝚞 𝚙𝚊𝚛𝚊 𝚟𝚎𝚛 𝚘𝚜 𝚌𝚘𝚖𝚊𝚗𝚍𝚘𝚜.*`
}

exports.sogrupo = () => {
return `- 👥 \`𝙰𝙿𝙴𝙽𝙰𝚂 𝙴𝙼 𝙶𝚁𝚄𝙿𝙾𝚂\`

> 👥 ׄ ( ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ́ ᴘᴏᴅᴇ sᴇʀ ᴜᴛɪʟɪᴢᴀᴅᴏ ᴅᴇɴᴛʀᴏ ᴅᴇ ᴜᴍ ɢʀᴜᴘᴏ ᴅᴏ ᴡʜᴀᴛsᴀᴘᴘ. 🙇‍♂️ )`
}

exports.soadm = () => {
return `- 👑 \`𝙰𝙿𝙴𝙽𝙰𝚂 𝙰𝙳𝙼𝙸𝙽𝙸𝚂𝚃𝚁𝙰𝙳𝙾𝚁𝙴𝚂\`

> 👑 ׄ ( ᴀᴘᴇɴᴀs ᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴅᴏ ɢʀᴜᴘᴏ ᴘᴏᴅᴇᴍ ᴜᴛɪʟɪᴢᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ. 🙇‍♂️ )`
}

exports.botadm = () => {
return `- ⚙️ \`𝙱𝙾𝚃 𝚂𝙴𝙼 𝙰𝙳𝙼𝙸𝙽\`

> ⚙️ ׄ ( ᴇᴜ ᴘʀᴇᴄɪsᴏ sᴇʀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴅᴏ ɢʀᴜᴘᴏ ᴘᴀʀᴀ ᴄᴏɴsᴇɢᴜɪʀ ᴇxᴇᴄᴜᴛᴀʀ ᴇssᴀ ᴀᴄ̧ᴀ̃ᴏ. 🙇‍♂️ )`
}

exports.marque = () => {
return `- 👤 \`𝙼𝙰𝚁𝚀𝚄𝙴 𝙾 𝚄𝚂𝚄𝙰́𝚁𝙸𝙾\`

> 👤 ׄ ( ᴍᴀʀǫᴜᴇ ᴏ ᴜsᴜᴀ́ʀɪᴏ ᴏᴜ ʀᴇsᴘᴏɴᴅᴀ ᴀ̀ ᴍᴇɴsᴀɢᴇᴍ ᴅᴀ ᴘᴇssᴏᴀ ǫᴜᴇ ᴅᴇsᴇᴊᴀ sᴇʟᴇᴄɪᴏɴᴀʀ. 🙇‍♂️ )`
}

exports.nobot = () => {
return `- 🤖 \`𝙰𝙲̧𝙰̃𝙾 𝙱𝙻𝙾𝚀𝚄𝙴𝙰𝙳𝙰\`

> 🤖 ׄ ( ᴇᴜ ɴᴀ̃ᴏ ᴘᴏssᴏ ᴇxᴇᴄᴜᴛᴀʀ ᴇssᴀ ᴀᴄ̧ᴀ̃ᴏ ᴄᴏᴍɪɢᴏ ᴍᴇsᴍᴏ. 🙇‍♂️ )`
}

exports.nodono = () => {
return `- 👑 \`𝙳𝙾𝙽𝙾 𝙿𝚁𝙾𝚃𝙴𝙶𝙸𝙳𝙾\`

> 👑 ׄ ( ɴᴀ̃ᴏ ᴇ́ ᴘᴏssɪ́ᴠᴇʟ ᴇxᴇᴄᴜᴛᴀʀ ᴇssᴀ ᴀᴄ̧ᴀ̃ᴏ ᴄᴏᴍ ᴜᴍ ᴅᴏs ᴅᴏɴᴏs ᴅᴏ ʙᴏᴛ. 🙇‍♂️ )`
}

exports.jaadm = () => {
return `- 👑 \`𝚄𝚂𝚄𝙰́𝚁𝙸𝙾 𝙹𝙰́ 𝙴́ 𝙰𝙳𝙼\`

> 👑 ׄ ( ᴇssᴇ ᴜsᴜᴀ́ʀɪᴏ ᴊᴀ́ ᴘᴏssᴜɪ ᴏ ᴄᴀʀɢᴏ ᴅᴇ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴅᴏ ɢʀᴜᴘᴏ. 🙇‍♂️ )`
}

exports.naoadm = () => {
return `- 👤 \`𝚄𝚂𝚄𝙰́𝚁𝙸𝙾 𝙽𝙰̃𝙾 𝙴́ 𝙰𝙳𝙼\`

> 👤 ׄ ( ᴇssᴇ ᴜsᴜᴀ́ʀɪᴏ ɴᴀ̃ᴏ ᴘᴏssᴜɪ ᴏ ᴄᴀʀɢᴏ ᴅᴇ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ ᴅᴏ ɢʀᴜᴘᴏ. 🙇‍♂️ )`
}

exports.banido = (alvo, admin = '') => `⏤͟͟͞͞𝐌𝐞𝐦𝐛𝐫𝐨 𝐫𝐞𝐦𝐨𝐯𝐢𝐝𝐨! 𖤐⃝🥾
•
> @${String(alvo).split('@')[0]} foi removido do grupo.
${actionBy(admin)}
${auroraFooter()}`

exports.promovido = (alvo, admin = '') => `⏤͟͟͞͞𝐍𝐨𝐯𝐨 𝐚𝐝𝐦𝐢𝐧! 𖤐⃝👑
•
> @${String(alvo).split('@')[0]} agora faz parte da administração. 🛡️
${actionBy(admin)}
${auroraFooter()}`

exports.rebaixado = (alvo, admin = '') => `⏤͟͟͞͞𝐂𝐚𝐫𝐠𝐨 𝐫𝐞𝐦𝐨𝐯𝐢𝐝𝐨! 𖤐⃝⬇️
•
> @${String(alvo).split('@')[0]} não é mais administrador do grupo.
${actionBy(admin)}
${auroraFooter()}`

exports.falha = () => {
return `⏤͟͟͞͞𝐎𝐜𝐨𝐫𝐫𝐞𝐮 𝐮𝐦 𝐞𝐫𝐫𝐨! 𖤐⃝❌
•
> ╭ ⚠️ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
> *[❌]* • ɴᴀ̃ᴏ ғᴏɪ ᴘᴏssɪ́ᴠᴇʟ ᴇxᴇᴄᴜᴛᴀʀ ᴏ ᴄᴏᴍᴀɴᴅᴏ.
> *[🔄]* • ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴇᴍ ᴀʟɢᴜɴs ɪɴsᴛᴀɴᴛᴇs.
•
> *[💚]* • *𝙰𝚞𝚛𝚘𝚛𝚊 𝚂𝚢𝚜𝚝𝚎𝚖*`
}

exports.onlyGroup = exports.sogrupo
exports.onlyAdmin = exports.soadm
exports.onlyBotAdmin = exports.botadm
exports.target = exports.marque
exports.commandError = exports.falha
exports.banned = exports.banido
exports.promoted = exports.promovido
exports.demoted = exports.rebaixado


exports.onlyVip = () => {
return `⏤͟͟͞͞𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐕𝐈𝐏! 𖤐⃝💎
•
> Este comando é exclusivo para usuários *VIP* do Aurora System.
>
> *[💚]* • Peça acesso VIP ao dono do bot.
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
}
exports.onlyPremium = exports.onlyVip

exports.onlyAdmMode = () => {
return `- 👑 \`𝙼𝙾𝙳𝙾 𝚂𝙾́ 𝙰𝙳𝙼\`\n\n> *『 𝙱𝙻𝙾𝚀𝚄𝙴𝙰𝙳𝙾 』— ᴏ ᴍᴏᴅᴏ sᴏ́ ᴀᴅᴍɪɴ ᴇsᴛᴀ́ ᴀᴛɪᴠᴏ ɴᴇsᴛᴇ ɢʀᴜᴘᴏ.*`
}

exports.toggleUsage = (p, cmd) => {
return `- ⚙️ \`𝙰𝚃𝙸𝚅𝙰𝙲̧𝙰̃𝙾\`\n\n> *『 ${p}${cmd} 1 』— ᴀᴛɪᴠᴀ.*\n> *『 ${p}${cmd} 0 』— ᴅᴇsᴀᴛɪᴠᴀ.*`
}

exports.toggleResult = (name, value, admin = '') => {
const label = String(name || '').replace(/^./, c => c.toUpperCase())
return `⏤͟͟͞͞𝐏𝐫𝐨𝐭𝐞𝐜̧𝐚̃𝐨 ${value ? '𝐚𝐭𝐢𝐯𝐚𝐝𝐚' : '𝐝𝐞𝐬𝐚𝐭𝐢𝐯𝐚𝐝𝐚'}! 𖤐⃝🛡️
•
> *${label}* foi ${value ? 'ativado' : 'desativado'} com sucesso.
${actionBy(admin)}
${auroraFooter()}`
}

exports.botAdminInvite = () => {
return `- 🔗 \`𝙻𝙸𝙽𝙺 𝙳𝙾 𝙶𝚁𝚄𝙿𝙾\`\n\n> *『 𝙽𝙰̃𝙾 𝙰𝚄𝚃𝙾𝚁𝙸𝚉𝙰𝙳𝙾 』— ᴏ ᴡʜᴀᴛsᴀᴘᴘ ɴᴀ̃ᴏ ʟɪʙᴇʀᴏᴜ ᴏ ᴄᴏ́ᴅɪɢᴏ ᴅᴇ ᴄᴏɴᴠɪᴛᴇ. ᴄᴏɴғɪʀᴍᴇ sᴇ ᴏ ᴀᴜʀᴏʀᴀ ᴇ́ ᴀᴅᴍɪɴ.*`
}

exports.botAdminAction = () => {
return `- ⚙️ \`𝙰𝙲̧𝙰̃𝙾 𝙽𝙰̃𝙾 𝙰𝚄𝚃𝙾𝚁𝙸𝚉𝙰𝙳𝙰\`\n\n> *『 𝙰𝙳𝙼𝙸𝙽 』— ᴏ ᴡʜᴀᴛsᴀᴘᴘ ʀᴇᴄᴜsᴏᴜ ᴀ ᴀᴄ̧ᴀ̃ᴏ. ᴄᴏɴғɪʀᴍᴇ ᴀs ᴘᴇʀᴍɪssᴏ̃ᴇs ᴅᴏ ʙᴏᴛ.*`
}

exports.participantActionError = (code = '') => {
return `- ❌ \`𝙰𝙲̧𝙰̃𝙾 𝙵𝙰𝙻𝙷𝙾𝚄\`\n\n> *『 ${code || 'ERRO'} 』— ɴᴀ̃ᴏ ғᴏɪ ᴘᴏssɪ́ᴠᴇʟ ᴄᴏɴᴄʟᴜɪʀ ᴀ ᴀᴄ̧ᴀ̃ᴏ ᴄᴏᴍ ᴇssᴇ ᴜsᴜᴀ́ʀɪᴏ.*`
}

exports.groupNameUsage = p => {
return `- 📝 Use: *${p}nomegp nome*`
}

exports.groupDescUsage = p => {
return `- 📝 Use: *${p}descgp texto*`
}

exports.welcomeUsage = p => {
return `- 👋 Use: *${p}legendabv sua legenda*
- 👋 Saída: *${p}legendasaiu sua legenda*

> *Tags:* #numero# • #numerodele# • #nome# • #nomegrupo# • #nomedogp# • #prefixo# • #nomedobot# • #nomebot# • #hora# • #dia# • #data# • #ano# • #year# • #yeah# • #estado# • #membros# • #descrição#`
}

exports.enterUsage = p => {
return `- 🔗 Use: *${p}entrar link*`
}

exports.tagDefault = () => {
return '📢 Aviso do administrador'
}

exports.noMembers = () => {
return '- ❌ Não consegui carregar os membros do grupo.'
}

exports.broadcastBody = text => {
return `📢 *AURORA SYSTEM*\n\n${text}`
}

exports.mediaInvalid = type => {
return `- ❌ A API não retornou ${type} válido.`
}

exports.noResult = () => {
return '- ❌ Nenhum resultado encontrado.'
}

exports.antiLink = () => {
return '- 🚫 Link detectado. Divulgação não permitida neste grupo.'
}

exports.antiMedia = kind => {
return `- 🚫 ${kind} bloqueado pelas configurações deste grupo.`
}

exports.antiFake = () => {
return '- 🚫 Número não permitido pelo AntiFake.'
}

exports.searchingAudio = () => {
return `⏤͟͟͞͞𝐁𝐮𝐬𝐜𝐚𝐧𝐝𝐨 𝐬𝐮𝐚 𝐦𝐮́𝐬𝐢𝐜𝐚... 𖤐⃝🎧`
}

exports.searchingVideo = () => {
return `⏤͟͟͞͞𝐁𝐮𝐬𝐜𝐚𝐧𝐝𝐨 𝐬𝐞𝐮 𝐯𝐢́𝐝𝐞𝐨... 𖤐⃝🎬`
}

exports.searchingDoc = () => {
return '- 📄 Preparando sua música em documento...'
}

exports.playUsage = p => {
return `⏤͟͟͞͞𝐂𝐨𝐦𝐨 𝐮𝐬𝐚𝐫 𝐨 𝐏𝐥𝐚𝐲! 𖤐⃝🎧\n•\n> *[🎵]* • Use: *${p}play nome da música*`
}

exports.playVideoUsage = p => {
return `⏤͟͟͞͞𝐂𝐨𝐦𝐨 𝐮𝐬𝐚𝐫 𝐨 𝐏𝐥𝐚𝐲 𝐕𝐢́𝐝𝐞𝐨! 𖤐⃝🎬\n•\n> *[🎥]* • Use: *${p}playvideo nome do vídeo*`
}

exports.playDocUsage = p => {
return `- 📄 Use: *${p}playdoc nome da música*`
}

exports.ytSearchUsage = p => {
return `- 🔎 Use: *${p}ytsearch pesquisa*`
}

exports.playResult = (info, type = 'audio', user = '') => {
const video = type === 'video'
const doc = type === 'doc'
const titulo = video ? '𝐕𝐢́𝐝𝐞𝐨 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐨!' : doc ? '𝐌𝐮́𝐬𝐢𝐜𝐚 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐚!' : '𝐌𝐮́𝐬𝐢𝐜𝐚 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐚!'
const emoji = video ? '🎬' : doc ? '📄' : '🎧'
const enviando = video ? '𝚟𝚒́𝚍𝚎𝚘' : doc ? '𝚍𝚘𝚌𝚞𝚖𝚎𝚗𝚝𝚘' : '𝚊́𝚞𝚍𝚒𝚘'
return `⏤͟͟͞͞${titulo} 𖤐⃝${emoji}
•
> ╭ ℹ️ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
> *[✏️]* • *𝚝𝚒́𝚝𝚞𝚕𝚘:* *${info.title || '-'}*
> *[⏱️]* • *ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ:* ${info.duration || '-'}
> *[👥]* • *ᴠɪᴇᴡs:* ${prettyNumber(info.views ?? '-')}
> *[👨‍🎤]* • *ᴀᴜᴛᴏʀ:* ${info.author || '-'}
> *[🔗]* • *ʟɪɴᴋ:* ${info.url || '-'}
•

> *[${emoji}]* • *𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚘 𝚜𝚎𝚞 ${enviando}*${user ? ` _${user}_` : ''}`
}

exports.ytSearch = items => {
return `╭─ ͡┄┄───────ׅ─ׅ─ׅ──ׂ─ׅ──────⟡\n├─ ⊹ 🔎 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐒𝐄𝐀𝐑𝐂𝐇\n${items.map((x,i)=>`┃ ${i+1}. ${x.title}\n┃ ${x.author} • ${x.duration}`).join('\n')}\n╰─ ͡┄┄───────ׂ─ׅ───ׂ─ׅ─ׅ───ׅ───⟡`
}

function auroraFooter() {
return `•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
}

function actionBy(admin = '') {
const n = String(admin || '').replace(/^@/, '')
return n ? `>\n> *[👤]* • *ᴀᴄ̧ᴀ̃ᴏ ᴅᴇ:* @${n}` : ''
}

exports.groupOpened = admin => `⏤͟͟͞͞𝐆𝐫𝐮𝐩𝐨 𝐚𝐛𝐞𝐫𝐭𝐨! 𖤐⃝🔓
•
> Todos os membros já podem enviar mensagens novamente. 💬
${actionBy(admin)}
${auroraFooter()}`

exports.groupClosed = admin => `⏤͟͟͞͞𝐆𝐫𝐮𝐩𝐨 𝐟𝐞𝐜𝐡𝐚𝐝𝐨! 𖤐⃝🔒
•
> Apenas administradores podem enviar mensagens agora. 🛡️
${actionBy(admin)}
${auroraFooter()}`

exports.groupLink = code => `⏤͟͟͞͞𝐋𝐢𝐧𝐤 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨! 𖤐⃝🔗
•
> https://chat.whatsapp.com/${code}
>
> ⚠️ Não compartilhe com pessoas desconhecidas.
${auroraFooter()}`

exports.groupNewLink = (code, admin) => `⏤͟͟͞͞𝐋𝐢𝐧𝐤 𝐫𝐞𝐝𝐞𝐟𝐢𝐧𝐢𝐝𝐨! 𖤐⃝♻️
•
> O link antigo do grupo não funciona mais.
>
> *[🔗]* • Um novo convite foi gerado.
${actionBy(admin)}
${auroraFooter()}`

exports.groupNameDone = admin => `⏤͟͟͞͞𝐍𝐨𝐦𝐞 𝐚𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐝𝐨! 𖤐⃝🏷️
•
> O nome do grupo foi alterado com sucesso.
${actionBy(admin)}
${auroraFooter()}`

exports.groupDescDone = admin => `⏤͟͟͞͞𝐃𝐞𝐬𝐜𝐫𝐢𝐜̧𝐚̃𝐨 𝐚𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐝𝐚! 𖤐⃝📝
•
> A descrição do grupo foi alterada com sucesso.
${actionBy(admin)}
${auroraFooter()}`

exports.added = (target = '', admin = '') => `⏤͟͟͞͞𝐍𝐨𝐯𝐨 𝐦𝐞𝐦𝐛𝐫𝐨! 𖤐⃝➕
•
> ${target ? `@${String(target).replace(/^@/, '')} foi adicionado ao grupo com sucesso. 💚` : 'Solicitação de adição enviada com sucesso. 💚'}
${actionBy(admin)}
${auroraFooter()}`

exports.welcomeSaved = admin => `⏤͟͟͞͞𝐁𝐨𝐚𝐬-𝐯𝐢𝐧𝐝𝐚𝐬 𝐚𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐝𝐚! 𖤐⃝👋
•
> A nova mensagem de entrada foi salva.
${actionBy(admin)}
${auroraFooter()}`

exports.groupInfo = (meta, jid) => {
return `- ⚙️ \`𝙸𝙽𝙵𝙾 𝙳𝙾 𝙶𝚁𝚄𝙿𝙾\`\n\n> *『 𝙽𝙾𝙼𝙴 』— ${meta.subject ?? '-'}*\n> *『 𝙼𝙴𝙼𝙱𝚁𝙾𝚂 』— ${meta.participants?.length ?? 0}*\n> *『 𝙸𝙳 』— ${jid}*`
}

exports.admins = list => {
return `- 👑 \`𝙰𝙳𝙼𝙸𝙽𝚂\`\n\n${list.map((p,i)=>`${i+1}. ${p.display || `@${String(p.displayJid || p.pnJid || p.jid || '').split('@')[0].split(':')[0]}`}`).join('\n') || 'Nenhum admin encontrado.'}`
}

exports.members = meta => {
return `- 👥 Grupo: ${meta.subject ?? '-'}\n- 👤 Membros: ${meta.participants?.length ?? 0}`
}

exports.muted = (n, admin = '') => `⏤͟͟͞͞𝐔𝐬𝐮𝐚́𝐫𝐢𝐨 𝐦𝐮𝐭𝐚𝐝𝐨! 𖤐⃝🔇
•
> @${String(n).replace(/^@/, '')} foi silenciado nos comandos do Aurora.
${actionBy(admin)}
${auroraFooter()}`

exports.unmuted = (n, admin = '') => `⏤͟͟͞͞𝐔𝐬𝐮𝐚́𝐫𝐢𝐨 𝐝𝐞𝐬𝐦𝐮𝐭𝐚𝐝𝐨! 𖤐⃝🔊
•
> @${String(n).replace(/^@/, '')} já pode usar os comandos novamente. 💚
${actionBy(admin)}
${auroraFooter()}`

exports.vipAdded = n => `⏤͟͟͞͞𝐍𝐨𝐯𝐨 𝐮𝐬𝐮𝐚́𝐫𝐢𝐨 𝐕𝐈𝐏! 𖤐⃝💎
•
> @${String(n).replace(/^@/, '')} agora possui acesso VIP no Aurora.
>
> *[🔥]* • Comandos exclusivos liberados.
> *[🎮]* • Free Fire VIP liberado.
${auroraFooter()}`

exports.vipRemoved = n => `⏤͟͟͞͞𝐕𝐈𝐏 𝐫𝐞𝐦𝐨𝐯𝐢𝐝𝐨! 𖤐⃝💔
•
> @${String(n).replace(/^@/, '')} não possui mais acesso VIP.
>
> *[🔒]* • Comandos exclusivos bloqueados.
${auroraFooter()}`

exports.userBlocked = n => `⏤͟͟͞͞𝐔𝐬𝐮𝐚́𝐫𝐢𝐨 𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨! 𖤐⃝🚫
•
> @${String(n).replace(/^@/, '')} foi bloqueado de usar o Aurora.
>
> *[🔒]* • Acesso aos comandos suspenso.
${auroraFooter()}`

exports.userUnblocked = n => `⏤͟͟͞͞𝐔𝐬𝐮𝐚́𝐫𝐢𝐨 𝐝𝐞𝐬𝐛𝐥𝐨𝐪𝐮𝐞𝐚𝐝𝐨! 𖤐⃝♻️
•
> @${String(n).replace(/^@/, '')} voltou a ter acesso ao Aurora. 💚
${auroraFooter()}`

exports.ownerUpdated = n => `⏤͟͟͞͞𝐀𝐥𝐭𝐞𝐫𝐚𝐜̧𝐚̃𝐨 𝐜𝐨𝐧𝐜𝐥𝐮𝐢́𝐝𝐚! 𖤐⃝✅
•
> ${n} atualizado com sucesso.
${auroraFooter()}`

exports.phoneUnavailable = () => {
return '- ❌ Não consegui resolver o número desse usuário. O WhatsApp só forneceu a identidade LID.'
}

exports.blockList = list => {
return `- 🚫 \`𝙱𝙻𝙾𝙲𝙺𝙻𝙸𝚂𝚃\`\n\n${list.map((x,i)=>`${i+1}. ${x}`).join('\n') || 'Lista vazia.'}`
}

exports.vipList = list => {
return `⏤͟͟͞͞𝐋𝐢𝐬𝐭𝐚 𝐕𝐈𝐏! 𖤐⃝💎
•
${list.map((x,i)=>`> *[${i+1}]* • @${String(x).replace(/\D/g, '')}`).join('\n') || '> Nenhum usuário VIP cadastrado.'}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
}
exports.premiumList = exports.vipList

exports.restarting = () => `⏤͟͟͞͞𝐑𝐞𝐢𝐧𝐢𝐜𝐢𝐚𝐧𝐝𝐨 𝐀𝐮𝐫𝐨𝐫𝐚... 𖤐⃝🔄
•
> Salvando os dados e reiniciando o sistema.
>
> *[⚙️]* • Aguarde a reconexão automática.
${auroraFooter()}`

exports.shuttingDown = () => `⏤͟͟͞͞𝐀𝐮𝐫𝐨𝐫𝐚 𝐝𝐞𝐬𝐥𝐢𝐠𝐚𝐧𝐝𝐨... 𖤐⃝📴
•
> Encerrando o sistema de forma segura.
>
> Até logo. 💚
${auroraFooter()}`

exports.leaving = () => `⏤͟͟͞͞𝐒𝐚𝐢𝐧𝐝𝐨 𝐝𝐨 𝐠𝐫𝐮𝐩𝐨... 𖤐⃝🚪
•
> Foi bom estar por aqui. Até outra hora! 💚
${auroraFooter()}`

exports.entered = () => `⏤͟͟͞͞𝐆𝐫𝐮𝐩𝐨 𝐜𝐨𝐧𝐞𝐜𝐭𝐚𝐝𝐨! 𖤐⃝📥
•
> O convite foi processado com sucesso. 💚
${auroraFooter()}`

exports.broadcastUsage = p => {
return `- 📢 Use: *${p}broadcast mensagem*`
}

exports.broadcastDone = n => {
return `- ✅ Broadcast concluído em ${n} grupo(s).`
}

exports.prefixUsage = p => {
return `- 🧩 Use: *${p}setprefix novo-prefixo*`
}

exports.prefixDone = p => {
return `- ✅ Prefixo alterado para: ${p}`
}

exports.groups = list => {
return `- 👥 \`𝙶𝚁𝚄𝙿𝙾𝚂\`\n\n${list.map((g,i)=>`${i+1}. ${g.subject ?? g.name ?? g.id ?? g.jid ?? 'Grupo'}`).join('\n') || 'Nenhum grupo encontrado.'}`
}

exports.ping = ({ version, node, latency, used, totalRam, commands, uptime, zapo }) => {
return `⏤͟͟͞͞𝐀𝐮𝐫𝐨𝐫𝐚 𝐨𝐧𝐥𝐢𝐧𝐞! 𖤐⃝⚡
•
> ╭ ℹ️ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
> *[⚡]* • *ʟᴀᴛᴇ̂ɴᴄɪᴀ:* ${latency}ms
> *[⏱️]* • *ᴜᴘᴛɪᴍᴇ:* ${uptime}
> *[🧠]* • *ʀᴀᴍ:* ${used.toFixed(1)} MB / ${totalRam.toFixed(1)} GB
> *[📚]* • *ᴄᴏᴍᴀɴᴅᴏs:* ${commands}
> *[🧩]* • *ᴠᴇʀsᴀ̃ᴏ:* ${version}
> *[🟢]* • *ɴᴏᴅᴇ:* ${node}
> *[🟢]* • *ᴢᴀᴘᴏ:* v${zapo || '-'}
•

> *[💚]* • *𝙰𝚞𝚛𝚘𝚛𝚊 𝚂𝚢𝚜𝚝𝚎𝚖 𝚎𝚜𝚝𝚊́ 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊𝚗𝚍𝚘 𝚗𝚘𝚛𝚖𝚊𝚕𝚖𝚎𝚗𝚝𝚎.*`
}

exports.instagramUsage = p => {
return `- 📸 Use: *${p}instagram link*`
}

exports.instagramNone = () => {
return '- ❌ Nenhuma mídia encontrada no Instagram.'
}

exports.instagramCaption = () => {
return '- 📸 `𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳`'
}

exports.tiktokUsage = p => {
return `⏤͟͟͞͞𝐂𝐨𝐦𝐨 𝐮𝐬𝐚𝐫 𝐨 𝐓𝐢𝐤𝐓𝐨𝐤! 𖤐⃝🎵\n•\n> *[🔗]* • Use: *${p}tiktok link*`
}

exports.tiktokNone = () => {
return '- ❌ Não encontrei o vídeo no retorno do TikTok.'
}

exports.tiktokCaption = (data, user = '') => {
return `⏤͟͟͞͞𝐕𝐢́𝐝𝐞𝐨 𝐝𝐨 𝐓𝐢𝐤𝐓𝐨𝐤 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐨! 𖤐⃝🎵
•
> ╭ ℹ️ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
> *[👤]* • *ᴀᴜᴛᴏʀ:* ${data.author || '-'}
> *[👁️]* • *ᴠɪᴇᴡs:* ${prettyNumber(data.views ?? '-')}
> *[❤️]* • *ᴄᴜʀᴛɪᴅᴀs:* ${prettyNumber(data.likes ?? '-')}
> *[💬]* • *ᴄᴏᴍᴇɴᴛᴀ́ʀɪᴏs:* ${prettyNumber(data.comments ?? '-')}
> *[🔁]* • *ᴄᴏᴍᴘᴀʀᴛɪʟʜᴀᴍᴇɴᴛᴏs:* ${prettyNumber(data.shares ?? '-')}${data.sourceUrl ? `\n> *[🔗]* • *ʟɪɴᴋ:* ${data.sourceUrl}` : ''}${data.title ? `\n> *[📝]* • *ᴅᴇsᴄʀɪᴄ̧ᴀ̃ᴏ:* ${data.title}` : ''}
•

> *[🎬]* • *𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚘 𝚜𝚎𝚞 𝚟𝚒́𝚍𝚎𝚘*${user ? ` _${user}_` : ''}`
}

exports.ffInfoUsage = p => {
return `- 🎮 Use: *${p}info uid*`
}

exports.ffLikeUsage = p => {
return `- 💚 Use: *${p}like uid*`
}

exports.ffAutoUsage = p => {
return `- ⚡ Use: *${p}autolike uid*`
}

exports.ffRemoveUsage = p => {
return `- 🗑️ Use: *${p}removelike uid*`
}

exports.ffInfoError = () => {
return 'Não foi possível consultar o jogador.'
}

exports.ffLikeError = () => {
return 'Não foi possível enviar os likes.'
}

exports.ffAutoError = () => {
return 'Não foi possível ativar o autolike.'
}

exports.ffListError = () => {
return 'Não foi possível listar os autolikes.'
}

exports.ffRemoveError = () => {
return 'Não foi possível remover o ID.'
}

exports.apiError = text => {
return `- ❌ ${text || 'Não foi possível concluir a solicitação.'}`
}

exports.ffInfo = d => {
return `- 🎮 \`𝙸𝙽𝙵𝙾 𝙵𝚁𝙴𝙴 𝙵𝙸𝚁𝙴\`\n\n- 👤 Nick: ${d.nick ?? '-'}\n- 🆔 UID: ${d.uid ?? '-'}\n- 🌎 Região: ${d.regiao ?? '-'}\n- 📊 Nível: ${d.nivel ?? '-'}\n- 💚 Likes: ${d.likes ?? '-'}\n- ⭐ Reputação: ${d.reputacao ?? '-'}`
}

exports.ffLike = (d, uid) => {
return `- 💚 \`𝙻𝙸𝙺𝙴𝚂 𝙴𝙽𝚅𝙸𝙰𝙳𝙾𝚂\`\n\n- 👤 Jogador: ${d.nick ?? '-'}\n- 🆔 UID: ${d.uid ?? uid}\n- ➕ Enviados: ${d.likes_enviados ?? '-'}\n- 📊 Antes: ${d.likes_antes ?? '-'}\n- 📊 Agora: ${d.likes_depois ?? '-'}`
}

exports.ffAuto = (d, uid) => {
return `- ⚡ \`𝙰𝚄𝚃𝙾𝙻𝙸𝙺𝙴\`\n\n- 🆔 UID: ${d.uid ?? uid}\n- 💚 Por envio: ${d.likes_por_envio ?? '-'}\n- 📦 Entregas: ${d.entregas ?? 0}\n- ✅ Entregues: ${d.likes_entregues ?? 0}`
}

exports.ffList = items => {
return `- 💚 \`𝙰𝚄𝚃𝙾𝙻𝙸𝙺𝙴𝚂\`\n\n${items.length ? items.slice(0,50).map((x,i)=>`${i+1}. ${x.uid ?? x.id ?? x}${x.nick ? ` • ${x.nick}` : ''}`).join('\n') : 'Nenhum ID cadastrado.'}`
}

exports.ffRemoved = uid => {
return `- ✅ Autolike removido.\n- 🆔 UID: ${uid}`
}

exports.welcome = (template, mentions) => {
const tags = mentions.map(j => `@${String(j).split('@')[0].split(':')[0]}`).join(' ')
return String(template || 'Bem-vindo(a), @user!').replace(/@user/gi, tags || '@user')
}


exports.menuMediaRequired = prefix => {
return `- 🖼️ \`𝙵𝙾𝚃𝙾 𝙳𝙾 𝙼𝙴𝙽𝚄\`\n\n> 💚 ׄ ( ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ғᴏᴛᴏ ᴏᴜ ᴠɪ́ᴅᴇᴏ ᴇ ᴜsᴇ ${prefix}fotomenu. )`
}
exports.menuMediaSaved = tipo => {
return `- ✅ \`𝙵𝙾𝚃𝙾 𝙳𝙾 𝙼𝙴𝙽𝚄\`\n\n> 💚 ׄ ( ${tipo === 'video' ? 'ᴠɪ́ᴅᴇᴏ ᴇᴍ ɢɪғ' : 'ғᴏᴛᴏ'} sᴀʟᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ. )`
}


exports.profile = ({ name, mention, bio, cargo, vip, commands, firstSeen, lastSeen, relationship, prefix }) => {
return `⏤͟͟͞͞𝐏𝐞𝐫𝐟𝐢𝐥 𝐝𝐨 𝐀𝐮𝐫𝐨𝐫𝐚! 𖤐⃝👤
•
> ╭ 👤 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂̧𝐎̃𝐄𝐒
> *[👤]* • *ɴᴏᴍᴇ:* *${name || 'Usuário'}*
> *[🔖]* • *ᴜsᴜᴀ́ʀɪᴏ:* ${mention || '-'}
> *[📝]* • *ʙɪᴏ:* ${bio || 'Sem bio definida.'}
> *[🛡️]* • *ᴄᴀʀɢᴏ:* ${cargo || 'Membro'}
> *[💎]* • *ᴠɪᴘ:* ${vip ? 'Sim ✅' : 'Não ❌'}
> *[📊]* • *ᴄᴏᴍᴀɴᴅᴏs ᴜsᴀᴅᴏs:* ${Number(commands || 0)}
> *[💞]* • *ʀᴇʟᴀᴄɪᴏɴᴀᴍᴇɴᴛᴏ:* ${relationship || 'Solteiro(a)'}
> *[📅]* • *ɴᴏ ᴀᴜʀᴏʀᴀ ᴅᴇsᴅᴇ:* ${prettyDate(firstSeen)}
> *[🕒]* • *ᴜ́ʟᴛɪᴍᴀ ᴀᴛɪᴠɪᴅᴀᴅᴇ:* ${prettyDateTime(lastSeen)}
•

> *[✏️]* • *𝙿𝚊𝚛𝚊 𝚎𝚍𝚒𝚝𝚊𝚛 𝚜𝚞𝚊 𝚋𝚒𝚘: ${prefix}𝚜𝚎𝚝𝚋𝚒𝚘 𝚜𝚞𝚊 𝚋𝚒𝚘*`
}

exports.bioUsage = p => {
return `⏤͟͟͞͞𝐄𝐝𝐢𝐭𝐚𝐫 𝐛𝐢𝐨! 𖤐⃝✏️\n•\n> *[📝]* • Use: *${p}setbio sua bio*\n> *[🗑️]* • Para limpar: *${p}setbio apagar*`
}

exports.bioSaved = bio => {
return `⏤͟͟͞͞𝐁𝐢𝐨 𝐚𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐝𝐚! 𖤐⃝✅\n•\n> *[📝]* • *ʙɪᴏ:* ${bio}`
}

export default exports
