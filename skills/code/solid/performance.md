---
name: SolidJS Performance
description: Reactive scope tuning and memoization.
resources:
  - https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity
---

# Skill: SolidJS Performance

## Apply When
- Profiling or optimizing Solid apps.

## Do
- Keep reactive scopes small and well-defined.
- Use memos to avoid recomputing expensive derived values.
- Avoid unnecessary effects; prefer pure derivation.

## Don't
- Don't create reactive dependencies inside hot loops.
- Don't wrap everything in effects when signals/memos suffice.

## Output
- Measurable performance gains with minimal complexity.

## Examples

```tsx
import { createMemo, createSignal } from "solid-js";

export function ExpensiveDerived(props: { items: number[] }) {
  const [multiplier, setMultiplier] = createSignal(1);

  const total = createMemo(() => {
    const m = multiplier();
    return props.items.reduce((sum, n) => sum + n * m, 0);
  });

  return (
    <>
      <input
        type="number"
        value={multiplier()}
        onInput={(e) => setMultiplier(Number(e.currentTarget.value))}
      />
      <output>{total()}</output>
    </>
  );
}
```
