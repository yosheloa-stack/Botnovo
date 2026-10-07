import { actionFailure } from '../../funcoes/acao.js'

export default {name: 'ban',aliases: ['kick'],category: 'adm',description: 'Remove membro',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
const results = await system.client.group.removeParticipants(system.from, [info.jid])
const failed = actionFailure(results)
if (failed) return system.reply(system.messages.participantActionError(failed.code))
await system.reply(system.messages.banned(info.displayJid, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [info.jid, system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
