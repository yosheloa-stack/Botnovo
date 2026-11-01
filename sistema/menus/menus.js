const exports = {}

// Traduz somente os rótulos do menu; nomes de comandos permanecem iguais.
const traduzirMenu = (texto, idioma = 'pt') => {
 const lang = String(idioma || 'pt').toLowerCase().slice(0, 2)
 if (!['en','es'].includes(lang)) return texto
 const labels = {
 'ᴜsᴜᴀ́ʀɪᴏ': ['ᴜsᴇʀ','ᴜsᴜᴀʀɪᴏ'],
 'ᴄᴀʀɢᴏ': ['ʀᴏʟᴇ','ʀᴏʟ'],
 'ᴠɪᴘ': ['ᴠɪᴘ','ᴠɪᴘ'],
 'ᴘʀᴇғɪxᴏ': ['ᴘʀᴇғɪx','ᴘʀᴇғɪᴊᴏ'],
 'ʜᴏʀᴀ': ['ᴛɪᴍᴇ','ʜᴏʀᴀ'],
 'ɢʀᴜᴘᴏ': ['ɢʀᴏᴜᴘ','ɢʀᴜᴘᴏ'],
 'Dono': ['Owner','Dueño'],
 'Membro': ['Member','Miembro'],
 'Não ❌': ['No ❌','No ❌'],
 'Sim ✅': ['Yes ✅','Sí ✅'],
 '𝑴𝑬𝑵𝑼𝑺': ['𝑴𝑬𝑵𝑼𝑺','𝑴𝑬𝑵𝑼́𝑺'],
 '𝑷𝑬𝑹𝑭𝑰𝑳': ['𝑷𝑹𝑶𝑭𝑰𝑳𝑬','𝑷𝑬𝑹𝑭𝑰𝑳']
 }
 let result = texto
 for (const [source, values] of Object.entries(labels)) result = result.split(source).join(values[lang === 'en' ? 0 : 1])
 return result
}


exports.menuPrincipal = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo, idioma = 'pt') => {
return traduzirSubmenu(`┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • ${NomeDoBot.toUpperCase()} • 💚 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝑴𝑬𝑵𝑼𝑺 • ✨ 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 💎 ${prefix}menuff
┃╎୨୧ 🎭 ${prefix}menubn
┃╎୨୧ 🛡️ ${prefix}menuadm
┃╎୨୧ 👑 ${prefix}menudono
┃╎୨୧ 📥 ${prefix}menudown
┃╎୨୧ 🖼️ ${prefix}menufig
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑷𝑬𝑹𝑭𝑰𝑳 • 👤 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 👤 ${prefix}perfil
┃╎୨୧ ✏️ ${prefix}setbio sua bio
┃╎୨୧ 👑 ${prefix}criador
┃╎୨୧ 👁️ ${prefix}revelar
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝒀𝑶𝑺𝑯 𝑰𝑨 • 🤖 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🤖 ${prefix}yosh texto
┃╎୨୧ 🎨 ${prefix}yosh imagem texto
┃╎୨୧ ❔ ${prefix}yosh ajuda
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`, idioma)
}

