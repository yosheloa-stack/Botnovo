import { spawn } from 'node:child_process'
import { iniciarGerenteClientes } from './clientes/iniciar.js'
import { instalarHorario } from './funcoes/registro.js'
import { NUMERO_BOT_DA_CASA } from './funcoes/config.js'
import { mesmoNumero } from './funcoes/jid.js'

instalarHorario()

const restartCode = 75
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// O launcher mantém o bot de pé:
// • saída 75 = o bot pediu para reconectar do zero;
// • qualquer outro erro (crash) também reinicia, em vez de derrubar o app;
// • saída 0 = parada normal (logout ou desligamento): o launcher para junto.
let child = null
let stopping = false
let gerente = null
// Bot da casa conectado ({ numero, filho }): ele avisa pelo canal interno.
let casa = null
for (const signal of ['SIGTERM', 'SIGINT']) {
process.once(signal, () => {
// Repassa a parada ao bot: sem isso o processo do bot podia ficar vivo
// sozinho e brigar pela mesma sessão do WhatsApp com o próximo.
stopping = true
gerente?.parar()
gerente?.avisos?.parar()
if (child && child.exitCode === null) child.kill(signal)
else process.exit(0)
})
}

// O NÚMERO DA CASA JÁ ESTÁ NUM BOT DE CLIENTE (01/11): o dono ligou o número
// da casa como bot de cliente (GGx) e o bot principal, sem sessão, ficava
// pedindo código de conexão pro MESMO número sem parar. Pedido de código
// repetido num número que já tem o bot conectado é o tipo de coisa que faz o
// WhatsApp desconfiar e tirar o aparelho. Enquanto um bot de cliente estiver
// conectado no número da casa, o bot principal fica parado (sem pedir código);
// se esse bot cair, o principal volta.
const numeroDaCasaNoCliente = () => {
try { return (gerente?.canais?.() || []).some((c) => mesmoNumero(NUMERO_BOT_DA_CASA, c.numero) || mesmoNumero(c.numero, NUMERO_BOT_DA_CASA)) } catch { return false }
}
let estacionado = false
setInterval(() => {
if (!child || child.exitCode !== null || casa?.filho === child || !numeroDaCasaNoCliente()) return
estacionado = true
console.warn('[ AURORA ] O número da casa já está conectado num bot de cliente: o bot principal para de pedir código de conexão.')
child.kill('SIGTERM')
}, 15_000).unref?.()

async function boot() {
// Bots das clientes (cada uma no número dela) rodam ao lado do bot da casa.
try { gerente = await iniciarGerenteClientes({ canalDaCasa: () => casa }) } catch (err) {
console.error('[ AURORA CLIENTES ] Gerente não ligou:', err?.message || err)
}
let failures = 0
while (true) {
if (numeroDaCasaNoCliente()) { estacionado = true; await delay(30_000); if (stopping) process.exit(0); continue }
estacionado = false
const started = Date.now()
// Com o gerente ligado, os avisos de venda saem daqui (avisosVenda.js) e o
// bot da casa só manda quando pedem pelo canal interno.
child = spawn(process.execPath, ['--disable-warning=ExperimentalWarning', 'index.js'], {
stdio: gerente ? ['inherit', 'inherit', 'inherit', 'ipc'] : 'inherit',
env: gerente ? { ...process.env, AURORA_AVISOS_PELO_LAUNCHER: '1' } : process.env
})
const filho = child
casa = null
filho.on?.('message', (msg) => {
if (msg?.tipo === 'conectado' && msg.numero) casa = { numero: String(msg.numero).replace(/\D/g, ''), filho }
else if (msg?.tipo === 'desconectado' && casa?.filho === filho) {
casa = null
// o WhatsApp tirou o bot da casa: segura o #aviso pra todos (ver gerente.js)
void gerente?.pausarAvisoGeral?.('o WhatsApp desconectou o bot da casa')
}
})
filho.once?.('exit', () => { if (casa?.filho === filho) casa = null })

const code = await new Promise((resolve) => child.once('exit', (exitCode, signal) => resolve(exitCode ?? (signal ? 1 : 0))))
if (stopping) process.exit(0)
// parado de propósito (o número da casa está num bot de cliente): espera
if (estacionado) continue
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
