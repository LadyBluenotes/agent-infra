---
name: skills/frameworks/solid/lifecycle
description: Lifecycle hooks and mount/cleanup behavior.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/effects---

# Lifecycle

## Setup

```jsx
import { onMount, onCleanup } from "solid-js";

const Widget = () => {
  let timer;
  onMount(() => {
    timer = setInterval(() => console.log("tick"), 1000);
  });
  onCleanup(() => clearInterval(timer));
  return <div>Ready</div>;
};
```

## Core Patterns

### Use onMount for DOM and browser-only work

```jsx
onMount(() => {
  const node = document.querySelector("#app");
  node?.focus();
});
```

### Always pair subscriptions with cleanup

```jsx
onMount(() => {
  window.addEventListener("resize", onResize);
  onCleanup(() => window.removeEventListener("resize", onResize));
});
```

## Common Mistakes

### HIGH: Using window APIs during SSR

```jsx
// Wrong
const width = window.innerWidth;
```

```jsx
// Correct
onMount(() => setWidth(window.innerWidth));
```
