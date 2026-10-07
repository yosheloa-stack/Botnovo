import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'

export default {name:'menufig',aliases:['menufigs', 'menufigurinha', 'menufigurinhas'],category:'geral',description:'Menu de figurinhas',async run(system){
return sendMenu(system, menus.fig(...menuData(system)))
}
}
