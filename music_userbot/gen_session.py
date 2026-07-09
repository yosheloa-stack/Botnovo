"""
Gera a SESSION_STRING da conta que vai tocar música (o userbot).

Rode UMA vez, no console da host (ou no PC):
    python music_userbot/gen_session.py     (ou, dentro da pasta, python gen_session.py)

Ele pega API_ID e API_HASH do .env automaticamente (se estiverem lá),
pede o telefone e o código que o Telegram manda, e mostra a SESSION_STRING.
Copie ela e cole em SESSION_STRING no arquivo .env.
"""
import os
from pathlib import Path

from pyrogram import Client


def _load_env():
    p = Path(__file__).resolve().parent / ".env"
    if p.exists():
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


_load_env()
print("=== Gerar SESSION_STRING (AURORA MUSIC) ===\n")

api_id = os.environ.get("API_ID", "").strip()
api_hash = os.environ.get("API_HASH", "").strip()
if not api_id:
    api_id = input("API_ID: ").strip()
if not api_hash:
    api_hash = input("API_HASH: ").strip()

with Client("gerador", api_id=int(api_id), api_hash=api_hash, in_memory=True) as app:
    s = app.export_session_string()
    print("\n==================== SESSION_STRING ====================\n")
    print(s)
    print("\n========================================================")
    print("Copie a linha acima e cole em SESSION_STRING no arquivo .env")
