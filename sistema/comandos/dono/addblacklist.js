import { addListaNegra, lembrarLid, numeroDoLid } from '../../funcoes/banco.js'
import { lerNumeros, numerosProtegidos } from '../../funcoes/listaNegra.js'

// Descobre o LID dos números novos (grupo com LID só manda o código da pessoa),
// pra entrada ser reconhecida na hora. Se o WhatsApp demorar, segue sem.
async function conhecerLids(client, numeros) {
  if (!numeros.length || typeof client?.profile?.getLidsByPhoneNumbers !== 'function') return
  try {
    const r = await Promise.race([
      client.profile.getLidsByPhoneNumbers(numeros),
      new Promise((_, nao) => setTimeout(() => nao(new Error('demorou')), 5_000))
    ])
    for (const x of r || []) if (x?.exists && x.lidJid) lembrarLid(x.lidJid, x.phoneJid || x.queriedJid)
  } catch {}
}

export default {name: 'addblacklist',aliases: ['addlistanegra', 'addbl', 'listanegraadd'],category: 'dono',description: 'Põe números na lista negra (o bot remove na hora quando entram no grupo)',ownerOnly: true,async run(system){
const { numeros: digitados, motivo } = lerNumeros(system.args || [])
let numeros = digitados
let alvoNoGrupo = ''
if (!numeros.length) {
  // Sem número digitado: vale marcação ou resposta à mensagem da pessoa.
  const info = system.targetInfo?.() || {}
  const n = info.number || (info.lidJid ? numeroDoLid(info.lidJid) : '')
  if (!info.jid) return system.reply(`- 🧩 Use: *${system.prefix}addblacklist número* (com DDI, pode mandar vários) ou marque/responda a pessoa no grupo.\n- Ex.: *${system.prefix}addblacklist 5521988887777 golpista*`)
  if (!n) return system.reply(system.messages?.phoneUnavailable?.() || '- ⚠️ Não consegui ver o número dessa pessoa. Mande o número com DDI.')
  if (info.lidJid) lembrarLid(info.lidJid, n)
  numeros = [n]
  alvoNoGrupo = info.jid
}

const protegidos = numerosProtegidos(system.config, system.client)
const ok = [], ja = [], invalido = [], recusado = []
for (const n of numeros) {
  if (protegidos.has(n)) { recusado.push(n); continue }
  const r = addListaNegra(n, motivo)
  if (r === 'ok') ok.push(n)
  else if (r === 'ja') ja.push(n)
  else invalido.push(n)
}
await conhecerLids(system.client, ok)

// Marcou alguém dentro do grupo: já tira de lá agora.
let removido = false
if (alvoNoGrupo && ok.length && system.isGroup && system.isBotAdmin) {
  try { await system.client.group.removeParticipants(system.from, [alvoNoGrupo]); removido = true } catch {}
}

const linhas = []
if (ok.length) linhas.push(`- 🚫 Na lista negra: ${ok.join(', ')}${motivo ? `\n- 📝 Motivo: ${motivo}` : ''}\n- Se entrar em qualquer grupo onde eu sou ADM, eu removo na hora.`)
if (removido) linhas.push('- 👢 Já removi do grupo.')
if (ja.length) linhas.push(`- ⚠️ Já estava na lista: ${ja.join(', ')}`)
if (recusado.length) linhas.push(`- 🔒 Não dá pra pôr o dono, um subdono ou o número do bot: ${recusado.join(', ')}`)
if (invalido.length) linhas.push(`- ❌ Número inválido: ${invalido.join(', ')} (mande com DDI, ex.: 5521988887777)`)
return system.reply(linhas.join('\n'))
}
}
