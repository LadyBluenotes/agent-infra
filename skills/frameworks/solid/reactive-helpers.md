---
name: skills/frameworks/solid/reactive-helpers
description: Helper utilities for reactive graph control.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/
---

# Reactive Helpers

## Setup

```jsx
import { on, createEffect } from "solid-js";

createEffect(on(() => props.id, (id) => {
  console.log("id changed", id);
}));
```

## Core Patterns

### Use `on` for targeted dependencies

```jsx
createEffect(on(() => count(), (value) => setLog(value)));
```

### Use `untrack` for non-reactive reads

```jsx
import { untrack } from "solid-js";

const value = untrack(() => expensive());
```

## Common Mistakes

### MEDIUM: Using `untrack` around updates

```jsx
// Wrong
untrack(() => setCount(count() + 1));
```

```jsx
// Correct
setCount((c) => c + 1);
```
