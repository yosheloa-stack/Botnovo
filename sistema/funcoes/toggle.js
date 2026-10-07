import { sendToggleButtons } from './botoes.js'
export function parseToggle(value) {
const raw = String(value ?? '').trim().toLowerCase()
if (['1', 'on', 'true', 'ativar', 'ligar'].includes(raw)) return 1
if (['0', 'off', 'false', 'desativar', 'desligar'].includes(raw)) return 0
return null
}

export async function toggleGroup(system, key, label) {
const value = parseToggle(system.args[0])
if (value === null) {
const sent = await sendToggleButtons(system, {
key,
command: label,
current: system.group?.[key] ?? 0
})
if (sent) return
return system.reply(system.messages.toggleUsage(system.prefix, label))
}
system.group[key] = value
await (system.saveGroup?.() ?? system.save())
return system.reply(system.messages.toggleResult(label, value, system.senderNumber || system.senderInfo?.number || system.sender), { mentions: [system.senderInfo?.pnJid || system.senderInfo?.jid || system.sender] })
}
