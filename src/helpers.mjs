import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { execSync } from 'child_process'
import { parse as parseYaml } from 'yaml'

const REFERENCE_TYPES = new Set(['reference'])
const DEFAULT_SEARCH_LIMIT = 10

// ---------------------------------------------------------------------------
// Repo root resolution
// ---------------------------------------------------------------------------

/**
 * Walk up from startDir looking for registry.yaml.
 * Returns { basePath, mode } or null.
 */
export function resolveRepoRoot(startDir = process.cwd()) {
  // Walk up looking for registry.yaml
  let dir = startDir
  while (true) {
    if (fs.existsSync(path.join(dir, 'registry.yaml'))) {
      return { basePath: dir, mode: 'repo' }
    }
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }

  // Check for installed mode (node_modules)
  const installedPath = path.resolve(startDir, 'node_modules', '@ladybluenotes', 'agents')
  if (fs.existsSync(path.join(installedPath, 'registry.yaml'))) {
    return { basePath: installedPath, mode: 'installed' }
  }

  // Fallback to global skills install (~/.agents/skills)
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (homeDir) {
    const globalPath = path.join(homeDir, '.agents', 'skills')
    if (fs.existsSync(path.join(globalPath, 'registry.yaml'))) {
      return { basePath: globalPath, mode: 'global' }
    }
  }

  return null
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/**
 * Read and parse registry.yaml from the given basePath.
 */
export async function readRegistry(basePath) {
  const regPath = path.join(basePath, 'registry.yaml')
  const content = await fsp.readFile(regPath, 'utf8')
  return parseYaml(content)
}

// ---------------------------------------------------------------------------
// Frontmatter parsing
// ---------------------------------------------------------------------------

/**
 * Parse YAML frontmatter from a markdown file.
 * Returns the parsed object or null if no frontmatter block found.
 */
export async function parseFrontmatter(filePath) {
  let content
  try {
    content = await fsp.readFile(filePath, 'utf8')
  } catch {
    return null
  }
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  try {
    const parsed = parseYaml(match[1])
    if (typeof parsed.description === 'string') {
      parsed.description = parsed.description.replace(/\s+/g, ' ').trim()
    }
    return parsed
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Module discovery
// ---------------------------------------------------------------------------

/**
 * Recursively find all .md files under a directory.
 * Returns array of absolute paths.
 */
export async function findMarkdownFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files

  for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '_meta') continue
      files.push(...await findMarkdownFiles(fullPath))
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

/**
 * Discover all modules (skills, agents, rules, contexts) with parsed frontmatter.
 * Returns array of { filePath, relPath, name, frontmatter }.
 */
export async function discoverModules(basePath, dirs = ['skills', 'agents', 'rules', 'contexts']) {
  const modules = []

  for (const dir of dirs) {
    const dirPath = path.join(basePath, dir)
    const files = await findMarkdownFiles(dirPath)

    for (const filePath of files) {
      const fm = await parseFrontmatter(filePath)
      const relPath = path.relative(basePath, filePath)

      modules.push({
        filePath,
        relPath: relPath.split(path.sep).join('/'),
        name: fm?.name ?? relPath.replace(/\.md$/, '').split(path.sep).join('/'),
        frontmatter: fm,
      })
    }
  }

  return modules
}

export function moduleAliases(module) {
  const aliases = module.frontmatter?.aliases
  return Array.isArray(aliases) ? aliases : []
}

export function isReferenceModule(module) {
  return REFERENCE_TYPES.has(module.frontmatter?.type) || module.frontmatter?.depth === 'reference'
}

export function moduleMatchesName(module, name) {
  const normalized = name.replace(/\.md$/, '')
  return (
    module.name === name ||
    module.name === normalized ||
    module.relPath === name ||
    module.relPath === `${name}.md` ||
    module.relPath.replace(/\.md$/, '') === normalized ||
    moduleAliases(module).includes(name) ||
    moduleAliases(module).includes(normalized)
  )
}

const normalizeSearchText = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9@#/_:.-]+/g, ' ')
    .trim()

const searchTokens = (query) =>
  normalizeSearchText(query)
    .split(/\s+/)
    .filter(Boolean)

export function scoreModule(module, query) {
  const tokens = searchTokens(query)
  if (tokens.length === 0) return 0

  const aliases = moduleAliases(module)
  const tags = Array.isArray(module.frontmatter?.tags) ? module.frontmatter.tags : []
  const references = Array.isArray(module.frontmatter?.references) ? module.frontmatter.references : []
  const weightedFields = [
    { weight: 5, values: [module.name, module.relPath] },
    { weight: 5, values: aliases },
    { weight: 6, values: tags },
    { weight: 2, values: [module.frontmatter?.category, module.frontmatter?.library] },
    { weight: 3, values: [module.frontmatter?.description] },
    { weight: 1, values: references },
  ].flatMap(({ weight, values }) =>
    values.map((value) => ({ weight, value: normalizeSearchText(value) })),
  )

  let score = 0
  for (const token of tokens) {
    for (const field of weightedFields) {
      if (!field.value) continue
      if (field.value === token) score += 8 * field.weight
      else if (field.value.split(/\s+/).includes(token)) score += 4 * field.weight
      else if (field.value.includes(token)) score += field.weight
    }
  }

  if (aliases.some((alias) => normalizeSearchText(alias) === normalizeSearchText(query))) {
    score += 24
  }
  if (module.frontmatter?.depth === 'primary') score += 3
  if (isReferenceModule(module)) score -= 2

  return score
}

export function searchModules(modules, query, options = {}) {
  const limit = options.limit ?? DEFAULT_SEARCH_LIMIT
  return modules
    .map((module) => ({ module, score: scoreModule(module, query) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.module.name.localeCompare(b.module.name))
    .slice(0, limit)
}

// ---------------------------------------------------------------------------
// Clipboard
// ---------------------------------------------------------------------------

export function copyToClipboard(text) {
  try {
    const platform = process.platform
    if (platform === 'darwin') {
      execSync('pbcopy', { input: text })
    } else if (platform === 'win32') {
      execSync('clip', { input: text })
    } else {
      let copied = false
      for (const cmd of ['clip.exe', 'xclip -selection clipboard', 'xsel --clipboard --input']) {
        try {
          execSync(cmd, { input: text, stdio: ['pipe', 'pipe', 'pipe'] })
          copied = true
          break
        } catch { /* try next */ }
      }
      if (!copied) throw new Error('No clipboard command available')
    }
    console.log('✓ Copied to clipboard')
  } catch {
    console.log('Could not copy to clipboard. Text printed above.')
  }
}
