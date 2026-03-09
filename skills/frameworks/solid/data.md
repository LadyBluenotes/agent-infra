---
name: skills/frameworks/solid/data
description: Data loading and state wiring patterns.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/fetching-data
---

# Data

## Setup

```jsx
import { createResource } from "solid-js";

const fetchPosts = async () => (await fetch("/api/posts")).json();

const Posts = () => {
  const [posts] = createResource(fetchPosts);
  return <For each={posts() ?? []}>{(post) => <li>{post.title}</li>}</For>;
};
```

## Core Patterns

### Use resources for async data

```jsx
const [data] = createResource(fetchPosts);
```

### Normalize for fast lookup

```jsx
const byId = createMemo(() => new Map(items().map((i) => [i.id, i])));
```

## Common Mistakes

### MEDIUM: Rendering before data is ready

```jsx
// Wrong
return <li>{posts()[0].title}</li>;
```

```jsx
// Correct
return <Show when={posts()}>{(list) => <li>{list()[0].title}</li>}</Show>;
```
