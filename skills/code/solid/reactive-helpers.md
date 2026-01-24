---
name: Reactive Helpers
description: batch/untrack/on helpers and selectors.
---

# Reactive Helpers

## Apply When
- Coordinating reactive timing or dependency control.

## Do
- Use `batch` to group multiple signal writes.
- Use `untrack` when reading without subscribing.
- Use `on` helpers when you need explicit dependency lists.
- Prefer `createSelector` for efficient keyed comparisons.

## Don't
- Don't overuse `untrack` to hide dependencies.
- Don't batch unrelated updates that should stay responsive.

## Output
- Controlled reactivity with explicit dependency intent.

## Examples

```tsx
import { batch, createSignal } from "solid-js";

const [x, setX] = createSignal(0);
const [y, setY] = createSignal(0);

batch(() => {
  setX(1);
  setY(2);
});

```
