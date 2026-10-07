import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'anticanal',aliases: [],category: 'adm',description: 'Ativa/desativa AntiCanal',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiCanal', 'anticanal')
}
}
