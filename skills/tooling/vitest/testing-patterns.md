---
name: skills/tooling/vitest/testing-patterns
description: >
  Vitest test authoring patterns for behavior-focused tests, async assertions,
  fixtures, regression coverage, and stable verification.
type: skill
category: tooling
library: vitest
depth: primary
tags:
  - vitest
  - tests
  - regression
references:
  - skills/tooling/vitest/ref/mocking
  - skills/tooling/vitest/ref/cli
  - skills/tooling/vitest/ref/type-testing
sources:
  - https://vitest.dev/guide/
  - https://vitest.dev/guide/features
---

# Vitest Testing Patterns

## Setup

```ts
import { describe, expect, it } from 'vitest'
import { parseSkillUse } from './skill-use'

describe('parseSkillUse', () => {
  it('parses package and skill names', () => {
    expect(parseSkillUse('@scope/pkg#skill')).toEqual({
      packageName: '@scope/pkg',
      skillName: 'skill',
    })
  })
})
```

## Core Patterns

### Test observable behavior

```ts
it('rejects missing skill names', () => {
  expect(() => parseSkillUse('@scope/pkg#')).toThrow(/skill/i)
})
```

Prefer behavior and error contracts over implementation details such as private helper call counts.

### Keep regression tests close to the failing input

```ts
it('keeps pnpm internal paths intact', () => {
  const path = '.pnpm/@scope+pkg@1.0.0/node_modules/@scope/pkg/skills/a.md'

  expect(rewriteSkillLoadPath(path)).toContain('.pnpm/')
})
```

Name the failure mode in the test so later readers know why the case exists.

### Use async expectations directly

```ts
await expect(loadConfig('missing.json')).rejects.toThrow(/missing/)
```

Direct async assertions keep the failure tied to the promise under test.

## Common Mistakes

### HIGH Testing helpers instead of contracts

```ts
// Wrong
expect(normalizeSegments).toHaveBeenCalled()
```

```ts
// Correct
expect(resolveSkillUse(scan, 'pkg#skill')).toEqual({
  status: 'resolved',
  load: expect.stringContaining('skills/skill.md'),
})
```

The contract matters more than which internal helper produced it.

### MEDIUM Sharing mutable fixtures across tests

```ts
// Wrong
const scan = { packages: [] }
```

```ts
// Correct
const createScan = () => ({ packages: [] })
```

Fresh fixtures reduce order dependence and make parallel runs safer.
