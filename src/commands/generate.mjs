import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import readline from 'readline'
import { resolveRepoRoot } from '../helpers.mjs'

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

export async function cmdGenerate() {
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml.')
    process.exit(1)
  }

  const { basePath } = root
  const metaDir = path.join(basePath, 'meta')

  // Check meta skills exist
  const discoverySkill = path.join(metaDir, 'domain-discovery', 'SKILL.md')
  const generatorSkill = path.join(metaDir, 'tree-generator', 'SKILL.md')

  if (!fs.existsSync(discoverySkill) || !fs.existsSync(generatorSkill)) {
    console.error('Error: Meta skills not found. Ensure meta/domain-discovery/SKILL.md and meta/tree-generator/SKILL.md exist.')
    process.exit(1)
  }

  console.log('Skill Generator')
  console.log('================')
  console.log()
  console.log('This will guide you through bootstrapping skills for a library.')
  console.log('The process uses two meta skills:')
  console.log('  1. Domain Discovery — analyzes the library and interviews you to build a domain map')
  console.log('  2. Tree Generator — produces SKILL.md files from the domain map')
  console.log()

  const libraryName = await prompt('Library name (e.g. express, prisma, drizzle): ')
  if (!libraryName) {
    console.error('Library name is required.')
    process.exit(1)
  }

  const docsPath = await prompt('Path to library docs (local path or URL): ')
  const targetDir = await prompt(`Target skill directory [skills/code/${libraryName}]: `) || `skills/code/${libraryName}`

  console.log()
  console.log('─────────────────────────────────────────────────')
  console.log()
  console.log('Next steps:')
  console.log()
  console.log('1. Start a new agent session and load the domain discovery skill:')
  console.log()
  console.log(`   Read the file: ${path.relative(process.cwd(), discoverySkill)}`)
  console.log()
  console.log('2. Tell the agent:')
  console.log()
  console.log(`   "Run domain discovery for ${libraryName}.`)
  if (docsPath) {
    console.log(`    Docs are at: ${docsPath}`)
  }
  console.log(`    Output artifacts to: ${targetDir}/"`)
  console.log()
  console.log('3. After domain discovery produces domain_map.yaml and skill_spec.md,')
  console.log('   load the tree generator skill:')
  console.log()
  console.log(`   Read the file: ${path.relative(process.cwd(), generatorSkill)}`)
  console.log()
  console.log('4. Tell the agent:')
  console.log()
  console.log(`   "Generate the skill tree from the domain map in ${targetDir}/"`)
  console.log()
  console.log('─────────────────────────────────────────────────')

  // Create the target directory
  const fullTargetDir = path.join(basePath, targetDir)
  if (!fs.existsSync(fullTargetDir)) {
    await fsp.mkdir(fullTargetDir, { recursive: true })
    console.log()
    console.log(`✓ Created ${targetDir}/`)
  }
}
