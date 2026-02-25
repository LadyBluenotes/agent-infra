---
name: skills/javascript/errors
description: Error types, throwing, and recovery patterns.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors
  - https://javascript.info/error-handling
---

# Errors

## Setup

```js
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
```

## Core Patterns

### Preserve context with `cause`

```js
try {
  JSON.parse(payload);
} catch (error) {
  throw new Error("Invalid payload", { cause: error });
}
```

### Normalize unknown errors

```js
const toError = (value) => (value instanceof Error ? value : new Error(String(value)));
```

## Common Mistakes

### HIGH: Throwing strings instead of Error objects

```js
// Wrong
throw "Bad request";
```

```js
// Correct
throw new Error("Bad request");
```

### MEDIUM: Swallowing errors without rethrowing or logging

```js
// Wrong
try {
  run();
} catch {
  // ignored
}
```

```js
// Correct
try {
  run();
} catch (error) {
  console.error(error);
  throw error;
}
```
