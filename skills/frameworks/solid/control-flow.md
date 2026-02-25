---
name: skills/frameworks/solid/control-flow
description: Show, For, Switch, and other control-flow components.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/control-flow/conditional-rendering
  - https://docs.solidjs.com/concepts/control-flow/list-rendering
  - https://docs.solidjs.com/concepts/control-flow/dynamic---

# Control Flow

## Setup

```jsx
import { For, Show, Switch, Match } from "solid-js";

const List = (props) => (
  <Show when={props.items.length > 0} fallback={<p>No items</p>}>
    <For each={props.items}>{(item) => <li>{item}</li>}</For>
  </Show>
);
```

## Core Patterns

### Conditional UI with Show

```jsx
<Show when={user()} fallback={<Login />}> <Dashboard /> </Show>
```

### Lists with For

```jsx
<For each={items()}>{(item) => <Row item={item} />}</For>
```

### Multi-branch with Switch

```jsx
<Switch>
  <Match when={status() === "loading"}>Loading</Match>
  <Match when={status() === "error"}>Error</Match>
</Switch>
```

## Common Mistakes

### MEDIUM: Using array map in JSX for large lists

```jsx
// Wrong
{items().map((item) => <Row item={item} />)}
```

```jsx
// Correct
<For each={items()}>{(item) => <Row item={item} />}</For>
```
