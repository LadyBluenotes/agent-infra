---
name: skills/frameworks/solid/effects
description: Side effects, cleanup, and external subscriptions.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/effects---

# Effects

## Setup

```jsx
import { createEffect, onCleanup, createSignal } from "solid-js";

const Timer = () => {
  const [now, setNow] = createSignal(Date.now());
  createEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    onCleanup(() => clearInterval(id));
  });
  return <span>{new Date(now()).toLocaleTimeString()}</span>;
};
```

## Core Patterns

### Effects for I/O and subscriptions

```jsx
createEffect(() => {
  const id = subscribe(topic(), (value) => setValue(value));
  onCleanup(() => unsubscribe(id));
});
```

## Common Mistakes

### HIGH: Creating feedback loops inside effects

```jsx
// Wrong
createEffect(() => setCount(count() + 1));
```

```jsx
// Correct
const doubled = createMemo(() => count() * 2);
```

### MEDIUM: Missing cleanup for subscriptions

```jsx
// Wrong
createEffect(() => subscribe(topic(), handler));
```

```jsx
// Correct
createEffect(() => {
  const id = subscribe(topic(), handler);
  onCleanup(() => unsubscribe(id));
});
```
