---
name: skills/frameworks/solid/v2/actions-optimistic
description: >
  Solid 2.0 beta mutation guidance for action, createOptimistic,
  createOptimisticStore, refresh, transition-coordinated optimistic UI, and
  replacing manual pending/refetch mutation flows.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - actions
  - optimistic
sources:
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/06-actions-optimistic.md
---

# Solid 2.0 Actions And Optimistic UI

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/actions`.

## Core Patterns

### Wrap mutations in `action`

```jsx
const saveTodo = action(function* (todo) {
  yield api.addTodo(todo);
  refresh(todos);
});
```

### Pair optimistic writes with refresh

```jsx
const [todos, setOptimisticTodos] = createOptimisticStore(
  () => api.getTodos(),
  [],
);

const addTodo = action(function* (todo) {
  setOptimisticTodos((list) => {
    list.push(todo);
  });
  yield api.addTodo(todo);
  refresh(todos);
});
```

### Keep reads and writes separate

Use async computations for reads. Use actions for mutations that coordinate
optimistic UI, async work, and follow-up refreshes.

## Common Mistakes

### MEDIUM: Rebuilding manual pending/refetch flags

```jsx
// Avoid in v2 migration work when action + optimistic primitives fit.
setSaving(true);
await save();
setSaving(false);
refetch();
```
