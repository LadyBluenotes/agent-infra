---
name: skills/frameworks/solid/v2/reactivity
description: >
  Solid 2.0 beta reactivity guidance for microtask batching, flush, split
  effects, owned-scope write restrictions, top-level read warnings, onSettled,
  and derived signal patterns.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - reactivity
  - effects
sources:
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/01-reactivity-batching-effects.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/08-dev-diagnostics.md
---

# Solid 2.0 Reactivity

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/effects` and `skills/frameworks/solid/lifecycle`.

## Core Patterns

### Split compute from side effects

```jsx
createEffect(
  () => name(),
  (value) => {
    document.title = value;
  },
);
```

The first function tracks dependencies. The second function performs side
effects after the batch computes.

### Return cleanup from the apply phase

```jsx
createEffect(
  () => intervalMs(),
  (ms) => {
    const id = setInterval(tick, ms);
    return () => clearInterval(id);
  },
);
```

### Use `onSettled` for mounted DOM work

```jsx
onSettled(() => {
  input.focus();
});
```

### Account for microtask batching

```jsx
setOpen(true);
flush();
panel.focus();
```

Use `flush()` sparingly for imperative interop or tests.

## Common Mistakes

### HIGH: Writing in a tracked scope

```jsx
// Wrong
createMemo(() => setTotal(items().length));
```

```jsx
// Correct
const total = createMemo(() => items().length);
```

### MEDIUM: Reading reactive values at component top level

```jsx
// Wrong for Solid 2.0 beta
function Card(props) {
  const title = props.title;
  return <h2>{title}</h2>;
}
```

```jsx
// Correct
function Card(props) {
  return <h2>{props.title}</h2>;
}
```
