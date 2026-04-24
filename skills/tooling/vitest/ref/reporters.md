---
name: skills/tooling/vitest/ref/reporters
description: >
  Vitest reporters reference for built-in reporters, multiple reporters,
  reporter options, output files, and CI-readable test artifacts.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - reporters
  - junit
  - json
  - ci
sources:
  - https://vitest.dev/guide/reporters
---

# Vitest Reporters Reference

## Setup

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['default', ['junit', { suiteName: 'unit tests' }]],
    outputFile: {
      junit: './reports/junit.xml',
    },
  },
})
```

## Core Patterns

### Pick reporters for the consumer

```sh
vitest run --reporter=default --reporter=json --outputFile=./test-output.json
```

Use terminal reporters for humans and JSON/JUnit/HTML output for CI, dashboards, or agents.

### Combine reporters when CI still needs readable logs

```ts
test: {
  reporters: ['default', 'json'],
  outputFile: './test-output.json',
}
```

Keep `default` when humans need terminal output, and add a structured reporter for automation.

### Configure reporter-specific options as tuples

```ts
test: {
  reporters: [
    'default',
    ['junit', { suiteName: 'browser tests' }],
  ],
}
```

Use tuple form when a reporter has options.

## Common Mistakes

### MEDIUM Setting `outputFile` without a compatible reporter

```ts
// Wrong
test: {
  outputFile: './test-output.json',
}
```

```ts
// Correct
test: {
  reporters: ['json'],
  outputFile: './test-output.json',
}
```

`outputFile` writes reporter output only when a file-capable reporter is configured.

### MEDIUM Replacing readable CI output by accident

```ts
// Risky for human triage
reporters: ['json']
```

```ts
// Better
reporters: ['default', 'json']
```

Pure machine output can make failed CI harder to inspect from logs.
