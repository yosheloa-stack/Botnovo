// #TIRAR400: ID QUE FOI PRO AUTOLIKE 400 SAI DO TURBO AUTOMÁTICO E DO 220.
//
// Pedido do dono (01/11): o cliente do Autolike 400 pede pro dono do site
// tirar o ID dele do Turbo automático e do Autolike 220 de quem tinha (outras
// contas, revendedores). O dono manda "#tirar400 ID" e o bot repassa pro site
// (/api/bot/tirar400, mesmo token do aluguel). O site tira o ID e põe na fila
// um aviso pro WhatsApp de cada dono que perdeu o ID; os avisos saem pelo
// caminho de sempre (avisoCliente.js). Aqui só se monta a resposta pro dono.
import { pedirAoSite, motivoDaFalha, respostaEstranha } from './rede.js'

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`

// O primeiro número depois do comando (aceita "#tirar400 123 456" com espaço).
export function idDoComando(texto, prefixo = '#') {
  const t = String(texto || '').trim()
  const p = String(prefixo || '#')
  const resto = (t.startsWith(p) ? t.slice(p.length) : t).replace(/^\s*\S+/, '')
  const m = resto.match(/\d[\d\s.-]{3,}\d/)
  return m ? m[0].replace(/\D/g, '').slice(0, 20) : ''
}

export async function tirar400({ base, token, fetchImpl = fetch, prefixo = '#' }, uid) {
  if (!uid) return `Mande o ID do jogador: ${prefixo}tirar400 ID\n\nO ID sai do Turbo automático e do Autolike 220 de quem tinha, e o bot avisa essas pessoas no WhatsApp.`
  if (!token) throw new Error('falta o token do site no bot (AURORA_RENTAL_TOKEN ou #tokenaluguel)')
  const url = String(base || '').replace(/\/+$/, '') + '/api/bot/tirar400'
  let r
  try {
    r = await pedirAoSite(url, {
      method: 'POST', fetchImpl, timeoutMs: 30_000,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Aurora-Token': token },
      body: JSON.stringify({ uid })
    })
  } catch (err) { throw new Error(motivoDaFalha(err)) }
  const bruto = await r.text()
  let d
  try { d = JSON.parse(bruto) } catch { throw new Error(respostaEstranha(bruto, r.status)) }
  if (!r.ok || !d?.ok) throw new Error(d?.erro || `o site respondeu ${r.status}`)

  const quem = d.nick ? `${String(d.nick).replace(/[*_~`]/g, '')} (ID ${d.uid})` : `ID ${d.uid}`
  const tirou = (d.turbo || 0) + (d.autolike || 0)
  if (!tirou && !d.esperando) return `✅ ${quem} está no Autolike 400 e não estava no Turbo automático nem no Autolike 220 de ninguém. Nada pra tirar.`
  return [
    `✅ *${quem}* tirado:`,
    d.turbo ? `• Turbo automático: ${plural(d.turbo, 'conta', 'contas')}` : '',
    d.autolike ? `• Autolike 220: ${plural(d.autolike, 'conta', 'contas')}` : '',
    d.esperando ? `• ${plural(d.esperando, 'Turbo automático está', 'Turbos automáticos estão')} enviando agora: sai sozinho em até 1 hora` : '',
    '',
    d.avisados ? `📲 ${plural(d.avisados, 'pessoa vai', 'pessoas vão')} receber o aviso no WhatsApp.` : '',
    d.sem_aviso ? `• ${plural(d.sem_aviso, 'pessoa não tem', 'pessoas não têm')} WhatsApp no site (ou desligou os avisos) e não vai receber.` : ''
  ].filter((l, i, a) => l || (a[i - 1] && a.slice(i + 1).some(Boolean))).join('\n')
}
