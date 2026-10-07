import { sendRank } from '../../funcoes/brincadeiras.js'

const ranks = {
rankbaiana: ['😴 RANK DAS 5 MAIS BAIANAS DO GRUPO', '%', 'rnkbaiana'],
rankbaianas: ['😴 RANK DAS 5 MAIS BAIANAS DO GRUPO', '%', 'rnkbaiana'],
rankbaiano: ['💤 RANK DOS 5 MAIS BAIANOS DO GRUPO', '%', 'rnkbaiano'],
rankbaianos: ['💤 RANK DOS 5 MAIS BAIANOS DO GRUPO', '%', 'rnkbaiano'],
rankbct: ['📊 RANK BCT DO GRUPO', '%', 'rankbct'],
rankbuceta: ['📊 RANK BCT DO GRUPO', '%', 'rankbct'],
rankbucetudas: ['📊 RANK BCT DO GRUPO', '%', 'rankbct'],
rankbeta: ['😂 RANK DOS 5 MAIS BETAS DO GRUPO', '%', 'rnkbeta'],
rankbetas: ['😂 RANK DOS 5 MAIS BETAS DO GRUPO', '%', 'rnkbeta'],
rankcarioca: ['🌴 RANK DOS 5 MAIS CARIOCAS DO GRUPO', '%', 'rnkcarioca'],
rankcariocas: ['🌴 RANK DOS 5 MAIS CARIOCAS DO GRUPO', '%', 'rnkcarioca'],
rankcasalzin: ['💞 RANK DOS CASAIS DO GRUPO', '%', 'rankcasal'],
rankcasais: ['💞 RANK DOS CASAIS DO GRUPO', '%', 'rankcasal'],
rankcasal: ['💞 RANK DOS CASAIS DO GRUPO', '%', 'rankcasal'],
rankcorno: ['🐂 RANK DOS 5 MAIS CORNOS DO GRUPO', '%', 'rnkcorno'],
rankcornos: ['🐂 RANK DOS 5 MAIS CORNOS DO GRUPO', '%', 'rnkcorno'],
rankcu: ['🍑 RANK CU DO GRUPO', '%', 'rankcu'],
rankfalido: ['💸 RANK DOS 5 MAIS FALIDOS DO GRUPO', '%', 'rankfalido'],
rankfalidos: ['💸 RANK DOS 5 MAIS FALIDOS DO GRUPO', '%', 'rankfalido'],
rankfumar: ['🚬 RANK DOS 5 QUE MAIS FUMAM NA ZOEIRA', '%', 'rnkfumar'],
rankfumantes: ['🚬 RANK DOS 5 QUE MAIS FUMAM NA ZOEIRA', '%', 'rnkfumar'],
rankgado: ['🐮 RANK DOS 5 MAIS GADOS DO GRUPO', '%', 'rnkgado'],
rankgados: ['🐮 RANK DOS 5 MAIS GADOS DO GRUPO', '%', 'rnkgado'],
rankgay: ['🏳️‍🌈 RANK GAY DE ZOEIRA DO GRUPO', '%', 'rnkgay'],
rankgays: ['🏳️‍🌈 RANK GAY DE ZOEIRA DO GRUPO', '%', 'rnkgay'],
rankgostosas: ['😏 RANK DAS 5 MAIS GOSTOSAS DO GRUPO', '%', 'rnkgostosa'],
rankgostosa: ['😏 RANK DAS 5 MAIS GOSTOSAS DO GRUPO', '%', 'rnkgostosa'],
rankgostosos: ['🔥 RANK DOS 5 MAIS GOSTOSOS DO GRUPO', '%', 'rnkgostoso'],
rankgostoso: ['🔥 RANK DOS 5 MAIS GOSTOSOS DO GRUPO', '%', 'rnkgostoso'],
ranklouca: ['🤪 RANK DAS 5 MAIS LOUCAS DO GRUPO', '%', 'rnklouca'],
rankloucas: ['🤪 RANK DAS 5 MAIS LOUCAS DO GRUPO', '%', 'rnklouca'],
ranklouco: ['🤪 RANK DOS 5 MAIS LOUCOS DO GRUPO', '%', 'rnklouco'],
rankloucos: ['🤪 RANK DOS 5 MAIS LOUCOS DO GRUPO', '%', 'rnklouco'],
rankmacaca: ['🐒 RANK MACACA DE ZOEIRA DO GRUPO', '%', 'rnkmacaca'],
rankmacacas: ['🐒 RANK MACACA DE ZOEIRA DO GRUPO', '%', 'rnkmacaca'],
rankmacaco: ['🐒 RANK MACACO DE ZOEIRA DO GRUPO', '%', 'rnkmacaco'],
rankmacacos: ['🐒 RANK MACACO DE ZOEIRA DO GRUPO', '%', 'rnkmacaco'],
ranknazista: ['📊 RANK NAZISTA DE ZOEIRA DO GRUPO', '%', 'rnknazista'],
ranknazistas: ['📊 RANK NAZISTA DE ZOEIRA DO GRUPO', '%', 'rnknazista'],
rankotaku: ['㊙ RANK DOS 5 MAIS OTAKUS DO GRUPO', '%', 'rnkotaku'],
rankotakus: ['㊙ RANK DOS 5 MAIS OTAKUS DO GRUPO', '%', 'rnkotaku'],
rankpau: ['🍆 RANK DOS 5 MAIORES PAUS DO GRUPO', 'cm', 'rnkpau'],
rankputa: ['📊 RANK PUTA DE ZOEIRA DO GRUPO', '%', 'rnkputa'],
rankputas: ['📊 RANK PUTA DE ZOEIRA DO GRUPO', '%', 'rnkputa'],
ranksafada: ['😏 RANK DAS 5 MAIS SAFADAS DO GRUPO', '%', 'rnksafada'],
ranksafadas: ['😏 RANK DAS 5 MAIS SAFADAS DO GRUPO', '%', 'rnksafada'],
ranksafado: ['🥵 RANK DOS 5 MAIS SAFADOS DO GRUPO', '%', 'rnksafado'],
ranksafados: ['🥵 RANK DOS 5 MAIS SAFADOS DO GRUPO', '%', 'rnksafado'],
ranksigma: ['🗿🍷 RANK DOS 5 MAIS SIGMAS DO GRUPO', '%', 'rnksigma'],
ranksigmas: ['🗿🍷 RANK DOS 5 MAIS SIGMAS DO GRUPO', '%', 'rnksigma']
}

export default {name: 'rankbaiana',aliases: Object.keys(ranks).filter((x) => x !== 'rankbaiana'),category: 'brincadeira',description: 'Ranks da Akame com imagens originais',groupOnly: true,async run(system){
const rank = ranks[system.command]
if (!rank) return
return sendRank(system, rank[0], rank[1], rank[2])
}
}
