import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'soadm',aliases: [],category: 'adm',description: 'Ativa/desativa SoAdm',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'soAdm', 'soadm')
}
}
