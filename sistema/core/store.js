import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { serialize, deserialize } from 'node:v8'
import {
WaAppStateMemoryStore
} from 'zapo-js/store'

const cleanId = (value = 'aurora') => String(value).replace(/[^a-zA-Z0-9._-]/g, '_') || 'aurora'
const addressKey = (address = {}) => `${address.user ?? ''}|${address.server ?? 's.whatsapp.net'}|${address.device ?? 0}`

class DiskFile {
constructor(file, fallback) {
this.file = file
this.fallback = fallback
this.queue = Promise.resolve()
fs.mkdirSync(path.dirname(file), { recursive: true })
}

load() {
try {
if (!fs.existsSync(this.file)) return structuredClone(this.fallback)
return deserialize(fs.readFileSync(this.file))
} catch {
return structuredClone(this.fallback)
}
}

save(value) {
const data = serialize(value)
const file = this.file
const temp = `${file}.tmp`
this.queue = this.queue.then(async () => {
await fsp.mkdir(path.dirname(file), { recursive: true })
await fsp.writeFile(temp, data, { mode: 0o600 })
await fsp.rename(temp, file)
try { await fsp.chmod(file, 0o600) } catch {}
})
return this.queue
}

flush() {
return this.queue
}
}

class FileAuthStore {
constructor(file) {
this.disk = new DiskFile(file, null)
this.credentials = this.disk.load()
}
async load() { return this.credentials }
async save(credentials) { this.credentials = credentials; await this.disk.save(this.credentials) }
async clear() { this.credentials = null; await this.disk.save(null) }
async destroy() { await this.disk.flush() }
}

class FileSignalStore {
constructor(file) {
this.disk = new DiskFile(file, { registrationInfo: null, signedPreKey: null, rotationTs: null })
this.state = this.disk.load()
}
async getRegistrationInfo() { return this.state.registrationInfo ?? null }
async setRegistrationInfo(info) { this.state.registrationInfo = info; await this.disk.save(this.state) }
async getSignedPreKey() { return this.state.signedPreKey ?? null }
async setSignedPreKey(record) { this.state.signedPreKey = record; await this.disk.save(this.state) }
async getSignedPreKeyById(keyId) { const r = this.state.signedPreKey; return r?.keyId === keyId ? r : null }
async setSignedPreKeyRotationTs(value) { this.state.rotationTs = value ?? null; await this.disk.save(this.state) }
async getSignedPreKeyRotationTs() { return this.state.rotationTs ?? null }
async clear() { this.state = { registrationInfo: null, signedPreKey: null, rotationTs: null }; await this.disk.save(this.state) }
async destroy() { await this.disk.flush() }
}

class FilePreKeyStore {
constructor(file) {
this.disk = new DiskFile(file, { records: [], uploaded: [], serverHasPreKeys: false, nextPreKeyId: 1 })
const state = this.disk.load()
this.records = new Map((state.records ?? []).map((r) => [r.keyId, r]))
this.uploaded = new Set(state.uploaded ?? [])
this.serverHasPreKeys = Boolean(state.serverHasPreKeys)
this.nextPreKeyId = Number.isSafeInteger(state.nextPreKeyId) ? state.nextPreKeyId : 1
for (const keyId of this.records.keys()) if (keyId >= this.nextPreKeyId) this.nextPreKeyId = keyId + 1
}
snapshot() { return { records: [...this.records.values()], uploaded: [...this.uploaded], serverHasPreKeys: this.serverHasPreKeys, nextPreKeyId: this.nextPreKeyId } }
persist() { return this.disk.save(this.snapshot()) }
async putPreKey(record) { this.records.set(record.keyId, record); if (record.keyId >= this.nextPreKeyId) this.nextPreKeyId = record.keyId + 1; await this.persist() }
async getOrGenPreKeys(count, generator) {
if (!Number.isSafeInteger(count) || count <= 0) throw new Error(`invalid prekey count: ${count}`)
const available = [...this.records.values()].filter((r) => !this.uploaded.has(r.keyId)).sort((a, b) => a.keyId - b.keyId).slice(0, count)
while (available.length < count) {
const record = await generator(this.nextPreKeyId++)
this.records.set(record.keyId, record)
available.push(record)
}
await this.persist()
return available
}
async getPreKeyById(keyId) { return this.records.get(keyId) ?? null }
async getPreKeysById(keyIds) { return keyIds.map((id) => this.records.get(id) ?? null) }
async consumePreKeyById(keyId) { const record = this.records.get(keyId) ?? null; if (!record) return null; this.records.delete(keyId); this.uploaded.delete(keyId); await this.persist(); return record }
async getOrGenSinglePreKey(generator) { return (await this.getOrGenPreKeys(1, generator))[0] }
async markKeyAsUploaded(keyId) {
if (keyId < 0 || keyId >= this.nextPreKeyId) throw new Error(`prekey ${keyId} is out of boundary`)
for (const id of this.records.keys()) if (id <= keyId) this.uploaded.add(id)
await this.persist()
}
async setServerHasPreKeys(value) { this.serverHasPreKeys = Boolean(value); await this.persist() }
async getServerHasPreKeys() { return this.serverHasPreKeys }
async clear() { this.records.clear(); this.uploaded.clear(); this.serverHasPreKeys = false; this.nextPreKeyId = 1; await this.persist() }
async destroy() { await this.disk.flush() }
}

