import fs from 'fs'
import fsp from 'fs/promises'
import os from 'os'
import path from 'path'

const OWNED_DIRS = ['tmp', 'cache']
const PROCESS_DIR = 'processes'

function isSubpath(parent, child) {
  const rel = path.relative(parent, child)
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel))
}

function isNamespacedTmpPath(filePath, tmpDir) {
  const resolved = path.resolve(filePath)
  const tmpRoot = path.resolve(tmpDir)
  const rel = path.relative(tmpRoot, resolved)
  if (rel.startsWith('..') || path.isAbsolute(rel) || rel === '') return false

  const firstSegment = rel.split(path.sep)[0]
  if (!/^ladybluenotes-[A-Za-z0-9._-]+$/.test(firstSegment)) return false

  return isSubpath(path.join(tmpRoot, firstSegment), resolved)
}

export function isOwnedCleanPath(filePath, options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd())
  const home = options.home ? path.resolve(options.home) : null
  const tmpDir = options.tmpDir ?? os.tmpdir()
  const resolved = path.resolve(filePath)

  const roots = OWNED_DIRS.map((dir) => path.join(cwd, '.agents', dir))
  if (home) {
    roots.push(...OWNED_DIRS.map((dir) => path.join(home, '.agents', dir)))
  }

  return roots.some((root) => isSubpath(root, resolved)) || isNamespacedTmpPath(resolved, tmpDir)
}

export function collectDefaultCleanPaths(options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd())
  const home = options.home ? path.resolve(options.home) : null
  const tmpDir = options.tmpDir ?? os.tmpdir()
  const includeGlobal = Boolean(options.global)
  const paths = OWNED_DIRS.map((dir) => path.join(cwd, '.agents', dir))

  if (includeGlobal && home) {
    paths.push(...OWNED_DIRS.map((dir) => path.join(home, '.agents', dir)))
  }

  if (fs.existsSync(tmpDir)) {
    for (const entry of fs.readdirSync(tmpDir, { withFileTypes: true })) {
      const fullPath = path.join(tmpDir, entry.name)
      if (entry.isDirectory() && isNamespacedTmpPath(fullPath, tmpDir)) {
        paths.push(fullPath)
      }
    }
  }

  return paths
}

function processRecordDirs(options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd())
  const home = options.home ? path.resolve(options.home) : null
  const dirs = [path.join(cwd, '.agents', PROCESS_DIR)]

  if (options.global && home) {
    dirs.push(path.join(home, '.agents', PROCESS_DIR))
  }

  return dirs
}

function isRunning(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

async function readOwnedProcessRecords(options = {}) {
  const records = []

  for (const dir of processRecordDirs(options)) {
    if (!fs.existsSync(dir)) continue

    for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.json')) continue

      const filePath = path.join(dir, entry.name)
      try {
        const record = JSON.parse(await fsp.readFile(filePath, 'utf8'))
        if (record?.owner === 'ladybluenotes' && Number.isInteger(record.pid)) {
          records.push({ ...record, filePath })
        }
      } catch {
        // Ignore unreadable or malformed process records.
      }
    }
  }

  return records
}

async function cleanPath(filePath, dryRun) {
  if (!fs.existsSync(filePath)) return false
  if (!dryRun) {
    await fsp.rm(filePath, { recursive: true, force: true })
  }
  return true
}

async function stopProcess(record, dryRun) {
  const running = isRunning(record.pid)

  if (running && !dryRun) {
    process.kill(record.pid, 'SIGTERM')
  }

  if (!running && !dryRun) {
    await fsp.rm(record.filePath, { force: true })
  }

  return running ? 'running' : 'stale'
}

export async function cmdClean(options) {
  const dryRun = !options.yes
  const home = process.env.HOME || process.env.USERPROFILE || null
  const cwd = process.cwd()
  const tmpDir = os.tmpdir()
  const requestedPaths = options.path ?? []
  const cleanPaths = [
    ...collectDefaultCleanPaths({ cwd, home, tmpDir, global: options.global }),
    ...requestedPaths.map((item) => path.resolve(item)),
  ]

  const uniquePaths = [...new Set(cleanPaths)]
  const unsafePaths = uniquePaths.filter((item) => !isOwnedCleanPath(item, { cwd, home, tmpDir }))

  if (unsafePaths.length > 0) {
    console.error('Refusing to clean paths outside LadyBluenotes-owned temp/cache roots:')
    for (const item of unsafePaths) console.error(`  ${item}`)
    process.exit(1)
  }

  console.log(dryRun ? 'Dry run. Pass --yes to clean.' : 'Cleaning LadyBluenotes-owned temp/cache paths.')
  console.log()

  let cleaned = 0
  for (const item of uniquePaths) {
    const exists = await cleanPath(item, dryRun)
    if (!exists) continue
    cleaned++
    console.log(`${dryRun ? 'Would remove' : 'Removed'} ${item}`)
  }

  const records = await readOwnedProcessRecords({ cwd, home, global: options.global })
  for (const record of records) {
    const status = await stopProcess(record, dryRun)
    const action = status === 'running'
      ? (dryRun ? 'Would stop' : 'Sent SIGTERM to')
      : (dryRun ? 'Would remove stale record for' : 'Removed stale record for')
    console.log(`${action} pid ${record.pid} (${record.command ?? 'unknown command'})`)
  }

  if (cleaned === 0 && records.length === 0) {
    console.log('Nothing to clean.')
  }
}
