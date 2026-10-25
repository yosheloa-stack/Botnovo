import { autoSystem } from '../../funcoes/auto.js'
import { autolikesDoGrupo, delAutolikeGrupo, getIdiomaGrupo } from '../../funcoes/banco.js'
import { modoCliente } from '../../funcoes/cliente.js'

const deOutroGrupo = { pt: 'Esse ID não foi cadastrado aqui.', es: 'Ese ID no fue registrado aquí.', en: 'This ID was not registered here.' }

export default {name: 'removelike',aliases: [],category: 'ff',vipOnly: true,description: 'Remove ID do autolike',async run(system){
const uid = system.args[0]
if (!uid) return system.reply(system.messages.ffRemoveUsage(system.prefix))
// No grupo alugado só sai o ID que foi cadastrado nele (a key é do dono do bot).
const lista = modoCliente ? 'bot' : system.from
if (system.noAluguel && !autolikesDoGrupo(lista).includes(String(uid).replace(/\D/g, ''))) {
return system.reply(system.messages.apiError(deOutroGrupo[system.isGroup ? getIdiomaGrupo(system.from) : 'pt'] || deOutroGrupo.pt))
}
const d = await autoSystem.remove(system.config, uid)
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffRemoveError())))
if (modoCliente || system.isGroup) delAutolikeGrupo(lista, d.uid ?? uid)
await system.reply(system.messages.ffRemoved(d.uid ?? uid))
}
}
