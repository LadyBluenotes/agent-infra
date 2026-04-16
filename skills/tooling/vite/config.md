---
name: skills/tooling/vite/config
description: >
  Vite config guidance for defineConfig, conditional config, config loaders,
  env loading, aliases, SSR flags, and shared app/test config.
type: skill
category: tooling
library: vite
depth: primary
tags:
  - vite
  - config
  - loadEnv
references:
  - skills/tooling/vite/ref/environment-api
sources:
  - https://vite.dev/config/
---

# Vite Config

## Setup

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

## Core Patterns

### Use function config for command-specific behavior

```ts
export default defineConfig(({ command, isSsrBuild }) => {
  return {
    build: {
      sourcemap: command === 'build' && isSsrBuild !== true,
    },
  }
})
```

Compare optional flags explicitly when tools may pass `undefined`.

### Load env manually only for config-time needs

```ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```

Use `loadEnv` when `.env*` values influence the config itself.

### Choose config loader only when needed

```sh
vite --configLoader runner
vite --configLoader native
```

Use loader flags for monorepo TypeScript config or native runtime needs, not as default churn.

## Common Mistakes

### HIGH Splitting Vite and Vitest alias config

```ts
// Wrong: app alias exists only in vite.config.ts
```

```ts
// Correct: merge Vite config from vitest.config.ts when tests need app aliases
```

Keep test and app transforms aligned when the tested code depends on Vite config.
