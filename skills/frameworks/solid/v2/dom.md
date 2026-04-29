---
name: skills/frameworks/solid/v2/dom
description: >
  Solid 2.0 beta DOM guidance for standards-aligned attributes, class object
  and array forms, boolean attributes, ref directive factories, array refs, and
  removal of classList, use:, attr:, bool:, and oncapture:.
type: sub-skill
category: frameworks
library: solidjs
library_version: "2.0 beta"
tags:
  - solid
  - solidjs
  - v2
  - dom
sources:
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/MIGRATION.md
  - https://raw.githubusercontent.com/solidjs/solid/next/documentation/solid-2.0/07-dom.md
---

# Solid 2.0 DOM

## Version Scope

Use this only for Solid 2.0 beta. For Solid 1.x, use
`skills/frameworks/solid/dom` and `skills/frameworks/solid/events`.

## Core Patterns

### Use `class` for strings, objects, and arrays

```jsx
<button class={["button", { active: isActive() }]}>Save</button>
```

### Use `ref` directive factories instead of `use:`

```jsx
function titleDirective(source) {
  let el;
  createEffect(source, (value) => {
    if (el) el.title = value;
  });
  return (nextEl) => {
    el = nextEl;
  };
}

<button ref={titleDirective(() => label())}>Save</button>
```

### Compose refs with arrays

```jsx
<input ref={[setInput, autoFocus()]} />
```

## Common Mistakes

### HIGH: Carrying `classList` into v2

```jsx
// Wrong for Solid 2.0 beta
<button classList={{ active: isActive() }} />
```

```jsx
// Correct
<button class={{ active: isActive() }} />
```

### HIGH: Carrying `use:` directives into v2

```jsx
// Wrong for Solid 2.0 beta
<button use:tooltip={options} />
```
