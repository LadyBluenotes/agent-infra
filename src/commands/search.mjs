import { resolveRepoRoot, discoverModules, isReferenceModule, searchModules } from '../helpers.mjs'

export async function cmdSearch(queryParts, options) {
  const query = Array.isArray(queryParts) ? queryParts.join(' ') : queryParts
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml.')
    process.exit(1)
  }

  const modules = await discoverModules(root.basePath)
  const searchable = options.references ? modules : modules.filter((module) => !isReferenceModule(module))
  const filtered = searchModules(searchable, query, { limit: Number(options.limit) || 10 })

  if (options.json) {
    const output = filtered.map(({ module, score }) => {
      const { filePath, ...rest } = module
      return { ...rest, score }
    })
    console.log(JSON.stringify(output, null, 2))
    return
  }

  for (const { module, score } of filtered) {
    const desc = module.frontmatter?.description ?? ''
    const truncated = desc.length > 80 ? desc.slice(0, 80) + '...' : desc
    console.log(`${String(score).padStart(3)}  ${module.name.padEnd(45)} ${truncated}`)
  }
}
