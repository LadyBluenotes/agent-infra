---
name: SolidJS Resources
description: createResource usage, refetching, and optimistic updates.
resources:
  - https://docs.solidjs.com/reference/basic-reactivity/create-resource
---

# Skill: SolidJS Resources

## Apply When
- Using `createResource` or modeling async data dependencies.

## Do
- Pass a source signal to `createResource` for reactive refetching.
- Use `resource.loading`, `resource.error`, and `resource()` for state.
- Use `refetch` or `mutate` for optimistic updates when needed.

## Don't
- Don't hide resource access in untracked helpers.
- Don't block rendering when the UI can stream data.

## Output
- Async data flows that stay reactive and debuggable.

## Examples

```tsx
import { createResource, createSignal } from "solid-js";

const [query, setQuery] = createSignal("solid");
const [results, { mutate, refetch }] = createResource(query, async (q) => {
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Search failed");
  return (await res.json()) as string[];
});

mutate([]);
refetch();
```
