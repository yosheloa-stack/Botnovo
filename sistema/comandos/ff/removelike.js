import { autoSystem } from '../../funcoes/auto.js'
import { autolikesDoGrupo, delAutolikeGrupo, getIdiomaGrupo } from '../../funcoes/banco.js'

const deOutroGrupo = { pt: 'Esse ID não foi cadastrado neste grupo.', es: 'Ese ID no fue registrado en este grupo.', en: 'This ID was not registered in this group.' }

export default {name: 'removelike',aliases: [],category: 'ff',vipOnly: true,description: 'Remove ID do autolike',async run(system){
const uid = system.args[0]
if (!uid) return system.reply(system.messages.ffRemoveUsage(system.prefix))
// No grupo alugado só sai o ID que foi cadastrado nele (a key é do dono do bot).
if (system.noAluguel && !autolikesDoGrupo(system.from).includes(String(uid).replace(/\D/g, ''))) {
return system.reply(system.messages.apiError(deOutroGrupo[getIdiomaGrupo(system.from)] || deOutroGrupo.pt))
}
const d = await autoSystem.remove(system.config, uid)
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffRemoveError())))
if (system.isGroup) delAutolikeGrupo(system.from, d.uid ?? uid)
await system.reply(system.messages.ffRemoved(d.uid ?? uid))
}
}
