"""Carrega as configurações do bot (token, tema) e junta com a pasta config/."""
import os
from pathlib import Path

from config import owners as _owners
from config import api_config as _api

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

# ---- Donos e API (vindos da pasta config/) ----
OWNERS = list(getattr(_owners, "OWNERS", []))
OWNER_USERNAMES = list(getattr(_owners, "OWNER_USERNAMES", []))

API_BASE_URL = _api.API_BASE_URL
API_KEY = _api.API_KEY
API_METHOD = _api.API_METHOD
API_PARAMS = _api.API_PARAMS
API_HEADERS = _api.API_HEADERS
RESPONSE_FIELDS = _api.RESPONSE_FIELDS
REGIONS = _api.REGIONS
DAILY_LIMIT_PER_USER = _api.DAILY_LIMIT_PER_USER


def is_owner(user_id: int) -> bool:
    return user_id in OWNERS
