---
name: skills/tooling/vitest/ref/performance
description: >
  Vitest performance reference for file parallelism, pools, isolation,
  `maxWorkers`, profiling, and safely tuning slow test suites.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - performance
  - parallelism
  - pool
  - profiling
sources:
  - https://vitest.dev/guide/improving-performance.html
  - https://vitest.dev/guide/parallelism.html
  - https://vitest.dev/guide/profiling-test-performance.html
---

# Vitest Performance Reference

## Setup

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    pool: 'forks',
    maxWorkers: 4,
  },
})
```

## Core Patterns

### Start with the timing summary

```text
Duration  4.80s (transform 44ms, setup 0ms, import 35ms, tests 4.52s, environment 0ms)
```

Use the slow bucket to choose the next action: transform/config, setup files, imports, test code, or environment startup.

### Tune workers according to resource pressure

```ts
test: {
  maxWorkers: 4,
}
```

More workers can speed up file parallelism, but heavy DOM, browser, database, or integration tests may need fewer workers.

### Disable file parallelism only for shared external resources

```ts
test: {
  fileParallelism: false,
}
```

Use serial file execution when tests share a resource that cannot handle concurrent access.

### Disable isolation only after proving cleanup

```sh
vitest --no-isolate
```

Isolation protects correctness by default. Only disable it for suites that clean global state and module state reliably.

## Common Mistakes

### HIGH Speeding up tests by hiding isolation bugs

```ts
// Risky
test: {
  isolate: false,
}
```

```text
Correct: first identify leak-free test groups, then apply `isolate: false` narrowly through projects.
```

Isolation changes are correctness-sensitive and should not be a blanket default.

### MEDIUM Increasing workers without measuring memory

```ts
// Risky on memory-heavy suites
test: {
  maxWorkers: 16,
}
```

```ts
// Better first pass
test: {
  maxWorkers: 4,
}
```

Worker count is a throughput tradeoff against memory and CPU contention.
