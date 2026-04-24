---
name: skills/tooling/vitest/basics
description: >
  Vitest basics for Vite-native tests, explicit imports, runtime requirements,
  watch versus run mode, and choosing focused test pages before deeper refs.
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
  - skills/tooling/vitest/browser-mode
  - skills/tooling/vitest/testing-patterns
  - skills/tooling/vitest/ref/cli
  - skills/tooling/vitest/ref/mocking
  - skills/tooling/vitest/ref/environments
  - skills/tooling/vitest/ref/projects
  - skills/tooling/vitest/ref/snapshots
  - skills/tooling/vitest/ref/benchmarks
sources:
  - https://vitest.dev/guide/
  - https://vitest.dev/guide/features
---

# Vitest Basics

## Setup

Use Vitest for Vite-native unit, integration, browser, benchmark, and type-test workflows.
Vitest 4 requires Vite >= 6.0.0 and Node >= 20.0.0.

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

### Use the package-manager command that runs project scripts

```sh
pnpm test
```

Use `bun run test` instead of `bun test`; `bun test` runs Bun's own test runner, not Vitest.

### Load deeper refs only when needed

- Config and projects: @skills/tooling/vitest/config.md
- Browser Mode and component tests: @skills/tooling/vitest/browser-mode.md
- Behavior-focused test style: @skills/tooling/vitest/testing-patterns.md
- CLI filters and reporter output: @skills/tooling/vitest/ref/cli.md
- Mocks, spies, timers, globals: @skills/tooling/vitest/ref/mocking.md
- DOM and custom environments: @skills/tooling/vitest/ref/environments.md
- Snapshots, file snapshots, visual snapshots, and ARIA snapshots: @skills/tooling/vitest/ref/snapshots.md
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

### MEDIUM Using Bun's test runner by accident

```sh
# Wrong for Vitest projects
bun test
```

```sh
# Correct
bun run test
```

`bun test` invokes Bun's runner, so it does not prove the Vitest suite passed.
