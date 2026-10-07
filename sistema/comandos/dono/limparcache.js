import { clearCache } from '../../funcoes/banco.js'
import { clearSoli } from '../../funcoes/soli.js'
export default {name:'limparcache',aliases:['clearcache'],category:'dono',description:'Limpa caches temporários',ownerOnly:true,async run(system){const a=clearCache();const s=clearSoli();return system.reply(`• 🧹 Cache limpo.\n> Grupos em memória: ${a.grupos}\n> Solicitações temporárias: ${s}\n> Banco, sessão e configurações foram preservados.`)}}
