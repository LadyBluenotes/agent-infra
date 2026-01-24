---
name: Reactivity
description: Dependency tracking, batching, and reactive boundaries.
resources:
  - https://docs.solidjs.com/concepts/intro-to-reactivity
---

# Reactivity

## Apply When
- Establishing reactive tracking rules or debugging dependency behavior.

## Do
- Keep reactive reads inside tracked contexts (JSX, memos, effects, resources).
- Use `untrack` when you need to read without subscribing.
- Batch multiple writes to avoid intermediate recomputation.
- Prefer fine-grained dependencies over broad signals.

## Don't
- Don't hide reactive reads in helpers that are called outside tracked contexts.
- Don't create accidental feedback loops with effects that write to their own dependencies.

## Output
- Clear tracking behavior with minimal recomputation.

## Examples

```tsx
import { createEffect, createSignal, untrack } from "solid-js";

const [a, setA] = createSignal(1);
const [b, setB] = createSignal(10);

createEffect(() => {
  const tracked = a();
  const notTracked = untrack(b);
  console.log({ tracked, notTracked });
});

setB(11);
setA(2);

```
