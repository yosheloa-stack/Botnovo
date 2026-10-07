import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antistatus',aliases: [],category: 'adm',description: 'Ativa/desativa AntiStatus',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiStatus', 'antistatus')
}
}
