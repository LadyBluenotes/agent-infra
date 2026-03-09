---
name: skills/frameworks/solid/components
description: Components, props, and composition patterns.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/components/basics
  - https://docs.solidjs.com/concepts/components/props
  - https://docs.solidjs.com/concepts/components/event-handlers
---

# Components

## Setup

```jsx
import { splitProps } from "solid-js";

const Button = (props) => {
  const [local, rest] = splitProps(props, ["variant"]);
  return <button class={`btn-${local.variant}`} {...rest} />;
};
```

## Core Patterns

### Preserve reactivity with accessors

```jsx
const Panel = (props) => <h2>{props.title}</h2>;
```

### Split props for ergonomic APIs

```jsx
const [local, rest] = splitProps(props, ["size", "intent"]);
```

## Common Mistakes

### HIGH: Destructuring props directly

```jsx
// Wrong
const Card = ({ title }) => <h3>{title}</h3>;
```

```jsx
// Correct
const Card = (props) => <h3>{props.title}</h3>;
```
