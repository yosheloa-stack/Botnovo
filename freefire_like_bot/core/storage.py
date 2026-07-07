"""
Armazenamento simples em JSON (sem banco de dados).

Guarda:
  - limite diário de likes por usuário (reseta às 13:00 horário de Brasília)
  - lista de VIPs adicionados por comando
  - estatísticas
"""
import json
import threading
from datetime import datetime, timedelta, timezone

from pathlib import Path

from config import api_config as _api

_DATA_FILE = Path(__file__).resolve().parent.parent / "data.json"
_lock = threading.Lock()

# Horário de Brasília (sem horário de verão): UTC-3.
_BRT = timezone(timedelta(hours=-3))

_DEFAULT = {
    "daily": {},        # { "user_id": {"day": "2026-07-07", "count": 1} }
    "vips": [],         # [ user_id, ... ]
    "stats": {"total_likes": 0, "total_users": []},
}


def like_day() -> str:
    """
    Devolve o "dia de like" atual. O dia vira às RESET_HOUR_BRT (13:00 BRT):
    antes das 13h ainda conta como o dia anterior. Assim o limite zera às 13h.
    """
    now = datetime.now(_BRT)
    ref = now - timedelta(hours=_api.RESET_HOUR_BRT)
    return ref.date().isoformat()


def _load() -> dict:
    if _DATA_FILE.exists():
        try:
            data = json.loads(_DATA_FILE.read_text(encoding="utf-8"))
            for k, v in _DEFAULT.items():
                data.setdefault(k, json.loads(json.dumps(v)))
            return data
        except Exception:
            pass
    return json.loads(json.dumps(_DEFAULT))


def _save(data: dict) -> None:
    _DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


# ----------------- Limite diário (reseta 13:00 BRT) -----------------
def can_use_today(user_id: int, limit: int) -> bool:
    with _lock:
        data = _load()
        rec = data["daily"].get(str(user_id))
        if not rec or rec.get("day") != like_day():
            return True
        return rec.get("count", 0) < limit


def register_use(user_id: int) -> None:
    with _lock:
        data = _load()
        today = like_day()
        rec = data["daily"].get(str(user_id))
        if not rec or rec.get("day") != today:
            rec = {"day": today, "count": 0}
        rec["count"] += 1
        data["daily"][str(user_id)] = rec
        data["stats"]["total_likes"] = data["stats"].get("total_likes", 0) + 1
        if user_id not in data["stats"]["total_users"]:
            data["stats"]["total_users"].append(user_id)
        _save(data)


# ----------------- VIPs dinâmicos -----------------
def list_vips() -> list:
    with _lock:
        return list(_load().get("vips", []))


def add_vip(user_id: int) -> bool:
    with _lock:
        data = _load()
        if user_id in data["vips"]:
            return False
        data["vips"].append(user_id)
        _save(data)
        return True


def remove_vip(user_id: int) -> bool:
    with _lock:
        data = _load()
        if user_id not in data["vips"]:
            return False
        data["vips"].remove(user_id)
        _save(data)
        return True


def get_stats() -> dict:
    with _lock:
        s = _load()["stats"]
        return {"total_likes": s.get("total_likes", 0),
                "total_users": len(s.get("total_users", []))}
