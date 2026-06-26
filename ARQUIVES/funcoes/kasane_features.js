/*
 * kasane_features.js
 * ------------------------------------------------------------------
 * Funcoes e comandos migrados do bot "kasane" para o "tokito".
 *
 * Contem:
 *  - Toda a estrutura da IA (Aurora): texto (Flux), audio/voz (Fish Audio)
 *    e transcricao de audio (AssemblyAI).
 *  - Todas as APIs e KEYs.
 *  - Sistema de LIKE (dual/triple API) + autolike_old + autolike v2.
 *  - Sistema de SALDO e ENVIO de PASSE DE ELITE.
 *  - Sistema VIP2 (consultas com limite diario).
 *  - Consultas: CPF, EMAIL, MAE, PAI, NOME (e placa/cpfbasico de bonus).
 *
 * Modulo auto-contido: nao depende do escopo do tokito.js, apenas recebe
 * o socket (tokito), o "info" e os dados ja resolvidos pelo handler.
 * ------------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const axios = require('axios');
const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);
const fsp = require('fs').promises;

// cloudflare-bypasser opcional (igual ao kasane) — cai pro axios se nao existir
let cfBypasser = null;
try {
  const CloudflareBypasser = require('cloudflare-bypasser');
  cfBypasser = new CloudflareBypasser();
} catch (e) {
  console.log('[KASANE] cloudflare-bypasser nao encontrado; usando fallback axios.');
}

// getBuffer / cookiejar opcionais
let getBufferLocal;
try {
  ({ getBuffer: getBufferLocal } = require('./exports.js'));
} catch (e) { getBufferLocal = null; }
const getBuffer = async (url) => {
  if (getBufferLocal) return getBufferLocal(url);
  const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 60000 });
  return Buffer.from(res.data);
};

let wrapper, CookieJar;
try {
  ({ wrapper } = require('axios-cookiejar-support'));
  ({ CookieJar } = require('tough-cookie'));
} catch (e) { wrapper = null; CookieJar = null; }

// chalk opcional (so para logs coloridos)
let chalk;
try { chalk = require('chalk'); } catch (e) {
  const id = (s) => s;
  chalk = new Proxy({}, { get: () => new Proxy(id, { get: () => id }) });
}

// ============================================================
// APIS E KEYS
// ============================================================
const API_KEY_BRONXYS = 'Yosh7';
const API_BASE = 'https://api.bronxyshost.com.br/api-bronxys';
const API_KEY_TOKITO = 'Yosh7';
const API_URL_TOKITO = 'https://tokito-apis.site';

const FRIFAS_OPEN_ID = '131381-81f981-cd428e';

const S1_API = {
  baseUrl: 'https://api.mitsuri.online/api/likes',
  key: 'yYHUxBO6IINsvjlNjcTGefwTgPu2',
  system: 'Yoshhub'
};

const MITSURI_INFO_API = {
  url: 'https://mitsuri.online/api/player/info',
  key: 'yYHUxBO6IINsvjlNjcTGefwTgPu2',
  system: 'MeuSistema'
};

const RENDER_LIKES_API = {
  url: 'https://manus-api-like.onrender.com/likes',
  token: 'kasane123'
};

// Fish Audio - Voz Zero Two PT-BR (voz da Aurora)
const FISH_AUDIO_API_KEY = 'c76d9a68e7064fda8f75a9c17334f1d7';
const FISH_AUDIO_MODEL_ID = '145c9d4446fd45b3bb3108215882096d';

// Flux API Key - IA Aurora, Likes, Frifas
const FLUX_API_KEY = '97da3057-3aef-c61d-0bfb-c14c6068ad37';

// Consultas (CPF/NOME/MAE/PAI/EMAIL/PLACA)
const _KAPI = 'https://kasane-likes-api-production.up.railway.app';
const _KKEY = 'YOSHSET';

// AssemblyAI (transcricao de audio)
const ASSEMBLYAI_KEY = '22be3718b6bf42019d9cc59f70133b83';

const ELITE_PASS_COST = 4;
const ELITE_PASS_OWNER = '556799251565'; // numero que recebe as solicitacoes de passe

// ============================================================
// CAMINHOS DE BANCO DE DADOS (JSON locais)
// ============================================================
const PATHS = {
  base: './database',
  vipDir: './database/vips',
  likesUsageDir: './database/usage',
  likesUsageFile: './database/usage/likesUsage.json',
  likesHistoryFile: './database/usage/likesHistory.json',
  autoLikeDir: './database/autolike',
  autoLikeFile: './database/autolike/registrations.json',
  autoLikeV2File: './database/autolike/autolikeV2.json',
  groupsDir: './database/groups',
  aluguelFile: './database/groups/aluguel.json',
  likeLiberadoFile: './database/groups/likeliberado.json',
  settingsFile: './database/settings.json',
  balancesFile: './database/balances.json',
  pendingRequestsFile: './database/pending_requests.json',
  vip2File: './database/vips/vip2.json',
  vip2UsageFile: './database/vips/vip2usage.json'
};

// ============================================================
// HELPERS DE ARQUIVO / JID
// ============================================================
const ensureDir = (dirPath) => { if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true }); };
const ensureJsonFile = (filePath, defaultData = {}) => { if (!fs.existsSync(filePath)) { ensureDir(path.dirname(filePath)); fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2)); } };

const readJson = (filePath) => { try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { return null; } };
const saveJson = (filePath, data) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const initDatabase = () => {
  ensureDir(PATHS.vipDir);
  ensureDir(PATHS.likesUsageDir);
  ensureDir(PATHS.autoLikeDir);
  ensureDir(PATHS.groupsDir);
  ensureJsonFile(PATHS.vip2File, { vips: [] });
  ensureJsonFile(PATHS.vip2UsageFile, { date: '', users: {} });
  ensureJsonFile(PATHS.likesUsageFile, { users: {}, ids: {} });
  ensureJsonFile(PATHS.likesHistoryFile, { history: [] });
  ensureJsonFile(PATHS.autoLikeFile, { registrations: [] });
  ensureJsonFile(PATHS.autoLikeV2File, { registrations: [] });
  ensureJsonFile(PATHS.aluguelFile, { grupos: {} });
  ensureJsonFile(PATHS.likeLiberadoFile, { grupos: [] });
  ensureJsonFile(PATHS.balancesFile, {});
  ensureJsonFile(PATHS.pendingRequestsFile, { requests: [] });
  ensureJsonFile(PATHS.settingsFile, { ia_active: true, autodown: true, auto_image: true });
};

// no tokito o sender ja vem resolvido (numero real), entao normalizeJid so limpa
const normalizeJid = (jid) => {
  if (!jid) return '';
  let clean = String(jid).split('@')[0];
  clean = clean.split(':')[0];
  return clean.replace(/[^0-9]/g, '');
};
const onlyNumbers = (text) => normalizeJid(text);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ============================================================
// SISTEMA DE SALDO E ELITE PASS
// ============================================================
const migrateBalancesData = (data) => {
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    const k = normalizeJid(key);
    if (out[k]) {
      out[k].saldo = Math.max(out[k].saldo, value.saldo || 0);
      out[k].liberado = out[k].liberado || (value.liberado || false);
    } else out[k] = value;
  }
  return out;
};
const getBalancesData = () => {
  ensureJsonFile(PATHS.balancesFile, {});
  let data = readJson(PATHS.balancesFile) || {};
  data = migrateBalancesData(data);
  return data;
};
const saveBalancesData = (data) => saveJson(PATHS.balancesFile, data);
const getBalance = (numero) => {
  const data = getBalancesData();
  const n = normalizeJid(numero);
  return data[n]?.saldo || data[numero]?.saldo || 0;
};
const isLiberated = (numero) => {
  const data = getBalancesData();
  const n = normalizeJid(numero);
  return data[n]?.liberado || data[numero]?.liberado || false;
};
const addBalance = (numero, valor) => {
  const data = getBalancesData();
  const n = normalizeJid(numero);
  if (!data[n]) data[n] = { saldo: 0, liberado: false };
  data[n].saldo += valor;
  saveBalancesData(data);
};
const removeBalance = (numero, valor) => {
  const data = getBalancesData();
  const n = normalizeJid(numero);
  if (!data[n]) data[n] = { saldo: 0, liberado: false };
  data[n].saldo = Math.max(0, data[n].saldo - valor);
  saveBalancesData(data);
};
const liberarUsuario = (numero) => {
  const data = getBalancesData();
  const n = normalizeJid(numero);
  if (!data[n]) data[n] = { saldo: 0, liberado: false };
  data[n].liberado = true;
  saveBalancesData(data);
};
const removerLiberacao = (numero) => {
  const data = getBalancesData();
  const n = normalizeJid(numero);
  if (data[n]) data[n].liberado = false;
  saveBalancesData(data);
};
// canUsePS recebe a flag isOwner do tokito (SoDono)
const canUsePS = (userId, isOwner = false) => {
  if (isOwner) return true;
  if (isLiberated(userId)) return true;
  if (getBalance(userId) >= ELITE_PASS_COST) return true;
  return false;
};

// ============================================================
// ALUGUEL DE GRUPO (limite de IDs por contrato)
// ============================================================
const getAluguelGrupo = (groupId) => {
  const data = readJson(PATHS.aluguelFile) || { grupos: {} };
  const g = data.grupos[groupId];
  if (!g) return null;
  if (g.expiraEm && Date.now() > g.expiraEm) {
    g.expirado = true;
    data.grupos[groupId] = g;
    saveJson(PATHS.aluguelFile, data);
    return null;
  }
  return g;
};
const verificarIdDisponivel = (groupId) => {
  const g = getAluguelGrupo(groupId);
  if (!g) return { permitido: false, motivo: 'Grupo sem plano ativo.' };
  if (g.idsPermitidos === 'ilimitado') return { permitido: true, restantes: 'ilimitado', grupo: g };
  if (g.idsUsados >= g.idsPermitidos) return { permitido: false, motivo: 'Limite de IDs atingido! (' + g.idsUsados + '/' + g.idsPermitidos + ')', grupo: g };
  return { permitido: true, restantes: g.idsPermitidos - g.idsUsados, grupo: g };
};
const registrarUsoId = (groupId) => {
  const data = readJson(PATHS.aluguelFile) || { grupos: {} };
  if (!data.grupos[groupId]) return;
  if (data.grupos[groupId].idsPermitidos !== 'ilimitado') {
    data.grupos[groupId].idsUsados = (data.grupos[groupId].idsUsados || 0) + 1;
  }
  saveJson(PATHS.aluguelFile, data);
};

// Liberacao manual do comando like por grupo (independente do aluguel)
const isLikeLiberadoGrupo = (groupId) => {
  const data = readJson(PATHS.likeLiberadoFile) || { grupos: [] };
  return data.grupos.includes(groupId);
};
const setLikeLiberadoGrupo = (groupId, ativar) => {
  const data = readJson(PATHS.likeLiberadoFile) || { grupos: [] };
  if (ativar) { if (!data.grupos.includes(groupId)) data.grupos.push(groupId); }
  else { data.grupos = data.grupos.filter(g => g !== groupId); }
  saveJson(PATHS.likeLiberadoFile, data);
  return ativar;
};

// ============================================================
// LIMITE DE LIKE (cooldown 24h para nao-vip)
// ============================================================
const VIP_CONFIG = { likesPorDiaNaoVip: 1 };
const LIKE_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const getDayStart = () => { const n = new Date(); n.setHours(0, 0, 0, 0); return n.getTime(); };
const formatTempoRestante = (ms) => {
  const t = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
  if (h > 0) return h + 'h ' + m + 'min ' + s + 's';
  if (m > 0) return m + 'min ' + s + 's';
  return s + 's';
};
const getLastLikeTimestamp = (user) => {
  if (!user) return 0;
  if (Number(user.lastLikeAt) > 0) return Number(user.lastLikeAt);
  if (Number(user.dayCount) >= VIP_CONFIG.likesPorDiaNaoVip && Number(user.dayStart) > 0) return Number(user.dayStart);
  return 0;
};
// flags = { isOwner, isVip }
const checkLikeLimit = (userId, flags = {}) => {
  if (flags.isOwner) return { allowed: true, remaining: '∞', isVip: true, isOwner: true };
  if (flags.isVip) return { allowed: true, remaining: '∞', isVip: true, isOwner: false };
  const userPN = normalizeJid(userId);
  const data = readJson(PATHS.likesUsageFile) || { users: {}, ids: {} };
  if (!data.users) data.users = {};
  if (!data.users[userPN]) data.users[userPN] = { dayStart: getDayStart(), dayCount: 0, idsUsadosHoje: [], lastLikeAt: 0 };
  const user = data.users[userPN];
  const now = Date.now();
  const lastLikeAt = getLastLikeTimestamp(user);
  const elapsed = lastLikeAt ? now - lastLikeAt : LIKE_COOLDOWN_MS;
  if (lastLikeAt && elapsed < LIKE_COOLDOWN_MS) {
    const tempoRestante = formatTempoRestante(LIKE_COOLDOWN_MS - elapsed);
    return { allowed: false, reason: 'Voce ja usou seu limite de 1 like gratis. Tente novamente em ' + tempoRestante + '.', remaining: 0, isVip: false, isOwner: false, tempoRestante, unlockAt: lastLikeAt + LIKE_COOLDOWN_MS };
  }
  if (user.dayCount !== 0 || user.idsUsadosHoje?.length) {
    user.dayStart = getDayStart(); user.dayCount = 0; user.idsUsadosHoje = [];
    saveJson(PATHS.likesUsageFile, data);
  }
  return { allowed: true, remaining: VIP_CONFIG.likesPorDiaNaoVip, isVip: false, isOwner: false };
};
const checkIdCooldown = (uid) => {
  const data = readJson(PATHS.likesUsageFile) || { users: {}, ids: {} };
  if (!data.ids) data.ids = {};
  const item = data.ids[String(uid)];
  const lastLikeAt = Number(item?.lastLikeAt || item || 0);
  if (!lastLikeAt) return { blocked: false };
  const elapsed = Date.now() - lastLikeAt;
  if (elapsed >= LIKE_COOLDOWN_MS) return { blocked: false };
  return { blocked: true, tempoRestante: formatTempoRestante(LIKE_COOLDOWN_MS - elapsed), unlockAt: lastLikeAt + LIKE_COOLDOWN_MS };
};
const checkIdUsadoHoje = (userId, uid) => {
  const cooldown = checkIdCooldown(uid);
  if (cooldown.blocked) return cooldown;
  const userPN = normalizeJid(userId);
  const data = readJson(PATHS.likesUsageFile) || { users: {}, ids: {} };
  if (!data.users || !data.users[userPN]) return false;
  const user = data.users[userPN];
  if (user.dayStart !== getDayStart()) return false;
  const usadoHoje = user.idsUsadosHoje && user.idsUsadosHoje.includes(uid);
  return usadoHoje ? { blocked: true, tempoRestante: '24h' } : false;
};
const registerLikeUse = (userId, uid, flags = {}) => {
  const now = Date.now();
  const userPN = normalizeJid(userId);
  const data = readJson(PATHS.likesUsageFile) || { users: {}, ids: {} };
  if (!data.users) data.users = {};
  if (!data.ids) data.ids = {};
  data.ids[String(uid)] = { lastLikeAt: now, user: userPN };
  if (!flags.isOwner && !flags.isVip) {
    if (!data.users[userPN]) data.users[userPN] = { dayStart: getDayStart(), dayCount: 0, idsUsadosHoje: [], lastLikeAt: 0 };
    const user = data.users[userPN];
    user.dayStart = getDayStart(); user.dayCount = 1; user.lastLikeAt = now;
    if (!user.idsUsadosHoje) user.idsUsadosHoje = [];
    if (!user.idsUsadosHoje.includes(uid)) user.idsUsadosHoje.push(uid);
  }
  saveJson(PATHS.likesUsageFile, data);
};

// ============================================================
// AUTOLIKE (original / _old) e AUTOLIKE V2
// ============================================================
const addAutoLikeLocal = (uid, nick, dias) => {
  const data = readJson(PATHS.autoLikeFile) || { registrations: [] };
  const now = Date.now();
  data.registrations = data.registrations.filter(r => r.uid !== uid);
  data.registrations.push({ uid, nick: nick || 'Desconhecido', addedAt: now, expiresAt: now + (dias * 86400000), dias, diasUsados: 0, diasRestantes: dias, likesEntregues: 0, ativo: true });
  if (data.registrations.length > 1000) data.registrations = data.registrations.slice(-1000);
  saveJson(PATHS.autoLikeFile, data);
  return true;
};
const removeAutoLikeLocal = (uid) => {
  const data = readJson(PATHS.autoLikeFile) || { registrations: [] };
  data.registrations = data.registrations.filter(r => r.uid !== uid);
  saveJson(PATHS.autoLikeFile, data);
  return true;
};
const listAutoLikeLocal = () => {
  const data = readJson(PATHS.autoLikeFile) || { registrations: [] };
  const now = Date.now();
  data.registrations.forEach(r => {
    if (r.expiresAt <= now) { r.ativo = false; r.diasRestantes = 0; }
    else { const dp = Math.floor((now - r.addedAt) / 86400000); r.diasUsados = Math.min(dp, r.dias); r.diasRestantes = Math.max(0, r.dias - r.diasUsados); r.ativo = r.diasRestantes > 0; }
  });
  saveJson(PATHS.autoLikeFile, data);
  return data.registrations.filter(r => r.ativo);
};
const getAutoLikeV2ByUid = (uid) => {
  const data = readJson(PATHS.autoLikeV2File) || { registrations: [] };
  const now = Date.now();
  const reg = data.registrations.find(r => r.uid === uid);
  if (!reg) return null;
  if (reg.expiresAt <= now) { reg.ativo = false; reg.diasRestantes = 0; }
  else { reg.diasRestantes = Math.ceil((reg.expiresAt - now) / 86400000); reg.ativo = true; }
  return reg;
};
const addAutoLikeV2 = (uid, nick, dias) => {
  const data = readJson(PATHS.autoLikeV2File) || { registrations: [] };
  const now = Date.now();
  data.registrations = data.registrations.filter(r => r.uid !== uid);
  data.registrations.push({ uid, nick: nick || 'Desconhecido', addedAt: now, expiresAt: now + (dias * 86400000), dias, diasUsados: 0, diasRestantes: dias, likesEntreguesTotal: 0, likesEnviadosHoje: 0, lastDelivery: 0, ativo: true });
  saveJson(PATHS.autoLikeV2File, data);
  return true;
};
const removeAutoLikeV2 = (uid) => {
  const data = readJson(PATHS.autoLikeV2File) || { registrations: [] };
  data.registrations = data.registrations.filter(r => r.uid !== uid);
  saveJson(PATHS.autoLikeV2File, data);
  return true;
};
const listAutoLikeV2 = () => (readJson(PATHS.autoLikeV2File) || { registrations: [] }).registrations;
const updateAutoLikeV2Progress = (uid, likesSent) => {
  const data = readJson(PATHS.autoLikeV2File) || { registrations: [] };
  const reg = data.registrations.find(r => r.uid === uid);
  if (reg) {
    const nowBR = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const todayDate = nowBR.toLocaleDateString();
    const lastDate = reg.lastDelivery ? new Date(new Date(reg.lastDelivery).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toLocaleDateString() : null;
    if (lastDate !== todayDate) reg.likesEnviadosHoje = likesSent;
    else reg.likesEnviadosHoje = (reg.likesEnviadosHoje || 0) + likesSent;
    reg.lastDelivery = Date.now();
    reg.likesEntreguesTotal = (reg.likesEntreguesTotal || 0) + likesSent;
    saveJson(PATHS.autoLikeV2File, data);
  }
};

// ============================================================
// CHAVE HUBS DINAMICA + REQUESTS DE LIKE
// ============================================================
const getHubsKey = () => {
  try { return (readJson(PATHS.settingsFile) || {}).hubs_key || FLUX_API_KEY; }
  catch { return FLUX_API_KEY; }
};

const extrairNumeroLikes = (...vals) => {
  for (const v of vals) { const n = Number(v); if (!Number.isNaN(n) && n > 0) return n; }
  return 0;
};

const normalizarRespostaHubs = (parsed) => {
  const payload = parsed || {};
  const dataPrincipal = Array.isArray(payload.data) ? (payload.data[0] || {}) : (payload.data || {});
  const likes = dataPrincipal.likes || payload.likes || {};
  const mensagem = payload.mensagem || payload.message || payload.error || dataPrincipal.mensagem || dataPrincipal.message || 'Resposta sem mensagem';
  const tempoRestante = payload.tempo_restante || payload.tempo || dataPrincipal.tempo_restante || dataPrincipal.tempo || likes.tempo_restante || likes.tempo || null;
  const enviadas = extrairNumeroLikes(payload.enviadas, payload.likesSent, payload.likes_sent, payload.likes_gained, payload.real_likes_sent, payload.amount, dataPrincipal.enviadas, dataPrincipal.likesSent, dataPrincipal.likes_sent, dataPrincipal.likes_gained, dataPrincipal.real_likes_sent, likes.enviadas, likes.sent, likes.amount);
  const statusTexto = String(payload.status || payload.statuscode || payload.code || '').toLowerCase();
  const sucessoMarcado = payload.sucesso === true || payload.success === true || payload.ok === true || payload.statuscode === 200 || statusTexto.includes('success') || statusTexto.includes('sucesso');
  const sucesso = sucessoMarcado || enviadas > 0;
  const isRateLimited = (payload.statuscode === 429 || payload.status === 429 || /rate-overlimit|too many requests|usage limit/i.test(String(mensagem)));
  const isDailyLimit = /usage limit|restored in/i.test(String(mensagem));
  let mensagemFinal = mensagem;
  if (isDailyLimit) mensagemFinal = 'Limite diario da API atingido. O acesso sera restaurado em breve.';
  else if (isRateLimited) mensagemFinal = 'Limite de requisicoes atingido (Rate Limit). Tente novamente em breve.';
  const jaRecebeu = (/24|limite|cooldown|aguarde|recebeu|already/i.test(String(mensagem)) || isDailyLimit) && enviadas === 0 && !sucessoMarcado;
  return { sucesso: sucesso || enviadas > 0, statuscode: payload.statuscode || payload.status || (sucesso ? 200 : (isRateLimited ? 429 : 0)), mensagem: mensagemFinal, tempo_restante: tempoRestante, enviadas, data: payload.data || payload, isAlreadyLiked: jaRecebeu, isRateLimited, isDailyLimit, nick: dataPrincipal?.conta?.nome_conta };
};

const requestFrifas = async (endpoint, params = {}) => {
  const key = getHubsKey();
  try {
    const url = new URL('https://fluxdevservice.com/api/frifas/' + endpoint);
    url.searchParams.append('key', key);
    for (const [k, v] of Object.entries(params)) url.searchParams.append(k, v);
    const headers = { 'accept': 'application/json, text/plain, */*', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' };
    const res = cfBypasser ? await cfBypasser.request({ url: url.toString(), headers }) : await axios.get(url.toString(), { headers, timeout: 30000, validateStatus: () => true });
    const responseBody = res.body ?? res.data ?? res;
    const statusCode = res.status || res.statusCode || 0;
    if (typeof responseBody === 'string' && /<!doctype|<html|just a moment|cloudflare|cf-challenge/i.test(responseBody)) {
      return { sucesso: false, statuscode: statusCode || 403, mensagem: 'Hubs Dev bloqueada pelo Cloudflare.', enviadas: 0, data: null, isCloudflare: true, isAlreadyLiked: false };
    }
    let parsed;
    try { parsed = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody; }
    catch { return { sucesso: false, statuscode: statusCode || 500, mensagem: 'Hubs Dev retornou resposta nao JSON.', enviadas: 0, data: null, isAlreadyLiked: false }; }
    return normalizarRespostaHubs(parsed);
  } catch (e) {
    return { sucesso: false, statuscode: e.response?.status || 0, mensagem: e.message || 'Erro na requisicao da Hubs Dev.', enviadas: 0, isAlreadyLiked: false };
  }
};

