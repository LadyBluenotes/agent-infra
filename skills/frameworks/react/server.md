---
name: skills/frameworks/react/server
description: >
  React and Next.js server performance guidance for RSC, SSR, streaming, route
  handlers, server data fetching, caching, and backend render bottlenecks.
type: sub-skill
category: frameworks
library: react
library_version: "18"
sources:
  - https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---

# Server-Side Performance

## Setup
Use this for server rendering, RSC, or API routes in Next.js.

```ts
import { cache } from "react";
import { NextResponse } from "next/server";

const fetchUser = cache(async (id: string) => {
  const res = await fetch(`https://example.com/users/${id}`);
  if (!res.ok) throw new Error("Failed to load user");
  return res.json() as Promise<{ id: string; name: string }>;
});

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const user = await fetchUser(id);
  return NextResponse.json({ id: user.id, name: user.name });
}
```

## Core Patterns

### Authenticate server actions
Handle auth at the server boundary, not via client fetches.

```ts
const session = await requireSession();
if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
```

### Cache per-request work
Use React.cache or equivalent to dedupe within a request.

```ts
const fetchUser = cache(async (id: string) => fetch(`/api/users/${id}`));
```

### Use LRU for cross-request caching
Cache expensive results with eviction to avoid memory leaks.

```ts
import LRUCache from "lru-cache";

const cacheStore = new LRUCache<string, User>({ max: 1000 });
```

### Minimize serialization
Pass only the data needed by client components.

```tsx
return <ClientWidget data={{ id: user.id, name: user.name }} />;
```

### Parallelize server fetches
Start independent fetches early and await them together.

```ts
const userPromise = fetchUser(id);
const prefsPromise = fetchPrefs(id);
const [user, prefs] = await Promise.all([userPromise, prefsPromise]);
```

### Use non-blocking after work
Offload post-response tasks to non-blocking hooks.

```ts
after(async () => {
  await logAuditEvent();
});
```

## Common Mistakes

### Serial server fetches
Wrong
```ts
const user = await fetchUser(id);
const prefs = await fetchPrefs(id);
```
Correct
```ts
const [user, prefs] = await Promise.all([
  fetchUser(id),
  fetchPrefs(id),
]);
```
Explanation: Parallel fetches reduce server response time.

### Over-serializing props
Wrong
```ts
return <ClientWidget data={largeObject} />;
```
Correct
```ts
return <ClientWidget data={pickNeededFields(largeObject)} />;
```
Explanation: Smaller payloads reduce serialization and hydration cost.

### Recomputing expensive work per request
Wrong
```ts
const data = await expensiveCompute(id);
```
Correct
```ts
const data = await cachedCompute(id);
```
Explanation: Use cache for repeated work within or across requests.
