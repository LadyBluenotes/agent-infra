---
name: skills/tooling/vitest/ref/snapshots
description: >
  Vitest snapshot reference for inline snapshots, file snapshots,
  visual snapshots, ARIA snapshots, update flows, and custom serializers.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - snapshots
  - aria snapshots
  - visual snapshots
sources:
  - https://vitest.dev/guide/snapshot.html
  - https://vitest.dev/guide/browser/visual-regression-testing.html
---

# Vitest Snapshots Reference

## Setup

```ts
import { expect, it } from 'vitest'

it('formats output', () => {
  expect(formatOutput({ name: 'Ada' })).toMatchSnapshot()
})
```

## Core Patterns

### Use file snapshots for readable structured output

```ts
await expect(renderHTML()).toMatchFileSnapshot('./fixtures/basic.output.html')
```

File snapshots work well for HTML, generated text, serialized config, and other output where syntax highlighting helps review.

### Use visual snapshots only in Browser Mode

```ts
import { page } from 'vitest/browser'

await expect(page.getByTestId('hero')).toMatchScreenshot('hero')
```

Visual snapshots compare screenshots and need Browser Mode plus stable environments.

### Use ARIA snapshots for semantic UI structure

```ts
await expect.element(page.getByRole('navigation')).toMatchAriaInlineSnapshot(`
  - navigation "Main":
    - link "Home":
      - /url: /
`)
```

ARIA snapshots assert accessibility-tree structure instead of pixels.

### Update snapshots explicitly

```sh
vitest -u
```

Snapshot updates are expected-output changes. Review them before committing.

## Common Mistakes

### HIGH Updating snapshots as proof of correctness

```sh
# Wrong as a fix by itself
vitest -u
```

```text
Correct: inspect the diff, confirm the new output is intended, then update.
```

Updating snapshots accepts new behavior; it does not prove the new behavior is correct.

### MEDIUM Snapshotting unstable output

```ts
// Wrong
expect({ now: Date.now(), id: crypto.randomUUID() }).toMatchSnapshot()
```

```ts
// Correct
expect({ now: '<fixed>', id: '<fixed>' }).toMatchSnapshot()
```

Normalize time, randomness, paths, and environment-specific values before snapshotting.
