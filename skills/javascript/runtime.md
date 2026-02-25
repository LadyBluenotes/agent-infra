---
name: skills/javascript/runtime
description: Runtime type checks and boundary validation.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

# Runtime

## Setup

```js
const isObject = (value) => value !== null && typeof value === "object";
```

## Core Patterns

### Guard unknown input

```js
const parseUser = (value) => {
  if (!isObject(value) || typeof value.id !== "string") {
    throw new Error("Invalid user");
  }
  return value;
};
```

### Use nullish coalescing for defaults

```js
const retries = options.retries ?? 0;
```

## Common Mistakes

### HIGH: Treating `null` as an object

```js
// Wrong
if (typeof value === "object") {
  value.key;
}
```

```js
// Correct
if (value !== null && typeof value === "object") {
  value.key;
}
```

### MEDIUM: Using truthy checks for numeric defaults

```js
// Wrong
const limit = options.limit || 10;
```

```js
// Correct
const limit = options.limit ?? 10;
```
