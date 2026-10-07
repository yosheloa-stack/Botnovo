import { display } from './brincadeiras.js'
import { downloadFile, cleanup } from './midia.js'

const slots = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

function identityData(info = {}) {
return { jid: info.jid || '', pnJid: info.pnJid || '', lidJid: info.lidJid || '', number: info.number || '' }
}

function keys(info = {}) {
return new Set([info.jid, info.pnJid, info.lidJid, info.number].filter(Boolean).map(String))
}

function same(a = {}, b = {}) {
const ka = keys(a)
return [b.jid, b.pnJid, b.lidJid, b.number].filter(Boolean).some((x) => ka.has(String(x)))
}

function resolved(system, saved = {}) {
return system.resolveIdentity(saved.jid || saved.pnJid || saved.lidJid || saved.number)
}

function mentionJid(info = {}) {
return info.pnJid || info.jid || info.lidJid || ''
}

function boardText(game) {
return game.board.map((v, i) => v || slots[i]).reduce((rows, v, i) => {
const row = Math.floor(i / 3)
rows[row] ??= ''
rows[row] += v
return rows
}, []).join('\n')
}

function winner(game) {
for (const [a,b,c] of wins) {
if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) return game.board[a]
}
if (game.board.every(Boolean)) return 'draw'
return ''
}

function canvasValue(value, index) {
if (value === '❌' || value === 'X') return 'X'
if (value === '⭕' || value === 'O') return 'O'
return String(index + 1)
}

function canvasUrl(system, game) {
const base = String(system.config?.tokitoApi?.url || 'https://tokito-apis.com.br').replace(/\/$/, '')
const params = new URLSearchParams()
game.board.forEach((value, index) => params.set(`c${index + 1}`, canvasValue(value, index)))
params.set('t', String(Date.now()))

const token = String(system.config?.tokitoApi?.token || '').trim()
if (token && !/^COLOQUE_/i.test(token)) params.set('apikey', token)

return `${base}/canvas/jogodavelha?${params.toString()}`
}

