"""
Recebedor de webhook da API de auto-like.

Sobe um mini-servidor HTTP (aiohttp) que roda junto com o bot. Quando a
API dispara um evento (ex: auto-like processado, conta concluída), ela
manda um POST JSON pra cá e o bot AVISA os donos no Telegram.

URL que você coloca no painel da API:
    http://SEU_HOST:PORTA/webhook
Na Bronxy a porta vem do endereço "Informações Gerais" (ex: :4257).
"""
import json
import logging
import os

from aiohttp import web

from core import settings

log = logging.getLogger(__name__)


def resolve_port() -> int:
    """Descobre a porta: WEBHOOK_PORT > SERVER_PORT > PORT > 8080."""
    for var in ("WEBHOOK_PORT", "SERVER_PORT", "PORT"):
        v = os.environ.get(var, "").strip()
        if v.isdigit():
            return int(v)
    return 8080


def _fmt(payload) -> str:
    """Monta uma mensagem bonita a partir do JSON do webhook."""
    if not isinstance(payload, dict):
        return f"🔔 <b>Webhook do auto-like</b>\n<code>{str(payload)[:800]}</code>"

    linhas = ["🔔 <b>Webhook do auto-like</b>"]
    ev = payload.get("event") or payload.get("tipo") or payload.get("status")
    if ev:
        linhas.append(f"📌 Evento: <b>{ev}</b>")

    data = payload.get("data", payload)
    conta = data.get("conta", {}) if isinstance(data, dict) else {}
    if isinstance(conta, dict) and conta:
        nome = conta.get("player") or conta.get("nome_conta") or conta.get("uid") or "?"
        linhas.append(f"👤 Conta: <b>{nome}</b> (<code>{conta.get('uid','?')}</code>)")

    likes = data.get("likes", {}) if isinstance(data, dict) else {}
    if isinstance(likes, dict) and likes:
        add = likes.get("enviados", likes.get("enviadas", "?"))
        linhas.append(f"❤️ {likes.get('antes','?')} → {likes.get('depois','?')} (+{add})")

    raw = json.dumps(payload, ensure_ascii=False)[:600]
    linhas.append(f"\n<code>{raw}</code>")
    return "\n".join(linhas)


def _targets() -> list:
    """Pra quem avisar: WEBHOOK_LOG_CHAT (se setado) senão os donos."""
    log_chat = os.environ.get("WEBHOOK_LOG_CHAT", "").strip()
    if log_chat.lstrip("-").isdigit():
        return [int(log_chat)]
    return list(settings.OWNERS)


async def _handle_webhook(request: web.Request):
    try:
        payload = await request.json()
    except Exception:  # noqa: BLE001
        payload = (await request.text())[:1000] if request.can_read_body else "<vazio>"
    log.info("Webhook recebido: %s", payload)

    tg_app = request.app["tg_app"]
    text = _fmt(payload)
    for chat_id in _targets():
        try:
            await tg_app.bot.send_message(chat_id, text, parse_mode="HTML")
        except Exception as e:  # noqa: BLE001
            log.warning("Não consegui avisar %s: %s", chat_id, e)
    return web.json_response({"ok": True})


async def _handle_health(request: web.Request):
    return web.Response(text="AURORA SYSTEM webhook OK ✅")


async def start_webhook_server(tg_app):
    """Inicia o servidor de webhook. Retorna o runner (pra manter vivo)."""
    port = resolve_port()
    path = os.environ.get("WEBHOOK_PATH", "/webhook") or "/webhook"
    if not path.startswith("/"):
        path = "/" + path

    web_app = web.Application()
    web_app["tg_app"] = tg_app
    web_app.router.add_post(path, _handle_webhook)
    web_app.router.add_get("/", _handle_health)
    web_app.router.add_get(path, _handle_health)  # GET no /webhook = teste no navegador

    runner = web.AppRunner(web_app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", port)
    await site.start()
    log.info("🌐 Webhook ouvindo em 0.0.0.0:%s%s", port, path)
    return runner
