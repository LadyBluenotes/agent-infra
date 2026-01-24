---
name: Async
description: async/await patterns, concurrency, and cancellation.
---

# Async

## Apply When
- Writing async flows, parallel requests, or cancellation.

## Do
- Prefer async/await with explicit error boundaries.
- Use Promise.all for independent work.
- Use AbortController for cancellable requests.

## Don't
- Don't serialize independent awaits.
- Don't swallow rejections.

## Examples

```javascript
const fetchAll = async (ids) => {
  const responses = await Promise.all(ids.map((id) => fetch(`/api/items/${id}`)));
  return Promise.all(responses.map((res) => res.json()));
};
```

```javascript
const controller = new AbortController();

const request = fetch("/api/report", { signal: controller.signal });
controller.abort();
await request;
```
