---
name: skills/tooling/vitest/ref/coverage
description: >
  Vitest coverage reference for provider packages, include/exclude patterns,
  reporters, thresholds, and keeping coverage separate from ordinary test runs.
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

### Install the provider package explicitly in automation

```sh
pnpm add -D @vitest/coverage-v8
```

Vitest defaults to the V8 provider, but provider support packages are optional dependencies.

### Include uncovered source files when coverage scope matters

```ts
coverage: {
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['src/**/*.generated.ts'],
}
```

By default, coverage reports only files imported during the test run. Add `coverage.include` when the claim includes untested source files.

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

### MEDIUM Expecting unimported files in coverage by default

```ts
// Wrong assumption
coverage: {
  provider: 'v8',
}
```

```ts
// Correct when full source scope matters
coverage: {
  provider: 'v8',
  include: ['src/**/*.{ts,tsx}'],
}
```

Use `coverage.include` to make uncovered maintained files visible in the report.
