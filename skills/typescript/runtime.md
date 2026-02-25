---
name: skills/typescript/runtime
description: Runtime boundaries, unknown inputs, and safe type guards.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

# Runtime Boundaries

## Setup

```ts
type User = { id: string; name: string };

const isUser = (value: unknown): value is User =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  "name" in value &&
  typeof (value as { id?: unknown }).id === "string" &&
  typeof (value as { name?: unknown }).name === "string";
```

## Core Patterns

### Parse unknown input at the boundary

```ts
const parseUser = (value: unknown): User => {
  if (!isUser(value)) throw new Error("Invalid user payload");
  return value;
};
```

### Assertion functions for invariants

```ts
function assertNonEmpty(value: string | null | undefined): asserts value is string {
  if (!value) throw new Error("Expected non-empty string");
}
```

### Narrow with explicit predicates

```ts
const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;
```

## Common Mistakes

### HIGH: Trusting `unknown` with `as`

```ts
// Wrong
const user = payload as User;
```

```ts
// Correct
const user = parseUser(payload);
```

### HIGH: Truthiness checks that drop valid values

```ts
// Wrong
const count = input.count ? input.count : 0;
```

```ts
// Correct
const count = input.count ?? 0;
```

### MEDIUM: `typeof x === "object"` without null guard

```ts
// Wrong
if (typeof value === "object") {
  // value can be null
}
```

```ts
// Correct
if (value && typeof value === "object") {
  // narrowed object
}
```

## References

- @skills/typescript/types.md
