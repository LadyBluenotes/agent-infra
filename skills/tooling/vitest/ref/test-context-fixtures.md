---
name: skills/tooling/vitest/ref/test-context-fixtures
description: >
  Vitest test-context and fixtures reference for `test.extend`, builder fixtures,
  fixture scopes, cleanup, injected values, context `expect`, annotations, and abort signals.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - fixtures
  - test context
  - test.extend
sources:
  - https://vitest.dev/guide/test-context.html
  - https://vitest.dev/guide/parallelism.html
---

# Vitest Test Context And Fixtures Reference

## Setup

```ts
import { test as baseTest } from 'vitest'

export const test = baseTest
  .extend('config', { port: 3000, host: 'localhost' })
  .extend('server', async ({ config }, { onCleanup }) => {
    const server = await startServer(config)
    onCleanup(() => server.close())
    return server.url
  })
```

## Core Patterns

### Use builder fixtures for typed setup

```ts
test('uses server URL', ({ server, expect }) => {
  expect(server).toContain('localhost')
})
```

The builder pattern infers fixture types and keeps dependencies explicit.

### Split resources that need separate cleanup

```ts
export const test = baseTest
  .extend('resourceA', async ({}, { onCleanup }) => {
    const resource = acquireA()
    onCleanup(() => releaseA(resource))
    return resource
  })
  .extend('resourceB', async ({}, { onCleanup }) => {
    const resource = acquireB()
    onCleanup(() => releaseB(resource))
    return resource
  })
```

`onCleanup` can be registered once per fixture; split resources when cleanup lifetimes differ.

### Match fixture scope to lifetime

```ts
export const test = baseTest
  .extend('config', { scope: 'worker' }, () => loadConfig())
  .extend('database', { scope: 'file' }, async ({ config }, { onCleanup }) => {
    const db = await createDatabase(config)
    onCleanup(() => db.close())
    return db
  })
```

Use worker, file, or test scope according to mutation risk and startup cost.

### Use context helpers for cancellation and reporting

```ts
test('aborts slow request', async ({ signal, annotate }) => {
  await annotate('covers timeout cancellation')
  await fetch('/resource', { signal })
})
```

Use `signal` for abortable async work and `annotate` for reporter-visible context.

## Common Mistakes

### HIGH Combining unrelated cleanup in one fixture

```ts
// Wrong
const test = baseTest.extend('resources', async ({}, { onCleanup }) => {
  const a = acquireA()
  onCleanup(() => releaseA(a))
  const b = acquireB()
  onCleanup(() => releaseB(b))
  return { a, b }
})
```

```ts
// Correct
const test = baseTest
  .extend('resourceA', async ({}, { onCleanup }) => {
    const a = acquireA()
    onCleanup(() => releaseA(a))
    return a
  })
  .extend('resourceB', async ({}, { onCleanup }) => {
    const b = acquireB()
    onCleanup(() => releaseB(b))
    return b
  })
```

Vitest allows one cleanup callback per fixture, so separate resources by cleanup boundary.

### MEDIUM Using global `expect` when context matters

```ts
// Wrong in concurrent tests
it.concurrent('snapshots', () => {
  expect(render()).toMatchInlineSnapshot()
})
```

```ts
// Correct
it.concurrent('snapshots', ({ expect }) => {
  expect(render()).toMatchInlineSnapshot()
})
```

Use context-bound `expect` for concurrent snapshots and context-aware matcher state.
