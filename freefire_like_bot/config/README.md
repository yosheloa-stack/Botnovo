# 📁 Pasta de configuração

Arquivos que você pode mexer aqui:

| Arquivo | Pra quê serve |
|---|---|
| `owners.py` | ID dos **2 donos** do bot |
| `vips.py` | IDs dos **VIPs fixos** (opcional; também dá por comando) |
| `api_config.py` | Ajustes não-secretos (limite diário, dias do auto-like) |

Os **tokens secretos** (token do bot, `FRIFAS_KEY`, `FRIFAS_OPEN`,
`FRIFAS_ACCESS_ID`) **NÃO** ficam aqui — ficam no arquivo `.env` na
pasta principal, que não vai pro GitHub. Veja o `README.md` de fora.

O **layout/tema** é escolhido no `.env` (`ACTIVE_THEME=fire`).
Temas: `fire`, `neon`, `clean`, `premium`.
