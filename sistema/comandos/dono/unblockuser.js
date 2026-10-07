export default {name:'unblockuser',aliases:['desbloquear'],category:'dono',description:'Desbloqueia usuário no bot',ownerOnly:true,async run(system){
 const info=system.targetInfo(); if(!info.jid) return system.reply(system.messages.target()); if(!info.number) return system.reply(system.messages.phoneUnavailable())
 const n=info.number; system.db.blocked=system.db.blocked.filter(x=>x!==n); await system.save(); return system.reply(system.messages.userUnblocked(n),{mentions:[info.jid]})
}}
