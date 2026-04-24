---
name: skills/tooling/vitest/ref/cli
description: >
  Vitest CLI reference for watch mode, run mode, focused files, update flows,
  line filters, related tests, reporters, coverage, and benchmark commands.
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
  - https://vitest.dev/guide/reporters
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
    "test:related": "vitest related --run",
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

### Focus by line when the full filename is known

```sh
vitest run tests/resolver.test.ts:42
```

Line filters require a full filename, either relative to the project or absolute. Vitest supports multiple file:line entries, but not line ranges.

### Run tests related to changed source files

```sh
vitest related --run src/resolver.ts src/loader.ts
```

Use `--run` with `related` in automation so the command exits instead of staying in watch mode.

### Write machine-readable reporter output

```sh
vitest run --reporter=json --outputFile=./test-output.json
```

Use reporter output files when CI, scripts, or agents need structured test results.

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

### MEDIUM Passing a range to a line filter

```sh
# Wrong
vitest run tests/resolver.test.ts:10-25
```

```sh
# Correct
vitest run tests/resolver.test.ts:10 tests/resolver.test.ts:25
```

Vitest supports file:line entries, not line ranges.
