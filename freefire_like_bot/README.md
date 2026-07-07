# 🔥 AURORA SYSTEM — Bot de Like Free Fire (Telegram)

Bot de Telegram para enviar **Like de Free Fire**, com layout bonito,
2 donos, sistema **VIP × comum** e **Auto Like** diário (feito pela API
todo dia às **13:00 de Brasília**).

Usa a **Frifas Likes API** (`fluxdevservice.com/api/frifas`).

---

## ⚡ Passo a passo

### 1. Instalar dependências
```bash
cd freefire_like_bot
pip install -r requirements.txt
```

### 2. Criar o arquivo secreto `.env`
```bash
cp .env.example .env
```
Depois abra o `.env` e preencha:
- `BOT_TOKEN` → token do @BotFather
- `FRIFAS_KEY` → a **key** da API de Like  *(é o que envia os likes)*
- `FRIFAS_OPEN` → seu token **OPEN** (auto-like)
- `FRIFAS_ACCESS_ID` → seu **ACCESS ID** (auto-like)

> 🔒 O `.env` não vai pro GitHub — é onde ficam os segredos.

### 3. Colocar os 2 donos
Abra `config/owners.py` e troque os IDs de exemplo. (Descubra seu ID
falando com **@userinfobot** no Telegram.)

### 4. (Opcional) VIPs fixos
Abra `config/vips.py` e adicione os IDs. Também dá pra fazer pelo Telegram:
`/addvip ID` e `/delvip ID`.

### 5. Rodar
```bash
python bot.py
```

---

## 💎 VIP × 👤 Comum

| | Likes | Reset |
|---|---|---|
| 💎 **VIP** (e donos) | **Ilimitado** | 13:00 BRT |
| 👤 **Comum** | **1 por dia** | 13:00 BRT |

O **Auto Like** é registrado pelo dono (via painel) e a **API manda os
likes sozinha todo dia às 13:00 (Brasília)** para os IDs cadastrados.

---

## 🎨 Trocar o layout (tema)
No `.env`, mude `ACTIVE_THEME`. Opções: `fire` 🔥 | `neon` ⚡ | `clean` 🤍 | `premium` 💎

---

## 🤖 Comandos

| Comando | Quem | O que faz |
|---------|------|-----------|
| `/start` | todos | abre o menu |
| `/menu` | todos | volta ao menu |
| `/addvip ID` | dono | vira VIP |
| `/delvip ID` | dono | tira o VIP |
| `/vips` | dono | lista os VIPs |

No **Painel do Dono** (botão no menu): adicionar conta no Auto Like,
listar contas cadastradas e ver as vagas do Open.

---

## 📁 O que você edita
```
freefire_like_bot/
├── .env                  ← tokens (você cria a partir do .env.example)
└── config/
    ├── owners.py         ← os 2 DONOS
    ├── vips.py           ← VIPs fixos (opcional)
    └── api_config.py     ← ajustes (limite, dias do auto-like)
```
