import { spawn } from 'node:child_process'
import { iniciarGerenteClientes } from './clientes/iniciar.js'

const restartCode = 75
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// O launcher mantém o bot de pé:
// • saída 75 = o bot pediu para reconectar do zero;
// • qualquer outro erro (crash) também reinicia, em vez de derrubar o app;
// • saída 0 = parada normal (logout ou desligamento): o launcher para junto.
let child = null
let stopping = false
let gerente = null
for (const signal of ['SIGTERM', 'SIGINT']) {
process.once(signal, () => {
// Repassa a parada ao bot: sem isso o processo do bot podia ficar vivo
// sozinho e brigar pela mesma sessão do WhatsApp com o próximo.
stopping = true
gerente?.parar()
if (child && child.exitCode === null) child.kill(signal)
else process.exit(0)
})
}

async function boot() {
// Bots das clientes (cada uma no número dela) rodam ao lado do bot da casa.
try { gerente = await iniciarGerenteClientes() } catch (err) {
console.error('[ AURORA CLIENTES ] Gerente não ligou:', err?.message || err)
}
let failures = 0
while (true) {
const started = Date.now()
child = spawn(process.execPath, ['index.js'], {
stdio: 'inherit',
env: process.env
})

const code = await new Promise((resolve) => child.once('exit', (exitCode, signal) => resolve(exitCode ?? (signal ? 1 : 0))))
if (stopping) process.exit(0)
if (code === 0) {
// Bot da casa parou (logout): os bots das clientes continuam.
if (gerente) { console.warn('[ AURORA ] O bot da casa parou; os bots das clientes continuam ligados.'); return }
process.exit(0)
}

// Evita ciclos rápidos de reconexão quando o stream falha repetidamente.
failures = Date.now() - started > 120_000 ? 0 : Math.min(failures + 1, 5)
const waitMs = Math.min(3000 * (2 ** failures), 60_000)
console.warn('[ AURORA ] ' + (code === restartCode ? 'Reinício de conexão' : 'O bot parou com erro (código ' + code + '); reiniciando') + ' em ' + Math.round(waitMs / 1000) + 's')
await delay(waitMs)
if (stopping) process.exit(0)
}
}

boot().catch((err) => {
console.error('[ AURORA ] Falha no launcher:', err)
process.exit(1)
})
