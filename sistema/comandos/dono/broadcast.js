export default {name: 'broadcast',aliases: [],category: 'dono',description: 'Envia aviso para grupos',ownerOnly: true,async run(system){
if (!system.q) return system.reply(system.messages.broadcastUsage(system.prefix))
const groups = await system.client.group.queryAllGroups()
const list = Array.isArray(groups) ? groups : Object.values(groups ?? {})
let sent = 0
for (const g of list) {
const jid = g.jid ?? g.id
if (!jid) continue
try {
await system.send({ type: 'text', text: system.messages.broadcastBody(system.q) }, jid)
sent++
} catch {}
}
await system.reply(system.messages.broadcastDone(sent))
}
}
