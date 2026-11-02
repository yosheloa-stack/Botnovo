// node test/comentarios.test.js
// #comentarios: baixa o vídeo do TikTok/Instagram (mesma API dos #tiktok/#insta)
// e lista os comentários públicos do vídeo (tikwm.com). Aqui a API é falsa:
// nada sai da máquina.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-coments-')))
const arquivoPlugin = path.join(raiz, 'sistema/comandos/download/comentarios.js')

let plugin
let versao = 0
test.beforeEach(async () => { plugin = (await import(`${arquivoPlugin}?t=${++versao}`)).default })

const { traduzirTexto } = await import(path.join(raiz, 'sistema/funcoes/traduzir.js'))
const { tipoLink } = await import(path.join(raiz, 'sistema/funcoes/comentarios.js'))
const menus = (await import(path.join(raiz, 'sistema/menus/menus.js'))).default

// mp4 mínimo (cabeçalho ftyp) pra downloadFile reconhecer como vídeo.
const VIDEO = Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32, 0x00, 0x00, 0x00, 0x00])

const fetchOriginal = globalThis.fetch
let chamadas = []
let respostaComentarios = []
test.beforeEach(() => {
  chamadas = []
  globalThis.fetch = async (url) => {
    const u = String(url)
    chamadas.push(u)
    if (u.includes('tokito.test')) {
      return new Response(VIDEO, { status: 200, headers: { 'content-type': 'video/mp4', 'content-length': String(VIDEO.length) } })
    }
    if (u.includes('tikwm.test') || u.includes('comment/list')) {
      const r = respostaComentarios.shift() || { status: 503, body: '' }
      return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json' } })
    }
    return new Response('', { status: 404 })
  }
})
test.after(() => { globalThis.fetch = fetchOriginal })

function sistema(args) {
  const replies = []
  const enviados = []
  return {
    args,
    q: args.join(' '),
    prefix: '#',
    config: { tokitoApi: { url: 'https://tokito.test', token: 'K' }, tikwm: { url: 'https://tikwm.test' } },
    reply: async (t) => { replies.push(t) },
    send: async (c) => { enviados.push(c) },
    replies,
    enviados
  }
}

const comentsOk = (comments, total = comments.length) => ({ status: 200, body: JSON.stringify({ code: 0, data: { total, comments } }) })

test('detecta TikTok e Instagram, ignora o resto', () => {
  assert.equal(tipoLink('https://www.tiktok.com/@x/video/1'), 'tiktok')
  assert.equal(tipoLink('https://vm.tiktok.com/abc'), 'tiktok')
  assert.equal(tipoLink('https://www.instagram.com/reel/abc/'), 'instagram')
  assert.equal(tipoLink('https://youtube.com/watch?v=1'), '')
  assert.equal(tipoLink(''), '')
})

test('TikTok: manda o vídeo e lista os comentários', async () => {
  respostaComentarios = [comentsOk([
    { text: 'video top demais', digg_count: 5, user: { nickname: 'Ana' } },
    { text: 'kkkk', user: { unique_id: 'joao' } }
  ], 2)]
  const s = sistema(['https://www.tiktok.com/@x/video/123'])
  await plugin.run(s)

  // baixou o vídeo pela API do Tokito e enviou como vídeo
  assert.ok(chamadas.some((u) => u.includes('tokito.test') && u.includes('/api/tiktok-video')), chamadas.join('\n'))
  const video = s.enviados.find((e) => e && typeof e === 'object' && e.type === 'video')
  assert.ok(video, 'não enviou o vídeo')
  assert.match(video.caption, /TikTok/)

  // listou os comentários
  const bloco = s.enviados.find((e) => typeof e === 'string')
  assert.ok(bloco, 'não enviou o bloco de comentários')
  assert.match(bloco, /Ana/)
  assert.match(bloco, /video top demais/)
  assert.match(bloco, /joao/)
  assert.match(bloco, /kkkk/)
  assert.match(bloco, /ᴄᴏᴍᴇɴᴛᴀ́ʀɪᴏs:\* 2/)
  assert.match(bloco, /❤️ 5/)
})

test('link inválido: ensina a usar e não baixa nada', async () => {
  const s = sistema(['oi'])
  await plugin.run(s)
  assert.equal(chamadas.length, 0)
  assert.match(s.replies[0], /#comentarios link/)
})

test('sem link: ensina a usar', async () => {
  const s = sistema([])
  await plugin.run(s)
  assert.equal(chamadas.length, 0)
  assert.match(s.replies[0], /#comentarios link/)
})

test('Instagram sem comentários: manda o vídeo e avisa', async () => {
  respostaComentarios = [comentsOk([], 0)]
  const s = sistema(['https://www.instagram.com/reel/abc/'])
  await plugin.run(s)
  assert.ok(chamadas.some((u) => u.includes('/api/insta-video')), chamadas.join('\n'))
  assert.ok(s.enviados.some((e) => e && typeof e === 'object' && e.type === 'video'))
  assert.match(s.replies.at(-1), /Instagram costuma fechar os comentários/)
})

test('comentários falham, mas o vídeo vai mesmo assim', async () => {
  respostaComentarios = [{ status: 200, body: '<html>erro</html>' }]
  const s = sistema(['https://www.tiktok.com/@x/video/123'])
  await plugin.run(s)
  assert.ok(s.enviados.some((e) => e && typeof e === 'object' && e.type === 'video'))
  assert.match(s.replies.at(-1), /não consegui pegar os comentários agora/)
})

test('respostas e menu saem no idioma do grupo', async () => {
  const s = sistema([])
  await plugin.run(s)
  const en = traduzirTexto(s.replies[0], 'en')
  assert.ok(en.includes('Downloads the video and shows the comments from a'), en)

  const carregando = traduzirTexto('• 🎵 Baixando o vídeo e os comentários do TikTok, aguarde...', 'en')
  assert.ok(carregando.includes('Downloading the video and comments from TikTok, please wait...'), carregando)

  const menu = menus.downloads('Aurora', 'Ana', 'Dono', true, '10:00', '#', 'Grupo', '1.8')
  assert.ok(menu.includes('#comentarios link'), menu)
  const menuEn = traduzirTexto(menu, 'en')
  assert.ok(menuEn.includes('#comentarios link'), menuEn)
})
