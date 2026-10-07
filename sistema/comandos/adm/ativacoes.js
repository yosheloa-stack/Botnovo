import { sendActivationList } from '../../funcoes/botoes.js'

export default {name: 'ativacoes',aliases: ['ativar', 'configurar'],category: 'adm',description: 'Lista interativa das ativações do grupo',groupOnly: true,adminOnly: true,async run(system){
const sent = await sendActivationList(system)
if (!sent) await system.reply(`- ⚙️ Os botões estão desativados. Use os comandos com *1* para ativar e *0* para desativar.`)
}
}