exports.adms = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo) => {
return `┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • ${NomeDoBot.toUpperCase()} ADM • 🛡️ 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝑮𝑹𝑼𝑷𝑶 • 👥 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🔓 ${prefix}abrir
┃╎୨୧ 🔒 ${prefix}fechar
┃╎୨୧ ⏰ ${prefix}closegp 22:00
┃╎୨୧ ⏰ ${prefix}opengp 07:00
┃╎୨୧ 🗑️ ${prefix}rm_closegp
┃╎୨୧ ℹ️ ${prefix}infoclosegp
┃╎୨୧ ➕ ${prefix}add numero
┃╎୨୧ 🥾 ${prefix}ban @usuario
┃╎୨୧ ⬆️ ${prefix}promover @usuario
┃╎୨୧ ⬇️ ${prefix}rebaixar @usuario
┃╎୨୧ 🔗 ${prefix}linkgp
┃╎୨୧ ♻️ ${prefix}revoke
┃╎୨୧ 🏷️ ${prefix}nomegp nome
┃╎୨୧ 📝 ${prefix}descgp texto
┃╎୨୧ 📢 ${prefix}marcar texto
┃╎୨୧ 📢 ${prefix}hidetag texto
┃╎୨୧ 📢 ${prefix}totag texto
┃╎୨୧ 👑 ${prefix}admins
┃╎୨୧ 👥 ${prefix}membros
┃╎୨୧ ℹ️ ${prefix}gpinfo
┃╎୨୧ 📊 ${prefix}status
┃╎୨୧ 👤 ${prefix}soli
┃╎୨୧ 🔇 ${prefix}mutar @usuario
┃╎୨୧ 🔊 ${prefix}desmutar @usuario
┃╎୨୧ ✏️ ${prefix}msg novo texto
┃╎୨୧ 🗑️ ${prefix}apagar
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑷𝑹𝑶𝑻𝑬𝑪̧𝑶̃𝑬𝑺 • 🛡️ 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🎮 ${prefix}configurarff 3\n┃╎୨୧ ⚙️ ${prefix}ativacoes
┃╎୨୧ ⚠️ ${prefix}adv @usuario motivo
┃╎୨୧ ♻️ ${prefix}deladv @usuario
┃╎୨୧ 📋 ${prefix}advlist
┃╎୨୧ 🚫 ${prefix}blockcmd comando
┃╎୨୧ ✅ ${prefix}unblockcmd comando
┃╎୨୧ 📋 ${prefix}listblock
┃╎୨୧ 🛡️ ${prefix}antifake 1/0
┃╎୨୧ 🔗 ${prefix}antilink 1/0
┃╎୨୧ 🎧 ${prefix}antiaudio 1/0
┃╎୨୧ 🎬 ${prefix}antivideo 1/0
┃╎୨୧ 🖼️ ${prefix}antifoto 1/0
┃╎୨୧ 🎭 ${prefix}antisticker 1/0
┃╎୨୧ 📄 ${prefix}antidocumento 1/0
┃╎୨୧ 📱 ${prefix}antistatus 1/0
┃╎୨୧ 📢 ${prefix}anticanal 1/0
┃╎୨୧ 👁️ ${prefix}antivisu 1/0
┃╎୨୧ 🎥 ${prefix}x9viewonce 1/0
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑺𝑰𝑺𝑻𝑬𝑴𝑨𝑺 • ⚙️ 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 👋 ${prefix}bemvindo 1/0
┃╎୨୧ ℹ️ ${prefix}infobemvindo
┃╎୨୧ ✍️ ${prefix}legendabv texto
┃╎୨୧ 👋 ${prefix}legendasaiu texto
┃╎୨୧ 🖼️ ${prefix}fundobv (foto/vídeo)
┃╎୨୧ 🎞️ ${prefix}fundosaiu (foto/vídeo)
┃╎୨୧ ✨ ${prefix}autosticker 1/0
┃╎୨୧ 🚫 ${prefix}autoban 1/0
┃╎୨୧ 👑 ${prefix}soadm 1/0
┃╎୨୧ 👀 ${prefix}x9 1/0
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`
}

