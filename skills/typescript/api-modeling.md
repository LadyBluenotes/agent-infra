---
name: skills/typescript/api-modeling
description: >
  TypeScript API modeling guidance for public DTOs, discriminated unions,
  versioned shapes, stable contracts, validation boundaries, and exhaustiveness.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

# API Modeling

## Setup

```ts
type ApiError = { kind: "error"; message: string; code: string };
type ApiOk<T> = { kind: "ok"; data: T };
type ApiResponse<T> = ApiOk<T> | ApiError;
```

## Core Patterns

### Discriminated unions for stable wire types

```ts
type Event =
  | { type: "user.created"; payload: { id: string; name: string } }
  | { type: "user.deleted"; payload: { id: string } };

const handle = (event: Event) => {
  switch (event.type) {
    case "user.created":
      return event.payload.name;
    case "user.deleted":
      return event.payload.id;
  }
};
```

### `satisfies` for public contracts without widening

```ts
const endpoints = {
  listUsers: "/api/users",
  createUser: "/api/users",
} satisfies Record<string, string>;
```

### Versioned payloads with explicit tags

```ts
type V1User = { version: 1; id: string; name: string };
type V2User = { version: 2; id: string; name: string; email?: string };
type User = V1User | V2User;
```

## Common Mistakes

### HIGH: Using `string` instead of discriminants

```ts
// Wrong
type Event = { type: string; payload: unknown };
```

```ts
// Correct
type Event =
  | { type: "user.created"; payload: { id: string; name: string } }
  | { type: "user.deleted"; payload: { id: string } };
```

### MEDIUM: Optional properties that hide invalid shapes

```ts
// Wrong
type User = { id?: string; name?: string };
```

```ts
// Correct
type User = { id: string; name: string };
```

### MEDIUM: Exhaustiveness gaps in public unions

```ts
// Wrong
const toMessage = (res: ApiResponse<string>) =>
  res.kind === "ok" ? res.data : "";
```

```ts
// Correct
const toMessage = (res: ApiResponse<string>) => {
  switch (res.kind) {
    case "ok":
      return res.data;
    case "error":
      return res.message;
  }
};
```

## References

- @skills/typescript/types.md
