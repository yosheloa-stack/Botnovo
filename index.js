// index.js
// BOTÕES WHATSAPP YOSHGGX
// criador por YoshGGx
require('dotenv').config();
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
} = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

const { sendButtons } = require('./buttons'); // helper from your repo
const callplay = require('./callplay');

// -------------------- UTILITIES --------------------

function unwrapMessage(msg) {
    let cur = msg;
    while (
        cur?.ephemeralMessage?.message ||
        cur?.viewOnceMessage?.message ||
        cur?.viewOnceMessageV2?.message
    ) {
        cur =
            cur.ephemeralMessage?.message ||
            cur.viewOnceMessage?.message ||
            cur.viewOnceMessageV2?.message;
    }
    return cur || msg;
}

// -------------------- CORE BOT SETUP --------------------

async function createSocket() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');

    const sock = makeWASocket({
        auth: state,
        emitOwnEvents: false,
    });

    sock.ev.on('creds.update', saveCreds);

    return sock;
}

function registerConnectionHandlers(sock) {
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('Scan this QR with WhatsApp:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect?.error)?.output?.statusCode !==
                DisconnectReason.loggedOut;

            if (shouldReconnect) {
                console.log('Connection closed, reconnecting…');
                startBot(); // simple auto-reconnect using main entry
            } else {
                console.log('Connection closed. You are logged out.');
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp connected');
        }
    });
}

/**
 * Generic message router.
 * `handlers` = { onText, onTemplateButton }
 */
function registerMessageHandlers(sock, handlers) {
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const m = messages[0];
        if (!m || !m.message) return;

        const jid = m.key.remoteJid;
        if (m.key.fromMe || jid === 'status@broadcast') return;

        const msg = unwrapMessage(m.message);

        // ---- TEXT MESSAGE ----
        const rawText =
            msg.conversation ||
            msg.extendedTextMessage?.text ||
            msg.imageMessage?.caption ||
            msg.videoMessage?.caption ||
            '';
        const text = rawText.trim();

        if (text && handlers.onText) {
            await handlers.onText({ sock, jid, text, msg, full: m });
            // don't return; button reply might also have text if you want both
        }

        // ---- TEMPLATE BUTTON CLICK ----
        const tpl = msg.templateButtonReplyMessage;
        if (tpl && handlers.onTemplateButton) {
            const button = {
                id: tpl.selectedId,
                label: tpl.selectedDisplayText,
                raw: tpl,
            };
            await handlers.onTemplateButton({ sock, jid, button, msg, full: m });
        }
    });
}

// -------------------- YOUR BOT LOGIC (easy to swap) --------------------

async function handleTextCommand({ sock, jid, text }) {
    const lower = text.toLowerCase();

    if (lower === 'hello') {
        console.log('Got "hello" from', jid, '-> sending buttons');

        await sendButtons(sock, jid, {
            title: 'Bem vindo ao BOT Teste 1',
            text: 'Escolha a operadora:',
            footer: 'Tudo é apenas um teste !',
            buttons: [
                { id: 'pao_1', text: 'Pao' },
                { id: 'limao_1', text: 'Limao' },
                { id: 'sorvete_1', text: 'Sorvete' },
                { id: 'cancel', text: 'CANCELAR' },
            ],
        });

        // if you don’t want any further handlers, you can return here
    }

    if (lower.startsWith('!callplay')) {
        await callplay.handleCallplay({ sock, jid, text });
    } else if (lower.startsWith('!allow')) {
        await callplay.handleAllow({ sock, jid, text });
    } else if (lower === '!optin') {
        await callplay.handleOptin({ sock, jid });
    } else if (lower === '!optout') {
        await callplay.handleOptout({ sock, jid });
    }

    // add more commands here:
    // if (lower === 'ping') await sock.sendMessage(jid, { text: 'pong' });
}


async function button1({ sock, jid, button }) {
    const { id, label } = button;
    await sendButtons(sock, jid, {
        title: 'Você escolheu o ' + label + '!',
        text: 'Testando o bot:',
        footer: 'Tudo é apenas um teste !',
        buttons: [
            { id: 'btn_1', text: 'Button 1' },
            { id: 'btn_2', text: 'Button 2' },
        ],
    });
}

async function button2({ sock, jid }) {
    await sendButtons(sock, jid, {
        title: 'Você escolheu o teste 2!',
        text: 'Testando o bot:',
        footer: 'Tudo é apenas um teste !',
        buttons: [
            { id: 'btn_1', text: 'Button 1' },
            { id: 'btn_2', text: 'Button 2' },
        ],
    });
}



// -------------------- Handle Buttons --------------------


async function handleButtonClick({ sock, jid, button }) {
    const { id, label } = button;
    console.log('Template button clicked:', button);

    if (id === 'pao_1') {
        button1({ sock, jid, button });
    } else if (id === 'limao_1') {
        button1({ sock, jid, button });
    } else if (id === 'sorvete_1') {
        button1({ sock, jid, button });
    } else if (id === 'cancel') {
        await sock.sendMessage(jid, { text: 'Volte Logo' });
    }
}

// -------------------- ENTRY POINT --------------------

async function startBot() {
    const sock = await createSocket();
    registerConnectionHandlers(sock);

    registerMessageHandlers(sock, {
        onText: handleTextCommand,
        onTemplateButton: handleButtonClick,
    });
}

startBot().catch(console.error);
