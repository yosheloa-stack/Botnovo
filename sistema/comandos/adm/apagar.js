import { quotedTarget } from '../../funcoes/mensagem.js'

export default {name: 'apagar',aliases: ['del'],category: 'adm',description: 'Apaga a mensagem marcada',groupOnly: true,adminOnly: true,botAdminOnly: true,async run(system){
const target = quotedTarget(system)
if (!target) return system.reply(`❌ Responda na mensagem que deseja apagar usando *${system.prefix}apagar*.`)

try {
await system.client.message.send(system.from, {
type: 'revoke',
target
})
} catch {
return system.reply('❌ Não consegui apagar essa mensagem. Verifique se o Aurora ainda é administrador.')
}
}
}
