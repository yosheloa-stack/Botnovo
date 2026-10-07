import { getHoras, markHora } from './banco.js'
import { verifiedSendOptions } from './meta.js'
import { necessarios } from './necessarios.js'

const format = new Map()
function formatter(timeZone) {
if (!format.has(timeZone)) {
format.set(timeZone, new Intl.DateTimeFormat('en-CA', {
timeZone,
year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'
}))
}
return format.get(timeZone)
}

function localNow(timeZone='America/Sao_Paulo') {
const d = new Date()
const parts = Object.fromEntries(formatter(timeZone).formatToParts(d).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]))
return { date:`${parts.year}-${parts.month}-${parts.day}`, time:`${parts.hour}:${parts.minute}` }
}

async function executar(client, row, action, now) {
const stamp = `${now.date}|${action}|${now.time}`
if (row.last === stamp) return
try {
await client.group.setSetting(row.gp, 'announcement', action === 'fechar')
markHora(row.gp, stamp)
const text = action === 'fechar'
? '• 🔒 Grupo fechado no horário programado.'
: '• 🔓 Grupo aberto no horário programado.'
await client.message.send(
row.gp,
{ type:'text', text },
verifiedSendOptions(necessarios()?.verificado === true, row.gp, 'Aurora System')
).catch(()=>{})
} catch(err) {
console.error('[ AURORA ] Horário:', err?.message || err)
}
}

export async function runHora(client, config={}) {
const now = localNow(config.timezone || 'America/Sao_Paulo')
const tarefas = []
for (const row of getHoras()) {
let action = ''
if (row.fechar === now.time) action = 'fechar'
else if (row.abrir === now.time) action = 'abrir'
if (!action) continue
const stamp = `${now.date}|${action}|${now.time}`
if (row.last === stamp) continue
tarefas.push(executar(client, row, action, now))
}
if (tarefas.length) await Promise.allSettled(tarefas)
}