exports.menudono = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo) => {
return `┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 𝑫𝑶𝑵𝑶 • 👑 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝑺𝑰𝑺𝑻𝑬𝑴𝑨 • ⚙️ 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🔣 ${prefix}setprefix !
┃╎୨୧ 🖼️ ${prefix}fotomenu (foto/vídeo)
┃╎୨୧ 🏷️ ${prefix}nomebot nome
┃╎୨୧ 📸 ${prefix}fotobot (foto)
┃╎୨୧ 🔄 ${prefix}reiniciar
┃╎୨୧ 📴 ${prefix}botoff
┃╎୨୧ 🟢 ${prefix}boton
┃╎୨୧ 🧹 ${prefix}limparcache
┃╎୨୧ 🚷 ${prefix}antipv 1/0
┃╎୨୧ ✅ ${prefix}verificado 1/0
┃╎୨୧ 🔘 ${prefix}botoes 1/0
┃╎୨୧ 📢 ${prefix}rgchannel link
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑺𝑼𝑩𝑫𝑶𝑵𝑶𝑺 • 🤝 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ ➕ ${prefix}addsubdono @usuario
┃╎୨୧ ➖ ${prefix}delsubdono @usuario
┃╎୨୧ 📋 ${prefix}subdonos
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑼𝑺𝑼𝑨́𝑹𝑰𝑶𝑺 • 👤 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🚫 ${prefix}blockuser @usuario
┃╎୨୧ ♻️ ${prefix}unblockuser @usuario
┃╎୨୧ 📋 ${prefix}blocklist
┃╎୨୧ 💎 ${prefix}addvip @usuario
┃╎୨୧ 💔 ${prefix}delvip @usuario
┃╎୨୧ 📋 ${prefix}viplist
┃╎୨୧ 🔒 ${prefix}addcmdvip comando
┃╎୨୧ 🔓 ${prefix}delcmdvip comando
┃╎୨୧ 📋 ${prefix}listcmdvip
┃╎୨୧ 🚫 ${prefix}blockcmdg comando
┃╎୨୧ ✅ ${prefix}unblockcmdg comando
┃╎୨୧ 📋 ${prefix}listbcmdglobal
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑮𝑹𝑼𝑷𝑶𝑺 • 👥 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 📥 ${prefix}entrar link
┃╎୨୧ 🚪 ${prefix}sairgp
┃╎୨୧ 👥 ${prefix}listagp
┃╎୨୧ 🚫 ${prefix}bangp
┃╎୨୧ ✅ ${prefix}unbangp [id]
┃╎୨୧ 📋 ${prefix}bangplist
┃╎୨୧ 🏠 ${prefix}modoaluguel 1/0
┃╎୨୧ 🗓️ ${prefix}rgaluguel dias
┃╎୨୧ 🗑️ ${prefix}delaluguel
┃╎୨୧ 📋 ${prefix}listaaluguel
┃╎୨୧ 📢 ${prefix}broadcast texto
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`
}

exports.downloads = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo) => {
return `┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 𝑫𝑶𝑾𝑵 • 📥 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝒀𝑶𝑼𝑻𝑼𝑩𝑬 • 🎵 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🎧 ${prefix}play nome
┃╎୨୧ 🎬 ${prefix}playvideo nome
┃╎୨୧ 📄 ${prefix}playdoc nome
┃╎୨୧ 🔎 ${prefix}ytsearch nome
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑹𝑬𝑫𝑬𝑺 • 🌐 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🎵 ${prefix}tiktok link
┃╎୨୧ 📸 ${prefix}instagram link
┃╎୨୧ 🎧 ${prefix}spotify música/link
┃╎୨୧ 🎬 ${prefix}kwai link
┃╎୨୧ 📘 ${prefix}facebook link
┃╎୨୧ 📌 ${prefix}pinterest link
┃╎୨୧ 🔎 ${prefix}pinsearch pesquisa
┃╎୨୧ 🍎 ${prefix}applemusic música/link
┃╎୨୧ ☁️ ${prefix}soundcloud música/link
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑼𝑷𝑳𝑶𝑨𝑫 • 🔗 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🔗 ${prefix}upload — responda um arquivo
┃╎୨୧ 🖼️ ${prefix}imgpralink — responda uma foto
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`
}

exports.menuff = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo) => {
return `┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 𝑭𝑹𝑬𝑬 𝑭𝑰𝑹𝑬 • 💎 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝑭𝑹𝑬𝑬 𝑭𝑰𝑹𝑬 • 🔥 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ ℹ️ ${prefix}info uid
┃╎୨୧ 💚 ${prefix}like uid (todos)
┃╎୨୧ 🎮 ${prefix}configurarff 3 (ADM)
┃╎୨୧ ⚡ ${prefix}autolike uid (VIP)
┃╎୨୧ 📋 ${prefix}listalike
┃╎୨୧ 🗑️ ${prefix}removelike uid
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`
}


