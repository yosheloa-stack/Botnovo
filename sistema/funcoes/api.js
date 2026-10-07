export function apiCfg(config, name='tokitoApi') {
  const c=config?.[name] || {}
  return { url:String(c.url||'').replace(/\/$/,''), token:String(c.token||'') }
}
export function apiUrl(config, route, params={}, name='tokitoApi') {
  const c=apiCfg(config,name)
  if(!c.url) throw new Error(`API ${name} não configurada.`)
  const u=new URL(`${c.url}${route.startsWith('/')?route:`/${route}`}`)
  for(const [k,v] of Object.entries(params)) if(v!==undefined && v!==null && v!=='') u.searchParams.set(k,String(v))
  if(c.token) u.searchParams.set('apikey',c.token)
  return u.toString()
}
export async function apiJson(url) {
  const r=await fetch(url,{headers:{'User-Agent':'Aurora-System/1.0','Accept':'application/json,*/*'}})
  const text=await r.text()
  let data
  try{data=JSON.parse(text)}catch{throw new Error(`API retornou resposta inválida (HTTP ${r.status}).`)}
  if(!r.ok) throw new Error(String(data?.resultado||data?.error||data?.message||`HTTP ${r.status}`))
  return data
}
export function resultOf(data){ return data?.resultado ?? data?.result ?? data?.data ?? data }
export function safeName(v='midia'){return String(v||'midia').replace(/[\\/:*?"<>|]/g,'').trim().slice(0,90)||'midia'}
