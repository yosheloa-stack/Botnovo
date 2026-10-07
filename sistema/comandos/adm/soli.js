import { startSoli } from '../../funcoes/soli.js'
export default {name:'soli',aliases:['soliter'],category:'adm',description:'Mostra solicitação para aceitar/recusar',groupOnly:true,adminOnly:true,botAdminOnly:true,async run(system){return startSoli(system)}}
