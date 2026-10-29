import { parseToggle } from '../../funcoes/toggle.js'
import { auroraNoGrupo } from '../../funcoes/banco.js'
import { handleAurora, ligadaNoGrupo, iaNesteBot } from '../../funcoes/aurora/index.js'

// #aurora texto  → fala com a Aurora (qualquer pessoa)
// #aurora 1 / 0  → liga ou desliga a Aurora neste grupo (admin ou dono)
export default {name: 'aurora',aliases: ['ia'],category: 'geral',description: 'Conversa com a Aurora (IA) ou liga/desliga ela no grupo',async run(system){
if (!iaNesteBot()) return system.reply('Comando indisponível neste bot.')
const valor = system.args.length === 1 ? parseToggle(system.args[0]) : null
if (valor !== null) {
if (!system.isGroup) return system.reply('Use este comando dentro do grupo. No privado é só falar comigo 😉')
if (!system.isAdmin && !system.isOwner) return system.reply(system.messages.onlyAdmin())
auroraNoGrupo(system.from, valor)
return system.reply(system.messages.toggleResult('aurora', valor, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
if (!system.q) {
const status = system.isGroup ? `\n\nNeste grupo: *${ligadaNoGrupo(system) ? 'ligada' : 'desligada'}* (admin muda com ${system.prefix}aurora 1 / ${system.prefix}aurora 0).` : ''
return system.reply(`oi, sou a Aurora 💜 me chama pelo nome, me marca ou responde uma mensagem minha.\nEx.: *aurora, como coloco meu ID no autolike?*${status}`)
}
if (!handleAurora(system, { forcado: true, texto: system.q })) return system.reply('a Aurora tá desligada agora 😴')
}
}
