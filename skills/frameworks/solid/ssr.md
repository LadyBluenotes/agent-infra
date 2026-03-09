---
name: skills/frameworks/solid/ssr
description: Server-side rendering constraints and hydration safety.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/deploying-your-app
---

# SSR

## Setup

```jsx
import { isServer } from "solid-js/web";

const Title = () => <h1>{isServer ? "Server" : "Client"}</h1>;
```

## Core Patterns

### Guard browser-only APIs

```jsx
import { onMount } from "solid-js";

onMount(() => {
  localStorage.setItem("theme", "light");
});
```

### Use deterministic rendering

```jsx
const Seeded = () => <span>{props.seed}</span>;
```

## Common Mistakes

### HIGH: Accessing window during render

```jsx
// Wrong
const width = window.innerWidth;
```

```jsx
// Correct
onMount(() => setWidth(window.innerWidth));
```
