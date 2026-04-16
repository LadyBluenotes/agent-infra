---
name: skills/tooling/vite/plugins
description: >
  Vite plugin guidance for plugin factories, plugin arrays, ordering,
  Vite-specific hooks, virtual modules, and when to inspect transforms.
type: skill
category: tooling
library: vite
depth: primary
tags:
  - vite
  - plugins
  - virtual modules
references:
  - skills/tooling/vite/ref/environment-api
sources:
  - https://vite.dev/guide/api-plugin.html
---

# Vite Plugins

## Setup

```ts
import { defineConfig } from 'vite'
import inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [inspect()],
})
```

## Core Patterns

### Prefer a plugin factory

```ts
export function myPlugin(options = {}) {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (!id.endsWith('.custom')) return null
      return transformCustom(code, options)
    },
  }
}
```

Factories let users configure behavior without sharing mutable module state.

### Keep plugins in the `plugins` array

```ts
export default defineConfig({
  plugins: [myPlugin(), condition && otherPlugin()],
})
```

Vite ignores falsy plugins and flattens plugin presets, so conditional composition can stay local to config.

### Inspect transform chains while debugging

```ts
import inspect from 'vite-plugin-inspect'

plugins: [inspect()]
```

Use inspection when plugin ordering or generated modules are unclear.

## Common Mistakes

### HIGH Creating a plugin before checking built-in features

```text
Wrong: author a custom asset plugin before checking Vite asset handling.
Correct: use built-in Vite features when they cover the need.
```

Plugins add long-term maintenance surface; reach for them when the built-in feature set is insufficient.
