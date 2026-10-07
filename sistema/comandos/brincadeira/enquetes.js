const prefers = [
['Ter Wi-Fi perfeito para sempre', 'Ter bateria infinita no celular'],
['Viajar para o passado', 'Viajar para o futuro'],
['Nunca mais sentir sono', 'Nunca mais sentir fome'],
['Ser muito engraçado(a)', 'Ser muito inteligente'],
['Ganhar R$ 10 mil hoje', 'Ter 50% de chance de ganhar R$ 1 milhão'],
['Só poder mandar áudio', 'Só poder mandar texto'],
['Morar na praia', 'Morar nas montanhas'],
['Saber ler pensamentos', 'Ficar invisível quando quiser']
]
const never = [
'Eu nunca dormi durante uma ligação.',
'Eu nunca mandei mensagem e me arrependi na mesma hora.',
'Eu nunca fingi que não vi uma mensagem.',
'Eu nunca ri em um momento que não podia.',
'Eu nunca virei a noite jogando.',
'Eu nunca stalkeei alguém por curiosidade.',
'Eu nunca apaguei uma mensagem antes da pessoa ler.',
'Eu nunca coloquei o celular no silencioso para ignorar alguém.'
]

export default {name: 'vab',aliases: ['vcprefere', 'voceprefere', 'eununca'],category: 'brincadeira',description: 'Você prefere e Eu Nunca',groupOnly: true,async run(system){
if (system.command === 'eununca') {
const question = never[Math.floor(Math.random() * never.length)]
return system.send({ type: 'poll', name: question, options: ['Eu nunca', 'Eu já'], selectableCount: 1, allowAddOption: false })
}
const pair = prefers[Math.floor(Math.random() * prefers.length)]
return system.send({ type: 'poll', name: 'Você prefere...', options: pair, selectableCount: 1, allowAddOption: false })
}
}
