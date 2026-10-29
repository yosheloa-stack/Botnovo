import { esquecerAurora } from '../../funcoes/aurora/index.js'

export default {name: 'esquecer',aliases: [],category: 'geral',description: 'Apaga o que a Aurora lembra da sua conversa',async run(system){
esquecerAurora(system)
return system.reply('pronto, esqueci tudo que a gente conversou 🫥')
}
}
