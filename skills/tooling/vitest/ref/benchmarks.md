---
name: skills/tooling/vitest/ref/benchmarks
description: >
  Vitest benchmark reference for `bench`, benchmark config, CodSpeed's
  `@codspeed/vitest-plugin`, local runs, CI reporting, sharding, and async limits.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - benchmark
  - codspeed
  - performance
sources:
  - https://vitest.dev/guide/features
  - https://vitest.dev/config/benchmark
  - https://codspeed.io/docs/benchmarks/nodejs/vitest
---

# Vitest Benchmarks Reference

## Setup

```ts
import { bench, describe } from 'vitest'

describe('parseSkillUse', () => {
  bench('compact package#skill input', () => {
    parseSkillUse('@scope/pkg#skill')
  })
})
```

```ts
import { defineConfig } from 'vitest/config'
import codspeedPlugin from '@codspeed/vitest-plugin'

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    benchmark: {
      include: ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)'],
    },
  },
})
```

## Core Patterns

### Benchmark stable hot paths

```ts
bench('resolve local skill use', () => {
  resolveSkillUse(scanResult, '@scope/pkg#skill')
})
```

Choose deterministic parser, scanner, resolver, serializer, and path-rewrite code instead of network or filesystem-heavy workflows.

### Run locally before wiring CI

```sh
vitest bench --run
```

Local runs catch broken benchmark files before CodSpeed reporting is involved.

### Use sharding for large suites

```sh
vitest bench --shard=1/4 --run
```

Shard only after the suite has enough benchmark files to justify the extra CI matrix complexity.

## Common Mistakes

### HIGH Benchmarking noisy integration work

```ts
// Wrong
bench('install dependencies', async () => {
  await execa('pnpm', ['install'])
})
```

```ts
// Correct
bench('generate install block', () => {
  generateInstallBlock(scanResult)
})
```

Benchmark pure or tightly controlled units; leave end-to-end install checks to smoke tests.

### MEDIUM Ignoring async profiling limits

```ts
bench('async resolver', async () => {
  await resolveFromDisk()
})
```

CodSpeed's Vitest docs call out async profiling limitations, so prefer synchronous benchmark targets or isolate async overhead carefully.
