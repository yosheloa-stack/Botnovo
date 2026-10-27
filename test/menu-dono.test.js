// node test/menu-dono.test.js
// Bot da cliente: subdono, nome do bot e foto do bot são do bot dela (pasta
// de dados própria), e o menu dono mostra os comandos novos.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-menu-dono-'))
process.chdir(pasta)
process.env.AURORA_CLIENTE = '1'
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')
process.env.AURORA_MARCA = JSON.stringify({ nome: 'Bot da Ana', dono: '5511999990000', idioma: 'pt' })

const { loadNecessarios, necessarios } = await import(path.join(raiz, 'sistema/funcoes/necessarios.js'))
const sub = await import(path.join(raiz, 'sistema/funcoes/subdonos.js'))
const cliente = await import(path.join(raiz, 'sistema/funcoes/cliente.js'))
const menus = (await import(path.join(raiz, 'sistema/menus/menus.js'))).default
const { traduzirTexto } = await import(path.join(raiz, 'sistema/funcoes/traduzir.js'))
const { fotoDePerfil } = await import(path.join(raiz, 'sistema/comandos/dono/fotobot.js'))
await loadNecessarios()

const config = { owner: { number: '5511999990000' } }

test('subdono: só a dona principal, sem repetir, até 5, e sai certinho', async () => {
  // Celular BR com e sem o 9 é a mesma pessoa.
  assert.equal(sub.ehDonoPrincipal(config, '551199990000'), true)
  assert.equal(sub.ehDonoPrincipal(config, '5511888887777'), false)
  assert.equal(await sub.addSubdono(config, '5511999990000'), 'dono')
  assert.equal(await sub.addSubdono(config, '5511988887777'), 'ok')
  assert.equal(await sub.addSubdono(config, '551188887777'), 'ja')
  for (const n of ['5491100000001', '5491100000002', '5491100000003', '5491100000004']) assert.equal(await sub.addSubdono(config, n), 'ok')
  assert.equal(await sub.addSubdono(config, '5491100000005'), 'cheio')
  assert.equal(sub.listaSubdonos().length, 5)
  // Subdono vira dono para o bot (vagas numero_dono2..6), mas não é a dona principal.
  assert.equal(necessarios().numero_dono2, '5511988887777')
  assert.equal(sub.ehDonoPrincipal(config, '5511988887777'), false)
  const salvo = JSON.parse(fs.readFileSync(path.join(process.env.AURORA_DATA_DIR, 'necessarios.json'), 'utf8'))
  assert.equal(salvo.numero_dono2, '5511988887777')
  assert.equal(await sub.delSubdono('551188887777'), true)
  assert.equal(await sub.delSubdono('551188887777'), false)
  assert.equal(sub.listaSubdonos().length, 4)
  assert.equal(await sub.addSubdono(config, '5491100000005'), 'ok')
})

test('#nomebot vale no bot dela até ela mudar o nome no site', () => {
  assert.equal(cliente.marcaCliente().nome, 'Bot da Ana')
  assert.equal(cliente.trocarNomeLocal('  Lua Bot  '), true)
  assert.equal(cliente.marcaCliente().nome, 'Lua Bot')
  const salvo = JSON.parse(fs.readFileSync(path.join(process.env.AURORA_DATA_DIR, 'marca-local.json'), 'utf8'))
  assert.deepEqual(salvo, { nome: 'Lua Bot', base: 'Bot da Ana' })
  // Idioma ou estilo mudou no site, nome igual: o nome dela continua.
  cliente.trocarMarcaCliente({ nome: 'Bot da Ana', dono: '5511999990000', idioma: 'es' })
  assert.equal(cliente.marcaCliente().nome, 'Lua Bot')
  // Nome novo no site: o do site ganha.
  cliente.trocarMarcaCliente({ nome: 'Ana Store', dono: '5511999990000', idioma: 'es' })
  assert.equal(cliente.marcaCliente().nome, 'Ana Store')
  assert.equal(cliente.trocarNomeLocal('   '), false)
})

test('#fotobot: qualquer foto vira JPEG quadrado', async () => {
  const arq = path.join(pasta, 'foto.png')
  await sharp({ create: { width: 900, height: 500, channels: 3, background: '#0a7' } }).png().toFile(arq)
  const out = await fotoDePerfil(arq)
  const meta = await sharp(out).metadata()
  assert.equal(meta.format, 'jpeg')
  assert.equal(meta.width, 640)
  assert.equal(meta.height, 640)
})

test('menu dono lista subdono, nome e foto do bot, e traduz', () => {
  const pt = menus.menudono('Bot', 'Ana', 'Dono', true, '10:00', '#', 'Grupo', '1.8')
  for (const c of ['#nomebot nome', '#fotobot (foto)', '#fotomenu (foto/vídeo)', '#addsubdono @usuario', '#delsubdono @usuario', '#subdonos']) assert.ok(pt.includes(c), c)
  const en = traduzirTexto(pt, 'en')
  assert.ok(en.includes('#nomebot name'), en)
  assert.ok(en.includes('#fotobot (photo)'), en)
  assert.ok(en.includes('#addsubdono @user'), en)
  assert.ok(en.includes('𝑺𝑼𝑩-𝑶𝑾𝑵𝑬𝑹𝑺'), en)
  const es = traduzirTexto(pt, 'es')
  assert.ok(es.includes('𝑺𝑼𝑩𝑫𝑼𝑬𝑵̃𝑶𝑺') || es.includes('𝑺𝑼𝑩𝑫𝑼𝑬Ñ𝑶𝑺'), es)
})

test('respostas novas saem traduzidas', () => {
  assert.equal(traduzirTexto('- ✅ @5491100000001 agora é subdono e pode usar os comandos de dono.', 'en'), '- ✅ @5491100000001 is now a sub-owner and can use the owner commands.')
  assert.equal(traduzirTexto('- ✅ Nome do bot trocado para: *Lua*', 'es'), '- ✅ Nombre del bot cambiado a: *Lua*')
  assert.equal(traduzirTexto('- 🖼️ Mande uma foto com a legenda *#fotobot*, ou responda a uma foto com *#fotobot*.', 'en'), '- 🖼️ Send a photo with the caption *#fotobot*, or reply to a photo with *#fotobot*.')
  assert.equal(traduzirTexto('- 🧩 Use: *#nomebot novo nome*', 'en'), '- 🧩 Use: *#nomebot new name*')
})

test('subdono recebe poder de dono no bot (comandos de dono liberados)', async () => {
  const { makeSystem } = await import(path.join(raiz, 'sistema/core/contexto.js'))
  const registry = { plugins: [], commands: new Map() }
  const evento = (numero) => ({ key: { remoteJid: numero + '@s.whatsapp.net', id: 'X' + numero }, message: { conversation: '#menudono' }, pushName: 'P' })
  const cfg = { prefix: '#', owner: { number: '5511999990000' }, connection: { number: '5511000000000' } }
  const s1 = await makeSystem({ client: {}, event: evento('5491100000002'), config: cfg, registry })
  assert.equal(s1.isOwner, true)
  const s2 = await makeSystem({ client: {}, event: evento('5491177777777'), config: cfg, registry })
  assert.equal(s2.isOwner, false)
})
