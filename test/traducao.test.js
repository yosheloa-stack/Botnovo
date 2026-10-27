// node test/traducao.test.js
// O que o bot manda sai no idioma do grupo: menus, respostas dos comandos e
// erros da API. Roda numa pasta vazia (o bot abre sistema/dados/dados.db
// relativo à pasta atual).
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-traducao-')))
const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
const { traduzirTexto, traduzir } = await import(path.join(raiz, 'sistema/funcoes/traduzir.js'))
const { installMarcaAluguel } = await import(path.join(raiz, 'sistema/funcoes/marcaAluguel.js'))
const { textoComum } = await import(path.join(raiz, 'sistema/funcoes/fontes.js'))
const msgs = (await import(path.join(raiz, 'sistema/funcoes/global.js'))).default
const menus = (await import(path.join(raiz, 'sistema/menus/menus.js'))).default

test('português passa sem mudar nada', () => {
  const t = msgs.commandNotFound({ prefix: '#', command: 'x', nome: 'menu', porcentagem: '50%', tempo: '1 ms' })
  assert.equal(traduzirTexto(t, 'pt'), t)
  assert.equal(traduzirTexto(t, undefined), t)
})

test('título enfeitado volta na mesma fonte, traduzido', () => {
  const t = msgs.commandNotFound({ prefix: '#', command: 'x', nome: 'menu', porcentagem: '50%', tempo: '1 ms' })
  const es = traduzirTexto(t, 'es')
  const en = traduzirTexto(t, 'en')
  assert.ok(es.includes('¡𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐧𝐨 𝐯𝐚́𝐥𝐢𝐝𝐨!'), es)
  assert.ok(en.includes('𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐜𝐨𝐦𝐦𝐚𝐧𝐝!'), en)
  assert.ok(en.includes('𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍'), en)
  assert.ok(en.includes('*ᴄᴏᴍᴍᴀɴᴅ:* *#x*'), en)
  assert.ok(textoComum(en).includes('Use #menu to see the commands.'), en)
})

test('letra versalete (ᴀʙᴄ) e o "ǫ" do q também são lidos', () => {
  const en = traduzirTexto(msgs.marque(), 'en')
  assert.ok(en.includes('`𝚃𝙰𝙶 𝚃𝙷𝙴 𝚄𝚂𝙴𝚁`'), en)
  assert.ok(en.includes('ᴛᴀɢ ᴛʜᴇ ᴜsᴇʀ ᴏʀ ʀᴇᴘʟʏ'), en)
  assert.ok(!/[ᴀ-ᴢ]*ᴍᴀʀǫᴜᴇ/.test(en), en)
})

test('menu traduz rótulos e exemplos, nunca o nome do comando', () => {
  const pt = menus.adms('Aurora', 'Ana', 'Dono', true, '10:00', '#', 'Meu Grupo', '1.8')
  const en = traduzirTexto(pt, 'en')
  assert.ok(en.includes('#ban @user'), en)
  assert.ok(en.includes('#adv @user reason'), en)
  assert.ok(en.includes('#nomegp name'), en)
  assert.ok(en.includes('#promover @user'), en)
  assert.ok(en.includes('#rebaixar @user'), en)
  assert.ok(en.includes('ʀᴏʟᴇ: Owner'), en)
  assert.ok(en.includes('𝑮𝑹𝑶𝑼𝑷'), en)
  // Nome do grupo é da pessoa: fica como está.
  assert.ok(en.includes('ɢʀᴏᴜᴘ: Meu Grupo'), en)
  const es = traduzirTexto(pt, 'es')
  assert.ok(es.includes('#nomegp nombre'), es)
  assert.ok(es.includes('𝑷𝑹𝑶𝑻𝑬𝑪𝑪𝑰𝑶𝑵𝑬𝑺'), es)
})

