function base(config) {
return String(config?.autoSystem?.url || process.env.AUTO_SYSTEM_URL || '').replace(/\/$/, '')
}

function key(config) {
const token = String(config?.autoSystem?.token || process.env.AUTO_SYSTEM_TOKEN || process.env.AUTOSYSTEM_TOKEN || '')
if (!token || token.includes('COLOQUE_SEU_TOKEN')) throw new Error('Configure autoSystem.token no config.json.')
return token
}

async function request(config, pathname, params = {}) {
const url = new URL(`${base(config)}${pathname}`)
for (const [k, v] of Object.entries(params)) {
if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
}
const started = Date.now()
const timeoutMs = 45_000
let response
try {
response = await fetch(url, { headers: { 'X-Api-Key': key(config), Accept: 'application/json' }, signal: AbortSignal.timeout(timeoutMs) })
} catch (err) {
console.error('[ AURORA API ] Falha', pathname, 'após', Date.now() - started, 'ms:', err?.message || err)
return { sucesso: false, erro: err?.name === 'TimeoutError' ? 'A API demorou mais de 45 segundos. O envio pode estar em andamento; confira antes de repetir.' : 'Não foi possível consultar a API agora.' }
}
console.log('[ AURORA API ]', pathname, 'HTTP', response.status, 'em', Date.now() - started, 'ms')
const text = await response.text()
let data
try { data = JSON.parse(text) } catch { data = { sucesso: false, erro: text || `HTTP ${response.status}` } }
if (!response.ok && !data?.erro) data.erro = `HTTP ${response.status}`
return data
}

export const autoSystem = {
info: (config, uid) => request(config, '/v1/info', { uid }),
like: (config, uid, qtd) => request(config, '/v1/like', { uid, qtd }),
add: (config, uid, options = {}) => request(config, '/v1/autolike/add', { uid, ...options }),
list: (config) => request(config, '/v1/autolike/list'),
remove: (config, uid) => request(config, '/v1/autolike/remove', { uid })
}
