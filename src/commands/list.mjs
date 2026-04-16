import { resolveRepoRoot, readRegistry, discoverModules, isReferenceModule } from '../helpers.mjs'

export async function cmdList(options) {
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml. Run from the agent-infra repo or a project with @ladybluenotes/agents installed.')
    process.exit(1)
  }

  const { basePath } = root
  const registry = await readRegistry(basePath)
  const modules = await discoverModules(basePath)

  let filtered = modules

  if (options.category) {
    filtered = filtered.filter((m) => m.frontmatter?.category === options.category)
  }

  if (options.type) {
    filtered = filtered.filter((m) => m.frontmatter?.type === options.type)
  } else {
    filtered = filtered.filter((m) => !isReferenceModule(m))
  }

  if (options.json) {
    const output = filtered.map(({ filePath, ...rest }) => rest)
    console.log(JSON.stringify(output, null, 2))
    return
  }

  console.log(`@ladybluenotes/agents v${registry.registry?.version ?? 'unknown'}`)
  console.log()

  // Group by type
  const groups = {}
  for (const mod of filtered) {
    const type = mod.frontmatter?.type ?? 'unknown'
    if (!groups[type]) groups[type] = []
    groups[type].push(mod)
  }

  const typeOrder = ['skill', 'agent', 'rule', 'context']
  const sortedTypes = [...new Set([...typeOrder, ...Object.keys(groups)])]

  for (const type of sortedTypes) {
    const items = groups[type]
    if (!items || items.length === 0) continue

    console.log(type.toUpperCase() + 'S')
    for (const mod of items) {
      const desc = mod.frontmatter?.description ?? ''
      const truncated = desc.length > 65 ? desc.slice(0, 65) + '…' : desc
      console.log(`  ${mod.name.padEnd(35)} ${truncated}`)
    }
    console.log()
  }
}