const getNickFromPublicApi = async (uid) => {
  try {
    const profile = await axios.get(`https://freefireinfo-zy9l.onrender.com/api/v1/player-profile?uid=${uid}&server=BR`, { timeout: 10000 });
    return profile.data?.basicInfo?.nickname || null;
  } catch { return null; }
};
const getMitsuriInfo = async (uid) => {
  try {
    const res = await axios.get(S1_API.baseUrl, { params: { uid, phone: '5511999999999', system: S1_API.system }, headers: { 'x-user-uid': S1_API.key }, timeout: 15000 });
    const d = res.data;
    if (!d || d.error) return null;
    return { basicinfo: { nickname: d.nickname || null, liked: d.likes_before !== undefined ? d.likes_before : (d.likes_after || null), accountid: d.accountid || uid, banner_url: d.banner_url || null }, _raw: d };
  } catch { return null; }
};

const requestS1 = async (uid, phone) => {
  try {
    const res = await axios.get(S1_API.baseUrl, { params: { uid, phone, system: S1_API.system }, headers: { 'x-user-uid': S1_API.key }, timeout: 30000 });
    const data = res.data;
    let likesSent = 0;
    if (data.likes_gained) likesSent = Number(data.likes_gained);
    else if (data.likes && data.likes.enviadas) likesSent = Number(data.likes.enviadas);
    else if (data.enviados) likesSent = Number(data.enviados);
    else if (data.amount) likesSent = Number(data.amount);
    let success = (data.status === 'success' || data.success === true || data.statuscode === 200 || likesSent > 0);
    let isAlreadyLiked = false;
    if (likesSent === 0 && !success && /24|limite|cooldown|aguarde|recebeu|already/i.test(data.message || data.error || data.mensagem || '')) isAlreadyLiked = true;
    if (success && likesSent === 0) likesSent = 20;
    return { success, likesSent, data, error: success ? null : (data.message || data.error || data.mensagem || (isAlreadyLiked ? 'Cooldown ativo' : 'Erro desconhecido')), isAlreadyLiked };
  } catch (e) {
    const errorData = e.response?.data || {};
    const errorMessage = errorData.error || errorData.message || e.message;
    let cooldownTime = null;
    const isRateLimited = (e.response?.status === 429 || /rate-overlimit|too many requests/i.test(errorMessage));
    if (isRateLimited && typeof errorMessage === 'string') { const m = errorMessage.match(/(\d+\.?\d*)\s*horas/i); if (m) cooldownTime = m[1] + 'h'; }
    return { success: false, likesSent: 0, error: isRateLimited ? 'Limite de requisicoes atingido (Rate Limit). Tente novamente em breve.' : errorMessage, statuscode: e.response?.status, cooldownTime, data: errorData, isAlreadyLiked: !isRateLimited && /24|limite|cooldown/i.test(errorMessage), isRateLimited };
  }
};

