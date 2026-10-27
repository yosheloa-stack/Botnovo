// SUBDONOS: pessoas que a dona do bot coloca para ajudar. Elas usam os
// comandos de dono (menu dono, prefixo, foto do menu...), mas só a dona
// principal coloca ou tira subdono. Ficam nas vagas numero_dono2..6 do
// necessarios.json, que é de cada bot (pasta de dados própria).

import { necessarios, saveNecessarios } from './necessarios.js'
import { digits, mesmoNumero } from './jid.js'

export const VAGAS = ['numero_dono2', 'numero_dono3', 'numero_dono4', 'numero_dono5', 'numero_dono6']

export function listaSubdonos() {
  const dados = necessarios()
  return VAGAS.map((k) => digits(dados[k])).filter(Boolean)
}

// Dona principal: o número do bot (config.owner) ou a vaga numero_dono1.
export function ehDonoPrincipal(config, numero) {
  if (!digits(numero)) return false
  return mesmoNumero(config?.owner?.number, numero) || mesmoNumero(necessarios().numero_dono1, numero)
}

// 'ok' | 'dono' (já é a dona) | 'ja' (já é subdono) | 'cheio'
export async function addSubdono(config, numero) {
  const n = digits(numero)
  if (ehDonoPrincipal(config, n)) return 'dono'
  if (listaSubdonos().some((s) => mesmoNumero(s, n))) return 'ja'
  const dados = necessarios()
  const vaga = VAGAS.find((k) => !digits(dados[k]))
  if (!vaga) return 'cheio'
  dados[vaga] = n
  await saveNecessarios()
  return 'ok'
}

export async function delSubdono(numero) {
  const dados = necessarios()
  const vagas = VAGAS.filter((k) => mesmoNumero(dados[k], numero))
  if (!vagas.length) return false
  for (const k of vagas) dados[k] = '.'
  await saveNecessarios()
  return true
}
