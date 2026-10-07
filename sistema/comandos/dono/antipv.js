import { parseToggle } from '../../funcoes/toggle.js'
import { sendToggleButtons } from '../../funcoes/botoes.js'

export default {name: 'antipv',aliases: [],category: 'dono',description: 'Ativa/desativa AntiPV',ownerOnly: true,async run(system){
const value = parseToggle(system.args[0])
if (value === null) {
const sent = await sendToggleButtons(system, {
key: 'antiPv',
command: 'antipv',
current: system.db.settings?.antiPv ?? 0,
owner: true
})
if (sent) return
return system.reply(system.messages.toggleUsage(system.prefix, 'antipv'))
}
system.db.settings ??= {}
system.db.settings.antiPv = value
await system.save()
await system.reply(system.messages.toggleResult('antipv', value, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
