---
name: SolidJS Ownership
description: Reactive roots, ownership boundaries, and disposal behavior.
resources:
  - https://docs.solidjs.com/reference/reactive-utilities/create-root
---

# Skill: SolidJS Ownership

## Apply When
- Managing reactive roots or cleanup boundaries.

## Do
- Use `createRoot` when you need manual disposal.
- Scope effects and signals to the smallest ownership boundary.
- Ensure cleanup runs for subscriptions and timers.

## Don't
- Don't leak roots by skipping disposal.
- Don't create global reactive state without explicit ownership.

## Output
- Predictable lifetimes and safe resource cleanup.

## Examples

```tsx
import { createRoot, createSignal, onCleanup } from "solid-js";

const dispose = createRoot((dispose) => {
  const [value, setValue] = createSignal(0);
  const id = window.setInterval(() => setValue((v) => v + 1), 1000);
  onCleanup(() => window.clearInterval(id));
  return dispose;
});

dispose();
```
