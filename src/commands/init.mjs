import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import readline from 'readline'
import { copyToClipboard } from '../helpers.mjs'

const PROMPT_BLOCK = `## Agent Infrastructure

This project uses @ladybluenotes/agents for AI coding agent skills.
At the start of each session, run:

  ladybluenotes skills list

This returns available skills with descriptions grouped by type.
Use skill names to decide which to load for the current task.
View full skill content with:

  ladybluenotes skills show <name>`

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

export async function cmdInit() {
  const configFiles = [
    'AGENTS.md',
    'CLAUDE.md',
    '.cursorrules',
    '.github/copilot-instructions.md',
    '.windsurfrules',
    '.codex/instructions.md',
  ]

  const found = configFiles.filter((f) => fs.existsSync(path.resolve(f)))

  if (found.length > 0) {
    console.log(`Found config files: ${found.join(', ')}`)
    console.log()
    console.log('How would you like to add the agent-infra prompt?')
    console.log()
    console.log(`  1. Add to detected config files (${found.join(', ')})`)
    console.log('  2. Copy to clipboard')
    console.log("  3. I'll add it manually")
    console.log()
    const choice = await prompt('Choose (1/2/3): ')

    if (choice === '1') {
      for (const f of found) {
        const filePath = path.resolve(f)
        await fsp.appendFile(filePath, '\n\n' + PROMPT_BLOCK + '\n')
        console.log(`✓ Added to ${f}`)
      }
    } else if (choice === '2') {
      copyToClipboard(PROMPT_BLOCK)
    } else {
      console.log()
      console.log(PROMPT_BLOCK)
    }
  } else {
    console.log('No agent config files detected in this directory.')
    console.log()
    console.log('How would you like to add the agent-infra prompt?')
    console.log()
    console.log('  1. Create AGENTS.md with the prompt block')
    console.log('  2. Copy to clipboard')
    console.log("  3. I'll add it manually")
    console.log()
    const choice = await prompt('Choose (1/2/3): ')

    if (choice === '1') {
      await fsp.writeFile(path.resolve('AGENTS.md'), PROMPT_BLOCK + '\n')
      console.log('✓ Created AGENTS.md')
    } else if (choice === '2') {
      copyToClipboard(PROMPT_BLOCK)
    } else {
      console.log()
      console.log(PROMPT_BLOCK)
    }
  }
}
