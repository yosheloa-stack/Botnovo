import { requireTarget } from '../../funcoes/brincadeiras.js'
import { askDating, cancelDating, endDating, myDating } from '../../funcoes/namoro.js'

export default {name: 'namorar',aliases: ['pediremnamoro', 'cancelar', 'cancelarpedido', 'terminar', 'terminar_namoro', 'minhadupla', 'dupla'],category: 'brincadeira',description: 'Sistema de namoro da Akame adaptado ao Aurora',groupOnly: true,async run(system){
if (['cancelar','cancelarpedido'].includes(system.command)) return cancelDating(system)
if (['terminar','terminar_namoro'].includes(system.command)) return endDating(system)
if (['minhadupla','dupla'].includes(system.command)) return myDating(system)
const target = await requireTarget(system, 'Marque a pessoa que você quer pedir em namoro, responda a mensagem ou use o @.')
if (!target) return
return askDating(system, target)
}
}
