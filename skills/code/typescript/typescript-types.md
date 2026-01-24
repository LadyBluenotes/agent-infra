---
name: Types
description: Guidance for modeling and using TypeScript types safely.
resources:
  - https://github.com/LadyBluenotes/agents/blob/main/plugins/javascript-typescript/skills/typescript-advanced-types/SKILL.md
---

# Types

## Apply When
- Modeling data, APIs, and invariants with TypeScript types.
- Building reusable utilities or abstractions that need strong typing.

## Do
- Use generics with constraints to preserve types across boundaries.
- Reach for conditional and mapped types when they simplify usage.
- Use template literal types for string-based APIs.
- Prefer `unknown` + type guards over `any`.

## Examples

```typescript
const byId = <T extends { id: string }>(items: T[]) =>
  items.reduce<Record<string, T>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
```

```typescript
type ApiResult<T> =
  | { status: "ok"; data: T }
  | { status: "error"; message: string };

const isOk = <T>(result: ApiResult<T>): result is { status: "ok"; data: T } =>
  result.status === "ok";
```

```typescript
type WithFlags<T> = {
  [K in keyof T as `has${Capitalize<string & K>}`]: boolean;
};

type UserFlags = WithFlags<{ admin: boolean; active: boolean }>;
```

```typescript
type AwaitedValue<T> = T extends Promise<infer U> ? U : T;
type Payload = AwaitedValue<Promise<{ id: string }>>;
```

## Don't
- Don't use `any` to avoid fixing type models.
- Don't overuse complex types when simple interfaces are clearer.
- Don't assert types without narrowing or validation.

## Output
- Types should reduce runtime checks and increase correctness.
- Explain non-obvious type utilities briefly when introducing them.
