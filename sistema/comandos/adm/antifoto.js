import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antifoto',aliases: [],category: 'adm',description: 'Ativa/desativa AntiFoto',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiFoto', 'antifoto')
}
}
