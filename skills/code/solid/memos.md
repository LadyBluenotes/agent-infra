---
name: SolidJS Memos
description: Pure derived values with createMemo.
resources:
  - https://docs.solidjs.com/reference/basic-reactivity/create-memo
---

# Skill: SolidJS Memos

## Apply When
- Deriving computed values or caching expensive calculations.

## Do
- Use `createMemo` for derived, pure computations.
- Keep memo bodies side-effect free.
- Keep dependencies narrow by reading only the signals you need.

## Don't
- Don't use memos for effects or subscriptions.
- Don't store memo results in signals just to read them.

## Output
- Stable derived values with efficient recomputation.

## Examples

```tsx
import { createMemo, createSignal } from "solid-js";

export function Price({ unit }: { unit: number }) {
  const [qty, setQty] = createSignal(1);
  const total = createMemo(() => qty() * unit);

  return (
    <>
      <input
        type="number"
        min={1}
        value={qty()}
        onInput={(e) => setQty(Number(e.currentTarget.value))}
      />
      <output>Total: {total()}</output>
    </>
  );
}
```
