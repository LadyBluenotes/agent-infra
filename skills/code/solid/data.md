---
name: SolidJS Data Fetching
description: createResource patterns with loading/error UI.
resources:
  - https://docs.solidjs.com/reference/basic-reactivity/create-resource
---

# Skill: SolidJS Data Fetching

## Apply When
- Loading async data or integrating server resources.

## Do
- Use `createResource` for async data with loading/error handling.
- Pair async data with `Suspense` and `ErrorBoundary` for UX and recovery.
- Use resource `refetch` and `mutate` for refreshes or optimistic updates.
- Keep fetch logic colocated with the reactive usage site.

## Don't
- Don't use effects for async state that should be tracked by the UI.
- Don't block rendering when data can stream in.

## Output
- Responsive data flows aligned with Solid's reactive model.

## Examples

```tsx
import { createResource, createSignal, Show, Suspense } from "solid-js";
import { ErrorBoundary } from "solid-js";

async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to load user");
  return (await res.json()) as { id: string; name: string };
}

export function UserPanel() {
  const [userId, setUserId] = createSignal("1");
  const [user, { refetch }] = createResource(userId, fetchUser);

  return (
    <>
      <button type="button" onClick={() => refetch()}>
        Refresh
      </button>
      <ErrorBoundary fallback={(err) => <p role="alert">{String(err)}</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <Show when={user()} fallback={<p>No user</p>}>
            {(u) => <p>{u().name}</p>}
          </Show>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
```
