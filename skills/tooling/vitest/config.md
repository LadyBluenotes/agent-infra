---
name: skills/tooling/vitest/config
description: >
  Vitest configuration for Vite integration, test defaults, setup files,
  projects, coverage, and environment selection.
type: skill
category: tooling
library: vitest
depth: primary
tags:
  - vitest
  - config
  - vite config
references:
  - skills/tooling/vitest/ref/environments
  - skills/tooling/vitest/ref/coverage
  - skills/tooling/vitest/ref/benchmarks
sources:
  - https://vitest.dev/config/
  - https://github.com/antfu/skills/tree/main/skills/vitest
---

# Vitest Config

## Setup

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    setupFiles: ['./test/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## Core Patterns

### Reuse Vite config when app transforms matter

```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'node',
  },
}))
```

When aliases, plugins, or transforms matter to tests, merge from the Vite config instead of creating a disconnected test config.

### Keep default test behavior explicit

```ts
export default defineConfig({
  test: {
    globals: false,
    clearMocks: true,
    restoreMocks: true,
  },
})
```

Explicit defaults make mixed repos easier to scan and reduce accidental mock leakage.

### Put environment detail in refs

- `node`, `jsdom`, `happy-dom`, and per-file environments: @skills/tooling/vitest/ref/environments.md
- Coverage providers and reporters: @skills/tooling/vitest/ref/coverage.md
- Benchmark config and CodSpeed: @skills/tooling/vitest/ref/benchmarks.md

## Common Mistakes

### HIGH Splitting configs without preserving app resolution

```ts
// Wrong when aliases/plugins matter
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { environment: 'node' },
})
```

```ts
// Correct
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: { environment: 'node' },
}))
```

Disconnected configs can make tests resolve modules differently from the app.

### MEDIUM Hiding global test APIs in new projects

```ts
// Wrong for this repo style
test('works', () => {
  expect(value).toBe(true)
})
```

```ts
// Correct
import { expect, test } from 'vitest'

test('works', () => {
  expect(value).toBe(true)
})
```

Use `globals: true` only when the repo already standardizes on it.
