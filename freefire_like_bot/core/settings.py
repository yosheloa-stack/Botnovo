"""Carrega as configurações do bot (token, tema, tokens da API) + pasta config/."""
import os
from pathlib import Path

from config import api_config as _api
from config import owners as _owners

try:
    from config import vips as _vips
except Exception:  # noqa: BLE001
    _vips = None

BASE_DIR = Path(__file__).resolve().parent.parent


def _load_env():
    """Lê o arquivo .env (bem simples, sem dependências) se ele existir."""
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_env()

# ---- Token do bot (NUNCA fica no código, vem do .env) ----
BOT_TOKEN = os.environ.get("BOT_TOKEN", "").strip()

# ---- Tema/layout ativo (fire | neon | clean | premium) ----
ACTIVE_THEME = os.environ.get("ACTIVE_THEME", "fire").strip().lower()

# ---- Nome que aparece no bot ----
BOT_NAME = os.environ.get("BOT_NAME", "AURORA SYSTEM").strip()

# ---- Tokens da API de Like (secretos, vêm do .env) ----
FRIFAS_KEY = os.environ.get("FRIFAS_KEY", "").strip()
FRIFAS_OPEN = os.environ.get("FRIFAS_OPEN", "").strip()
FRIFAS_ACCESS_ID = os.environ.get("FRIFAS_ACCESS_ID", "").strip()

# ---- Donos, VIPs e ajustes (vindos da pasta config/) ----
OWNERS = list(getattr(_owners, "OWNERS", []))
OWNER_USERNAMES = list(getattr(_owners, "OWNER_USERNAMES", []))
VIPS_STATIC = list(getattr(_vips, "VIPS", [])) if _vips else []

API_BASE_URL = _api.API_BASE_URL.rstrip("/")
NON_VIP_DAILY_LIMIT = _api.NON_VIP_DAILY_LIMIT
RESET_HOUR_BRT = _api.RESET_HOUR_BRT
DEFAULT_AUTO_DAYS = _api.DEFAULT_AUTO_DAYS


def is_owner(user_id: int) -> bool:
    return user_id in OWNERS


def is_vip(user_id: int) -> bool:
    """Dono é sempre VIP. Também é VIP quem está no config ou foi adicionado."""
    if is_owner(user_id) or user_id in VIPS_STATIC:
        return True
    # VIPs dinâmicos (adicionados por comando) ficam no storage:
    from core import storage
    return user_id in storage.list_vips()
