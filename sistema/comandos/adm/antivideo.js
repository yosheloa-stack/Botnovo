import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antivideo',aliases: [],category: 'adm',description: 'Ativa/desativa AntiVideo',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiVideo', 'antivideo')
}
}
