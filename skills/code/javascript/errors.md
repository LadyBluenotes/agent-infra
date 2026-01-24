---
name: Errors
description: Error types, boundaries, and safe messaging.
---

# Errors

## Apply When
- Creating error types or handling failures.

## Do
- Use Error subclasses for domain errors.
- Preserve root causes with Error.cause.

## Don't
- Don't throw raw strings.

## Examples

```javascript
class HttpError extends Error {
  constructor(status, message, options = {}) {
    super(message, options);
    this.status = status;
  }
}
```

```javascript
const load = async () => {
  try {
    return await fetch("/api/data");
  } catch (err) {
    throw new Error("Failed to load data", { cause: err });
  }
};
```
