---
name: skills/frameworks/solid/v2/async-data
description: >
  Solid 2.0 beta async-data guidance for async computations, Loading, Errored,
  isPending, latest, refresh, resolve, replacing createResource, and avoiding
  stale or tearing-prone async UI.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - async
  - data
sources:
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/05-async-data.md
  - https://hackmd.io/@0u1u3zEAQAO0iYWVAStEvw/S1ZMBwPekg
  - https://hackmd.io/@0u1u3zEAQAO0iYWVAStEvw/HkC3b47t1l
---

# Solid 2.0 Async Data

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/resources` and `skills/frameworks/solid/suspense`.

Ryan Carniato HackMD notes are design context. Prefer official migration/RFC
docs for concrete beta API names.

## Core Patterns

### Use async computations instead of resources

```jsx
const user = createMemo(() => fetchUser(id()));

<Loading fallback={<Spinner />}>
  <Profile user={user()} />
</Loading>
```

### Separate initial readiness from revalidation

Use `Loading` for the first time a subtree cannot produce UI. Use `isPending`
for stale-while-revalidating indicators after content has already rendered.

```jsx
const refreshing = () => isPending(() => user());
```

### Refresh derived reads explicitly after writes

```jsx
refresh(user);
```

Use `resolve(() => expr)` from imperative code or tests when you need a promise
that settles after an async expression produces a value.

## Common Mistakes

### HIGH: Using `createResource` in v2 migration work

```jsx
// Wrong for Solid 2.0 beta
const [user, { refetch }] = createResource(id, fetchUser);
```

```jsx
// Correct
const user = createMemo(() => fetchUser(id()));
```

### MEDIUM: Treating `isPending` like initial loading

`isPending` is for revalidation after there is stale content to show. Initial
readiness belongs in a `Loading` boundary.
