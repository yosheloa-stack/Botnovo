import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antilink',aliases: [],category: 'adm',description: 'Ativa/desativa AntiLink',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiLink', 'antilink')
}
}
