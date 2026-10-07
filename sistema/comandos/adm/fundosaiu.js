import { saveWelcomeMedia } from '../../funcoes/boasvindas.js'

export default {name: 'fundosaiu',aliases: [],category: 'adm',description: 'Define foto ou vídeo/GIF da saída',groupOnly: true,adminOnly: true,async run(system){
return saveWelcomeMedia(system, 'saida')
}
}
