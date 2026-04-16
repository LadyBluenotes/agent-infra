---
name: skills/frameworks/solid/error-boundary
description: >
  Solid ErrorBoundary guidance for fallback UI, error recovery, async failure
  boundaries, reset behavior, and isolating failing subtrees.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/control-flow/error-boundary
---

# Error Boundary

## Setup

```jsx
import { ErrorBoundary } from "solid-js";

const App = () => (
  <ErrorBoundary fallback={(error) => <pre>{error.message}</pre>}>
    <Page />
  </ErrorBoundary>
);
```

## Core Patterns

### Keep fallbacks minimal and informative

```jsx
<ErrorBoundary fallback={(e) => <p>Failed: {e.message}</p>}>
  <Dashboard />
</ErrorBoundary>
```

## Common Mistakes

### MEDIUM: Swallowing errors silently

```jsx
// Wrong
<ErrorBoundary fallback={() => null}>
  <Page />
</ErrorBoundary>
```

```jsx
// Correct
<ErrorBoundary fallback={(e) => <p>{e.message}</p>}>
  <Page />
</ErrorBoundary>
```
