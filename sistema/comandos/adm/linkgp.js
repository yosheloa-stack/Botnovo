export default {name: 'linkgp',aliases: ['linkgrupo'],category: 'adm',description: 'Mostra link do grupo',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
try {
const code = await system.client.group.queryInviteCode(system.from)
if (!code || typeof code !== 'string') return system.reply(system.messages.botAdminInvite())
await system.reply(system.messages.groupLink(code))
} catch (err) {
const text = String(err?.message || err)
if (/group\.queryInviteCode|iq failed|not-authorized|401|403/i.test(text)) {
return system.reply(system.messages.botAdminInvite())
}
throw err
}
}
}
