# 🎵 AURORA MUSIC — tocar música na ligação (voice chat)

Userbot que entra na **ligação/voice chat** de um grupo do Telegram e
toca música. Roda **separado** do AURORA SYSTEM (é outro programa).

> ⚠️ É um **userbot**: usa uma **conta de telefone** (não o token do bot),
> porque bots do Telegram não conseguem entrar em ligação.

---

## O que você precisa
1. Uma **conta de Telegram** pro userbot (pode ser um número seu ou um segundo número)
2. **API_ID** e **API_HASH** — pegue em **my.telegram.org** → "API development tools"
3. **ffmpeg** instalado no servidor (o PyTgCalls precisa dele)
4. A conta do userbot tem que estar **no grupo** e ser **admin** com permissão de **gerenciar chamadas de voz**

---

## Passo a passo
### 1. Instalar
```bash
cd music_userbot
pip install -r requirements.txt
```

### 2. Gerar a SESSION_STRING (uma vez)
```bash
python gen_session.py
```
Informe API_ID, API_HASH, telefone e o código que o Telegram enviar.
Copie a `SESSION_STRING` que aparecer.

### 3. Configurar
```bash
cp .env.example .env
```
Preencha `API_ID`, `API_HASH` e `SESSION_STRING`. A `TOKITO_API_KEY` já vem.

### 4. Rodar
```bash
python main.py
```

### 5. Usar (no grupo)
1. **Abra a ligação** (voice chat) do grupo
2. Mande: `/play nome da música`

---

## Comandos
| Comando | O que faz |
|---|---|
| `/play <música>` | toca ou põe na fila |
| `/skip` | pula pra próxima |
| `/pause` / `/resume` | pausa / continua |
| `/stop` | para e sai da ligação |
| `/fila` | mostra a fila |

---

## ⚠️ Observações importantes
- Precisa de **ffmpeg** no servidor. Na Bronxy, confirme que a imagem tem ffmpeg
  (se não tiver, a gente vê como instalar).
- Roda em um **servidor separado** do AURORA SYSTEM (cada um é um `python` próprio).
- Se der erro ao instalar `pyrofork`/`py-tgcalls`, me avise que ajusto as versões —
  essas libs são sensíveis a versão e ambiente.
- Esta é a primeira versão e ainda **não foi testada em ligação real** — vamos
  ajustar juntos nos primeiros testes.