class FileSessionStore {
constructor(file) {
this.disk = new DiskFile(file, [])
this.sessions = new Map((this.disk.load() ?? []).map((x) => [addressKey(x.address), x]))
}
persist() { return this.disk.save([...this.sessions.values()]) }
async hasSession(address) { return this.sessions.has(addressKey(address)) }
async hasSessions(addresses) { return addresses.map((a) => this.sessions.has(addressKey(a))) }
async getSession(address) { return this.sessions.get(addressKey(address))?.session ?? null }
async getSessionsBatch(addresses) { return addresses.map((a) => this.sessions.get(addressKey(a))?.session ?? null) }
async setSession(address, session) { this.sessions.set(addressKey(address), { address, session }); await this.persist() }
async setSessionsBatch(entries) { for (const entry of entries) this.sessions.set(addressKey(entry.address), entry); await this.persist() }
async deleteSession(address) { this.sessions.delete(addressKey(address)); await this.persist() }
async clear() { this.sessions.clear(); await this.persist() }
async destroy() { await this.disk.flush() }
}

class FileIdentityStore {
constructor(file) {
this.disk = new DiskFile(file, [])
this.identities = new Map((this.disk.load() ?? []).map((x) => [addressKey(x.address), x]))
}
persist() { return this.disk.save([...this.identities.values()]) }
async getRemoteIdentity(address) { return this.identities.get(addressKey(address))?.identityKey ?? null }
async getRemoteIdentities(addresses) { return addresses.map((a) => this.identities.get(addressKey(a))?.identityKey ?? null) }
async setRemoteIdentity(address, identityKey) { this.identities.set(addressKey(address), { address, identityKey }); await this.persist() }
async setRemoteIdentities(entries) { for (const entry of entries) this.identities.set(addressKey(entry.address), entry); await this.persist() }
async clear() { this.identities.clear(); await this.persist() }
async destroy() { await this.disk.flush() }
}

class FileSenderKeyStore {
constructor(file) {
this.disk = new DiskFile(file, { keys: [], distributions: [] })
const state = this.disk.load()
this.keys = new Map((state.keys ?? []).map((r) => [this.makeKey(r.groupId, r.sender), r]))
this.distributions = new Map((state.distributions ?? []).map((r) => [this.makeKey(r.groupId, r.sender), r]))
}
makeKey(groupId, sender) { return `${groupId}|${addressKey(sender)}` }
snapshot() { return { keys: [...this.keys.values()], distributions: [...this.distributions.values()] } }
persist() { return this.disk.save(this.snapshot()) }
async upsertSenderKey(record) { this.keys.set(this.makeKey(record.groupId, record.sender), record); await this.persist() }
async upsertSenderKeyDistribution(record) { this.distributions.set(this.makeKey(record.groupId, record.sender), record); await this.persist() }
async upsertSenderKeyDistributions(records) { for (const record of records) this.distributions.set(this.makeKey(record.groupId, record.sender), record); await this.persist() }
async getGroupSenderKeyList(groupId) { return { skList: [...this.keys.values()].filter((r) => r.groupId === groupId), skDistribList: [...this.distributions.values()].filter((r) => r.groupId === groupId) } }
async getDeviceSenderKey(groupId, sender) { return this.keys.get(this.makeKey(groupId, sender)) ?? null }
async getDeviceSenderKeyDistributions(groupId, senders) { return senders.map((sender) => this.distributions.get(this.makeKey(groupId, sender)) ?? null) }
deleteMatching(map, target, groupId) {
let deleted = 0
const targetKey = addressKey(target)
for (const [key, record] of map) {
if ((!groupId || record.groupId === groupId) && addressKey(record.sender) === targetKey) { map.delete(key); deleted++ }
}
return deleted
}
async deleteDeviceSenderKey(target, groupId) { const n = this.deleteMatching(this.keys, target, groupId) + this.deleteMatching(this.distributions, target, groupId); if (n) await this.persist(); return n }
async markForgetSenderKey(groupId, participants) { let n = 0; for (const p of participants) n += this.deleteMatching(this.keys, p, groupId) + this.deleteMatching(this.distributions, p, groupId); if (n) await this.persist(); return n }
async clear() { this.keys.clear(); this.distributions.clear(); await this.persist() }
async destroy() { await this.disk.flush() }
}

