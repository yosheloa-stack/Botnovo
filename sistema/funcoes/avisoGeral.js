// #AVISO PRA TODOS OS CLIENTES DO SITE.
//
// Pedido do dono (01/11): "#aviso texto" e o bot manda o texto pra todo mundo
// que tem número cadastrado no site. O bot NÃO dispara daqui: ele repassa o
// texto pro site (/api/bot/avisos-cliente/geral, mesmo token do aluguel), que
// põe um aviso na fila de cada cliente, com o nome e o rodapé no idioma dele.
// A fila sai pelo mesmo caminho dos avisos de entrega (avisoCompra.js), UM
// aviso geral por vez e bem espaçado: mandar a mesma mensagem pra muitos
// números em sequência é o que mais faz o WhatsApp bloquear o número.
import { pedirAoSite, motivoDaFalha, respostaEstranha } from './rede.js'

const FUSO = 'America/Sao_Paulo'
const hora = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('pt-BR', { timeZone: FUSO, hour: '2-digit', minute: '2-digit' })
}
const dia = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('pt-BR', { timeZone: FUSO, day: '2-digit', month: '2-digit' })
}
const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`

// O texto inteiro depois de "#aviso", com as quebras de linha (o system.q
// junta tudo numa linha só).
export function textoDoAviso(texto, prefixo = '#') {
  const t = String(texto || '').trim()
  const p = String(prefixo || '#')
  const semPrefixo = t.startsWith(p) ? t.slice(p.length) : t
  return semPrefixo.replace(/^\s*\S+[ \t]*/, '').replace(/^\n+/, '').trim()
}

// acao: { texto, de } manda; { cancelar: true } para; {} mostra o andamento.
// Devolve a resposta pronta pro dono; erro do site vira exceção com a frase.
export async function avisoGeral({ base, token, fetchImpl = fetch, prefixo = '#' }, acao = {}) {
  if (!token) throw new Error('falta o token do site no bot (AURORA_RENTAL_TOKEN ou #tokenaluguel)')
  const url = String(base || '').replace(/\/+$/, '') + '/api/bot/avisos-cliente/geral'
  const corpo = acao.cancelar ? { cancelar: true } : acao.pausar ? { pausar: true, motivo: 'pausado pelo dono' } : acao.retomar ? { retomar: true }
    : acao.texto ? { texto: acao.texto, de: acao.de || '' } : null
  let r
  try {
    r = await pedirAoSite(url, {
      method: corpo ? 'POST' : 'GET', fetchImpl, timeoutMs: 30_000,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-Aurora-Token': token },
      ...(corpo ? { body: JSON.stringify(corpo) } : {})
    })
  } catch (err) { throw new Error(motivoDaFalha(err)) }
  const bruto = await r.text()
  let d
  try { d = JSON.parse(bruto) } catch { throw new Error(respostaEstranha(bruto, r.status)) }
  if (!r.ok || !d?.ok) throw new Error(d?.erro || `o site respondeu ${r.status}`)

  if (acao.cancelar) {
    return d.cancelados ? `🛑 Aviso cancelado: ${plural(d.cancelados, 'cliente não vai', 'clientes não vão')} receber.` : 'Não tinha aviso esperando na fila.'
  }
  if (acao.pausar) return `⏸️ Aviso pausado. ${plural(d.geral?.na_fila || 0, 'cliente espera', 'clientes esperam')} na fila.\n\n${prefixo}aviso continuar → volta a mandar • ${prefixo}aviso cancelar → apaga a fila`
  if (acao.retomar) {
    const g = d.geral || {}
    if (!g.na_fila) return 'Não tem aviso esperando na fila.'
    return [`▶️ Aviso voltando: ${plural(g.na_fila, 'cliente falta', 'clientes faltam')}.`, `Sai um de cada vez, a cada ~${g.espaco_s || 90} s.`,
      g.termina_em ? `Deve terminar por volta das ${hora(g.termina_em)} (${dia(g.termina_em)}).` : ''].filter(Boolean).join('\n')
  }
  if (corpo) {
    if (!d.total) return 'Nenhum cliente com WhatsApp cadastrado no site pra receber o aviso.'
    return [
      `📢 Aviso na fila pra ${plural(d.total, 'cliente', 'clientes')}.`,
      `Sai um de cada vez, a cada ~${d.espaco_s || 90} s, pro WhatsApp não bloquear o número.`,
      d.termina_em ? `Deve terminar por volta das ${hora(d.termina_em)} (${dia(d.termina_em)}).` : '',
      '',
      `${prefixo}aviso mostra o andamento • ${prefixo}aviso cancelar para o que falta`
    ].filter((l, i, a) => l || a[i - 1]).join('\n')
  }
  const g = d.geral || {}
  const u = g.ultimo
  return [
    '📢 *Aviso pra todos os clientes*',
    u ? `Último: "${u.texto}" (${dia(u.criado)} ${hora(u.criado)}, ${plural(u.total, 'cliente', 'clientes')})` : 'Nenhum aviso mandado ainda.',
    u ? `${g.enviados || 0} enviados • ${g.na_fila || 0} na fila • ${(g.sem_whatsapp || 0) + (g.recusados || 0)} sem WhatsApp ou recusados` : '',
    g.pausado ? `⏸️ *Pausado* (${g.pausado.motivo}). Mande ${prefixo}aviso continuar pra voltar ou ${prefixo}aviso cancelar pra apagar a fila.` : '',
    g.na_fila && g.termina_em ? `Termina por volta das ${hora(g.termina_em)}.` : '',
    '',
    `${prefixo}aviso texto → manda pra todos com número no site`,
    `${prefixo}aviso pausar / ${prefixo}aviso continuar → segura e solta a fila`,
    `${prefixo}aviso cancelar → para o que ainda não saiu`
  ].filter(Boolean).join('\n')
}
