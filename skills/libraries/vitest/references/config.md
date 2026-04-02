---
name: skills/libraries/vitest/references/config
description: >
  Deeper Vitest configuration reference for merged Vite config, common test
  options, projects, and coverage settings.
type: reference
category: libraries
library: vitest
library_version: "4.x"
sources:
  - https://raw.githubusercontent.com/antfu/skills/main/skills/vitest/references/core-config.md
  - https://vitest.dev/guide/
---

# Vitest Config References

## Preferred Shape

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    include: ['src/**/*.test.ts'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## High-Value Options

- `environment`: `node`, `jsdom`, `happy-dom`, or `edge-runtime`
- `setupFiles`: bootstraps matchers, polyfills, and per-suite hooks
- `include` / `exclude`: keep the test surface explicit
- `clearMocks`, `mockReset`, `restoreMocks`: choose reset behavior intentionally
- `coverage.provider`: `v8` for speed and simplicity, `istanbul` when tooling or instrumentation needs it

## Separate Config Files

If a repo keeps both `vite.config.ts` and `vitest.config.ts`, merge them so aliases and plugins stay aligned.

```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'node',
  },
}))
```

## Projects

Use `test.projects` when one repository needs distinct runtimes or file sets in the same run.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'dom',
          include: ['src/**/*.dom.test.ts'],
          environment: 'jsdom',
        },
      },
    ],
  },
})
```
