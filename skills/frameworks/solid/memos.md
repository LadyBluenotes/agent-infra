---
name: skills/frameworks/solid/memos
description: >
  Solid memo guidance for createMemo, derived state, expensive computations,
  equality behavior, dependency tracking, and avoiding side effects in memos.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/derived-values/memos
---

# Memos

## Setup

```jsx
import { createMemo, createSignal } from "solid-js";

const View = () => {
  const [count, setCount] = createSignal(1);
  const doubled = createMemo(() => count() * 2);
  return <span>{doubled()}</span>;
};
```

## Core Patterns

### Use memos for derived values

```jsx
const total = createMemo(() => items().reduce((sum, item) => sum + item.price, 0));
```

## Common Mistakes

### HIGH: Using effects for pure derivations

```jsx
// Wrong
createEffect(() => setTotal(items().length));
```

```jsx
// Correct
const total = createMemo(() => items().length);
```
