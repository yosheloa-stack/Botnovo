"""
Cliente da API de Like de Free Fire.

Tudo é configurável na pasta config/api_config.py — este arquivo só
monta a requisição do jeito que você configurou e interpreta a resposta.
"""
import asyncio
import logging

import httpx

from core import settings

log = logging.getLogger(__name__)


class LikeResult:
    """Resultado padronizado de um envio de like."""

    def __init__(self, ok, nickname="", uid="", region="", likes_before=0,
                 likes_after=0, likes_added=0, at_max=False, error=""):
        self.ok = ok
        self.nickname = nickname
        self.uid = uid
        self.region = region
        self.likes_before = likes_before
        self.likes_after = likes_after
        self.likes_added = likes_added
        self.at_max = at_max          # True = jogador já no limite diário
        self.error = error


def _build_params(uid: str, region: str) -> dict:
    """Monta os parâmetros trocando os {placeholders} pelos valores reais."""
    values = {"uid": uid, "region": region, "key": settings.API_KEY}
    params = {}
    for api_key, template in settings.API_PARAMS.items():
        try:
            params[api_key] = template.format(**values)
        except (KeyError, IndexError):
            params[api_key] = template
    return params


def _parse_response(data: dict, uid: str, region: str) -> LikeResult:
    """Lê o JSON da resposta usando os nomes de campo configurados."""
    f = settings.RESPONSE_FIELDS

    def field(name, default=0):
        return data.get(f.get(name, name), default)

    success_field = f.get("success_field", "status")
    success_value = f.get("success_value", 1)
    status = data.get(success_field)

    nickname = field("nickname", "Jogador")
    likes_before = field("likes_before", 0)
    likes_after = field("likes_after", 0)
    likes_added = field("likes_added", 0)

    # Detecta "já no limite": sucesso mas 0 likes adicionados.
    if str(status) == str(success_value):
        try:
            added = int(likes_added)
        except (TypeError, ValueError):
            added = 0
        if added <= 0 and int(_safe(likes_after)) == int(_safe(likes_before)):
            return LikeResult(ok=False, at_max=True, uid=uid, region=region,
                              nickname=str(nickname))
        return LikeResult(
            ok=True, uid=uid, region=region, nickname=str(nickname),
            likes_before=likes_before, likes_after=likes_after,
            likes_added=likes_added,
        )

    return LikeResult(ok=False, uid=uid, region=region,
                      error=str(data.get("message", "Resposta inválida da API")))


def _safe(v):
    try:
        return int(v)
    except (TypeError, ValueError):
        return 0


async def send_like(uid: str, region: str) -> LikeResult:
    """Envia 1 like para o UID/região. Retorna um LikeResult."""
    if not settings.API_BASE_URL or "sua-api-aqui" in settings.API_BASE_URL:
        return LikeResult(
            ok=False, uid=uid, region=region,
            error="A API de Like ainda não foi configurada em config/api_config.py",
        )

    params = _build_params(uid, region)
    headers = dict(settings.API_HEADERS)

    try:
        async with httpx.AsyncClient(timeout=25) as client:
            if settings.API_METHOD.upper() == "POST":
                resp = await client.post(settings.API_BASE_URL, json=params, headers=headers)
            else:
                resp = await client.get(settings.API_BASE_URL, params=params, headers=headers)
        resp.raise_for_status()
        try:
            data = resp.json()
        except Exception:
            return LikeResult(ok=False, uid=uid, region=region,
                              error="A API não respondeu em JSON.")
        return _parse_response(data, uid, region)

    except httpx.HTTPStatusError as e:
        return LikeResult(ok=False, uid=uid, region=region,
                          error=f"Erro HTTP {e.response.status_code} da API.")
    except httpx.RequestError as e:
        return LikeResult(ok=False, uid=uid, region=region,
                          error=f"Não consegui conectar na API ({e.__class__.__name__}).")
    except Exception as e:  # noqa: BLE001
        log.exception("Erro inesperado no send_like")
        return LikeResult(ok=False, uid=uid, region=region, error=str(e))