exports.brincadeiras = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo) => {
return `┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 𝑩𝑹𝑰𝑵𝑪𝑨𝑫𝑬𝑰𝑹𝑨𝑺 • 🎭 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝑱𝑶𝑮𝑶𝑺 & 𝑪𝑨𝑺𝑨𝑳 • 🎮 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ ❎ ${prefix}jogov @usuario
┃╎୨୧ 😸 ${prefix}vab
┃╎୨୧ 🤔 ${prefix}eununca
┃╎୨୧ 💍 ${prefix}namorar @usuario
┃╎୨୧ ❌ ${prefix}cancelar
┃╎୨୧ 💔 ${prefix}terminar
┃╎୨୧ ❤️ ${prefix}minhadupla
┃╎୨୧ 💘 ${prefix}shipo @usuario
┃╎୨୧ 💞 ${prefix}casal
┃╎୨୧ 💑 ${prefix}metadinha
┃╎୨୧ 🌟 ${prefix}chance texto
┃╎୨୧ 🎭 ${prefix}dogolpe @usuario
┃╎୨୧ ☠️ ${prefix}morte nome
┃╎୨୧ 😈 ${prefix}surubao quantidade
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑪̧𝑶̃𝑬𝑺 • 💥 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🫂 ${prefix}abraco @usuario
┃╎୨୧ 💋 ${prefix}beijo @usuario
┃╎୨୧ 😈 ${prefix}boquete @usuario
┃╎୨୧ 💩 ${prefix}cagar @usuario
┃╎୨୧ 🌱 ${prefix}capinarlote @usuario
┃╎୨୧ 💚 ${prefix}carinho @usuario
┃╎୨୧ 🦵 ${prefix}chute @usuario
┃╎୨୧ 😹 ${prefix}comer @usuario
┃╎୨୧ 😈 ${prefix}gozar @usuario
┃╎୨୧ 😈 ${prefix}leitada @usuario
┃╎୨୧ 🍽️ ${prefix}louca @usuario
┃╎୨୧ 😵 ${prefix}matar @usuario
┃╎୨୧ 😬 ${prefix}morder @usuario
┃╎୨୧ 🍑 ${prefix}pgbunda @usuario
┃╎୨୧ 🍆 ${prefix}pgpau @usuario
┃╎୨୧ 🫦 ${prefix}pgpeito @usuario
┃╎୨୧ 😹 ${prefix}sentar @usuario
┃╎୨୧ 🥊 ${prefix}soco @usuario
┃╎୨୧ 👋 ${prefix}tapa @usuario
┃╎୨୧ 📸 ${prefix}tirarft @usuario
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑴𝑬𝑫𝑰𝑫𝑶𝑹𝑬𝑺 • 📊 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 😴 ${prefix}baiana @usuario
┃╎୨୧ 💤 ${prefix}baiano @usuario
┃╎୨୧ 🍺 ${prefix}bebado @usuario
┃╎୨୧ 😂 ${prefix}beta @usuario
┃╎୨୧ 🌴 ${prefix}carioca @usuario
┃╎୨୧ 🐂 ${prefix}corno @usuario
┃╎୨୧ 🍑 ${prefix}cu @usuario
┃╎୨୧ 👹 ${prefix}feio @usuario
┃╎୨୧ 💍 ${prefix}fiel @usuario
┃╎୨୧ 🚬 ${prefix}fumar @usuario
┃╎୨୧ 🐮 ${prefix}gado @usuario
┃╎୨୧ 🏳️‍🌈 ${prefix}gay @usuario
┃╎୨୧ 🔥 ${prefix}gostosa @usuario
┃╎୨୧ 🔥 ${prefix}gostoso @usuario
┃╎୨୧ ✨ ${prefix}linda @usuario
┃╎୨୧ ✨ ${prefix}lindo @usuario
┃╎୨୧ 🤪 ${prefix}louco @usuario
┃╎୨୧ 🐒 ${prefix}macaca @usuario
┃╎୨୧ 🐒 ${prefix}macaco @usuario
┃╎୨୧ 📊 ${prefix}nazista @usuario
┃╎୨୧ 📊 ${prefix}puta @usuario
┃╎୨୧ 😏 ${prefix}safada @usuario
┃╎୨୧ 😏 ${prefix}safado @usuario
┃╎୨୧ 🗿 ${prefix}sigma @usuario
┃╎୨୧ 👀 ${prefix}vesgo @usuario
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑹𝑨𝑵𝑲𝑺 • 🏆 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 😴 ${prefix}rankbaiana
┃╎୨୧ 💤 ${prefix}rankbaiano
┃╎୨୧ 📊 ${prefix}rankbct
┃╎୨୧ 😂 ${prefix}rankbeta
┃╎୨୧ 🌴 ${prefix}rankcarioca
┃╎୨୧ 💞 ${prefix}rankcasalzin
┃╎୨୧ 🐂 ${prefix}rankcorno
┃╎୨୧ 🍑 ${prefix}rankcu
┃╎୨୧ 💸 ${prefix}rankfalido
┃╎୨୧ 🚬 ${prefix}rankfumar
┃╎୨୧ 🐮 ${prefix}rankgado
┃╎୨୧ 🏳️‍🌈 ${prefix}rankgay
┃╎୨୧ 😏 ${prefix}rankgostosas
┃╎୨୧ 🔥 ${prefix}rankgostosos
┃╎୨୧ 🤪 ${prefix}ranklouca
┃╎୨୧ 🤪 ${prefix}ranklouco
┃╎୨୧ 🐒 ${prefix}rankmacaca
┃╎୨୧ 🐒 ${prefix}rankmacaco
┃╎୨୧ 📊 ${prefix}ranknazista
┃╎୨୧ ㊙ ${prefix}rankotaku
┃╎୨୧ 🍆 ${prefix}rankpau
┃╎୨୧ 📊 ${prefix}rankputa
┃╎୨୧ 😏 ${prefix}ranksafada
┃╎୨୧ 🥵 ${prefix}ranksafado
┃╎୨୧ 🗿 ${prefix}ranksigma
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑬𝑿𝑻𝑹𝑨𝑺 𝑫𝑶 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ ✊ ${prefix}ppt pedra/papel/tesoura
┃╎୨୧ ♻️ ${prefix}rv
┃╎୨୧ 😼 ${prefix}cantada
┃╎୨୧ 💭 ${prefix}conselho
┃╎୨୧ 🧠 ${prefix}fatos
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ 84 comandos-base da Akame • 123 nomes/aliases
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`
}


