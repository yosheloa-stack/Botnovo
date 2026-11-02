// Puxa os comentários de um vídeo público do TikTok (e, quando a API devolver,
// do Instagram). Fonte: tikwm.com — grátis e sem token, do mesmo jeito que o
// #upload usa o PussyBox fixo. Dá pra trocar a base em config.tikwm.url.
//
// Aqui NÃO forjamos mensagem nem mandamos nada pra ninguém: só lemos os
// comentários públicos de um link que a pessoa mandou.

const TIKWM_PADRAO = 'https://www.tikwm.com'

export function tipoLink(link = '') {
  const u = String(link || '').toLowerCase()
  if (/(?:^|\.)tiktok\.com|vm\.tiktok|vt\.tiktok|douyin\./.test(u)) return 'tiktok'
  if (/instagram\.com|instagr\.am|ig\.me/.test(u)) return 'instagram'
  return ''
}

function baseTikwm(config) {
  return String(config?.tikwm?.url || TIKWM_PADRAO).replace(/\/$/, '')
}

function normalizar(lista = []) {
  return (Array.isArray(lista) ? lista : [])
    .map((c) => ({
      autor: String(c?.user?.nickname || c?.user?.unique_id || c?.nickname || c?.author || 'Anônimo').trim() || 'Anônimo',
      texto: String(c?.text ?? c?.comment ?? c?.content ?? '').replace(/\s+/g, ' ').trim(),
      likes: Number(c?.digg_count ?? c?.like_count ?? c?.likes ?? 0) || 0
    }))
    .filter((c) => c.texto)
}

// Retorna { total, itens:[{autor, texto, likes}] }. Lança erro se a API falhar.
export async function comentariosDoVideo(link, config, quantidade = 10) {
  const base = baseTikwm(config)
  const count = Math.min(Math.max(Number(quantidade) || 10, 1), 50)
  const url = `${base}/api/comment/list/?url=${encodeURIComponent(link)}&count=${count}&cursor=0`

  const r = await fetch(url, {
    headers: { 'User-Agent': 'Aurora-System/1.0', 'Accept': 'application/json,*/*' }
  })
  const texto = await r.text()

  let data
  try { data = JSON.parse(texto) } catch { throw new Error('A API de comentários respondeu algo inválido.') }

  // tikwm usa code:0 pra sucesso. Se vier code diferente, é erro de verdade.
  if (data?.code !== undefined && data.code !== 0) {
    throw new Error(String(data?.msg || 'Não consegui pegar os comentários.'))
  }

  const bruto = data?.data?.comments ?? data?.comments ?? []
  const itens = normalizar(bruto)
  const total = Number(data?.data?.total ?? data?.total ?? itens.length) || itens.length

  return { total, itens }
}

export const _teste = { normalizar, baseTikwm }
