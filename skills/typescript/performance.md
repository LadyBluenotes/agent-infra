---
name: skills/typescript/performance
description: Build performance, incremental checks, and project references.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/project-references.html
  - https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
---

# Performance

## Setup

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo",
    "declaration": true
  }
}
```

## Core Patterns

### Build mode with project references

```bash
tsc -b
```

```json
{
  "files": [],
  "references": [{ "path": "../core" }, { "path": "../ui" }]
}
```

### Skip lib checks for faster feedback loops

```json
{
  "compilerOptions": { "skipLibCheck": true }
}
```

## Common Mistakes

### HIGH: Running `tsc` with explicit files

```bash
# Wrong
tsc src/index.ts
```

```bash
# Correct
tsc -p tsconfig.json
```

### MEDIUM: Skipping lib checks in library builds

```json
// Wrong (hides published type errors)
{ "compilerOptions": { "skipLibCheck": true } }
```

```json
// Correct
{ "compilerOptions": { "skipLibCheck": false } }
```

### MEDIUM: Overly broad `include` slows builds

```json
// Wrong
{ "include": ["**/*"] }
```

```json
// Correct
{ "include": ["src"], "exclude": ["dist", "node_modules"] }
```

## Tensions

- Faster feedback (`skipLibCheck`, broad `exclude`) vs type safety for published libraries.

## References

- @skills/typescript/config.md
