import fsp from 'fs/promises'
import { resolveRepoRoot, discoverModules, moduleMatchesName, searchModules } from '../helpers.mjs'

export async function cmdShow(name) {
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml.')
    process.exit(1)
  }

  const modules = await discoverModules(root.basePath)

  // Match by name, alias, or relative path (with or without .md).
  let match = modules.find((m) => moduleMatchesName(m, name))

  if (!match) {
    const results = searchModules(modules, name, { limit: 1 })
    match = results[0]?.module
  }

  if (!match) {
    console.error(`Error: No module found matching "${name}".`)
    console.error('Run "ladybluenotes skills list" to see available modules.')
    process.exit(1)
  }

  const content = await fsp.readFile(match.filePath, 'utf8')
  console.log(content)
}
