---
name: skills/frameworks/solid/performance
description: Performance patterns and reactive boundaries.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/complex-state-management
---

# Performance

## Setup

```jsx
import { createMemo } from "solid-js";

const Total = (props) => {
  const total = createMemo(() => props.items.reduce((s, i) => s + i.price, 0));
  return <span>{total()}</span>;
};
```

## Core Patterns

### Minimize signal reads in hot paths

```jsx
const label = () => `${name()} (${count()})`;
```

### Use memoized derivations

```jsx
const filtered = createMemo(() => items().filter(activeOnly));
```

## Common Mistakes

### HIGH: Creating new objects in reactive reads

```jsx
// Wrong
const data = () => ({ value: count() });
```

```jsx
// Correct
const data = createMemo(() => ({ value: count() }));
```
