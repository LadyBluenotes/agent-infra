---
name: skills/performance/ref/benchmarks
description: >
  Performance benchmark reference for choosing benchmark targets, using
  Vitest bench, CodSpeed reporting, CI sharding, and regression guardrails.
type: reference
category: performance
depth: reference
tags:
  - performance
  - benchmarks
  - codspeed
  - vitest bench
references:
  - skills/tooling/vitest/ref/benchmarks
sources:
  - https://vitest.dev/config/benchmark
  - https://codspeed.io/docs/benchmarks/nodejs/vitest
---

# Benchmarks Reference

## Setup

```ts
import { bench, describe } from 'vitest'

describe('resolver', () => {
  bench('resolve compact skill use', () => {
    resolveSkillUse(scanResult, '@scope/pkg#skill')
  })
})
```

## Core Patterns

### Benchmark repeatable hot paths

```text
Good targets:
- parser helpers
- resolver helpers
- path rewrite helpers
- install block generation
- validation and staleness checks
```

Avoid network, package installs, and noisy filesystem workflows unless the benchmark harness controls them.

### Use benchmark output as regression signal

```sh
vitest bench --run
```

Benchmarks supplement tests. They do not replace correctness checks.

### Wire CodSpeed after local stability

```text
Local first: benchmark file runs.
CI second: CodSpeed action reports.
Scale later: sharding when the suite grows.
```

Keep benchmark setup incremental.

## Common Mistakes

### HIGH Benchmarking the whole CLI command first

```text
Wrong: start with end-to-end install or network-heavy CLI runs.
Correct: benchmark the helper that dominates repeated work.
```

Use profiling to find broad hotspots; use benchmarks to guard stable units.
