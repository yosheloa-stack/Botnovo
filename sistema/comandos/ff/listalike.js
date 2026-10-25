import { autoSystem } from '../../funcoes/auto.js'
import { autolikesDoGrupo } from '../../funcoes/banco.js'
import { modoCliente } from '../../funcoes/cliente.js'

export default {name: 'listalike',aliases: [],category: 'ff',vipOnly: true,description: 'Lista autolikes',async run(system){
const d = await autoSystem.list(system.config)
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffListError())))
let list = d.ids ?? d.lista ?? d.autolikes ?? d.data ?? []
list = Array.isArray(list) ? list : []
// A lista da key tem os IDs de todos os clientes do dono do bot. No grupo
// alugado aparecem só os IDs cadastrados nele.
if (system.noAluguel) {
const meus = new Set(autolikesDoGrupo(modoCliente ? 'bot' : system.from))
list = list.filter((x) => meus.has(String(x?.uid ?? x?.id ?? x).replace(/\D/g, '')))
}
await system.reply(system.messages.ffList(list))
}
}