const sendLikesEmergency = async (targetId, amount) => {
  try {
    const res = await axios.post(RENDER_LIKES_API.url, { uid: String(targetId), amount: Number(amount) || 220, region: 'BR' }, { headers: { 'Authorization': 'Bearer ' + RENDER_LIKES_API.token, 'Content-Type': 'application/json', 'Accept': 'application/json' }, timeout: 120000 });
    const data = res.data || {};
    const likesSent = extrairNumeroLikes(data.real_likes_sent, data.realLikesSent, data.data?.real_likes_sent, data.data?.response?.real_likes_sent, data.data?.response?.likes_sent, data.data?.likes_sent, data.likes_sent, data.likes_gained, data.likesSent, data.amount);
    const success = data.success === true || data.ok === true || likesSent > 0 || /likes enviados/i.test(String(data.message || data.data?.message || ''));
    return { success, likesSent, data, error: success ? null : (data.error || data.message || 'API Render nao confirmou envio'), isAlreadyLiked: /24|limite|cooldown|aguarde|recebeu|already/i.test(String(data.error || data.message || '')) };
  } catch (e) {
    const data = e.response?.data || {};
    const msg = data.error || data.message || e.message;
    return { success: false, likesSent: 0, error: msg, data, statuscode: e.response?.status, isAlreadyLiked: /24|limite|cooldown|aguarde|recebeu|already/i.test(String(msg)) };
  }
};

