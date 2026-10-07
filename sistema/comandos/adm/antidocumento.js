import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antidocumento',aliases: [],category: 'adm',description: 'Ativa/desativa AntiDocumento',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiDocumento', 'antidocumento')
}
}
