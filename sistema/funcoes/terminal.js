import chalk from 'chalk'
import gradient from 'gradient-string'

const logo = String.raw`
     _   _   _ ____   ___  ____      _
    / \ | | | |  _ \ / _ \|  _ \    / \
   / _ \| | | | |_) | | | | |_) |  / _ \
  / ___ \ |_| |  _ <| |_| |  _ <  / ___ \
 /_/   \_\___/|_| \_\\___/|_| \_\/_/   \_\
                 S Y S T E M`

// Bot de cliente: o terminal dele passa pelo launcher, que põe
// "[ cliente Nome ]" e o horário em cada linha. Logo e banner ali viravam
// dezenas de linhas picadas; no lugar, só uma linha com etiqueta.
const ehCliente = () => process.env.AURORA_CLIENTE === '1'

export function showStart({ cliente = ehCliente(), saida = console } = {}) {
if (cliente) return
saida.log()
saida.log(gradient.rainbow.multiline(logo))
saida.log()
}

export function showConnected({ cliente = ehCliente(), saida = console } = {}) {
if (cliente) return
saida.log(chalk.greenBright.bold('        ✓ Conectado com sucesso'))
saida.log()
}

export function showPairing(code, { cliente = ehCliente(), saida = console } = {}) {
const raw = String(code ?? '').replace(/-/g, '')
const formatted = raw.match(/.{1,4}/g)?.join('-') ?? raw
if (cliente) return saida.log(`[ AURORA CONEXÃO ] Código de pareamento: ${formatted}`)
saida.log(chalk.greenBright('        ✦ Código de pareamento'))
saida.log(chalk.whiteBright.bold(`          ${formatted}`))
saida.log()
}

export function showCommand(system) {
const user = system.pushName || system.senderNumber || 'Usuário'
const command = `${system.prefix}${system.command}`
const type = system.isGroup ? 'Grupo' : 'Privado'
const group = system.metadata?.subject || system.metadata?.name || 'Grupo'

console.log(chalk.greenBright('╭─〔 AURORA 〕'))
console.log(`${chalk.greenBright('│')} ${chalk.white('Usuário:')} ${chalk.cyanBright(user)}`)
console.log(`${chalk.greenBright('│')} ${chalk.white('Comando:')} ${chalk.yellowBright(command)}`)
console.log(`${chalk.greenBright('│')} ${chalk.white('Tipo:')} ${chalk.magentaBright(type)}`)
if (system.isGroup) {
console.log(`${chalk.greenBright('│')} ${chalk.white('Grupo:')} ${chalk.whiteBright(group)}`)
}
console.log(chalk.greenBright('╰───────────────'))
console.log()
}
