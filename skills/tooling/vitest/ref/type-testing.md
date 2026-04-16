---
name: skills/tooling/vitest/ref/type-testing
description: >
  Vitest type-test reference for expectTypeOf, assertType, ts-expect-error,
  and compile-time API regression checks.
type: reference
category: tooling
library: vitest
depth: reference
tags:
  - vitest
  - type tests
  - expectTypeOf
sources:
  - https://vitest.dev/guide/features
---

# Vitest Type Testing Reference

## Setup

```ts
import { assertType, expectTypeOf, test } from 'vitest'

test('public type accepts compact skill use', () => {
  expectTypeOf(parseSkillUse).parameter(0).toEqualTypeOf<string>()

  // @ts-expect-error package name is required
  assertType(parseSkillUse())
})
```

## Core Patterns

### Treat types as public API contracts

```ts
expectTypeOf(resolveSkillUse).returns.toMatchTypeOf<ResolveSkillUseResult>()
```

Use type tests when generics, public exports, or overloads are part of the feature.

### Pair expected errors with `@ts-expect-error`

```ts
// @ts-expect-error missing required package name
parseSkillUse()
```

Expected errors should fail if TypeScript stops reporting an error.

## Common Mistakes

### LOW Testing inferred internals

```ts
// Wrong
expectTypeOf(privateState).toEqualTypeOf<InternalState>()
```

```ts
// Correct
expectTypeOf(publicResult).toMatchTypeOf<ResolveSkillUseResult>()
```

Use type tests for consumer-facing contracts first.