exports.fig = (NomeDoBot, pushname, isCargo, isChVip, hora, prefix, grupo, zapo) => {
return `┏╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┓
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 𝑭𝑰𝑮 • 🖼️ 〕
┃
┃╎୨୧ 👤 ᴜsᴜᴀ́ʀɪᴏ: ${pushname}
┃╎୨୧ 🛡️ ᴄᴀʀɢᴏ: ${isCargo}
┃╎୨୧ 💎 ᴠɪᴘ: ${isChVip ? 'Sim ✅' : 'Não ❌'}
┃╎୨୧ ⚡ ᴘʀᴇғɪxᴏ: 「 ${prefix} 」
┃╎୨୧ 🕐 ʜᴏʀᴀ: ${hora}
┃╎୨୧ 👥 ɢʀᴜᴘᴏ: ${grupo}
┃╎୨୧ 🟢 ᴢᴀᴘᴏ: v${zapo}
┃
┣━〔 • 𝑭𝑰𝑮𝑼𝑹𝑰𝑵𝑯𝑨𝑺 • ✨ 〕
┃
┃╭╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╮
┃╎୨୧ 🖼️ ${prefix}fig — responda foto/vídeo
┃╎୨୧ 😂 ${prefix}figumeme 1/10
┃╎୨୧ 😡 ${prefix}figuraiva 1/10
┃╎୨୧ 💬 ${prefix}brat texto
┃╎୨୧ 🎞️ ${prefix}bratvid texto
┃╎୨୧ 💬 ${prefix}blade texto
┃╎୨୧ 🎞️ ${prefix}bladevd texto
┃╰╾ׁ═╼〔 • ❦ • 〕╾ׁ═╼╯
┃
┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕
┃╎୨୧ ✰ۣۜۜ͜͡ ${NomeDoBot.toUpperCase()}
┃╎୨୧ ᴅᴇᴠ: YoshiGGX
┃
┗╾ׁ═╼･ﾟ♡ﾟ･｡💚｡･ﾟ♡ﾟ･╾ᷓ═╼┛`
}

