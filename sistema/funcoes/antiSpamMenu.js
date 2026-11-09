// Anti-spam do menu.
// Antes o bot mandava a imagem do menu toda vez que alguém pedia, sem limite:
// no grupo "Likes gratis RK" a mesma pessoa mandou #menu 5 vezes em 3 minutos
// e o grupo recebeu 5 menus iguais. Agora:
// - o mesmo menu não volta para o mesmo grupo em menos de 1 minuto;
// - a mesma pessoa não recebe o mesmo menu de novo em menos de 5 minutos;
// - quem repete recebe UM aviso curto ("o menu foi enviado há pouco") e,
//   enquanto continuar repetindo dentro do prazo, o bot fica quieto.
// O dono do bot nunca é barrado. Cada bot roda no próprio processo, então a
// memória aqui é só deste bot (dois bots no mesmo grupo não se atrapalham).

export const ANTI_SPAM_MENU = {
  grupoMs: 60_000,
  pessoaMs: 5 * 60_000,
  maxEntradas: 5_000
}

// Apelidos que abrem o mesmo menu contam como um menu só.
const MENUS = {
  menu: 'menu', help: 'menu', menuprincipal: 'menu', 'menú': 'menu',
  list: 'menu', listmenu: 'menu', menus: 'menu', menulist: 'menu',
  menuff: 'menuff',
  menuadm: 'menuadm',
  menudono: 'menudono',
  menubn: 'menubn', brincadeiras: 'menubn', brincadeira: 'menubn',
  menudown: 'menudown', menudao: 'menudown', menudownload: 'menudown', menudownloads: 'menudown',
  menufig: 'menufig', menufigs: 'menufig', menufigurinha: 'menufig', menufigurinhas: 'menufig'
}

const noGrupo = new Map() // `${grupo}|${menu}` -> quando o menu foi enviado
const praPessoa = new Map() // `${grupo}|${pessoa}|${menu}` -> quando a pessoa recebeu
const avisados = new Map() // `${grupo}|${pessoa}|${menu}` -> quando a pessoa foi avisada

export function menuCanonico(comando) {
  return MENUS[String(comando || '').toLowerCase()] || null
}

function guardar(mapa, chave, valor) {
  mapa.delete(chave)
  mapa.set(chave, valor)
  // Map mantém a ordem de inserção: o primeiro é o mais antigo.
  while (mapa.size > ANTI_SPAM_MENU.maxEntradas) mapa.delete(mapa.keys().next().value)
}

const recente = (mapa, chave, agora, prazo) => {
  const quando = mapa.get(chave)
  return quando !== undefined && agora - quando < prazo
}

// Devolve null quando não é menu (segue normal). Senão { acao }:
// 'enviar' (manda o menu), 'avisar' (manda só o aviso curto) ou 'ignorar'.
export function controleMenu({ comando, grupo = '', remetente = '', dono = false, agora = Date.now() } = {}) {
  const menu = menuCanonico(comando)
  if (!menu) return null
  const chaveGrupo = grupo ? `${grupo}|${menu}` : ''
  const chavePessoa = `${grupo}|${remetente}|${menu}`

  const bloqueado = !dono && (
    recente(praPessoa, chavePessoa, agora, ANTI_SPAM_MENU.pessoaMs)
    || (chaveGrupo && recente(noGrupo, chaveGrupo, agora, ANTI_SPAM_MENU.grupoMs))
  )
  if (bloqueado) {
    if (recente(avisados, chavePessoa, agora, ANTI_SPAM_MENU.pessoaMs)) return { acao: 'ignorar', menu }
    guardar(avisados, chavePessoa, agora)
    return { acao: 'avisar', menu }
  }

  const antes = { grupo: chaveGrupo ? noGrupo.get(chaveGrupo) : undefined, pessoa: praPessoa.get(chavePessoa) }
  if (chaveGrupo) guardar(noGrupo, chaveGrupo, agora)
  guardar(praPessoa, chavePessoa, agora)
  avisados.delete(chavePessoa)
  return { acao: 'enviar', menu, desfazer: { chaveGrupo, chavePessoa, antes, agora } }
}

// O envio do menu deu erro: volta como estava, para a pessoa poder tentar de novo.
export function desfazerMenu(resultado) {
  const d = resultado?.desfazer
  if (!d) return
  const voltar = (mapa, chave, anterior) => {
    if (!chave || mapa.get(chave) !== d.agora) return
    if (anterior === undefined) mapa.delete(chave)
    else mapa.set(chave, anterior)
  }
  voltar(noGrupo, d.chaveGrupo, d.antes.grupo)
  voltar(praPessoa, d.chavePessoa, d.antes.pessoa)
}

export function avisoMenuRepetido(idioma = 'pt') {
  if (idioma === 'es') return '⏳ El menú se envió hace poco. Desliza la conversación hacia arriba para verlo.'
  if (idioma === 'en') return '⏳ The menu was sent a moment ago. Scroll up in the chat to see it.'
  return '⏳ O menu foi enviado agora há pouco. É só subir a conversa para ver.'
}

export function limparAntiSpamMenu() {
  noGrupo.clear()
  praPessoa.clear()
  avisados.clear()
}

export function tamanhoAntiSpamMenu() {
  return noGrupo.size + praPessoa.size + avisados.size
}
