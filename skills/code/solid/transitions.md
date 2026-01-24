---
name: Transitions
description: Deferred updates and pending state.
resources:
  - https://docs.solidjs.com/reference/reactive-utilities/start-transition
---

# Transitions

## Apply When
- Deferring non-urgent updates or coordinating async UI changes.

## Do
- Use `startTransition` to defer non-urgent updates.
- Use `createTransition` to read pending state for UI feedback.
- Keep urgent updates outside transitions to preserve responsiveness.

## Don't
- Don't wrap every update in transitions; reserve for heavy work.
- Don't use transitions to hide long-running blocking code.

## Output
- Responsive UI with controlled async updates.

## Examples

```tsx
import { createSignal, startTransition, useTransition } from "solid-js";

export function Search() {
  const [query, setQuery] = createSignal("");
  const [pending] = useTransition();

  return (
    <>
      <input
        value={query()}
        onInput={(e) => {
          const next = e.currentTarget.value;
          startTransition(() => setQuery(next));
        }}
      />
      <span>{pending() ? "Updating..." : ""}</span>
    </>
  );
}
```
