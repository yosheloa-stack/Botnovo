import { autoSystem } from '../../funcoes/auto.js'
import { consumirCotaFF, devolverCotaFF } from '../../funcoes/banco.js'

export default {name: 'like',aliases: [],category: 'ff',vipOnly: false,description: 'Envia likes',async run(system){
const uid = system.args[0]
if (!uid) return system.reply(system.messages.ffLikeUsage(system.prefix))
// Limite do #configurarff (por pessoa/dia, deste bot, neste grupo). O dono do
// bot e quem alugou o grupo não contam.
const conta = Boolean(system.isGroup && system.command === 'like' && !system.isOwner && !system.isDonoAluguel && system.senderKey)
if (conta) {
const cota = consumirCotaFF(system.from, system.senderKey)
if (!cota.ok) return system.reply('🎮 Seu limite diário de *' + cota.limite + ' IDs* acabou neste grupo. Volte amanhã.')
}
let d
try { d = await autoSystem.like(system.config, uid, system.args[1]) } catch (err) { if (conta) devolverCotaFF(system.from, system.senderKey); throw err }
// Não entrou nada: não gasta a vaga da pessoa.
if (conta && (!d.sucesso || Number(d.likes_enviados) === 0)) devolverCotaFF(system.from, system.senderKey)
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffLikeError())))
await system.reply(system.messages.ffLike(d, uid, system.erroApi(d.aviso, '')))
}
}
