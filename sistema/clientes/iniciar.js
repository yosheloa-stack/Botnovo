import { loadConfig } from '../funcoes/config.js'
import { criarGerente } from './gerente.js'
import { criarAvisosVenda } from './avisosVenda.js'

const limpo = (v) => String(v ?? '').trim()
const valido = (v) => limpo(v) && !/^COLOQUE_/i.test(limpo(v)) ? limpo(v) : ''

// Liga o gerente dos bots das clientes, se o site estiver configurado (mesmo
// AURORA_RENTAL_TOKEN do aluguel). AURORA_CLIENTES=0 desliga.
// `canalDaCasa()` é o bot da casa conectado ({ numero, filho }) ou null: os
// avisos de venda saem por ele ou por um bot de cliente no número fixo.
export async function iniciarGerenteClientes({ canalDaCasa = () => null } = {}) {
  if (process.env.AURORA_CLIENTES === '0') return null
  const config = await loadConfig()
  let token = valido(process.env.AURORA_RENTAL_TOKEN) || valido(config?.autoSystem?.rentalToken)
  if (!token) {
    // Token salvo pelo #tokenaluguel fica no banco do bot da casa.
    try { token = valido((await import('../funcoes/banco.js')).tokenAluguelSalvo()) } catch {}
  }
  const url = limpo(config?.autoSystem?.url).replace(/\/$/, '')
  if (!url || !token) return null
  const gerente = criarGerente({
    site: { url, token },
    autoSystem: { url, token: valido(config?.autoSystem?.token) }
  })
  gerente.iniciar()
  console.log('[ AURORA CLIENTES ] Gerente dos bots das clientes ligado.')
  gerente.avisos = criarAvisosVenda({ site: { url, token }, canais: () => [canalDaCasa(), ...gerente.canais()].filter(Boolean) })
  gerente.avisos.iniciar()
  return gerente
}
