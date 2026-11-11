# Aurora System

Bot de WhatsApp do Aurora System. O aluguel de grupos pode ser ativado automaticamente pela Kasane após a confirmação do pagamento.

## Variáveis de ambiente

- `AURORA_OWNER_NUMBER` — número do dono, somente dígitos.
- `AURORA_CONNECTION_NUMBER` — número do WhatsApp que será conectado ao bot.
- `AUTOSYSTEM_URL` — URL da Kasane.
- `AUTOSYSTEM_TOKEN` — key usada pelos comandos de Free Fire.
- `AURORA_RENTAL_TOKEN` — segredo compartilhado apenas entre Kasane e Aurora para os aluguéis automáticos.
- `AURORA_IA_NUMERO` — opcional, o número do bot que tem a Aurora com IA (padrão `5598970016740`, só dígitos). Veja "Aurora com IA".
- `SQUARECLOUD_API_KEY` — liga a Aurora com IA. É a API key da conta da Square Cloud com a permissão `ai:chat` (a mesma do suporte com IA do site).
- `AURORA_MAX_DIA` — opcional, quantas respostas da IA por dia (padrão 300). O limite do plano da Square Cloud é dividido com o site.
- `ELEVENLABS_API_KEY` — opcional, liga a voz da Aurora (ElevenLabs). Quando pedem áudio ela responde com mensagem de voz, e às vezes manda áudio sozinha em respostas curtas. A voz vai do jeito dela (sem filtro e sem mudar o ajuste), falando o texto que a IA escreveu. Link, @, ID e lista ficam sempre no texto; se a ElevenLabs falhar, sai texto. `ELEVENLABS_VOZ` (padrão `NS7yU4WmAouJsg84X3Mg`), `ELEVENLABS_MODELO` (padrão `eleven_v3`; sem ele na conta, cai pro `eleven_multilingual_v2`), `AURORA_AUDIO_CHANCE` (padrão 0.2) e `AURORA_AUDIO_DIA` (padrão 80 áudios por dia) são opcionais; o `#auroravoz` lista as vozes da conta e escolhe pelo nome.
- `HIGGSFIELD_KEY_ID` e `HIGGSFIELD_KEY_SECRET` — opcionais, ligam o vídeo Genjutsu da Aurora (API da Higgsfield, saldo próprio em dólar no console da Higgsfield; o plano do site não vale na API). A pessoa manda um vídeo de 4 a 15 s e uma foto e fala "aurora coloca eu nesse vídeo" (ou responde o vídeo com a foto); "aurora troca X do vídeo por Y" troca uma coisa. O vídeo pronto volta na conversa em alguns minutos. `AURORA_GENJUTSU_RES` (480p, 720p padrão, 1080p) e `AURORA_GENJUTSU_MAX_SEG` (padrão 15) são opcionais. O `#genjutsu` (criador) mostra o estado e muda quem pode pedir (`todos`, padrão; `donos`; `criador`) e o limite por dia (`#genjutsu limite 3`, padrão 3; 1 por pessoa; o criador não conta).

O bot consulta a Kasane periodicamente. Quando encontra um pedido pago, valida o link de convite, entra no grupo, registra a validade e responde o resultado ao site. Ao vencer, sai do grupo automaticamente.

## Aurora com IA

Com `SQUARECLOUD_API_KEY` no ambiente, a Aurora conversa como gente, usando o
AI Gateway da Square Cloud (modelo `cubic`). **Só num bot:** o que está
conectado no número `5598970016740` (o "Aurora System" do dono; com ou sem o
nono dígito dá no mesmo). Os outros bots de cliente e o bot principal (número
da casa) ficam sem ela. Pra trocar o número, ponha `AURORA_IA_NUMERO` no
ambiente e reinicie o app. Nesse bot a resposta dela sai sem a troca de marca
(continua "Aurora" e com o endereço do site), e o `#auroraia` mostra em qual
número ela está.

- **O criador:** é o número que recebe os avisos de compra (ajuste "WhatsApp
  que recebe os avisos" no admin do site). O bot da IA pergunta ao painel do
  site ao ligar e confere a cada 10 min; o bot que manda os avisos também
  fica sabendo pela fila. `AURORA_CRIADOR` no ambiente serve até chegar. Só ele
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

## Black IA (#black)

Uma IA separada da Aurora, a mesma Black IA do site: conversa e cria imagens.
Quem responde é a API do site (`/v1/yosh`, nome interno antigo), paga pelo
**saldo da key da Black IA** da conta dona do `AUTOSYSTEM_TOKEN` deste bot
(recarregado no site, aba Black IA, só com pagamento na hora). Não precisa de
variável nova no bot. A resposta sai no idioma do grupo (`#idioma`), e cada
grupo tem a sua conversa.

- `#black texto` conversa; `#black imagem descrição 16:9` gera imagem (auto,
  1:1, 16:9, 9:16, 4:3, 3:4); `#black modelos`; `#black criar fast texto`
  começa conversa nova com outro modelo (max, lite, fast); `#black chat nome
  texto` fala numa conversa com nome; `#black reset` apaga a memória;
  `#black ajuda`. Também atende por `#blackia`, `#iablack` e pelos nomes
  antigos `#yosh`, `#yoshia` e `#iayosh`.
- Freio: 6 mensagens por minuto e 2 imagens a cada 5 minutos por pessoa.

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

## Lista negra (#addblacklist)

Números que o bot remove na hora quando entram em qualquer grupo onde ele é
ADM. O pedido de remoção sai no mesmo instante em que o WhatsApp avisa da
entrada (antes do bem-vindo e de qualquer consulta), então a pessoa não tem
tempo de mandar mensagem. Só o dono e os subdonos mexem na lista.

- `#addblacklist 5521988887777 motivo` põe na lista (com DDI; pode mandar
  vários números de uma vez; o motivo é opcional). Também vale marcar ou
  responder a pessoa dentro do grupo: aí ela já sai de lá na hora.
- `#delblacklist 5521988887777` tira da lista. `#blacklist` mostra a lista.
- Celular do Brasil com ou sem o 9 depois do DDD é a mesma pessoa.
- Grupo com LID: ao cadastrar, o bot já descobre o código (LID) do número,
  pra reconhecer a entrada sem consultar nada.
- Grupo com aprovação: o pedido de entrada de quem está na lista é recusado.
- Se o bot não for ADM, ele avisa no grupo. Se a pessoa escapar (bot fora do
  ar na hora), a primeira mensagem dela é apagada e ela sai do grupo.
- Dono, subdonos e o número do bot nunca entram na lista.
- Cada bot tem a sua lista (bot de cliente usa a lista do dono dele).
