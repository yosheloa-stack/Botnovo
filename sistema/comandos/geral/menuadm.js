import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'

export default {name:'menuadm',aliases:[],category:'geral',description:'Menu administração',async run(system){
await sendMenu(system, menus.adms(...menuData(system)))
}
}
