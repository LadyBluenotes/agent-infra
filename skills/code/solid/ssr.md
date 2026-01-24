---
name: SolidJS SSR + Hydration
description: SSR constraints, streaming, and hydration safety.
resources:
  - https://docs.solidjs.com/reference/rendering/is-server
---

# Skill: SolidJS SSR + Hydration

## Apply When
- Working on SSR, streaming, or hydration behavior.

## Do
- Keep server output deterministic and matching client expectations.
- Guard browser-only APIs behind client-only hooks.
- Use Suspense boundaries to avoid hydration mismatches.

## Don't
- Don't access DOM or `window` during server render.
- Don't introduce non-deterministic output between server and client.

## Output
- SSR-safe components with stable hydration.

## Examples

```ts
import { isServer } from "solid-js/web";

export function canUseDOM() {
  return !isServer;
}
```
