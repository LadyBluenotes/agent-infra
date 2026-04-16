---
name: skills/javascript/async
description: >
  JavaScript async guidance for Promises, async/await, concurrency limits,
  cancellation, retries, sequencing, parallel work, and error propagation.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  - https://javascript.info/promise-basics
  - https://javascript.info/async
---

# Async

## Setup

```js
const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};
```

## Core Patterns

### Sequential vs concurrent

```js
const [user, settings] = await Promise.all([
  fetchJson("/api/user"),
  fetchJson("/api/settings"),
]);
```

### Ensure errors propagate

```js
const run = async () => {
  try {
    await fetchJson("/api/data");
  } catch (error) {
    console.error(error);
  }
};
```

### Avoid unhandled promise chains

```js
const run = () =>
  fetchJson("/api/data")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

## Common Mistakes

### HIGH: Forgetting `await` inside try/catch

```js
// Wrong
try {
  fetchJson("/api/data");
} catch (error) {
  console.error(error);
}
```

```js
// Correct
try {
  await fetchJson("/api/data");
} catch (error) {
  console.error(error);
}
```

### HIGH: Using `Promise.all` when failures should not cancel all

```js
// Wrong
const results = await Promise.all(tasks.map((t) => t()));
```

```js
// Correct
const results = await Promise.allSettled(tasks.map((t) => t()));
```

### MEDIUM: Mixing `await` with `forEach`

```js
// Wrong
items.forEach(async (item) => {
  await save(item);
});
```

```js
// Correct
for (const item of items) {
  await save(item);
}
```

## References

- @skills/javascript/errors.md
