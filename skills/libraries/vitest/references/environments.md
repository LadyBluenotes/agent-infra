---
name: skills/libraries/vitest/references/environments
description: >
  Deeper Vitest environment reference for `node`, `jsdom`, `happy-dom`,
  per-file environment overrides, and environment-specific asset caveats.
type: reference
category: libraries
library: vitest
library_version: "4.x"
sources:
  - https://vitest.dev/guide/environment.html
---

# Vitest Environment References

## Built-In Choices

| Environment | Best for | Notes |
| --- | --- | --- |
| `node` | Pure server-side logic, utilities, data transforms | Default and simplest |
| `jsdom` | Browser-like DOM testing with wider API coverage | Heavier, but more complete |
| `happy-dom` | Faster DOM-like testing when API needs are simple | Can miss browser APIs |
| `edge-runtime` | Edge-specific code paths | Niche, targeted use |

## File-Level Override

```ts
// @vitest-environment jsdom

import { expect, test } from 'vitest'

test('has access to window', () => {
  expect(typeof window).toBe('object')
})
```

Use control comments when one file needs a different runtime than the rest of the project.

## CSS and Asset Caveat

When using `jsdom` or `happy-dom`, imported CSS and asset handling follows Vite rules. If external dependencies fail on CSS imports, inline the whole dependency chain with `server.deps.inline`.

## Practical Rule

- Default to `node`.
- Switch to `jsdom` for browser APIs or DOM libraries.
- Try `happy-dom` only when the suite is bottlenecked and its API coverage is sufficient.
