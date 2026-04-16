---
name: skills/performance/benchmark-design
description: >
  Benchmark design workflow for choosing stable targets, separating profiling
  from regression benchmarks, using Vitest bench, and adding CodSpeed only after local stability.
type: sub-skill
category: performance
depth: primary
aliases:
  - benchmark design
  - performance benchmarks
tags:
  - benchmarks
  - vitest bench
  - codspeed
  - profiling
references:
  - skills/performance/ref/benchmarks
  - skills/performance/ref/profiling
  - skills/tooling/vitest/ref/benchmarks
sources:
  - https://vitest.dev/config/benchmark
  - https://vitest.dev/guide/features.html
  - https://codspeed.io/docs/benchmarks/nodejs/vitest
  - https://nodejs.org/api/cli.html
---

# Benchmark Design

## Setup

Use this when adding or reviewing benchmarks intended to catch performance regressions.

```ts
import { bench, describe } from 'vitest'

describe('resolver', () => {
  bench('resolve skill id', () => {
    resolveSkillId('skills/tooling/vitest/config')
  })
})
```

## Core Patterns

### Profile first when the hotspot is unknown

```text
Unknown hotspot: profile.
Known hot path: benchmark.
Regression guard: benchmark in CI.
```

Use profiling to find where time goes; use benchmarks to track a stable unit after the target is known.

### Benchmark small stable units

```text
Good targets:
- parser helpers
- resolver helpers
- serializers
- path transforms
- pure scoring functions
```

Avoid network, package installation, wall-clock-heavy CLI flows, and broad filesystem scans unless the harness explicitly controls them.

### Use Vitest benchmark controls

```sh
vitest bench --run
vitest bench --outputJson main.json
vitest bench --compare main.json
```

Vitest's benchmark config defines benchmark file globs and comparison output options for `vitest bench`.

### Add CodSpeed after local stability

```text
Order:
1. Local benchmark runs.
2. Benchmark target is stable enough to compare.
3. CodSpeed reporting is wired in CI.
4. Sharding is added only when benchmark count needs it.
```

CodSpeed documents Vitest integration and CI reporting. Its docs also call out async profiling limitations, so avoid overclaiming async stack precision.

## Common Mistakes

### HIGH Benchmarking a noisy end-to-end flow first

```text
Wrong: benchmark install, network, or full CLI startup before identifying a hot unit.
Correct: profile broad flow, then benchmark the isolated expensive helper.
```

Noisy benchmarks create false confidence and unstable regressions.

### HIGH Treating benchmark pass as correctness

```text
Wrong: skip tests because benchmarks run.
Correct: run correctness tests and benchmarks for different claims.
```

Benchmarks measure performance characteristics; tests prove behavior.

### MEDIUM Adding CI reporting before local reproducibility

```text
Wrong: wire CodSpeed before `vitest bench --run` works locally.
Correct: make the local benchmark command reliable first.
```

CI should report a known benchmark, not discover whether the benchmark exists.
