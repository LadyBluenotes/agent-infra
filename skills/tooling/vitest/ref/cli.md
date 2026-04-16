---
name: skills/tooling/vitest/ref/cli
description: >
  Vitest CLI reference for watch mode, run mode, focused files, update flows,
  coverage, and benchmark commands.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - cli
  - test command
sources:
  - https://vitest.dev/guide/cli.html
  - https://vitest.dev/config/benchmark
---

# Vitest CLI Reference

## Setup

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "bench": "vitest bench --run"
  }
}
```

## Core Patterns

### Use non-watch commands for verification

```sh
vitest run
```

Completion and CI checks need commands that exit with a status code.

### Focus by file or name during development

```sh
vitest run tests/resolver.test.ts
vitest run -t "resolves local packages"
```

Use focused runs to iterate, then run the broader suite before claiming completion.

### Keep benchmark commands separate

```sh
vitest bench --run
```

Benchmark output answers performance questions, not ordinary correctness questions.

## Common Mistakes

### MEDIUM Reporting focused tests as full verification

```text
Wrong: "Tests pass" after `vitest run tests/resolver.test.ts`.
Correct: "Focused resolver tests pass; full suite not run."
```

Name the scope of the command in the final claim.
