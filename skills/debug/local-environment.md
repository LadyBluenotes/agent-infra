---
name: skills/debug/local-environment
description: >
  Local environment debugging workflow for Node, package-manager, PATH,
  lockfile, install-layout, cache, and CI-vs-local mismatches.
type: sub-skill
category: debug
depth: primary
aliases:
  - local environment
  - env debug
  - package install debug
tags:
  - node
  - package manager
  - environment
  - debugging
references:
  - skills/debug/workflow
  - skills/tooling/package-manager-diagnostics
  - skills/general/source-of-truth
sources:
  - https://nodejs.org/api/cli.html
  - https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/
  - https://pnpm.io/symlinked-node-modules-structure
  - https://yarnpkg.com/features/pnp
  - https://bun.com/docs/cli/install
---

# Local Environment Debugging

## Setup

Use this when a failure depends on the local machine, shell, Node version, package manager, lockfile, cache, or CI environment.

## Core Patterns

### Snapshot the environment before changing it

```sh
pwd
node --version
npm --version
which node
which npm
git status --short
```

Add the package manager version that matches the repo lockfile. Capture exact output before reinstalling or clearing caches.

### Read package manager signals

```text
Signals:
- package.json packageManager
- package-lock.json
- pnpm-lock.yaml
- yarn.lock
- bun.lock
- .npmrc
- .yarnrc.yml
- bunfig.toml
```

Mixed signals are a diagnosis target. Do not choose a package manager by preference until repo files are read.

### Check install layout facts against source docs

```text
npm: package-lock.json describes the generated tree for repeatable installs.
pnpm: node_modules uses hard links plus symlinks through .pnpm.
Yarn PnP: modern PnP uses a loader file instead of a node_modules install.
Bun: bun install writes bun.lock and supports --frozen-lockfile.
```

Use the manager's docs before claiming why resolution differs.

### Isolate environment variables and config

```sh
node -p "process.execPath"
node -p "process.version"
node -p "process.env.NODE_OPTIONS || ''"
node -p "process.env.NODE_PATH || ''"
```

Node documents command-line options and environment variables such as `NODE_OPTIONS` and `NODE_PATH`; inspect them before changing code for local-only failures.

## Common Mistakes

### HIGH Clearing caches before preserving evidence

```text
Wrong: delete caches, reinstall, then try to explain the original failure.
Correct: record versions, lockfiles, config, and the exact error first.
```

Cache cleanup can remove the evidence needed to identify the root cause.

### HIGH Mixing package managers to "try it"

```text
Wrong: run npm install in a pnpm repo and commit the new lockfile.
Correct: use the package manager indicated by repo files, or stop and document the conflict.
```

Different managers can create different lockfiles and install layouts.

### MEDIUM Treating CI and local shells as equivalent

```text
Wrong: assume a local shell reproduces CI environment variables and PATH.
Correct: compare Node version, package manager version, command, working directory, and env.
```

CI failures need command truth from the CI job, not only local reproduction.
