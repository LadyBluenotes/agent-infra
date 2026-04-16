---
name: skills/frameworks/react/rerender
description: >
  React re-render guidance for unstable props, context churn, memo/useMemo/useCallback,
  derived state, and measuring unnecessary component updates.
type: sub-skill
category: frameworks
library: react
library_version: "18"
sources:
  - https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---

# Re-render Optimization

## Setup
Use this when components re-render too often or updates feel sluggish.

```ts
import { useMemo, useState, useTransition } from "react";

export function SearchList({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(
    () => items.filter((item) => item.includes(query)),
    [items, query]
  );

  return (
    <div>
      <input
        value={query}
        onChange={(event) =>
          startTransition(() => setQuery(event.target.value))
        }
      />
      {isPending ? <span>Loading...</span> : null}
      <ul>{filtered.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
```

## Core Patterns

### Avoid subscribing to unused state
Defer reads until needed and keep callbacks stable.

```ts
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}, [count]);

const onClick = () => doWork(countRef.current);
```

### Memoize expensive work
Extract heavy work into memoized components or useMemo.

```ts
const result = useMemo(() => expensiveCompute(data), [data]);
```

### Keep effect dependencies primitive
Prefer primitive dependencies to reduce noise.

```ts
useEffect(() => {
  doWork(config.id);
}, [config.id]);
```

### Derive state during render
Compute derived values directly instead of syncing with effects.

```ts
const isEmpty = items.length === 0;
```

### Use functional setState
Prefer functional updates for stable callbacks.

```ts
setCount((prev) => prev + 1);
```

### Use transitions for non-urgent updates
Wrap non-urgent UI changes in startTransition.

```ts
startTransition(() => setQuery(next));
```

### Use refs for transient values
Store rapidly changing values in refs when they do not affect render.

```ts
const pointerRef = useRef({ x: 0, y: 0 });
```

### Lazy-init expensive state
Initialize expensive state with a function to run once.

```ts
const [value] = useState(() => expensiveInit());
```

## Common Mistakes

### Derived state in effects
Wrong
```ts
const [total, setTotal] = useState(0);
useEffect(() => setTotal(items.length), [items]);
```
Correct
```ts
const total = items.length;
```
Explanation: Derived values should be computed during render.

### Unstable dependencies
Wrong
```ts
useEffect(() => {
  doWork(config);
}, [config]);
```
Correct
```ts
useEffect(() => {
  doWork(config.id);
}, [config.id]);
```
Explanation: Prefer primitive dependencies to reduce re-renders.

### Memoizing simple expressions
Wrong
```ts
const value = useMemo(() => count + 1, [count]);
```
Correct
```ts
const value = count + 1;
```
Explanation: Memo adds overhead when the computation is trivial.
