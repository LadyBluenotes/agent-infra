---
name: skills/frameworks/solid/rendering
description: >
  Solid rendering guidance for render/hydrate entry points, SSR hydration,
  client bootstrapping, browser-only code, and markup consistency.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/understanding-jsx
---

# Rendering

## Setup

```jsx
import { render } from "solid-js/web";
import App from "./App";

render(() => <App />, document.getElementById("root"));
```

## Core Patterns

### Keep render root stable

```jsx
const root = document.getElementById("root");
render(() => <App />, root);
```

## Common Mistakes

### MEDIUM: Rendering multiple roots into the same node

```jsx
// Wrong
render(() => <App />, root);
render(() => <Other />, root);
```

```jsx
// Correct
render(() => <App />, root);
```
