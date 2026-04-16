---
name: skills/tooling/vitest/ref/mocking
description: >
  Deep Vitest mocking reference for vi.fn, vi.spyOn, vi.mock hoisting,
  fake timers, globals, environment stubs, and fetch stubs.
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
  - https://github.com/antfu/skills/tree/main/skills/vitest
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
