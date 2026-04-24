---
name: skills/tooling/vitest/ref/environments
description: >
  Vitest environment reference for node, jsdom, happy-dom, edge-runtime,
  per-file environment control, DOM test setup, and when to use Browser Mode.
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
  - https://vitest.dev/guide/browser/
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

### Use Browser Mode for real browser behavior

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
```

`jsdom` and `happy-dom` emulate DOM APIs inside the test runner; Browser Mode runs tests in a real browser through Vite.

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

### MEDIUM Treating DOM emulation as browser coverage

```ts
// Wrong claim
test: { environment: 'jsdom' }
```

```ts
// Correct for browser-specific behavior
test: {
  browser: {
    enabled: true,
    provider: playwright(),
    instances: [{ browser: 'chromium' }],
  },
}
```

DOM environments are useful for fast unit tests, but they do not prove real browser APIs, layout, focus, or native event behavior.
