// MODO CLIENTE: este processo é o bot de UMA cliente, rodando no número de
// WhatsApp dela. Quem liga é o gerente (sistema/clientes/gerente.js), um
// processo por cliente, cada um na pasta de dados dela. Tudo que o bot mostra
// é dela: nome, dona (o WhatsApp que ela cadastrou no site), foto do menu,
// idioma e estilo. Nada do Aurora nem do dono da casa.

import fs from 'node:fs'
import path from 'node:path'

export const modoCliente = process.env.AURORA_CLIENTE === '1'

const ESTILOS = ['rosa', 'vermelho', 'preto', 'azul']
const IDIOMAS = ['pt', 'es', 'en']

export function lerMarca(raw) {
  let m = {}
  try { m = JSON.parse(raw || '{}') || {} } catch {}
  const texto = (v, max) => String(v ?? '').trim().slice(0, max)
  return {
    nome: texto(m.nome, 48) || 'Bot',
    dono: String(m.dono ?? '').replace(/\D/g, '').slice(0, 15),
    // Nome da dona (aparece no menu no lugar do número).
    donoNome: texto(m.donoNome, 40),
    idioma: IDIOMAS.includes(m.idioma) ? m.idioma : 'pt',
    foto: /^https:\/\//i.test(String(m.foto || '')) ? texto(m.foto, 1000) : '',
    estilo: ESTILOS.includes(m.estilo) ? m.estilo : '',
    expira: Number.isFinite(Date.parse(m.expira || '')) ? new Date(m.expira).toISOString() : ''
  }
}

let marca = lerMarca(process.env.AURORA_MARCA)

// O gerente manda a marca nova quando a cliente muda algo no site (nome,
// foto, estilo...): vale na hora, sem reiniciar o bot.
const ouvintesIdioma = []
export const aoMudarIdioma = (fn) => { ouvintesIdioma.push(fn) }
export function trocarMarcaCliente(nova) {
  const antes = marca.idioma
  marca = lerMarca(JSON.stringify(nova || {}))
  if (marca.idioma !== antes) for (const fn of ouvintesIdioma) { try { fn(marca.idioma) } catch (err) { console.warn('[ AURORA CLIENTE ] Idioma:', err?.message || err) } }
}
if (modoCliente && typeof process.on === 'function') {
  process.on('message', (msg) => {
    if (msg?.tipo === 'marca') trocarMarcaCliente(msg.marca)
  })
}

// #nomebot: a dona troca o nome pelo próprio WhatsApp. Fica na pasta de dados
// do bot dela e vale enquanto o nome do site for o mesmo de quando ela trocou;
// se depois ela mudar o nome no site, o do site ganha.
const arquivoNomeLocal = () => path.resolve(process.env.AURORA_DATA_DIR || '.aurora-data', 'marca-local.json')
let nomeLocal = null
function lerNomeLocal() {
  try {
    const d = JSON.parse(fs.readFileSync(arquivoNomeLocal(), 'utf8'))
    return d?.nome ? { nome: String(d.nome).trim().slice(0, 48), base: String(d.base ?? '') } : null
  } catch { return null }
}
if (modoCliente) nomeLocal = lerNomeLocal()

export function trocarNomeLocal(nome) {
  const limpo = String(nome ?? '').trim().slice(0, 48)
  if (!limpo) return false
  nomeLocal = { nome: limpo, base: marca.nome }
  try {
    fs.mkdirSync(path.dirname(arquivoNomeLocal()), { recursive: true })
    fs.writeFileSync(arquivoNomeLocal(), JSON.stringify(nomeLocal) + '\n', 'utf8')
  } catch (err) { console.warn('[ AURORA CLIENTE ] Nome do bot:', err?.message || err) }
  return true
}

const comNomeLocal = (m) => (nomeLocal?.nome && nomeLocal.base === m.nome ? { ...m, nome: nomeLocal.nome } : m)
export const marcaCliente = () => (modoCliente ? comNomeLocal(marca) : null)

// Fala com o gerente (código de conexão, conectado, desconectado...).
export function avisarGerente(msg) {
  if (!modoCliente || typeof process.send !== 'function') return
  try { process.send(msg) } catch {}
}
