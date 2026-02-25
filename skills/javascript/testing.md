---
name: skills/javascript/testing
description: Unit testing patterns and assertions.
type: sub-skill
category: javascript
library: javascript
library_version: "ES2023"
sources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
---

# Testing

## Setup

```js
import test from "node:test";
import assert from "node:assert/strict";

test("adds numbers", () => {
  assert.equal(2 + 2, 4);
});
```

## Core Patterns

### Arrange, Act, Assert

```js
test("formats user", () => {
  const user = { id: "u1", name: "Ava" };
  const result = formatUser(user);
  assert.equal(result, "Ava#u1");
});
```

### Test error paths

```js
test("throws for missing input", () => {
  assert.throws(() => parseUser(null), /Invalid/);
});
```

## Common Mistakes

### MEDIUM: Testing implementation details over behavior

```js
// Wrong
assert.equal(cache._store.size, 2);
```

```js
// Correct
assert.equal(cache.get("a"), "value");
```

### MEDIUM: Shared mutable fixtures across tests

```js
// Wrong
const user = { id: "u1" };
test("a", () => { user.id = "u2"; });
```

```js
// Correct
test("a", () => {
  const user = { id: "u1" };
});
```
