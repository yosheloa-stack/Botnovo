// node test/traducao-tudo.test.js
// Roda TODOS os comandos no bot da cliente em espanhol e em inglês, com um
// WhatsApp e um site de mentira, e confere que nada sai em português: menus,
// respostas dos comandos, brincadeiras (todas as frases sorteadas) e as
// respostas da API do site (/like, /info), inclusive erro que o dicionário
// não conhece.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-traducao-tudo-'))
process.chdir(pasta)
const DONO = '5511999990000', OUTRO = '5511888880000', BOT = '5511777770000'
process.env.AURORA_CLIENTE = '1'
process.env.AURORA_DATA_DIR = path.join(pasta, '.aurora-data')
process.env.AURORA_MARCA = JSON.stringify({ nome: 'Lua Bot', dono: DONO, idioma: 'es', expira: new Date(Date.now() + 9e8).toISOString() })

// O site de mentira: cada teste diz o que a /v1/like e a /v1/info respondem.
let respostaSite = { sucesso: false, erro: 'falha de rede' }
globalThis.fetch = async () => ({
  ok: true, status: 200, headers: new Map([['content-type', 'application/json']]),
  text: async () => JSON.stringify(respostaSite), arrayBuffer: async () => new ArrayBuffer(0)
})

const { restoPortugues, traduzirTexto } = await import(path.join(raiz, 'sistema/funcoes/traduzir.js'))
const { textoComum } = await import(path.join(raiz, 'sistema/funcoes/fontes.js'))
const { installMarcaAluguel } = await import(path.join(raiz, 'sistema/funcoes/marcaAluguel.js'))
const { loadPlugins } = await import(path.join(raiz, 'sistema/core/loader.js'))
const { createHandler } = await import(path.join(raiz, 'sistema/core/handler.js'))
const { loadNecessarios } = await import(path.join(raiz, 'sistema/funcoes/necessarios.js'))
const { trocarMarcaCliente } = await import(path.join(raiz, 'sistema/funcoes/cliente.js'))
const banco = await import(path.join(raiz, 'sistema/funcoes/banco.js'))
await loadNecessarios()

const GP = '120363000000000000@g.us'
const enviados = []
const participantes = [
  { id: DONO + '@s.whatsapp.net', jid: DONO + '@s.whatsapp.net', admin: 'superadmin', isAdmin: true, isSuperAdmin: true },
  { id: OUTRO + '@s.whatsapp.net', jid: OUTRO + '@s.whatsapp.net', admin: null },
  { id: BOT + '@s.whatsapp.net', jid: BOT + '@s.whatsapp.net', admin: 'admin', isAdmin: true }
]
const nada = async () => ({})
const qualquer = (base = {}) => new Proxy(base, { get: (t, k) => t[k] || nada })
const client = {
  getCredentials: () => ({ meJid: BOT + '@s.whatsapp.net' }),
  message: { send: async (jid, content) => { enviados.push(content); return { key: { id: 'M' + enviados.length } } }, downloadToFile: async () => { throw new Error('sem mídia') }, downloadBytes: async () => { throw new Error('sem mídia') }, upload: nada },
  group: qualquer({ queryGroupMetadata: async () => ({ id: GP, subject: 'Galera FF', participants: participantes, desc: 'desc' }), queryInviteCode: async () => 'ABC', queryAllGroups: async () => ({ [GP]: { id: GP, subject: 'Galera FF', participants: participantes } }), list: async () => [{ id: GP, subject: 'Galera FF' }] }),
  profile: qualquer(), newsletter: qualquer(), presence: qualquer(), chat: qualquer()
}
installMarcaAluguel(client)
const registry = await loadPlugins()
const config = { prefix: '#', owner: { number: DONO }, autoSystem: { url: 'https://site.test', token: 'tk' }, tokitoApi: { url: 'https://tokito.test' }, connection: { number: BOT } }
const handle = createHandler({ client, config, registry })
banco.setAluguel(GP, 30)

let n = 0
const textos = (v, out = []) => {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => textos(x, out))
  else if (v && typeof v === 'object' && !Buffer.isBuffer(v)) for (const [k, x] of Object.entries(v)) { if (!['mentions', 'jid', 'media', 'url', 'mimetype', 'id', 'target', 'type'].includes(k)) textos(x, out) }
  return out
}
async function mandar(texto) {
  enviados.length = 0
  const ev = { key: { remoteJid: GP, participant: DONO + '@s.whatsapp.net', id: 'E' + (++n), fromMe: false }, message: { conversation: texto }, pushName: 'Ana', messageTimestamp: Math.floor(Date.now() / 1000) }
  const log = console.log, warn = console.warn, info = console.info, error = console.error
  console.log = console.warn = console.info = console.error = () => {}
  try { await Promise.race([handle(ev), new Promise((r) => setTimeout(r, 4000))]) } finally { Object.assign(console, { log, warn, info, error }) }
  return enviados.flatMap((c) => textos(c))
}
const sobras = (lista, idioma) => lista.flatMap((t) => restoPortugues(t, idioma).length ? [textoComum(t).split('\n').filter((l) => restoPortugues(l, idioma).length).join(' ⏎ ')] : [])

// Comandos que desligam o bot, saem do grupo ou trocam o prefixo: só o uso.
const SO_USO = new Set(['setprefix', 'botoff', 'sairgp', 'antipv', 'bangp', 'blockuser'])
const ARGS = { like: '123456789', info: '123456789', autolike: '123456789', removelike: '123456789', closegp: '22:00', opengp: '07:00' }
// Valores do sorteio: passam por todas as frases das listas e faixas de %.
const SORTEIOS = [0.01, 0.13, 0.26, 0.38, 0.51, 0.63, 0.76, 0.88, 0.99]

