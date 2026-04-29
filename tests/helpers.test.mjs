import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  findSolidMajorFromPackageJson,
  isReferenceModule,
  moduleMatchesName,
  resolveRepoRoot,
  searchModules,
  solidMajorFromVersionSpec,
} from '../src/helpers.mjs'

function makeRegistry(dir) {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'registry.yaml'), 'schema_version: 1\n')
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('resolveRepoRoot', () => {
  it('prefers the nearest repo over installed and global skill roots', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-infra-'))
    const repoDir = path.join(tmpDir, 'repo')
    const nestedDir = path.join(repoDir, 'packages', 'app')
    const installedDir = path.join(nestedDir, 'node_modules', '@ladybluenotes', 'agents')
    const fakeHome = path.join(tmpDir, 'home')
    const globalDir = path.join(fakeHome, '.agents', 'skills')

    makeRegistry(repoDir)
    makeRegistry(installedDir)
    makeRegistry(globalDir)
    vi.stubEnv('HOME', fakeHome)

    expect(resolveRepoRoot(nestedDir)).toEqual({
      basePath: repoDir,
      mode: 'repo',
    })
  })

  it('falls back to the installed package before the global skill root', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-infra-'))
    const projectDir = path.join(tmpDir, 'project')
    const installedDir = path.join(projectDir, 'node_modules', '@ladybluenotes', 'agents')
    const fakeHome = path.join(tmpDir, 'home')
    const globalDir = path.join(fakeHome, '.agents', 'skills')

    makeRegistry(installedDir)
    makeRegistry(globalDir)
    vi.stubEnv('HOME', fakeHome)

    expect(resolveRepoRoot(projectDir)).toEqual({
      basePath: installedDir,
      mode: 'installed',
    })
  })
})

describe('module discovery helpers', () => {
  const primary = {
    name: 'skills/tooling/vitest/basics',
    relPath: 'skills/tooling/vitest/basics.md',
    frontmatter: {
      aliases: ['vitest'],
      category: 'tooling',
      description: 'Vitest basics and test workflow.',
      depth: 'primary',
      tags: ['vitest', 'testing'],
      type: 'skill',
    },
  }

  const reference = {
    name: 'skills/tooling/vitest/ref/mocking',
    relPath: 'skills/tooling/vitest/ref/mocking.md',
    frontmatter: {
      category: 'tooling',
      description: 'Deep Vitest mocking reference for vi.mock and vi.fn.',
      depth: 'reference',
      tags: ['vitest', 'mocking', 'vi.mock'],
      type: 'reference',
    },
  }

  const solidV1 = {
    name: 'skills/frameworks/solid/data',
    relPath: 'skills/frameworks/solid/data.md',
    frontmatter: {
      category: 'frameworks',
      description: 'Solid data-loading guidance for resources and pending UI.',
      library: 'solidjs',
      library_version: '1.x',
      tags: ['solid', 'data'],
      type: 'sub-skill',
    },
  }

  const solidV2 = {
    name: 'skills/frameworks/solid/v2/async-data',
    relPath: 'skills/frameworks/solid/v2/async-data.md',
    frontmatter: {
      category: 'frameworks',
      description: 'Solid 2.0 beta async-data guidance for Loading and isPending.',
      library: 'solidjs',
      library_version: '2.0 beta',
      tags: ['solid', 'v2', 'async', 'data'],
      type: 'sub-skill',
    },
  }

  it('matches aliases and normalized paths', () => {
    expect(moduleMatchesName(primary, 'vitest')).toBe(true)
    expect(moduleMatchesName(reference, 'skills/tooling/vitest/ref/mocking')).toBe(true)
  })

  it('identifies reference-depth modules', () => {
    expect(isReferenceModule(primary)).toBe(false)
    expect(isReferenceModule(reference)).toBe(true)
  })

  it('ranks specific reference matches above broad primary matches', () => {
    const results = searchModules([primary, reference], 'vitest mocking', { limit: 2 })
    expect(results[0].module.name).toBe('skills/tooling/vitest/ref/mocking')
  })

  it('defaults unversioned Solid searches to stable v1 skills', () => {
    const results = searchModules([solidV1, solidV2], 'solid data', { limit: 2 })
    expect(results[0].module.name).toBe('skills/frameworks/solid/data')
  })

  it('routes unversioned Solid searches from detected project version', () => {
    const results = searchModules([solidV1, solidV2], 'solid data', { limit: 2, solidMajor: 2 })
    expect(results[0].module.name).toBe('skills/frameworks/solid/v2/async-data')
  })

  it('routes explicit Solid v2 searches to beta skills', () => {
    const results = searchModules([solidV1, solidV2], 'solid v2 data', { limit: 2, solidMajor: 1 })
    expect(results[0].module.name).toBe('skills/frameworks/solid/v2/async-data')
  })
})

describe('Solid project version detection', () => {
  it('detects Solid major versions from package specs', () => {
    expect(solidMajorFromVersionSpec('^1.9.0')).toBe(1)
    expect(solidMajorFromVersionSpec('>=1 <2')).toBe(1)
    expect(solidMajorFromVersionSpec('>=1.0.0 <2')).toBe(1)
    expect(solidMajorFromVersionSpec('2.0.0-beta.8')).toBe(2)
    expect(solidMajorFromVersionSpec('next')).toBe(2)
    expect(solidMajorFromVersionSpec('catalog:solid')).toBeNull()
    expect(solidMajorFromVersionSpec('>=1 <3')).toBeNull()
  })

  it('walks upward to find solid-js in package.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-infra-solid-'))
    const repoDir = path.join(tmpDir, 'repo')
    const nestedDir = path.join(repoDir, 'packages', 'app')
    fs.mkdirSync(nestedDir, { recursive: true })
    fs.writeFileSync(
      path.join(repoDir, 'package.json'),
      JSON.stringify({ dependencies: { 'solid-js': '2.0.0-beta.8' } }),
    )

    await expect(findSolidMajorFromPackageJson(nestedDir)).resolves.toBe(2)
  })
})
