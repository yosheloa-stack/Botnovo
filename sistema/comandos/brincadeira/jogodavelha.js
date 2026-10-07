import { requireTarget } from '../../funcoes/brincadeiras.js'
import { startTicTacToe } from '../../funcoes/velha.js'

export default {name: 'jogov',aliases: ['jogodavelha'],category: 'brincadeira',description: 'Jogo da velha da Akame',groupOnly: true,async run(system){
const target = await requireTarget(system, 'Marque junto com o comando o @ do usuário que deseja desafiar...')
if (!target) return
return startTicTacToe(system, target)
}
}