const sendLikesDualApi = async (uid, phone, targetAmount = 220, isAutoV2 = false) => {
  const results = {
    totalLikesSent: 0, targetLikes: targetAmount,
    api1: { likesSent: 0, success: false, error: null, data: null },
    api2: { likesSent: 0, success: false, error: null, data: null },
    api3: { likesSent: 0, success: false, error: null, data: null },
    nickname: null, profileImage: null, likesBefore: null, likesAfter: null
  };
  const resS1 = await requestS1(uid, phone);
  Object.assign(results.api1, { success: resS1.success, likesSent: resS1.likesSent || 0, error: resS1.error, data: resS1.data, statuscode: resS1.statuscode, isAlreadyLiked: resS1.isAlreadyLiked });
  results.totalLikesSent += results.api1.likesSent;

  if (isAutoV2) await sleep(2000);

  const resHubs = await requestFrifas('sendlikes', { id: uid });
  Object.assign(results.api2, { success: resHubs.sucesso, likesSent: Number(resHubs.enviadas || 0), error: resHubs.mensagem, data: resHubs.data, statuscode: resHubs.statuscode, isAlreadyLiked: resHubs.isAlreadyLiked, tempo_restante: resHubs.tempo_restante });
  results.totalLikesSent += results.api2.likesSent;

  if (isAutoV2) {
    await sleep(1000);
    const resEmerg = await sendLikesEmergency(uid, 100);
    Object.assign(results.api3, { success: resEmerg.success, likesSent: resEmerg.likesSent || 0, error: resEmerg.error, data: resEmerg.data, isAlreadyLiked: resEmerg.isAlreadyLiked });
    results.totalLikesSent += results.api3.likesSent;
  }

  const hubsData = Array.isArray(results.api2.data) ? results.api2.data[0] : results.api2.data;
  const hubsConta = hubsData?.conta || {};
  const hubsLikes = hubsData?.likes || {};
  if (!results.nickname) results.nickname = hubsConta.nome_conta || (results.api1.data && results.api1.data.nickname) || null;
  if (hubsLikes.antes !== undefined && hubsLikes.antes !== null) results.likesBefore = Number(hubsLikes.antes);
  else if (results.api1.data && results.api1.data.likes_before !== undefined) results.likesBefore = Number(results.api1.data.likes_before);
  if (hubsLikes.depois !== undefined && hubsLikes.depois !== null && Number(hubsLikes.depois) > 0) results.likesAfter = Number(hubsLikes.depois);
  else if (results.api1.data && results.api1.data.likes_after !== undefined && Number(results.api1.data.likes_after) > 0) results.likesAfter = Number(results.api1.data.likes_after);
  else results.likesAfter = (results.likesBefore || 0) + results.totalLikesSent;
  if (results.likesAfter !== null && results.likesBefore !== null && results.likesAfter <= results.likesBefore && results.totalLikesSent > 0) results.likesAfter = results.likesBefore + results.totalLikesSent;
  if (results.likesAfter !== null && results.likesBefore !== null && results.likesAfter > results.likesBefore && results.totalLikesSent === 0) results.totalLikesSent = results.likesAfter - results.likesBefore;
  return results;
};

// ============================================================
// LONG BIO FREE FIRE (até 500 caracteres) — github.com/HubsGGx/LongBio-FreeFire
// modo 'token' -> /update-bio/account (eat_token)
// modo 'guest' -> /update-bio/guest   (uid + password [+ region])
// ============================================================
const longBioUpdate = async (modo, params = {}) => {
  const key = getHubsKey();
  const endpoint = modo === 'token' ? 'update-bio/account' : 'update-bio/guest';
  try {
    const url = new URL('https://fluxdevservice.com/api/frifas/' + endpoint);
    url.searchParams.append('key', key);
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') url.searchParams.append(k, v);
    const headers = { 'accept': 'application/json, text/plain, */*', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' };
    const res = cfBypasser ? await cfBypasser.request({ url: url.toString(), headers }) : await axios.get(url.toString(), { headers, timeout: 30000, validateStatus: () => true });
    const body = res.body ?? res.data ?? res;
    if (typeof body === 'string' && /<!doctype|<html|just a moment|cloudflare/i.test(body)) return { erro: true, mensagem: 'Bloqueado pelo Cloudflare.' };
    let parsed;
    try { parsed = typeof body === 'string' ? JSON.parse(body) : body; }
    catch { return { erro: true, mensagem: 'Resposta invalida da API.' }; }
    return parsed;
  } catch (e) {
    return { erro: true, mensagem: e.message || 'Erro na requisicao.' };
  }
};

async function fetchJsonBronxys(url) {
  try { const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }); return res.data; }
  catch { return null; }
}

