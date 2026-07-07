# 🔥 BOT DE LIKE FREE FIRE (Telegram)

Bot de Telegram para enviar **Like de Free Fire**, com layout bonito,
2 donos, painel de dono e **Auto Like** automático todo dia.

---

## ⚡ Passo a passo (rápido)

### 1. Instalar o Python e as dependências
```bash
cd freefire_like_bot
pip install -r requirements.txt
```

### 2. Colocar o token (arquivo secreto `.env`)
```bash
cp .env.example .env
```
Depois abra o `.env` e cole o **token do @BotFather** em `BOT_TOKEN=`.

> 🔒 O `.env` não vai pro GitHub — é onde ficam os segredos.

### 3. Colocar os 2 donos
Abra `config/owners.py` e troque os IDs de exemplo pelo **seu ID** e o do
outro dono. (Pra achar seu ID, fale com o bot **@userinfobot** no Telegram.)

### 4. Colocar a API de Like
Abra `config/api_config.py` e preencha `API_BASE_URL`, `API_KEY` e os
parâmetros. Tem exemplos comentados dentro do arquivo.

### 5. Rodar o bot
```bash
python bot.py
```
Abra o Telegram, chame o bot e mande `/start`. 🎉

---

## 🎨 Trocar o layout (tema)

No `.env`, mude a linha `ACTIVE_THEME`. Opções:

| Tema | Estilo |
|------|--------|
| `fire` | 🔥 Gamer / fogo (padrão) |
| `neon` | ⚡ Cyberpunk / futurista |
| `clean` | 🤍 Minimalista / elegante |
| `premium` | 💎 VIP / dourado |

---

## 📁 O que você edita

```
freefire_like_bot/
├── .env                  ← token + tema (você cria a partir do .env.example)
└── config/
    ├── owners.py         ← os 2 DONOS
    └── api_config.py     ← a API de Like
```
O resto do código não precisa ser tocado.

---

## 🤖 Comandos

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `/start` | todos | abre o menu bonito |
| `/menu` | todos | volta ao menu |
| `/delauto UID` | dono | remove um ID do Auto Like |
| `/autolist` | dono | lista os IDs do Auto Like |

O **Auto Like** roda sozinho todo dia às 10:00, mandando like pra todos os
IDs que os donos cadastrarem no painel.
