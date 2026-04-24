import { execSync } from 'child_process'
import { resolveRepoRoot } from '../helpers.mjs'

export async function cmdPull() {
  const root = resolveRepoRoot()
  if (!root) {
    console.error('Error: Could not find registry.yaml.')
    process.exit(1)
  }

  if (root.mode === 'installed') {
    console.log('Installed via npm. Update with:')
    console.log('  npm update @ladybluenotes/agents')
    return
  }

  const { basePath } = root

  console.log('Pulling latest from remote...')
  console.log()

  try {
    // Show current HEAD before pull
    const beforeSha = execSync('git rev-parse --short HEAD', {
      cwd: basePath,
      encoding: 'utf8',
    }).trim()

    // Pull
    const pullOutput = execSync('git pull', {
      cwd: basePath,
      encoding: 'utf8',
    })
    console.log(pullOutput.trim())

    // Show current HEAD after pull
    const afterSha = execSync('git rev-parse --short HEAD', {
      cwd: basePath,
      encoding: 'utf8',
    }).trim()

    if (beforeSha === afterSha) {
      console.log('\nAlready up to date.')
    } else {
      console.log(`\nUpdated ${beforeSha} → ${afterSha}`)
      console.log()

      // Show what changed
      const diffStat = execSync(`git diff --stat ${beforeSha}..${afterSha}`, {
        cwd: basePath,
        encoding: 'utf8',
      })
      console.log(diffStat.trim())
    }
  } catch (err) {
    console.error(`Error pulling: ${err.message}`)
    process.exit(1)
  }
}
