---
name: skills/tooling/pnpm/workspaces
description: >
  pnpm workspace guidance for pnpm-workspace.yaml, workspace protocol,
  filters, local package linking, and monorepo dependency expectations.
type: skill
category: tooling
library: pnpm
depth: primary
tags:
  - pnpm
  - workspaces
  - monorepo
references:
  - skills/tooling/pnpm/ref/catalogs
sources:
  - https://pnpm.io/workspaces
---

# pnpm Workspaces

## Setup

```yaml
# pnpm-workspace.yaml
packages:
  - packages/*
  - apps/*
```

```json
{
  "dependencies": {
    "@scope/core": "workspace:*"
  }
}
```

## Core Patterns

### Keep the workspace root explicit

```yaml
packages:
  - packages/*
```

pnpm workspaces require a `pnpm-workspace.yaml` file in the workspace root.

### Use `workspace:` for local-only dependencies

```json
{
  "dependencies": {
    "@scope/core": "workspace:^"
  }
}
```

The `workspace:` protocol prevents falling back to registry packages when a local dependency is required.

### Filter commands to the package being changed

```sh
pnpm --filter @scope/core test
pnpm --filter ./packages/core build
```

Use filters for focused checks, then broaden verification when the change touches shared behavior.

## Common Mistakes

### HIGH Assuming local packages always link

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
    "@scope/core": "workspace:^"
  }
}
```

Without `workspace:`, pnpm can resolve a compatible dependency from the registry depending on settings and available versions.

### MEDIUM Ignoring workspace cycles

```text
Wrong: ignore cyclic workspace dependency warnings.
Correct: inspect dependencies, optionalDependencies, and devDependencies.
```

pnpm warns about workspace cycles because script ordering may not be topological.
