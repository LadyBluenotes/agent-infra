---
name: skills/javascript/data
description: Arrays, objects, and collection utilities.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://javascript.info/array-methods
  - https://javascript.info/object
---

# Data

## Setup

```js
const users = [
  { id: "u1", name: "Ava" },
  { id: "u2", name: "Ben" },
];
```

## Core Patterns

### Transform with map/filter/reduce

```js
const names = users.map((user) => user.name);
const byId = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

### Prefer Map/Set for keyed data

```js
const byId = new Map(users.map((user) => [user.id, user]));
const uniqueNames = new Set(users.map((user) => user.name));
```

### Safer sorting with comparators

```js
const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
```

## Common Mistakes

### HIGH: `Array.prototype.sort` without a comparator

```js
// Wrong
[10, 2, 1].sort();
```

```js
// Correct
[10, 2, 1].sort((a, b) => a - b);
```

### MEDIUM: Mutating arrays in place when callers expect immutability

```js
// Wrong
items.sort();
```

```js
// Correct
const sorted = [...items].sort();
```

### MEDIUM: `reduce` without an initial value on empty arrays

```js
// Wrong
const total = [].reduce((sum, n) => sum + n);
```

```js
// Correct
const total = [].reduce((sum, n) => sum + n, 0);
```
