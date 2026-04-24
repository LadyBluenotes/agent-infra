import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import readline from 'readline'
import { resolveRepoRoot, readRegistry } from '../helpers.mjs'

const AGENT_DIRS = [
  { dir: '.agents/skills', label: 'Standard (.agents/skills/)' },
  { dir: '.claude/skills', label: 'Claude Code (.claude/skills/)' },
  { dir: '.cursor/skills', label: 'Cursor (.cursor/skills/)' },
  { dir: '.codex/skills', label: 'Codex (.codex/skills/)' },
  { dir: '.windsurf/skills', label: 'Windsurf (.windsurf/skills/)' },
  { dir: '.github/skills', label: 'GitHub Copilot (.github/skills/)' },
]

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

async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true })
  const entries = await fsp.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fsp.copyFile(srcPath, destPath)
    }
  }
}

async function copyFileIfExists(src, dest) {
  if (!fs.existsSync(src)) return
  await fsp.mkdir(path.dirname(dest), { recursive: true })
  await fsp.copyFile(src, dest)
}

export async function cmdInstall(options) {
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml.')
    process.exit(1)
  }

  const { basePath } = root
  const registry = await readRegistry(basePath)

  // Determine what to install
  const dirsToInstall = ['skills', 'agents', 'rules', 'contexts']
  let filteredDirs = dirsToInstall

  if (options.category) {
    const catDirs = registry.categories?.[options.category]
    if (!catDirs) {
      console.error(`Error: Unknown category "${options.category}".`)
      console.error(`Available: ${Object.keys(registry.categories ?? {}).join(', ')}`)
      process.exit(1)
    }
    filteredDirs = catDirs
  }

  // Determine target directories
  const cwd = process.cwd()
  const primaryDir = path.join(cwd, '.agents', 'skills')
  const targets = [primaryDir]

  // Detect other agent directories
  const detected = AGENT_DIRS.filter(
    (d) => d.dir !== '.agents/skills' && fs.existsSync(path.resolve(cwd, d.dir.split('/')[0])),
  )

  if (detected.length > 0 && !options.global) {
    console.log(`✔ Installing to .agents/skills/`)
    console.log()
    console.log('  Also detected:')
    for (const d of detected) {
      console.log(`  → ${d.label}`)
    }
    console.log()
    const answer = await prompt('  Install to these as well? (Y/n) ')
    if (!answer || answer.toLowerCase() === 'y') {
      for (const d of detected) {
        targets.push(path.join(cwd, d.dir))
      }
    }
  }

  if (options.global) {
    const homeDir = process.env.HOME || process.env.USERPROFILE
    if (homeDir) {
      targets.length = 0
      targets.push(path.join(homeDir, '.agents', 'skills'))
    }
  }

  // Copy files
  let totalFiles = 0
  for (const target of targets) {
    for (const dir of filteredDirs) {
      const src = path.join(basePath, dir)
      if (!fs.existsSync(src)) continue
      const dest = path.join(target, dir)
      await copyDir(src, dest)
      totalFiles++
    }
    await copyFileIfExists(
      path.join(basePath, 'registry.yaml'),
      path.join(target, 'registry.yaml'),
    )
    console.log(`✓ Installed to ${path.relative(cwd, target) || target}`)
  }

  console.log()
  console.log(`Installed ${filteredDirs.length} module group(s) to ${targets.length} target(s).`)
  console.log()
  console.log('Run "ladybluenotes skills init" to add the prompt block to your agent config files.')
}
