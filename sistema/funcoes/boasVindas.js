// BOAS-VINDAS DO BOT DA CLIENTE: na primeira conexão o bot manda no privado
// da dona, no idioma que ela escolheu no site, como deixar o bot funcionando.
// Sem nada do Aurora nem do dono da casa (só o link de configuração do site).
export function textoBoasVindas(marca, prefixo = '#', link = '') {
  const p = String(prefixo || '#')
  const nome = String(marca?.nome || 'Bot')
  const dona = String(marca?.donoNome || '').trim()
  const textos = {
    pt: [
      `👋 Olá${dona ? ', ' + dona : ''}! Seu bot *${nome}* está conectado e pronto.`,
      '',
      '*Como configurar:*',
      `1. Adicione o bot no seu grupo e deixe ele como *admin*.`,
      `2. No grupo, mande *${p}rgaluguel* (deste seu WhatsApp). O bot só responde nos grupos registrados, assim ninguém usa ele em outro grupo.`,
      `3. Limite de IDs por pessoa no grupo: *${p}configurarff 3* (ou *${p}configurarff 0* para sem limite).`,
      `4. Para liberar o autolike para alguém: *${p}addvip @pessoa*.`,
      `5. Menu: *${p}menu* · seus comandos de dono: *${p}menudono*.`,
      ...(link ? ['', `Para mudar nome, foto, estilo ou idioma: ${link}`] : [])
    ],
    es: [
      `👋 ¡Hola${dona ? ', ' + dona : ''}! Tu bot *${nome}* está conectado y listo.`,
      '',
      '*Cómo configurarlo:*',
      `1. Agrega el bot a tu grupo y hazlo *admin*.`,
      `2. En el grupo, envía *${p}rgaluguel* (desde este WhatsApp). El bot solo responde en los grupos registrados, así nadie lo usa en otro grupo.`,
      `3. Límite de IDs por persona en el grupo: *${p}configurarff 3* (o *${p}configurarff 0* para sin límite).`,
      `4. Para liberar el autolike a alguien: *${p}addvip @persona*.`,
      `5. Menú: *${p}menu* · tus comandos de dueño: *${p}menudono*.`,
      ...(link ? ['', `Para cambiar nombre, foto, estilo o idioma: ${link}`] : [])
    ],
    en: [
      `👋 Hi${dona ? ', ' + dona : ''}! Your bot *${nome}* is connected and ready.`,
      '',
      '*How to set it up:*',
      `1. Add the bot to your group and make it *admin*.`,
      `2. In the group, send *${p}rgaluguel* (from this WhatsApp). The bot only answers in registered groups, so nobody can use it in another group.`,
      `3. ID limit per person in the group: *${p}configurarff 3* (or *${p}configurarff 0* for no limit).`,
      `4. To give someone autolike: *${p}addvip @person*.`,
      `5. Menu: *${p}menu* · your owner commands: *${p}menudono*.`,
      ...(link ? ['', `To change name, photo, style or language: ${link}`] : [])
    ]
  }
  return (textos[marca?.idioma] || textos.pt).join('\n')
}
