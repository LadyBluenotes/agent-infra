---
name: skills/frameworks/react/client-data
description: Client-side data fetching patterns for React apps.
type: sub-skill
category: frameworks
library: react
library_version: "18"
sources:
  - https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---

# Client Data Fetching

## Setup
Use this for client-side fetching, subscriptions, and browser data.

```ts
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Profile() {
  const { data } = useSWR("/api/user", fetcher);

  useEffect(() => {
    return registerScrollListener(() => {
      // handle scroll
    });
  }, []);

  if (!data) return null;
  return <div>{data.name}</div>;
}
```

## Core Patterns

### Deduplicate requests
Use SWR or a shared cache to avoid duplicate client requests.

```ts
const { data } = useSWR("/api/user", fetcher);
```

### Deduplicate global listeners
Register global listeners once and fan out updates.

```ts
useEffect(() => registerResizeListener(onResize), [onResize]);
```

### Use passive listeners for scroll
Prefer passive listeners for scroll and touch events.

```ts
window.addEventListener("scroll", onScroll, { passive: true });
```

### Version localStorage data
Store versioned schemas to avoid breaking changes.

```ts
localStorage.setItem("prefs:v2", JSON.stringify(prefs));
```

## Common Mistakes

### Duplicate fetches per component
Wrong
```ts
useEffect(() => {
  fetch("/api/user").then(setUser);
}, []);
```
Correct
```ts
const { data } = useSWR("/api/user", fetcher);
```
Explanation: Shared caches reduce duplicate client work.

### Multiple window listeners
Wrong
```ts
useEffect(() => {
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```
Correct
```ts
useEffect(() => registerScrollListener(onScroll), []);
```
Explanation: Centralize global listeners to avoid stacking handlers.

### Unversioned localStorage schema
Wrong
```ts
localStorage.setItem("prefs", JSON.stringify(prefs));
```
Correct
```ts
localStorage.setItem("prefs:v2", JSON.stringify(prefs));
```
Explanation: Versioned keys prevent schema conflicts across releases.
