import { autoSystem } from '../../funcoes/auto.js'

export default {name: 'info',aliases: [],category: 'ff',vipOnly: true,description: 'Consulta jogador Free Fire',async run(system){
if (!system.args[0]) return system.reply(system.messages.ffInfoUsage(system.prefix))
// O cartão do jogador (imagem do site, sem marca) com o texto na legenda.
// Sem imagem, vai só o texto, como antes.
const [d, imagem] = await Promise.all([autoSystem.info(system.config, system.args[0]), autoSystem.banner(system.config, system.args[0])])
if (!d.sucesso) return system.reply(system.messages.apiError(system.erroApi(d.erro, system.messages.ffInfoError())))
const texto = system.messages.ffInfo(d)
if (imagem) {
try { return await system.reply({ type: 'image', media: imagem, mimetype: 'image/png', caption: texto }) }
catch (err) { console.log('[ INFO ] imagem não foi:', err?.message || err) }
}
await system.reply(texto)
}
}
