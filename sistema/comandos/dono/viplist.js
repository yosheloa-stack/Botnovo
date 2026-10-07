export default {name: 'viplist',aliases: ['premlist'],category: 'dono',description: 'Lista usuários VIP',ownerOnly: true,async run(system){
await system.reply(system.messages.vipList(system.db.vip), { mentions: system.db.vip.map((n) => `${String(n).replace(/\D/g, '')}@s.whatsapp.net`) })
}
}
