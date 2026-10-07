export default {name:'blockuser',aliases:['bloquear'],category:'dono',description:'Bloqueia usuário de usar o bot',ownerOnly:true,async run(system){
 const info=system.targetInfo(); if(!info.jid) return system.reply(system.messages.target()); if(!info.number) return system.reply(system.messages.phoneUnavailable())
 const n=info.number; if(!system.db.blocked.includes(n)) system.db.blocked.push(n); await system.save(); return system.reply(system.messages.userBlocked(n),{mentions:[info.jid]})
}}
