---
name: skills/tooling/pnpm/basics
description: >
  pnpm basics for installs, workspace-aware dependency commands, lockfile
  expectations, and when to load deeper pnpm refs.
type: skill
category: tooling
library: pnpm
depth: primary
aliases:
  - pnpm
tags:
  - pnpm
  - package manager
  - install
references:
  - skills/tooling/pnpm/workspaces
  - skills/tooling/pnpm/ref/catalogs
  - skills/tooling/pnpm/ref/patches
sources:
  - https://pnpm.io/workspaces
  - https://github.com/antfu/skills/tree/main/skills/pnpm
---

# pnpm Basics

## Setup

```sh
pnpm install
pnpm add -D vitest
pnpm test
```

## Core Patterns

### Prefer pnpm commands when the repo has `pnpm-lock.yaml`

```sh
pnpm install
pnpm add -D typescript
pnpm run build
```

Do not mix package managers unless the repo explicitly supports it.

### Use workspace-aware commands in monorepos

```sh
pnpm --filter ./packages/app test
pnpm --filter @scope/pkg build
```

Use filters to target packages instead of running every workspace task by default.

### Load refs for advanced dependency policy

- Workspaces and `workspace:`: @skills/tooling/pnpm/workspaces.md
- Catalogs: @skills/tooling/pnpm/ref/catalogs.md
- Patch workflow: @skills/tooling/pnpm/ref/patches.md

## Common Mistakes

### HIGH Creating a second lockfile

```sh
# Wrong in a pnpm repo
npm install
```

```sh
# Correct
pnpm install
```

Mixed lockfiles make dependency changes harder to review and can change install behavior.

### MEDIUM Installing workspace dependencies from the registry by accident

```json
{
  "dependencies": {
    "@scope/core": "^1.0.0"
  }
}
```

```json
{
  "dependencies": {
    "@scope/core": "workspace:*"
  }
}
```

Use `workspace:` when the dependency must resolve to a local workspace package.
