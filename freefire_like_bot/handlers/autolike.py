"""
Auto Like: uma vez por dia o bot manda like automaticamente para todos
os UIDs cadastrados no painel do dono.
"""
import logging

from core import api, storage

log = logging.getLogger(__name__)


async def run_autolike(context):
    """Job diário: envia like para cada UID cadastrado."""
    items = storage.list_autolike()
    if not items:
        return
    log.info("Auto Like: enviando para %d IDs", len(items))
    enviados, falhas = 0, 0
    for item in items:
        try:
            result = await api.send_like(item["uid"], item.get("region", "BR"))
            if result.ok:
                enviados += 1
            else:
                falhas += 1
        except Exception:  # noqa: BLE001
            falhas += 1
            log.exception("Falha no auto like do UID %s", item.get("uid"))
    log.info("Auto Like concluído: %d ok, %d falhas", enviados, falhas)
