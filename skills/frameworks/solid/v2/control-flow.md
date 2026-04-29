---
name: skills/frameworks/solid/v2/control-flow
description: >
  Solid 2.0 beta control-flow guidance for For accessors, replacing Index with
  For keyed=false, Dynamic/dynamic migration, Loading coordination, Reveal, and
  function-child reactive reads.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - control-flow
sources:
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/03-control-flow.md
---

# Solid 2.0 Control Flow

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/control-flow`.

## Core Patterns

### Replace `Index` with `For keyed={false}`

```jsx
<For each={items()} keyed={false}>
  {(item, index) => <Row item={item()} index={index()} />}
</For>
```

In 2.0, `For` function children receive accessors. Call `item()` and `index()`.

### Read reactive values inside tracked JSX expressions

```jsx
<Show when={user()}>{(u) => <span>{u().name}</span>}</Show>
```

Avoid pulling reactive values into local constants inside control-flow callback
bodies unless the read is intentionally untracked.

### Use `Reveal` to coordinate sibling loading boundaries

Use `Reveal` when multiple `Loading` boundaries should reveal in a coordinated
order. Choose `order="sequential"`, `order="together"`, or `order="natural"`.

## Common Mistakes

### HIGH: Treating `For` children as plain values

```jsx
// Wrong for Solid 2.0 beta
<For each={items()}>{(item) => <Row item={item} />}</For>
```

```jsx
// Correct
<For each={items()}>{(item) => <Row item={item()} />}</For>
```

### HIGH: Carrying `Index` forward from Solid 1.x

```jsx
// Wrong for Solid 2.0 beta
<Index each={items()}>{(item) => <Row item={item()} />}</Index>
```
