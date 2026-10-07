import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

async function walk(dir) {
const out = []
for (const e of await fs.readdir(dir, { withFileTypes: true })) {
const p = path.join(dir, e.name)
if (e.isDirectory() && e.name !== 'node_modules') out.push(...await walk(p))
else if (e.isFile() && e.name.endsWith('.js')) out.push(p)
}
return out
}

let fail = 0
for (const file of await walk('.')) {
const r = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' })
if (r.status !== 0) {
fail++
console.error(`✖ ${file}\n${r.stderr}`)
} else console.log(`✓ ${file}`)
}
process.exit(fail ? 1 : 0)
