---
name: skills/frameworks/solid/signals
description: >
  Solid signal guidance for createSignal, accessors/setters, derived reads,
  fine-grained updates, batching, and avoiding lost reactivity.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/signals
---

# Signals

## Setup

```jsx
import { createSignal } from "solid-js";

const Counter = () => {
  const [count, setCount] = createSignal(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count()}</button>;
};
```

## Core Patterns

### Use setters for updates

```jsx
setCount((c) => c + 1);
```

### Read signals inside reactive scopes

```jsx
const label = () => `Count: ${count()}`;
```

## Common Mistakes

### HIGH: Mutating the value instead of using the setter

```jsx
// Wrong
count = 2;
```

```jsx
// Correct
setCount(2);
```

### MEDIUM: Destructuring signal value once

```jsx
// Wrong
const value = count();
return <span>{value}</span>;
```

```jsx
// Correct
return <span>{count()}</span>;
```
