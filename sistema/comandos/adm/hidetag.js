import { participantIdentity } from '../../funcoes/jid.js'

export default {name: 'hidetag',aliases: ['totag'],category: 'adm',description: 'Marca todos sem listar números',groupOnly: true,adminOnly: true,async run(system){
const meta = system.metadata ?? await system.client.group.queryGroupMetadata(system.from)
const jids = [...new Set((meta?.participants ?? []).map(participantIdentity).map((x) => x.jid).filter(Boolean))]
if (!jids.length) return system.reply(system.messages.noMembers())
const text = system.q || system.messages.tagDefault()
await system.send({ type: 'text', text }, system.from, { mentions: jids })
}
}
