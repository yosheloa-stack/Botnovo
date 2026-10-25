import { setAluguel } from '../../funcoes/banco.js'
import { marcaCliente, modoCliente } from '../../funcoes/cliente.js'

// No bot da cliente, #rgaluguel sem número libera o grupo até o fim do
// aluguel dela no site.
const diasAteVencer = () => { const ate = Date.parse(marcaCliente()?.expira || ''); return Number.isFinite(ate) ? Math.max(1, Math.ceil((ate - Date.now()) / 86400000)) : 30 }
export default {name:'rgaluguel',aliases:[],category:'dono',description:'Registra aluguel do grupo',ownerOnly:true,groupOnly:true,async run(system){const dias=modoCliente&&!system.args[0]?diasAteVencer():Number(system.args[0]);if(!Number.isFinite(dias)||dias<1)return system.reply(`• Exemplo: *${system.prefix}rgaluguel 30*`);const ate=setAluguel(system.from,dias);return system.reply(`• 🏠 Aluguel registrado por *${Math.floor(dias)} dia(s)*.\n• Até: ${new Date(ate).toLocaleString('pt-BR')}`)}}
