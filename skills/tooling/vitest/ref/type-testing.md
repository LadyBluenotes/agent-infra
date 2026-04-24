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
  - https://vitest.dev/guide/testing-types.html
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

### Use `.test-d.ts` for compiler-only tests

```ts
import { assertType, expectTypeOf } from 'vitest'

expectTypeOf(mount).parameter(0).toExtend<{ name: string }>()

// @ts-expect-error name must be a string
assertType(mount({ name: 42 }))
```

Vitest statically analyzes type-test files with TypeScript; it does not execute them at runtime.

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
