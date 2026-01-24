---
name: SolidJS Context
description: Context providers and consumers for app-wide dependencies.
resources:
  - https://docs.solidjs.com/concepts/context
---

# Skill: SolidJS Context

## Apply When
- Sharing state or services across component subtrees.

## Do
- Use `createContext` and `useContext` for app-wide dependencies.
- Provide stable values to avoid unnecessary recalculation.
- Pair context with signals or stores for reactive updates.

## Don't
- Don't use context for local-only state.
- Don't expose mutable objects without controlled setters.

## Output
- Clear ownership of shared state with minimal coupling.

## Examples

```tsx
import { createContext, createSignal, useContext } from "solid-js";

type Auth = {
  userId: () => string | null;
  signIn: (id: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<Auth>();

export function AuthProvider(props: { children: JSX.Element }) {
  const [userId, setUserId] = createSignal<string | null>(null);
  const value: Auth = { userId, signIn: setUserId, signOut: () => setUserId(null) };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
}
```
