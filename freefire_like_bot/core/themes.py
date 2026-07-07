"""
🎨 TEMAS / LAYOUTS do bot.

Cada tema é um conjunto de textos. Para trocar o visual do bot inteiro
basta mudar ACTIVE_THEME no .env (fire | neon | clean | premium).

Todos os textos usam HTML do Telegram (<b>, <i>, <code>, etc).
Os campos {placeholder} são preenchidos na hora de enviar.
"""

# ---------------------------------------------------------------------------
# 🔥 TEMA "fire" — estilo gamer / Free Fire, agressivo com fogo
# ---------------------------------------------------------------------------
FIRE = {
    "emoji": "🔥",
    "welcome": (
        "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n"
        "     <b>{bot_name}</b>\n"
        "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n\n"
        "Fala, <b>{user}</b>! 👋\n\n"
        "Bem-vindo ao melhor bot de <b>LIKE de Free Fire</b>! 🎮\n"
        "Manda o teu <b>ID</b> e eu encho teu perfil de likes. 💥\n\n"
        "Escolhe uma opção aí embaixo 👇"
    ),
    "menu_title": "🔥 <b>MENU PRINCIPAL</b> 🔥",
    "ask_uid": (
        "🎯 <b>ENVIAR LIKE</b>\n\n"
        "Digita o <b>ID (UID)</b> do jogador que vai receber os likes:\n\n"
        "<i>Ex:</i> <code>123456789</code>"
    ),
    "processing": "🔥 <b>Mandando os likes...</b> segura aí que já vai! ⏳",
    "success": (
        "✅🔥 <b>LIKES ENVIADOS COM SUCESSO!</b> 🔥✅\n\n"
        "👤 <b>Jogador:</b> {nickname}\n"
        "🆔 <b>ID:</b> <code>{uid}</code>\n"
        "🌎 <b>Região:</b> {region}\n"
        "━━━━━━━━━━━━━━━━━━\n"
        "❤️ <b>Likes antes:</b> {likes_before}\n"
        "❤️‍🔥 <b>Likes agora:</b> {likes_after}\n"
        "➕ <b>Adicionados:</b> {likes_added}\n"
        "━━━━━━━━━━━━━━━━━━\n"
        "🔥 <i>Bora pro topo!</i>"
    ),
    "fail_max": (
        "⚠️ <b>Esse jogador já está no limite de likes de hoje!</b>\n\n"
        "🆔 <code>{uid}</code>\n"
        "🕐 Tenta de novo amanhã, campeão. 🔥"
    ),
    "fail_generic": (
        "❌ <b>Não consegui enviar os likes.</b>\n\n"
        "Confere se o <b>ID</b> está certo e tenta de novo.\n"
        "<i>{error}</i>"
    ),
    "limit_reached": (
        "🚫 <b>Você já usou seu like de hoje!</b>\n\n"
        "Volta amanhã pra mandar mais. 🔥"
    ),
}

# ---------------------------------------------------------------------------
# ⚡ TEMA "neon" — cyberpunk / futurista, caixas e brilho
# ---------------------------------------------------------------------------
NEON = {
    "emoji": "⚡",
    "welcome": (
        "╔═══════════════════╗\n"
        "   ⚡ <b>{bot_name}</b> ⚡\n"
        "╚═══════════════════╝\n\n"
        "◈ Olá, <b>{user}</b>\n"
        "◈ Sistema de <b>LIKE</b> Free Fire online ✅\n"
        "◈ Envie um <b>UID</b> e receba likes instantâneos.\n\n"
        "▼ Selecione uma opção ▼"
    ),
    "menu_title": "⚡ <b>P A I N E L   D E   C O N T R O L E</b> ⚡",
    "ask_uid": (
        "◈ <b>MÓDULO DE LIKE</b> ◈\n\n"
        "▸ Insira o <b>UID</b> alvo:\n\n"
        "<code>&gt;&gt; 123456789</code>"
    ),
    "processing": "⚡ <b>Processando requisição...</b> ▰▰▰▱▱",
    "success": (
        "╔═══════════════════╗\n"
        "  ✅ <b>LIKE ENVIADO</b> ✅\n"
        "╚═══════════════════╝\n\n"
        "◈ <b>Player:</b> {nickname}\n"
        "◈ <b>UID:</b> <code>{uid}</code>\n"
        "◈ <b>Região:</b> {region}\n"
        "───────────────────\n"
        "◈ Antes ▸ <b>{likes_before}</b>\n"
        "◈ Agora ▸ <b>{likes_after}</b>\n"
        "◈ Adicionados ▸ <b>+{likes_added}</b>\n"
        "───────────────────\n"
        "⚡ <i>Conexão finalizada.</i>"
    ),
    "fail_max": (
        "⚠️ <b>LIMITE ATINGIDO</b>\n\n"
        "◈ UID <code>{uid}</code> já recebeu o máximo de likes hoje.\n"
        "◈ Reabastecimento em 24h."
    ),
    "fail_generic": (
        "⛔ <b>FALHA NA OPERAÇÃO</b>\n\n"
        "◈ Verifique o UID e tente novamente.\n"
        "<i>{error}</i>"
    ),
    "limit_reached": (
        "🚫 <b>ACESSO LIMITADO</b>\n\n"
        "◈ Seu envio diário já foi utilizado.\n"
        "◈ Retorne em 24h."
    ),
}

