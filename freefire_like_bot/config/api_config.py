# ==========================================================
#   🔌  CONFIGURAÇÃO DA API DE LIKE  —  EDITE AQUI
# ==========================================================
#
#  Quando você me mandar os dados da SUA API de Like,
#  é SÓ preencher aqui embaixo. O resto do bot já funciona.
#
#  A maioria das APIs de Like de Free Fire é assim:
#
#     GET https://sua-api.com/like?uid=123&server_name=BR&key=SUA_CHAVE
#
#  e responde um JSON tipo:
#
#     {
#       "status": 1,
#       "player": "NICKNAME",
#       "likes_before": 100,
#       "likes_after": 200,
#       "likes_added": 100
#     }
# ==========================================================

# 1) Endereço base da API (sem os parâmetros ?uid=...):
API_BASE_URL = "https://sua-api-aqui.com/like"

# 2) Sua chave da API (deixe "" se a sua API não usar chave):
API_KEY = ""

# 3) Método HTTP: "GET" ou "POST"
API_METHOD = "GET"

# 4) Como os parâmetros se chamam NA SUA API.
#    A chave = nome que a SUA api espera.
#    O valor = de onde o bot pega o dado.
#       "{uid}"    -> o UID que o usuário digitou
#       "{region}" -> a região escolhida (BR, IND, US, etc)
#       "{key}"    -> a API_KEY de cima
#
#    Exemplo p/ a api do modelo lá em cima:
#       "uid": "{uid}", "server_name": "{region}", "key": "{key}"
API_PARAMS = {
    "uid": "{uid}",
    "server_name": "{region}",
    "key": "{key}",
}

# 5) Cabeçalhos extras, se a sua API pedir (senão deixe {}).
#    Ex: {"Authorization": "Bearer SUA_CHAVE"}
API_HEADERS = {}

# 6) Nome dos campos NA RESPOSTA da sua API.
#    Se a sua api responde com nomes diferentes, troque aqui.
RESPONSE_FIELDS = {
    "success_field": "status",   # campo que diz se deu certo
    "success_value": 1,          # valor que significa "sucesso"
    "nickname": "player",        # nome do jogador
    "likes_before": "likes_before",
    "likes_after": "likes_after",
    "likes_added": "likes_added",
}

# 7) Regiões que aparecem no menu do bot (pode adicionar/remover).
REGIONS = ["BR", "NA", "SAC", "US", "IND", "SG", "ID", "ME", "EU"]

# 8) Quantos likes um usuário comum pode pedir por dia (anti-spam).
#    Donos não têm limite.
DAILY_LIMIT_PER_USER = 1
