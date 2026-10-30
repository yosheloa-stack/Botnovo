import { makeSystem, extractText, messageKind } from './contexto.js'
import { db, groupState, saveState, hasCmd, hasGcmd, isVipCmd, isBanGp, aluguelOn, aluguelOk, getLimiteFF, setLimiteFF, consultarCotaFF, consumirCotaFF, getIdiomaGrupo, setIdiomaGrupo } from '../funcoes/banco.js'
import { showCommand } from '../funcoes/terminal.js'
import messages from '../funcoes/global.js'
import { handleTicTacToe } from '../funcoes/velha.js'
import { handleDating } from '../funcoes/namoro.js'
import { sendReplyButtons } from '../funcoes/botoes.js'
import { isViewOnce } from '../funcoes/mensagem.js'
import { cacheIncomingX9, isLocalSentMessage, suppressX9Protocol } from '../funcoes/x9.js'
import { verifiedSendOptions } from '../funcoes/meta.js'
import { necessarios as currentNecessarios } from '../funcoes/necessarios.js'
import { handleSoli } from '../funcoes/soli.js'
import { marcaCliente, modoCliente } from '../funcoes/cliente.js'
import { handleAurora, anotarErro } from '../funcoes/aurora/index.js'
import { chamouAurora } from '../funcoes/aurora/ia.js'

const missingRentalLogs = new Map()
const msgIdioma = (system, pt, es, en) => {
  const lang = system?.isGroup ? getIdiomaGrupo(system.from) : (marcaCliente()?.idioma || 'pt')
  return lang === 'es' ? es : lang === 'en' ? en : pt
}

const linkRx = /(https?:\/\/|www\.|chat\.whatsapp\.com\/|wa\.me\/)/i

function hasNewsletterContext(value, depth = 0) {
if (!value || typeof value !== 'object' || depth > 6) return false
if (value.forwardedNewsletterMessageInfo || value.newsletterAdminInviteMessage || value.newsletterMessageInfo) return true
for (const v of Object.values(value)) if (hasNewsletterContext(v, depth + 1)) return true
return false
}

function levenshtein(a = '', b = '') {
a = String(a).toLowerCase()
b = String(b).toLowerCase()
const row = Array.from({ length: b.length + 1 }, (_, i) => i)
for (let i = 1; i <= a.length; i++) {
let prev = row[0]
row[0] = i
for (let j = 1; j <= b.length; j++) {
const old = row[j]
row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
prev = old
}
}
return row[b.length]
}

function nearestCommand(command, registry) {
const names = [...registry.commands.keys()]
let best = ''
let score = 0
for (const name of names) {
const max = Math.max(command.length, name.length) || 1
const current = Math.max(0, 1 - (levenshtein(command, name) / max))
if (current > score) {
score = current
best = name
}
}
return { name: best || 'Nenhum', percent: `${Math.round(score * 100)}%` }
}

async function revokeByAurora(system) {
const id = system.event?.key?.id || ''
if (id) suppressX9Protocol(system.from, id)
return system.revoke()
}

async function punish(system, label) {
if (system.isAdmin || system.isOwner) return false
if (system.isBotAdmin) {
try { await revokeByAurora(system) } catch {}
}
if (Number(system.group?.autoBan) === 1 && system.isBotAdmin) {
try { await system.client.group.removeParticipants(system.from, [system.sender]); return true } catch {}
}
try { await system.reply(messages.antiMedia(label)) } catch {}
return true
}