test('respostas de comando e da API do site', () => {
  assert.equal(traduzirTexto(msgs.apiError(msgs.ffLikeError()), 'es'), '- ❌ No fue posible enviar los likes.')
  assert.equal(traduzirTexto('- ❌ esse ID não existe no jogo — confira antes de enviar', 'en'), "- ❌ that ID doesn't exist in the game — check it before sending")
  assert.equal(traduzirTexto(msgs.playUsage('/'), 'en'), '⏤͟͟͞͞𝐇𝐨𝐰 𝐭𝐨 𝐮𝐬𝐞 𝐏𝐥𝐚𝐲! 𖤐⃝🎧\n•\n> *[🎵]* • Use: */play song name*')
  const like = traduzirTexto(msgs.ffLike({ nick: 'Neo', likes_enviados: 100, likes_antes: 1, likes_depois: 101 }, '123'), 'en')
  assert.ok(like.includes('Player: Neo') && like.includes('Sent: 100') && like.includes('Now: 101'), like)
  assert.ok(!like.includes('𝙽𝙴𝙽𝙷𝚄𝙼') && !like.includes('Nothing was charged'), like)
  const zero = msgs.ffLike({ nick: 'Neo', likes_enviados: 0, likes_antes: 8063, likes_depois: 8063 }, '123', 'conta sem likes hoje')
  assert.ok(zero.includes('𝙽𝙴𝙽𝙷𝚄𝙼 𝙻𝙸𝙺𝙴 𝙴𝙽𝚃𝚁𝙾𝚄') && !zero.includes('𝙻𝙸𝙺𝙴𝚂 𝙴𝙽𝚅𝙸𝙰𝙳𝙾𝚂'), zero)
  assert.ok(zero.includes('Nada foi descontado') && zero.includes('Motivo: conta sem likes hoje'), zero)
  const zeroEn = traduzirTexto(msgs.ffLike({ likes_enviados: 0 }, '123'), 'en')
  assert.ok(zeroEn.includes("The likes didn't go in this time. Nothing was charged") && !zeroEn.includes('Reason:'), zeroEn)
})

test('link, menção e tag #nome# ficam intactos', () => {
  const t = '> Use o link https://chat.whatsapp.com/AbcDef para entrar. @5511999 #nome# #grupo'
  const en = traduzirTexto(t, 'en')
  assert.ok(en.includes('https://chat.whatsapp.com/AbcDef'), en)
  assert.ok(en.includes('@5511999 #nome# #grupo'), en)
})

test('listas e botões: traduz título e descrição, mantém o id do comando', () => {
  const lista = traduzir({ sections: [{ title: '『 🛡️ PROTEÇÕES 』', rows: [{ header: '🔗 PROTEÇÃO', title: 'AntiLink', description: 'Proteção contra links no grupo', id: '#antilink' }] }], buttonParamsJson: JSON.stringify({ display_text: '✅ ativar', id: '#antilink 1' }) }, 'en')
  assert.equal(lista.sections[0].title, '『 🛡️ PROTECTIONS 』')
  assert.equal(lista.sections[0].rows[0].header, '🔗 PROTECTION')
  assert.equal(lista.sections[0].rows[0].description, 'Protection against links in the group')
  assert.equal(lista.sections[0].rows[0].id, '#antilink')
  assert.deepEqual(JSON.parse(lista.buttonParamsJson), { display_text: '✅ turn on', id: '#antilink 1' })
})

test('envio ao grupo sai no idioma do grupo; grupo em português não muda', async () => {
  const enviados = []
  const client = { message: { send: async (jid, content, options) => { enviados.push({ jid, content, options }); return {} } } }
  installMarcaAluguel(client)
  const ES = '120363000000000011@g.us'
  const PT = '120363000000000012@g.us'
  banco.setIdiomaGrupo(ES, 'es')
  await client.message.send(ES, { text: msgs.groupClosed('') })
  await client.message.send(PT, { text: msgs.groupClosed('') })
  await client.message.send(ES, { type: 'reaction', text: '👍' })
  assert.ok(enviados[0].content.text.startsWith('⏤͟͟͞͞¡𝐆𝐫𝐮𝐩𝐨 𝐜𝐞𝐫𝐫𝐚𝐝𝐨!'), enviados[0].content.text)
  assert.ok(enviados[0].content.text.includes('Solo los administradores pueden enviar mensajes ahora.'))
  assert.equal(enviados[1].content.text, msgs.groupClosed(''))
  assert.equal(enviados[2].content.text, '👍')
})

test('não traduz palavra dentro de outra nem nome de comando', () => {
  assert.equal(traduzirTexto('#criador', 'en'), '#criador')
  assert.equal(traduzirTexto('/revelar', 'en'), '/revelar')
  assert.equal(traduzirTexto('ID_DO_GRUPO_X', 'en'), 'ID_DO_GRUPO_X')
  assert.equal(traduzirTexto('Donos', 'en'), 'Donos')
})
