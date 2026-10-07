import fs from 'node:fs'
import os from 'node:os'
import { sendReplyButtons } from '../../funcoes/botoes.js'

const pkg = JSON.parse(fs.readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'))

export default {name:'ping',aliases:[],category:'geral',description:'Status do bot',async run(system){
const used = process.memoryUsage().rss / 1024 / 1024
const totalRam = os.totalmem() / 1024 / 1024 / 1024
const before = performance.now()
await Promise.resolve()
const latency = Math.max(0, Math.round(performance.now() - before))
const up = Math.floor(process.uptime())
const h = Math.floor(up / 3600)
const m = Math.floor((up % 3600) / 60)
const s = up % 60
const text = system.messages.ping({
version: pkg.version,
node: process.version,
latency,
used,
totalRam,
commands: system.commands.size,
uptime: `${h}h ${m}m ${s}s`,
zapo: String(pkg.dependencies?.['zapo-js'] || '-').replace(/^[^0-9]*/, '')
})
const sent = await sendReplyButtons(system, {
text,
footer: 'Aurora System • Status',
buttons: [
{ id: `${system.prefix}menu`, text: '⌂ ᴍᴇɴᴜ' },
{ id: `${system.prefix}perfil`, text: '◉ ᴘᴇʀғɪʟ' }
]
})
if (!sent) return system.reply(text)
}
}
