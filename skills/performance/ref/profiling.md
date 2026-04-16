---
name: skills/performance/ref/profiling
description: >
  Performance profiling reference for evidence-first CLI profiling,
  flamegraphs, artifact handling, and separating profiling from benchmark work.
type: reference
category: performance
depth: reference
tags:
  - performance
  - profiling
  - flamegraph
sources:
  - https://nodejs.org/api/cli.html
---

# Profiling Reference

## Setup

Use this when the question is "where is time going?" rather than "did this benchmark regress?"

## Core Patterns

### Profile before optimizing broad code paths

```sh
node --cpu-prof ./bin/cli.js list
```

Capture evidence before changing performance-sensitive code.

### Keep artifacts task-owned

```text
Store generated profiles in a task temp dir or documented artifact path.
Clean task-owned temp files before completion unless asked to keep them.
```

Profiles can be large; do not leave stray artifacts.

### Separate profiling from benchmarking

```text
Profiling: locate hotspots.
Benchmarking: guard selected hot paths over time.
```

Do not use a one-off profile as a regression gate.

## Common Mistakes

### MEDIUM Optimizing from intuition

```text
Wrong: cache a helper because it feels hot.
Correct: profile, identify the repeated work, then benchmark the helper.
```

Performance changes need measurements.
