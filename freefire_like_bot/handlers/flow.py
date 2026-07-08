"""
Fluxo principal do bot: /start, menus, envio de like (VIP x não-VIP) e painel do dono.
"""
import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import ContextTypes

from core import api, keyboards, settings, storage
from core.themes import get_theme

log = logging.getLogger(__name__)


def T() -> dict:
    return get_theme(settings.ACTIVE_THEME)


def _name(update: Update) -> str:
    u = update.effective_user
    return u.first_name or u.username or "jogador"


def _is_group(update: Update) -> bool:
    chat = update.effective_chat
    return bool(chat and chat.type in ("group", "supergroup"))


async def _send(update, context, text, keyboard=None):
    """Envia ou edita a mensagem, funcionando tanto p/ comando quanto botão."""
    if update.callback_query:
        try:
            await update.callback_query.edit_message_text(
                text, parse_mode=ParseMode.HTML, reply_markup=keyboard,
                disable_web_page_preview=True,
            )
            return
        except Exception:
            pass
    await context.bot.send_message(
        update.effective_chat.id, text, parse_mode=ParseMode.HTML,
        reply_markup=keyboard, disable_web_page_preview=True,
    )


# --------------------------- /start ---------------------------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data.clear()
    theme = T()
    text = theme["welcome"].format(bot_name=settings.BOT_NAME, user=_name(update))
    await _send(update, context, text,
                keyboards.main_menu(settings.is_owner(update.effective_user.id)))


