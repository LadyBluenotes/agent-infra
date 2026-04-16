---
name: skills/frameworks/solid/transitions
description: >
  Solid transition guidance for startTransition/useTransition, non-blocking
  updates, pending indicators, async resource refreshes, and UI responsiveness.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/state-management
---

# Transitions

## Setup

```jsx
import { createTransition } from "solid-js";

const [pending, start] = createTransition();

const onFilter = (value) => {
  start(() => setQuery(value));
};
```

## Core Patterns

### Wrap expensive updates

```jsx
start(() => setItems(filter(items(), query())));
```

## Common Mistakes

### MEDIUM: Using transitions for small updates

```jsx
// Wrong
start(() => setCount((c) => c + 1));
```

```jsx
// Correct
setCount((c) => c + 1);
```
