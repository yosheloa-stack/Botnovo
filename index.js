import { startAurora } from './sistema/core/client.js'
import { instalarHorario } from './sistema/funcoes/registro.js'

// Data e hora nas linhas do log. O bot de cliente não põe: as linhas dele
// passam pelo launcher ("[ cliente Nome ] ..."), que já põe.
if (process.env.AURORA_CLIENTE !== '1') instalarHorario()

// Uma promessa rejeitada sem tratamento (ex.: envio que falhou num evento de
// grupo) não pode derrubar o bot inteiro: fica registrada e o bot segue.
// A mesma mensagem aparece no máximo uma vez por minuto.
const avisados = new Map()
process.on('unhandledRejection', (err) => {
const msg = String(err?.message || err)
if (Date.now() - (avisados.get(msg) || 0) < 60_000) return
if (avisados.size > 200) avisados.clear()
avisados.set(msg, Date.now())
console.error('[ AURORA ] Erro sem tratamento (o bot continua):', msg)
})
// Exceção solta pode deixar o estado quebrado: reinicia pelo launcher.
process.on('uncaughtException', (err) => {
console.error('[ AURORA ] Erro inesperado, reiniciando:', err?.stack || err)
process.exit(75)
})

startAurora().catch((err) => {
// Sem rede na hora de ligar, o Zapo desiste em 15 s. Antes o bot morria
// aqui; agora o launcher liga de novo daqui a pouco.
if (/connection timeout|socket|ECONN|ENOTFOUND|EAI_AGAIN/i.test(String(err?.message || err))) {
console.error('[ AURORA CONEXÃO ] Não consegui conectar ao WhatsApp agora:', err?.message || err)
process.exit(75)
}
console.error('[ AURORA ] Erro fatal:', err)
process.exit(1)
})
