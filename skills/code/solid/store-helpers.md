---
name: SolidJS Store Helpers
description: produce/reconcile/unwrap helpers for store updates.
resources:
  - https://docs.solidjs.com/reference/store-utilities/produce
---

# Skill: SolidJS Store Helpers

## Apply When
- Using advanced store update helpers or normalization.

## Do
- Use `produce` for mutation-style updates where it improves clarity.
- Use `reconcile` for merging server data into stores.
- Use `unwrap` when you need a non-proxy snapshot.

## Don't
- Don't mix direct mutation with store setters.
- Don't use helpers when simple setters are clearer.

## Output
- Maintainable store updates with minimal boilerplate.

## Examples

```tsx
import { createStore, produce } from "solid-js/store";

const [state, setState] = createStore({ items: [{ id: "1", tags: ["a"] }] });

setState(
  "items",
  0,
  produce((item) => {
    item.tags.push("b");
  })
);
```

```tsx
import { createStore, reconcile } from "solid-js/store";

const [state, setState] = createStore({ items: [] as { id: string; name: string }[] });
setState("items", reconcile([{ id: "1", name: "Ada" }], { key: "id" }));
```
