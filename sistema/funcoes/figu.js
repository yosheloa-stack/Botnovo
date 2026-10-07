import { apiUrl } from './api.js'
import { downloadFile, cleanup } from './midia.js'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export function qtd(system) {
const n = Number(system.args?.[0])
if (!system.args?.[0] || !Number.isInteger(n)) return null
return n
}

export async function pack(system, route, nome = 'Figurinhas') {
const quantidade = qtd(system)
if (quantidade === null) {
return system.reply(`• Informe a quantidade de figurinhas.\n\n• Exemplo: *${system.prefix}${system.command} 5*`)
}
if (quantidade < 1) return system.reply('• ❌ A quantidade mínima é 1 figurinha.')
if (quantidade > 10) return system.reply('• ❌ O máximo permitido são 10 figurinhas por vez.')

await system.reply(`⏤͟͟͞͞𝐅𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚𝐬 𝐀𝐮𝐫𝐨𝐫𝐚! 𖤐⃝🖼️\n•\n> *[📦]* • Pacote: *${nome}*\n> *[🔢]* • Quantidade: *${quantidade}*\n> *[⏳]* • Preparando...`)

for (let i = 0; i < quantidade; i++) {
let media
try {
const url = apiUrl(system.config, route, { cache: `${Date.now()}-${i}` })
media = await downloadFile(url, system.config, 'webp')
await system.send({
type: 'sticker',
media: media.path,
mimetype: 'image/webp'
})
} finally {
await cleanup(media)
}
if (i + 1 < quantidade) await wait(650)
}
}

export default { qtd, pack }
