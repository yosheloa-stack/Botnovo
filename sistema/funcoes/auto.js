import { motivoDaFalha, pedirAoSite, respostaEstranha } from './rede.js'

function base(config) {
return String(config?.autoSystem?.url || process.env.AUTO_SYSTEM_URL || '').replace(/\/$/, '')
}

function key(config) {
const token = String(config?.autoSystem?.token || process.env.AUTO_SYSTEM_TOKEN || process.env.AUTOSYSTEM_TOKEN || '')
if (!token || token.includes('COLOQUE_SEU_TOKEN')) throw new Error('Configure autoSystem.token no config.json.')
return token
}

// BOT ALUGADO (gerente.js) FALA DIRETO COM O SITE: manda o pedido do aluguel
// e o token do aluguel, sem key de ninguém. O site usa a key da casa e conta
// os IDs do dia no plano do bot. O bot da casa segue com a key dele.
export function cabecalhos(config, accept = 'application/json') {
const aluguel = String(process.env.AURORA_ALUGUEL_PEDIDO || '').trim()
const token = String(process.env.AURORA_ALUGUEL_TOKEN || '').trim()
if (aluguel && token) return { 'X-Aurora-Aluguel': aluguel, 'X-Aurora-Token': token, Accept: accept }
const h = { 'X-Api-Key': key(config), Accept: accept }
if (aluguel) h['X-Aurora-Aluguel'] = aluguel
return h
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
response = await pedirAoSite(url, { headers: cabecalhos(config), timeoutMs })
} catch (err) {
console.error('[ AURORA API ] Falha', pathname, 'após', Date.now() - started, 'ms:', motivoDaFalha(err))
return { sucesso: false, erro: err?.name === 'TimeoutError' ? 'Está demorando mais que o normal. O envio pode estar em andamento; confira antes de repetir.' : 'Não consegui concluir agora. Tente de novo em instantes.' }
}
console.log('[ AURORA API ]', pathname, 'HTTP', response.status, 'em', Date.now() - started, 'ms')
const text = await response.text()
let data
try { data = JSON.parse(text) } catch {
// Página no lugar dos dados (site fora do ar/reiniciando): o grupo vê só a
// frase padrão, o motivo fica no console.
console.error('[ AURORA API ]', pathname, respostaEstranha(text, response.status))
data = { sucesso: false, erro: 'Não consegui concluir agora. Tente de novo em instantes.' }
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
const response = await pedirAoSite(url, { headers: cabecalhos(config, 'image/png'), timeoutMs: 40_000 })
if (!response.ok || !/^image\//.test(response.headers?.get?.('content-type') || '')) return null
const bytes = new Uint8Array(await response.arrayBuffer())
return bytes.length ? bytes : null
} catch (err) {
console.warn('[ AURORA API ] /v1/banner não veio:', motivoDaFalha(err))
return null
}
}

// A IMAGEM DA IA YOSH (/v1/yosh/arquivo/...): os bytes, ou null.
async function arquivo(url) {
try {
const response = await pedirAoSite(new URL(url), { headers: { Accept: 'image/*' }, timeoutMs: 40_000 })
if (!response.ok || !/^image\//.test(response.headers?.get?.('content-type') || '')) return null
const bytes = new Uint8Array(await response.arrayBuffer())
return bytes.length ? bytes : null
} catch (err) {
console.warn('[ AURORA API ] imagem da Yosh não veio:', motivoDaFalha(err))
return null
}
}

export const autoSystem = {
info: (config, uid) => request(config, '/v1/info', { uid }),
banner,
like: (config, uid, qtd) => request(config, '/v1/like', { uid, qtd }),
add: (config, uid, options = {}) => request(config, '/v1/autolike/add', { uid, ...options }),
list: (config) => request(config, '/v1/autolike/list'),
remove: (config, uid) => request(config, '/v1/autolike/remove', { uid }),
// IA Yosh (a API de IA do site, paga pelo saldo da key da Yosh)
yosh: (config, params) => request(config, '/v1/yosh', params),
yoshImagem: (config, params) => request(config, '/v1/yosh/imagem', params),
yoshModelos: (config) => request(config, '/v1/yosh/modelos'),
yoshReset: (config, conversa) => request(config, '/v1/yosh/reset', { conversa }),
yoshArquivo: arquivo
}
