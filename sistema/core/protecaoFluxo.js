// Deduplicação de eventos retransmitidos pelo WhatsApp/Zapo.
// Não limita usuários, comandos diferentes ou mensagens legítimas.
const seen = new Map()
const TTL_MS = 120_000
const MAX_ENTRIES = 12_000

export function uniqueIncoming(event) {
  const id = event?.key?.id
  const chat = event?.key?.remoteJid
  if (!id || !chat) return true
  const sender = event?.key?.participant || ''
  const key = chat + ':' + sender + ':' + id
  const now = Date.now()
  if (seen.has(key) && now - seen.get(key) < TTL_MS) return false
  seen.set(key, now)
  if (seen.size > MAX_ENTRIES) {
    for (const [k, timestamp] of seen) {
      if (now - timestamp >= TTL_MS || seen.size > MAX_ENTRIES) seen.delete(k)
      if (seen.size <= MAX_ENTRIES) break
    }
  }
  return true
}
