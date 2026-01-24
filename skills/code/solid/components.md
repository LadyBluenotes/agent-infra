---
name: Components + JSX
description: Component composition, props reactivity, JSX, and component APIs.
resources:
  - https://docs.solidjs.com/concepts/components
---

# Components + JSX

## Apply When
- Writing or refactoring components, props, or JSX templates.

## Do
- Treat components as functions that run once to set up the view.
- Access props reactively; use `splitProps` or accessors when needed.
- Keep JSX declarative and lean on fine-grained updates for dynamic parts.
- Use `children` helpers when you need to normalize slot content.
- Use `Dynamic` for polymorphic component rendering.
- Use `Portal` for rendering outside the parent DOM tree.

## Don't
- Don't destructure props directly when it breaks reactivity.
- Don't emulate virtual DOM patterns (render loops, stateful rerenders).

## Output
- Components that preserve Solid's reactive semantics.

## Examples

```tsx
export function Badge(props: { label: string; tone?: "neutral" | "danger" }) {
  return <span classList={{ badge: true, danger: props.tone === "danger" }}>{props.label}</span>;
}
```

```tsx
import { splitProps } from "solid-js";

export function TextInput(
  props: { label: string } & JSX.InputHTMLAttributes<HTMLInputElement>
) {
  const [local, inputProps] = splitProps(props, ["label"]);

  return (
    <label>
      <span>{local.label}</span>
      <input {...inputProps} />
    </label>
  );
}
```

```tsx
import { mergeProps } from "solid-js";

export function Button(rawProps: { kind?: "primary" | "secondary" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const props = mergeProps({ kind: "primary" as const, type: "button" as const }, rawProps);
  return (
    <button {...props} classList={{ primary: props.kind === "primary", secondary: props.kind === "secondary" }}>
      {props.children}
    </button>
  );
}
```

```tsx
import { children } from "solid-js";

export function Card(props: { title: string; children: JSX.Element }) {
  const c = children(() => props.children);
  return (
    <section>
      <h2>{props.title}</h2>
      <div>{c()}</div>
    </section>
  );
}
```

```tsx
import type { Accessor } from "solid-js";

export function SearchBox(props: { query: Accessor<string>; setQuery: (v: string) => void }) {
  return <input value={props.query()} onInput={(e) => props.setQuery(e.currentTarget.value)} />;
}
```

```tsx
import { Show } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";

export function As(props: { as: string; children?: JSX.Element }) {
  return <Dynamic component={props.as}>{props.children}</Dynamic>;
}

export function Modal(props: { open: boolean; children: JSX.Element }) {
  return (
    <Show when={props.open}>
      <Portal>
        <div class="modal" role="dialog">{props.children}</div>
      </Portal>
    </Show>
  );
}
```
