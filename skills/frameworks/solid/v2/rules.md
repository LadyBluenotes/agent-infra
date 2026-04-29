---
name: skills/frameworks/solid/v2/rules
description: >
  Solid 2.0 beta rules for version-scoped reactivity, async UI, stores,
  control flow, DOM directives, migration guardrails, and avoiding Solid 1.x
  API carryover.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - beta
sources:
  - https://github.com/solidjs/solid/releases
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
---

# Solid 2.0 Rules

## Version Scope

Use this only for Solid 2.0 beta or migration work. Do not use these APIs in a
Solid 1.x stable app unless the repo is intentionally adopting Solid 2.

## Core Patterns

### Treat async as part of computations

Use async computations with `Loading`, `Errored`, `isPending`, `latest`, and
`refresh` instead of `createResource` and resource tuple flags.

### Keep writes out of tracked owned scope

Write from events, actions, or allowed lifecycle scopes. Derive with `createMemo`
or function-form primitives instead of writing back from memos/effects.

### Expect microtask batching

Reads return the last committed value until the update batch flushes. Use
`flush()` only when imperative code needs the DOM or reads settled immediately.

### Use v2 control-flow and DOM forms

Use `For keyed={false}` instead of `Index`, `class` object/array forms instead
of `classList`, and `ref` directive factories instead of `use:` directives.

### Use draft-first stores

Use store setters as draft callbacks. Use `storePath` only when migrating old
path-style setter ergonomics.

## Common Mistakes

### HIGH: Applying v1 replacements in v2 work

```jsx
// Wrong for Solid 2.0 beta
const [data] = createResource(fetchData);
```

```jsx
// Correct for Solid 2.0 beta
const data = createMemo(() => fetchData());
```

### HIGH: Applying v2 replacements in v1 work

Before using this page, verify the repo uses `solid-js@next` or `2.0.0-*`, or
that the user explicitly asked for Solid 2.0 beta guidance.
