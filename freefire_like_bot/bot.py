"""
🔥 BOT DE LIKE FREE FIRE 🔥
Ponto de entrada. Rode com:  python bot.py
"""
import datetime
import logging
import sys

from telegram.ext import (
    ApplicationBuilder,
    CallbackQueryHandler,
    CommandHandler,
    MessageHandler,
    filters,
)

from core import settings
from handlers import flow
from handlers.autolike import run_autolike

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    level=logging.INFO,
)
log = logging.getLogger("freefire_bot")


def build_app():
    if not settings.BOT_TOKEN:
        print("\n❌ BOT_TOKEN não encontrado!")
        print("   Crie o arquivo .env (veja o .env.example) e coloque o token do @BotFather.\n")
        sys.exit(1)

    if not settings.OWNERS or settings.OWNERS == [123456789, 987654321]:
        log.warning("⚠️  Os donos ainda são os de exemplo. Edite config/owners.py!")

    app = ApplicationBuilder().token(settings.BOT_TOKEN).build()

    # Comandos
    app.add_handler(CommandHandler("start", flow.start))
    app.add_handler(CommandHandler("menu", flow.home))
    app.add_handler(CommandHandler("delauto", flow.cmd_delauto))
    app.add_handler(CommandHandler("autolist", flow.cmd_autolist))

    # Botões
    app.add_handler(CallbackQueryHandler(flow.on_callback))

    # Texto (UID, formulários)
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, flow.on_text))

    # Auto Like diário (10:00 no fuso do servidor)
    if app.job_queue:
        app.job_queue.run_daily(run_autolike, time=datetime.time(hour=10, minute=0))
        log.info("Auto Like agendado para todo dia às 10:00.")
    else:
        log.warning("JobQueue indisponível — instale: pip install \"python-telegram-bot[job-queue]\"")

    return app


def main():
    app = build_app()
    log.info("🔥 %s iniciado! Tema: %s | Donos: %s",
             settings.BOT_NAME, settings.ACTIVE_THEME, settings.OWNERS)
    app.run_polling(allowed_updates=None)


if __name__ == "__main__":
    main()
