---
name: skills/typescript/typescript-types
description: Utility types and type operators reference.
type: reference
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/utility-types.html
  - https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
---

# Type Operators and Utility Types

## Utility Types

| Utility | Example | Notes |
| --- | --- | --- |
| `Partial<T>` | `Partial<User>` | Make all properties optional. |
| `Required<T>` | `Required<User>` | Make all properties required. |
| `Readonly<T>` | `Readonly<User>` | Read-only properties. |
| `Record<K, T>` | `Record<string, number>` | Key/value maps. |
| `Pick<T, K>` | `Pick<User, "id">` | Select keys. |
| `Omit<T, K>` | `Omit<User, "password">` | Exclude keys. |
| `Exclude<T, U>` | `Exclude<"a" | "b", "b">` | Remove from union. |
| `Extract<T, U>` | `Extract<"a" | "b", "b">` | Keep from union. |
| `NonNullable<T>` | `NonNullable<string | null>` | Remove null/undefined. |
| `Parameters<T>` | `Parameters<typeof fn>` | Params tuple. |
| `ReturnType<T>` | `ReturnType<typeof fn>` | Return type. |
| `InstanceType<T>` | `InstanceType<typeof C>` | Instance type. |

## Type Operators

### `keyof`, indexed access, and `typeof`

```ts
type Keys = keyof User;
type Id = User["id"];
type Factory = typeof createUser;
```

### Conditional types

```ts
type Flatten<T> = T extends Array<infer U> ? U : T;
```

### Mapped types

```ts
type Optional<T> = { [K in keyof T]?: T[K] };
```

### Template literal types

```ts
type EventName = `user.${"created" | "deleted"}`;
```

## References

- @skills/typescript/types.md
