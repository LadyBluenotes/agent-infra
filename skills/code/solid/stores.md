---
name: SolidJS Stores
description: Structured state updates with createStore.
resources:
  - https://docs.solidjs.com/concepts/stores
---

# Skill: SolidJS Stores

## Apply When
- Managing nested or structured state.

## Do
- Use `createStore` for structured data with granular updates.
- Prefer immutable update helpers for complex changes.
- Keep store shape stable and normalize large collections.

## Don't
- Don't mix direct mutation with store setters.
- Don't store derived values inside stores.

## Output
- Predictable structured state with fine-grained updates.

## Examples

```tsx
import { createStore } from "solid-js/store";

const [state, setState] = createStore({
  todos: [{ id: "1", title: "Write docs", done: false }],
});

setState("todos", 0, "done", true);

setState(
  "todos",
  (t) => t.id === "1",
  "title",
  (t) => t + " (updated)"
);
```
