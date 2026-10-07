import { parseToggle } from '../../funcoes/toggle.js'
import { sendToggleButtons } from '../../funcoes/botoes.js'
import { necessarios as getNecessarios, setNecessario } from '../../funcoes/necessarios.js'

export default {name: 'verificado',aliases: [],category: 'dono',description: 'Ativa/desativa selo visual Meta',ownerOnly: true,async run(system){
const value = parseToggle(system.args[0])
if (value === null) {
const sent = await sendToggleButtons(system, {
key: 'verificado',
command: 'verificado',
current: system.necessarios.verificado ? 1 : 0,
owner: true
})
if (sent) return
return system.reply(system.messages.toggleUsage(system.prefix, 'verificado'))
}
await setNecessario('verificado', Boolean(value))
system.necessarios = getNecessarios()
await system.reply(system.messages.toggleResult('verificado', value, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
