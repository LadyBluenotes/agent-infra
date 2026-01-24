---
name: Errors
description: Common diagnostics and fix patterns.
resources:
  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

# Errors

## Apply When
- Fixing TS errors or type mismatches.

## Do
- Narrow unknown values explicitly.
- Fix the type model at boundaries (inputs, outputs).

## Don't
- Don't silence errors with casts unless it is a boundary.

## Examples

```ts
const isUser = (value: unknown): value is { id: string; name: string } =>
  typeof value === "object" && value !== null && "id" in value && "name" in value;
```

```ts
const toNumber = (value: string): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error("Invalid number");
  return parsed;
};
```
