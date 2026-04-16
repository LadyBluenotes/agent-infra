---
name: skills/typescript/interop
description: >
  TypeScript interop guidance for JavaScript packages, declaration files,
  ambient types, module augmentation, default exports, and mixed JS/TS projects.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
  - https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
---

# Interop

## Setup

```ts
// index.d.ts
declare module "legacy-lib" {
  export function parse(input: string): number;
  export const VERSION: string;
}
```

```json
{
  "name": "legacy-lib",
  "version": "1.0.0",
  "types": "index.d.ts"
}
```

## Core Patterns

### Type-only imports for JS modules

```ts
import type { Config } from "legacy-lib";
```

### CommonJS default export interop

```ts
// For CJS modules that export a function
import legacy from "legacy-lib";
legacy("input");
```

### Global library declarations

```ts
// globals.d.ts
interface Window {
  LegacyLib: { parse(input: string): number };
}
```

## Common Mistakes

### HIGH: Missing `types` entry in package.json

```json
// Wrong
{ "name": "legacy-lib" }
```

```json
// Correct
{ "name": "legacy-lib", "types": "index.d.ts" }
```

### HIGH: ESM/CJS mismatch at runtime

```ts
// Wrong (importing named export from CJS)
import { parse } from "legacy-lib";
```

```ts
// Correct
import legacy from "legacy-lib";
legacy.parse("1");
```

### MEDIUM: Using `any` in declarations

```ts
// Wrong
export function parse(input: any): any;
```

```ts
// Correct
export function parse(input: string): number;
```

## References

- @skills/typescript/modules.md
- @skills/typescript/config.md
