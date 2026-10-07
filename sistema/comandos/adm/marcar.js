import { participantIdentity } from '../../funcoes/jid.js'

export default {name: 'marcar',aliases: [],category: 'adm',description: 'Marca membros do grupo',groupOnly: true,adminOnly: true,async run(system){
const meta = system.metadata ?? await system.client.group.queryGroupMetadata(system.from)
const users = (meta.participants ?? []).map(participantIdentity).filter((x) => x.jid)
const jids = [...new Set(users.map((x) => x.jid))]
const text = system.q || users.map((x) => x.display).filter(Boolean).join(' ')
await system.send({ type: 'text', text }, system.from, { mentions: jids })
}
}
