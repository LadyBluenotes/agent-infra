---
name: Types
description: Type modeling, unions, generics, and narrowing.
resources:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
---

# Types

## Apply When
- Designing or refactoring types, interfaces, or generics.

## Do
- Prefer unions and discriminants for variants.
- Use generics with constraints to encode invariants.
- Keep types readable and localized.

## Don't
- Don't overuse conditional types when a simpler union works.

## Examples

```ts
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const parse = (input: string): Result<number> => {
  const value = Number(input);
  return Number.isFinite(value) ? { ok: true, value } : { ok: false, error: "NaN" };
};
```

```ts
type Entity<TId extends string> = { id: TId };

type UserId = string & { readonly __brand: "UserId" };
type User = Entity<UserId> & { name: string };
```
