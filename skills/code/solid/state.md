---
name: SolidJS State Management
description: Choosing between signals, context, and stores.
resources:
  - https://docs.solidjs.com/guides/state-management
---

# Skill: SolidJS State Management

## Apply When
- Choosing how to model local or shared state.

## Do
- Use signals for local state and simple shared state.
- Use context for app-wide or cross-tree state.
- Use stores when you need structured state updates and nested data.

## Don't
- Don't introduce heavyweight state libraries without a clear need.
- Don't store derived values; compute them with memos.

## Output
- Minimal, idiomatic Solid state with clear ownership.

## Examples

```tsx
import { createSignal } from "solid-js";

const [open, setOpen] = createSignal(false);
```

```tsx
import { createContext, useContext } from "solid-js";

type Auth = { userId: () => string | null };

const AuthContext = createContext<Auth>();

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
}
```

```tsx
import { createStore } from "solid-js/store";

const [user, setUser] = createStore({ profile: { name: "Ada" } });
setUser("profile", "name", "Grace");
```
