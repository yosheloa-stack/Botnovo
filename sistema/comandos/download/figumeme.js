import figu from '../../funcoes/figu.js'

export default {name:'figumeme',aliases:['figumemes', 'figuengracada', 'figuengracadas'],category:'download',description:'Envia figurinhas de memes pela Tokito APIs',async run(system){
return figu.pack(system, '/api/stickers/figu_engracadas', 'Memes')
}
}
