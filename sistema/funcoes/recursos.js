// USO DE RECURSOS DO BOT (pedido do Yosh, 11/11): o site mostra pra cliente
// a CPU, a RAM e a rede do bot dela, no estilo do painel da Square Cloud.
// Cada bot de cliente é um processo próprio (ver clientes/gerente.js), então
// a medição aqui é do bot dela de verdade: uma amostra por minuto, mandada
// ao gerente por IPC, que repassa ao site com o limite de memória do app.
import fs from 'node:fs'
import os from 'node:os'

export const nucleos = () => { try { return os.availableParallelism() } catch { return os.cpus().length || 1 } }

// A memória do app no Square Cloud (MEMORY= do squarecloud.app); sem o
// arquivo, a do servidor.
export function limiteMb(arquivo = 'squarecloud.app') {
  try {
    const m = fs.readFileSync(arquivo, 'utf8').match(/^MEMORY=(\d+)/m)
    if (m) return Number(m[1])
  } catch {}
  return Math.round(os.totalmem() / 1048576)
}

export function criarMedidor({ agora = () => Date.now(), cpu = () => process.cpuUsage(), rss = () => process.memoryUsage().rss, cores = nucleos } = {}) {
  let cpuAntes = cpu(), em = agora(), msgsIn = 0, msgsOut = 0
  const inicio = em
  const arred = (v) => Math.round(v * 100) / 100
  return {
    recebeu() { msgsIn++ },
    enviou() { msgsOut++ },
    // Uma amostra desde a última: CPU em % de todos os núcleos, RAM em MB e
    // as mensagens recebidas e enviadas no período (zeram ao medir).
    medir() {
      const c = cpu(), t = agora()
      const gasto = Math.max(0, (c.user - cpuAntes.user) + (c.system - cpuAntes.system)) // µs
      const passou = Math.max(1000, (t - em) * 1000)
      cpuAntes = c; em = t
      const n = Math.max(1, cores())
      const amostra = {
        modo: 'processo',
        cpu_pct: arred(Math.min(100, (gasto / passou / n) * 100)),
        ram_mb: arred(rss() / 1048576),
        nucleos: n,
        uptime_s: Math.round((t - inicio) / 1000),
        msgs_in: msgsIn,
        msgs_out: msgsOut,
      }
      msgsIn = msgsOut = 0
      return amostra
    },
  }
}
