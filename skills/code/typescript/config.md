---
name: Config
description: tsconfig setup and build flags.
resources:
  - https://www.typescriptlang.org/tsconfig
---

# Config

## Apply When
- Editing tsconfig or build settings.

## Do
- Use strict mode by default.
- Keep module and target aligned with runtime.
- Use incremental builds for larger repos.

## Don't
- Don't loosen strictness without a clear boundary.

## Examples

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "incremental": true
  }
}
```
