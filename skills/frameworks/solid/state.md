---
name: skills/frameworks/solid/state
description: Local component state patterns.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/state-management
  - https://docs.solidjs.com/guides/complex-state-management---

# State

## Setup

```jsx
import { createSignal } from "solid-js";

const Toggle = () => {
  const [on, setOn] = createSignal(false);
  return <button onClick={() => setOn((v) => !v)}>{on() ? "On" : "Off"}</button>;
};
```

## Core Patterns

### Keep state minimal and derived elsewhere

```jsx
const [items, setItems] = createSignal([]);
const count = createMemo(() => items().length);
```

## Common Mistakes

### MEDIUM: Storing derived values in signals

```jsx
// Wrong
const [count, setCount] = createSignal(items().length);
```

```jsx
// Correct
const count = createMemo(() => items().length);
```
