"""
Funções extras/brincadeiras do AURORA:
  - /wallpaper   -> manda um papel de parede (API tokito)
  - /beijar      -> beija alguém (responda ou marque) com gif
  - /velha       -> jogo da velha por botões
  - mention()    -> marca o usuário do jeito certo (nome clicável)
"""
import html
import io
import random

import httpx
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import ContextTypes

from core import settings


def mention(user) -> str:
    """
    Marca o usuário. Se tiver @username, mostra o @arroba (o Telegram já
    deixa clicável). Se não tiver, usa o nome como link clicável que abre
    o perfil e notifica a pessoa.
    """
    if not user:
        return "alguém"
    if getattr(user, "username", None):
        return f"@{user.username}"
    nome = html.escape(user.first_name or "usuário")
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
def _acha_url_img(obj):
    """Procura recursivamente uma URL de imagem dentro de um JSON."""
    if isinstance(obj, str):
        s = obj.strip()
        if s.startswith("http"):
            return s
        return None
    if isinstance(obj, dict):
        # campos mais prováveis primeiro
        for k in ("url", "image", "imagem", "wallpaper", "result", "link", "img", "data"):
            if k in obj:
                found = _acha_url_img(obj[k])
                if found:
                    return found
        for v in obj.values():
            found = _acha_url_img(v)
            if found:
                return found
    if isinstance(obj, list):
        for v in obj:
            found = _acha_url_img(v)
            if found:
                return found
    return None


def _parece_imagem(b: bytes) -> bool:
    return (b[:3] == b"\xff\xd8\xff"                      # JPEG
            or b[:8] == b"\x89PNG\r\n\x1a\n"               # PNG
            or b[:6] in (b"GIF87a", b"GIF89a")             # GIF
            or (b[:4] == b"RIFF" and b[8:12] == b"WEBP"))  # WEBP


async def cmd_wallpaper(update: Update, context: ContextTypes.DEFAULT_TYPE):
    api = f"https://tokito-apis.com.br/api/wallpaper?apikey={settings.TOKITO_API_KEY}"
    chat = update.effective_chat.id
    aviso = await update.message.reply_text("🖼️ Buscando um wallpaper...")

    # 1) jeito mais garantido: manda a URL direto (o Telegram baixa a imagem)
    try:
        await context.bot.send_photo(chat, photo=api, caption="🖼️ Seu wallpaper!")
        return await aviso.delete()
    except Exception:  # noqa: BLE001
        pass

    # 2) baixa e tenta descobrir a imagem (por bytes ou por JSON)
    try:
        async with httpx.AsyncClient(timeout=30, follow_redirects=True) as c:
            r = await c.get(api)
        ct = r.headers.get("content-type", "")
        if "image" in ct or _parece_imagem(r.content[:16]):
            await context.bot.send_photo(chat, photo=io.BytesIO(r.content),
                                         caption="🖼️ Seu wallpaper!")
            return await aviso.delete()
        img = None
        try:
            img = _acha_url_img(r.json())
        except Exception:  # noqa: BLE001
            txt = r.text.strip()
            img = txt if txt.startswith("http") else None
        if img:
            await context.bot.send_photo(chat, photo=img, caption="🖼️ Seu wallpaper!")
            return await aviso.delete()
        # mostra um pedacinho da resposta pra debug
        amostra = html.escape((r.text or "")[:200]) or f"(content-type: {ct})"
        await aviso.edit_text(
            "❌ A API não retornou imagem. Resposta:\n"
            f"<code>{amostra}</code>", parse_mode=ParseMode.HTML)
    except Exception as e:  # noqa: BLE001
        await aviso.edit_text(f"❌ Erro no wallpaper: <code>{html.escape(str(e))}</code>",
                              parse_mode=ParseMode.HTML)


# --------------------------- /beijar ---------------------------
def _gifs_beijar():
    """
    Procura gifs de beijo na RAIZ do bot. Você põe os arquivos lá com nome
    começando por 'beijar' (ex: beijar.gif, beijar2.gif, beijar3.mp4).
    Sorteia entre eles.
    """
    base = settings.BASE_DIR
    arquivos = []
    for padrao in ("beijar*.gif", "beijar*.mp4", "beijar*.GIF", "beijar*.MP4"):
        arquivos += list(base.glob(padrao))
    return sorted(set(arquivos))


async def cmd_beijar(update: Update, context: ContextTypes.DEFAULT_TYPE):
    alvo = _alvo(update)
    autor = update.effective_user
    if not alvo:
        return await update.message.reply_text(
            "😘 Responda a mensagem de alguém com /beijar (ou marque a pessoa).")
    if alvo.id == autor.id:
        return await update.message.reply_text("😅 Você não pode se beijar!")

    legenda = f"😘 {mention(autor)} beijou {mention(alvo)}!"
    chat = update.effective_chat.id

    # 1) tenta um gif LOCAL (os que você colocou na raiz)
    locais = _gifs_beijar()
    if locais:
        escolhido = random.choice(locais)
        try:
            with open(escolhido, "rb") as f:
                await context.bot.send_animation(chat, animation=f, caption=legenda,
                                                 parse_mode=ParseMode.HTML)
            return
        except Exception:  # noqa: BLE001
            pass

    # 2) reserva: gif online
    gif = None
    try:
        async with httpx.AsyncClient(timeout=20) as c:
            r = await c.get("https://api.waifu.pics/sfw/kiss")
        gif = r.json().get("url")
    except Exception:  # noqa: BLE001
        gif = None
    try:
        if gif:
            await context.bot.send_animation(chat, gif, caption=legenda,
                                             parse_mode=ParseMode.HTML)
        else:
            await update.message.reply_text(legenda, parse_mode=ParseMode.HTML)
    except Exception:  # noqa: BLE001
        await update.message.reply_text(legenda, parse_mode=ParseMode.HTML)


# --------------------------- /marcar ---------------------------
async def cmd_marcar(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Marca uma pessoa com o nome clicável (responda ou marque ela)."""
    alvo = _alvo(update)
    if not alvo:
        return await update.message.reply_text(
            "🏷️ Responda a mensagem da pessoa com /marcar (ou marque ela na mensagem).")
    extra = " ".join(context.args).strip() if context.args else ""
    texto = f"📣 {mention(alvo)}"
    if extra:
        texto += f"\n{html.escape(extra)}"
    await update.message.reply_text(texto, parse_mode=ParseMode.HTML)


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
