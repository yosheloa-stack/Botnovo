// IA YOSH (pedido do dono, 2026-11-01): uma IA separada da Aurora, com o nome
// Yosh. Conversa por texto e cria imagens. Quem responde é a API da Yosh no
// site (/v1/yosh), paga pelo saldo da key da Yosh da conta dona do
// AUTOSYSTEM_TOKEN deste bot. A resposta sai no idioma do grupo.
//
//   #yosh <mensagem>                    conversa (cada grupo tem a sua)
//   #yosh imagem <prompt> [tamanho]     gera imagem (auto, 1:1, 16:9, 9:16, 4:3, 3:4)
//   #yosh modelos                       lista os modelos
//   #yosh criar [modelo] [mensagem]     começa uma conversa nova (max, lite, fast)
//   #yosh chat <conversa> <mensagem>    fala numa conversa com nome
//   #yosh reset                         apaga a memória da conversa do grupo
//   #yosh ajuda                         mostra a ajuda
import { autoSystem } from '../../funcoes/auto.js'
import { getIdiomaGrupo } from '../../funcoes/banco.js'

const TAMANHOS = ['auto', '1:1', '16:9', '9:16', '4:3', '3:4']
const MODELOS = ['max', 'lite', 'fast']
const SUB = {
  imagem: ['imagem', 'img', 'image', 'gerar'],
  modelos: ['modelos', 'models'],
  criar: ['criar', 'create', 'new'],
  chat: ['chat', 'msg', 'mensagem', 'response'],
  reset: ['reset'],
  ajuda: ['help', 'ajuda', 'menu'],
}
const qual = (p) => Object.keys(SUB).find((k) => SUB[k].includes(String(p || '').toLowerCase())) || null

// Freio por pessoa: 6 mensagens por minuto e 2 imagens a cada 5 minutos.
const usos = new Map()
export function livre(chave, max, janelaMs, agora = Date.now()) {
  const lista = (usos.get(chave) || []).filter((t) => agora - t < janelaMs)
  if (lista.length >= max) { usos.set(chave, lista); return false }
  lista.push(agora)
  usos.set(chave, lista)
  return true
}

// O modelo escolhido no #yosh criar, por conversa (até o bot reiniciar).
const modeloDa = new Map()
const nomeLivre = (t) => String(t || '').replace(/[^\w.-]/g, '').slice(0, 9)
export function conversaDe(jid, nome = '') {
  const base = ('wa-' + String(jid || '').replace(/[^\w.-]/g, '')).slice(0, 30)
  const n = nomeLivre(nome)
  return n ? base + '-' + n : base
}

export function falaDoErro(d) {
  const c = d?.codigo
  if (c === 'saldo_insuficiente') return '❌ A IA Yosh está sem saldo neste bot. O dono precisa recarregar a key da Yosh no site (aba IA Yosh).'
  if (c === 'fechado') return '❌ A IA Yosh está em manutenção agora. Tente mais tarde.'
  if (c === 'muitas_requisicoes') return '⏱️ Muitas mensagens seguidas. Espere um minuto e tente de novo.'
  if (c === 'sem_mensagem' || c === 'sem_prompt') return '❌ Escreva o que você quer depois do comando.'
  if (/chave|key|token/i.test(String(d?.erro || '')) && !c) return '❌ A key do site não está configurada neste bot.'
  if (/processamento|demor/i.test(String(d?.erro || ''))) return '⏱️ A imagem ainda está em processamento. Tente de novo em instantes.'
  if (/imagem falhou|geração/i.test(String(d?.erro || ''))) return '❌ A geração da imagem falhou. Tente outro prompt.'
  if (/não retornou texto/i.test(String(d?.erro || ''))) return '❌ A IA não retornou texto. Tente novamente.'
  return '❌ Não foi possível conectar à IA neste momento.'
}

export function ajuda(prefix) {
  return [
    '🤖 *IA YOSH*',
    '',
    `• ${prefix}yosh sua mensagem: conversa com a Yosh`,
    `• ${prefix}yosh imagem descrição 16:9: gera uma imagem`,
    `• ${prefix}yosh modelos: mostra os modelos`,
    `• ${prefix}yosh criar fast sua mensagem: começa uma conversa nova`,
    `• ${prefix}yosh chat nome mensagem: fala numa conversa com nome`,
    `• ${prefix}yosh reset: apaga a memória da conversa`,
    '',
    'Tamanhos de imagem: auto, 1:1, 16:9, 9:16, 4:3, 3:4.',
  ].join('\n')
}

