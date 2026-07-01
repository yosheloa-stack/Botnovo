// callplay/server.js
// Small webhook server Twilio talks to: it asks /twiml/:jobId what to play
// when the call is answered, and posts call status updates to /status/:jobId.
const express = require('express');
const path = require('path');

const jobs = new Map(); // jobId -> { fileName, onStatus }
let serverInstance = null;

function registerJob(jobId, { fileName, onStatus }) {
    jobs.set(jobId, { fileName, onStatus });
}

function unregisterJob(jobId) {
    jobs.delete(jobId);
}

function escapeXml(str) {
    return String(str).replace(/[<>&'"]/g, (c) => ({
        '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
    }[c]));
}

function createApp() {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use('/audio', express.static(path.join(__dirname, '..', 'public', 'audio')));

    app.post('/twiml/:jobId', (req, res) => {
        const job = jobs.get(req.params.jobId);
        res.type('text/xml');
        if (!job) {
            res.send('<Response><Say language="pt-BR">Pedido nao encontrado.</Say></Response>');
            return;
        }
        const audioUrl = escapeXml(`${process.env.PUBLIC_BASE_URL}/audio/${job.fileName}`);
        res.send(`<Response><Play>${audioUrl}</Play></Response>`);
    });

    app.post('/status/:jobId', (req, res) => {
        const job = jobs.get(req.params.jobId);
        const status = req.body.CallStatus;
        if (job?.onStatus) job.onStatus(status);
        res.sendStatus(204);
    });

    return app;
}

function startServer(port) {
    if (serverInstance) return serverInstance;
    const app = createApp();
    serverInstance = app.listen(port, () => {
        console.log(`Callplay webhook server ouvindo na porta ${port}`);
    });
    return serverInstance;
}

module.exports = { startServer, registerJob, unregisterJob };
