"""
Cliente da Frifas Likes API (https://fluxdevservice.com/api/frifas).

Endpoints usados:
  - GET /sendlikes?key=&id=                     -> like manual
  - GET /add-auto?key=&id=&dias=&open=          -> registra no auto-like
  - GET /list-open?key=&access_id=              -> lista contas do auto-like
  - GET /info-open?key=&access_id=              -> info do open (vagas etc)
"""
import logging

import httpx

from core import settings

log = logging.getLogger(__name__)

# Códigos de erro da API -> mensagem amigável em PT-BR.
ERROR_MESSAGES = {
    "ID_REQUIRED": "Você não informou o ID.",
    "INVALID_REQUEST": "Esse ID é inválido, confere e tenta de novo.",
    "INVALID_KEY": "A chave da API (key) está errada ou não foi configurada.",
    "KEY_BANNED": "A chave da API foi banida.",
    "EXPIRED_KEY": "A chave da API expirou.",
    "PLAYER_NOT_FOUND": "Jogador não encontrado — esse ID não existe.",
    "AUTOLIKE_ACTIVE": "Essa conta já está no auto-like.",
    "REQUEST_BLOCKED": "Esse ID já recebeu likes nas últimas 24h.",
    "DAILY_LIMIT_EXCEEDED": "O limite diário da API foi atingido, tenta mais tarde.",
    "SERVICE_UNAVAILABLE": "O serviço de likes está fora do ar, tenta mais tarde.",
    "SERVICE_ERROR": "Sessão do auto-like expirada. Gere um ACCESS ID/OPEN novo no painel da API.",
    "TIMEOUT": "A API demorou demais pra responder.",
}
# Erros que significam "esse UID já está no limite" (usam a tela fail_max).
AT_MAX_CODES = {"REQUEST_BLOCKED", "AUTOLIKE_ACTIVE"}


class LikeResult:
    def __init__(self, ok, nickname="", uid="", region="", likes_before=0,
                 likes_after=0, likes_added=0, at_max=False, error="", code=""):
        self.ok = ok
        self.nickname = nickname
        self.uid = uid
        self.region = region
        self.likes_before = likes_before
        self.likes_after = likes_after
        self.likes_added = likes_added
        self.at_max = at_max
        self.error = error
        self.code = code


def _friendly(code, fallback=""):
    return ERROR_MESSAGES.get(code, fallback or "erro desconhecido")


# A API às vezes usa nomes em PT (sucesso/status/mensagem) e às vezes em
# EN (success/error/message). Estes helpers aceitam os dois.
def _is_ok(data: dict) -> bool:
    return bool(data.get("success", data.get("sucesso", False)))


def _err_code(data: dict) -> str:
    return str(data.get("error") or data.get("status") or "ERRO")


def _err_msg(data: dict) -> str:
    return data.get("message") or data.get("mensagem") or ""


async def _request(path: str, params: dict) -> dict:
    """Faz o GET e devolve o JSON (mesmo em erro HTTP, pois a API manda JSON útil)."""
    url = f"{settings.API_BASE_URL}{path}"
    async with httpx.AsyncClient(timeout=40) as client:
        resp = await client.get(url, params=params)
    try:
        return resp.json()
    except Exception:
        return {"success": False, "error": f"HTTP_{resp.status_code}",
                "message": "A API não respondeu em JSON."}


def _err_result(data, uid="", region=""):
    code = _err_code(data)
    msg = _friendly(code, _err_msg(data))
    return LikeResult(ok=False, uid=uid, region=region, error=msg, code=code,
                      at_max=code in AT_MAX_CODES)


async def send_like(uid: str) -> LikeResult:
    """Envia likes para um UID (like manual)."""
    if not settings.FRIFAS_KEY:
        return LikeResult(ok=False, uid=uid,
                          error="A chave da API (FRIFAS_KEY) ainda não foi configurada no .env",
                          code="NO_KEY")
    try:
        data = await _request("/sendlikes", {"key": settings.FRIFAS_KEY, "id": uid})
    except httpx.RequestError as e:
        return LikeResult(ok=False, uid=uid,
                          error=f"Não consegui conectar na API ({e.__class__.__name__}).")

    if not _is_ok(data):
        return _err_result(data, uid=uid)

    try:
        item = (data.get("data") or [{}])[0]
        conta = item.get("conta", {})
        likes = item.get("likes", {})
        return LikeResult(
            ok=True, uid=uid,
            nickname=conta.get("nome_conta") or conta.get("player") or "Jogador",
            region=conta.get("region", ""),
            likes_before=likes.get("antes", 0),
            likes_after=likes.get("depois", 0),
            likes_added=likes.get("enviadas", 0),
        )
    except Exception as e:  # noqa: BLE001
        log.exception("Erro ao ler resposta do sendlikes")
        return LikeResult(ok=False, uid=uid, error=f"Resposta inesperada da API: {e}")


async def add_auto(uid: str, dias: int) -> LikeResult:
    """Registra um UID no auto-like da API (roda todo dia 13:00 BRT)."""
    if not settings.FRIFAS_KEY or not settings.FRIFAS_OPEN:
        return LikeResult(ok=False, uid=uid,
                          error="Falta configurar FRIFAS_KEY e/ou FRIFAS_OPEN no .env",
                          code="NO_KEY")
    try:
        data = await _request("/add-auto", {
            "key": settings.FRIFAS_KEY, "id": uid,
            "dias": dias, "open": settings.FRIFAS_OPEN,
        })
    except httpx.RequestError as e:
        return LikeResult(ok=False, uid=uid,
                          error=f"Não consegui conectar na API ({e.__class__.__name__}).")

    if not _is_ok(data):
        return _err_result(data, uid=uid)

    conta = (data.get("data") or {}).get("conta", {})
    return LikeResult(ok=True, uid=uid,
                      nickname=conta.get("player", "Jogador"),
                      region=conta.get("region", ""))


async def info_open() -> dict:
    """Info do open (vagas, contas ativas etc). Retorna o dict 'data' ou {'erro': ...}."""
    if not settings.FRIFAS_KEY or not settings.FRIFAS_ACCESS_ID:
        return {"erro": "Falta FRIFAS_KEY e/ou FRIFAS_ACCESS_ID no .env"}
    try:
        data = await _request("/info-open", {
            "key": settings.FRIFAS_KEY, "access_id": settings.FRIFAS_ACCESS_ID})
    except httpx.RequestError as e:
        return {"erro": f"Sem conexão ({e.__class__.__name__})"}
    if not _is_ok(data):
        return {"erro": _friendly(_err_code(data), _err_msg(data))}
    return data.get("data", {})


async def list_open() -> list:
    """Lista as contas do auto-like. Retorna lista (vazia em erro)."""
    if not settings.FRIFAS_KEY or not settings.FRIFAS_ACCESS_ID:
        return []
    try:
        data = await _request("/list-open", {
            "key": settings.FRIFAS_KEY, "access_id": settings.FRIFAS_ACCESS_ID})
    except httpx.RequestError:
        return []
    if not _is_ok(data):
        return []
    return data.get("data", []) or []
