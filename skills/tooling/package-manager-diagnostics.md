---
name: skills/tooling/package-manager-diagnostics
description: >
  Package manager diagnostics for npm, pnpm, Yarn, and Bun install failures,
  lockfile conflicts, workspace resolution, node_modules layout, and frozen installs.
type: skill
category: tooling
depth: primary
aliases:
  - package manager diagnostics
  - install diagnostics
  - lockfile diagnostics
tags:
  - npm
  - pnpm
  - yarn
  - bun
  - lockfile
references:
  - skills/tooling/pnpm/basics
  - skills/tooling/pnpm/workspaces
  - skills/debug/local-environment
sources:
  - https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/
  - https://pnpm.io/symlinked-node-modules-structure
  - https://yarnpkg.com/features/pnp
  - https://bun.com/docs/cli/install
  - https://bun.sh/docs/install/lockfile
---

# Package Manager Diagnostics

## Setup

Use this when installs fail, dependency resolution differs between machines, multiple lockfiles appear, or package manager behavior is unclear.

## Core Patterns

### Identify the manager from repo evidence

```text
Read:
- package.json packageManager
- package-lock.json
- pnpm-lock.yaml
- yarn.lock
- bun.lock
- .npmrc
- .yarnrc.yml
- bunfig.toml
```

If signals conflict, state the conflict and avoid lockfile edits until the intended manager is known.

### Capture command truth

```sh
node --version
npm --version
pnpm --version
yarn --version
bun --version
```

Run only commands that exist in the environment. Record missing tools as evidence instead of assuming versions.

### Match symptoms to manager behavior

```text
npm: inspect package-lock.json and npm config.
pnpm: inspect .pnpm layout, hoisting config, and workspace links.
Yarn PnP: inspect .pnp.cjs and nodeLinker config.
Bun: inspect bun.lock and frozen-lockfile behavior.
```

Use official docs before explaining resolution differences.

### Prefer frozen or CI-equivalent installs for reproduction

```sh
npm ci
pnpm install --frozen-lockfile
yarn install --immutable
bun install --frozen-lockfile
```

Verify the exact repo command before running it. Some repos intentionally use custom install scripts.

## Common Mistakes

### HIGH Committing a lockfile from the wrong manager

```text
Wrong: run another manager because it is installed locally.
Correct: follow repo evidence or ask when lockfiles conflict.
```

Different package managers produce different lockfiles and install models.

### HIGH Explaining pnpm as flattened npm

```text
Wrong: assume every transitive dependency is reachable from project code.
Correct: check pnpm's symlinked layout and hoisting config.
```

pnpm's documented layout differs from a flattened `node_modules` install.

### MEDIUM Treating Yarn PnP missing node_modules as failed install

```text
Wrong: assume install failed because node_modules is absent.
Correct: check for PnP loader files and Yarn config.
```

Yarn documents PnP as a loader-based install strategy rather than a typical `node_modules` install.

### MEDIUM Assuming Bun lockfile names from memory

```text
Wrong: claim the lockfile format without checking docs or repo files.
Correct: read Bun docs and inspect the actual project lockfile.
```

Bun lockfile behavior changed across releases; current claims need current docs or repo evidence.
