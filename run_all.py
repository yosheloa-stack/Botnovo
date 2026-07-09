"""
🚀 LANCHADOR — roda o AURORA SYSTEM (bot de like) e o AURORA MUSIC
(userbot de música) ao mesmo tempo, no MESMO servidor.

Comando de inicialização na host:  python run_all.py

Cada um roda como um processo separado. Se um cair, o lanchador encerra
tudo pra host reiniciar os dois juntos (autorestart).
"""
import os
import subprocess
import sys
import time

BASE = os.path.dirname(os.path.abspath(__file__))

PROGRAMAS = {
    "AURORA SYSTEM": ("freefire_like_bot", "app.py"),
    "AURORA MUSIC": ("music_userbot", "main.py"),
}


def _start(pasta, script):
    return subprocess.Popen([sys.executable, script], cwd=os.path.join(BASE, pasta))


def main():
    procs = {}
    for nome, (pasta, script) in PROGRAMAS.items():
        print(f"[run_all] iniciando {nome} ({pasta}/{script})...")
        procs[nome] = _start(pasta, script)

    try:
        while True:
            for nome, p in procs.items():
                if p.poll() is not None:
                    print(f"[run_all] ⚠️ {nome} saiu (código {p.returncode}). "
                          f"Encerrando tudo pra reiniciar.")
                    for q in procs.values():
                        if q.poll() is None:
                            q.terminate()
                    sys.exit(1)
            time.sleep(5)
    except KeyboardInterrupt:
        for q in procs.values():
            if q.poll() is None:
                q.terminate()


if __name__ == "__main__":
    main()
