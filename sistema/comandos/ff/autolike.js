import { autoSystem } from '../../funcoes/auto.js'
import { addAutolikeGrupo } from '../../funcoes/banco.js'
import { modoCliente } from '../../funcoes/cliente.js'

export default {name: 'autolike',aliases: [],category: 'ff',vipOnly: true,description: 'Adiciona ID ao autolike',async run(system){
if (!system.args[0]) return system.reply(system.messages.ffAutoUsage(system.prefix))
const uid = system.args.shift()
const options = {}
for (const item of system.args) {
const [key, value] = item.split(' = ')
if (['likes', 'dias', 'qtd'].includes(key) && value) options[key] = value
}
const d = await autoSystem.add(system.config, uid, options)
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffAutoError())))
// No grupo alugado o ID fica anotado: é o que o cliente vai ver no #listalike.
// No bot da cliente a lista é uma só, do bot inteiro.
if (modoCliente) addAutolikeGrupo('bot', d.uid ?? uid)
else if (system.isGroup) addAutolikeGrupo(system.from, d.uid ?? uid)
await system.reply(system.messages.ffAuto(d, uid))
}
}
