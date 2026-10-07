import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'

export default {name:'menudono',aliases:[],category:'geral',description:'Menu dono',async run(system){
await sendMenu(system, menus.menudono(...menuData(system)))
}
}
