"""
Moderação de grupo:
  - Anti-link: apaga mensagem de quem manda link
  - Anti-flood: segura quem manda mensagem rápido demais (spam)
  - /ban e /unban
  - Toggles: /antilink on|off  e  /antiflood on|off

IMPORTANTE: o bot precisa ser ADMIN do grupo (com permissão de apagar
mensagens e banir) para tudo isso funcionar.
"""
import re
import time

from telegram import Update
from telegram.ext import ContextTypes

from core import settings, storage

# -------- Detecção de link --------
_LINK_RE = re.compile(
    r"(https?://\S+"
    r"|www\.\S+"
    r"|t\.me/\S+|telegram\.me/\S+"
    r"|\b[\w-]+\.(?:com|net|org|xyz|io|me|gg|br|link|site|online|store|shop|"
    r"info|club|live|top|vip|app|dev|tk|ml|ru|co)\b\S*)",
    re.IGNORECASE,
)

# -------- Anti-flood (ajuste aqui se quiser) --------
FLOOD_COUNT = 6      # nº de mensagens...
FLOOD_WINDOW = 7     # ...dentro de X segundos = flood

_flood = {}          # (chat_id, user_id) -> [timestamps]
_admin_cache = {}    # chat_id -> (set_de_ids, timestamp)
_ADMIN_TTL = 300     # segundos


def _is_group(update: Update) -> bool:
    chat = update.effective_chat
    return bool(chat and chat.type in ("group", "supergroup"))


async def _group_admins(context, chat_id) -> set:
    now = time.time()
    cached = _admin_cache.get(chat_id)
    if cached and now - cached[1] < _ADMIN_TTL:
        return cached[0]
    try:
        admins = await context.bot.get_chat_administrators(chat_id)
        ids = {a.user.id for a in admins}
    except Exception:  # noqa: BLE001
        ids = set()
    _admin_cache[chat_id] = (ids, now)
    return ids


async def _is_staff(update: Update, context) -> bool:
    """É dono do bot OU admin do grupo."""
    uid = update.effective_user.id if update.effective_user else 0
    if settings.is_owner(uid):
        return True
    return uid in await _group_admins(context, update.effective_chat.id)


def _has_link(message) -> bool:
    text = (message.text or message.caption or "")
    if _LINK_RE.search(text):
        return True
    for ent in list(message.entities or []) + list(message.caption_entities or []):
        if ent.type in ("url", "text_link"):
            return True
    return False


# ============================ MODERAÇÃO (mensagens) ============================
async def moderate(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Roda em toda mensagem de grupo (anti-link + anti-flood)."""
    if not _is_group(update):
        return
    msg = update.effective_message
    if not msg or not update.effective_user:
        return
    chat_id = update.effective_chat.id

    # Admins do grupo e donos passam livre.
    if await _is_staff(update, context):
        return

    name = update.effective_user.first_name or "membro"

    # ---- Anti-flood ----
    if storage.get_setting(chat_id, "antiflood", False):
        key = (chat_id, update.effective_user.id)
        now = time.time()
        times = [t for t in _flood.get(key, []) if now - t < FLOOD_WINDOW]
        times.append(now)
        _flood[key] = times
        if len(times) >= FLOOD_COUNT:
            _flood[key] = []  # zera pra não avisar em loop
            try:
                await msg.delete()
            except Exception:  # noqa: BLE001
                pass
            try:
                await context.bot.send_message(
                    chat_id, f"🚦 {name}, calma! Você está mandando mensagem rápido demais.")
            except Exception:  # noqa: BLE001
                pass
            return

    # ---- Anti-link ----
    if storage.get_setting(chat_id, "antilink", False) and _has_link(msg):
        try:
            await msg.delete()
        except Exception:  # noqa: BLE001
            return
        try:
            await context.bot.send_message(
                chat_id, f"🚫 {name}, links não são permitidos neste grupo.")
        except Exception:  # noqa: BLE001
            pass


# ============================ COMANDOS ============================
async def cmd_antilink(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await _toggle(update, context, "antilink", "Anti-link")


async def cmd_antiflood(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await _toggle(update, context, "antiflood", "Anti-flood")


async def _toggle(update, context, key, nome):
    if not _is_group(update):
        return await update.message.reply_text("Esse comando só funciona em grupo.")
    if not await _is_staff(update, context):
        return await update.message.reply_text("🚫 Só admins do grupo podem usar isso.")
    arg = (context.args[0].lower() if context.args else "")
    if arg in ("on", "ligar", "sim", "1"):
        value = True
    elif arg in ("off", "desligar", "nao", "não", "0"):
        value = False
    else:
        atual = "ligado ✅" if storage.get_setting(update.effective_chat.id, key, False) else "desligado ❌"
        return await update.message.reply_text(
            f"{nome} está {atual}.\nUse: /{key} on   ou   /{key} off")
    storage.set_setting(update.effective_chat.id, key, value)
    await update.message.reply_text(f"{nome} {'ligado ✅' if value else 'desligado ❌'}")


async def cmd_ban(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not _is_group(update):
        return await update.message.reply_text("Esse comando só funciona em grupo.")
    if not await _is_staff(update, context):
        return await update.message.reply_text("🚫 Só admins do grupo podem banir.")

    target_id, target_name = None, ""
    if update.message.reply_to_message and update.message.reply_to_message.from_user:
        u = update.message.reply_to_message.from_user
        target_id, target_name = u.id, u.first_name
    elif context.args and context.args[0].lstrip("-").isdigit():
        target_id = int(context.args[0])
        target_name = str(target_id)
    else:
        return await update.message.reply_text(
            "Responda a mensagem da pessoa com /ban, ou use /ban ID.")

    if settings.is_owner(target_id):
        return await update.message.reply_text("🚫 Não dá pra banir um dono do bot.")

    try:
        await context.bot.ban_chat_member(update.effective_chat.id, target_id)
        await update.message.reply_text(f"🔨 {target_name} foi banido do grupo.")
    except Exception as e:  # noqa: BLE001
        await update.message.reply_text(
            f"❌ Não consegui banir. O bot é admin com permissão de banir?\n({e})")


async def cmd_unban(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not _is_group(update):
        return await update.message.reply_text("Esse comando só funciona em grupo.")
    if not await _is_staff(update, context):
        return await update.message.reply_text("🚫 Só admins do grupo podem desbanir.")
    if not (context.args and context.args[0].lstrip("-").isdigit()):
        return await update.message.reply_text("Use: /unban ID")
    target_id = int(context.args[0])
    try:
        await context.bot.unban_chat_member(update.effective_chat.id, target_id, only_if_banned=True)
        await update.message.reply_text(f"✅ {target_id} foi desbanido.")
    except Exception as e:  # noqa: BLE001
        await update.message.reply_text(f"❌ Não consegui desbanir. ({e})")
