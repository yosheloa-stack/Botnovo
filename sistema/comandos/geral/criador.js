export default {name:'criador',aliases:['owner'],category:'geral',description:'Envia o contato do criador',async run(system){
const name = String(system.config?.owner?.name || 'Criador').trim()
const number = String(system.config?.owner?.number || '').replace(/\D/g, '')
if (!number) return system.reply('❌ O número do criador não está configurado no config.json.')

const phone = `+${number}`
const vcard = [
'BEGIN:VCARD',
'VERSION:3.0',
`FN:${name}`,
`TEL;type=CELL;type=VOICE;waid=${number}:${phone}`,
'END:VCARD'
].join('\n')

await system.send({
contactMessage: {
displayName: name,
vcard
}
}, system.from)
}
}
