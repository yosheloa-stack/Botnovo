import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antisticker',aliases: [],category: 'adm',description: 'Ativa/desativa AntiSticker',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiSticker', 'antisticker')
}
}