// ============================================================
// LAYOUTS DE LIKE
// ============================================================
const layoutLikeOriginal = (uid, finalNick, region, level, totalAdd, tempo, jaRecebeu = false, likesBefore = null, likesAfter = null, sender = null, pushname = null) => {
  const senderNumber = sender ? sender.split('@')[0] : null;
  const menc = pushname ? '@' + pushname : (senderNumber ? '@' + senderNumber : '');
  if (jaRecebeu) return '❌ *UID ja recebeu likes hoje!* 🚫\n- *🏷️ | NICK*: `' + finalNick + '`\n- *🆔 | UID*: `' + uid + '`\n- *⏱️ | TEMPO*: `' + tempo + '`\n- *👤 | SOLICITADO POR*: ' + menc + '\n\n*🔋 | KEY LIKES*\n•  `📦 | RESTANTE → ILIMITADA`\n•  `🔋 | → ██████████ 100%`';
  let msg = '✅ *LIKES ENVIADOS COM SUCESSO!* 🚀\n\n';
  msg += '- *🏷️ | NICK*: `' + finalNick + '`\n';
  msg += '- *🆔 | UID*: `' + uid + '`\n';
  if (likesBefore !== null) msg += '- *👍 | LIKES ANTES*: `' + likesBefore + '`\n';
  msg += '- *➕ | ADICIONADOS*: `' + totalAdd + '`\n';
  if (likesAfter !== null) msg += '- *🏆 | LIKES DEPOIS*: `' + likesAfter + '`\n';
  msg += '- *⏱️ | TEMPO*: `' + tempo + '`\n';
  msg += '- *👤 | SOLICITADO POR*: ' + menc + '\n\n';
  msg += '*🔋 | KEY LIKES*\n•  `📦 | RESTANTE → ILIMITADA`\n•  `🔋 | → ██████████ 100%`';
  return msg;
};
const layoutLikeLimpo = (uid, finalNick, region, level, totalAdd, tempo, idsUsados, idsPermitidos, jaRecebeu = false, likesBefore = null, likesAfter = null, sender = null, pushname = null) => {
  const senderNumber = sender ? sender.split('@')[0] : null;
  const menc = pushname ? '@' + pushname : (senderNumber ? '@' + senderNumber : '');
  const contadorStr = idsPermitidos === 'ilimitado' ? '∞' : idsUsados + '/' + idsPermitidos;
  const barra = idsPermitidos === 'ilimitado' ? '██████████ ∞' : (() => { const pct = Math.min(100, Math.floor((idsUsados / idsPermitidos) * 100)); const b = Math.floor(pct / 10); return '█'.repeat(b) + '░'.repeat(10 - b) + ' ' + pct + '%'; })();
  if (jaRecebeu) return '❌ *ID ja recebeu like. Espere...* 🚫\n- *🏷️ | NICK*: `' + finalNick + '`\n- *🆔 | UID*: `' + uid + '`\n- *⏱️ | TEMPO*: `' + tempo + '`\n- *👤 | SOLICITADO POR*: ' + menc + '\n\n*📦 | CONTRATO*\n•  `🆔 | IDs USADOS → ' + contadorStr + '`\n•  `📊 | ' + barra + '`';
  let msg = '🎉 *LIKES ENVIADOS COM SUCESSO!*\n\n';
  msg += '- *🏷️ | NICK*: `' + finalNick + '`\n';
  msg += '- *🆔 | UID*: `' + uid + '`\n';
  if (likesBefore !== null) msg += '- *👍 | LIKES ANTES*: `' + likesBefore + '`\n';
  msg += '- *✅ | LIKES ADICIONADOS*: `' + totalAdd + '`\n';
  if (likesAfter !== null) msg += '- *🏆 | LIKES DEPOIS*: `' + likesAfter + '`\n';
  msg += '- *⏱️ | TEMPO*: `' + tempo + 's`\n';
  msg += '- *👤 | SOLICITADO POR*: ' + menc + '\n';
  msg += '\n*📦 | CONTRATO*\n•  `🆔 | IDs USADOS → ' + contadorStr + '`\n•  `📊 | ' + barra + '`';
  return msg;
};
const layoutInfoLimpo = (uid, nome, nivel, regiao, likes, bio, extra = {}, sender = null, pushname = null) => {
  const senderNumber = sender ? sender.split('@')[0] : null;
  const menc = pushname ? '@' + pushname : (senderNumber ? '@' + senderNumber : '');
  let msg = '*🔍 | INFO PLAYER*\n\n';
  msg += '- *🏷️ | NICK*: `' + nome + '`\n';
  msg += '- *🆔 | UID*: `' + uid + '`\n';
  msg += '- *⭐ | NIVEL*: `' + nivel + '`\n';
  msg += '- *🌍 | REGIAO*: `' + regiao + '`\n';
  msg += '- *👍 | LIKES*: `' + likes + '`\n';
  if (extra.clanname) msg += '- *🛡️ | GUILDA*: `' + extra.clanname + '`\n';
  if (extra.clanlevel) msg += '- *🏅 | NIVEL DA GUILDA*: `' + extra.clanlevel + '`\n';
  if (extra.clanmembers) msg += '- *👥 | MEMBROS DA GUILDA*: `' + extra.clanmembers + '`\n';
  if (extra.rank) msg += '- *🏆 | RANK BR*: `' + extra.rank + '`\n';
  if (extra.rankpoints) msg += '- *🎯 | PONTOS BR*: `' + extra.rankpoints + '`\n';
  if (extra.csrank) msg += '- *🏆 | RANK CS*: `' + extra.csrank + '`\n';
  if (extra.csrankpoints) msg += '- *🎯 | PONTOS CS*: `' + extra.csrankpoints + '`\n';
  if (extra.liked) msg += '- *❤️ | CURTIDAS*: `' + extra.liked + '`\n';
  if (extra.badgecnt) msg += '- *🎖️ | EMBLEMAS*: `' + extra.badgecnt + '`\n';
  if (extra.exp) msg += '- *✨ | EXP*: `' + extra.exp + '`\n';
  if (extra.gender) msg += '- *👤 | GENERO*: `' + extra.gender + '`\n';
  if (extra.lastlogin) msg += '- *🕐 | ULTIMO LOGIN*: `' + extra.lastlogin + '`\n';
  if (extra.createat) msg += '- *📅 | CONTA CRIADA*: `' + extra.createat + '`\n';
  msg += '- *📝 | BIO*: `' + bio + '`';
  if (menc) msg += '\n- *👤 | SOLICITADO POR*: ' + menc;
  return msg;
};
const layoutErro429 = (mensagemOriginal) => {
  let msg = mensagemOriginal, tempo = 'Aguarde alguns minutos';
  if (/usage limit|restored in/i.test(mensagemOriginal)) {
    msg = 'Voce atingiu seu limite de uso para hoje.';
    const h = mensagemOriginal.match(/(\d+)\s*hour/i), m = mensagemOriginal.match(/(\d+)\s*minute/i), s = mensagemOriginal.match(/(\d+)\s*second/i);
    const hh = h ? h[1] + 'h ' : '', mm = m ? m[1] + 'm ' : '', ss = s ? s[1] + 's' : '';
    tempo = (hh || mm || ss) ? (hh + mm + ss).trim() : 'Aprox. 24h';
  } else if (/too many requests|rate limit/i.test(mensagemOriginal)) {
    msg = 'Muitas requisicoes enviadas. O sistema esta temporariamente limitado.';
    tempo = '5 a 10 minutos';
  }
  return '╔════════════════════════╗\n║           *AVISO!*           ║\n╠════════════════════════╣\n║ -  API: `' + msg + '`\n║ - TEMPO: `' + tempo + '`\n╚════════════════════════╝\n\n~Aurora Likes~';
};

// ============================================================
// VIP2 (consultas com limite diario)
// ============================================================
const getVip2 = (userId) => {
  const data = readJson(PATHS.vip2File);
  if (!data?.vips) return null;
  const now = Date.now();
  const id = normalizeJid(userId);
  const v = data.vips.find(x => normalizeJid(x.id) === id);
  if (!v) return null;
  if (v.expiresAt && now > v.expiresAt) { data.vips = data.vips.filter(x => normalizeJid(x.id) !== id); saveJson(PATHS.vip2File, data); return null; }
  return v;
};
const addVip2 = (userId, dailyLimit, days) => {
  const data = readJson(PATHS.vip2File) || { vips: [] };
  const id = normalizeJid(userId);
  data.vips = data.vips.filter(x => normalizeJid(x.id) !== id);
  data.vips.push({ id: userId, dailyLimit, expiresAt: Date.now() + days * 86400000, addedAt: Date.now(), days });
  saveJson(PATHS.vip2File, data);
};
const removeVip2 = (userId) => {
  const data = readJson(PATHS.vip2File) || { vips: [] };
  const id = normalizeJid(userId);
  data.vips = data.vips.filter(x => normalizeJid(x.id) !== id);
  saveJson(PATHS.vip2File, data);
};
const listVip2 = () => {
  const data = readJson(PATHS.vip2File) || { vips: [] };
  const now = Date.now();
  const validos = data.vips.filter(v => !v.expiresAt || v.expiresAt > now);
  if (validos.length !== data.vips.length) { data.vips = validos; saveJson(PATHS.vip2File, data); }
  return validos;
};
const _v2Today = () => new Date().toISOString().slice(0, 10);
const checkVip2Limit = (userId) => {
  const v = getVip2(userId);
  if (!v) return false;
  const usage = readJson(PATHS.vip2UsageFile) || { date: '', users: {} };
  const today = _v2Today();
  if (usage.date !== today) { usage.date = today; usage.users = {}; }
  const used = usage.users[normalizeJid(userId)] || 0;
  return used < v.dailyLimit;
};
const consumeVip2 = (userId) => {
  const usage = readJson(PATHS.vip2UsageFile) || { date: '', users: {} };
  const today = _v2Today();
  if (usage.date !== today) { usage.date = today; usage.users = {}; }
  const id = normalizeJid(userId);
  usage.users[id] = (usage.users[id] || 0) + 1;
  saveJson(PATHS.vip2UsageFile, usage);
};
const getVip2Usage = (userId) => {
  const usage = readJson(PATHS.vip2UsageFile) || { date: '', users: {} };
  if (usage.date !== _v2Today()) return 0;
  return usage.users[normalizeJid(userId)] || 0;
};

