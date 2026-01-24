---
name: Data
description: Data transforms, immutability, and safe defaults.
---

# Data

## Apply When
- Transforming objects/arrays or merging state.

## Do
- Prefer immutable updates for shared state.
- Use optional chaining and nullish coalescing for defaults.

## Don't
- Don't mutate shared objects in-place when returning new values is clearer.

## Examples

```javascript
const normalizeUser = ({ id, profile }) => ({
  id,
  name: profile?.name ?? "Unknown",
});
```

```javascript
const updateState = (state, patch) => ({
  ...state,
  ...patch,
  updatedAt: Date.now(),
});
```
