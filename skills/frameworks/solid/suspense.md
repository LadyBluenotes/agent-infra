---
name: skills/frameworks/solid/suspense
description: Suspense boundaries for async rendering.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/fetching-data---

# Suspense

## Setup

```jsx
import { Suspense } from "solid-js";

const App = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <UserProfile />
  </Suspense>
);
```

## Core Patterns

### Wrap resource-driven components

```jsx
<Suspense fallback={<Spinner />}>
  <UserProfile />
</Suspense>
```

## Common Mistakes

### MEDIUM: Omitting fallback UI

```jsx
// Wrong
<Suspense><UserProfile /></Suspense>
```

```jsx
// Correct
<Suspense fallback={<Spinner />}><UserProfile /></Suspense>
```
