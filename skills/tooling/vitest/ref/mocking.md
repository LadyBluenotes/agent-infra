---
name: skills/tooling/vitest/ref/mocking
description: >
  Deep Vitest mocking reference for vi.fn, vi.spyOn, vi.mock hoisting,
  browser mode limits, virtual modules, fake timers, globals, and fetch stubs.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - mocking
  - vi.mock
  - vi.fn
sources:
  - https://vitest.dev/guide/mocking.html
  - https://vitest.dev/guide/mocking/modules.html
  - https://vitest.dev/guide/browser/
---

# Vitest Mocking Reference

## Setup

```ts
import { beforeEach, expect, it, vi } from 'vitest'
import { loadUser } from './load-user'

const fetchUser = vi.fn()

vi.mock('./api', () => ({
  fetchUser: (...args: unknown[]) => fetchUser(...args),
}))

beforeEach(() => {
  fetchUser.mockReset()
})

it('returns the user', async () => {
  fetchUser.mockResolvedValue({ name: 'Ada' })

  await expect(loadUser()).resolves.toEqual({ name: 'Ada' })
})
```

## Core Patterns

### Use module mocks at external boundaries

```ts
vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}))
```

Mock modules when replacing I/O, services, or expensive boundaries.

### Use spies for existing objects

```ts
const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

warn.mockRestore()
```

Spies are better when the real object should mostly stay intact.

### Use `{ spy: true }` for Browser Mode module export spying

```ts
import * as module from './module'
import { vi } from 'vitest'

vi.mock('./module', { spy: true })

vi.mocked(module.method).mockReturnValue('mocked')
```

Browser Mode uses native ESM, so imported module namespace objects are sealed and cannot be reconfigured with ordinary `vi.spyOn`.

### Alias or resolve virtual modules before mocking

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      vscode: './test/mocks/vscode.ts',
    },
  },
})
```

Mock unresolved virtual modules by making them resolvable with `test.alias` or a Vite `resolveId` plugin first.

### Reset mock state between tests

```ts
beforeEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})
```

Clear calls and restore timers so one test cannot leak behavior into the next.

## Common Mistakes

### HIGH Forgetting `vi.mock` hoisting

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

const token = vi.hoisted(() => 'abc')

vi.mock('./auth', () => ({
  getToken: () => token,
}))
```

Mock factories are hoisted, so ordinary runtime variables can be unavailable when the factory runs.

### HIGH Letting timers leak

```ts
// Wrong
vi.useFakeTimers()
```

```ts
// Correct
afterEach(() => {
  vi.useRealTimers()
})
```

Fake timers must be restored or later tests can observe a different clock.

### HIGH Spying on imported module exports in Browser Mode

```ts
// Wrong in Browser Mode
import * as module from './module'

vi.spyOn(module, 'method')
```

```ts
// Correct in Browser Mode
import * as module from './module'

vi.mock('./module', { spy: true })
vi.mocked(module.method).mockImplementation(() => 'mocked')
```

Browser-native ESM seals the module namespace object; use Vitest's Browser Mode mock transform instead.
