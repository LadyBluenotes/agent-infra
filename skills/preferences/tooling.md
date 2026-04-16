---
name: skills/preferences/tooling
description: >
  Personal tooling preferences for package managers, Vite/Vitest projects,
  lockfiles, commands, and dependency-change hygiene.
type: skill
category: preferences
depth: primary
tags:
  - preferences
  - tooling
  - package manager
references:
  - skills/preferences/ref/package-manager
  - skills/tooling/pnpm/basics
  - skills/tooling/vite/basics
  - skills/tooling/vitest/basics
sources:
  - AGENTS.md
---

# Tooling Preferences

## Setup

Use this for Sarah's project tooling preferences. Use tool-specific skills for external facts.

## Core Patterns

### Keep one package manager policy per repo

```text
Preferred: one lockfile matching the repo's selected package manager.
```

If a repo has multiple lockfiles, inspect history or ask before deleting any.

### Prefer local scripts for verification

```sh
pnpm test
pnpm build
```

Use repo-defined scripts when they exist; otherwise use the nearest direct tool command.

### Keep dependency changes intentional

```text
Before dependency edits:
- read package.json
- identify lockfile policy
- avoid broad install churn
```

Dependency churn should be part of the requested change, not a side effect.

## Common Mistakes

### HIGH Normalizing lockfiles without approval

```text
Wrong: delete package-lock.json because pnpm-lock.yaml exists.
Correct: record the conflict and ask or wait for explicit package-manager policy.
```

Lockfiles can be user changes or compatibility artifacts; do not remove them as cleanup without approval.
