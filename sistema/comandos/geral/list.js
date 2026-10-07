import { sendMenuList } from '../../funcoes/botoes.js'

export default {name:'list',aliases:['listmenu', 'menus', 'menulist'],category:'geral',description:'Abre a lista interativa de menus',async run(system){
const sent = await sendMenuList(system)
if (!sent) await system.reply(`- 📋 Use *${system.prefix}menu* para abrir o menu principal.`)
}
}
