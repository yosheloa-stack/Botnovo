import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'

export default {name:'menuff',aliases:[],category:'geral',description:'Menu Free Fire',async run(system){
await sendMenu(system, menus.menuff(...menuData(system)))
}
}
