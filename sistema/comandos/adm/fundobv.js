import { saveWelcomeMedia } from '../../funcoes/boasvindas.js'

export default {name: 'fundobv',aliases: [],category: 'adm',description: 'Define foto ou vídeo/GIF do bem-vindo',groupOnly: true,adminOnly: true,async run(system){
return saveWelcomeMedia(system, 'entrada')
}
}
