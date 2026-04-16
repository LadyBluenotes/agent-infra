---
name: skills/preferences/ref/package-manager
description: >
  Personal package-manager policy reference for lockfiles, pnpm preference,
  mixed-lockfile handling, and dependency-change review.
type: reference
category: preferences
depth: reference
tags:
  - preferences
  - package manager
  - lockfile
sources:
  - AGENTS.md
---

# Package Manager Preference Reference

## Setup

Use this when changing package manager files, lockfiles, or dependency commands.

## Core Patterns

### Detect current policy from files and scripts

```text
Signals:
- pnpm-lock.yaml
- package-lock.json
- yarn.lock
- bun.lock
- packageManager in package.json
- README install commands
```

Read before deciding.

### Ask before resolving mixed policy

```text
Current repo has both `pnpm-lock.yaml` and `package-lock.json`.
Unknown whether npm compatibility is intentional.
```

Do not delete a lockfile as cleanup without explicit approval.

### Prefer pnpm once selected

```sh
pnpm install
pnpm add -D vitest
pnpm test
```

When pnpm is the chosen policy, use pnpm consistently.

## Common Mistakes

### HIGH Running install with the wrong manager

```text
Wrong: run `npm install` in a pnpm-only repo.
Correct: run the package manager indicated by the repo policy.
```

Wrong-manager installs can create lockfile churn and dependency graph drift.
