---
name: Runtime
description: Event loop, scheduling, and performance-sensitive patterns.
---

# Runtime

## Apply When
- Handling scheduling, timers, or hot paths.

## Do
- Use queueMicrotask for microtask scheduling.
- Prefer requestAnimationFrame for visual updates.

## Don't
- Don't block the main thread with long loops; chunk work.

## Examples

```javascript
const queueTask = (fn) => queueMicrotask(fn);
```

```javascript
const schedule = (fn) => requestAnimationFrame(() => fn());
```
