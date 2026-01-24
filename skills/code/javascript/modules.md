---
name: Modules
description: ESM/CJS interop, exports, and dynamic imports.
---

# Modules

## Apply When
- Organizing modules, exports, and runtime loading.

## Do
- Prefer ESM with explicit exports.
- Use dynamic import for optional or heavy modules.
- Keep module boundaries small and stable.

## Don't
- Don't mix CJS/ESM without explicit interop handling.

## Examples

```javascript
export const makeClient = (baseUrl) => ({
  async get(path) {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
  },
});
```

```javascript
const { parse } = await import("csv-parse/sync");
```
