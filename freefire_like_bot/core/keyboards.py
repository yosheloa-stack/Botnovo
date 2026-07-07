"""Teclados (botões inline) do bot."""
from telegram import InlineKeyboardButton, InlineKeyboardMarkup


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


def back_home() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [[InlineKeyboardButton("⬅️ Menu", callback_data="menu:home")]]
    )


def admin_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("➕ Add Auto Like", callback_data="admin:add_auto")],
        [InlineKeyboardButton("📋 Contas no Auto Like", callback_data="admin:list_auto")],
        [InlineKeyboardButton("📦 Info do Open (vagas)", callback_data="admin:info_open")],
        [InlineKeyboardButton("📊 Estatísticas", callback_data="admin:stats")],
        [InlineKeyboardButton("⬅️ Menu", callback_data="menu:home")],
    ])
