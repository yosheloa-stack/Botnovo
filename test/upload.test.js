// node test/upload.test.js
// #upload / #imgpralink: pega o arquivo marcado (ou enviado com o comando),
// sobe no PussyBox (só nele, a pedido do dono). Aqui o WhatsApp e o site
// são falsos: nada sai da máquina.
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const raiz = path.resolve(import.meta.dirname, '..')
process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'aurora-upload-')))
const arquivoPlugin = path.join(raiz, 'sistema/comandos/download/upload.js')
// Cada teste carrega o comando de novo, limpo.
let plugin
let versao = 0
test.beforeEach(async () => { plugin = (await import(`${arquivoPlugin}?t=${++versao}`)).default })
const { traduzirTexto } = await import(path.join(raiz, 'sistema/funcoes/traduzir.js'))
const menus = (await import(path.join(raiz, 'sistema/menus/menus.js'))).default

const fetchOriginal = globalThis.fetch
let respostas = []
let chamadas = []
let esperas = []
const timeoutOriginal = globalThis.setTimeout
test.beforeEach(() => {
  chamadas = []
  esperas = []
  // As esperas entre tentativas (3 s, 8 s) passam na hora no teste.
  globalThis.setTimeout = (fn, ms, ...args) => { esperas.push(ms); return timeoutOriginal(fn, 0, ...args) }
  globalThis.fetch = async (url, opts = {}) => {
    const [campo, arquivo] = [...opts.body.entries()].find(([, v]) => typeof v === 'object') || []
    chamadas.push({ url, campo, reqtype: opts.body.get('reqtype'), nome: arquivo?.name, tipo: arquivo?.type, conteudo: await arquivo?.text() })
    const r = respostas.shift() || { status: 503, body: '' }
    return new Response(r.body, { status: r.status, headers: r.headers })
  }
})
test.afterEach(() => { globalThis.setTimeout = timeoutOriginal })
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

const PUSSY = 'https://pussybox.moe/api/upload/file'
const OK = (url) => ({ status: 200, body: JSON.stringify({ success: true, resultado: [{ name: 'x', size: 1, url }] }) })

test('PDF marcado sobe no PussyBox e o link relativo vira link completo', async () => {
  respostas = [OK('/files/1793029329819abc.pdf')]
  const s = sistema(marcando({ documentWithCaptionMessage: { message: { documentMessage: { mimetype: 'application/pdf', fileName: 'boleto', fileLength: { toNumber: () => 2048 } } } } }))
  await plugin.run(s)
  assert.deepEqual(chamadas.map((c) => c.url), [PUSSY])
  assert.equal(chamadas[0].campo, 'file')
  assert.equal(chamadas[0].nome, 'boleto.pdf')
  assert.equal(chamadas[0].tipo, 'application/pdf')
  // Baixou a mensagem marcada, não a mensagem do comando.
  assert.equal(chamadas[0].conteudo, 'BYTES:documentWithCaptionMessage')
  assert.match(s.replies.at(-1), /Link: https:\/\/pussybox\.moe\/files\/1793029329819abc\.pdf$/)
})

test('ZIP marcado: aceita também link completo em texto', async () => {
  respostas = [{ status: 200, body: 'https://pussybox.moe/files/k.zip\n' }]
  const s = sistema(marcando({ documentMessage: { mimetype: 'application/zip', fileName: 'pack.zip', fileLength: 10 } }, '/imgpralink'))
  await plugin.run(s)
  assert.equal(chamadas.length, 1)
  assert.equal(chamadas[0].nome, 'pack.zip')
  assert.match(s.replies.at(-1), /Link: https:\/\/pussybox\.moe\/files\/k\.zip$/)
})

test('limite de envios (429) e site fora: tenta de novo e sobe na 3ª', async () => {
  respostas = [
    { status: 429, body: '{"success":false,"status":"RATE_LIMITED"}', headers: { 'retry-after': '5' } },
    { status: 502, body: '' },
    OK('/files/zz.ogg')
  ]
  const s = sistema(marcando({ audioMessage: { mimetype: 'audio/ogg; codecs=opus', ptt: true, fileLength: 9000n } }))
  await plugin.run(s)
  assert.deepEqual(chamadas.map((c) => c.url), [PUSSY, PUSSY, PUSSY])
  // Respeita o Retry-After do site (5 s) e depois espera 8 s.
  assert.ok(esperas.includes(5000) && esperas.includes(8000), JSON.stringify(esperas))
  assert.match(chamadas[2].nome, /\.ogg$/)
  assert.match(s.replies.at(-1), /Link: https:\/\/pussybox\.moe\/files\/zz\.ogg$/)
})

test('success:false com 200 conta como falha e tenta de novo', async () => {
  respostas = [{ status: 200, body: '{"success":false,"resultado":[]}' }, OK('/files/a.jpg')]
  const s = sistema({ imageMessage: { mimetype: 'image/jpeg', caption: '#upload' } })
  await plugin.run(s)
  assert.equal(chamadas.length, 2)
  assert.match(s.replies.at(-1), /files\/a\.jpg/)
})

test('3 tentativas com limite de envios: avisa que o PussyBox está cheio', async () => {
  respostas = [{ status: 429, body: '' }, { status: 429, body: '' }, { status: 429, body: '' }, OK('/files/nunca.jpg')]
  const s = sistema({ imageMessage: { mimetype: 'image/jpeg', caption: '#upload', fileLength: 500 } })
  await plugin.run(s)
  assert.equal(chamadas.length, 3)
  assert.match(s.replies.at(-1), /O PussyBox está recebendo muitos envios agora/)
})

test('arquivo recusado (400) não tenta de novo', async () => {
  respostas = [{ status: 400, body: '{"success":false}' }, OK('/files/nunca.jpg')]
  const s = sistema({ imageMessage: { mimetype: 'image/jpeg', caption: '#upload' } })
  await plugin.run(s)
  assert.equal(chamadas.length, 1)
  assert.match(s.replies.at(-1), /Não consegui subir o arquivo agora/)
})

test('#upload texto vira um .txt', async () => {
  respostas = [OK('/files/a.txt')]
  const s = sistema({ conversation: '#upload olá mundo' }, 'olá mundo')
  await plugin.run(s)
  assert.equal(chamadas[0].conteudo, 'olá mundo')
  assert.match(chamadas[0].nome, /\.txt$/)
  assert.match(s.replies.at(-1), /pussybox\.moe\/files\/a\.txt/)
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
