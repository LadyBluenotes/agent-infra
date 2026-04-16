---
name: skills/frameworks/solid/actions
description: >
  Solid action guidance for form submissions, mutations, server/client side
  effects, pending states, invalidation, and event-triggered workflows.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/guides/fetching-data
---

# Actions

## Setup

```jsx
const saveUser = async (user) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Save failed");
  return res.json();
};
```

## Core Patterns

### Track pending state with signals

```jsx
const [saving, setSaving] = createSignal(false);
const onSave = async () => {
  setSaving(true);
  try {
    await saveUser(form());
  } finally {
    setSaving(false);
  }
};
```

## Common Mistakes

### MEDIUM: Not handling rejected requests

```jsx
// Wrong
saveUser(form());
```

```jsx
// Correct
saveUser(form()).catch(setError);
```
