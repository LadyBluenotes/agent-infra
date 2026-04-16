---
name: skills/tooling/vitest/ref/coverage
description: >
  Vitest coverage reference for provider selection, reporters, thresholds,
  and keeping coverage checks separate from ordinary test runs.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - coverage
sources:
  - https://vitest.dev/guide/coverage.html
---

# Vitest Coverage Reference

## Setup

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## Core Patterns

### Keep coverage explicit

```json
{
  "scripts": {
    "test": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

Run coverage when coverage is the claim; do not make every quick test pass pay the coverage cost.

### Exclude generated or build output

```ts
coverage: {
  exclude: ['dist/**', 'coverage/**'],
}
```

Coverage should measure maintained source, not generated artifacts.

## Common Mistakes

### MEDIUM Treating coverage as behavior proof

```text
Wrong: "Coverage is high, so the feature works."
Correct: "Behavior tests pass; coverage shows which code paths were exercised."
```

Coverage is a signal about exercised lines, not proof that assertions cover the right contracts.
