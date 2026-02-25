---
name: skills/frameworks/solid/dom
description: DOM refs and direct DOM access.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/refs---

# DOM

## Setup

```jsx
import { onMount } from "solid-js";

const FocusInput = () => {
  let input;
  onMount(() => input?.focus());
  return <input ref={input} />;
};
```

## Core Patterns

### Use refs for imperative actions

```jsx
let node;
onMount(() => node?.scrollIntoView());
```

## Common Mistakes

### MEDIUM: Accessing DOM in module scope

```jsx
// Wrong
const el = document.querySelector("#app");
```

```jsx
// Correct
onMount(() => document.querySelector("#app"));
```
