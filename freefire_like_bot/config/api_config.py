# ==========================================================
#   🔌  CONFIGURAÇÃO DA API DE LIKE (Frifas Likes API)
# ==========================================================
#
#  As CHAVES/TOKENS secretos NÃO ficam aqui (por segurança).
#  Eles ficam no arquivo .env:
#       FRIFAS_KEY        -> a chave 'key' da API (envio de like)
#       FRIFAS_OPEN       -> o seu token OPEN   (auto-like)
#       FRIFAS_ACCESS_ID  -> o seu ACCESS ID    (auto-like)
#
#  Aqui embaixo ficam só os ajustes que não são secretos.
# ==========================================================

# Endereço base da API (normalmente não muda):
API_BASE_URL = "https://fluxdevservice.com/api/frifas"

# --- Regras de uso ---

# Quantos likes um usuário COMUM (não-VIP) pode pedir por dia.
# VIP é ilimitado.
NON_VIP_DAILY_LIMIT = 1

# Hora (horário de Brasília) em que o limite diário zera e o
# auto-like da API roda. A API processa às 13:00 BRT.
RESET_HOUR_BRT = 13

# Quantos dias um ID fica no auto-like quando um dono adiciona
# (o padrão; o dono pode escolher outro na hora de adicionar).
DEFAULT_AUTO_DAYS = 30
