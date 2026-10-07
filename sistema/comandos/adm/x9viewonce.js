import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'x9viewonce',aliases: ['x9view'],category: 'adm',description: 'Permite somente mídia em visualização única',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'x9ViewOnce', 'x9viewonce')
}
}
