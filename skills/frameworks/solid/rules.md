---
name: skills/frameworks/solid/rules
description: SolidJS-specific rules and constraints to keep reactivity correct.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
---

# SolidJS Rules

## Setup
Use this as a quick ruleset when working on SolidJS or SolidStart code.

## Core Patterns

### Keep reactive reads tracked
Read signals in JSX, memos, effects, or resources so Solid can track dependencies.

### Use the right state primitive
Signals for local state; stores for nested or structured state.

### Avoid destructuring props
Access props via accessors or splitProps to preserve reactivity.

### Keep derived state in memos
Use createMemo for derived values and keep memos pure.

### Use Solid control flow
Prefer Show/For/Index/Switch/Match over array map in JSX.

### Handle async with resources
Use createResource with Suspense and ErrorBoundary for async data.

### Cleanup subscriptions
Use onCleanup for timers, listeners, and subscriptions.

### Respect SSR and hydration
Guard browser-only APIs and keep DOM access inside onMount or effects.

## Common Mistakes

### Destructuring props
Wrong
```jsx
const Card = ({ title }) => <h3>{title}</h3>;
```
Correct
```jsx
const Card = (props) => <h3>{props.title}</h3>;
```
Explanation: Destructuring breaks reactivity because props are accessors.

### Untracked reactive reads
Wrong
```jsx
const value = count();
return <span>{value}</span>;
```
Correct
```jsx
return <span>{count()}</span>;
```
Explanation: Reads outside tracked contexts do not update.

### Effects for derived values
Wrong
```jsx
const [total, setTotal] = createSignal(0);
createEffect(() => setTotal(items().length));
```
Correct
```jsx
const total = createMemo(() => items().length);
```
Explanation: Use memos for derivations; effects are for side effects.
