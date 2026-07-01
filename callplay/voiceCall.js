// callplay/voiceCall.js
// Places a real PSTN phone call via Twilio Voice and points it at our TwiML
// endpoint, which tells Twilio to play the requested song when answered.
const twilio = require('twilio');

function createClient() {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) {
        throw new Error('TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN não configurados no .env');
    }
    return twilio(sid, token);
}

async function placeCall({ to, jobId, baseUrl }) {
    const client = createClient();
    const from = process.env.TWILIO_FROM_NUMBER;
    if (!from) throw new Error('TWILIO_FROM_NUMBER não configurado no .env');

    return client.calls.create({
        to,
        from,
        url: `${baseUrl}/twiml/${jobId}`,
        method: 'POST',
        statusCallback: `${baseUrl}/status/${jobId}`,
        statusCallbackMethod: 'POST',
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    });
}

module.exports = { placeCall };
