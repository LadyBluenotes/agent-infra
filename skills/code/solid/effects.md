---
name: Effects
description: Side effects, subscriptions, and cleanup.
resources:
  - https://docs.solidjs.com/reference/basic-reactivity/create-effect
---

# Effects

## Apply When
- Handling subscriptions, DOM interactions, or other side effects.

## Do
- Use `createEffect` for side effects that depend on reactive state.
- Use `onCleanup` to dispose subscriptions and listeners.
- Keep effects minimal and focused on one side effect.

## Don't
- Don't use effects for pure derivations.
- Don't write to the same dependencies without guarding against loops.

## Output
- Safe side effects with predictable cleanup.

## Examples

```tsx
import { createEffect, createSignal, onCleanup } from "solid-js";

export function WindowWidth() {
  const [width, setWidth] = createSignal(0);

  createEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    onResize();
    onCleanup(() => window.removeEventListener("resize", onResize));
  });

  return <output>{width()}</output>;
}
```
