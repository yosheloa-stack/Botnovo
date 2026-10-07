import { youtube } from '../../funcoes/youtube.js'

export default {name:'ytsearch',aliases:[],category:'download',description:'Pesquisa vídeos pelo Tokito APIs',async run(system){
if (!system.q) return system.reply(system.messages.ytSearchUsage(system.prefix))
const items = await youtube.searchMany(system.q, system.config, 8)
if (!items.length) return system.reply(system.messages.noResult())
await system.reply(system.messages.ytSearch(items))
}
}
