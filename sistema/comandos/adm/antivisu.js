import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antivisu',aliases: [],category: 'adm',description: 'Apaga mídias de visualização única',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiVisu', 'antivisu')
}
}