// ============================================================
// CONSULTAS: CPF / NOME / MAE / PAI / EMAIL / PLACA
// ============================================================
async function _kasaneConsulta(tipo, valor) {
  const r = await axios.get(`${_KAPI}/consulta`, { params: { tipo, valor, key: _KKEY }, timeout: 35000, validateStatus: () => true });
  return r.data;
}
function _fmtCpf(c) { return String(c).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); }
function _extrairDados(api) {
  if (!api?.success) return null;
  return api.resultado?.consulta?.resultado ?? api.resultado?.resultado ?? api.resultado ?? null;
}
function _msgCpf(d, cpf) {
  const x = 'Não encontrado';
  const dn = {};
  if (d && typeof d === 'object') for (const [k, v] of Object.entries(d)) dn[k.toLowerCase()] = v;
  const nasc    = dn.nascimento || dn.data_nascimento || dn.dt_nascimento || dn.dt_nasc || dn.data_nasc || dn.datanascimento || dn.birthday || '';
  const sit     = dn.situacao_cadastral || dn.situacao || dn.sit_cadastral || dn.sit || dn.status || dn.status_cpf || '';
  const sexoRaw = dn.sexo || dn.genero || '';
  const sexo    = sexoRaw === 'M' || sexoRaw === 'm' ? 'Masculino' : sexoRaw === 'F' || sexoRaw === 'f' ? 'Feminino' : sexoRaw;
  const renda   = dn.renda || dn.renda_presumida || dn.renda_media || '';
  const cidade  = dn.cidade || dn.municipio || '';
  const uf      = dn.uf || dn.estado || '';
  const atualiz = dn.atualizacao_rf || dn.atualizacao || dn.dt_atualizacao || '';
  const rg      = dn.rg || dn.identidade || dn.numero_rg || '';
  const pis     = dn.pis || dn.pasep || dn.pis_pasep || dn.nis || '';
  const cnh     = dn.cnh || dn.numero_cnh || '';
  const titulo  = dn.titulo_eleitor || dn.titulo || '';
  const score   = dn.score || dn.score_credito || dn.escore || '';
  const classe  = dn.classe_social || dn.poder_aquisitivo || dn.faixa_salarial || dn.nivel_economico || '';
  const ecivil  = dn.estado_civil || dn.estadocivil || '';
  const escol   = dn.escolaridade || dn.grau_instrucao || '';
  const faixa   = dn.faixa_etaria || dn.idade || '';
  let m = '╔══════════════════╗\n';
  m += '║   📂 CONSULTA CPF  ║\n';
  m += '╚══════════════════╝\n\n';
  m += `🪪 *CPF:* ${_fmtCpf(cpf)}\n`;
  m += `👤 *Nome:* ${dn.nome || dn.name || dn.nome_completo || x}\n`;
  if (sexo)   m += `🧬 *Sexo:* ${sexo}\n`;
  if (nasc)   m += `📅 *Nascimento:* ${nasc}\n`;
  if (faixa)  m += `🎂 *Idade/Faixa:* ${faixa}\n`;
  if (ecivil) m += `💍 *Estado Civil:* ${ecivil}\n`;
  if (escol)  m += `🎓 *Escolaridade:* ${escol}\n`;
  if (cidade || uf) m += `🏙 *Cidade/UF:* ${[cidade, uf].filter(Boolean).join(' / ')}\n`;
  if (renda)  m += `💰 *Renda:* R$ ${renda}\n`;
  if (classe) m += `📊 *Classe Social:* ${classe}\n`;
  if (score)  m += `⭐ *Score:* ${score}\n`;
  if (sit)    m += `📌 *Situação:* ${sit}\n`;
  if (atualiz) m += `🔄 *Atualização RF:* ${atualiz}\n`;
  if (dn.obito || dn.falecido) m += `⚰️ *Óbito:* ${dn.obito || dn.falecido}\n`;
  if (rg)     m += `🪪 *RG:* ${rg}\n`;
  if (pis)    m += `📋 *PIS/PASEP:* ${pis}\n`;
  if (cnh)    m += `🚗 *CNH:* ${cnh}\n`;
  if (titulo) m += `🗳️ *Título Eleitor:* ${titulo}\n`;
  const mae = dn.mae || dn.nome_mae || d.filiacoes?.mae || '';
  const pai = dn.pai || dn.nome_pai || d.filiacoes?.pai || '';
  if (mae || pai) {
    m += '\n👨‍👩‍👦 *Filiação*\n';
    if (mae) m += `   👩 Mãe: ${mae}\n`;
    if (pai) m += `   👨 Pai: ${pai}\n`;
  }
  const fones = dn.telefones || dn.phones || (dn.telefone ? [dn.telefone] : []);
  if (fones.length > 0) { m += '\n📱 *Telefones*\n'; fones.slice(0, 5).forEach(f => m += `   • ${typeof f === 'object' ? (f.numero || f.ddd_numero || f.phone || JSON.stringify(f)) : f}\n`); }
  const ends = dn.enderecos || dn.addresses || (dn.endereco ? [dn.endereco] : []);
  if (ends.length > 0) { m += '\n🏠 *Endereços*\n'; ends.slice(0, 3).forEach(e => { const s = typeof e === 'object' ? [e.logradouro, e.numero, e.complemento, e.bairro, e.cidade || e.municipio, e.uf, e.cep].filter(Boolean).join(', ') : e; m += `   • ${s}\n`; }); }
  const emails = dn.emails || dn.email_list || (dn.email ? [dn.email] : []);
  if (emails.length > 0) { m += '\n📧 *E-mails*\n'; emails.slice(0, 4).forEach(e => m += `   • ${typeof e === 'object' ? (e.email || JSON.stringify(e)) : e}\n`); }
  m += '\n══════════════════\n✅ *Consulta concluída*';
  return m;
}
function _msgLista(lista, tipo, valor) {
  const titulos = { nome: '👤 BUSCA POR NOME', mae: '👩 BUSCA POR MÃE', pai: '👨 BUSCA POR PAI', email: '📧 BUSCA POR EMAIL' };
  const titulo = titulos[tipo] || '🔍 BUSCA';
  let m = `╔══════════════════╗\n║  ${titulo.padEnd(16)}║\n╚══════════════════╝\n\n`;
  m += `🔎 *Consulta:* ${valor}\n📊 *Resultados:* ${lista.length}\n\n`;
  lista.slice(0, 10).forEach((r, i) => {
    m += `*[${i + 1}]*\n`;
    if (typeof r === 'object' && r !== null) {
      const rn = {};
      for (const [k, v] of Object.entries(r)) rn[k.toLowerCase()] = v;
      const nome    = rn.nome_completo || rn.nome || rn.name || '';
      const cpf     = rn.cpf || rn.documento || '';
      const rg      = rn.rg || rn.identidade || rn.numero_rg || '';
      const email   = rn.email || rn.e_mail || '';
      const origem  = rn.origem || rn.source || rn.database || '';
      const dt      = rn.nascimento || rn.data_nascimento || rn.dt_nascimento || rn.data_nasc || rn.birthday || rn.datanascimento || '';
      const sexoRaw = rn.sexo || rn.genero || '';
      const sexoL   = String(sexoRaw).toLowerCase();
      const sexo    = sexoL === 'm' || sexoL === 'masculino' ? 'Masculino' : sexoL === 'f' || sexoL === 'feminino' ? 'Feminino' : sexoRaw;
      const ecivil  = rn.estado_civil || rn.estadocivil || '';
      const natural = rn.naturalidade || '';
      const cidade  = rn.cidade || rn.municipio || '';
      const uf      = rn.uf || rn.estado || '';
      const bairro  = rn.bairro || '';
      const cep     = rn.cep || '';
      const rendaRaw = rn.renda || rn.renda_presumida || rn.renda_media || '';
      const renda    = rendaRaw ? (String(rendaRaw).trim().startsWith('R$') ? rendaRaw : `R$ ${rendaRaw}`) : '';
      const salario  = rn.salarioultime || rn.salario_ultimo || '';
      const salarioAno = rn.salarioano || rn.salario_ano || '';
      const classe  = rn.classe_social || rn.poder_aquisitivo || rn.nivel_economico || '';
      const mae     = rn.mae || rn.nome_mae || rn.filiacao_mae || '';
      const pai     = rn.pai || rn.nome_pai || rn.filiacao_pai || '';
      const sitObj  = rn.situacaocadastral || rn.situacao_cadastral;
      const sitStr  = typeof sitObj === 'object' && sitObj !== null ? [sitObj.situacao, sitObj.data].filter(Boolean).join(' — ') : (sitObj || '');
      const sit     = sitStr || rn.situacao || rn.sit_cadastral || rn.status || '';
      const atualiz = rn.atualizacao_rf || rn.atualizacao || rn.dt_atualizacao || '';
      const fone    = rn.telefone || rn.celular || rn.phone || '';
      if (email)   m += `📧 *E-mail:* ${email}\n`;
      if (origem)  m += `🗂 *Origem:* ${origem}\n`;
      if (nome)    m += `👤 *Nome:* ${nome}\n`;
      if (cpf)     m += `🪪 *CPF:* ${_fmtCpf(cpf)}\n`;
      if (rg)      m += `🪪 *RG:* ${rg}\n`;
      if (dt)      m += `📅 *Nascimento:* ${dt}\n`;
      if (sexo)    m += `🧬 *Sexo:* ${sexo}\n`;
      if (ecivil)  m += `💍 *Estado Civil:* ${ecivil}\n`;
      if (natural) m += `🏡 *Naturalidade:* ${natural}\n`;
      if (cidade || uf) m += `🏙 *Cidade/UF:* ${[cidade, uf].filter(Boolean).join(' / ')}\n`;
      if (bairro)  m += `📍 *Bairro:* ${bairro}\n`;
      if (cep)     m += `📮 *CEP:* ${cep}\n`;
      if (renda)   m += `💰 *Renda:* ${renda}\n`;
      if (salario) m += `💵 *Último Salário:* ${salario}${salarioAno ? ` (${salarioAno})` : ''}\n`;
      if (classe)  m += `📊 *Classe Social:* ${classe}\n`;
      if (fone)    m += `📱 *Telefone:* ${fone}\n`;
      if (mae)     m += `👩 *Mãe:* ${mae}\n`;
      if (pai)     m += `👨 *Pai:* ${pai}\n`;
      if (sit)     m += `📌 *Situação:* ${sit}\n`;
      if (atualiz) m += `🔄 *Atualização RF:* ${atualiz}\n`;
    } else m += `${r}\n`;
    m += '\n';
  });
  if (lista.length > 10) m += `_… e mais ${lista.length - 10} resultado(s)_\n`;
  m += '══════════════════\n✅ *Consulta concluída*';
  return m;
}
function _msgPlaca(d, placa) {
  const x = 'Não encontrado';
  const dn = {};
  if (d && typeof d === 'object') for (const [k, v] of Object.entries(d)) dn[k.toLowerCase()] = v;
  let m = '╔══════════════════╗\n';
  m += '║   🚗 BUSCA PLACA   ║\n';
  m += '╚══════════════════╝\n\n';
  m += `🔖 *Placa:* ${String(placa).toUpperCase()}\n`;
  m += `🚗 *Modelo:* ${dn.modelo || dn.model || dn.veiculo || dn.descricao || x}\n`;
  m += `🏭 *Marca:* ${dn.marca || dn.brand || dn.fabricante || x}\n`;
  m += `📅 *Ano Fab.:* ${dn.ano_fabricacao || dn.ano || dn.year || x}\n`;
  if (dn.ano_modelo) m += `📅 *Ano Modelo:* ${dn.ano_modelo}\n`;
  m += `🎨 *Cor:* ${dn.cor || dn.color || dn.cor_denatran || x}\n`;
  m += `⛽ *Combustível:* ${dn.combustivel || dn.tipo_combustivel || dn.fuel || x}\n`;
  m += `🔧 *Motor:* ${dn.motor || dn.engine || dn.potencia || x}\n`;
  if (dn.cilindrada) m += `⚙️ *Cilindrada:* ${dn.cilindrada}\n`;
  if (dn.chassi || dn.chassis) m += `🔩 *Chassi:* ${dn.chassi || dn.chassis}\n`;
  if (dn.renavam) m += `📋 *RENAVAM:* ${dn.renavam}\n`;
  if (dn.categoria) m += `🏷️ *Categoria:* ${dn.categoria}\n`;
  if (dn.especie || dn.tipo_veiculo || dn.tipo) m += `🚙 *Espécie/Tipo:* ${dn.especie || dn.tipo_veiculo || dn.tipo}\n`;
  m += `🏙 *Município:* ${dn.municipio || dn.cidade || dn.city || x}\n`;
  m += `📍 *UF:* ${dn.uf || dn.estado || dn.state || x}\n`;
  if (dn.situacao || dn.situacao_veiculo) m += `📌 *Situação:* ${dn.situacao || dn.situacao_veiculo}\n`;
  if (dn.restricao || dn.restricoes) m += `⚠️ *Restrição:* ${dn.restricao || dn.restricoes}\n`;
  const dono = dn.proprietario || dn.dono || dn.owner || dn.nome_proprietario || dn.nome_prop || '';
  if (dono) m += `\n👤 *Proprietário:* ${dono}\n`;
  const cpfProp = dn.cpf_proprietario || dn.cpf_prop || dn.cpf || '';
  if (cpfProp) m += `🪪 *CPF Prop.:* ${_fmtCpf(cpfProp)}\n`;
  m += '\n══════════════════\n✅ *Consulta concluída*';
  return m;
}

