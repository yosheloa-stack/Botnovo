# Aurora System

Bot de WhatsApp do Aurora System. O aluguel de grupos pode ser ativado automaticamente pela Kasane após a confirmação do pagamento.

## Variáveis de ambiente

- `AURORA_OWNER_NUMBER` — número do dono, somente dígitos.
- `AURORA_CONNECTION_NUMBER` — número do WhatsApp que será conectado ao bot.
- `AUTOSYSTEM_URL` — URL da Kasane.
- `AUTOSYSTEM_TOKEN` — key usada pelos comandos de Free Fire.
- `AURORA_RENTAL_TOKEN` — segredo compartilhado apenas entre Kasane e Aurora para os aluguéis automáticos.

O bot consulta a Kasane periodicamente. Quando encontra um pedido pago, valida o link de convite, entra no grupo, registra a validade e responde o resultado ao site. Ao vencer, sai do grupo automaticamente.
