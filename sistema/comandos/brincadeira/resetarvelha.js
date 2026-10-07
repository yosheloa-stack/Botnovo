import { resetTicTacToe } from '../../funcoes/velha.js'

export default {name: 'resetarvelha',aliases: ['resetavelha', 'resetarv', 'resetav', 'resetvelha', 'rv'],category: 'brincadeira',description: 'Encerra o jogo da velha atual',groupOnly: true,async run(system){
return resetTicTacToe(system)
}
}
