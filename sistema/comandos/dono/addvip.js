export default {name: 'addvip',aliases: ['addprem'],category: 'dono',description: 'Adiciona usuário VIP',ownerOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
if (!info.number) return system.reply(system.messages.phoneUnavailable())
const n = info.number
if (!system.db.vip.includes(n)) system.db.vip.push(n)
await system.save()
await system.reply(system.messages.vipAdded(n), { mentions: [info.jid] })
}
}
