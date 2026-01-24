---
name: SolidJS Actions
description: `use:` directives for DOM behaviors and reusable actions.
resources:
  - https://docs.solidjs.com/reference/jsx-attributes/use
---

# Skill: SolidJS Actions

## Apply When
- Attaching reusable behavior to DOM elements.

## Do
- Use `use:` directives for element-level behavior.
- Return cleanup functions from actions when needed.
- Keep actions focused on one concern.

## Don't
- Don't hide application state inside actions.
- Don't bypass component lifecycles for long-lived listeners.

## Output
- Composable behaviors with predictable cleanup.

## Examples

```tsx
import { createSignal, onCleanup } from "solid-js";

function clickOutside(el: HTMLElement, onOutside: () => void) {
  const onPointerDown = (e: PointerEvent) => {
    if (!el.contains(e.target as Node)) onOutside();
  };
  document.addEventListener("pointerdown", onPointerDown);
  onCleanup(() => document.removeEventListener("pointerdown", onPointerDown));
}

export function Menu() {
  const [open, setOpen] = createSignal(true);
  return (
    <Show when={open()}>
      <div use:clickOutside={() => setOpen(false)}>Menu</div>
    </Show>
  );
}
```
