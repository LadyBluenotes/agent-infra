---
name: Testing
description: Type-level tests and TS test patterns.
---

# Testing

## Apply When
- Writing tests that rely on TS types.

## Do
- Use satisfies for compile-time checks.
- Keep runtime tests separate from type assertions.

## Don't
- Don't rely on type errors as runtime assertions.

## Examples

```ts
type Config = { mode: "dev" | "prod"; retries: number };

const config = {
  mode: "dev",
  retries: 2,
} satisfies Config;
```
