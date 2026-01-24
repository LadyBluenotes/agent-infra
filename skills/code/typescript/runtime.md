---
name: Runtime Boundaries
description: Type/runtime boundaries and validation.
---

# Runtime Boundaries

## Apply When
- Validating external input or crossing system boundaries.

## Do
- Parse and validate inputs at the boundary.
- Keep runtime validators close to their types.

## Don't
- Don't trust unknown data because it matches a type.

## Examples

```ts
type User = { id: string; name: string };

const parseUser = (value: unknown): User => {
  if (typeof value !== "object" || value === null) throw new Error("Invalid");
  const record = value as Record<string, unknown>;
  if (typeof record.id !== "string" || typeof record.name !== "string") {
    throw new Error("Invalid");
  }
  return { id: record.id, name: record.name };
};
```