# ---------------------------------------------------------------------------
# 🤍 TEMA "clean" — minimalista, elegante, poucos emojis
# ---------------------------------------------------------------------------
CLEAN = {
    "emoji": "🤍",
    "welcome": (
        "<b>{bot_name}</b>\n"
        "Likes para Free Fire\n\n"
        "Olá, {user}.\n"
        "Envie o ID de um jogador e ele receberá likes.\n\n"
        "Use o menu abaixo para começar."
    ),
    "menu_title": "<b>Menu</b>",
    "ask_uid": (
        "<b>Enviar Like</b>\n\n"
        "Envie o ID (UID) do jogador:\n"
        "<code>123456789</code>"
    ),
    "processing": "Enviando likes...",
    "success": (
        "<b>Like enviado ✓</b>\n\n"
        "Jogador: {nickname}\n"
        "ID: <code>{uid}</code>\n"
        "Região: {region}\n\n"
        "Antes: {likes_before}\n"
        "Agora: {likes_after}\n"
        "Adicionados: +{likes_added}"
    ),
    "fail_max": (
        "<b>Limite atingido</b>\n\n"
        "O ID <code>{uid}</code> já recebeu o máximo de likes hoje.\n"
        "Tente novamente amanhã."
    ),
    "fail_generic": (
        "<b>Não foi possível enviar</b>\n\n"
        "Verifique o ID e tente novamente.\n"
        "{error}"
    ),
    "limit_reached": (
        "<b>Limite diário</b>\n\n"
        "Você já usou seu envio de hoje. Volte amanhã."
    ),
}

# ---------------------------------------------------------------------------
# 💎 TEMA "premium" — VIP / dourado, sensação de exclusivo
# ---------------------------------------------------------------------------
PREMIUM = {
    "emoji": "💎",
    "welcome": (
        "✦ ═══════════════ ✦\n"
        "   💎 <b>{bot_name}</b> 💎\n"
        "✦ ═══════════════ ✦\n\n"
        "Seja bem-vindo(a), <b>{user}</b>. 👑\n\n"
        "Você está no serviço <b>VIP de Likes</b> de Free Fire.\n"
        "Envie um <b>ID</b> e receba likes com estilo. ✨\n\n"
        "Escolha uma opção abaixo:"
    ),
    "menu_title": "💎 <b>MENU VIP</b> 💎",
    "ask_uid": (
        "💎 <b>ENVIAR LIKE VIP</b>\n\n"
        "Informe o <b>ID (UID)</b> do jogador:\n\n"
        "<code>123456789</code>"
    ),
    "processing": "💎 <b>Processando seu pedido VIP...</b> ✨",
    "success": (
        "✦ ═══════════════ ✦\n"
        "  💎 <b>LIKE ENVIADO</b> 💎\n"
        "✦ ═══════════════ ✦\n\n"
        "👑 <b>Jogador:</b> {nickname}\n"
        "🆔 <b>ID:</b> <code>{uid}</code>\n"
        "🌎 <b>Região:</b> {region}\n"
        "✧ ─────────────── ✧\n"
        "💛 <b>Antes:</b> {likes_before}\n"
        "💛 <b>Agora:</b> {likes_after}\n"
        "✨ <b>Adicionados:</b> +{likes_added}\n"
        "✧ ─────────────── ✧\n"
        "💎 <i>Obrigado por usar o serviço VIP.</i>"
    ),
    "fail_max": (
        "⚠️ <b>Limite VIP atingido</b>\n\n"
        "🆔 <code>{uid}</code> já recebeu o máximo de likes hoje.\n"
        "🕛 Retorne em 24 horas."
    ),
    "fail_generic": (
        "❌ <b>Operação não concluída</b>\n\n"
        "Verifique o ID e tente novamente.\n"
        "<i>{error}</i>"
    ),
    "limit_reached": (
        "🚫 <b>Uso diário atingido</b>\n\n"
        "Você já utilizou seu envio de hoje. Volte amanhã. 💎"
    ),
}

THEMES = {
    "fire": FIRE,
    "neon": NEON,
    "clean": CLEAN,
    "premium": PREMIUM,
}


def get_theme(name: str) -> dict:
    return THEMES.get(name, FIRE)
