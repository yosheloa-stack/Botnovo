// node test/marca.test.js
import test from 'node:test'
import assert from 'node:assert/strict'
import { trocarMarcaTexto, trocarMarca, noEstilo, erroParaCliente } from '../sistema/funcoes/marca.js'

const marca = { nome: 'Kira Bot', dono: '5511999998888', idioma: 'pt' }
const casa = /aurora|yoshi|ggx|autolikesystem|auto ?system/i
// Reduz letras enfeitadas para conferir que nada da casa sobrou.
const simples = (t) => Array.from(t).map((c) => c.normalize('NFKC')).join('')
  .replace(/[ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀᴛᴜᴠᴡʏᴢ]/g, (c) => 'abcdefghijklmnopqrtuvwyz'['ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀᴛᴜᴠᴡʏᴢ'.indexOf(c)])

test('rodapé do menu: sai Aurora e YoshiGGX, entra o nome e o dono do cliente', () => {
  const menu = '┣━〔 • 𝑨𝑼𝑹𝑶𝑹𝑨 • 💚 〕\n┃╎୨୧ ✰ KIRA BOT\n┃╎୨୧ ᴅᴇᴠ: YoshiGGX\n┃\n┗╾'
  const out = trocarMarcaTexto(menu, marca)
  assert.equal(out, '┣━〔 • 𝑲𝑰𝑹𝑨 𝑩𝑶𝑻 • 💚 〕\n┃╎୨୧ ✰ KIRA BOT\n┃╎୨୧ ᴅᴏɴᴏ: @5511999998888\n┃\n┗╾')
  assert.doesNotMatch(simples(out), casa)
})

test('sem dono cadastrado a linha do criador some inteira', () => {
  const out = trocarMarcaTexto('┃╎୨୧ ✰ BOT\n┃╎୨୧ ᴅᴇᴠ: YoshiGGX\n┃', { nome: 'Zé', dono: '' })
  assert.equal(out, '┃╎୨୧ ✰ BOT\n┃')
})

test('cada enfeite de letra vira o nome no mesmo enfeite', () => {
  assert.equal(trocarMarcaTexto('*𝙰𝚞𝚛𝚘𝚛𝚊 𝚂𝚢𝚜𝚝𝚎𝚖 𝚘𝚔*', marca), '*𝙺𝚒𝚛𝚊 𝙱𝚘𝚝 𝚘𝚔*')
  assert.equal(trocarMarcaTexto('⏤𝐀𝐮𝐫𝐨𝐫𝐚 𝐨𝐧𝐥𝐢𝐧𝐞!', marca), '⏤𝐊𝐢𝐫𝐚 𝐁𝐨𝐭 𝐨𝐧𝐥𝐢𝐧𝐞!')
  assert.equal(trocarMarcaTexto('𐀔 ᴀᴜʀᴏʀᴀ sʏsᴛᴇᴍ 𐀔', marca), '𐀔 ᴋɪʀᴀ ʙᴏᴛ 𐀔')
  assert.equal(trocarMarcaTexto('AURORA SYSTEM • Dev: YoshiGGX', marca), 'KIRA BOT • Dono: @5511999998888')
  assert.equal(trocarMarcaTexto('O Aurora tentou', marca), 'O Kira Bot tentou')
  assert.equal(noEstilo('hoje', '𝐴𝑢𝑟𝑜𝑟𝑎'), 'ℎ𝑜𝑗𝑒')
})

test('site e "Auto System" não aparecem', () => {
  const out = trocarMarcaTexto('Limite do ID. Veja https://autolikesystem.com.br/planos • painel do Auto Like System', marca)
  assert.doesNotMatch(out, /autolikesystem|auto like system/i)
  assert.match(out, /Kira Bot/)
})

test('rodapé com crédito e idioma espanhol', () => {
  assert.equal(trocarMarcaTexto('ᴅᴇᴠ: YoshiGGX', { ...marca, idioma: 'es' }), 'ᴅᴜᴇɴ̃ᴏ: @5511999998888'.normalize('NFC'))
})

test('texto sem nada da casa fica igual (mesmo objeto)', () => {
  const t = '- 💚 Likes enviados: 100'
  assert.equal(trocarMarcaTexto(t, marca), t)
})

