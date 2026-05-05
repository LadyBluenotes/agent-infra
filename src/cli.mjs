#!/usr/bin/env node

import { Command } from 'commander'
import { cmdList } from './commands/list.mjs'
import { cmdShow } from './commands/show.mjs'
import { cmdSearch } from './commands/search.mjs'
import { cmdInit } from './commands/init.mjs'
import { cmdInstall } from './commands/install.mjs'
import { cmdPull } from './commands/pull.mjs'
import { cmdGenerate } from './commands/generate.mjs'
import { cmdClean } from './commands/clean.mjs'

const program = new Command()

program
  .name('ladybluenotes')
  .description('Personal CLI toolkit')
  .version('1.0.0')

const registerModuleCommands = (parent) => {
  parent
    .command('list')
    .description('List available skills, agents, rules, and contexts')
    .option('-c, --category <category>', 'Filter by category (code, docs, review, debug, research, seo)')
    .option('-t, --type <type>', 'Filter by type (skill, agent, rule, context)')
    .option('--json', 'Output as JSON')
    .action(cmdList)

  parent
    .command('show <name>')
    .description('Show the full content of a module by name')
    .action(cmdShow)

  parent
    .command('search <query...>')
    .description('Search modules by prompt terms')
    .option('--references', 'Include reference-depth modules')
    .option('--limit <number>', 'Maximum results to print', '10')
    .option('--json', 'Output as JSON')
    .action(cmdSearch)

  parent
    .command('init')
    .description('Add agent-infra prompt to agent config files in the current project')
    .action(cmdInit)

  parent
    .command('install')
    .description('Install skills and agents into a project')
    .option('-c, --category <category>', 'Install only a specific category')
    .option('-g, --global', 'Install to user-level agent directories')
    .action(cmdInstall)

  parent
    .command('pull')
    .description('Pull latest skills from the remote repo')
    .action(cmdPull)

  parent
    .command('generate')
    .description('Bootstrap a new skill using the meta skills')
    .action(cmdGenerate)

  parent
    .command('clean')
    .description('Clean LadyBluenotes-owned temp/cache files and tracked processes')
    .option('--yes', 'Actually clean files and stop tracked processes')
    .option('-g, --global', 'Include user-level .agents temp/cache/process records')
    .option('--path <path...>', 'Clean additional LadyBluenotes-owned paths')
    .action(cmdClean)
}

const agents = program
  .command('agents')
  .description('Manage AI coding agent skills, rules, and agents')

registerModuleCommands(agents)

const skills = program
  .command('skills')
  .description('Manage AI coding agent skills')

registerModuleCommands(skills)

program.parse()
