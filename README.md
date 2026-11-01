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
- `ELEVENLABS_API_KEY` — opcional, liga a voz da Aurora (ElevenLabs). Quando pedem áudio ela responde com mensagem de voz, e às vezes manda áudio sozinha em respostas curtas. A voz vai do jeito dela (sem filtro e sem mudar o ajuste), falando o texto que a IA escreveu. Link, @, ID e lista ficam sempre no texto; se a ElevenLabs falhar, sai texto. `ELEVENLABS_VOZ` (padrão `NS7yU4WmAouJsg84X3Mg`), `ELEVENLABS_MODELO` (padrão `eleven_v3`; sem ele na conta, cai pro `eleven_multilingual_v2`), `AURORA_AUDIO_CHANCE` (padrão 0.2) e `AURORA_AUDIO_DIA` (padrão 80 áudios por dia) são opcionais; o `#auroravoz` lista as vozes da conta e escolhe pelo nome.
- `HIGGSFIELD_KEY_ID` e `HIGGSFIELD_KEY_SECRET` — opcionais, ligam o vídeo Genjutsu da Aurora (API da Higgsfield, saldo próprio em dólar no console da Higgsfield; o plano do site não vale na API). A pessoa manda um vídeo de 4 a 15 s e uma foto e fala "aurora coloca eu nesse vídeo" (ou responde o vídeo com a foto); "aurora troca X do vídeo por Y" troca uma coisa. O vídeo pronto volta na conversa em alguns minutos. `AURORA_GENJUTSU_RES` (480p, 720p padrão, 1080p) e `AURORA_GENJUTSU_MAX_SEG` (padrão 15) são opcionais. O `#genjutsu` (criador) mostra o estado e muda quem pode pedir (`todos`, padrão; `donos`; `criador`) e o limite por dia (`#genjutsu limite 3`, padrão 3; 1 por pessoa; o criador não conta).

O bot consulta a Kasane periodicamente. Quando encontra um pedido pago, valida o link de convite, entra no grupo, registra a validade e responde o resultado ao site. Ao vencer, sai do grupo automaticamente.

## Aurora com IA

Com `SQUARECLOUD_API_KEY` no ambiente, a Aurora conversa como gente, usando o
AI Gateway da Square Cloud (modelo `cubic`). Só no bot da casa: bot de
cliente não tem, menos o que roda no número da casa (quando o dono alugou um
bot pro próprio número, que é o que manda os avisos de compra). Pra usar outro
número, ponha `AURORA_IA_NUMERO`. Nesse bot a resposta dela sai sem a troca de
marca (continua "Aurora" e com o endereço do site).

- **O criador:** é o número que recebe os avisos de compra (o site informa a
  cada volta da fila; `AURORA_CRIADOR` no ambiente serve até chegar). Só ele
  faz ela mandar like e falar do sistema por dentro; dono, subdono e admin do
  bot não contam. `#auroraia` mostra qual número ela reconhece.
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
  (dono: liga/desliga no bot inteiro e mostra como ela está) e `#auroravoz` (criador: troca a voz dos áudios pelo nome de uma voz da conta na ElevenLabs (`#auroravoz padrao` volta pra padrão) e a velocidade: lenta/normal/rapida; `#auroravoz estilo sombria|fofa|animada|calma` ou um texto livre muda o jeito de falar nos áudios).
- **Personalidade e conhecimento:** `sistema/funcoes/aurora/conhecimento.js`.

## Aviso pra todos os clientes (#aviso)

`#aviso texto` (só o criador, ou o dono do bot da casa) manda o texto pra todo
cliente com WhatsApp em "Minha conta" no site. O bot repassa pro site, que põe
na fila de cada cliente (com o nome e o rodapé no idioma dele) e solta UM por
vez, a cada ~40 s com variação, pro número não ser bloqueado. Os avisos de
entrega continuam saindo na hora. `#aviso` mostra o andamento e
`#aviso cancelar` para o que ainda não saiu. O mesmo texto duas vezes em 30 min
é recusado (engano).

## Limite de IDs por pessoa (#configurarff)

`#configurarff 3` limita quantos `#like` cada pessoa manda por dia no grupo
(`#configurarff 0` = sem limite; grupo que nunca configurou fica sem limite).
Vale só pro bot que recebeu, naquele grupo: cada bot tem o próprio banco. Num
grupo com vários bots, só muda o bot do dono que mandou (dona, subdono ou quem
alugou o grupo). ADM do grupo que não é dono muda um bot marcando ele junto
(`#configurarff 3 @bot`) ou respondendo uma mensagem dele. O dono do bot e
quem alugou o grupo não entram no limite, e like que não entrou não gasta.
