import { motivoDaFalha, pedirAoSite, respostaEstranha } from './rede.js'

function base(config) {
return String(config?.autoSystem?.url || process.env.AUTO_SYSTEM_URL || '').replace(/\/$/, '')
}

function key(config) {
const token = String(config?.autoSystem?.token || process.env.AUTO_SYSTEM_TOKEN || process.env.AUTOSYSTEM_TOKEN || '')
if (!token || token.includes('COLOQUE_SEU_TOKEN')) throw new Error('Configure autoSystem.token no config.json.')
return token
}

// O site responde o /v1/like em até ~80 s (o Cloudflare corta em ~100 s).
// Esperar menos que isso fazia o bot desistir de um envio que ainda ia dar certo.
const timeoutMs = 95_000

async function request(config, pathname, params = {}) {
const url = new URL(`${base(config)}${pathname}`)
for (const [k, v] of Object.entries(params)) {
if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
}
const started = Date.now()
let response
try {
response = await pedirAoSite(url, { headers: { 'X-Api-Key': key(config), Accept: 'application/json' }, timeoutMs })
} catch (err) {
console.error('[ AURORA API ] Falha', pathname, 'após', Date.now() - started, 'ms:', motivoDaFalha(err))
return { sucesso: false, erro: err?.name === 'TimeoutError' ? 'A API demorou demais para responder. O envio pode estar em andamento; confira antes de repetir.' : 'Não foi possível consultar a API agora.' }
}
console.log('[ AURORA API ]', pathname, 'HTTP', response.status, 'em', Date.now() - started, 'ms')
const text = await response.text()
let data
try { data = JSON.parse(text) } catch {
// Página no lugar dos dados (site fora do ar/reiniciando): o grupo vê só a
// frase padrão, o motivo fica no console.
console.error('[ AURORA API ]', pathname, respostaEstranha(text, response.status))
data = { sucesso: false, erro: /^\s*</.test(text) ? 'O serviço está indisponível agora. Tente de novo em instantes.' : respostaEstranha(text, response.status) }
}
if (!response.ok && !data?.erro) data.erro = `HTTP ${response.status}`
return data
}

// O CARTÃO DO JOGADOR (/v1/banner): a imagem em bytes, ou null. Falhar aqui
// nunca derruba o /info — sem imagem, ele vai só em texto.
async function banner(config, uid) {
try {
const url = new URL(`${base(config)}/v1/banner`)
url.searchParams.set('uid', String(uid))
const response = await pedirAoSite(url, { headers: { 'X-Api-Key': key(config), Accept: 'image/png' }, timeoutMs: 40_000 })
if (!response.ok || !/^image\//.test(response.headers?.get?.('content-type') || '')) return null
const bytes = new Uint8Array(await response.arrayBuffer())
return bytes.length ? bytes : null
} catch (err) {
console.warn('[ AURORA API ] /v1/banner não veio:', motivoDaFalha(err))
return null
}
}

export const autoSystem = {
info: (config, uid) => request(config, '/v1/info', { uid }),
banner,
like: (config, uid, qtd) => request(config, '/v1/like', { uid, qtd }),
add: (config, uid, options = {}) => request(config, '/v1/autolike/add', { uid, ...options }),
list: (config) => request(config, '/v1/autolike/list'),
remove: (config, uid) => request(config, '/v1/autolike/remove', { uid })
}
