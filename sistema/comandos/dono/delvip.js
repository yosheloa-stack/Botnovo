import { tirarVip } from '../../funcoes/banco.js'
export default {name: 'delvip',aliases: ['delprem'],category: 'dono',description: 'Remove usuário VIP',ownerOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
if (!info.number) return system.reply(system.messages.phoneUnavailable())
const n = info.number
tirarVip(n)
await system.save()
await system.reply(system.messages.vipRemoved(n), { mentions: [info.jid] })
}
}
