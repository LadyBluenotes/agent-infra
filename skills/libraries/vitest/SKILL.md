---
name: skills/libraries/vitest
description: >
  Vitest guidance for Vite-native test setup, test authoring, mocking, CLI
  usage, and environment selection. Use when adding or maintaining unit and
  integration tests in a Vitest-based codebase.
type: sub-skill
category: libraries
library: vitest
library_version: "4.x"
sources:
  - https://github.com/antfu/skills/tree/main/skills/vitest
  - https://vitest.dev/guide/
---

# Vitest

## Setup

```ts
// vitest.config.ts
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

```ts
// src/math.ts
export function sum(a: number, b: number) {
  return a + b
}
```

```ts
// src/math.test.ts
import { describe, expect, it } from 'vitest'
import { sum } from './math'

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

Vitest works best when it shares the same Vite transform pipeline as the app, so start from one config, one test command surface, and explicit test defaults.

## Core Patterns

### Reuse Vite config unless tests truly need a split

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
  },
})
```

Vitest inherits Vite plugins, aliases, and transforms well, so prefer one source of truth unless a separate test config is materially different.

### Keep test files explicit and behavior-focused

```ts
import { describe, expect, it } from 'vitest'
import { parseSlug } from './slug'

describe('parseSlug', () => {
  it('normalizes case and spaces', () => {
    expect(parseSlug('Hello World')).toBe('hello-world')
  })

  it('removes repeated separators', () => {
    expect(parseSlug('a---b')).toBe('a-b')
  })
})
```

Keep tests close to observable behavior and use Vitest's Jest-compatible assertions directly instead of hiding basic expectations behind helpers.

### Use `vi.mock` for module boundaries and `vi.spyOn` for existing objects

```ts
import * as api from './api'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { loadUserName } from './load-user-name'

vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(api.fetchUser).mockReset()
})

describe('loadUserName', () => {
  it('returns the fetched user name', async () => {
    vi.mocked(api.fetchUser).mockResolvedValue({ name: 'Ada' })

    await expect(loadUserName()).resolves.toBe('Ada')
  })
})
```

Mock at the module seam when isolating external behavior, and use spies when you want to observe a real object without replacing the whole module.

### Match the test environment to the code under test

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

Use `node` for server-side logic, `jsdom` or `happy-dom` for DOM-oriented code, and per-file environment overrides when one suite needs a different runtime.

## Common Mistakes

### HIGH Splitting Vite and Vitest config without merging shared behavior

```ts
// Wrong
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

```ts
// Correct
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'node',
  },
}))
```

If you split configs without merging, test-time aliases and plugins can silently stop matching the app.

### HIGH Letting mocks leak between tests

```ts
// Wrong
import { describe, expect, it, vi } from 'vitest'

const fetchUser = vi.fn()

it('uses one result', () => {
  fetchUser.mockResolvedValue({ name: 'Ada' })
})

it('expects a clean mock', () => {
  expect(fetchUser).not.toHaveBeenCalled()
})
```

```ts
// Correct
import { beforeEach, expect, it, vi } from 'vitest'

const fetchUser = vi.fn()

beforeEach(() => {
  fetchUser.mockReset()
})
```

Vitest keeps mock state until you reset, clear, or restore it, so leaked calls and implementations create flaky suites.

### HIGH Using the wrong environment for DOM code

```ts
// Wrong
import { expect, it } from 'vitest'

it('renders a button', () => {
  document.body.innerHTML = '<button>Save</button>'
  expect(document.querySelector('button')?.textContent).toBe('Save')
})
```

```ts
// Correct
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

The default `node` environment does not provide browser globals, so DOM tests need an explicit browser-like environment.

### MEDIUM Hoisting surprises with `vi.mock`

```ts
// Wrong
const token = 'abc'

vi.mock('./auth', () => ({
  getToken: () => token,
}))
```

```ts
// Correct
import { vi } from 'vitest'

const mockedToken = vi.hoisted(() => 'abc')

vi.mock('./auth', () => ({
  getToken: () => mockedToken,
}))
```

`vi.mock` is hoisted, so factory code cannot safely depend on ordinary runtime variables declared later in the file.

### MEDIUM Reaching for globals without team agreement

```ts
// Wrong
test('adds values', () => {
  expect(sum(1, 2)).toBe(3)
})
```

```ts
// Correct
import { expect, test } from 'vitest'

test('adds values', () => {
  expect(sum(1, 2)).toBe(3)
})
```

`globals: true` is available, but explicit imports usually keep test files easier to scan and typecheck across mixed tooling.

## Tensions

- `jsdom` is usually more complete than `happy-dom`, but `happy-dom` can be faster for simpler DOM-oriented suites.
- One shared config is easier to maintain, but split configs can be worth it for very different monorepo test targets.
- `globals: true` reduces imports, but explicit imports make dependencies clearer.

## References

- @skills/libraries/vitest/references/config.md
- @skills/libraries/vitest/references/mocking.md
- @skills/libraries/vitest/references/environments.md
