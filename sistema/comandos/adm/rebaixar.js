import { actionFailure } from '../../funcoes/acao.js'

export default {name: 'rebaixar',aliases: ['demote'],category: 'adm',description: 'Rebaixa admin',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
const info = system.targetInfo()
if (!info.jid) return system.reply(system.messages.target())
const results = await system.client.group.demoteParticipants(system.from, [info.jid])
const failed = actionFailure(results)
if (failed) return system.reply(system.messages.participantActionError(failed.code))
await system.reply(system.messages.demoted(info.displayJid, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [info.jid, system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