test('mensagem interativa: troca rodapé, título da lista e descrição sem quebrar o JSON nem os ids', () => {
  const lista = { title: '「 💚 」𝐀𝐔𝐑𝐎𝐑𝐀 𝐋𝐈𝐒𝐓', sections: [{ rows: [{ id: '#perfil', description: 'Veja seu perfil no Aurora' }] }] }
  const msg = { interactiveMessage: { footer: { text: '𓂃 AURORA SYSTEM • Dev: YoshiGGX 𓂃' }, nativeFlowMessage: { buttons: [{ name: 'single_select', buttonParamsJson: JSON.stringify(lista) }] } } }
  const out = trocarMarca(msg, { nome: 'Lua "x"', dono: '1' })
  const json = JSON.parse(out.interactiveMessage.nativeFlowMessage.buttons[0].buttonParamsJson)
  assert.equal(json.sections[0].rows[0].id, '#perfil')
  assert.equal(json.sections[0].rows[0].description, 'Veja seu perfil no Lua "x"')
  assert.match(json.title, /𝐋𝐔𝐀/)
  assert.doesNotMatch(out.interactiveMessage.footer.text, /aurora|yoshi/i)
  assert.match(msg.interactiveMessage.footer.text, /AURORA/, 'não altera o objeto original')
})

test('mídia (bytes) e jids passam intactos', () => {
  const bytes = new Uint8Array([1, 2, 3])
  const out = trocarMarca({ type: 'image', media: bytes, caption: 'Aurora', mentions: ['aurora@s.whatsapp.net'] }, marca)
  assert.equal(out.media, bytes)
  assert.deepEqual(out.mentions, ['aurora@s.whatsapp.net'])
  assert.equal(out.caption, 'Kira Bot')
})

test('erro da API com site ou HTML vira a mensagem padrão no grupo alugado', () => {
  assert.equal(erroParaCliente('Compre em https://autolikesystem.com.br', 'padrão'), 'padrão')
  assert.equal(erroParaCliente('<!doctype html><title>Square Cloud</title>', 'padrão'), 'padrão')
  assert.equal(erroParaCliente('', 'padrão'), 'padrão')
  assert.equal(erroParaCliente('ID não encontrado.', 'padrão'), 'ID não encontrado.')
})

test('estilo do menu troca os ícones verdes pelos da cor escolhida', async () => {
  const { aplicarEstilo, trocarMarcaTexto } = await import('../sistema/funcoes/marca.js')
  assert.equal(aplicarEstilo('💚 Menu 🟢', 'rosa'), '🩷 Menu 🌸')
  assert.equal(aplicarEstilo('💚 Menu 🟢', 'vermelho'), '❤️ Menu 🔴')
  assert.equal(aplicarEstilo('💚 Menu 🟢', 'preto'), '🖤 Menu ⚫')
  assert.equal(aplicarEstilo('💚 Menu', ''), '💚 Menu')
  assert.equal(trocarMarcaTexto('💚 Aurora System', { nome: 'Bot da Ana', estilo: 'preto' }), '🖤 Bot da Ana')
})

test('estilo do menu troca também o ícone de cada linha e de cada título', async () => {
  const { aplicarEstilo } = await import('../sistema/funcoes/marca.js')
  const menu = '┣━〔 • 𝑴𝑬𝑵𝑼𝑺 • ✨ 〕\n┃╎୨୧ 💎 #menuff\n┃╎୨୧ 🛡️ #menuadm\n┃╎୨୧ 👑 #menudono\n┃╎୨୧ ᴅᴇᴠ: X\nSim ✅'
  assert.equal(aplicarEstilo(menu, 'rosa'), '┣━〔 • 𝑴𝑬𝑵𝑼𝑺 • 🌸 〕\n┃╎♡ 🎀 #menuff\n┃╎♡ 💗 #menuadm\n┃╎♡ 🌷 #menudono\n┃╎♡ ᴅᴇᴠ: X\nSim ✅')
  assert.equal(aplicarEstilo(menu, 'preto'), '┣━〔 • 𝑴𝑬𝑵𝑼𝑺 • 🖤 〕\n┃╎† 🥀 #menuff\n┃╎† 🕷️ #menuadm\n┃╎† 🦇 #menudono\n┃╎† ᴅᴇᴠ: X\nSim ✅')
})

test('nome da dona no lugar do crédito do dono da casa', async () => {
  const { trocarMarcaTexto } = await import('../sistema/funcoes/marca.js')
  assert.equal(trocarMarcaTexto('ᴅᴇᴠ: YoshiGGX', { nome: 'Bot', dono: '5511988885555', donoNome: 'Ana' }), 'ᴅᴏɴᴏ: Ana')
  assert.equal(trocarMarcaTexto('dev: YoshiGGX', { nome: 'Bot', dono: '5511988885555' }), 'Dono: @5511988885555')
})
