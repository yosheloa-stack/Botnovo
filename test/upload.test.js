// node test/upload.test.js
// #upload / #imgpralink: pega o arquivo marcado (ou enviado com o comando),
// sobe no PussyBox e, se ele falhar, no Catbox e no Litterbox. Aqui o
// WhatsApp e os sites são falsos: nada sai da máquina.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-upload-')))
const plugin = (await import(path.join(raiz, 'sistema/comandos/download/upload.js'))).default
const { traduzirTexto } = await import(path.join(raiz, 'sistema/funcoes/traduzir.js'))
const menus = (await import(path.join(raiz, 'sistema/menus/menus.js'))).default

const fetchOriginal = globalThis.fetch
let respostas = []
let chamadas = []
test.beforeEach(() => {
  chamadas = []
  globalThis.fetch = async (url, opts) => {
    const arquivo = opts.body.get('fileToUpload')
    chamadas.push({ url, reqtype: opts.body.get('reqtype'), time: opts.body.get('time'), nome: arquivo?.name, tipo: arquivo?.type, conteudo: await arquivo?.text() })
    const r = respostas.shift()
    return new Response(r.body, { status: r.status })
  }
})
test.after(() => { globalThis.fetch = fetchOriginal })

function sistema(message, q = '') {
  const replies = []
  return {
    replies, q, prefix: '#', event: { key: {}, message },
    client: { message: { downloadToFile: async (src, file) => fs.promises.writeFile(file, `BYTES:${Object.keys(src.message || src).join(',')}`) } },
    reply: async (t) => { replies.push(t) }
  }
}

function marcando(quotedMessage, text = '#upload') {
  return { extendedTextMessage: { text, contextInfo: { stanzaId: 'ABC', participant: '1@s.whatsapp.net', quotedMessage } } }
}

test('PDF marcado: PussyBox falha, Catbox devolve o link', async () => {
  respostas = [{ status: 404, body: 'not found' }, { status: 200, body: 'https://files.catbox.moe/abc.pdf' }]
  const s = sistema(marcando({ documentWithCaptionMessage: { message: { documentMessage: { mimetype: 'application/pdf', fileName: 'boleto', fileLength: { toNumber: () => 2048 } } } } }))
  await plugin.run(s)
  assert.deepEqual(chamadas.map((c) => c.url), ['https://pussybox.moe/user/api.php', 'https://catbox.moe/user/api.php'])
  assert.equal(chamadas[1].reqtype, 'fileupload')
  assert.equal(chamadas[1].nome, 'boleto.pdf')
  assert.equal(chamadas[1].tipo, 'application/pdf')
  // Baixou a mensagem marcada, não a mensagem do comando.
  assert.equal(chamadas[1].conteudo, 'BYTES:documentWithCaptionMessage')
  assert.match(s.replies.at(-1), /Link: https:\/\/files\.catbox\.moe\/abc\.pdf/)
  assert.doesNotMatch(s.replies.at(-1), /72 horas/)
})

test('ZIP marcado sobe direto no PussyBox', async () => {
  respostas = [{ status: 200, body: 'https://pussybox.moe/u/k.zip\n' }]
  const s = sistema(marcando({ documentMessage: { mimetype: 'application/zip', fileName: 'pack.zip', fileLength: 10 } }, '/imgpralink'))
  await plugin.run(s)
  assert.equal(chamadas.length, 1)
  assert.equal(chamadas[0].nome, 'pack.zip')
  assert.match(s.replies.at(-1), /Link: https:\/\/pussybox\.moe\/u\/k\.zip$/)
})

test('áudio marcado cai no Litterbox e avisa que o link vence', async () => {
  respostas = [{ status: 200, body: '<html>' }, { status: 412, body: 'no' }, { status: 200, body: 'https://litter.catbox.moe/zz.ogg' }]
  const s = sistema(marcando({ audioMessage: { mimetype: 'audio/ogg; codecs=opus', ptt: true, fileLength: 9000n } }))
  await plugin.run(s)
  assert.equal(chamadas[2].time, '72h')
  assert.match(chamadas[2].nome, /\.ogg$/)
  assert.match(s.replies.at(-1), /litter\.catbox\.moe\/zz\.ogg\n• ⏳ Esse link vale 72 horas\./)
})

test('foto enviada com o comando na legenda; os três sites falham', async () => {
  respostas = [{ status: 500, body: 'x' }, { status: 200, body: 'File type not allowed' }, { status: 503, body: '' }]
  const s = sistema({ imageMessage: { mimetype: 'image/jpeg', caption: '#upload', fileLength: 500 } })
  await plugin.run(s)
  assert.equal(chamadas.length, 3)
  assert.equal(chamadas[0].conteudo, 'BYTES:imageMessage')
  assert.match(s.replies.at(-1), /Não consegui subir o arquivo agora/)
})

test('#upload texto vira um .txt', async () => {
  respostas = [{ status: 200, body: JSON.stringify({ success: true, files: [{ url: 'https://pussybox.moe/f/a.txt' }] }) }]
  const s = sistema({ conversation: '#upload olá mundo' }, 'olá mundo')
  await plugin.run(s)
  assert.equal(chamadas[0].conteudo, 'olá mundo')
  assert.match(chamadas[0].nome, /\.txt$/)
  assert.match(s.replies.at(-1), /pussybox\.moe\/f\/a\.txt/)
})

test('sem arquivo e sem texto: explica como usar, sem subir nada', async () => {
  const s = sistema({ conversation: '#upload' })
  await plugin.run(s)
  assert.equal(chamadas.length, 0)
  assert.match(s.replies[0], /#upload\*/)
})

test('arquivo acima de 100 MB é recusado antes de baixar', async () => {
  const s = sistema({ videoMessage: { mimetype: 'video/mp4', fileLength: 300 * 1024 * 1024 } })
  s.client.message.downloadToFile = async () => { throw new Error('não devia baixar') }
  await plugin.run(s)
  assert.equal(chamadas.length, 0)
  assert.match(s.replies[0], /O limite é 100 MB/)
})

test('respostas e menu saem no idioma do grupo', async () => {
  const s = sistema({ conversation: '#upload' })
  await plugin.run(s)
  const en = traduzirTexto(s.replies[0], 'en')
  assert.ok(en.includes('Tag/reply to a *photo, video, audio, PDF, ZIP or any file* with *#upload*'), en)
  assert.ok(en.includes('*#upload your text*'), en)
  const es = traduzirTexto('• ✅ *Upload feito!*\n• 📎 Arquivo: a.zip\n• 📦 Tamanho: 1 KB', 'es')
  assert.ok(es.includes('¡Archivo subido!') && es.includes('Archivo: a.zip') && es.includes('Tamaño: 1 KB'), es)
  const menu = traduzirTexto(menus.downloads('Aurora', 'Ana', 'Dono', true, '10:00', '#', 'Grupo', '1.8'), 'en')
  assert.ok(menu.includes('#upload — reply to a file'), menu)
  assert.ok(menu.includes('#imgpralink — reply to a photo'), menu)
})
