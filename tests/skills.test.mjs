import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse as parseYaml } from 'yaml'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ── Helpers ──

const BASE_DIR = join(__dirname, '..')
const REGISTRY_PATH = join(BASE_DIR, 'registry.yaml')
const MAX_LINES = 500
const DIRS_TO_SCAN = ['skills', 'agents', 'rules', 'contexts']
const VALID_TYPES = ['skill', 'sub-skill', 'reference', 'agent', 'rule', 'context']

function findMarkdownFiles(dir) {
  const files = []
  if (!existsSync(dir)) return files

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      if (entry === '_meta') continue
      files.push(...findMarkdownFiles(fullPath))
    } else if (entry.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)/)
  if (!match) return null

  try {
    const frontmatter = parseYaml(match[1])
    return { frontmatter, body: match[2] }
  } catch {
    return null
  }
}

function moduleNameFromFile(filePath) {
  return relative(BASE_DIR, filePath)
    .replace(/\.md$/, '')
    .replace(/\/SKILL$/, '')
    .split(sep)
    .join('/')
}

// ── Collect all modules ──

const allFiles = []
for (const dir of DIRS_TO_SCAN) {
  allFiles.push(...findMarkdownFiles(join(BASE_DIR, dir)))
}

const modules = allFiles.map((filePath) => {
  const content = readFileSync(filePath, 'utf-8')
  const parsed = extractFrontmatter(content)
  const name = moduleNameFromFile(filePath)
  return { filePath, content, parsed, name }
})

// ── Tests ──

describe('module discovery', () => {
  it('should find modules', () => {
    expect(allFiles.length).toBeGreaterThan(0)
  })
})

describe('frontmatter', () => {
  for (const mod of modules) {
    describe(mod.name, () => {
      it('should have valid frontmatter', () => {
        expect(mod.parsed).not.toBeNull()
      })

      if (!mod.parsed) return

      const { frontmatter } = mod.parsed

      it('should have a name', () => {
        expect(frontmatter.name).toBeTruthy()
      })

      it('should have a description', () => {
        expect(frontmatter.description).toBeTruthy()
      })

      it('should have a type', () => {
        expect(frontmatter.type).toBeTruthy()
        expect(VALID_TYPES).toContain(frontmatter.type)
      })

      it('should have name matching file path', () => {
        expect(frontmatter.name).toBe(mod.name)
      })
    })
  }
})

describe('content', () => {
  for (const mod of modules) {
    describe(mod.name, () => {
      it(`should not exceed ${MAX_LINES} lines`, () => {
        const lineCount = mod.content.split(/\r?\n/).length
        expect(lineCount).toBeLessThanOrEqual(MAX_LINES)
      })
    })
  }
})

describe('cross-references', () => {
  const allNames = new Set(modules.map((m) => m.name))
  const modulesWithRequires = modules.filter((m) => m.parsed?.frontmatter.requires)

  it('should validate requires references (if any exist)', () => {
    for (const mod of modulesWithRequires) {
      for (const req of mod.parsed.frontmatter.requires) {
        expect(allNames.has(req), `${mod.name} requires "${req}" which does not exist`).toBe(true)
      }
    }
  })
})

describe('registry.yaml', () => {
  it('should exist', () => {
    expect(existsSync(REGISTRY_PATH)).toBe(true)
  })

  const content = readFileSync(REGISTRY_PATH, 'utf-8')
  let registry

  it('should be valid YAML', () => {
    registry = parseYaml(content)
    expect(registry).toBeDefined()
  })

  it('should have schema_version', () => {
    registry = parseYaml(content)
    expect(registry.schema_version).toBeDefined()
  })

  it('should have registry info', () => {
    registry = parseYaml(content)
    expect(registry.registry).toBeDefined()
    expect(registry.registry.name).toBe('agent-infra')
  })

  it('should have categories', () => {
    registry = parseYaml(content)
    expect(registry.categories).toBeDefined()
    expect(typeof registry.categories).toBe('object')
  })

  it('should have always_include', () => {
    registry = parseYaml(content)
    expect(registry.always_include).toBeDefined()
    expect(Array.isArray(registry.always_include)).toBe(true)
  })

  describe('agent references', () => {
    registry = parseYaml(content)

    it('should point to existing files', () => {
      for (const [name, filePath] of Object.entries(registry.agents ?? {})) {
        expect(existsSync(join(BASE_DIR, filePath))).toBe(true)
      }
    })
  })

  describe('always_include references', () => {
    registry = parseYaml(content)

    it('should point to existing files', () => {
      for (const filePath of registry.always_include ?? []) {
        expect(existsSync(join(BASE_DIR, filePath))).toBe(true)
      }
    })
  })

  describe('category references', () => {
    registry = parseYaml(content)

    for (const [cat, dirs] of Object.entries(registry.categories ?? {})) {
      for (const dir of dirs) {
        it(`category "${cat}" dir "${dir}" should exist`, () => {
          expect(existsSync(join(BASE_DIR, dir))).toBe(true)
        })
      }
    }
  })
})
