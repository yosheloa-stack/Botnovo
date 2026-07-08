"""
Túnel HTTPS (ngrok) para o webhook.

A Bronxy não deixa receber conexão de fora direto na porta. O ngrok
resolve isso: ele abre uma conexão de SAÍDA do bot pros servidores do
ngrok e te dá uma URL https pública que aponta pro servidor local do
webhook. Assim a API consegue mandar o POST.

Precisa de uma conta grátis no ngrok (dashboard.ngrok.com) só pra pegar
o AUTHTOKEN. Se quiser um endereço fixo (que não muda ao reiniciar),
pegue o "Domain" grátis do ngrok e coloque em NGROK_DOMAIN.
"""
import logging
import os

log = logging.getLogger(__name__)


def start_ngrok(port: int):
    """Abre o túnel e devolve a URL pública https (ou None se não deu)."""
    token = os.environ.get("NGROK_AUTHTOKEN", "").strip()
    if not token:
        log.warning("NGROK_AUTHTOKEN vazio no .env — túnel não iniciado.")
        return None

    try:
        from pyngrok import conf, ngrok
    except Exception as e:  # noqa: BLE001
        log.warning("pyngrok não instalado (%s). Rode o 'Instalar Módulos'.", e)
        return None

    try:
        conf.get_default().auth_token = token
        domain = os.environ.get("NGROK_DOMAIN", "").strip()
        if domain:
            tunnel = ngrok.connect(addr=port, proto="http", domain=domain)
        else:
            tunnel = ngrok.connect(addr=port, proto="http")
        url = tunnel.public_url
        if url.startswith("http://"):
            url = "https://" + url[len("http://"):]
        log.info("🌍 Túnel HTTPS ativo: %s", url)
        return url
    except Exception as e:  # noqa: BLE001
        log.warning("Falha ao abrir o túnel ngrok: %s", e)
        return None
