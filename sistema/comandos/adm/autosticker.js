import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'autosticker',aliases: [],category: 'adm',description: 'Ativa/desativa AutoSticker',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'autoSticker', 'autosticker')
}
}
