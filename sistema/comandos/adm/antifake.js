import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antifake',aliases: [],category: 'adm',description: 'Ativa/desativa AntiFake',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiFake', 'antifake')
}
}
