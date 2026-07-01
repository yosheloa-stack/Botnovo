// callplay/allowlist.js
// Consent gate: the bot will only ever dial numbers that opted in themselves
// (via `!optin`) or were added by the bot owner (via `!allow`). This exists
// specifically so callplay can't be pointed at a stranger's phone number.
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'allowlist.json');

function normalizeNumber(raw) {
    return String(raw).replace(/\D/g, '');
}

function load() {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(raw);
    } catch {
        return { numbers: [] };
    }
}

function save(data) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function isAllowed(number) {
    const n = normalizeNumber(number);
    const data = load();
    return data.numbers.includes(n);
}

function allow(number) {
    const n = normalizeNumber(number);
    const data = load();
    if (!data.numbers.includes(n)) {
        data.numbers.push(n);
        save(data);
    }
    return n;
}

function revoke(number) {
    const n = normalizeNumber(number);
    const data = load();
    data.numbers = data.numbers.filter((x) => x !== n);
    save(data);
    return n;
}

module.exports = { isAllowed, allow, revoke, normalizeNumber };
