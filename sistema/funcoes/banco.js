import fs from 'node:fs/promises'
import { mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { modoCliente, marcaCliente, aoMudarIdioma } from './cliente.js'

const dir = path.resolve('sistema/dados')
const file = path.join(dir, 'dados.db')
const stateFile = path.join(dir, 'state.json')
const groupDir = path.join(dir, 'grupos/ativacoes')
const legacyGroupDir = path.join(dir, 'grupos/activation_gp')
mkdirSync(dir, { recursive: true })

const sql = new DatabaseSync(file)
sql.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;')
sql.exec(`
CREATE TABLE IF NOT EXISTS cfg (k TEXT PRIMARY KEY, v TEXT);
CREATE TABLE IF NOT EXISTS gp (
  jid TEXT PRIMARY KEY,
  nome TEXT NOT NULL DEFAULT 'Grupo',
  legenda TEXT,
  saiu TEXT,
  fundo TEXT,
  ftipo TEXT,
  fsaiu TEXT,
  stipo TEXT
);
CREATE TABLE IF NOT EXISTS ativ (
  gp TEXT PRIMARY KEY,
  antiFake INTEGER DEFAULT 0,
  antiLink INTEGER DEFAULT 0,
  antiAudio INTEGER DEFAULT 0,
  antiVideo INTEGER DEFAULT 0,
  antiFoto INTEGER DEFAULT 0,
  antiSticker INTEGER DEFAULT 0,
  antiDocumento INTEGER DEFAULT 0,
  antiStatus INTEGER DEFAULT 0,
  antiCanal INTEGER DEFAULT 0,
  antiVisu INTEGER DEFAULT 0,
  x9ViewOnce INTEGER DEFAULT 0,
  x9 INTEGER DEFAULT 0,
  bemVindo INTEGER DEFAULT 0,
  autoSticker INTEGER DEFAULT 0,
  autoBan INTEGER DEFAULT 0,
  soAdm INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS adv (gp TEXT, user TEXT, nome TEXT, n INTEGER DEFAULT 0, motivo TEXT, at INTEGER, PRIMARY KEY(gp,user));
CREATE TABLE IF NOT EXISTS mute (gp TEXT, user TEXT, PRIMARY KEY(gp,user));
CREATE TABLE IF NOT EXISTS cmd (gp TEXT, cmd TEXT, PRIMARY KEY(gp,cmd));
CREATE TABLE IF NOT EXISTS hora (gp TEXT PRIMARY KEY, fechar TEXT, abrir TEXT, last TEXT);
CREATE TABLE IF NOT EXISTS vip (user TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS block (user TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS vipcmd (cmd TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS gcmd (cmd TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS bangp (gp TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS aluguel (gp TEXT PRIMARY KEY, ate INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS aluguel_pedido (pedido TEXT PRIMARY KEY, gp TEXT NOT NULL, dias INTEGER NOT NULL, ate INTEGER NOT NULL, criado INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS aluguel_pedido_gp ON aluguel_pedido(gp);
CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT);
`)

const defaultWelcomeIn = `⏤͟͟͞͞𝐁𝐞𝐦-𝐯𝐢𝐧𝐝𝐨(𝐚)! 𖤐⃝👋
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* #numero#
> *[👥]* • *ɢʀᴜᴘᴏ:* #nomegrupo#
> *[📊]* • *ᴍᴇᴍʙʀᴏs:* #membros#
> *[🕐]* • *ʜᴏʀᴀ:* #hora#
•
> Seja bem-vindo(a) ao grupo! 💚
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`

const defaultWelcomeOut = `⏤͟͟͞͞𝐀𝐭𝐞́ 𝐦𝐚𝐢𝐬! 𖤐⃝👋
•
> *[👤]* • *ᴜsᴜᴀ́ʀɪᴏ:* #numero#
> *[👥]* • *ɢʀᴜᴘᴏ:* #nomegrupo#
> *[📊]* • *ᴍᴇᴍʙʀᴏs:* #membros#
> *[🕐]* • *ʜᴏʀᴀ:* #hora#
•
> #numero# saiu do grupo.
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`

const bits = [
  'antiFake','antiLink','antiAudio','antiVideo','antiFoto','antiSticker','antiDocumento','antiStatus',
  'antiCanal','antiVisu','x9ViewOnce','x9','bemVindo','autoSticker','autoBan','soAdm'
]

const bit = (v) => (v === true || v === 1 || String(v).toLowerCase() === 'true' ? 1 : 0)
const txt = (v = '', fallback = '') => String(v ?? '').trim() || fallback

function emptyState() {
  return {
    blocked: [], vip: [], muted: {}, settings: { antiPv: 0 },
    games: { tictactoe: {} }, relationships: { couples: [], pending: [] }, profiles: {}
  }
}

let state = emptyState()
const groups = Object.create(null)

function getCfg(k, fallback = null) {
  const row = sql.prepare('SELECT v FROM cfg WHERE k=?').get(k)
  if (!row) return fallback
  try { return JSON.parse(row.v) } catch { return row.v }
}
function setCfg(k, v) {
  sql.prepare('INSERT INTO cfg(k,v) VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k, JSON.stringify(v))
}
function getKv(k, fallback) {
  const row = sql.prepare('SELECT v FROM kv WHERE k=?').get(k)
  if (!row) return fallback
  try { return JSON.parse(row.v) } catch { return fallback }
}
function setKv(k, v) {
  sql.prepare('INSERT INTO kv(k,v) VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k, JSON.stringify(v))
}

function ativDefaults() {
  return Object.fromEntries(bits.map(k => [k, 0]))
}
function runtime(jid, gp = {}, ativ = {}) {
  return {
    ...ativDefaults(),
    ...Object.fromEntries(bits.map(k => [k, bit(ativ?.[k])])),
    legendabv: txt(gp.legenda, defaultWelcomeIn),
    legendasaiu: txt(gp.saiu, defaultWelcomeOut),
    fundobv: gp.fundo || null,
    fundobv_tipo: gp.ftipo || null,
    fundosaiu: gp.fsaiu || null,
    fundosaiu_tipo: gp.stipo || null,
    __nome: txt(gp.nome, 'Grupo'),
    __jid: jid
  }
}

function readGroup(jid) {
  const gp = sql.prepare('SELECT * FROM gp WHERE jid=?').get(jid)
  if (!gp) return null
  const ativ = sql.prepare('SELECT * FROM ativ WHERE gp=?').get(jid) || {}
  return runtime(jid, gp, ativ)
}
function writeGroup(jid, g) {
  sql.prepare(`INSERT INTO gp(jid,nome,legenda,saiu,fundo,ftipo,fsaiu,stipo) VALUES(?,?,?,?,?,?,?,?)
    ON CONFLICT(jid) DO UPDATE SET nome=excluded.nome,legenda=excluded.legenda,saiu=excluded.saiu,fundo=excluded.fundo,ftipo=excluded.ftipo,fsaiu=excluded.fsaiu,stipo=excluded.stipo`)
    .run(jid, txt(g.__nome, 'Grupo'), txt(g.legendabv, defaultWelcomeIn), txt(g.legendasaiu, defaultWelcomeOut), g.fundobv || null, g.fundobv_tipo || null, g.fundosaiu || null, g.fundosaiu_tipo || null)
  const vals = bits.map(k => bit(g[k]))
  const marks = bits.map(() => '?').join(',')
  const updates = bits.map(k => `${k}=excluded.${k}`).join(',')
  sql.prepare(`INSERT INTO ativ(gp,${bits.join(',')}) VALUES(?,${marks}) ON CONFLICT(gp) DO UPDATE SET ${updates}`).run(jid, ...vals)
}

async function readJson(p, fallback = null) {
  try { return JSON.parse(await fs.readFile(p, 'utf8')) } catch { return fallback }
}
function normLegacyGroup(jid, raw = {}) {
  const src = Array.isArray(raw) ? (raw[0] || {}) : raw
  const a = src.ativacoes || src.funcoes || src
  const w = (src.bemVindo && typeof src.bemVindo === 'object') ? src.bemVindo : (Array.isArray(src.wellcome) ? src.wellcome[0] || {} : src)
  const g = runtime(jid, {
    nome: src.nome || src.name || 'Grupo',
    legenda: w.legenda || w.legendabv || w.welcomeText,
    saiu: w.legendaSaiu || w.legendasaiu,
    fundo: w.fundo || w.fundobv,
    ftipo: w.fundoTipo || w.fundobv_tipo,
    fsaiu: w.fundoSaiu || w.fundosaiu,
    stipo: w.fundoSaiuTipo || w.fundosaiu_tipo
  }, Object.fromEntries(bits.map(k => [k, a[k] ?? a[k.toLowerCase()]])))
  return g
}
async function migrateDir(folder) {
  try {
    for (const name of await fs.readdir(folder)) {
      if (!name.endsWith('.json')) continue
      const raw = await readJson(path.join(folder, name), null)
      if (!raw) continue
      const src = Array.isArray(raw) ? (raw[0] || {}) : raw
      const jid = txt(src.jid || src.groupId || name.slice(0, -5))
      if (!jid || sql.prepare('SELECT 1 FROM gp WHERE jid=?').get(jid)) continue
      writeGroup(jid, normLegacyGroup(jid, raw))
    }
  } catch {}
}

export async function loadState() {
  if (!getCfg('migrado', false)) {
    const old = await readJson(stateFile, {}) || {}
    const premium = Array.isArray(old.premium) ? old.premium : []
    for (const u of [...new Set([...(Array.isArray(old.vip) ? old.vip : []), ...premium])]) sql.prepare('INSERT OR IGNORE INTO vip(user) VALUES(?)').run(String(u))
    for (const u of (Array.isArray(old.blocked) ? old.blocked : [])) sql.prepare('INSERT OR IGNORE INTO block(user) VALUES(?)').run(String(u))
    for (const [gp, users] of Object.entries(old.muted || {})) for (const u of (Array.isArray(users) ? users : [])) sql.prepare('INSERT OR IGNORE INTO mute(gp,user) VALUES(?,?)').run(gp, String(u))
    setCfg('antiPv', bit(old.settings?.antiPv))
    setKv('games', old.games || { tictactoe: {} })
    setKv('rel', old.relationships || { couples: [], pending: [] })
    setKv('perfil', old.profiles || {})
    if (old.groups && typeof old.groups === 'object') for (const [jid, g] of Object.entries(old.groups)) if (!sql.prepare('SELECT 1 FROM gp WHERE jid=?').get(jid)) writeGroup(jid, normLegacyGroup(jid, g))
    await migrateDir(groupDir)
    await migrateDir(legacyGroupDir)
    setCfg('migrado', true)
  }

  state = emptyState()
  state.vip = sql.prepare('SELECT user FROM vip ORDER BY user').all().map(r => r.user)
  state.blocked = sql.prepare('SELECT user FROM block ORDER BY user').all().map(r => r.user)
  state.muted = {}
  for (const r of sql.prepare('SELECT gp,user FROM mute').all()) (state.muted[r.gp] ??= []).push(r.user)
  state.settings.antiPv = bit(getCfg('antiPv', 0))
  state.games = getKv('games', { tictactoe: {} })
  state.relationships = getKv('rel', { couples: [], pending: [] })
  state.profiles = getKv('perfil', {})
  if (!state.games?.tictactoe) state.games = { tictactoe: {} }
  if (!Array.isArray(state.relationships?.couples)) state.relationships = { couples: [], pending: [] }
  if (!state.profiles || typeof state.profiles !== 'object') state.profiles = {}
  return state
}

export function importNecessarios(n = {}) {
  if (sql.prepare('SELECT COUNT(*) n FROM vipcmd').get().n === 0) {
    for (const c of (Array.isArray(n.vipcmd) ? n.vipcmd : [])) addVipCmd(c)
  }
  if (getCfg('aluguel') === null && typeof n.aluguel === 'boolean') setCfg('aluguel', n.aluguel)
}

export function db() { return state }

export function userProfile(key, patch = {}) {
  const id = txt(key)
  if (!id) return null
  const now = new Date().toISOString()
  const current = state.profiles[id] && typeof state.profiles[id] === 'object' ? state.profiles[id] : {}
  state.profiles[id] = {
    bio: 'Sem bio definida.', commands: 0, firstSeen: current.firstSeen || now, lastSeen: now,
    name: '', number: '', jid: '', ...current,
    ...Object.fromEntries(Object.entries(patch).filter(([,v]) => v !== undefined && v !== null && v !== ''))
  }
  return state.profiles[id]
}
export function profileByKey(key) { return state.profiles?.[txt(key)] || null }

export function groupState(jid, info = {}) {
  const id = txt(jid)
  if (!id) return runtime('', {}, {})
  if (!groups[id]) groups[id] = readGroup(id) || runtime(id, { nome: info.nome || info.name || 'Grupo' }, {})
  const nome = txt(info.nome || info.name)
  if (nome && nome !== 'Grupo') groups[id].__nome = nome
  return groups[id]
}
export async function ensureGroupState(jid, info = {}) {
  const id = txt(jid)
  if (!id) return null
  const existed = Boolean(readGroup(id))
  const g = groupState(id, info)
  if (!existed) writeGroup(id, g)
  else if (txt(info.nome || info.name) && info.nome !== g.__nome) { g.__nome = info.nome || info.name; writeGroup(id, g) }
  return g
}
export function groupRecord(jid) {
  const g = groupState(jid)
  return { nome:g.__nome, jid, ativacoes:Object.fromEntries(bits.map(k=>[k,Boolean(Number(g[k]))])), bemVindo:{legenda:g.legendabv,legendaSaiu:g.legendasaiu,fundo:g.fundobv,fundoTipo:g.fundobv_tipo,fundoSaiu:g.fundosaiu,fundoSaiuTipo:g.fundosaiu_tipo} }
}
export function allGroupRecords() { return sql.prepare('SELECT jid FROM gp ORDER BY nome').all().map(r => groupRecord(r.jid)) }
export function saveGroupState(jid) { const id=txt(jid); if (id) writeGroup(id, groupState(id)); return Promise.resolve() }

export function saveState() {
  sql.exec('BEGIN')
  try {
    sql.exec('DELETE FROM vip; DELETE FROM block; DELETE FROM mute;')
    for (const u of [...new Set(state.vip || [])]) sql.prepare('INSERT OR IGNORE INTO vip(user) VALUES(?)').run(String(u))
    for (const u of [...new Set(state.blocked || [])]) sql.prepare('INSERT OR IGNORE INTO block(user) VALUES(?)').run(String(u))
    for (const [gp, users] of Object.entries(state.muted || {})) for (const u of [...new Set(users || [])]) sql.prepare('INSERT OR IGNORE INTO mute(gp,user) VALUES(?,?)').run(gp, String(u))
    setCfg('antiPv', bit(state.settings?.antiPv))
    setKv('games', state.games || { tictactoe:{} })
    setKv('rel', state.relationships || { couples:[], pending:[] })
    setKv('perfil', state.profiles || {})
    for (const [jid,g] of Object.entries(groups)) writeGroup(jid,g)
    sql.exec('COMMIT')
  } catch (e) { sql.exec('ROLLBACK'); throw e }
  return Promise.resolve()
}

const cleanCmd = (c='') => String(c).trim().replace(/^[!./#]+/,'').toLowerCase()
export function addCmd(gp, cmd) { const c=cleanCmd(cmd); if(c) sql.prepare('INSERT OR IGNORE INTO cmd(gp,cmd) VALUES(?,?)').run(gp,c); return c }
export function delCmd(gp, cmd) { const c=cleanCmd(cmd); sql.prepare('DELETE FROM cmd WHERE gp=? AND cmd=?').run(gp,c); return c }
export function listCmd(gp) { return sql.prepare('SELECT cmd FROM cmd WHERE gp=? ORDER BY cmd').all(gp).map(r=>r.cmd) }
export function hasCmd(gp, cmd) { return Boolean(sql.prepare('SELECT 1 FROM cmd WHERE gp=? AND cmd=?').get(gp,cleanCmd(cmd))) }
export function addGcmd(cmd) { const c=cleanCmd(cmd); if(c) sql.prepare('INSERT OR IGNORE INTO gcmd(cmd) VALUES(?)').run(c); return c }
export function delGcmd(cmd) { const c=cleanCmd(cmd); sql.prepare('DELETE FROM gcmd WHERE cmd=?').run(c); return c }
export function listGcmd() { return sql.prepare('SELECT cmd FROM gcmd ORDER BY cmd').all().map(r=>r.cmd) }
export function hasGcmd(cmd) { return Boolean(sql.prepare('SELECT 1 FROM gcmd WHERE cmd=?').get(cleanCmd(cmd))) }

export function addVipCmd(cmd) { const c=cleanCmd(cmd); if(c) sql.prepare('INSERT OR IGNORE INTO vipcmd(cmd) VALUES(?)').run(c); return c }
export function delVipCmd(cmd) { const c=cleanCmd(cmd); sql.prepare('DELETE FROM vipcmd WHERE cmd=?').run(c); return c }
export function listVipCmd() { return sql.prepare('SELECT cmd FROM vipcmd ORDER BY cmd').all().map(r=>r.cmd) }
export function isVipCmd(cmd) { return Boolean(sql.prepare('SELECT 1 FROM vipcmd WHERE cmd=?').get(cleanCmd(cmd))) }

export function addAdv(gp, user, nome='', motivo='Sem motivo') {
  const old = sql.prepare('SELECT n FROM adv WHERE gp=? AND user=?').get(gp,user)
  const n = Number(old?.n || 0) + 1
  sql.prepare(`INSERT INTO adv(gp,user,nome,n,motivo,at) VALUES(?,?,?,?,?,?) ON CONFLICT(gp,user) DO UPDATE SET nome=excluded.nome,n=excluded.n,motivo=excluded.motivo,at=excluded.at`)
    .run(gp,user,nome,n,motivo,Date.now())
  return n
}
export function delAdv(gp,user) {
  const row=sql.prepare('SELECT n FROM adv WHERE gp=? AND user=?').get(gp,user)
  if(!row) return 0
  const n=Math.max(0,Number(row.n)-1)
  if(n===0) sql.prepare('DELETE FROM adv WHERE gp=? AND user=?').run(gp,user)
  else sql.prepare('UPDATE adv SET n=?,at=? WHERE gp=? AND user=?').run(n,Date.now(),gp,user)
  return n
}
export function listAdv(gp) { return sql.prepare('SELECT user,nome,n,motivo,at FROM adv WHERE gp=? ORDER BY n DESC,at DESC').all(gp) }

export function setHora(gp, tipo, value) {
  const row=getHora(gp)
  const fechar=tipo==='fechar'?value:row?.fechar||null
  const abrir=tipo==='abrir'?value:row?.abrir||null
  sql.prepare('INSERT INTO hora(gp,fechar,abrir,last) VALUES(?,?,?,NULL) ON CONFLICT(gp) DO UPDATE SET fechar=excluded.fechar,abrir=excluded.abrir').run(gp,fechar,abrir)
  return getHora(gp)
}
export function getHora(gp) { return sql.prepare('SELECT gp,fechar,abrir,last FROM hora WHERE gp=?').get(gp) || null }
export function getHoras() { return sql.prepare('SELECT gp,fechar,abrir,last FROM hora WHERE fechar IS NOT NULL OR abrir IS NOT NULL').all() }
export function rmHora(gp) { sql.prepare('DELETE FROM hora WHERE gp=?').run(gp) }
export function markHora(gp,last) { sql.prepare('UPDATE hora SET last=? WHERE gp=?').run(last,gp) }

export function banGp(gp) { if(gp) sql.prepare('INSERT OR IGNORE INTO bangp(gp) VALUES(?)').run(gp) }
export function unbanGp(gp) { sql.prepare('DELETE FROM bangp WHERE gp=?').run(gp) }
export function isBanGp(gp) { return Boolean(sql.prepare('SELECT 1 FROM bangp WHERE gp=?').get(gp)) }
export function listBanGp() { return sql.prepare('SELECT gp FROM bangp ORDER BY gp').all().map(r=>r.gp) }

export function aluguelOn(value) { if(value !== undefined) setCfg('aluguel', Boolean(value)); return Boolean(getCfg('aluguel', false)) }

// Renovação SOMA o tempo que ainda resta. Quem paga antes do vencimento não
// perde dias. A versão antiga sempre recalculava a partir de agora.
export function setAluguel(gp, dias) {
  const id=txt(gp), qtd=Math.max(1,Math.floor(Number(dias)||1))
  const atual=getAluguel(id)
  const base=Math.max(Date.now(), Number(atual?.ate)||0)
  const ate=base+qtd*86400000
  sql.prepare('INSERT INTO aluguel(gp,ate) VALUES(?,?) ON CONFLICT(gp) DO UPDATE SET ate=excluded.ate').run(id,ate)
  return ate
}

// Pedido do site é idempotente: webhook repetido, reinício ou polling repetido
// nunca acrescentam os mesmos dias duas vezes.
export function setAluguelPedido(gp, dias, pedido) {
  const id=txt(gp), pd=txt(pedido), qtd=Math.max(1,Math.floor(Number(dias)||1))
  if(!id || !pd) throw new Error('grupo e pedido são obrigatórios')
  const feito=sql.prepare('SELECT pedido,gp,dias,ate FROM aluguel_pedido WHERE pedido=?').get(pd)
  if(feito) return { ...feito, repetido:true }
  const ate=setAluguel(id,qtd)
  sql.prepare('INSERT INTO aluguel_pedido(pedido,gp,dias,ate,criado) VALUES(?,?,?,?,?)').run(pd,id,qtd,ate,Date.now())
  return { pedido:pd, gp:id, dias:qtd, ate, repetido:false }
}
export function transferirAluguelPedido(pedido, novoGrupo, validadeISO) {
  const pd=txt(pedido), gp=txt(novoGrupo), ate=Date.parse(String(validadeISO||''))
  if(!pd || !gp || !Number.isFinite(ate) || ate<=Date.now()) throw new Error('aluguel vencido ou destino inválido')
  const antigo=sql.prepare('SELECT pedido,gp,dias,ate FROM aluguel_pedido WHERE pedido=?').get(pd)
  if(!antigo) throw new Error('pedido original não encontrado no bot')
  if(antigo.gp===gp) return { ...antigo, repetido:true }
  const outros=sql.prepare('SELECT pedido FROM aluguel_pedido WHERE gp=? AND pedido<>? LIMIT 1').get(gp,pd)
  if(outros) throw new Error('grupo de destino já possui outro aluguel')
  sql.exec('BEGIN IMMEDIATE')
  try {
    sql.prepare('DELETE FROM aluguel WHERE gp=?').run(antigo.gp)
    sql.prepare('INSERT INTO aluguel(gp,ate) VALUES(?,?) ON CONFLICT(gp) DO UPDATE SET ate=excluded.ate').run(gp,ate)
    sql.prepare('UPDATE aluguel_pedido SET gp=?,ate=? WHERE pedido=?').run(gp,ate,pd)
    sql.exec('COMMIT')
  } catch(e) { sql.exec('ROLLBACK'); throw e }
  return {pedido:pd,gp,ate,dias:antigo.dias,repetido:false}
}
export function pedidoAluguel(pedido) { return sql.prepare('SELECT pedido,gp,dias,ate FROM aluguel_pedido WHERE pedido=?').get(txt(pedido)) || null }
export function ultimoPedidoAluguel(gp) { return sql.prepare('SELECT pedido,gp,dias,ate FROM aluguel_pedido WHERE gp=? ORDER BY criado DESC LIMIT 1').get(txt(gp)) || null }
export function delAluguel(gp) { sql.prepare('DELETE FROM aluguel WHERE gp=?').run(gp) }
export function getAluguel(gp) { return sql.prepare('SELECT gp,ate FROM aluguel WHERE gp=?').get(gp) || null }
export function listAluguel() { return sql.prepare('SELECT gp,ate FROM aluguel ORDER BY ate').all() }
// Não apagamos o vencido aqui. O worker automático precisa enxergá-lo para
// sair do grupo e só então remover o registro local.
// DONO DO ALUGUEL: o número que o cliente informou no site. Ele manda no bot
// como ADM/VIP só no grupo que alugou; em outros grupos é membro comum.
export function setDonoAluguel(gp, numero) { const n=String(numero||'').replace(/\D/g,''); if(txt(gp) && n.length>=10) setKv('aluguel_dono:'+txt(gp), n); return n }
export function getDonoAluguel(gp) { return String(getKv('aluguel_dono:'+txt(gp), '') || '') }
// Token do aluguel salvo pelo #tokenaluguel. Fica no banco, fora do Git.
export function tokenAluguelSalvo(valor) { if(valor !== undefined) setCfg('aluguel_token', String(valor||'').trim()); return String(getCfg('aluguel_token', '') || '') }
export function aluguelOk(gp) { const r=getAluguel(gp); return Boolean(r && Number(r.ate)>Date.now()) }

export function clearCache() {
  const n=Object.keys(groups).length
  for(const k of Object.keys(groups)) delete groups[k]
  return { grupos:n }
}

export const groupStorage = Object.freeze({ dir: groupDir, defaultWelcomeIn, defaultWelcomeOut, db:file })
export { sql }

// Personalização por grupo: nunca altera a identidade global do WhatsApp.
export function setPersonalizacaoAluguel(gp, dados = {}) {
  const jid = txt(gp)
  if (!jid) return { nome: '', foto: '' }
  const nome = String(dados.nome || '').trim().slice(0, 48)
  const foto = String(dados.foto || '').trim().slice(0, 1000)
  const valor = { nome, foto: /^https:\/\//i.test(foto) ? foto : '' }
  setKv('aluguel_personalizacao:' + jid, valor)
  return valor
}
export function getPersonalizacaoAluguel(gp) {
  return getKv('aluguel_personalizacao:' + txt(gp), { nome: '', foto: '' })
}


// Limites de Free Fire isolados por grupo alugado e usuário.
// Limite de IDs por usuário/dia. 0 = sem limite. No bot da cliente o limite
// é opcional (ela liga pelo #configurarff); no bot da casa o padrão é 3.
const LIMITE_FF_PADRAO = modoCliente ? 0 : 3
export function getLimiteFF(gp) {
  const n = Number(getKv('ff:limite:' + txt(gp), LIMITE_FF_PADRAO))
  return Number.isInteger(n) && n >= 0 && n <= 100 ? n : LIMITE_FF_PADRAO
}
export function setLimiteFF(gp, limite) {
  const n = Number(limite)
  if (!txt(gp) || !Number.isInteger(n) || n < 0 || n > 100) throw new Error('Limite deve ser de 0 a 100 IDs')
  setKv('ff:limite:' + txt(gp), n)
  return n
}
export function consumirCotaFF(gp, usuario) {
  const limite = getLimiteFF(gp)
  const dia = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
  const chave = 'ff:uso:' + txt(gp) + ':' + txt(usuario) + ':' + dia
  const usado = Number(getKv(chave, 0)) || 0
  if (limite && usado >= limite) return { ok: false, usado, limite, restante: 0 }
  setKv(chave, usado + 1)
  return { ok: true, usado: usado + 1, limite, restante: limite - usado - 1 }
}

export function consultarCotaFF(gp, usuario) {
  const limite = getLimiteFF(gp)
  const dia = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
  const usado = Number(getKv('ff:uso:' + txt(gp) + ':' + txt(usuario) + ':' + dia, 0)) || 0
  if (!limite) return { ok: true, usado, limite, restante: Infinity }
  return { ok: usado < limite, usado, limite, restante: Math.max(0, limite - usado) }
}

// Autolikes cadastrados de dentro de um grupo alugado. A key da API é a do
// dono do bot, então a lista dela tem os IDs de todo mundo: no grupo alugado
// o cliente só vê e só remove os IDs que cadastrou ali.
const uidLimpo = (uid) => String(uid ?? '').replace(/\D/g, '').slice(0, 20)
export function autolikesDoGrupo(gp) {
  const lista = getKv('ff:autolikes:' + txt(gp), [])
  return Array.isArray(lista) ? lista.map(uidLimpo).filter(Boolean) : []
}
export function addAutolikeGrupo(gp, uid) {
  const id = uidLimpo(uid)
  if (!txt(gp) || !id) return
  const lista = autolikesDoGrupo(gp)
  if (!lista.includes(id)) setKv('ff:autolikes:' + txt(gp), [...lista, id].slice(-500))
}
export function delAutolikeGrupo(gp, uid) {
  const id = uidLimpo(uid)
  setKv('ff:autolikes:' + txt(gp), autolikesDoGrupo(gp).filter((x) => x !== id))
}

// Idioma independente por grupo (persistido no SQLite). Grupo que não
// escolheu (#idioma) fala o idioma do bot: no bot da cliente, o que ela
// escolheu no site.
const idiomaDoBot = () => (modoCliente && ['pt','es','en'].includes(marcaCliente()?.idioma) ? marcaCliente().idioma : 'pt')
export function getIdiomaGrupo(gp) {
  const v = String(getKv('idioma:grupo:' + txt(gp), '')).toLowerCase()
  return ['pt','es','en'].includes(v) ? v : idiomaDoBot()
}
// A dona trocou o idioma do bot no site: vale em todos os grupos na hora,
// sem reconectar (apaga o idioma que cada grupo tinha escolhido).
aoMudarIdioma(() => { sql.prepare("DELETE FROM kv WHERE k LIKE 'idioma:grupo:%'").run() })
export function setIdiomaGrupo(gp, idioma) {
  const v = String(idioma || '').toLowerCase()
  if (!txt(gp) || !['pt','es','en'].includes(v)) throw new Error('Idioma inválido')
  setKv('idioma:grupo:' + txt(gp), v)
  return v
}

// Boas-vindas do bot da cliente: guarda pra qual dona já foi mandada. A chave
// tem versão: quando o passo a passo muda, quem já tinha recebido o antigo
// recebe o novo uma vez.
const CHAVE_BOAS_VINDAS = 'cliente:boas_vindas:v2'
export function boasVindasEnviada(dono) { return String(getKv(CHAVE_BOAS_VINDAS, '')) === txt(dono) }
export function marcarBoasVindas(dono) { setKv(CHAVE_BOAS_VINDAS, txt(dono)) }

// Bot da cliente: o modo aluguel começa LIGADO, pra ninguém usar o bot dela
// num grupo que ela não registrou (#rgaluguel). Ela pode mudar com #modoaluguel.
if (modoCliente && getCfg('aluguel', null) === null) setCfg('aluguel', true)

// AURORA COM IA (sistema/funcoes/aurora): liga/desliga no bot inteiro
// (#auroraia, padrão ligada) e por grupo (#aurora 1/0). Grupo sem escolha
// devolve null e quem decide é a Aurora (ver ligadaNoGrupo).
// LID → NÚMERO. O WhatsApp troca o número da pessoa por um código interno
// (LID, @lid) em grupo e no privado. Toda vez que os dois aparecem juntos
// (lista do grupo, número alternativo da mensagem, consulta ao WhatsApp) o
// par fica guardado: dono, criador e marcação continuam funcionando quando
// só vem o LID.
const lidsEmMemoria = new Map()
const soDigitos = (v) => String(v || '').split('@')[0].split(':')[0].replace(/\D/g, '')
export function lembrarLid(lid, numero) {
  const l = soDigitos(lid), n = soDigitos(numero)
  if (!l || !n || l === n || lidsEmMemoria.get(l) === n) return
  lidsEmMemoria.set(l, n)
  if (lidsEmMemoria.size > 20000) lidsEmMemoria.delete(lidsEmMemoria.keys().next().value)
  try { setKv('lid:' + l, n) } catch {}
}
export function numeroDoLid(lid) {
  const l = soDigitos(lid)
  if (!l) return ''
  if (lidsEmMemoria.has(l)) return lidsEmMemoria.get(l)
  let n = ''
  try { n = String(getKv('lid:' + l, '') || '') } catch {}
  if (n) lidsEmMemoria.set(l, n)
  return n
}

export function auroraIaLigada(value) {
  if (value !== undefined) setCfg('aurora_ia', value ? 1 : 0)
  return Number(getCfg('aurora_ia', 1)) === 1
}
// O criador: o número que recebe os avisos de compra (o site diz qual é a
// cada volta da fila). Só ele vê o sistema por dentro e manda ela agir.
export function auroraCriador(value) {
  if (value !== undefined) setCfg('aurora_criador', String(value || '').replace(/\D/g, ''))
  return String(getCfg('aurora_criador', '') || process.env.AURORA_CRIADOR || '').replace(/\D/g, '')
}
// A mulher do criador (o criador escolhe com #auroramulher NUMERO): a
// Aurora trata ela com respeito e carinho. Não ganha o acesso do criador.
export function auroraEsposa(value) {
  if (value !== undefined) setCfg('aurora_esposa', String(value || '').replace(/\D/g, ''))
  // Fixo a pedido do criador; #auroramulher troca (0 tira).
  const v = getCfg('aurora_esposa', null)
  return String(v === null ? '5568984111797' : v || '').replace(/\D/g, '')
}
// A voz da Aurora escolhida pelo criador no zap (#auroravoz): ID da voz (na
// ElevenLabs ou na Fish Audio) e velocidade. Vazio = o padrão do bot.
export function auroraVoz(value) {
  if (value !== undefined) setCfg('aurora_voz', String(value || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 40))
  return String(getCfg('aurora_voz', '') || '')
}
// O jeito de falar nos áudios (#auroravoz estilo …): tom, emoção, ritmo.
export function auroraEstilo(value) {
  if (value !== undefined) setCfg('aurora_estilo', String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 400))
  return String(getCfg('aurora_estilo', '') || '')
}
export function auroraVelocidade(value) {
  if (value !== undefined) setCfg('aurora_velocidade', Number(value) || 0)
  return Number(getCfg('aurora_velocidade', 0)) || 0
}
export function auroraNoGrupo(gp, value) {
  const k = 'aurora:grupo:' + txt(gp)
  if (value !== undefined) setKv(k, value ? 1 : 0)
  const v = getKv(k, null)
  return v === null ? null : Number(v) === 1
}
