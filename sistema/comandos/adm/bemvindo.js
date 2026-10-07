import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'bemvindo',aliases: [],category: 'adm',description: 'Ativa/desativa BemVindo',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'bemVindo', 'bemvindo')
}
}
