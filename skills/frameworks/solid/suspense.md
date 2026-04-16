---
name: skills/frameworks/solid/suspense
description: >
  Solid Suspense guidance for async boundaries, nested fallback UI, resources,
  transitions, streaming SSR, and preventing loading-state churn.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/fetching-data
---

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
