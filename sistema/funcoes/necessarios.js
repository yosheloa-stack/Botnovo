import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.resolve(process.env.AURORA_DATA_DIR || '/application/.aurora-data', 'necessarios.json')
const legacyFile = path.resolve('sistema/dados/necessarios.json')

const defaults = Object.freeze({
verificado: false,
numero_dono1: '.',
numero_dono2: '.',
numero_dono3: '.',
numero_dono4: '.',
numero_dono5: '.',
numero_dono6: '.',
botoff: false,
// Botões e listas começam desligados: mensagem interativa de conta comum pode
// não aparecer para quem recebe. O dono liga com #botoes 1 se no WhatsApp dele
// aparecer (botoes_escolhido marca que foi ele quem escolheu).
botoes: false,
botoes_escolhido: false,
vipcmd: [],
blockcmd: {},
aluguel: false
})

// Objeto ÚNICO durante toda a execução do Aurora.
// Nunca substituímos esta referência: handler, comandos e helpers enxergam
// imediatamente qualquer alteração feita em #verificado, #botoes etc.
const data = { ...defaults }
let queue = Promise.resolve()

const bool = (value, fallback = false) => {
if (value === true || value === 1 || String(value).toLowerCase() === 'true') return true
if (value === false || value === 0 || String(value).toLowerCase() === 'false') return false
return fallback
}

const ownerSlot = (value) => {
const text = String(value ?? '.').trim()
return text || '.'
}

function normalize(raw = {}) {
return {
verificado: bool(raw.verificado, defaults.verificado),
numero_dono1: ownerSlot(raw.numero_dono1),
numero_dono2: ownerSlot(raw.numero_dono2),
numero_dono3: ownerSlot(raw.numero_dono3),
numero_dono4: ownerSlot(raw.numero_dono4),
numero_dono5: ownerSlot(raw.numero_dono5),
numero_dono6: ownerSlot(raw.numero_dono6),
botoff: bool(raw.botoff, defaults.botoff),
botoes: bool(raw.botoes_escolhido, false) ? bool(raw.botoes, defaults.botoes) : false,
botoes_escolhido: bool(raw.botoes_escolhido, false),
vipcmd: Array.isArray(raw.vipcmd) ? raw.vipcmd : [],
blockcmd: raw.blockcmd && typeof raw.blockcmd === 'object' && !Array.isArray(raw.blockcmd) ? raw.blockcmd : {},
aluguel: bool(raw.aluguel, defaults.aluguel)
}
}

function replaceInPlace(next = {}) {
const normalized = normalize(next)
for (const key of Object.keys(data)) {
if (!(key in normalized)) delete data[key]
}
Object.assign(data, normalized)
return data
}

export async function loadNecessarios() {
try {
replaceInPlace(JSON.parse(await fs.readFile(file, 'utf8')))
} catch (error) {
if (error?.code !== 'ENOENT') throw error
try {
replaceInPlace(JSON.parse(await fs.readFile(legacyFile, 'utf8')))
await saveNecessarios()
} catch (legacyError) {
if (legacyError?.code !== 'ENOENT') throw legacyError
replaceInPlace(defaults)
await saveNecessarios()
}
}
return data
}

export function necessarios() {
return data
}

export function saveNecessarios() {
queue = queue.then(async () => {
await fs.mkdir(path.dirname(file), { recursive: true })
await fs.writeFile(file, `${JSON.stringify(normalize(data), null, 2)}\n`, 'utf8')
})
return queue
}

export function setNecessario(key, value) {
if (!(key in defaults)) return Promise.resolve(data)
data[key] = value
return saveNecessarios().then(() => data)
}
