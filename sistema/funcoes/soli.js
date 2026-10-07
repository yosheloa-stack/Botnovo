const flow = new Map()
const key = (s) => `${s.from}|${s.senderKey}`

function jidOf(r) {
  if (typeof r === 'string') return r
  return r?.jid || r?.participant || r?.user || r?.requesterJid || r?.attrs?.jid || ''
}
function whenOf(r) { return Number(r?.requestTime || r?.request_time || r?.requestedAt || r?.attrs?.request_time || 0) }
function view(jid='') { return jid ? `@${String(jid).split('@')[0]}` : 'Usuário' }

export async function startSoli(system) {
  const rows = await system.client.group.queryMembershipApprovalRequests(system.from)
  const reqs = (Array.isArray(rows) ? rows : []).map(r => ({ jid:jidOf(r), at:whenOf(r) })).filter(r=>r.jid)
  if (!reqs.length) { flow.delete(key(system)); return system.reply('• 👥 Não há solicitações pendentes neste grupo.') }
  flow.set(key(system), { items:reqs, pos:0, at:Date.now() })
  return show(system)
}

async function show(system) {
  const s=flow.get(key(system)); const r=s?.items?.[s.pos]
  if(!r){flow.delete(key(system));return false}
  const data=r.at ? new Date(r.at * (r.at < 1e12 ? 1000 : 1)).toLocaleString('pt-BR') : 'Agora'
  await system.reply(`⏤͟͟͞͞𝐒𝐨𝐥𝐢𝐜𝐢𝐭𝐚𝐜̧𝐚̃𝐨! 𖤐⃝👤\n•\n> Usuário: ${view(r.jid)}\n> Data: ${data}\n> Pendente: ${s.items.length-s.pos}\n•\n> Digite *1* no chat para aceitar.\n> Digite *0* no chat para recusar.`, { mentions:[r.jid] })
  return true
}

export async function handleSoli(system) {
  const s=flow.get(key(system))
  if(!s) return false
  if(Date.now()-s.at > 10*60*1000){flow.delete(key(system));return false}
  const val=String(system.text||'').trim()
  if(val!=='1' && val!=='0') return false
  if(!system.isGroup || (!system.isAdmin && !system.isOwner)){flow.delete(key(system));return false}
  const r=s.items[s.pos]
  if(!r?.jid){flow.delete(key(system));return false}
  if(val==='1') await system.client.group.approveMembershipRequests(system.from,[r.jid])
  else await system.client.group.rejectMembershipRequests(system.from,[r.jid])
  await system.reply(val==='1' ? `• ✅ Solicitação de ${view(r.jid)} aceita.` : `• ❌ Solicitação de ${view(r.jid)} recusada.`, {mentions:[r.jid]})
  s.pos++
  if(s.pos>=s.items.length){flow.delete(key(system)); await system.reply('• ✅ Não restam solicitações nessa fila.'); return true}
  s.at=Date.now(); await show(system); return true
}

export function clearSoli(){ const n=flow.size; flow.clear(); return n }
