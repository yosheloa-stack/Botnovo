import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

async function walk(dir) {
const out = []
for (const item of await fs.readdir(dir, { withFileTypes: true })) {
const full = path.join(dir, item.name)
if (item.isDirectory()) out.push(...await walk(full))
else if (item.isFile() && item.name.endsWith('.js')) out.push(full)
}
return out
}

export async function loadPlugins() {
const dir = path.resolve('sistema/comandos')
const files = (await walk(dir)).sort((a, b) => a.localeCompare(b))
const plugins = []
const commands = new Map()
const sources = new Map()

for (const file of files) {
const mod = await import(`${pathToFileURL(file).href}?v=${Date.now()}`)
const plugin = mod.default
if (!plugin?.name || typeof plugin.run !== 'function') continue
plugin.aliases ??= []
plugin.category ??= 'geral'
plugin.file = file
plugins.push(plugin)

for (const raw of [plugin.name, ...plugin.aliases]) {
const cmd = String(raw).toLowerCase().trim()
if (!cmd) continue
const atual = commands.get(cmd)
const origem = sources.get(cmd)
if (atual) {
const novoPrincipal = String(plugin.name).toLowerCase() === cmd
const atualPrincipal = String(atual.name).toLowerCase() === cmd
if (novoPrincipal && !atualPrincipal) {
commands.set(cmd, plugin)
sources.set(cmd, file)
continue
}
if (!novoPrincipal && atualPrincipal) continue
throw new Error(`Comando duplicado "${cmd}" em:\n- ${origem}\n- ${file}`)
}
commands.set(cmd, plugin)
sources.set(cmd, file)
}
}

return { plugins, commands, sources }
}
