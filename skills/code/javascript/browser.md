---
name: Browser
description: Browser APIs, fetch, storage, and feature detection.
---

# Browser

## Apply When
- Working with DOM, fetch, storage, or browser-only APIs.

## Do
- Use feature detection before calling newer APIs.
- Prefer fetch with explicit response handling.

## Don't
- Don't assume browser globals in SSR.

## Examples

```javascript
const storageAvailable = typeof window !== "undefined" && "localStorage" in window;
```

```javascript
const res = await fetch("/api/profile");
const data = await res.json();
```
