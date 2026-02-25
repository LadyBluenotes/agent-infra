---
name: skills/typescript/config
description: tsconfig layout, compiler options, and project references.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  - https://www.typescriptlang.org/docs/handbook/project-references.html
---

# Config

## Setup

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "incremental": true
  },
  "include": ["src"],
  "exclude": ["dist"]
}
```

## Core Patterns

### Project references for multi-package repos

```json
{
  "files": [],
  "references": [{ "path": "../core" }, { "path": "../ui" }]
}
```

```bash
tsc -b
```

### Strict defaults with targeted relaxations

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Base config reuse

```json
{
  "extends": "@tsconfig/node18/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Common Mistakes

### HIGH: Running `tsc` with explicit files ignores tsconfig

```bash
# Wrong
tsc src/index.ts
```

```bash
# Correct
tsc -p tsconfig.json
```

### HIGH: ESM/CJS mismatch between config and runtime

```json
// Wrong (runtime is ESM but module is CommonJS)
{ "compilerOptions": { "module": "CommonJS" } }
```

```json
// Correct
{ "compilerOptions": { "module": "NodeNext", "moduleResolution": "NodeNext" } }
```

### MEDIUM: `include`/`exclude` accidentally drops source files

```json
// Wrong
{ "include": ["src"], "exclude": ["src/**/*.ts"] }
```

```json
// Correct
{ "include": ["src"], "exclude": ["dist"] }
```

## References

- @skills/typescript/performance.md
