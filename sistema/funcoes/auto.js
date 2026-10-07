function base(config) {
return String(config.autoSystem.url || '').replace(/\/$/, '')
}

function key(config) {
const token = String(config.autoSystem.token || '')
if (!token || token.includes('COLOQUE_SEU_TOKEN')) throw new Error('Configure autoSystem.token no config.json.')
return token
}

async function request(config, pathname, params = {}) {
const url = new URL(`${base(config)}${pathname}`)
for (const [k, v] of Object.entries(params)) {
if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
}
const response = await fetch(url, { headers: { 'X-Api-Key': key(config), Accept: 'application/json' } })
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
