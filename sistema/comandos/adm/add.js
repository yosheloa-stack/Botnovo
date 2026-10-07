import { actionFailure } from '../../funcoes/acao.js'

export default {name: 'add',aliases: [],category: 'adm',description: 'Adiciona membro',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
const target = system.userJid(system.args[0])
if (!target) return system.reply(system.messages.target())
const results = await system.client.group.addParticipants(system.from, [target])
const failed = actionFailure(results)
if (failed) return system.reply(system.messages.participantActionError(failed.code))
const info = system.resolveIdentity(target)
const display = info.number || String(target).split('@')[0]
await system.reply(system.messages.added(display, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [target, system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
}
