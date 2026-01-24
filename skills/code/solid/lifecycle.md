---
name: Lifecycle
description: onMount/onCleanup and browser-only logic.
resources:
  - https://docs.solidjs.com/reference/lifecycle/on-mount
---

# Lifecycle

## Apply When
- Handling mount/unmount behavior or DOM-dependent code.

## Do
- Use `onMount` for DOM or browser-only initialization.
- Use `onCleanup` to dispose of effects, listeners, and timers.
- Keep lifecycle hooks scoped to the smallest component that needs them.

## Don't
- Don't access `window` or DOM in module scope for SSR-safe code.
- Don't use lifecycle hooks for pure derivations.

## Output
- SSR-safe lifecycle usage with clear cleanup.

## Examples

```tsx
import { onCleanup, onMount } from "solid-js";

export function Timer() {
  let id = 0;

  onMount(() => {
    id = window.setInterval(() => console.log("tick"), 1000);
  });

  onCleanup(() => window.clearInterval(id));

  return null;
}
```
