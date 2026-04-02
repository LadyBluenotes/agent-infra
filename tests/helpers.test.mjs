import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { resolveRepoRoot } from '../src/helpers.mjs'

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
