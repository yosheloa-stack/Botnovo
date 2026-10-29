# Aurora System

Bot de WhatsApp do Aurora System. O aluguel de grupos pode ser ativado automaticamente pela Kasane após a confirmação do pagamento.

## Variáveis de ambiente

- `AURORA_OWNER_NUMBER` — número do dono, somente dígitos.
- `AURORA_CONNECTION_NUMBER` — número do WhatsApp que será conectado ao bot.
- `AUTOSYSTEM_URL` — URL da Kasane.
- `AUTOSYSTEM_TOKEN` — key usada pelos comandos de Free Fire.
- `AURORA_RENTAL_TOKEN` — segredo compartilhado apenas entre Kasane e Aurora para os aluguéis automáticos.
- `SQUARECLOUD_API_KEY` — liga a Aurora com IA. É a API key da conta da Square Cloud com a permissão `ai:chat` (a mesma do suporte com IA do site).
- `AURORA_MAX_DIA` — opcional, quantas respostas da IA por dia (padrão 300). O limite do plano da Square Cloud é dividido com o site.

O bot consulta a Kasane periodicamente. Quando encontra um pedido pago, valida o link de convite, entra no grupo, registra a validade e responde o resultado ao site. Ao vencer, sai do grupo automaticamente.

## Aurora com IA

Com `SQUARECLOUD_API_KEY` no ambiente, a Aurora conversa como gente, usando o
AI Gateway da Square Cloud (modelo `cubic`). Só no bot da casa: o bot de
cliente não tem.

- **Quando ela responde:** no privado, sempre. No grupo, quando alguém marca o
  bot, responde (cita) uma mensagem dele ou fala "aurora" na frase. Comando
  continua sendo comando.
- **O que ela sabe:** o site, a API, o aluguel, os comandos do bot e os preços
  de agora (lidos das páginas públicas do site). Se mandarem um ID do Free
  Fire, ela consulta o perfil de verdade pela API. Não inventa preço nem dado.
- **Limites:** uma chamada por vez com 5 s entre elas, 6 perguntas por pessoa
  a cada 10 minutos, 40 por grupo por hora e `AURORA_MAX_DIA` por dia.
- **Comandos:** `#aurora texto` (fala com ela), `#aurora 1/0` (admin liga ou
  desliga no grupo), `#esquecer` (apaga a memória da conversa) e `#auroraia`
  (dono: liga/desliga no bot inteiro e mostra como ela está).
- **Personalidade e conhecimento:** `sistema/funcoes/aurora/conhecimento.js`.
