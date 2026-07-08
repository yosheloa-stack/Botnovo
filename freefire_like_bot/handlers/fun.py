"""
Funções extras/brincadeiras do AURORA:
  - /wallpaper   -> manda um papel de parede (API tokito)
  - /beijar      -> beija alguém (responda ou marque) com gif
  - /velha       -> jogo da velha por botões
  - mention()    -> marca o usuário do jeito certo (nome clicável)
"""
import html
import io

import httpx
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import ContextTypes

from core import settings


def mention(user) -> str:
    """Marca o usuário: nome clicável que abre o perfil (funciona sem @)."""
    if not user:
        return "alguém"
    nome = html.escape(user.first_name or user.username or "usuário")
    return f'<a href="tg://user?id={user.id}">{nome}</a>'


def _alvo(update: Update):
    """Descobre quem é o alvo: quem foi respondido, ou quem foi marcado."""
    msg = update.message
    if msg.reply_to_message and msg.reply_to_message.from_user:
        return msg.reply_to_message.from_user
    for ent in (msg.entities or []):
        if ent.type == "text_mention" and ent.user:
            return ent.user
    return None


# --------------------------- /wallpaper ---------------------------
async def cmd_wallpaper(update: Update, context: ContextTypes.DEFAULT_TYPE):
    api = f"https://tokito-apis.com.br/api/wallpaper?apikey={settings.TOKITO_API_KEY}"
    aviso = await update.message.reply_text("🖼️ Buscando um wallpaper...")
    try:
        async with httpx.AsyncClient(timeout=30, follow_redirects=True) as c:
            r = await c.get(api)
        ct = r.headers.get("content-type", "")
        if "image" in ct:
            await context.bot.send_photo(update.effective_chat.id,
                                         photo=io.BytesIO(r.content),
                                         caption="🖼️ Seu wallpaper!")
        else:
            img = None
            try:
                data = r.json()
                for k in ("url", "image", "wallpaper", "result", "link"):
                    if isinstance(data, dict) and data.get(k):
                        img = data[k]
                        break
            except Exception:  # noqa: BLE001
                img = r.text.strip() if r.text.strip().startswith("http") else None
            if img:
                await context.bot.send_photo(update.effective_chat.id, img,
                                             caption="🖼️ Seu wallpaper!")
            else:
                await update.message.reply_text("❌ A API não retornou uma imagem.")
        await aviso.delete()
    except Exception as e:  # noqa: BLE001
        await aviso.edit_text(f"❌ Não consegui buscar o wallpaper.\n<code>{e}</code>",
                              parse_mode=ParseMode.HTML)


# --------------------------- /beijar ---------------------------
async def cmd_beijar(update: Update, context: ContextTypes.DEFAULT_TYPE):
    alvo = _alvo(update)
    autor = update.effective_user
    if not alvo:
        return await update.message.reply_text(
            "😘 Responda a mensagem de alguém com /beijar (ou marque a pessoa).")
    if alvo.id == autor.id:
        return await update.message.reply_text("😅 Você não pode se beijar!")

    try:
        async with httpx.AsyncClient(timeout=20) as c:
            r = await c.get("https://api.waifu.pics/sfw/kiss")
        gif = r.json().get("url")
    except Exception:  # noqa: BLE001
        gif = None

    legenda = f"😘 {mention(autor)} beijou {mention(alvo)}!"
    try:
        if gif:
            await context.bot.send_animation(update.effective_chat.id, gif,
                                              caption=legenda, parse_mode=ParseMode.HTML)
        else:
            await update.message.reply_text(legenda, parse_mode=ParseMode.HTML)
    except Exception:  # noqa: BLE001
        await update.message.reply_text(legenda, parse_mode=ParseMode.HTML)


# --------------------------- Jogo da Velha ---------------------------
_games = {}  # (chat_id, msg_id) -> estado
_WINS = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6),
         (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]
_SYM = {"X": "❌", "O": "⭕", " ": "▫️"}


def _board_kb(board):
    rows = []
    for r in range(3):
        rows.append([InlineKeyboardButton(_SYM[board[r * 3 + c]],
                                          callback_data=f"velha:{r * 3 + c}")
                     for c in range(3)])
    return InlineKeyboardMarkup(rows)


def _winner(b):
    for a, c, d in _WINS:
        if b[a] != " " and b[a] == b[c] == b[d]:
            return b[a]
    return "empate" if " " not in b else None


async def cmd_velha(update: Update, context: ContextTypes.DEFAULT_TYPE):
    board = [" "] * 9
    autor = update.effective_user
    texto = (f"⭕❌ <b>JOGO DA VELHA</b>\n\n"
             f"{mention(autor)} é o ❌\n"
             f"Outra pessoa toca numa casa pra entrar como ⭕\n\n"
             f"Vez do: ❌")
    msg = await update.message.reply_text(texto, parse_mode=ParseMode.HTML,
                                          reply_markup=_board_kb(board))
    _games[(msg.chat.id, msg.message_id)] = {
        "board": board, "turn": "X",
        "players": {"X": autor.id, "O": None},
        "users": {"X": autor, "O": None},
    }


async def velha_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    key = (q.message.chat.id, q.message.message_id)
    g = _games.get(key)
    if not g:
        return await q.answer("Esse jogo expirou. Comece outro com /velha", show_alert=True)

    idx = int(q.data.split(":")[1])
    uid = q.from_user.id
    turn = g["turn"]

    # Segundo jogador entra como O ao tocar (se não for o X).
    if g["players"]["O"] is None and uid != g["players"]["X"]:
        g["players"]["O"] = uid
        g["users"]["O"] = q.from_user

    if uid != g["players"].get(turn):
        return await q.answer("Não é a sua vez! ⏳", show_alert=False)
    if g["board"][idx] != " ":
        return await q.answer("Essa casa já está ocupada!", show_alert=False)

    g["board"][idx] = turn
    await q.answer()
    res = _winner(g["board"])

    if res:
        _games.pop(key, None)
        if res == "empate":
            fim = "🤝 <b>Deu velha! Empate.</b>"
        else:
            venc = g["users"][res]
            fim = f"🏆 <b>{_SYM[res]} {mention(venc)} venceu!</b>"
        return await q.edit_message_text(
            f"⭕❌ <b>JOGO DA VELHA</b>\n\n{fim}",
            parse_mode=ParseMode.HTML, reply_markup=_board_kb(g["board"]))

    g["turn"] = "O" if turn == "X" else "X"
    prox = _SYM[g["turn"]]
    await q.edit_message_text(
        f"⭕❌ <b>JOGO DA VELHA</b>\n\n"
        f"❌ {mention(g['users']['X'])}\n"
        f"⭕ {mention(g['users']['O']) if g['users']['O'] else '(esperando)'}\n\n"
        f"Vez do: {prox}",
        parse_mode=ParseMode.HTML, reply_markup=_board_kb(g["board"]))
