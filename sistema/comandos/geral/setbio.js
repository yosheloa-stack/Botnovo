export default {name:'setbio',aliases:['bio'],category:'geral',description:'Edita a bio do perfil no Aurora',async run(system){
const value = String(system.q || '').trim()
if (!value) return system.reply(system.messages.bioUsage(system.prefix))
if (!system.profile) return system.reply(system.messages.commandError())
const clear = ['apagar', 'limpar', 'remover', 'reset'].includes(value.toLowerCase())
const bio = clear ? 'Sem bio definida.' : value.replace(/\s+/g, ' ').slice(0, 160)
system.profile.bio = bio
system.profile.lastSeen = new Date().toISOString()
await system.save()
return system.reply(system.messages.bioSaved(bio))
}
}
