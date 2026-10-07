import { quotedInfo } from '../../funcoes/mensagem.js'

export default {name: 'msg',aliases: ['editarmensagem', 'editmsg'],category: 'adm',description: 'Edita uma mensagem enviada pelo Aurora',groupOnly: true,adminOnly: true,async run(system){
const quoted = quotedInfo(system.event)
if (!quoted) return system.reply(`❌ Responda em uma mensagem enviada pelo Aurora.\n\nExemplo: *${system.prefix}msg novo texto*`)
if (!system.q) return system.reply(`❌ Digite o novo texto.\n\nExemplo: *${system.prefix}msg novo texto*`)

try {
await system.client.message.send(system.from, system.q, {
editKey: {
id: quoted.id,
...(quoted.participant ? { participant: quoted.participant } : {})
}
})
} catch {
return system.reply('❌ Só é possível editar uma mensagem que foi enviada pelo próprio Aurora e que ainda pode ser editada.')
}
}
}
