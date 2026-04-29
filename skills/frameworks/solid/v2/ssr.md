---
name: skills/frameworks/solid/v2/ssr
description: >
  Solid 2.0 beta SSR and hydration guidance for async computations, Loading
  boundaries, Errored boundaries, deterministic async rendering, hydration
  timing, and avoiding Solid 1.x Suspense assumptions.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - ssr
  - hydration
sources:
  - https://github.com/solidjs/solid/releases
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/05-async-data.md
  - https://hackmd.io/@0u1u3zEAQAO0iYWVAStEvw/HkvDtqJnkl
---

# Solid 2.0 SSR

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/ssr`.

Ryan Carniato HackMD notes are design context. Treat official beta docs and
repo behavior as source truth for concrete APIs.

## Core Patterns

### Put async render reads under `Loading`

Async computations can suspend through the reactive graph. A render read that
can be pending needs a `Loading` boundary or an explicit guard.

### Use `Errored` for async errors

Async errors should propagate through the graph and be caught structurally
instead of branching on a resource-specific `.error` field.

### Keep hydration deterministic

Avoid server/client branches that change the first rendered markup. Browser-only
DOM work still belongs after client readiness.

## Common Mistakes

### HIGH: Assuming Solid 1.x Suspense semantics

```jsx
// Wrong for Solid 2.0 beta
<Suspense fallback={<Spinner />}>
  <User />
</Suspense>
```

```jsx
// Correct for Solid 2.0 beta
<Loading fallback={<Spinner />}>
  <User />
</Loading>
```

### MEDIUM: Treating SSR-without-boundaries as generally safe

If async render reads can happen under conditionals or route changes, use
boundaries or guards. Do not rely on top-level waiting as a blanket substitute.
