---
name: Modules
description: Type-only imports, exports, and declarations.
resources:
  - https://www.typescriptlang.org/docs/handbook/modules.html
---

# Modules

## Apply When
- Organizing exports or sharing types across packages.

## Do
- Use type-only imports for types.
- Keep public API surfaces small.

## Don't
- Don't leak internal types into public exports.

## Examples

```ts
import type { Request, Response } from "express";

export type Handler = (req: Request, res: Response) => Promise<void>;
```

```ts
export type { User, UserId } from "./user/types";
```
