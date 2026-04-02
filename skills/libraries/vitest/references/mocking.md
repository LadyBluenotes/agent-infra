---
name: skills/libraries/vitest/references/mocking
description: >
  Deeper Vitest mocking reference for `vi.fn`, `vi.spyOn`, module mocks,
  timers, globals, and environment stubbing.
type: reference
category: libraries
library: vitest
library_version: "4.x"
sources:
  - https://raw.githubusercontent.com/antfu/skills/main/skills/vitest/references/features-mocking.md
  - https://vitest.dev/guide/mocking.html
---

# Vitest Mocking References

## Choose the Lightest Tool That Matches the Boundary

| Need | Tool |
| --- | --- |
| Standalone fake function | `vi.fn()` |
| Observe or replace a method on an existing object | `vi.spyOn()` |
| Replace a whole imported module | `vi.mock()` |
| Apply a mock after runtime setup | `vi.doMock()` |

## Module Mocking

```ts
import { beforeEach, expect, it, vi } from 'vitest'
import * as api from './api'

vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(api.fetchUser).mockReset()
})

it('mocks the module export', async () => {
  vi.mocked(api.fetchUser).mockResolvedValue({ id: 1 })
  await expect(api.fetchUser()).resolves.toEqual({ id: 1 })
})
```

`vi.mock` is hoisted, so keep factories self-contained and avoid depending on ordinary runtime variables.

## Partial Mocking

```ts
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    readConfig: vi.fn(),
  }
})
```

This is useful when one export should be fake but the rest of the module should keep real behavior.

## Timers, Globals, and Env

```ts
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

it('advances time deterministically', async () => {
  const fn = vi.fn()
  setTimeout(fn, 100)
  await vi.advanceTimersByTimeAsync(100)
  expect(fn).toHaveBeenCalledTimes(1)
})
```

- Use `vi.stubGlobal` for globals such as `fetch`.
- Use `vi.stubEnv` for `import.meta.env` or env-backed tests.
- Prefer config flags like `unstubGlobals` and `unstubEnvs` when repeated cleanup is easy to forget.
