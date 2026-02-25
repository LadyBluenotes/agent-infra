---
name: skills/frameworks/solid/resources
description: Async data with createResource and caching.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/fetching-data---

# Resources

## Setup

```jsx
import { createResource } from "solid-js";

const fetchUser = async (id) => (await fetch(`/api/users/${id}`)).json();

const User = (props) => {
  const [user] = createResource(() => props.id, fetchUser);
  return <pre>{JSON.stringify(user(), null, 2)}</pre>;
};
```

## Core Patterns

### Key resources by reactive source

```jsx
const [data] = createResource(() => params().id, fetchUser);
```

### Handle loading and error states

```jsx
const [user] = createResource(fetchUser);
return (
  <Show when={!user.loading} fallback={<span>Loading...</span>}>
    <pre>{JSON.stringify(user(), null, 2)}</pre>
  </Show>
);
```

## Common Mistakes

### HIGH: Calling the fetcher directly in render

```jsx
// Wrong
const data = fetchUser(id());
```

```jsx
// Correct
const [data] = createResource(() => id(), fetchUser);
```
