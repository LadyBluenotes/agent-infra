---
name: skills/frameworks/solid/store-helpers
description: Store helpers and reconciliation utilities.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/stores---

# Store Helpers

## Setup

```jsx
import { reconcile, produce } from "solid-js/store";

setState("items", reconcile(nextItems));
```

## Core Patterns

### Use `reconcile` for large updates

```jsx
setState("items", reconcile(itemsFromServer));
```

### Use `produce` for local mutations

```jsx
setState(
  produce((state) => {
    state.user.name = "Nova";
  })
);
```

## Common Mistakes

### MEDIUM: Replacing entire arrays for small edits

```jsx
// Wrong
setState({ items: items().map((i) => ({ ...i })) });
```

```jsx
// Correct
setState("items", 0, "name", "Updated");
```
