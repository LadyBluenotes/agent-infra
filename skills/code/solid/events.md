---
name: SolidJS Events
description: Event handlers, delegation, and cleanup.
resources:
  - https://docs.solidjs.com/reference/jsx-attributes/on
---

# Skill: SolidJS Events

## Apply When
- Wiring event handlers or custom event behavior.

## Do
- Use JSX event handlers for reactive updates.
- Leverage Solid's event delegation for common UI events.
- Clean up manual listeners with `onCleanup`.

## Don't
- Don't attach raw DOM listeners without cleanup.
- Don't use effects for simple handler wiring.

## Output
- Clean event handling with safe lifecycles.

## Examples

```tsx
import { createSignal } from "solid-js";

export function Form() {
  const [email, setEmail] = createSignal("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submit", email());
      }}
    >
      <input
        type="email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

```tsx
export function CustomEventDemo() {
  return <my-widget on:ready={() => console.log("ready")} />;
}
```
