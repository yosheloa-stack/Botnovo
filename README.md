# BOTÕES WHATSAPP YOSHGGX

BOT de WhatsApp com botões interativos (native flow / Baileys).

## Instalação

```bash
npm i
```

## Como usar

1. Edite o `index.js` com a sua lógica.
2. **Não toque no `buttons.js`** (ele contém os helpers que fazem os botões funcionarem).
3. Rode o bot:

```bash
node index.js
```

4. Escaneie o QR Code que aparece no terminal com o WhatsApp.
5. Envie `hello` no chat para receber os botões de teste.

## Callplay (ligação real + música)

Recurso extra: o bot pode discar um número de telefone de verdade e tocar
uma música quando a chamada for atendida, usando a API de voz da Twilio.

### Pré-requisitos no servidor

- Binários `yt-dlp` e `ffmpeg` instalados e no `PATH` (usados para achar e
  converter a música em mp3).
- Uma conta Twilio com um número de voz (`TWILIO_FROM_NUMBER`).
- Uma URL pública apontando para este processo (em dev, use `ngrok http 3000`).

### Configuração

```bash
cp .env.example .env
# edite o .env com suas credenciais Twilio, PUBLIC_BASE_URL e OWNER_NUMBER
```

### Modelo de consentimento (importante)

O bot **nunca liga para um número que não deu autorização**. Antes de usar
`!callplay`, o número de destino precisa estar na allowlist:

- A própria pessoa manda **`!optin`** pelo WhatsApp dela (prova que ela é
  dona daquele número) — e pode revogar depois com `!optout`.
- Ou o dono do bot (número definido em `OWNER_NUMBER`) roda **`!allow <numero>`**
  para autorizar manualmente.

Não use este recurso para ligar para números de pessoas que não consentiram —
além de ser perturbação/assédio, normalmente viola os termos de uso da Twilio
e pode infringir regulação de telecom.

### Comandos

- `!optin` — autoriza o seu próprio número a receber chamadas do bot.
- `!optout` — revoga a autorização do seu número.
- `!allow <numero>` — (só o dono do bot) autoriza outro número.
- `!callplay <numero> <nome da música>` — enfileira o pedido; quando
  processado, o bot busca a música, liga para o número e toca a música
  quando atendido, mandando atualizações de status no chat.

---

criador por YoshGGx
