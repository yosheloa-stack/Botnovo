"""
Armazenamento simples em JSON (sem banco de dados).

Guarda:
  - limite diário de likes por usuário
  - lista de UIDs do Auto Like
"""
import json
import threading
from datetime import date
from pathlib import Path

_DATA_FILE = Path(__file__).resolve().parent.parent / "data.json"
_lock = threading.Lock()

_DEFAULT = {
    "daily": {},        # { "user_id": {"date": "2026-07-07", "count": 1} }
    "autolike": [],     # [ {"uid": "123", "region": "BR", "added_by": 111} ]
    "stats": {"total_likes": 0, "total_users": []},
}


def _load() -> dict:
    if _DATA_FILE.exists():
        try:
            data = json.loads(_DATA_FILE.read_text(encoding="utf-8"))
            for k, v in _DEFAULT.items():
                data.setdefault(k, v if not isinstance(v, (dict, list)) else type(v)())
            return data
        except Exception:
            pass
    return json.loads(json.dumps(_DEFAULT))


def _save(data: dict) -> None:
    _DATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


# ----------------- Limite diário -----------------
def can_use_today(user_id: int, limit: int) -> bool:
    with _lock:
        data = _load()
        rec = data["daily"].get(str(user_id))
        today = date.today().isoformat()
        if not rec or rec.get("date") != today:
            return True
        return rec.get("count", 0) < limit


def register_use(user_id: int) -> None:
    with _lock:
        data = _load()
        today = date.today().isoformat()
        rec = data["daily"].get(str(user_id))
        if not rec or rec.get("date") != today:
            rec = {"date": today, "count": 0}
        rec["count"] += 1
        data["daily"][str(user_id)] = rec
        data["stats"]["total_likes"] = data["stats"].get("total_likes", 0) + 1
        if user_id not in data["stats"]["total_users"]:
            data["stats"]["total_users"].append(user_id)
        _save(data)


# ----------------- Auto Like -----------------
def add_autolike(uid: str, region: str, added_by: int) -> bool:
    with _lock:
        data = _load()
        for item in data["autolike"]:
            if item["uid"] == uid:
                return False
        data["autolike"].append({"uid": uid, "region": region, "added_by": added_by})
        _save(data)
        return True


def remove_autolike(uid: str) -> bool:
    with _lock:
        data = _load()
        before = len(data["autolike"])
        data["autolike"] = [i for i in data["autolike"] if i["uid"] != uid]
        changed = len(data["autolike"]) != before
        if changed:
            _save(data)
        return changed


def list_autolike() -> list:
    with _lock:
        return _load()["autolike"]


def get_stats() -> dict:
    with _lock:
        s = _load()["stats"]
        return {"total_likes": s.get("total_likes", 0),
                "total_users": len(s.get("total_users", []))}
