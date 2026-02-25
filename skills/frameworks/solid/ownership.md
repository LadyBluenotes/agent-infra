---
name: skills/frameworks/solid/ownership
description: Ownership and cleanup of reactive roots.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/intro-to-reactivity---

# Ownership

## Setup

```jsx
import { createRoot, onCleanup } from "solid-js";

createRoot((dispose) => {
  const id = setInterval(() => console.log("tick"), 1000);
  onCleanup(() => clearInterval(id));
  setTimeout(dispose, 5000);
});
```

## Core Patterns

### Dispose roots created outside components

```jsx
const [value, setValue] = createRoot((dispose) => {
  onCleanup(() => console.log("cleanup"));
  return createSignal(0);
});
```

## Common Mistakes

### HIGH: Creating roots without cleanup

```jsx
// Wrong
createRoot(() => createSignal(0));
```

```jsx
// Correct
const [count] = createRoot((dispose) => {
  onCleanup(dispose);
  return createSignal(0);
});
```