// Todos os submenus recebem o idioma como 9º argumento de menuData.
// Mantemos nomes de comandos intactos para não quebrar o prefixo.
// Tradução de textos de ajuda, sem alterar o nome de nenhum comando.
// O idioma do grupo é recebido de menuData na posição 9.
const menuHelp = {
  en: {
    'numero':'number', 'nome':'name', 'texto':'text', 'motivo':'reason',
    'novo texto':'new text', 'sua bio':'your bio',
    'foto/vídeo':'photo/video', 'responda foto/vídeo':'reply to a photo/video',
    'pedra/papel/tesoura':'rock/paper/scissors',
    'comandos-base da Akame':'Akame base commands',
    '@usuario':'@user', 'grupo':'group', 'Limite':'Limit'
  },
  es: {
    'numero':'número', 'nome':'nombre', 'texto':'texto', 'motivo':'motivo',
    'novo texto':'texto nuevo', 'sua bio':'tu biografía',
    'foto/vídeo':'foto/video', 'responda foto/vídeo':'responde a una foto/video',
    'pedra/papel/tesoura':'piedra/papel/tijera',
    'comandos-base da Akame':'comandos base de Akame',
    '@usuario':'@usuario', 'grupo':'grupo'
  }
}
const menuSections = {
  en: [
    ['𝑮𝑹𝑼𝑷𝑶','𝑮𝑹𝑶𝑼𝑷'], ['𝑷𝑹𝑶𝑻𝑬𝑪̧𝑶̃𝑬𝑺','𝑷𝑹𝑶𝑻𝑬𝑪𝑻𝑰𝑶𝑵'],
    ['𝑺𝑰𝑺𝑻𝑬𝑴𝑨𝑺','𝑺𝒀𝑺𝑻𝑬𝑴𝑺'], ['𝑭𝑰𝑮𝑼𝑹𝑰𝑵𝑯𝑨𝑺','𝑺𝑻𝑰𝑪𝑲𝑬𝑹𝑺'],
    ['𝑩𝑹𝑰𝑵𝑪𝑨𝑫𝑬𝑰𝑹𝑨𝑺','𝑮𝑨𝑴𝑬𝑺'],
    ['𝑬𝑿𝑻𝑹𝑨𝑺 𝑫𝑶 𝑨𝑼𝑹𝑶𝑹𝑨','𝑨𝑼𝑹𝑶𝑹𝑨 𝑬𝑿𝑻𝑹𝑨𝑺']
  ],
  es: [
    ['𝑷𝑹𝑶𝑻𝑬𝑪̧𝑶̃𝑬𝑺','𝑷𝑹𝑶𝑻𝑬𝑪𝑪𝑰𝑶𝑵𝑬𝑺'],
    ['𝑭𝑰𝑮𝑼𝑹𝑰𝑵𝑯𝑨𝑺','𝑺𝑻𝑰𝑪𝑲𝑬𝑹𝑺'],
    ['𝑩𝑹𝑰𝑵𝑪𝑨𝑫𝑬𝑰𝑹𝑨𝑺','𝑱𝑼𝑬𝑮𝑶𝑺'],
    ['𝑬𝑿𝑻𝑹𝑨𝑺 𝑫𝑶 𝑨𝑼𝑹𝑶𝑹𝑨','𝑬𝑿𝑻𝑹𝑨𝑺 𝑫𝑬 𝑨𝑼𝑹𝑶𝑹𝑨']
  ]
}
function traduzirSubmenu(texto, idioma) {
  const lang = String(idioma || 'pt').toLowerCase().slice(0, 2)
  if (!['en','es'].includes(lang)) return texto
  let saida = traduzirMenu(texto, lang)
  for (const [from,to] of menuSections[lang]) saida = saida.split(from).join(to)
  // Traduza somente argumentos explicativos após o comando; nunca o comando.
  const dict = menuHelp[lang]
  saida = saida.replace(/(#[a-z0-9_]+)([^\n]*)/gi, (_, cmd, suffix) => {
    let help = suffix
    for (const [from,to] of Object.entries(dict).sort((a,b)=>b[0].length-a[0].length)) {
      help = help.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'g'), to)
    }
    return cmd + help
  })
  return saida
}
for (const key of ['adms','menudono','downloads','menuff','brincadeiras','fig']) {
  const original = exports[key]
  if (typeof original !== 'function') continue
  exports[key] = (...args) => traduzirSubmenu(original(...args), args[8])
}

exports.menu = exports.menuPrincipal
exports.menuadm = exports.adms
exports.menudown = exports.downloads
exports.menudao = exports.downloads
exports.menudownload = exports.downloads
exports.menudownloads = exports.downloads
exports.menubn = exports.brincadeiras
exports.menufig = exports.fig
exports.menufigs = exports.fig

export default exports
