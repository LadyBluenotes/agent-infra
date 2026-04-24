---
name: skills/tooling/vitest/ref/projects
description: >
  Vitest projects reference for monorepos, replacing workspace config,
  inline project configs, `defineProject`, unique names, and browser/node test splits.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - projects
  - workspace
  - monorepo
sources:
  - https://vitest.dev/guide/projects
---

# Vitest Projects Reference

## Setup

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['packages/*'],
  },
})
```

## Core Patterns

### Use `projects`, not `workspace`

```ts
export default defineConfig({
  test: {
    projects: ['packages/*'],
  },
})
```

`workspace` is the old name; use `projects` in new skills, docs, and configs.

### Split test strategies with inline projects

```ts
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          include: ['tests/**/*.node.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'dom',
          include: ['tests/**/*.dom.test.ts'],
          environment: 'happy-dom',
        },
      },
    ],
  },
})
```

Inline projects are useful for unit/browser/visual splits inside one package.

### Use `defineProject` in project config files

```ts
import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'package-a',
    environment: 'node',
  },
})
```

`defineProject` gives better type safety for project-level config than `defineConfig`.

## Common Mistakes

### HIGH Assuming root config is also a project

```ts
// Wrong assumption
export default defineConfig({
  test: {
    projects: ['packages/*'],
    environment: 'node',
  },
})
```

```ts
// Correct
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'root',
          include: ['tests/**/*.test.ts'],
          environment: 'node',
        },
      },
      'packages/*',
    ],
  },
})
```

The root config provides global options; it is not treated as a project unless listed.

### HIGH Reusing project names

```ts
// Wrong
projects: [
  { test: { name: 'unit' } },
  { test: { name: 'unit' } },
]
```

```ts
// Correct
projects: [
  { test: { name: 'node-unit' } },
  { test: { name: 'browser-unit' } },
]
```

Vitest requires unique project names.
