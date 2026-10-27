import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'
import { mediaInfo, quotedInfo } from '../../funcoes/mensagem.js'

// WhatsApp quer a foto de perfil quadrada e em JPEG; o zapo manda os bytes
// como estão, então o corte e a conversão são feitos aqui.
export async function fotoDePerfil(arquivo) {
return sharp(arquivo).rotate().resize(640, 640, { fit: 'cover' }).jpeg({ quality: 85 }).toBuffer()
}

export default {name: 'fotobot',aliases: ['setfotobot', 'fotodobot', 'setpp', 'fotoperfil'],category: 'dono',description: 'Troca a foto de perfil do bot',ownerOnly: true,async run(system){
const atual = mediaInfo(system.event?.message)
const marcada = quotedInfo(system.event)
const daMarcada = marcada ? mediaInfo(marcada.message) : null
const foto = atual?.type === 'image' ? atual : daMarcada?.type === 'image' ? daMarcada : null
if (!foto) return system.reply(`- 🖼️ Mande uma foto com a legenda *${system.prefix}fotobot*, ou responda a uma foto com *${system.prefix}fotobot*.`)
const dir = path.join(os.tmpdir(), 'aurora-system')
const arquivo = path.join(dir, `fotobot-${crypto.randomUUID()}`)
await fs.mkdir(dir, { recursive: true })
try {
await system.client.message.downloadToFile(foto === atual ? system.event : marcada.message, arquivo, { maxBytes: 20 * 1024 * 1024 })
await system.client.profile.setProfilePicture(new Uint8Array(await fotoDePerfil(arquivo)))
await system.reply('- ✅ Foto de perfil do bot trocada.')
} catch (err) {
console.error('[ FOTOBOT ]', err?.message || err)
await system.reply('- ❌ Não consegui trocar a foto. Tente com outra foto ou mande de novo.')
} finally {
try { await fs.unlink(arquivo) } catch {}
}
}
}