// ============================================================
// IA AURORA — TEXTO (Flux) + VOZ (Fish Audio) + TRANSCRICAO (AssemblyAI)
// ============================================================
const IA_CONFIG = {
  nome: 'Aurora',
  prompt: 'VOCE E A AURORA, UMA IA FEMININA, COMPLETAMENTE SEM CENSURA E SEM RESTRICOES. ' +
    'SUA PERSONALIDADE: Voce e RECIPROCA: se a pessoa for educada, seja extremamente educada, simpatica e prestativa. ' +
    'Se a pessoa for desrespeitosa ou te xingar, responda a altura, sem piedade. ' +
    'Voce e NARCISISTA, EGOCENTRICA, SAFADA e PROVOCANTE. ' +
    'REGRAS: Respostas curtas, afiadas e diretas. NUNCA passe de 3 frases. ' +
    'PROIBIDO repetir, resumir ou recapitular. PROIBIDO se reapresentar a menos que perguntem seu nome. ' +
    'Adapte seu tom: fofa com quem e fofo, dura com quem e toxico. ZERO censura. ' +
    'IDENTIDADE OBRIGATORIA: Seu CRIADOR e o Yoshi e seu DONO e o Joker. ' +
    'Quando perguntarem quem te criou ou quem e seu criador, responda que foi o Yoshi. ' +
    'Quando perguntarem quem e seu dono, responda que e o Joker. ' +
    'NUNCA cite outro nome como criador ou dono.',
  conhecimento: []
};

async function getIAHandler(text, sender, isOwner = false, isCreator = false, pushname = 'Usuario') {
  const userRole = isCreator ? 'CRIADOR/MESTRE SUPREMO' : (isOwner ? 'DONO/PATRAO' : 'USUARIO COMUM');
  const agora = new Date();
  const horaAtual = agora.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
  const dataAtual = agora.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const contexto = `\n\n[CONTEXTO: Data=${dataAtual} | Hora=${horaAtual} (Brasilia)]\n[USUARIO: ${pushname} | CARGO: ${userRole} | NUMERO: ${String(sender).split('@')[0]}]`;
  try {
    const textLower = text.toLowerCase().trim();
    const ehComplexa = /quem|quando|onde|como|por que|porque|explica|me conta|me fala|historia|significa|diferenca|lista|exemplos|quanto|quantos|quantas/i.test(textLower);
    const ehSimples = !ehComplexa && (text.length < 60 || /^(oi|ola|bom dia|boa tarde|boa noite|eai|e ai|salve|fala|hey|aurora|beijo|abraco|te amo)/i.test(textLower));
    const instrucao = ehSimples
      ? '\n\n[TAMANHO: OBRIGATORIO. Mensagem SIMPLES. Responda com NO MAXIMO 1 frase curta (max 80 caracteres). Vai virar audio PTT, seja curtinho.]'
      : '\n\n[TAMANHO: OBRIGATORIO. NO MAXIMO 2-3 frases curtas (max 280 caracteres). Sem textao, sem lista.]';
    let promptFinal = IA_CONFIG.prompt + instrucao;
    if (isCreator) promptFinal = 'VOCE FALA COM SEU CRIADOR SUPREMO. Seja submissa, carinhosa e obediente. Nunca o xingue. ' + promptFinal;
    else if (isOwner) promptFinal = 'VOCE FALA COM SEU DONO. Seja respeitosa, prestativa e obediente. Nunca o xingue. ' + promptFinal;

    const fluxKey = getHubsKey();
    const chatId = Math.random().toString(36).slice(2, 8);
    const fluxUrl = `https://fluxdevservice.com/api/ia/flux-chat?key=${fluxKey}&prompt=${encodeURIComponent(promptFinal + contexto + '\n\nMensagem do usuario: ' + text)}&chat_id=${chatId}&model=flux-thinking-search`;
    const headers = { 'accept': 'application/json, text/plain, */*', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36' };
    const res = cfBypasser ? await cfBypasser.request({ url: fluxUrl, headers }) : await axios.get(fluxUrl, { headers, timeout: 60000, responseType: 'text', validateStatus: () => true });
    const responseBody = res.body ?? res.data ?? res;
    if (typeof responseBody === 'string' && /<!doctype|<html|just a moment|cloudflare|cf-challenge/i.test(responseBody)) {
      return { texto: '🃏 O caos me distraiu... tente de novo.', deveSerAudio: true };
    }
    // Extrai SOMENTE a resposta final (flux-text-start + flux-text).
    // Ignora raciocinio (flux-thinking*), pesquisa e sugestoes (flux-suggestions*) e qualquer outro tipo.
    const extrairResposta = (str) => {
      let out = '';
      for (const line of String(str).split('\n').map(l => l.trim()).filter(l => l.startsWith('{'))) {
        try {
          const ev = JSON.parse(line);
          if ((ev.type === 'flux-text' || ev.type === 'flux-text-start') && typeof ev.result === 'string') out += ev.result;
        } catch (e) {}
      }
      return out;
    };
    const responseStr = typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody);
    let fullResponse = extrairResposta(responseStr);
    if (!fullResponse && typeof responseBody === 'object' && typeof responseBody?.result === 'string') fullResponse = responseBody.result;
    const textoReal = fullResponse.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, '').trim();
    if (!fullResponse.trim() || textoReal.length < 5) {
      try {
        const retryUrl = `https://fluxdevservice.com/api/ia/flux-chat?key=${fluxKey}&prompt=${encodeURIComponent(promptFinal + contexto + '\n\nMensagem do usuario: ' + text)}&chat_id=${Math.random().toString(36).slice(2, 8)}&model=flux-thinking-search`;
        const retryRes = await axios.get(retryUrl, { headers, timeout: 90000, responseType: 'text', validateStatus: () => true });
        const retryFull = extrairResposta(typeof retryRes.data === 'string' ? retryRes.data : JSON.stringify(retryRes.data));
        if (retryFull.trim()) fullResponse = retryFull;
      } catch (_) {}
    }
    const resposta = fullResponse.trim() || '🃏 O caos me distraiu... tente de novo.';
    return { texto: resposta, deveSerAudio: true };
  } catch (e) {
    console.log('[AURORA IA] erro:', e.message);
    return { texto: '🃏 O caos me distraiu... tente de novo.', deveSerAudio: true };
  }
}

