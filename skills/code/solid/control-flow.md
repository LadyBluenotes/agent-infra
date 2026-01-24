---
name: Control Flow
description: Show/For/Index/Switch/Match patterns for conditional and list rendering.
resources:
  - https://docs.solidjs.com/concepts/control-flow
---

# Control Flow

## Apply When
- Handling conditional rendering or list rendering in JSX.

## Do
- Use `Show` for simple conditional rendering with a single fallback.
- Use `Switch` + `Match` for multi-branch conditions.
- Use `For` for keyed list rendering and `Index` for stable index-based lists.
- Keep data access inside the control-flow component so updates stay granular.

## Don't
- Don't map arrays directly in JSX if it loses fine-grained updates.
- Don't use `For` when list order is stable but values are index-bound; prefer `Index`.

## Output
- Predictable, granular UI updates with the right control-flow primitive.

## Examples

```tsx
import { Show } from "solid-js";

export function MaybeUser(props: { user: { name: string } | null }) {
  return (
    <Show when={props.user} fallback={<p>Signed out</p>}>
      {(u) => <p>Hello, {u().name}</p>}
    </Show>
  );
}
```

```tsx
import { For, Index } from "solid-js";

export function Lists(props: { ids: string[]; points: { x: number; y: number }[] }) {
  return (
    <>
      <ul>
        <For each={props.ids}>{(id) => <li>{id}</li>}</For>
      </ul>
      <ul>
        <Index each={props.points}>{(p) => <li>{p().x},{p().y}</li>}</Index>
      </ul>
    </>
  );
}
```

```tsx
import { Switch, Match } from "solid-js";

export function Status(props: { state: "idle" | "loading" | "error" }) {
  return (
    <Switch>
      <Match when={props.state === "idle"}>Idle</Match>
      <Match when={props.state === "loading"}>Loading...</Match>
      <Match when={props.state === "error"}>Failed</Match>
    </Switch>
  );
}
```
