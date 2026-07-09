"""
🎵 AURORA MUSIC — userbot que toca música NA LIGAÇÃO (voice chat) do grupo.

IMPORTANTE: isto é um USERBOT (usa uma CONTA de telefone, não o token do bot),
porque bots do Telegram não entram em ligação. Roda separado do AURORA SYSTEM.

Comandos (no grupo, com a ligação/voice chat ABERTA):
    /play <música>   -> toca (ou põe na fila)
    /skip            -> pula pra próxima
    /pause /resume   -> pausa / continua
    /stop            -> para e sai da ligação
    /fila            -> mostra a fila
"""
import asyncio
import os
from pathlib import Path
from urllib.parse import quote

from pyrogram import Client, filters
from pyrogram.types import Message
from pytgcalls import PyTgCalls
from pytgcalls import filters as call_filters
from pytgcalls.types import MediaStream


# ----------------- Config (.env) -----------------
def _load_env():
    p = Path(__file__).resolve().parent / ".env"
    if p.exists():
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, _, v = line.partition("=")
            v = v.strip()
            if v and v[0] not in ("'", '"'):
                i = v.find(" #")
                if i != -1:
                    v = v[:i].strip()
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


_load_env()

API_ID = int(os.environ.get("API_ID", "0") or "0")
API_HASH = os.environ.get("API_HASH", "").strip()
SESSION_STRING = os.environ.get("SESSION_STRING", "").strip()
TOKITO_API_KEY = os.environ.get("TOKITO_API_KEY", "Yosh7").strip()
TOKITO_AUDIO = "https://tokito-apis.site/api/youtube-audio"

_WORKDIR = str(Path(__file__).resolve().parent)
if SESSION_STRING:
    # login por session string (se você tiver gerado uma)
    app = Client("aurora_music", api_id=API_ID, api_hash=API_HASH,
                 session_string=SESSION_STRING)
else:
    # login pelo console (pede telefone + código na 1ª vez e salva num
    # arquivo .session; nas próximas vezes já entra sozinho)
    app = Client("aurora_music", api_id=API_ID, api_hash=API_HASH,
                 workdir=_WORKDIR)
calls = PyTgCalls(app)

# fila por grupo: chat_id -> lista de dicts {"title":..., "url":...}
queues: dict[int, list] = {}


def _audio_url(query_or_url: str) -> str:
    return f"{TOKITO_AUDIO}?q={quote(query_or_url)}&apikey={TOKITO_API_KEY}"


async def _play_next(chat_id: int) -> bool:
    """Toca o próximo da fila. Retorna False se a fila acabou (sai da call)."""
    fila = queues.get(chat_id, [])
    if not fila:
        try:
            await calls.leave_call(chat_id)
        except Exception:
            pass
        return False
    item = fila.pop(0)
    await calls.play(chat_id, MediaStream(item["url"]))
    return True


# ----------------- Comandos -----------------
@app.on_message(filters.command("play") & filters.group)
async def cmd_play(_, m: Message):
    query = " ".join(m.command[1:]).strip()
    if not query:
        return await m.reply("❌ Use: /play nome da música")

    status = await m.reply("🎧 Preparando...")
    url = _audio_url(query)
    item = {"title": query, "url": url}
    chat_id = m.chat.id
    fila = queues.setdefault(chat_id, [])

    # Se já tem algo tocando (fila não-vazia OU já na call), enfileira.
    tocando = chat_id in getattr(calls, "_p", {}) or bool(fila)
    fila.append(item)
    try:
        if not tocando:
            await _play_next(chat_id)
            await status.edit(f"▶️ Tocando agora:\n🎶 <b>{query}</b>")
        else:
            await status.edit(f"➕ Adicionado à fila (posição {len(fila)}):\n🎶 <b>{query}</b>")
    except Exception as e:  # noqa: BLE001
        await status.edit(
            "❌ Não consegui tocar. A ligação (voice chat) está aberta e "
            f"eu sou admin no grupo?\n<code>{e}</code>")


@app.on_message(filters.command(["skip", "pular"]) & filters.group)
async def cmd_skip(_, m: Message):
    ok = await _play_next(m.chat.id)
    await m.reply("⏭️ Pulei pra próxima." if ok else "⏹️ Fila vazia, saí da ligação.")


@app.on_message(filters.command(["pause", "pausar"]) & filters.group)
async def cmd_pause(_, m: Message):
    try:
        await calls.pause_stream(m.chat.id)
        await m.reply("⏸️ Pausado.")
    except Exception as e:  # noqa: BLE001
        await m.reply(f"❌ {e}")


@app.on_message(filters.command(["resume", "continuar"]) & filters.group)
async def cmd_resume(_, m: Message):
    try:
        await calls.resume_stream(m.chat.id)
        await m.reply("▶️ Continuando.")
    except Exception as e:  # noqa: BLE001
        await m.reply(f"❌ {e}")


@app.on_message(filters.command(["stop", "parar"]) & filters.group)
async def cmd_stop(_, m: Message):
    queues[m.chat.id] = []
    try:
        await calls.leave_call(m.chat.id)
    except Exception:
        pass
    await m.reply("⏹️ Parei e saí da ligação.")


@app.on_message(filters.command(["fila", "queue"]) & filters.group)
async def cmd_queue(_, m: Message):
    fila = queues.get(m.chat.id, [])
    if not fila:
        return await m.reply("A fila está vazia.")
    txt = "\n".join(f"{i+1}. {x['title']}" for i, x in enumerate(fila[:15]))
    await m.reply(f"🎵 <b>Fila ({len(fila)}):</b>\n{txt}")


# Quando uma música acaba, toca a próxima automaticamente.
@calls.on_update(call_filters.stream_end)
async def on_stream_end(_, update):
    await _play_next(update.chat_id)


async def main():
    if not (API_ID and API_HASH):
        print("\n❌ Faltam API_ID e/ou API_HASH no .env\n")
        return
    # Na 1ª vez sem sessão salva, o Pyrogram vai pedir telefone e código
    # AQUI no console. Digite e pronto — nas próximas já entra sozinho.
    await app.start()
    await calls.start()
    print("🎵 AURORA MUSIC online! Toque com /play no grupo (com a ligação aberta).")
    await asyncio.Event().wait()  # roda pra sempre


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