async def home(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data.pop("state", None)
    await _send(update, context, T()["menu_title"],
                keyboards.main_menu(settings.is_owner(update.effective_user.id)))


# --------------------------- Callbacks ---------------------------
async def on_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = query.data or ""

    if data == "menu:home":
        return await home(update, context)

    if data == "menu:like":
        # Em grupo o bot não lê texto solto (modo privacidade), então
        # orientamos a usar o comando /like.
        if _is_group(update):
            return await _send(update, context,
                               "🎯 <b>Enviar Like no grupo</b>\n\n"
                               "Use o comando:\n<code>/like SEU_ID</code>\n\n"
                               "<i>Ex:</i> <code>/like 123456789</code>",
                               keyboards.back_home())
        context.user_data["state"] = "awaiting_uid"
        return await _send(update, context, T()["ask_uid"], keyboards.back_home())

    if data == "menu:fun":
        return await _send(update, context,
                           "🎮 <b>BRINCADEIRAS</b>\n\n"
                           "⭕ <b>/velha</b> — jogo da velha (por botões)\n"
                           "😘 <b>/beijar</b> — responda alguém pra beijar\n\n"
                           "<i>Use os comandos no grupo.</i>",
                           keyboards.back_home())

    if data == "menu:tools":
        return await _send(update, context,
                           "🛠️ <b>FERRAMENTAS</b>\n\n"
                           "🖼️ <b>/wallpaper</b> — papel de parede\n"
                           "🏷️ <b>/marcar</b> — marque alguém (responda a pessoa)\n",
                           keyboards.back_home())

    if data == "menu:profile":
        return await _profile(update, context)

    if data == "menu:help":
        return await _help(update, context)

    if data == "menu:admin":
        if not settings.is_owner(update.effective_user.id):
            return await query.answer("Só os donos acessam aqui 👑", show_alert=True)
        return await _send(update, context, T()["menu_title"] + "\n\n👑 <b>Painel do Dono</b>",
                           keyboards.admin_menu())

    if data.startswith("admin:"):
        return await _admin_callback(update, context, data.split(":", 1)[1])


# --------------------------- Envio de Like ---------------------------
async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    state = context.user_data.get("state")
    text = (update.message.text or "").strip()

    if state == "awaiting_uid":
        return await _do_like(update, context, text)
    if state == "admin_add_auto":
        return await _admin_add_auto(update, context, text)

    # Atalho (só no privado): se mandar só números, trata como UID.
    if not _is_group(update) and text.isdigit() and 6 <= len(text) <= 12:
        return await _do_like(update, context, text)


async def _do_like(update, context, uid_text):
    theme = T()
    uid = uid_text.strip()
    if not uid.isdigit() or not (6 <= len(uid) <= 12):
        return await _send(update, context,
                           "⚠️ <b>ID inválido.</b> O ID é só números (ex: <code>123456789</code>).",
                           keyboards.back_home())

    user_id = update.effective_user.id
    vip = settings.is_vip(user_id)

    # Não-VIP tem limite diário (reseta 13:00 BRT). VIP é ilimitado.
    if not vip and not storage.can_use_today(user_id, settings.NON_VIP_DAILY_LIMIT):
        return await _send(update, context, theme["limit_reached"], keyboards.back_home())

    context.user_data.pop("state", None)
    await context.bot.send_message(update.effective_chat.id, theme["processing"],
                                   parse_mode=ParseMode.HTML)

    result = await api.send_like(uid)

    if result.ok:
        if not vip:
            storage.register_use(user_id)
        text = theme["success"].format(
            nickname=result.nickname, uid=uid, region=result.region or "—",
            likes_before=result.likes_before, likes_after=result.likes_after,
            likes_added=result.likes_added,
        )
    elif result.at_max:
        text = theme["fail_max"].format(uid=uid)
    else:
        text = theme["fail_generic"].format(error=result.error or "erro desconhecido")

    await _send(update, context, text, keyboards.back_home())


# --------------------------- Perfil / Ajuda ---------------------------
async def _profile(update, context):
    u = update.effective_user
    is_owner = settings.is_owner(u.id)
    vip = settings.is_vip(u.id)
    if is_owner:
        role, limit = "👑 Dono", "Ilimitado"
    elif vip:
        role, limit = "💎 VIP", "Ilimitado"
    else:
        role, limit = "👤 Comum", f"{settings.NON_VIP_DAILY_LIMIT}/dia (reseta 13h)"
    text = (
        f"<b>👤 SEU PERFIL</b>\n\n"
        f"🏷️ <b>Nome:</b> {u.first_name}\n"
        f"🆔 <b>ID Telegram:</b> <code>{u.id}</code>\n"
        f"⭐ <b>Cargo:</b> {role}\n"
        f"🎯 <b>Likes disponíveis:</b> {limit}"
    )
    await _send(update, context, text, keyboards.back_home())


async def _help(update, context):
    owners = ", ".join(settings.OWNER_USERNAMES) or "—"
    text = (
        f"<b>ℹ️ COMO USAR</b>\n\n"
        f"📌 <b>No grupo:</b> mande <code>/like SEU_ID</code>\n"
        f"<i>Ex:</i> <code>/like 123456789</code>\n\n"
        f"📌 <b>No privado:</b> toque em <b>Enviar Like</b> e mande o ID.\n\n"
        f"💎 <b>VIP:</b> likes ilimitados\n"
        f"👤 <b>Comum:</b> {settings.NON_VIP_DAILY_LIMIT} like por dia (reseta 13h de Brasília)\n\n"
        f"👑 <b>Donos:</b> {owners}\n"
        f"🤖 <b>Bot:</b> {settings.BOT_NAME}"
    )
    await _send(update, context, text, keyboards.back_home())


# --------------------------- Painel do Dono ---------------------------
def _checkpage_kb() -> InlineKeyboardMarkup:
    """Teclado com o botão que abre a página do auto-like (checkpage) + menu."""
    rows = []
    page = settings.checkpage_url()
    if page:
        rows.append([InlineKeyboardButton("🌐 Abrir página do auto-like", url=page)])
    rows.append([InlineKeyboardButton("⬅️ Menu", callback_data="menu:home")])
    return InlineKeyboardMarkup(rows)


async def _admin_callback(update, context, action):
    if not settings.is_owner(update.effective_user.id):
        return await update.callback_query.answer("Só os donos 👑", show_alert=True)

    if action == "add_auto":
        if _is_group(update):
            return await _send(update, context,
                               "➕ <b>Adicionar no Auto Like (grupo)</b>\n\n"
                               "Use o comando:\n<code>/addauto UID DIAS</code>\n"
                               "<i>Ex:</i> <code>/addauto 123456789 30</code>",
                               keyboards.admin_menu())
        context.user_data["state"] = "admin_add_auto"
        return await _send(update, context,
                           "➕ <b>ADICIONAR AO AUTO LIKE</b>\n\n"
                           "Envie: <code>UID DIAS</code>\n"
                           f"<i>Ex:</i> <code>123456789 30</code>\n\n"
                           f"<i>Se não mandar os dias, uso {settings.DEFAULT_AUTO_DAYS}.</i>\n"
                           "A API manda like sozinha todo dia às 13:00 (Brasília).",
                           keyboards.back_home())

    if action == "list_auto":
        contas = await api.list_open()
        if not contas:
            body = ("Não consegui puxar a lista pela API (sessão do auto-like).\n"
                    "Veja as contas, likes e dias na página abaixo 👇")
            titulo = "📋 <b>CONTAS NO AUTO LIKE</b>"
        else:
            linhas = []
            for c in contas[:20]:
                conta = c.get("conta", {})
                likes = c.get("likes", {})
                prog = c.get("progresso", {})
                linhas.append(
                    f"👤 <b>{conta.get('player','?')}</b> (<code>{conta.get('uid','?')}</code>)\n"
                    f"   ❤️ {likes.get('atual','?')} (+{likes.get('enviados','?')}) · "
                    f"📅 {prog.get('dias_usados','?')}/{prog.get('dias_total','?')}d "
                    f"({prog.get('dias_restantes','?')} rest.)"
                )
            body = "\n".join(linhas)
            titulo = f"📋 <b>CONTAS NO AUTO LIKE ({len(contas)})</b>"
        return await _send(update, context, f"{titulo}\n\n{body}", _checkpage_kb())

    if action == "info_open":
        info = await api.info_open()
        if "erro" in info:
            body = (f"⚠️ {info['erro']}\n\n"
                    "Mas dá pra ver tudo (contas, likes, dias) na página abaixo 👇")
        else:
            body = (
                f"🆔 Access ID: <code>{info.get('access_id','?')}</code>\n"
                f"📦 Vagas: <b>{info.get('contas_registradas','?')}/{info.get('max_contas','?')}</b>\n"
                f"✅ Ativas: <b>{info.get('contas_ativas','?')}</b>\n"
                f"🏁 Concluídas: <b>{info.get('contas_concluidas','?')}</b>\n"
                f"🕐 Máx dias: <b>{info.get('max_dias','?')}</b>"
            )
        return await _send(update, context, f"📦 <b>INFO DO OPEN</b>\n\n{body}",
                           _checkpage_kb())

    if action == "stats":
        s = storage.get_stats()
        return await _send(update, context,
                           f"📊 <b>ESTATÍSTICAS</b>\n\n"
                           f"❤️ Likes enviados: <b>{s['total_likes']}</b>\n"
                           f"👥 Usuários: <b>{s['total_users']}</b>\n"
                           f"💎 VIPs (comando): <b>{len(storage.list_vips())}</b>",
                           keyboards.admin_menu())


async def _admin_add_auto(update, context, text):
    # Trava de segurança: Auto Like é SÓ para os donos.
    if not settings.is_owner(update.effective_user.id):
        context.user_data.pop("state", None)
        return await _send(update, context, "🚫 Só os donos podem usar o Auto Like.",
                           keyboards.back_home())
    context.user_data.pop("state", None)
    parts = text.split()
    uid = parts[0] if parts else ""
    if not uid.isdigit():
        return await _send(update, context,
                           "⚠️ Formato inválido. Use: <code>UID DIAS</code>",
                           keyboards.admin_menu())
    try:
        dias = int(parts[1]) if len(parts) > 1 else settings.DEFAULT_AUTO_DAYS
    except ValueError:
        dias = settings.DEFAULT_AUTO_DAYS

    await context.bot.send_message(update.effective_chat.id, "⏳ Registrando no auto-like...")
    result = await api.add_auto(uid, dias)
    if result.ok:
        msg = (f"✅ <b>Adicionado ao Auto Like!</b>\n\n"
               f"👤 {result.nickname}\n🆔 <code>{uid}</code>\n📅 {dias} dias\n"
               f"🕐 Likes automáticos todo dia às 13:00 (Brasília).")
    else:
        msg = f"❌ Não deu certo: {result.error}"
    await _send(update, context, msg, keyboards.admin_menu())


# --------------------------- Comando /like (grupo e privado) ---------------------------
async def cmd_like(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """/like UID — funciona em grupo e no privado."""
    if not context.args:
        return await update.message.reply_text(
            "🎯 Use assim: /like SEU_ID\nEx: /like 123456789")
    await _do_like(update, context, context.args[0])


# --------------------------- Comandos de dono ---------------------------
async def cmd_addauto(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """/addauto UID [DIAS] — registra um ID no auto-like (só dono)."""
    if not settings.is_owner(update.effective_user.id):
        return
    if not context.args or not context.args[0].isdigit():
        return await update.message.reply_text("Use: /addauto UID [DIAS]\nEx: /addauto 123456789 30")
    await _admin_add_auto(update, context, " ".join(context.args))


async def cmd_addvip(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not settings.is_owner(update.effective_user.id):
        return
    if not context.args or not context.args[0].isdigit():
        return await update.message.reply_text("Use: /addvip ID_DO_TELEGRAM")
    uid = int(context.args[0])
    ok = storage.add_vip(uid)
    await update.message.reply_text(
        f"💎 VIP adicionado: {uid}" if ok else f"{uid} já era VIP.")


async def cmd_delvip(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not settings.is_owner(update.effective_user.id):
        return
    if not context.args or not context.args[0].isdigit():
        return await update.message.reply_text("Use: /delvip ID_DO_TELEGRAM")
    uid = int(context.args[0])
    ok = storage.remove_vip(uid)
    await update.message.reply_text(
        f"🗑️ VIP removido: {uid}" if ok else f"{uid} não estava na lista de VIP.")


async def cmd_vips(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not settings.is_owner(update.effective_user.id):
        return
    vips = storage.list_vips()
    body = "\n".join(f"• <code>{v}</code>" for v in vips) or "nenhum (por comando)"
    await update.message.reply_text(
        f"💎 <b>VIPs adicionados por comando:</b>\n{body}", parse_mode=ParseMode.HTML)
