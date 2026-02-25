---
name: skills/typescript/testing
description: Type-level tests and compile-time assertions.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
---

# Testing

## Setup

```bash
tsc -p tsconfig.json --noEmit
```

```ts
// types.test.ts
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
  ? true
  : false;

type Assert<T extends true> = T;

type Route = "/" | "/settings";
type _ = Assert<Equal<Route, "/" | "/settings">>;
```

## Core Patterns

### Use `@ts-expect-error` for negative assertions

```ts
// @ts-expect-error - invalid route
const bad: Route = "/missing";
```

### Validate inference with `satisfies`

```ts
const config = {
  retries: 2,
  mode: "fast",
} satisfies { retries: number; mode: "fast" | "safe" };
```

## Common Mistakes

### HIGH: Silencing type failures with `any`

```ts
// Wrong
const value: any = "x";
```

```ts
// Correct
const value: unknown = "x";
```

### MEDIUM: Forgetting `@ts-expect-error` on negative tests

```ts
// Wrong (test can start failing silently)
const bad: Route = "/missing";
```

```ts
// Correct
// @ts-expect-error
const bad: Route = "/missing";
```

## References

- @skills/typescript/types.md
