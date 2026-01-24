---
name: Fundamentals
description: Mental model, render-once components, and real DOM updates.
resources:
  - https://docs.solidjs.com/concepts/intro-to-reactivity
---

# Fundamentals

## Apply When
- Establishing baseline patterns or teaching SolidJS usage.

## Do
- Emphasize render-once components with fine-grained updates.
- Model state with signals and derived getters for computed values.
- Keep side effects in effects; keep render logic in JSX.
- Prefer direct DOM patterns; Solid compiles JSX to real DOM updates.

## Don't
- Don't rely on component rerenders to update the view.
- Don't mix side effects into render logic.

## Output
- Clear Solid mental model and correct primitive usage.

## Examples

```tsx
import { createSignal } from "solid-js";

export function Hello() {
  const [name, setName] = createSignal("Ada");

  return (
    <section>
      <input value={name()} onInput={(e) => setName(e.currentTarget.value)} />
      <p>Hello, {name()}.</p>
    </section>
  );
}
```
