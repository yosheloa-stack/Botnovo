import { listar } from '../../funcoes/auto600.js'

export default {name: 'listalike600',aliases: ['listautolike600'],category: 'ff',ownerOnly: true,description: 'Ficha dos IDs do AutoLike 300/600 (dono)',async run(system){
await listar(system)
}
}
