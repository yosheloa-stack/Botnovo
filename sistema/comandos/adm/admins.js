import { participantIdentity } from '../../funcoes/jid.js'

export default {name: 'admins',aliases: [],category: 'adm',description: 'Lista administradores',groupOnly: true,async run(system){
const meta = system.metadata ?? await system.client.group.queryGroupMetadata(system.from)
const admins = (meta.participants ?? []).filter(p => p.isAdmin || p.isSuperAdmin || p.admin).map(participantIdentity)
const mentions = admins.map(p => p.jid).filter(Boolean)
return system.reply(system.messages.admins(admins), { mentions })
}
}
