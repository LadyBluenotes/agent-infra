---
name: skills/typescript/errors
description: Diagnostics workflow and common TypeScript error fixes.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
---

# Errors

## Setup

```bash
tsc -p tsconfig.json --noEmit
```

```ts
// Narrow with explicit guards to resolve union errors.
const toUpper = (value: string | null) => {
  if (value === null) return null;
  return value.toUpperCase();
};
```

## Core Patterns

### Read the error code and fix at the boundary

```ts
type Input = { id: string } | { id: number };

const normalize = (input: Input) =>
  typeof input.id === "number" ? String(input.id) : input.id;
```

### Prefer `satisfies` to preserve literal intent

```ts
const config = {
  mode: "fast",
  retries: 2,
} satisfies { mode: "fast" | "safe"; retries: number };
```

## Common Mistakes

### HIGH: Silencing errors with `as any`

```ts
// Wrong
const count = (value as any).count;
```

```ts
// Correct
const count = typeof value === "object" && value !== null && "count" in value
  ? (value as { count: number }).count
  : 0;
```

### MEDIUM: Missing exhaustiveness in discriminated unions

```ts
// Wrong
type Status = { kind: "idle" } | { kind: "loading" } | { kind: "error" };
const label = (s: Status) => (s.kind === "idle" ? "Idle" : "...");
```

```ts
// Correct
type Status = { kind: "idle" } | { kind: "loading" } | { kind: "error" };
const label = (s: Status) => {
  switch (s.kind) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading";
    case "error":
      return "Error";
  }
};
```

### MEDIUM: Using non-null assertion instead of narrowing

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

- @skills/typescript/types.md