class FileAppStateStore {
constructor(file) {
this.disk = new DiskFile(file, { keys: [], collections: {} })
this.mem = new WaAppStateMemoryStore(this.disk.load())
}
async persist() { await this.disk.save(await this.mem.exportData()) }
async exportData() { return this.mem.exportData() }
async upsertSyncKeys(keys) { const n = await this.mem.upsertSyncKeys(keys); if (n) await this.persist(); return n }
async getSyncKeysBatch(ids) { return this.mem.getSyncKeysBatch(ids) }
async getSyncKeyData(id) { return this.mem.getSyncKeyData(id) }
async getSyncKeyDataBatch(ids) { return this.mem.getSyncKeyDataBatch(ids) }
async getActiveSyncKey() { return this.mem.getActiveSyncKey() }
async getCollectionState(collection) { return this.mem.getCollectionState(collection) }
async getCollectionStates(collections) { return this.mem.getCollectionStates(collections) }
async setCollectionStates(updates) { await this.mem.setCollectionStates(updates); await this.persist() }
async clear() { await this.mem.clear(); await this.persist() }
async destroy() { await this.disk.flush() }
}

class FilePrivacyTokenStore {
constructor(file) {
this.disk = new DiskFile(file, [])
this.records = new Map((this.disk.load() ?? []).map((r) => [r.jid, r]))
}
persist() { return this.disk.save([...this.records.values()]) }
merge(existing, incoming) { return { jid: incoming.jid, tcToken: incoming.tcToken ?? existing.tcToken, tcTokenTimestamp: incoming.tcTokenTimestamp ?? existing.tcTokenTimestamp, tcTokenSenderTimestamp: incoming.tcTokenSenderTimestamp ?? existing.tcTokenSenderTimestamp, nctSalt: incoming.nctSalt ?? existing.nctSalt, updatedAtMs: incoming.updatedAtMs } }
async upsert(record) { this.records.set(record.jid, this.records.has(record.jid) ? this.merge(this.records.get(record.jid), record) : record); await this.persist() }
async upsertBatch(records) { for (const record of records) this.records.set(record.jid, this.records.has(record.jid) ? this.merge(this.records.get(record.jid), record) : record); await this.persist() }
async getByJid(jid) { return this.records.get(jid) ?? null }
async deleteByJid(jid) { const n = this.records.delete(jid) ? 1 : 0; if (n) await this.persist(); return n }
async clear() { this.records.clear(); await this.persist() }
async destroy() { await this.disk.flush() }
}

export function createFileStore(root = 'sistema/dados/sessao') {
const domainFile = (sessionId, domain) => path.resolve(root, cleanId(sessionId), `${domain}.bin`)
return {
stores: {
auth: (id) => new FileAuthStore(domainFile(id, 'auth')),
signal: (id) => new FileSignalStore(domainFile(id, 'signal')),
preKey: (id) => new FilePreKeyStore(domainFile(id, 'prekey')),
session: (id) => new FileSessionStore(domainFile(id, 'session')),
identity: (id) => new FileIdentityStore(domainFile(id, 'identity')),
senderKey: (id) => new FileSenderKeyStore(domainFile(id, 'senderkey')),
appState: (id) => new FileAppStateStore(domainFile(id, 'appstate')),
privacyToken: (id) => new FilePrivacyTokenStore(domainFile(id, 'privacy'))
},
caches: {}
}
}
