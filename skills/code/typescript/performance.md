---
name: Performance
description: Typecheck and compile-time performance.
resources:
  - https://github.com/microsoft/TypeScript/wiki/Performance
---

# Performance

## Apply When
- Optimizing typecheck or build times.

## Do
- Measure before/after.
- Prefer simple types over deeply nested generics.
- Use project references for large repos.

## Don't
- Don't claim perf gains without measurement.

## Examples

```json
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true
  }
}
```
