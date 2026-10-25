import { getIdiomaGrupo } from '../../funcoes/banco.js'
import { marcaDoGrupo } from '../../funcoes/marcaAluguel.js'
import { modoCliente } from '../../funcoes/cliente.js'

const ROTULO = { pt: 'Dono do bot', es: 'Dueño del bot', en: 'Bot owner' }

function contato(system, name, number) {
const vcard = [
'BEGIN:VCARD',
'VERSION:3.0',
`FN:${name}`,
`TEL;type=CELL;type=VOICE;waid=${number}:+${number}`,
'END:VCARD'
].join('\n')
return system.send({ contactMessage: { displayName: name, vcard } }, system.from)
}

export default {name:'criador',aliases:['owner'],category:'geral',description:'Envia o contato do criador',async run(system){
// Grupo alugado: o "criador" é quem alugou (número cadastrado no site).
// Nunca o contato do dono do bot. No bot da cliente vale também no privado.
const marca = system.isGroup || modoCliente ? marcaDoGrupo(system.from) : null
if (marca) {
const rotulo = ROTULO[system.isGroup ? getIdiomaGrupo(system.from) : marca.idioma] || ROTULO.pt
if (!marca.dono) return system.reply(`👑 *${marca.nome}*`)
return contato(system, marca.donoNome || `${rotulo} • ${marca.nome}`, marca.dono)
}

const name = String(system.config?.owner?.name || 'Criador').trim()
const number = String(system.config?.owner?.number || '').replace(/\D/g, '')
if (!number) return system.reply('❌ O número do criador não está configurado no config.json.')
return contato(system, name, number)
}
}
