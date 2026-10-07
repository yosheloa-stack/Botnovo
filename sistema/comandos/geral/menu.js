import menus from '../../menus/menus.js'
import { sendMenu, menuData } from '../../menus/capa.js'
import { sendMenuList } from '../../funcoes/botoes.js'
import { necessarios as getNecessarios } from '../../funcoes/necessarios.js'

export default {name:'menu',aliases:['help', 'menuprincipal'],category:'geral',description:'Menu principal',async run(system){
// menuprincipal sempre abre o menu clássico, mesmo com os botões ligados.
if (system.command === 'menuprincipal') {
return sendMenu(system, menus.menuPrincipal(...menuData(system)))
}

// Consulta a configuração central atual para o comando !menu responder
// imediatamente ao !botoes 1/0, sem depender de um estado antigo.
const flags = getNecessarios()
system.necessarios = flags

if (flags.botoes === true) {
const sent = await sendMenuList(system)
if (sent) return
}

// Botões desligados (ou falha no Menu List): abre o menu principal normal.
return sendMenu(system, menus.menuPrincipal(...menuData(system)))
}
}
