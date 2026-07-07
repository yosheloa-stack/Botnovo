"""Teclados (botões inline) do bot."""
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

from core import settings


def main_menu(is_owner: bool) -> InlineKeyboardMarkup:
    rows = [
        [InlineKeyboardButton("🎯 Enviar Like", callback_data="menu:like")],
        [
            InlineKeyboardButton("👤 Meu Perfil", callback_data="menu:profile"),
            InlineKeyboardButton("ℹ️ Ajuda", callback_data="menu:help"),
        ],
    ]
    if is_owner:
        rows.append([InlineKeyboardButton("👑 Painel do Dono", callback_data="menu:admin")])
    return InlineKeyboardMarkup(rows)


def region_menu() -> InlineKeyboardMarkup:
    regions = settings.REGIONS
    rows, row = [], []
    for i, r in enumerate(regions, 1):
        row.append(InlineKeyboardButton(f"🌎 {r}", callback_data=f"region:{r}"))
        if i % 3 == 0:
            rows.append(row)
            row = []
    if row:
        rows.append(row)
    rows.append([InlineKeyboardButton("⬅️ Voltar", callback_data="menu:home")])
    return InlineKeyboardMarkup(rows)


def back_home() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [[InlineKeyboardButton("⬅️ Menu", callback_data="menu:home")]]
    )


def admin_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("➕ Add Auto Like", callback_data="admin:add_auto")],
        [InlineKeyboardButton("📋 Lista Auto Like", callback_data="admin:list_auto")],
        [InlineKeyboardButton("📊 Estatísticas", callback_data="admin:stats")],
        [InlineKeyboardButton("⬅️ Menu", callback_data="menu:home")],
    ])
