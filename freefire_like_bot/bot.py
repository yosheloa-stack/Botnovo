"""
🔥 BOT DE LIKE FREE FIRE 🔥
Ponto de entrada. Rode com:  python bot.py

O auto-like é processado pela PRÓPRIA API (Frifas) todo dia às 13:00 BRT,
por isso o bot não precisa de um agendador local.
"""
import logging
import sys

from telegram import BotCommand, BotCommandScopeAllGroupChats
from telegram.ext import (
    ApplicationBuilder,
    CallbackQueryHandler,
    CommandHandler,
    MessageHandler,
    filters,
)

from core import settings
from handlers import flow


async def _post_init(app):
    """Registra o menu de comandos que aparece no Telegram (privado e grupo)."""
    await app.bot.set_my_commands([
        BotCommand("like", "Enviar like para um ID"),
        BotCommand("menu", "Abrir o menu do bot"),
        BotCommand("start", "Iniciar o bot"),
    ])
    # Em grupo, mostra só o /like (é o principal por lá).
    await app.bot.set_my_commands(
        [BotCommand("like", "Enviar like: /like SEU_ID")],
        scope=BotCommandScopeAllGroupChats(),
    )

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
    if not settings.FRIFAS_KEY:
        log.warning("⚠️  FRIFAS_KEY não configurada — o envio de like não vai funcionar até preencher o .env")

    app = ApplicationBuilder().token(settings.BOT_TOKEN).post_init(_post_init).build()

    # Comandos
    app.add_handler(CommandHandler("start", flow.start))
    app.add_handler(CommandHandler("menu", flow.home))
    app.add_handler(CommandHandler("like", flow.cmd_like))
    app.add_handler(CommandHandler("addauto", flow.cmd_addauto))
    app.add_handler(CommandHandler("addvip", flow.cmd_addvip))
    app.add_handler(CommandHandler("delvip", flow.cmd_delvip))
    app.add_handler(CommandHandler("vips", flow.cmd_vips))

    # Botões
    app.add_handler(CallbackQueryHandler(flow.on_callback))

    # Texto (UID e formulários)
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, flow.on_text))

    return app


def main():
    app = build_app()
    log.info("🔥 %s iniciado! Tema: %s | Donos: %s | VIP ilimitado, comum %s/dia (reset 13h BRT)",
             settings.BOT_NAME, settings.ACTIVE_THEME, settings.OWNERS,
             settings.NON_VIP_DAILY_LIMIT)
    app.run_polling(allowed_updates=None)


if __name__ == "__main__":
    main()