function runningCaption(system, game, extra = '') {
const x = resolved(system, game.x)
const o = resolved(system, game.o)
const next = game.turn === 'X' ? x : o

if (extra) {
return `⏤͟͟͞͞𝐉𝐨𝐠𝐨 𝐝𝐚 𝐕𝐞𝐥𝐡𝐚! 𖤐⃝🎮
•
> ❌ *ᴊᴏɢᴀᴅᴏʀ 𝟷:* ${display(x)}
> ⭕ *ᴊᴏɢᴀᴅᴏʀ 𝟸:* ${display(o)}
>
${extra}
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
}

return `⏤͟͟͞͞𝐉𝐨𝐠𝐨 𝐝𝐚 𝐕𝐞𝐥𝐡𝐚! 𖤐⃝🎮
•
> ❌ *ᴊᴏɢᴀᴅᴏʀ 𝟷:* ${display(x)}
> ⭕ *ᴊᴏɢᴀᴅᴏʀ 𝟸:* ${display(o)}
>
> *[🎯]* • *ᴠᴇᴢ ᴅᴇ:* ${display(next)}
> *[🎮]* • Envie um número de *1 a 9*.
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`
}

async function sendBoardCard(system, game, extra = '') {
const x = resolved(system, game.x)
const o = resolved(system, game.o)
const caption = runningCaption(system, game, extra)
const mentions = [mentionJid(x), mentionJid(o)].filter(Boolean)
let file

try {
file = await downloadFile(canvasUrl(system, game), system.config, 'png')
if (!String(file?.mimetype || '').startsWith('image/')) throw new Error('O Canvas não retornou uma imagem.')
await system.send({
type: 'image',
media: file.path,
mimetype: file.mimetype || 'image/png',
caption
}, system.from, { mentions })
return true
} catch (error) {
console.log('[ JOGO DA VELHA CANVAS ]', error?.message || error)
const fallback = `${caption}\n\n${boardText(game).split('\n').map((row) => `> ${row}`).join('\n')}`
await system.reply(fallback, { mentions })
return false
} finally {
await cleanup(file)
}
}

export async function startTicTacToe(system, target) {
system.db.games ??= { tictactoe: {} }
system.db.games.tictactoe ??= {}
const current = system.db.games.tictactoe[system.from]
if (current) {
const x = resolved(system, current.x)
const o = resolved(system, current.o)
return system.reply(`⏤͟͟͞͞𝐉𝐨𝐠𝐨 𝐞𝐦 𝐚𝐧𝐝𝐚𝐦𝐞𝐧𝐭𝐨! 𖤐⃝🎮\n•\n> ${display(x)} ❌ *VS* ⭕ ${display(o)}\n>\n> Aguarde o fim dessa partida para iniciar outra.\n•\n> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`, { mentions: [mentionJid(x), mentionJid(o)] })
}
if (same(system.senderInfo, target)) return system.reply('Você não pode desafiar você mesmo(a).')

const game = {
status: 'pending',
x: identityData(system.senderInfo),
o: identityData(target),
turn: 'X',
board: Array(9).fill(null),
createdAt: Date.now()
}
system.db.games.tictactoe[system.from] = game
await system.save()
const x = resolved(system, game.x)
const o = resolved(system, game.o)
return system.reply(`⏤͟͟͞͞𝐃𝐞𝐬𝐚𝐟𝐢𝐨 𝐝𝐞 𝐉𝐨𝐠𝐨 𝐝𝐚 𝐕𝐞𝐥𝐡𝐚! 𖤐⃝🎮
•
> ${display(x)} desafiou ${display(o)} para uma partida de *Jogo da Velha*. 👀
>
> *[❌]* • *ᴊᴏɢᴀᴅᴏʀ 𝟷:* ${display(x)}
> *[⭕]* • *ᴊᴏɢᴀᴅᴏʀ 𝟸:* ${display(o)}
> *[🎯]* • *sᴛᴀᴛᴜs:* Aguardando resposta...
•
> ${display(o)}, aceita o desafio?
>
> *[✅]* • Responda: *sim* ou *s*
> *[❌]* • Responda: *não*, *nao* ou *n*
•
> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`, { mentions: [mentionJid(x), mentionJid(o)] })
}

export async function resetTicTacToe(system) {
system.db.games ??= { tictactoe: {} }
system.db.games.tictactoe ??= {}
const game = system.db.games.tictactoe[system.from]
if (!game) return system.reply('⚠️ *ɴᴇɴʜᴜᴍᴀ ᴘᴀʀᴛɪᴅᴀ ᴇᴍ ᴀɴᴅᴀᴍᴇɴᴛᴏ!*\n\n📭 Não existe jogo da velha ativo neste grupo')
if (!system.isAdmin && !system.isOwner && !same(system.senderInfo, game.x)) {
return system.reply('🚫 *ᴀᴄ̧ᴀ̃ᴏ ɴᴀ̃ᴏ ᴘᴇʀᴍɪᴛɪᴅᴀ!*\n\n👤 Apenas quem iniciou a partida pode resetar\n🛡️ Ou um administrador do grupo')
}
delete system.db.games.tictactoe[system.from]
await system.save()
return system.reply('⏤͟͟͞͞𝐉𝐨𝐠𝐨 𝐫𝐞𝐬𝐞𝐭𝐚𝐝𝐨! 𖤐⃝♻️\n•\n> A partida foi encerrada com sucesso.\n> Um novo jogo já pode ser iniciado 🎮\n•\n> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃')
}

export async function handleTicTacToe(system) {
if (!system.isGroup) return false
const game = system.db.games?.tictactoe?.[system.from]
if (!game) return false
const text = String(system.text || '').toLowerCase().trim()
const x = resolved(system, game.x)
const o = resolved(system, game.o)

if (game.status === 'pending') {
if (!same(system.senderInfo, game.o)) return false
if (['s','sim','ok'].includes(text)) {
game.status = 'active'
game.acceptedAt = Date.now()
await system.save()
await sendBoardCard(system, game, `> *[✅]* • *sᴛᴀᴛᴜs:* Partida iniciada!\n> *[🎯]* • *ᴠᴇᴢ ᴅᴇ:* ${display(x)}\n> *[🎮]* • Envie um número de *1 a 9*.`)
return true
}
if (['n','nao','não','no'].includes(text)) {
delete system.db.games.tictactoe[system.from]
await system.save()
await system.reply(`⏤͟͟͞͞𝐃𝐞𝐬𝐚𝐟𝐢𝐨 𝐫𝐞𝐜𝐮𝐬𝐚𝐝𝐨! 𖤐⃝❌\n•\n> ${display(o)} recusou o desafio de ${display(x)} 😭\n•\n> 𓂃 ࣪˖ ִֶָ𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔 ִֶָ˖ ࣪𓂃`, { mentions: [mentionJid(x), mentionJid(o)] })
return true
}
return false
}

if (!/^[1-9]$/.test(text)) return false
const expected = game.turn === 'X' ? game.x : game.o
if (!same(system.senderInfo, expected)) return true
const index = Number(text) - 1
if (game.board[index]) {
await system.reply('⚠️ Essa posição já foi escolhida. Use outro número de 1 a 9.')
return true
}
game.board[index] = game.turn === 'X' ? '❌' : '⭕'
const win = winner(game)
if (win === 'draw') {
delete system.db.games.tictactoe[system.from]
await system.save()
await sendBoardCard(system, game, `> *[🤝]* • *ʀᴇsᴜʟᴛᴀᴅᴏ:* Empate!\n> Ninguém levou essa KKKKK 😹`)
return true
}
if (win) {
const who = win === '❌' ? x : o
delete system.db.games.tictactoe[system.from]
await system.save()
await sendBoardCard(system, game, `> *[🏆]* • *ᴠᴇɴᴄᴇᴅᴏʀ:* ${display(who)}\n> Parabéns, você venceu o *Jogo da Velha*! 🎉`)
return true
}
game.turn = game.turn === 'X' ? 'O' : 'X'
await system.save()
await sendBoardCard(system, game)
return true
}
