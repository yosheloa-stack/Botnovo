import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'

export default {name: 'menubn',aliases: ['brincadeiras', 'brincadeira'],category: 'geral',description: 'Menu de brincadeiras',groupOnly: true,async run(system){
await sendMenu(system, menus.brincadeiras(...menuData(system)))
}
}
