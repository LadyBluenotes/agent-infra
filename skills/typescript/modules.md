---
name: skills/typescript/modules
description: >
  TypeScript module guidance for type-only imports, ESM/CJS interop, path
  aliases, package exports, moduleResolution, and declaration boundaries.
type: sub-skill
category: typescript
library: typescript
library_version: "5.9"
sources:
  - https://www.typescriptlang.org/docs/handbook/2/modules.html
  - https://www.typescriptlang.org/docs/handbook/module-resolution.html
---

# Modules

## Setup

```ts
// src/index.ts
export type { User } from "./user";
export { createUser } from "./user";
```

```ts
// src/user.ts
export type User = { id: string; name: string };
export const createUser = (name: string): User => ({
  id: crypto.randomUUID(),
  name,
});
```

## Core Patterns

### Type-only imports to avoid runtime edges

```ts
import type { User } from "./user";

export const formatUser = (user: User) => `${user.name}#${user.id}`;
```

### Force module mode in shared files

```ts
export {};
```

### Explicit public surface barrels

```ts
// src/index.ts
export { createUser } from "./user";
export type { User } from "./user";
```

## Common Mistakes

### HIGH: Mixing ESM runtime with CommonJS emit

```json
// Wrong
{ "compilerOptions": { "module": "CommonJS" } }
```

```json
// Correct
{ "compilerOptions": { "module": "NodeNext", "moduleResolution": "NodeNext" } }
```

### MEDIUM: Importing types as values

```ts
// Wrong
import { User } from "./user";
```

```ts
// Correct
import type { User } from "./user";
```

### MEDIUM: Forgetting to mark a file as a module

```ts
// Wrong (script mode, globals leak)
declare const globalThing: string;
```

```ts
// Correct
export {};
declare const globalThing: string;
```

## References

- @skills/typescript/interop.md
- @skills/typescript/config.md
