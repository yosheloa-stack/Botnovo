import { toggleGroup } from '../../funcoes/toggle.js'

export default {name: 'antiaudio',aliases: [],category: 'adm',description: 'Ativa/desativa AntiAudio',groupOnly: true,adminOnly: true,async run(system){
return toggleGroup(system, 'antiAudio', 'antiaudio')
}
}
