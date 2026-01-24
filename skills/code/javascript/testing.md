---
name: Testing
description: Async-safe testing patterns for JS/TS.
---

# Testing

## Apply When
- Writing or updating tests.

## Do
- Use async tests with explicit awaits.
- Use fake timers for time-based logic.

## Don't
- Don't leave unresolved promises in tests.

## Examples

```javascript
import { describe, expect, it, vi } from "vitest";

it("resolves data", async () => {
  const value = await Promise.resolve(42);
  expect(value).toBe(42);
});
```

```javascript
vi.useFakeTimers();
setTimeout(() => {}, 1000);
vi.runAllTimers();
```