async function applyGroupProtection(system) {
const g = groupState(system.from)
const viewOnce = isViewOnce(system.msg)
const mediaKinds = ['image', 'video', 'audio']

// AntiVisu e X9ViewOnce valem para qualquer participante, inclusive ADM/dono.
// Isso permite testar a proteção com uma conta administradora e mantém a regra do grupo consistente.
if (Number(g.antiVisu) === 1 && viewOnce && mediaKinds.includes(system.kind)) {
let deleted = false
if (system.isBotAdmin) {
try {
await revokeByAurora(system)
deleted = true
} catch {}
}
if (!deleted) {
try { await system.reply('❌ O *antivisu* detectou a visualização única, mas o Aurora precisa ser administrador para apagar a mídia.') } catch {}
}
return true
}

if (Number(g.x9ViewOnce) === 1 && !viewOnce && mediaKinds.includes(system.kind)) {
let deleted = false
if (system.isBotAdmin) {
try {
await revokeByAurora(system)
deleted = true
} catch {}
}
try {
const offenderJid = system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender
const offender = system.senderNumber ? `@${system.senderNumber}` : '@usuario'
const result = deleted
? 'A mídia normal foi apagada.'
: 'O Aurora detectou a mídia normal, mas precisa ser administrador para apagá-la.'
await system.reply(`⏤͟͟͞͞𝐒𝐨́ 𝐕𝐢𝐞𝐰 𝐎𝐧𝐜𝐞! 𖤐⃝👁️
•
> ${offender}, neste grupo foto, vídeo e áudio só podem ser enviados em *visualização única*.
> ${result}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`, { mentions: offenderJid ? [offenderJid] : [] })
} catch {}
return true
}

// As demais proteções continuam liberando ADM/dono, como já era na base.
if (system.isOwner || system.isAdmin) return false

if (Number(g.antiFake) === 1 && system.senderNumber && !system.senderNumber.startsWith('55')) {
if (system.isBotAdmin) {
try { await system.client.group.removeParticipants(system.from, [system.sender]) } catch {}
} else {
try { await system.reply(messages.antiFake()) } catch {}
}
return true
}

if (Number(g.antiLink) === 1 && linkRx.test(system.text || '')) {
if (system.isBotAdmin) try { await revokeByAurora(system) } catch {}
if (Number(g.autoBan) === 1 && system.isBotAdmin) {
try { await system.client.group.removeParticipants(system.from, [system.sender]) } catch {}
} else {
try { await system.reply(messages.antiLink()) } catch {}
}
return true
}

const map = {
audio: ['antiAudio', 'Áudio'],
video: ['antiVideo', 'Vídeo'],
image: ['antiFoto', 'Foto'],
sticker: ['antiSticker', 'Sticker'],
document: ['antiDocumento', 'Documento'],
status: ['antiStatus', 'Status']
}
const rule = map[system.kind]
if (rule && Number(g[rule[0]]) === 1) return punish(system, rule[1])
if (Number(g.antiCanal) === 1 && hasNewsletterContext(system.msg)) return punish(system, 'Canal')
const muted = db().muted?.[system.from] ?? []
const senderMutedKeys = [system.senderKey, system.senderNumber, system.senderInfo?.pnJid, system.senderInfo?.lidJid, system.senderInfo?.jid].filter(Boolean)
if (senderMutedKeys.some((key) => muted.includes(key))) return true
return false
}

