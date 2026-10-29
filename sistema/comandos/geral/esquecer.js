import { esquecerAurora } from '../../funcoes/aurora/index.js'
import { modoCliente } from '../../funcoes/cliente.js'

export default {name: 'esquecer',aliases: [],category: 'geral',description: 'Apaga o que a Aurora lembra da sua conversa',async run(system){
if (modoCliente) return system.reply('Comando indisponível neste bot.')
esquecerAurora(system)
return system.reply('pronto, esqueci tudo que a gente conversou 🫥')
}
}
