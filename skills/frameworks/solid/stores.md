---
name: skills/frameworks/solid/stores
description: Store state with createStore and immutable updates.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/stores
---

# Stores

## Setup

```jsx
import { createStore } from "solid-js/store";

const [state, setState] = createStore({ user: { id: "u1", name: "Ava" } });
setState("user", "name", "Bea");
```

## Core Patterns

### Nested updates with path setters

```jsx
setState("user", (u) => ({ ...u, name: "Nova" }));
```

### Array updates with indices

```jsx
setState("items", 0, "name", "Updated");
```

## Common Mistakes

### HIGH: Mutating store objects directly

```jsx
// Wrong
state.user.name = "Bea";
```

```jsx
// Correct
setState("user", "name", "Bea");
```
