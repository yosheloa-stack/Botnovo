import chalk from 'chalk'
import gradient from 'gradient-string'

const logo = String.raw`
     _   _   _ ____   ___  ____      _
    / \ | | | |  _ \ / _ \|  _ \    / \
   / _ \| | | | |_) | | | | |_) |  / _ \
  / ___ \ |_| |  _ <| |_| |  _ <  / ___ \
 /_/   \_\___/|_| \_\\___/|_| \_\/_/   \_\
                 S Y S T E M`

export function showStart() {
console.log()
console.log(gradient.rainbow.multiline(logo))
console.log()
}

export function showConnected() {
console.log(chalk.greenBright.bold('        ✓ Conectado com sucesso'))
console.log()
}

export function showPairing(code) {
const raw = String(code ?? '').replace(/-/g, '')
const formatted = raw.match(/.{1,4}/g)?.join('-') ?? raw
console.log(chalk.greenBright('        ✦ Código de pareamento'))
console.log(chalk.whiteBright.bold(`          ${formatted}`))
console.log()
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
