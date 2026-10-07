import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'autoban',aliases: [],category: 'adm',description: 'Ativa/desativa AutoBan',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'autoBan', 'autoban')
}
}
