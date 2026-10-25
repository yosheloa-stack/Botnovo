// MODO CLIENTE: este processo é o bot de UMA cliente, rodando no número de
// WhatsApp dela. Quem liga é o gerente (sistema/clientes/gerente.js), um
// processo por cliente, cada um na pasta de dados dela. Tudo que o bot mostra
// é dela: nome, dona (o WhatsApp que ela cadastrou no site), foto do menu,
// idioma e estilo. Nada do Aurora nem do dono da casa.

export const modoCliente = process.env.AURORA_CLIENTE === '1'

const ESTILOS = ['rosa', 'vermelho', 'preto', 'azul']
const IDIOMAS = ['pt', 'es', 'en']

export function lerMarca(raw) {
  let m = {}
  try { m = JSON.parse(raw || '{}') || {} } catch {}
  const texto = (v, max) => String(v ?? '').trim().slice(0, max)
  return {
    nome: texto(m.nome, 48) || 'Bot',
    dono: String(m.dono ?? '').replace(/\D/g, '').slice(0, 15),
    // Nome da dona (aparece no menu no lugar do número).
    donoNome: texto(m.donoNome, 40),
    idioma: IDIOMAS.includes(m.idioma) ? m.idioma : 'pt',
    foto: /^https:\/\//i.test(String(m.foto || '')) ? texto(m.foto, 1000) : '',
    estilo: ESTILOS.includes(m.estilo) ? m.estilo : '',
    expira: Number.isFinite(Date.parse(m.expira || '')) ? new Date(m.expira).toISOString() : ''
  }
}

let marca = lerMarca(process.env.AURORA_MARCA)

// O gerente manda a marca nova quando a cliente muda algo no site (nome,
// foto, estilo...): vale na hora, sem reiniciar o bot.
if (modoCliente && typeof process.on === 'function') {
  process.on('message', (msg) => {
    if (msg?.tipo === 'marca') marca = lerMarca(JSON.stringify(msg.marca || {}))
  })
}

export const marcaCliente = () => (modoCliente ? marca : null)

// Fala com o gerente (código de conexão, conectado, desconectado...).
export function avisarGerente(msg) {
  if (!modoCliente || typeof process.send !== 'function') return
  try { process.send(msg) } catch {}
}
