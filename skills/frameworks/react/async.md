---
name: skills/frameworks/react/async
description: Eliminate async waterfalls and improve async flow in React/Next.
type: sub-skill
category: frameworks
library: react
library_version: "18"
sources:
  - https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---

# Async and Waterfalls

## Setup
Use this when fetching data or orchestrating async work in React or Next.js.

```ts
import { Suspense } from "react";

async function fetchUser(id: string) {
  const res = await fetch(`https://example.com/users/${id}`);
  if (!res.ok) throw new Error("Failed to load user");
  return res.json() as Promise<{ id: string; name: string }>;
}

async function UserCard({ id }: { id: string }) {
  const user = await fetchUser(id);
  return <div>{user.name}</div>;
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <UserCard id={params.id} />
    </Suspense>
  );
}
```

## Core Patterns

### Defer awaits to the branch that needs them
Move awaits into the code path that actually uses the result.

```ts
const userPromise = fetchUser(id);
if (!shouldShowProfile) return null;
const user = await userPromise;
```

### Parallelize independent work
Use Promise.all for independent requests to avoid serial waterfalls.

```ts
const [user, settings] = await Promise.all([
  fetchUser(id),
  fetchSettings(id),
]);
```

### Start requests early in API routes
Kick off independent work before branching, then await only what you need.

```ts
import { NextResponse } from "next/server";

const userPromise = fetchUser(id);
const flagsPromise = fetchFlags();
if (!enabled) return NextResponse.json({ enabled: false });
const [user, flags] = await Promise.all([userPromise, flagsPromise]);
```

### Split dependency chains intentionally
Separate the independent portion of work from the dependent part.

```ts
const userPromise = fetchUser(id);
const user = await userPromise;
const orders = await fetchOrders(user.id);
```

### Use Suspense boundaries for streaming
Stream async UI using Suspense instead of blocking the full page.

```tsx
<Suspense fallback={<Skeleton />}>{/* async content */}</Suspense>
```

### Avoid serial awaits in loops
Collect independent promises and await together.

```ts
const results = await Promise.all(ids.map((itemId) => fetchItem(itemId)));
```

## Common Mistakes

### Serial awaits in a chain
Wrong
```ts
const user = await fetchUser(id);
const settings = await fetchSettings(id);
```
Correct
```ts
const [user, settings] = await Promise.all([
  fetchUser(id),
  fetchSettings(id),
]);
```
Explanation: Independent work should run in parallel to reduce latency.

### Awaiting before the value is needed
Wrong
```ts
const data = await fetchData();
if (!enabled) return null;
```
Correct
```ts
const dataPromise = fetchData();
if (!enabled) return null;
const data = await dataPromise;
```
Explanation: Defer awaiting until the value is required.

### Blocking the whole tree for one fetch
Wrong
```tsx
const data = await fetchData();
return <Page data={data} />;
```
Correct
```tsx
return (
  <Suspense fallback={<Skeleton />}>
    <AsyncSection />
  </Suspense>
);
```
Explanation: Suspense streams content instead of blocking the whole tree.

### Serial awaits in a loop
Wrong
```ts
const items = [];
for (const itemId of ids) {
  items.push(await fetchItem(itemId));
}
```
Correct
```ts
const items = await Promise.all(ids.map((itemId) => fetchItem(itemId)));
```
Explanation: Independent requests should run in parallel.