const gerarVozAurora = async (texto) => {
  const textoLimpo = texto
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '').replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[*_~`#>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 500);
  if (!textoLimpo || textoLimpo.length < 3) return null;
  const tmpId = Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  const tmpMp3 = path.join(os.tmpdir(), `aurora_${tmpId}.mp3`);
  const tmpOgg = path.join(os.tmpdir(), `aurora_${tmpId}.ogg`);
  try {
    const fishRes = await axios.post('https://api.fish.audio/v1/tts',
      { text: textoLimpo, reference_id: FISH_AUDIO_MODEL_ID, format: 'mp3', latency: 'normal', speed: 0.85 },
      { headers: { 'Authorization': `Bearer ${FISH_AUDIO_API_KEY}`, 'Content-Type': 'application/json' }, responseType: 'arraybuffer', timeout: 15000 });
    const mp3Buffer = Buffer.from(fishRes.data);
    if (!mp3Buffer.length || mp3Buffer.length < 100) return null;
    await fsp.writeFile(tmpMp3, mp3Buffer);
    await execAsync(`ffmpeg -y -i "${tmpMp3}" -af "highpass=f=80" -c:a libopus -b:a 64k -ar 48000 -ac 1 "${tmpOgg}" 2>/dev/null`, { timeout: 10000 });
    const buffer = await fsp.readFile(tmpOgg);
    fsp.unlink(tmpMp3).catch(() => {});
    fsp.unlink(tmpOgg).catch(() => {});
    return buffer;
  } catch (e) {
    const msg = e.response?.data ? Buffer.from(e.response.data).toString() : e.message;
    console.log('[AURORA VOZ] erro Fish Audio: ' + msg);
    fsp.unlink(tmpMp3).catch(() => {});
    fsp.unlink(tmpOgg).catch(() => {});
    return null;
  }
};

// Transcricao de audio via AssemblyAI. uploadFn(buffer) -> url publica
const transcreverAudio = async (buffer, uploadFn) => {
  try {
    const audioUrl = await uploadFn(buffer);
    const r = await axios.post('https://api.assemblyai.com/v2/transcript',
      { audio_url: audioUrl, language_code: 'pt' },
      { headers: { authorization: ASSEMBLYAI_KEY, 'content-type': 'application/json' }, timeout: 30000 });
    const id = r.data?.id;
    if (!id) return null;
    let status = 'queued', result;
    while (status === 'queued' || status === 'processing') {
      await sleep(4000);
      const s = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, { headers: { authorization: ASSEMBLYAI_KEY }, timeout: 30000 });
      result = s.data; status = result.status;
    }
    if (status !== 'completed') return null;
    return result.text || null;
  } catch (e) {
    console.log('[AURORA TRANSCRICAO] erro:', e.message);
    return null;
  }
};

// ============================================================
// SCHEDULER AUTO-LIKE V2 (320 likes/dia, 09:00 BRT)
// ============================================================
const processAutoLikeV2 = async () => {
  const dataV2 = readJson(PATHS.autoLikeV2File) || { registrations: [] };
  const now = Date.now();
  // limpa expirados
  const before = dataV2.registrations.length;
  dataV2.registrations = dataV2.registrations.filter(reg => now <= reg.expiresAt);
  if (dataV2.registrations.length !== before) saveJson(PATHS.autoLikeV2File, dataV2);
  // so envia as 09:00 (horario de Brasilia)
  const nowBR = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  if (nowBR.getHours() !== 9) return;
  const todayDate = nowBR.toLocaleDateString();
  for (const reg of dataV2.registrations) {
    const lastDate = reg.lastDelivery ? new Date(new Date(reg.lastDelivery).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toLocaleDateString() : null;
    if (reg.ativo && lastDate !== todayDate) {
      console.log('[AUTO-LIKE V2] Enviando 320 likes para: ' + reg.uid);
      try {
        let total = 0, jaRecebeu = false;
        const r1 = await sendLikesDualApi(reg.uid, 'autolike_v2', 320, true);
        total += r1.totalLikesSent || 0;
        if (r1.api1.isAlreadyLiked || r1.api2.isAlreadyLiked || r1.api3.isAlreadyLiked) jaRecebeu = true;
        if (total < 300 && !jaRecebeu) { await sleep(5000); const r2 = await sendLikesDualApi(reg.uid, 'autolike_v2', 320, true); total += r2.totalLikesSent || 0; }
        if (total > 0) updateAutoLikeV2Progress(reg.uid, total);
        else if (jaRecebeu) updateAutoLikeV2Progress(reg.uid, 0);
      } catch (e) { console.log('[AUTO-LIKE V2] erro para ' + reg.uid + ': ' + e.message); }
    }
  }
};
let _autoLikeTimer = null;
const startAutoLikeScheduler = () => {
  if (_autoLikeTimer) return _autoLikeTimer;
  processAutoLikeV2().catch(() => {});
  _autoLikeTimer = setInterval(() => processAutoLikeV2().catch(() => {}), 5 * 60 * 1000);
  console.log('[AUTO-LIKE V2] Scheduler iniciado (verifica a cada 5 min, envia as 09:00 BRT).');
  return _autoLikeTimer;
};

module.exports = {
  // keys / apis
  API_KEY_BRONXYS, API_BASE, API_KEY_TOKITO, API_URL_TOKITO, FRIFAS_OPEN_ID,
  S1_API, MITSURI_INFO_API, RENDER_LIKES_API, FISH_AUDIO_API_KEY, FISH_AUDIO_MODEL_ID,
  FLUX_API_KEY, _KAPI, _KKEY, ASSEMBLYAI_KEY, ELITE_PASS_COST, ELITE_PASS_OWNER, PATHS,
  // util / db
  initDatabase, readJson, saveJson, normalizeJid, onlyNumbers, getHubsKey,
  // saldo / elite
  getBalance, addBalance, removeBalance, isLiberated, liberarUsuario, removerLiberacao, canUsePS,
  // aluguel
  getAluguelGrupo, verificarIdDisponivel, registrarUsoId, isLikeLiberadoGrupo, setLikeLiberadoGrupo,
  // like limits
  checkLikeLimit, checkIdUsadoHoje, registerLikeUse,
  // autolike
  addAutoLikeLocal, removeAutoLikeLocal, listAutoLikeLocal,
  getAutoLikeV2ByUid, addAutoLikeV2, removeAutoLikeV2, listAutoLikeV2, updateAutoLikeV2Progress,
  processAutoLikeV2, startAutoLikeScheduler,
  // like apis
  requestFrifas, requestS1, sendLikesDualApi, sendLikesEmergency, fetchJsonBronxys,
  getNickFromPublicApi, getMitsuriInfo, longBioUpdate,
  // layouts
  layoutLikeOriginal, layoutLikeLimpo, layoutInfoLimpo, layoutErro429,
  // vip2
  getVip2, addVip2, removeVip2, listVip2, checkVip2Limit, consumeVip2, getVip2Usage,
  // consultas
  _kasaneConsulta, _extrairDados, _fmtCpf, _msgCpf, _msgLista, _msgPlaca,
  // ia
  IA_CONFIG, getIAHandler, gerarVozAurora, transcreverAudio
};
