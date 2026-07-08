"""
🔥 BOT DE LIKE FREE FIRE 🔥
Ponto de entrada. Rode com:  python app.py

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
from handlers import flow, fun, moderation


async def _post_init(app):
    """Registra o menu de comandos que aparece no Telegram (privado e grupo)."""
    await app.bot.set_my_commands([
        BotCommand("like", "Enviar like para um ID"),
        BotCommand("menu", "Abrir o menu do bot"),
        BotCommand("start", "Iniciar o bot"),
    ])
    # Em grupo: /like + comandos de moderação.
    await app.bot.set_my_commands(
        [
            BotCommand("like", "Enviar like: /like SEU_ID"),
            BotCommand("ban", "Banir alguém (responda a mensagem)"),
            BotCommand("antilink", "Ligar/desligar anti-link"),
            BotCommand("antiflood", "Ligar/desligar anti-flood"),
        ],
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

    # Comandos de moderação (grupo)
    app.add_handler(CommandHandler("ban", moderation.cmd_ban))
    app.add_handler(CommandHandler("unban", moderation.cmd_unban))
    app.add_handler(CommandHandler("antilink", moderation.cmd_antilink))
    app.add_handler(CommandHandler("antiflood", moderation.cmd_antiflood))

    # Comandos de diversão
    app.add_handler(CommandHandler("wallpaper", fun.cmd_wallpaper))
    app.add_handler(CommandHandler("beijar", fun.cmd_beijar))
    app.add_handler(CommandHandler("marcar", fun.cmd_marcar))
    app.add_handler(CommandHandler(["velha", "jogodavelha"], fun.cmd_velha))

    # Botões: jogo da velha primeiro (por padrão), depois o menu geral
    app.add_handler(CallbackQueryHandler(fun.velha_callback, pattern="^velha:"))
    app.add_handler(CallbackQueryHandler(flow.on_callback))

    # Texto (UID e formulários)
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, flow.on_text))

    # Vigia de moderação: roda em TODA mensagem de grupo (grupo -1, antes do resto)
    app.add_handler(
        MessageHandler(filters.ChatType.GROUPS & ~filters.StatusUpdate.ALL, moderation.moderate),
        group=-1,
    )

    return app


def main():
    app = build_app()
    log.info("🔥 %s iniciado! Tema: %s | Donos: %s | VIP ilimitado, comum %s/dia (reset 13h BRT)",
             settings.BOT_NAME, settings.ACTIVE_THEME, settings.OWNERS,
             settings.NON_VIP_DAILY_LIMIT)
    app.run_polling(allowed_updates=None)


if __name__ == "__main__":
    main()
