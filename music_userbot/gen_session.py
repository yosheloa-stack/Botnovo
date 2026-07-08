"""
Gera a SESSION_STRING da conta que vai tocar música (o userbot).

Rode UMA vez, no seu PC ou no terminal da host:
    python gen_session.py

Ele pede API_ID, API_HASH, seu telefone e o código que o Telegram manda.
No fim, copia a SESSION_STRING que aparecer e cola no arquivo .env.
"""
from pyrogram import Client

print("=== Gerar SESSION_STRING (AURORA MUSIC) ===\n")
api_id = int(input("API_ID: ").strip())
api_hash = input("API_HASH: ").strip()

with Client("gerador", api_id=api_id, api_hash=api_hash, in_memory=True) as app:
    s = app.export_session_string()
    print("\n==================== SESSION_STRING ====================\n")
    print(s)
    print("\n========================================================")
    print("Copie a linha acima e cole em SESSION_STRING no arquivo .env")
