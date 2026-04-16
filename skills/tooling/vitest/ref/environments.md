---
name: skills/tooling/vitest/ref/environments
description: >
  Vitest environment reference for node, jsdom, happy-dom, edge-runtime,
  per-file environment control, and DOM test setup.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - environment
  - jsdom
  - happy-dom
sources:
  - https://vitest.dev/guide/environment.html
---

# Vitest Environments Reference

## Setup

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

## Core Patterns

### Use `node` for non-DOM logic

```ts
export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

Server, CLI, resolver, and pure utility tests should normally stay in `node`.

### Use a DOM environment for browser APIs

```ts
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

DOM APIs such as `document`, layout events, and browser globals need a browser-like environment.

### Keep one-off environment needs local

```ts
// @vitest-environment jsdom

import { expect, it } from 'vitest'

it('reads document text', () => {
  document.body.innerHTML = '<button>Save</button>'
  expect(document.querySelector('button')?.textContent).toBe('Save')
})
```

Use per-file environment comments when only a few files need DOM globals.

## Common Mistakes

### HIGH Testing DOM code in `node`

```ts
// Wrong with the default node environment
document.body.innerHTML = '<button>Save</button>'
```

```ts
// Correct
// @vitest-environment jsdom
```

The default environment does not provide browser DOM globals.

### MEDIUM Setting the whole suite to DOM for one file

```ts
// Wrong for mostly CLI/server repos
test: { environment: 'jsdom' }
```

```ts
// Correct
// @vitest-environment jsdom
```

Use the narrowest environment that matches the code under test.
