---
name: skills/typescript/types
description: Everyday types, unions, narrowing, and generics.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
  - https://www.typescriptlang.org/docs/handbook/2/generics.html
---

# Types

## Setup

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const parseNumber = (input: string): Result<number> => {
  const value = Number(input);
  return Number.isFinite(value)
    ? { ok: true, value }
    : { ok: false, error: "NaN" };
};
```

## Core Patterns

### Discriminated unions for variants

```ts
type Command =
  | { type: "create"; name: string }
  | { type: "delete"; id: string };

function apply(cmd: Command) {
  switch (cmd.type) {
    case "create":
      return { id: crypto.randomUUID(), name: cmd.name };
    case "delete":
      return { deleted: cmd.id };
  }
}
```

### Literal preservation with `as const`

```ts
const routes = ["/", "/settings"] as const;
type Route = (typeof routes)[number];

const go = (path: Route) => path;
```

### Generic constraints to encode invariants

```ts
type HasId = { id: string };

const byId = <T extends HasId>(items: T[]) =>
  new Map(items.map((item) => [item.id, item] as const));
```

## Common Mistakes

### HIGH: Truthiness checks that drop valid values

```ts
// Wrong
const normalize = (value: number | null) => (value ? value : 0);
```

```ts
// Correct
const normalize = (value: number | null) => (value === null ? 0 : value);
```

### HIGH: `typeof x === "object"` treating `null` as object

```ts
// Wrong
if (typeof payload === "object") {
  payload.toString();
}
```

```ts
// Correct
if (payload && typeof payload === "object") {
  payload.toString();
}
```

### MEDIUM: Losing literal types via widening

```ts
// Wrong
const method = "GET";
type Method = typeof method; // string
```

```ts
// Correct
const method = "GET" as const;
type Method = typeof method; // "GET"
```

### MEDIUM: Unsound non-null assertions

```ts
// Wrong
const token = headers["x-token"]!;
```

```ts
// Correct
const token = headers["x-token"];
if (!token) throw new Error("Missing token");
```

## References

- @skills/typescript/ref/typescript-types.md
