import fsp from 'fs/promises'
import { resolveRepoRoot, discoverModules } from '../helpers.mjs'

export async function cmdShow(name) {
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml.')
    process.exit(1)
  }

  const modules = await discoverModules(root.basePath)

  // Match by name or by relative path (with or without .md)
  const match = modules.find(
    (m) =>
      m.name === name ||
      m.relPath === name ||
      m.relPath === name + '.md' ||
      m.relPath.replace(/\.md$/, '') === name,
  )

  if (!match) {
    console.error(`Error: No module found matching "${name}".`)
    console.error('Run "ladybluenotes agents list" to see available modules.')
    process.exit(1)
  }

  const content = await fsp.readFile(match.filePath, 'utf8')
  console.log(content)
}
