---
name: skills/javascript/javascript-patterns
description: Common architecture and composition patterns.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

# JavaScript Patterns

## Setup

```js
const createStore = () => {
  const data = new Map();
  return {
    get: (key) => data.get(key),
    set: (key, value) => data.set(key, value),
  };
};
```

## Core Patterns

### Module pattern for encapsulation

```js
const counter = (() => {
  let value = 0;
  return { inc: () => (value += 1), get: () => value };
})();
```

### Composition over inheritance

```js
const withTimestamp = (value) => ({ ...value, at: Date.now() });
```

### Pure functions for predictable behavior

```js
const add = (a, b) => a + b;
```

## Common Mistakes

### MEDIUM: Hidden shared state across modules

```js
// Wrong
export const cache = new Map();
```

```js
// Correct
export const createCache = () => new Map();
```
