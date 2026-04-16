---
name: skills/tooling/pnpm/ref/catalogs
description: >
  pnpm catalogs reference for centralizing dependency versions in
  pnpm-workspace.yaml and using catalog protocol entries.
type: reference
category: tooling
library: pnpm
depth: reference
tags:
  - pnpm
  - catalogs
  - dependency versions
sources:
  - https://pnpm.io/catalogs
---

# pnpm Catalogs Reference

## Setup

```yaml
# pnpm-workspace.yaml
catalog:
  react: ^19.2.0
  typescript: ^5.9.0

catalogs:
  testing:
    vitest: ^4.1.0
```

```json
{
  "devDependencies": {
    "vitest": "catalog:testing"
  }
}
```

## Core Patterns

### Use catalogs for shared version policy

```yaml
catalog:
  vite: ^8.0.0
  vitest: ^4.1.0
```

Catalogs keep package versions centralized across a workspace.

### Keep catalogs named by purpose

```yaml
catalogs:
  testing:
    vitest: ^4.1.0
  linting:
    eslint: ^9.0.0
```

Use named catalogs when one root catalog would become hard to scan.

## Common Mistakes

### MEDIUM Mixing catalog and literal versions casually

```json
{
  "devDependencies": {
    "vitest": "^4.1.0",
    "vite": "catalog:"
  }
}
```

```json
{
  "devDependencies": {
    "vitest": "catalog:testing",
    "vite": "catalog:"
  }
}
```

If a dependency family is governed by catalogs, keep packages on the catalog path unless there is a reason to diverge.
