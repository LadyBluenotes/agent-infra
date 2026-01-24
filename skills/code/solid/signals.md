---
name: Signals
description: createSignal patterns for local reactive state.
resources:
  - https://docs.solidjs.com/reference/basic-reactivity/create-signal
---

# Signals

## Apply When
- Creating or updating local reactive state with `createSignal`.

## Do
- Use signals for primitive or small state.
- Keep setters as the only mutation path.
- Derive values with memos instead of mirroring signal values.
- Use functional updates when the next value depends on the previous one.

## Don't
- Don't read signals outside tracked contexts unless you intentionally `untrack`.
- Don't store objects in signals if a store provides clearer updates.

## Output
- Predictable state updates and minimal reactivity overhead.

## Examples

```tsx
import { createSignal } from "solid-js";

export function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Count: {count()}
    </button>
  );
}
```

```tsx
import { createSignal } from "solid-js";

export function ControlledInput() {
  const [value, setValue] = createSignal("");
  return <input value={value()} onInput={(e) => setValue(e.currentTarget.value)} />;
}
```
