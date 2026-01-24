---
name: SolidJS
description: Routing guide for SolidJS skill modules.
resources: []
---

# Skill: SolidJS

## Apply When
- Building or reviewing SolidJS UI, primitives, or SolidStart apps.

## Do
- Pick the smallest Solid module that fits:
  - Fundamentals (mental model, render-once, real DOM): @skills/code/solid/fundamentals.md
  - Reactivity (tracking, batching, dependency rules): @skills/code/solid/reactivity.md
  - Reactive helpers (batch, untrack, selector patterns): @skills/code/solid/reactive-helpers.md
  - Signals (local reactive state and setters): @skills/code/solid/signals.md
  - Memos (pure derived values and caching): @skills/code/solid/memos.md
  - Effects (side effects, subscriptions, cleanup): @skills/code/solid/effects.md
  - Components + JSX (props reactivity, templates): @skills/code/solid/components.md
  - DOM APIs (refs, classList/style, spread): @skills/code/solid/dom.md
  - Events (delegation, handlers, cleanup): @skills/code/solid/events.md
  - Actions (use: directives, behavior attachment): @skills/code/solid/actions.md
  - State management (signals vs context vs stores): @skills/code/solid/state.md
  - Context (app-wide dependencies and providers): @skills/code/solid/context.md
  - Stores (structured/nested state updates): @skills/code/solid/stores.md
  - Store helpers (reconcile/produce/unwrap): @skills/code/solid/store-helpers.md
  - Ownership (createRoot, disposal, scope): @skills/code/solid/ownership.md
  - Lifecycle (onMount, onCleanup, browser-only logic): @skills/code/solid/lifecycle.md
  - Data fetching (createResource, Suspense, ErrorBoundary): @skills/code/solid/data.md
  - Resources (createResource details, refetching): @skills/code/solid/resources.md
  - Suspense (loading fallbacks, async boundaries): @skills/code/solid/suspense.md
  - Error boundaries (failure isolation, reset flows): @skills/code/solid/error-boundary.md
  - Transitions (startTransition, concurrent updates): @skills/code/solid/transitions.md
  - Control flow (Show/For/Switch patterns): @skills/code/solid/control-flow.md
  - Rendering (render, hydrate, custom renderers): @skills/code/solid/rendering.md
  - SSR + hydration (server/client parity, streaming): @skills/code/solid/ssr.md
  - Performance (reactive scope tuning, memoization): @skills/code/solid/performance.md

## Don't
- Don't treat Solid like a virtual DOM framework.

## Output
- Solid-first guidance with clear reactive boundaries.

## Examples

```tsx
import { createSignal, For, Show } from "solid-js";

export function Demo() {
  const [items, setItems] = createSignal(["a", "b"]);
  const [open, setOpen] = createSignal(true);

  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle
      </button>
      <Show when={open()}>
        <ul>
          <For each={items()}>{(item) => <li>{item}</li>}</For>
        </ul>
      </Show>
    </>
  );
}
```