for (const idioma of ['es', 'en']) {
  test(`todos os comandos saem em ${idioma === 'es' ? 'espanhol' : 'inglês'}`, async () => {
    trocarMarcaCliente({ nome: 'Lua Bot', dono: DONO, idioma, expira: new Date(Date.now() + 9e8).toISOString() })
    const problemas = []
    const feitos = new Set()
    const random = Math.random
    try {
      for (const cmd of registry.commands.keys()) {
        if (['reiniciar', 'restart'].includes(cmd)) continue
        const plugin = registry.commands.get(cmd)
        // Alias de brincadeira muda o texto (#gado, #corno...): roda todos.
        if (feitos.has(plugin) && plugin.category !== 'brincadeira') continue
        feitos.add(plugin)
        const tentativas = SO_USO.has(cmd) ? [''] : ['', ARGS[cmd] ?? '@' + OUTRO]
        const sorteios = plugin.category === 'brincadeira' ? SORTEIOS : [0.5]
        for (const args of tentativas) {
          for (const r of sorteios) {
            Math.random = () => r
            for (const linha of sobras(await mandar(`#${cmd}${args ? ' ' + args : ''}`), idioma)) problemas.push(`#${cmd} ${args} → ${linha}`)
          }
        }
      }
    } finally { Math.random = random }
    assert.deepEqual([...new Set(problemas)], [])
  })
}

const API = [
  { sucesso: false, codigo: 'ID_COOLDOWN', erro: 'esse ID ja recebeu likes — falta 5h 3min 2s para liberar' },
  { sucesso: false, codigo: 'POOL_CAPACITY_PRESSURE', erro: 'pedido aguardando uma janela saudável da rotação' },
  { sucesso: true, nick: 'Neo', uid: '123456789', likes_enviados: 0, likes_antes: 8063, likes_depois: 8063, aviso: 'o envio não saiu agora — tenta de novo daqui a alguns minutinhos' },
  { sucesso: true, nick: 'Neo', uid: '123456789', likes_enviados: 100, likes_antes: 1, likes_depois: 101 },
  { sucesso: false, erro: 'você já recebeu os 1000 likes do seu plano hoje — volta amanhã' },
  { sucesso: false, erro: 'você já mandou 3 IDs pela API hoje, o limite do seu plano — volta amanhã' },
  { sucesso: false, erro: 'esse ID não existe no jogo — confira antes de enviar' },
  { sucesso: false, erro: 'limite de 5 IDs nesta conta' },
  { sucesso: false, erro: 'cota esgotada (100/100)' },
  { sucesso: false, erro: 'limite diário de envio único esgotado (10/10), volta à meia-noite' },
  { sucesso: false, erro: 'chave vencida em 2026-10-01' },
  { sucesso: false, erro: 'plano vencido — renove pra voltar a enviar' },
  { sucesso: false, erro: 'o sistema está com muitos envios ao mesmo tempo — tente de novo em alguns segundos' },
  { sucesso: false, erro: 'não deu pra consultar agora — tente de novo em alguns minutos', motivo: 'principal: caiu (HTTP 500) | reserva: sem conta' },
  { sucesso: false, erro: 'algo totalmente novo que o site inventou agora' }
]

for (const idioma of ['es', 'en']) {
  test(`respostas da API do site saem em ${idioma === 'es' ? 'espanhol' : 'inglês'}`, async () => {
    trocarMarcaCliente({ nome: 'Lua Bot', dono: DONO, idioma, expira: new Date(Date.now() + 9e8).toISOString() })
    const problemas = []
    for (const resposta of API) {
      respostaSite = resposta
      for (const cmd of ['like', 'info', 'autolike', 'removelike', 'listalike']) {
        for (const linha of sobras(await mandar(`#${cmd} 123456789`), idioma)) problemas.push(`${resposta.erro || resposta.aviso || 'ok'} | #${cmd} → ${linha}`)
      }
    }
    assert.deepEqual(problemas, [])
  })
}

test('erro da API que o dicionário não conhece vira a mensagem padrão, já traduzida', async () => {
  trocarMarcaCliente({ nome: 'Lua Bot', dono: DONO, idioma: 'en', expira: new Date(Date.now() + 9e8).toISOString() })
  respostaSite = { sucesso: false, erro: 'algo totalmente novo que o site inventou agora' }
  assert.equal(textoComum((await mandar('#like 123456789')).join('\n')), "- ❌ Couldn't send the likes.")
  respostaSite = { sucesso: false, codigo: 'ID_COOLDOWN', erro: 'esse ID ja recebeu likes — falta 5h 3min 2s para liberar' }
  assert.equal(textoComum((await mandar('#like 123456789')).join('\n')), '- ❌ that ID already got likes — time left: 5h 3min 2s until it unlocks')
  // Em português nada muda: vai a frase do site.
  trocarMarcaCliente({ nome: 'Lua Bot', dono: DONO, idioma: 'pt', expira: new Date(Date.now() + 9e8).toISOString() })
  respostaSite = { sucesso: false, erro: 'algo totalmente novo que o site inventou agora' }
  assert.equal((await mandar('#like 123456789')).join('\n'), '- ❌ algo totalmente novo que o site inventou agora')
})

test('brincadeira de porcentagem e ações em inglês', () => {
  assert.equal(traduzirTexto('> @1 ficou com *83%* de gado(a) 🐮', 'en'), '> @1 got *83%* simp 🐮')
  assert.equal(traduzirTexto('> @1 usou *comer* com @2 😹', 'es'), '> @1 usó *comer* con @2 😹')
  // "com" e "em" soltos (texto da pessoa) ficam como estão.
  assert.equal(traduzirTexto('vamos jogar com ele em casa', 'en'), 'vamos jogar com ele em casa')
})
