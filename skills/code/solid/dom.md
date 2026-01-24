---
name: DOM APIs
description: Refs, class/style bindings, and attribute controls for DOM output.
resources:
  - https://docs.solidjs.com/reference/jsx-attributes/ref
---

# DOM APIs

## Apply When
- Accessing DOM nodes, classes, styles, or attribute spreads.

## Do
- Use `ref` for direct DOM access.
- Use `classList` and `style` for reactive class/style updates.
- Use JSX spread for attribute forwarding with care.

## Don't
- Don't mutate DOM outside tracked contexts without `onMount` or effects.
- Don't rely on ref values before mount.

## Output
- DOM interactions that stay in sync with reactive state.

## Examples

```tsx
import { createSignal, onMount } from "solid-js";

export function FocusOnMount() {
  let input!: HTMLInputElement;
  const [value, setValue] = createSignal("");

  onMount(() => input.focus());

  return <input ref={input} value={value()} onInput={(e) => setValue(e.currentTarget.value)} />;
}
```

```tsx
import { createSignal } from "solid-js";

export function ClassAndStyle() {
  const [active, setActive] = createSignal(false);

  return (
    <button
      type="button"
      class="btn"
      classList={{ active: active() }}
      style={{ opacity: active() ? 1 : 0.6 }}
      onClick={() => setActive((a) => !a)}
    >
      Toggle
    </button>
  );
}
```