export function createHandler({ client, config, registry }) {
return async (event) => {
// Sempre pega o objeto global ATUAL. Não usa snapshot antigo do startup.
const flags = currentNecessarios()
let system
try {
const eventId = event?.key?.id || ''
// A Zapo devolve mensagens do próprio número via multi-device com fromMe=true.
// Ignoramos apenas o que foi enviado localmente pelo Aurora (rastreado em message_send).
if (event?.key?.fromMe && isLocalSentMessage(eventId)) return
const remote = [event?.key?.remoteJid, event?.key?.remoteJidAlt].find(jid => String(jid || '').endsWith('@g.us')) || event?.key?.remoteJid || event?.key?.remoteJidAlt || ''
if (!remote) return

const isGroup = remote.endsWith('@g.us')
if (Number(db().settings?.antiPv ?? 0) === 1 && !isGroup) return

const startedContext = Date.now()
system = await makeSystem({ client, event, config, registry, necessarios: flags })
if (system.command) console.log('[ AURORA CONTEXTO ]', system.command, '| duração:', Date.now() - startedContext, 'ms', '| remetente:', system.senderKey || '(ausente)')
if (!system.senderKey) return
if (flags?.botoff === true && !system.isOwner) return
if (system.isGroup && isBanGp(system.from) && !system.isOwner) return
if (system.isGroup && aluguelOn() && !aluguelOk(system.from) && !system.isOwner) {
  // Conversa normal num grupo não registrado não vira aviso (enchia o log a
  // cada minuto e parecia erro). Só comando, e com quem mandou, para dar
  // pra saber se foi a dona (aí é número cadastrado errado) ou outra pessoa.
  const now = Date.now()
  const last = missingRentalLogs.get(system.from) || 0
  // Chamar a Aurora num grupo não registrado também avisa (senão ela só
  // "ignora" quem não é dono e ninguém sabe por quê).
  const chamouIa = !system.command && chamouAurora(extractText(event?.message))
  if ((system.command || chamouIa) && now - last > 60_000) {
    missingRentalLogs.set(system.from, now)
    console.warn('[ AURORA ALUGUEL ] Comando ignorado: grupo não registrado:', system.from,
      '| comando:', system.command || 'Aurora', '| de:', system.senderNumber || system.senderKey || '(ausente)',
      modoCliente ? '| a dona registra o grupo mandando #rgaluguel nele' : '| verifique persistência de sistema/dados/dados.db e retorno da ativação pelo site')
  }
  return
}

// X9 é acessório: downloads de mídia/arquivos não podem segurar comandos.
if (system.isGroup) {
  void Promise.resolve().then(() => cacheIncomingX9(system)).catch(err =>
    console.warn('[ AURORA X9 ] Falha ao armazenar mensagem:', err?.message || err))
}
if (system.isGroup && await applyGroupProtection(system)) return

const text = extractText(event?.message)
const blockedKeys = [system.senderNumber, system.senderInfo?.pnJid, system.senderInfo?.lidJid, system.senderInfo?.jid].filter(Boolean)
if (blockedKeys.some((key) => db().blocked.includes(key)) && !system.isOwner) return

// Fluxos interativos só recebem mensagens sem comando. Nunca seguram /like, /menu etc.
if (!system.command) {
  if (await handleSoli(system)) return
  if (await handleTicTacToe(system)) return
  if (await handleDating(system)) return
}

// /like2 é exclusivo do titular do aluguel; autorização sempre no site.
// Até a tarifa e a cobrança serem configuradas, não envia likes nem cobra.
if (system.command === 'like2' && String(text || '').trim().startsWith('/like2')) {
  if (!system.isGroup) return system.reply('⚠️ Use /like2 dentro do grupo alugado.');
  if (!system.senderNumber || !String(system.senderNumber).match(/^[0-9]{12,15}$/)) return system.reply('⚠️ Não consegui confirmar seu número do WhatsApp.');
  try {
    const base = String(config?.autoSystem?.url || '').replace(/\/$/, '');
    const token = String(process.env.AURORA_RENTAL_TOKEN || config?.autoSystem?.rentalToken || '');
    if (!base || !token) throw new Error('integração não configurada');
    const response = await fetch(base + '/api/bot/alugueis/like2/permissao', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Aurora-Token': token },
      body: JSON.stringify({ grupo_jid: system.from, dono_numero: system.senderNumber })
    });
    const data = await response.json();
    if (response.status === 403) return system.reply('🔒 Somente o dono cadastrado do aluguel pode utilizar /like2.');
    if (!response.ok) throw new Error(data?.erro || 'consulta indisponível');
    if (!data.ativo) return system.reply('⚠️ O comando /like2 não está ativado no seu aluguel. Ative essa função no painel onde você alugou o bot.');
    return system.reply('⏳ O /like2 está habilitado, mas os envios ainda não foram liberados: a tarifa por envio e a cobrança segura na carteira estão em configuração. Nenhum saldo foi descontado.');
  } catch (error) {
    console.error('[ AURORA LIKE2 ] Falha na autorização:', error?.message || error);
    return system.reply('⚠️ Não foi possível verificar a autorização do /like2 agora. Nenhum saldo foi descontado.');
  }
}
// A Aurora com IA: conversa que não é comando (marcaram o bot, citaram ele,
// falaram "aurora" ou mandaram no privado). Ver sistema/funcoes/aurora.
if (!system.command && handleAurora(system)) return
// Aceita somente o prefixo ativo deste bot, sem aliases globais.
// Antes o parser reconhecia /menu, mas este filtro descartava a mensagem silenciosamente.
const prefixoConfigurado = String(config.prefix || '!')
if (!text || !text.startsWith(prefixoConfigurado)) return
console.log('[ AURORA CMD ] recebido:', system.command || '(vazio)', '| grupo:', system.isGroup,
  '| origem:', system.from, '| remetente:', system.senderNumber || system.senderKey || '(desconhecido)')
// Idioma exclusivo do grupo; somente administradores podem alterá-lo.
if (system.isGroup && ['idioma', 'language', 'lenguaje'].includes(system.command)) {
  const current = getIdiomaGrupo(system.from)
  const chosen = String(system.args[0] || '').toLowerCase()
  const codes = { pt:'pt', portugues:'pt', 'português':'pt', br:'pt', es:'es', espanol:'es', 'español':'es', espanhol:'es', en:'en', english:'en', ingles:'en', 'inglês':'en' }
  if (!chosen) {
    await system.reply({
      pt: '🌐 *Idioma do grupo*\\nEscolha: *' + system.prefix + 'idioma pt*, *' + system.prefix + 'idioma es* ou *' + system.prefix + 'idioma en*.\\nAtual: Português.',
      es: '🌐 *Idioma del grupo*\\nElige: *' + system.prefix + 'idioma pt*, *' + system.prefix + 'idioma es* o *' + system.prefix + 'idioma en*.\\nActual: Español.',
      en: '🌐 *Group language*\\nChoose: *' + system.prefix + 'idioma pt*, *' + system.prefix + 'idioma es* or *' + system.prefix + 'idioma en*.\\nCurrent: English.'
    }[current].replace(/\\n/g, '\n'))
    return
  }
  if (!system.isAdmin && !system.isOwner) {
    await system.reply({ pt:'Somente administradores podem mudar o idioma.', es:'Solo los administradores pueden cambiar el idioma.', en:'Only admins can change the language.' }[current])
    return
  }
  if (!codes[chosen]) {
    await system.reply({ pt:'Idioma inválido. Use pt, es ou en.', es:'Idioma no válido. Usa pt, es o en.', en:'Invalid language. Use pt, es or en.' }[current])
    return
  }
  const next = setIdiomaGrupo(system.from, codes[chosen])
  await system.reply({ pt:'✅ Idioma deste grupo definido como Português.', es:'✅ Idioma de este grupo configurado en Español.', en:'✅ This group language is now English.' }[next])
  return
}
if (!system.command) {
const started = performance.now()
const elapsed = `${(performance.now() - started).toFixed(2)} ms`
const text = messages.commandNotFound({
prefix: system.prefix,
command: '',
nome: 'Nenhum',
porcentagem: '0%',
tempo: elapsed
})
const sent = await sendReplyButtons(system, {
text,
footer: msgIdioma(system, 'Aurora System • Comando inválido', 'Aurora System • Comando inválido', 'Aurora System • Invalid command'),
buttons: [
{ id: `${system.prefix}menu`, text: '⌂ ᴍᴇɴᴜ' }
]
})
if (!sent) return system.reply(text)
return
}

// Configuração local do Free Fire: não altera nenhum outro grupo.
if (system.command === 'configurarff' || system.command === 'configff') {
  if (!system.isGroup) return system.reply(msgIdioma(system, '⚠️ Use este comando dentro do grupo.', '⚠️ Usa este comando dentro del grupo.', '⚠️ Use this command in a group.'))
  if (!system.isOwner && !system.isAdmin) return system.reply(msgIdioma(system, '🔒 Somente o dono ou administrador deste grupo pode configurar o Free Fire.', '🔒 Solo el dueño o un administrador puede configurar Free Fire.', '🔒 Only the group owner or an admin can configure Free Fire.'))
  const argumento = String(text).trim().split(/\s+/).slice(1)[0]
  const atual = getLimiteFF(system.from)
  if (!argumento) return system.reply('🎮 *Configurações Free Fire*\n\nLimite atual: *' + (atual ? atual + ' IDs por usuário/dia' : 'sem limite') + '*\n\nPara alterar: *' + system.prefix + 'configurarff 3*\nSem limite: *' + system.prefix + 'configurarff 0*\n\nA configuração vale somente para este grupo.')
  const n = Number(argumento)
  if (!Number.isInteger(n) || n < 0 || n > 100) return system.reply(msgIdioma(system, 'Informe um limite de 1 a 100 IDs por dia, ou 0 para sem limite.', 'Indica un límite de 1 a 100 IDs por día, o 0 para sin límite.', 'Enter a limit from 1 to 100 IDs per day, or 0 for no limit.'))
  setLimiteFF(system.from, n)
  return system.reply(n ? '✅ Limite de Free Fire configurado: *' + n + ' IDs por usuário/dia*.\nSomente neste grupo.' : '✅ Free Fire *sem limite* de IDs neste grupo.')
}

const plugin = registry.commands.get(system.command)
if (!plugin) {
const started = performance.now()
const near = nearestCommand(system.command, registry)
const elapsed = `${(performance.now() - started).toFixed(2)} ms`
const text = messages.commandNotFound({
prefix: system.prefix,
command: system.command,
nome: near.name === 'Nenhum' ? near.name : `${system.prefix}${near.name}`,
porcentagem: near.percent,
tempo: elapsed
})
const buttons = [
{ id: `${system.prefix}menu`, text: '⌂ ᴍᴇɴᴜ' }
]
const sent = await sendReplyButtons(system, {
text,
footer: msgIdioma(system, 'Aurora System • Comando inválido', 'Aurora System • Comando inválido', 'Aurora System • Invalid command'),
buttons
})
if (!sent) return system.reply(text)
return
}

if (hasGcmd(system.command) && !system.isOwner) return system.reply(msgIdioma(system, `• 🚫 O comando *${system.prefix}${system.command}* está bloqueado globalmente.`, `• 🚫 El comando *${system.prefix}${system.command}* está bloqueado globalmente.`, `• 🚫 Command *${system.prefix}${system.command}* is blocked globally.`))
if (system.isGroup && hasCmd(system.from, system.command) && !system.isOwner) return system.reply(msgIdioma(system, `• 🚫 O comando *${system.prefix}${system.command}* está bloqueado neste grupo.`, `• 🚫 El comando *${system.prefix}${system.command}* está bloqueado en este grupo.`, `• 🚫 Command *${system.prefix}${system.command}* is blocked in this group.`))
if (system.isGroup && Number(system.group?.soAdm) === 1 && !system.isAdmin && !system.isOwner) return system.reply(messages.onlyAdmMode())
if (plugin.ownerOnly && !system.isOwner) return system.reply(messages.onlyOwner())
if (plugin.groupOnly && !system.isGroup) return system.reply(messages.onlyGroup())
if (plugin.adminOnly && !system.isAdmin && !system.isOwner) return system.reply(messages.onlyAdmin())
if (plugin.botAdminOnly && !system.isBotAdmin) return system.reply(messages.onlyBotAdmin())
const ffInfo = system.isGroup && /^(info|ffinfo|infoplayer)$/i.test(system.command)
const ffDislike = system.isGroup && /^(dislike|deslike|ffdislike)$/i.test(system.command)
const ffAutolike = /^(autolike|autolikes|ffautolike)$/i.test(system.command)
const vipRequired = ffAutolike || (system.command !== 'like' && !ffInfo && !ffDislike && (plugin.vipOnly === true || plugin.premiumOnly === true || isVipCmd(system.command)))
if (vipRequired && !system.isVip && !system.isOwner) return system.reply(messages.onlyVip())

if (ffDislike) {
  const quota = consultarCotaFF(system.from, system.senderKey)
  if (!quota.ok) return system.reply('🎮 Seu limite diário de *' + quota.limite + ' IDs* acabou neste grupo. Volte amanhã.')
}

showCommand(system)
if (system.profile) {
system.profile.commands = Number(system.profile.commands || 0) + 1
system.profile.lastSeen = new Date().toISOString()
system.profile.name = system.pushName || system.profile.name || 'Usuário'
}
await plugin.run(system)
if (ffDislike) consumirCotaFF(system.from, system.senderKey)
await saveState()
} catch (err) {
console.error('[ AURORA ] Erro no handler:', err)
anotarErro(system, err)
try {
if (system) {
const text = messages.commandError()
const sent = await sendReplyButtons(system, {
text,
footer: msgIdioma(system, 'Aurora System • Erro', 'Aurora System • Error', 'Aurora System • Error'),
buttons: [
{ id: `${system.prefix}menu`, text: '⌂ ᴍᴇɴᴜ' }
]
})
if (!sent) await system.reply(text)
} else if (event?.key?.remoteJid) {
await client.message.send(
event.key.remoteJid,
{ type: 'text', text: messages.commandError() },
verifiedSendOptions(
currentNecessarios()?.verificado === true,
event.key.remoteJid,
event?.pushName || event?.notify || 'Usuário',
{ quote: event }
)
)
}
} catch {}
}
}
}

export { messageKind }
