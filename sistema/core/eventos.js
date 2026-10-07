import { ensureGroupState } from '../funcoes/banco.js'
import { sendWelcomeParticipant } from '../funcoes/boasvindas.js'

const entrada = new Set(['add', 'join', 'joined', 'participant_add'])
const saida = new Set(['remove', 'leave', 'left', 'participant_remove'])

export function createGroupHandler({ client, config, necessarios: loadedNecessarios = {} }) {
const necessarios = loadedNecessarios && typeof loadedNecessarios === 'object' ? loadedNecessarios : {}
return async (event) => {
try {
const groupJid = event?.groupJid || ''
if (!groupJid) return

let metadata = null
try { metadata = await client.group.queryGroupMetadata(groupJid) } catch {}
const group = await ensureGroupState(groupJid, { nome: metadata?.subject || 'Grupo' })
if (!group || Number(group.bemVindo) !== 1) return

const action = String(event?.action || '').toLowerCase()
if (!entrada.has(action) && !saida.has(action)) return
const participants = Array.isArray(event?.participants) ? event.participants : []
if (!participants.length) return

for (const participant of participants) {
try {
await sendWelcomeParticipant({
client,
config,
necessarios,
groupJid,
group,
participant,
action: entrada.has(action) ? 'add' : 'remove',
metadata
})
} catch (err) {
console.error('[ AURORA ] Falha no bem-vindo de participante:', err?.message || err)
}
}
} catch (err) {
console.error('[ AURORA ] Erro no bem-vindo:', err?.message || err)
}
}
}
