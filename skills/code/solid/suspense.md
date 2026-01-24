---
name: Suspense
description: Async boundaries and fallback UI.
resources:
  - https://docs.solidjs.com/reference/components/suspense
---

# Suspense

## Apply When
- Handling loading states for async boundaries.

## Do
- Wrap async-dependent UI in `Suspense` with a meaningful fallback.
- Keep fallback UI lightweight and consistent with layout.
- Use nested Suspense boundaries for partial loading.

## Don't
- Don't hide loading with side effects; rely on resource readiness.
- Don't put global fallbacks around everything unless needed.

## Output
- Smooth loading UX with predictable async boundaries.

## Examples

```tsx
import { createResource, Suspense } from "solid-js";

const [data] = createResource(async () => (await fetch("/api/data")).json());

export function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <pre>{JSON.stringify(data(), null, 2)}</pre>
    </Suspense>
  );
}
```

```tsx
import { createResource, Suspense, SuspenseList } from "solid-js";

const [a] = createResource(async () => (await fetch("/api/a")).text());
const [b] = createResource(async () => (await fetch("/api/b")).text());

export function Page() {
  return (
    <SuspenseList revealOrder="forwards">
      <Suspense fallback={<p>Loading A...</p>}>
        <p>{a()}</p>
      </Suspense>
      <Suspense fallback={<p>Loading B...</p>}>
        <p>{b()}</p>
      </Suspense>
    </SuspenseList>
  );
}
```
