import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'

export default {name:'menudown',aliases:['menudao', 'menudownload', 'menudownloads'],category:'geral',description:'Menu downloads',async run(system){
await sendMenu(system, menus.downloads(...menuData(system)))
}
}
