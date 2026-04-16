import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  isReferenceModule,
  moduleMatchesName,
  resolveRepoRoot,
  searchModules,
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
})
