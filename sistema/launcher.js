import { spawn } from 'node:child_process'

const restartCode = 75
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function boot() {
while (true) {
const child = spawn(process.execPath, ['index.js'], {
stdio: 'inherit',
env: process.env
})

const code = await new Promise((resolve) => child.once('exit', resolve))
if (code !== restartCode) process.exit(code ?? 0)

await delay(3000)
}
}

boot().catch((err) => {
console.error('[ AURORA ] Falha no launcher:', err)
process.exit(1)
})
