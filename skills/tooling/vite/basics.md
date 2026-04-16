---
name: skills/tooling/vite/basics
description: >
  Vite basics for dev server, production build, config discovery, env loading,
  and choosing config or plugin refs.
type: skill
category: tooling
library: vite
depth: primary
aliases:
  - vite
tags:
  - vite
  - dev server
  - build
references:
  - skills/tooling/vite/config
  - skills/tooling/vite/plugins
  - skills/tooling/vite/ref/environment-api
sources:
  - https://vite.dev/config/
  - https://github.com/antfu/skills/tree/main/skills/vite
---

# Vite Basics

## Setup

```sh
vite
vite build
vite preview
```

## Core Patterns

### Keep config typed

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
})
```

Use `defineConfig` or `satisfies UserConfig` so editors and TypeScript catch option mistakes.

### Treat dev and build as different commands

```ts
export default defineConfig(({ command }) => {
  return command === 'serve'
    ? { server: { port: 5173 } }
    : { build: { sourcemap: true } }
})
```

Vite config functions receive `serve` for dev and `build` for production builds.

### Load deeper pages by task

- Config details: @skills/tooling/vite/config.md
- Plugin authoring and ordering: @skills/tooling/vite/plugins.md
- Environment API: @skills/tooling/vite/ref/environment-api.md

## Common Mistakes

### HIGH Reading `.env` from `process.env` inside config without loading it

```ts
// Wrong
export default defineConfig({
  server: {
    port: Number(process.env.APP_PORT),
  },
})
```

```ts
// Correct
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
    },
  }
})
```

Vite loads `.env*` files after user config resolution unless you call `loadEnv` yourself.
