export default {name: 'revoke',aliases: ['revlinkgp'],category: 'adm',description: 'Redefine link do grupo',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
try {
const result = await system.client.group.revokeInvite(system.from)
const code = result?.code ?? result
if (!code || typeof code !== 'string') return system.reply(system.messages.botAdminAction())
await system.reply(system.messages.groupNewLink(code, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
} catch (err) {
const text = String(err?.message || err)
if (/not-authorized|401|403/i.test(text)) return system.reply(system.messages.botAdminAction())
throw err
}
}
}
