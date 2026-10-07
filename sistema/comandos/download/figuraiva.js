import figu from '../../funcoes/figu.js'

export default {name:'figuraiva',aliases:['figuriva'],category:'download',description:'Envia figurinhas de raiva pela Tokito APIs',async run(system){
return figu.pack(system, '/api/stickers/figu_raiva', 'Raiva')
}
}
