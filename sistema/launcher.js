import { spawn } from 'node:child_process'

const restartCode = 75
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function boot() {
let failures = 0
while (true) {
const started = Date.now()
const child = spawn(process.execPath, ['index.js'], {
stdio: 'inherit',
env: process.env
})

const code = await new Promise((resolve) => child.once('exit', resolve))
if (code !== restartCode) process.exit(code ?? 0)

// Evita ciclos rápidos de reconexão quando o stream falha repetidamente.
failures = Date.now() - started > 120_000 ? 0 : Math.min(failures + 1, 5)
const waitMs = Math.min(3000 * (2 ** failures), 60_000)
console.warn('[ AURORA ] Reinício de conexão em ' + Math.round(waitMs / 1000) + 's')
await delay(waitMs)
}
}

boot().catch((err) => {
console.error('[ AURORA ] Falha no launcher:', err)
process.exit(1)
})
