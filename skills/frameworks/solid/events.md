---
name: skills/frameworks/solid/events
description: Event handling and delegation patterns.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/components/event-handlers---

# Events

## Setup

```jsx
const Button = () => <button onClick={() => console.log("clicked")}>Click</button>;
```

## Core Patterns

### Use event handlers inline or extracted

```jsx
const onSave = (event) => {
  event.preventDefault();
  submit();
};

<form onSubmit={onSave}>...</form>;
```

### Prefer delegation for lists

```jsx
<ul onClick={(e) => e.target.dataset.id && select(e.target.dataset.id)}>
  <For each={items()}>
    {(item) => <li data-id={item.id}>{item.name}</li>}
  </For>
</ul>
```

## Common Mistakes

### MEDIUM: Forgetting to stop default submit behavior

```jsx
// Wrong
<form onSubmit={save}>...</form>
```

```jsx
// Correct
const save = (e) => { e.preventDefault(); submit(); };
```
