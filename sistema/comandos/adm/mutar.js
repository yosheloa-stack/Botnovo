export default {name: 'mutar',aliases: [],category: 'adm',description: 'Muta usuário: o bot apaga as mensagens dele',groupOnly: true,adminOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
// Guarda todas as formas da pessoa (número e LID): a mensagem dela pode chegar
// por qualquer uma e precisa ser reconhecida para ser apagada.
const keys = [info.number, info.pnJid, info.lidJid, info.jid].filter(Boolean)
system.db.muted[system.from] ??=[]
for (const key of keys) if (!system.db.muted[system.from].includes(key)) system.db.muted[system.from].push(key)
await system.save()
const display = info.number || info.display.replace(/^@/, '')
let text = system.messages.muted(display, system.senderNumber || system.senderInfo?.number || system.sender)
if (!system.isBotAdmin) text += '\n\n' + system.messages.mutedNeedsAdmin()
await system.reply(text, { mentions: [info.jid, system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
