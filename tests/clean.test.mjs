import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { collectDefaultCleanPaths, isOwnedCleanPath } from '../src/commands/clean.mjs'

const tmpRoots = []

afterEach(() => {
  for (const tmpRoot of tmpRoots.splice(0)) {
    fs.rmSync(tmpRoot, { recursive: true, force: true })
  }
})

describe('clean path safety', () => {
  it('allows only owned project, global, and namespaced tmp paths', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ladybluenotes-clean-test-'))
    tmpRoots.push(tmpDir)
    const cwd = path.join(tmpDir, 'repo')
    const home = path.join(tmpDir, 'home')

    expect(isOwnedCleanPath(path.join(cwd, '.agents', 'tmp'), { cwd, home, tmpDir })).toBe(true)
    expect(isOwnedCleanPath(path.join(cwd, '.agents', 'cache', 'x'), { cwd, home, tmpDir })).toBe(true)
    expect(isOwnedCleanPath(path.join(home, '.agents', 'tmp'), { cwd, home, tmpDir })).toBe(true)
    expect(isOwnedCleanPath(path.join(tmpDir, 'ladybluenotes-task-abc'), { cwd, home, tmpDir })).toBe(true)

    expect(isOwnedCleanPath(path.join(cwd, 'node_modules'), { cwd, home, tmpDir })).toBe(false)
    expect(isOwnedCleanPath(path.join(home, '.cache'), { cwd, home, tmpDir })).toBe(false)
    expect(isOwnedCleanPath(path.join(tmpDir, 'other-task-abc'), { cwd, home, tmpDir })).toBe(false)
  })

  it('collects existing namespaced tmp directories', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ladybluenotes-clean-test-'))
    tmpRoots.push(tmpDir)
    const cwd = path.join(tmpDir, 'repo')
    const ownedTmp = path.join(tmpDir, 'ladybluenotes-task-abc')
    const otherTmp = path.join(tmpDir, 'other-task-abc')

    fs.mkdirSync(ownedTmp, { recursive: true })
    fs.mkdirSync(otherTmp, { recursive: true })

    const paths = collectDefaultCleanPaths({ cwd, tmpDir })

    expect(paths).toContain(path.join(cwd, '.agents', 'tmp'))
    expect(paths).toContain(path.join(cwd, '.agents', 'cache'))
    expect(paths).toContain(ownedTmp)
    expect(paths).not.toContain(otherTmp)
  })
})
