---
name: skills/tooling/vitest/basics
description: >
  Vitest basics for Vite-native tests, explicit imports, watch versus run mode,
  and choosing focused test pages before deeper refs.
type: skill
category: tooling
library: vitest
depth: primary
aliases:
  - vitest
tags:
  - vitest
  - testing
  - test runner
references:
  - skills/tooling/vitest/config
  - skills/tooling/vitest/testing-patterns
  - skills/tooling/vitest/ref/mocking
  - skills/tooling/vitest/ref/environments
  - skills/tooling/vitest/ref/benchmarks
sources:
  - https://vitest.dev/guide/
  - https://github.com/antfu/skills/tree/main/skills/vitest
---

# Vitest Basics

## Setup

Use Vitest for Vite-native unit, integration, benchmark, and type-test workflows.

```ts
import { describe, expect, it } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

## Core Patterns

### Prefer explicit imports

```ts
import { expect, test } from 'vitest'

test('formats a label', () => {
  expect(formatLabel('save')).toBe('Save')
})
```

Explicit imports make test dependencies clear and avoid relying on `globals: true` unless a project already chose it.

### Use watch mode locally and run mode in verification

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Use `vitest` for feedback loops and `vitest run` for CI, release checks, and completion verification.

### Load deeper refs only when needed

- Config and projects: @skills/tooling/vitest/config.md
- Behavior-focused test style: @skills/tooling/vitest/testing-patterns.md
- Mocks, spies, timers, globals: @skills/tooling/vitest/ref/mocking.md
- DOM and custom environments: @skills/tooling/vitest/ref/environments.md
- CodSpeed and Vitest benchmarks: @skills/tooling/vitest/ref/benchmarks.md

## Common Mistakes

### HIGH Treating Vitest as Jest with a different binary

```ts
// Wrong
jest.mock('./api')
```

```ts
// Correct
import { vi } from 'vitest'

vi.mock('./api')
```

Vitest has Jest-compatible concepts, but the APIs come from Vitest and Vite transform behavior still matters.

### MEDIUM Running watch mode as release proof

```sh
# Wrong
vitest
```

```sh
# Correct
vitest run
```

Watch mode is useful locally, but completion claims need a non-watch command that exits.
