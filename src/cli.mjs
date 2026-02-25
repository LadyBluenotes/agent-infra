#!/usr/bin/env node

import { Command } from 'commander'
import { cmdList } from './commands/list.mjs'
import { cmdShow } from './commands/show.mjs'
import { cmdInit } from './commands/init.mjs'
import { cmdInstall } from './commands/install.mjs'
import { cmdPull } from './commands/pull.mjs'
import { cmdGenerate } from './commands/generate.mjs'

const program = new Command()

program
  .name('ladybluenotes')
  .description('Personal CLI toolkit')
  .version('1.0.0')

const agents = program
  .command('agents')
  .description('Manage AI coding agent skills, rules, and agents')

agents
  .command('list')
  .description('List available skills, agents, rules, and contexts')
  .option('-c, --category <category>', 'Filter by category (code, docs, review, debug, research, seo)')
  .option('-t, --type <type>', 'Filter by type (skill, agent, rule, context)')
  .option('--json', 'Output as JSON')
  .action(cmdList)

agents
  .command('show <name>')
  .description('Show the full content of a module by name')
  .action(cmdShow)

agents
  .command('init')
  .description('Add agent-infra prompt to agent config files in the current project')
  .action(cmdInit)

agents
  .command('install')
  .description('Install skills and agents into a project')
  .option('-c, --category <category>', 'Install only a specific category')
  .option('-g, --global', 'Install to user-level agent directories')
  .action(cmdInstall)

agents
  .command('pull')
  .description('Pull latest skills from the remote repo')
  .action(cmdPull)

agents
  .command('generate')
  .description('Bootstrap a new skill using the meta skills')
  .action(cmdGenerate)

program.parse()