async function conversar(system, conversa, mensagem, modelo) {
  const idioma = getIdiomaGrupo(system.from)
  const d = await autoSystem.yosh(system.config, { mensagem, conversa, modelo: modelo || modeloDa.get(conversa) || '', idioma })
  if (!d?.sucesso) return system.reply(falaDoErro(d))
  return system.reply(String(d.resposta || '').slice(0, 6000))
}

export default {
  name: 'yosh', aliases: ['yoshia', 'iayosh'], category: 'geral', description: 'Conversa e gera imagens com a IA Yosh',
  async run(system) {
    const pessoa = system.senderNumber || system.sender || system.from
    const sub = qual(system.args[0])
    const resto = sub ? system.args.slice(1) : system.args
    const conversa = conversaDe(system.from)

    if (!system.args.length || sub === 'ajuda') return system.reply(ajuda(system.prefix))

    if (sub === 'modelos') {
      const d = await autoSystem.yoshModelos(system.config)
      if (!d?.sucesso) return system.reply(falaDoErro(d))
      return system.reply(['🤖 *MODELOS DA YOSH*', '', ...(d.modelos || []).map((m) => `• ${m.id}: ${m.nome}. ${m.desc || ''}`.trim()),
        '', `Imagem: ${(d.imagem?.tamanhos || TAMANHOS).join(', ')}`].join('\n'))
    }

    if (sub === 'reset') {
      modeloDa.delete(conversa)
      await autoSystem.yoshReset(system.config, conversa)
      return system.reply('✅ Conversa da Yosh apagada. A próxima mensagem começa do zero.')
    }

    if (sub === 'imagem') {
      let partes = [...resto]
      let tamanho = '1:1'
      if (partes.length && TAMANHOS.includes(partes[partes.length - 1])) tamanho = partes.pop()
      const prompt = partes.join(' ').trim()
      if (!prompt) return system.reply(`❌ Descreva a imagem. Exemplo: ${system.prefix}yosh imagem um dragão voando 16:9`)
      if (!livre('img:' + pessoa, 2, 5 * 60_000)) return system.reply('⏱️ Muitas imagens seguidas. Espere alguns minutos.')
      await system.reply('🎨 Gerando a imagem, aguarde...')
      const d = await autoSystem.yoshImagem(system.config, { prompt, tamanho })
      if (!d?.sucesso || !d.imagem) return system.reply(falaDoErro(d))
      const bytes = await autoSystem.yoshArquivo(d.imagem)
      if (!bytes) return system.reply(`🎨 Imagem pronta: ${d.imagem}`)
      return system.reply({ type: 'image', media: bytes, mimetype: 'image/png', caption: '🎨 Yosh' })
    }

    if (!livre('txt:' + pessoa, 6, 60_000)) return system.reply('⏱️ Muitas mensagens seguidas. Espere um minuto e tente de novo.')

    if (sub === 'criar') {
      let partes = [...resto]
      let modelo = 'max'
      if (partes.length && MODELOS.includes(String(partes[0]).toLowerCase().replace(/^(yosh|pussy)/, ''))) {
        modelo = String(partes.shift()).toLowerCase().replace(/^(yosh|pussy)/, '')
      }
      modeloDa.set(conversa, modelo)
      await autoSystem.yoshReset(system.config, conversa)
      const msg = partes.join(' ').trim()
      if (!msg) return system.reply(`✅ Conversa nova da Yosh criada (${modelo}).`)
      return conversar(system, conversa, msg, modelo)
    }

    if (sub === 'chat') {
      const nome = nomeLivre(resto[0])
      const msg = resto.slice(1).join(' ').trim()
      if (!nome || !msg) return system.reply(`❌ Use: ${system.prefix}yosh chat nome sua mensagem`)
      return conversar(system, conversaDe(system.from, nome), msg)
    }

    return conversar(system, conversa, resto.join(' ').trim())
  }
}
