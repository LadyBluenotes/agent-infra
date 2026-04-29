---
name: skills/frameworks/solid/version-selection
description: >
  Solid version-selection guidance for choosing Solid 1.x stable skills versus
  Solid 2.0 beta skills, detecting repo version signals, and avoiding API
  cross-contamination during migration work.
type: sub-skill
category: frameworks
library: solidjs
tags:
  - solid
  - solidjs
  - v1
  - v2
  - beta
sources:
  - https://docs.solidjs.com/
  - https://www.npmjs.com/package/solid-js
  - https://github.com/solidjs/solid/releases
---

# Solid Version Selection

## Setup

Use this before loading a Solid skill when the prompt or repo could involve
Solid 1.x stable, Solid 2.0 beta, or migration between them.

## Selection Rules

### Default to Solid 1.x stable

Use `skills/frameworks/solid/*.md` when:

- The user says Solid without a version.
- `package.json` uses `solid-js` 1.x or a stable tag.
- The task is production app work and no beta signal appears.

### Use Solid 2.0 beta only with a version signal

Use `skills/frameworks/solid/v2/*.md` when:

- The user says `Solid 2`, `2.0`, `v2`, `beta`, or `next`.
- `package.json` uses `solid-js@next` or a `2.0.0-*` version.
- The task cites Solid 2.0 migration/RFC material or Ryan Carniato HackMD notes
  about the 2.0 async/reactivity design.
- The code uses beta-only APIs such as `Loading`, `Errored`, `flush`,
  `isPending`, `latest`, `refresh`, `action`, `createOptimistic`,
  `createOptimisticStore`, `createProjection`, `snapshot`, `storePath`,
  `onSettled`, `merge`, or `omit`.

### Ask when the choice changes code shape

If the repo version is unknown and the answer depends on divergent APIs, say
`Unknown` and ask for the Solid major version before changing code.

Treat `workspace:*`, `catalog:`, and complex package-manager indirection as
unknown unless the lockfile or workspace catalog has also been checked.

## Guardrails

### Do not mix API families

For Solid 1.x work, do not apply 2.0 beta replacements such as `Loading` for
`Suspense`, `Errored` for `ErrorBoundary`, draft-first store setters, `onSettled`
for `onMount`, or `ref` directive factories for `use:` directives.

For Solid 2.0 work, do not reintroduce 1.x-only patterns such as `createResource`
for async data, `Index`, path-style `setStore` calls without `storePath`,
`classList`, `use:` directives, or `batch` as the primary update boundary.

### Keep migration explicit

When migrating, load both the relevant 1.x page and the matching 2.0 page, then
write the before/after mapping. Do not silently replace unrelated APIs.

## Common Mistakes

### HIGH: Using v2 beta APIs in a v1 app

```jsx
// Wrong for Solid 1.x
<Loading fallback={<Spinner />}>
  <User />
</Loading>
```

```jsx
// Correct for Solid 1.x
<Suspense fallback={<Spinner />}>
  <User />
</Suspense>
```

### HIGH: Using v1 async primitives in v2 migration work

```jsx
// Wrong for Solid 2.0 beta migration
const [user] = createResource(id, fetchUser);
```

```jsx
// Correct for Solid 2.0 beta migration
const user = createMemo(() => fetchUser(id()));
```
