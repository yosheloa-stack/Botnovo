"""
Fluxo principal do bot: /start, menus, envio de like e painel do dono.
"""
import logging

from telegram import Update
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
    is_owner = settings.is_owner(update.effective_user.id)
    await _send(update, context, text, keyboards.main_menu(is_owner))


async def home(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data.pop("state", None)
    theme = T()
    text = theme["menu_title"]
    is_owner = settings.is_owner(update.effective_user.id)
    await _send(update, context, text, keyboards.main_menu(is_owner))


# --------------------------- Callbacks ---------------------------
async def on_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = query.data or ""

    if data == "menu:home":
        return await home(update, context)

    if data == "menu:like":
        context.user_data["state"] = "choose_region"
        return await _send(update, context,
                           "🌎 <b>Escolha a região do jogador:</b>",
                           keyboards.region_menu())

    if data == "menu:profile":
        return await _profile(update, context)

    if data == "menu:help":
        return await _help(update, context)

    if data == "menu:admin":
        if not settings.is_owner(update.effective_user.id):
            return await query.answer("Só os donos acessam aqui 👑", show_alert=True)
        return await _send(update, context, T()["menu_title"] + "\n\n👑 <b>Painel do Dono</b>",
                           keyboards.admin_menu())

    if data.startswith("region:"):
        region = data.split(":", 1)[1]
        context.user_data["region"] = region
        context.user_data["state"] = "awaiting_uid"
        return await _send(update, context, T()["ask_uid"], keyboards.back_home())

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

    # Sem estado: se for só números, trata como UID direto (atalho).
    if text.isdigit() and 6 <= len(text) <= 12:
        context.user_data["region"] = settings.REGIONS[0]
        return await _do_like(update, context, text)


async def _do_like(update, context, uid_text):
    theme = T()
    uid = uid_text.strip()
    if not uid.isdigit() or not (6 <= len(uid) <= 12):
        return await _send(update, context,
                           "⚠️ <b>ID inválido.</b> O ID é só números (ex: <code>123456789</code>).",
                           keyboards.back_home())

    user_id = update.effective_user.id
    is_owner = settings.is_owner(user_id)

    if not is_owner and not storage.can_use_today(user_id, settings.DAILY_LIMIT_PER_USER):
        return await _send(update, context, theme["limit_reached"], keyboards.back_home())

    region = context.user_data.get("region", settings.REGIONS[0])
    context.user_data.pop("state", None)

    await context.bot.send_message(update.effective_chat.id, theme["processing"],
                                   parse_mode=ParseMode.HTML)

    result = await api.send_like(uid, region)

    if result.ok:
        if not is_owner:
            storage.register_use(user_id)
        text = theme["success"].format(
            nickname=result.nickname, uid=uid, region=region,
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
    role = "👑 Dono" if is_owner else "👤 Usuário"
    limit = "Ilimitado" if is_owner else f"{settings.DAILY_LIMIT_PER_USER}/dia"
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
        f"1️⃣ Toque em <b>Enviar Like</b>\n"
        f"2️⃣ Escolha a <b>região</b> do jogador\n"
        f"3️⃣ Envie o <b>ID (UID)</b> dele\n"
        f"4️⃣ Pronto! Os likes são enviados na hora ⚡\n\n"
        f"👑 <b>Donos:</b> {owners}\n"
        f"🤖 <b>Bot:</b> {settings.BOT_NAME}"
    )
    await _send(update, context, text, keyboards.back_home())


# --------------------------- Painel do Dono ---------------------------
async def _admin_callback(update, context, action):
    if not settings.is_owner(update.effective_user.id):
        return await update.callback_query.answer("Só os donos 👑", show_alert=True)

    if action == "add_auto":
        context.user_data["state"] = "admin_add_auto"
        return await _send(update, context,
                           "➕ <b>ADICIONAR AO AUTO LIKE</b>\n\n"
                           "Envie no formato: <code>UID REGIAO</code>\n"
                           "<i>Ex:</i> <code>123456789 BR</code>",
                           keyboards.back_home())

    if action == "list_auto":
        items = storage.list_autolike()
        if not items:
            body = "Nenhum ID no Auto Like ainda."
        else:
            body = "\n".join(
                f"• <code>{i['uid']}</code> ({i['region']})" for i in items
            )
        return await _send(update, context,
                           f"📋 <b>AUTO LIKE ({len(items)})</b>\n\n{body}\n\n"
                           f"<i>Para remover: /delauto UID</i>",
                           keyboards.admin_menu())

    if action == "stats":
        s = storage.get_stats()
        return await _send(update, context,
                           f"📊 <b>ESTATÍSTICAS</b>\n\n"
                           f"❤️ Likes enviados: <b>{s['total_likes']}</b>\n"
                           f"👥 Usuários: <b>{s['total_users']}</b>\n"
                           f"🔁 Auto Like: <b>{len(storage.list_autolike())}</b> IDs",
                           keyboards.admin_menu())


async def _admin_add_auto(update, context, text):
    context.user_data.pop("state", None)
    parts = text.split()
    uid = parts[0] if parts else ""
    region = parts[1].upper() if len(parts) > 1 else settings.REGIONS[0]
    if not uid.isdigit():
        return await _send(update, context,
                           "⚠️ Formato inválido. Use: <code>UID REGIAO</code>",
                           keyboards.admin_menu())
    ok = storage.add_autolike(uid, region, update.effective_user.id)
    msg = ("✅ Adicionado ao Auto Like!" if ok
           else "⚠️ Esse ID já estava no Auto Like.")
    await _send(update, context,
                f"{msg}\n\n<code>{uid}</code> ({region})",
                keyboards.admin_menu())


# --------------------------- Comandos de dono ---------------------------
async def cmd_delauto(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not settings.is_owner(update.effective_user.id):
        return
    if not context.args:
        return await update.message.reply_text("Use: /delauto UID")
    uid = context.args[0]
    ok = storage.remove_autolike(uid)
    await update.message.reply_text(
        f"🗑️ Removido: {uid}" if ok else f"Não achei o UID {uid} no Auto Like.")


async def cmd_autolist(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not settings.is_owner(update.effective_user.id):
        return
    items = storage.list_autolike()
    body = "\n".join(f"• {i['uid']} ({i['region']})" for i in items) or "vazio"
    await update.message.reply_text(f"📋 Auto Like ({len(items)}):\n{body}")
