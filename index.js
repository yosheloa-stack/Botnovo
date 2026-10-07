import { startAurora } from './sistema/core/client.js'

startAurora().catch((err) => {
console.error('[ AURORA ] Erro fatal:', err)
process.exit(1)
})
