// callplay/index.js
// Orchestrates the "!callplay" flow: queue -> consent check -> song lookup
// -> real phone call via Twilio -> WhatsApp status updates.
//
// Consent model: the bot NEVER dials a number that hasn't explicitly opted
// in. A person authorizes their own number by messaging "!optin" from their
// own WhatsApp (proof they control that number), or the bot owner can
// pre-authorize a friend's number with "!allow <numero>".
const path = require('path');
const allowlist = require('./allowlist');
const queue = require('./queue');
const { lookupAndDownload } = require('./musicLookup');
const { placeCall } = require('./voiceCall');
const { registerJob, unregisterJob, startServer } = require('./server');

let serverStarted = false;
function ensureServer() {
    if (!serverStarted) {
        startServer(process.env.PORT || 3000);
        serverStarted = true;
    }
}

function isOwner(jid) {
    const owner = process.env.OWNER_NUMBER;
    if (!owner) return false;
    return jid.split('@')[0] === allowlist.normalizeNumber(owner);
}

function formatDuration(seconds) {
    if (!seconds) return '';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}

function parseArgs(text) {
    const parts = text.trim().split(/\s+/);
    parts.shift(); // drop the command itself
    return parts;
}

async function handleCallplay({ sock, jid, text }) {
    ensureServer();
    const [number, ...songParts] = parseArgs(text);
    const song = songParts.join(' ');

    if (!number || !song) {
        await sock.sendMessage(jid, { text: 'Uso: !callplay <numero> <musica>' });
        return;
    }

    if (!allowlist.isAllowed(number)) {
        await sock.sendMessage(jid, {
            text:
                `❌ O número ${number} ainda não autorizou receber ligações deste bot.\n` +
                `A pessoa dona do número precisa mandar *!optin* pelo WhatsApp dela, ` +
                `ou o dono do bot pode rodar *!allow ${number}*.`,
        });
        return;
    }

    const position = queue.push({ sock, jid, number, song });
    await sock.sendMessage(jid, {
        text: `✅ Pedido entrou na fila.\n📍 Posição: ${position}\n📞 Número: +${number}\n🎵 Música: ${song}`,
    });

    queue.run(processJob);
}

async function processJob({ sock, jid, number, song }) {
    const baseUrl = process.env.PUBLIC_BASE_URL;
    if (!baseUrl) {
        await sock.sendMessage(jid, {
            text: '⚠️ PUBLIC_BASE_URL não configurado no .env — não é possível completar a ligação.',
        });
        return;
    }

    await sock.sendMessage(jid, { text: `📞 Iniciando ligação...\n🎵 Música: ${song}` });

    const track = await lookupAndDownload(song);
    const jobId = path.parse(track.fileName).name;

    await sock.sendMessage(jid, {
        text: `📞 Ligando para +${number}\n🎵 ${track.title}\n⏱️ ${formatDuration(track.duration)}`,
    });

    registerJob(jobId, {
        fileName: track.fileName,
        onStatus: (status) => {
            if (status === 'in-progress') {
                sock.sendMessage(jid, { text: `✅ Call conectada. Tocando: ${track.title}` });
            } else if (['completed', 'no-answer', 'busy', 'failed', 'canceled'].includes(status)) {
                sock.sendMessage(jid, { text: `📴 Ligação encerrada (${status}).` });
                unregisterJob(jobId);
            }
        },
    });

    await placeCall({ to: `+${number}`, jobId, baseUrl });
}

async function handleAllow({ sock, jid, text }) {
    if (!isOwner(jid)) {
        await sock.sendMessage(jid, { text: 'Só o dono do bot pode autorizar números com !allow.' });
        return;
    }
    const [number] = parseArgs(text);
    if (!number) {
        await sock.sendMessage(jid, { text: 'Uso: !allow <numero>' });
        return;
    }
    allowlist.allow(number);
    await sock.sendMessage(jid, { text: `✅ Número +${number} autorizado a receber callplay.` });
}

async function handleOptin({ sock, jid }) {
    // The person opts THEMSELVES in from their own WhatsApp number — that is
    // our proxy for "this person consents to receive these calls".
    const number = allowlist.allow(jid.split('@')[0]);
    await sock.sendMessage(jid, {
        text: `✅ Número +${number} autorizado a receber ligações do !callplay. Envie *!optout* pra revogar.`,
    });
}

async function handleOptout({ sock, jid }) {
    const number = allowlist.revoke(jid.split('@')[0]);
    await sock.sendMessage(jid, { text: `✅ Autorização de +${number} revogada.` });
}

module.exports = { handleCallplay, handleAllow, handleOptin, handleOptout };
