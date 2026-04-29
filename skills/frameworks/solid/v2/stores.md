---
name: skills/frameworks/solid/v2/stores
description: >
  Solid 2.0 beta store guidance for draft-first setters, storePath migration,
  merge/omit, snapshot, deep, reconcile, createProjection, and function-form
  createStore.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - stores
sources:
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/04-stores.md
---

# Solid 2.0 Stores

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/stores` and `skills/frameworks/solid/store-helpers`.

## Core Patterns

### Use draft-first setters

```jsx
setStore((state) => {
  state.user.name = nextName;
  state.items.push(newItem);
});
```

### Use `storePath` only for migration compatibility

```jsx
setStore(storePath("user", "name", nextName));
```

Prefer draft setters for new v2 code.

### Use `snapshot` for plain values

```jsx
const plain = snapshot(store);
```

Use `deep(store)` in the compute phase of a split effect when the effect needs
deep subscription plus a plain object.

### Use projections for derived stores

Use `createProjection` for readonly derived stores and function-form
`createStore(fn, seed)` when the derived store also needs local writes.

## Common Mistakes

### HIGH: Using v1 path setters directly

```jsx
// Wrong for Solid 2.0 beta
setStore("user", "name", nextName);
```

```jsx
// Correct
setStore((state) => {
  state.user.name = nextName;
});
```

### MEDIUM: Using `unwrap`

```jsx
// Wrong for Solid 2.0 beta
const plain = unwrap(store);
```

```jsx
// Correct
const plain = snapshot(store);
```
