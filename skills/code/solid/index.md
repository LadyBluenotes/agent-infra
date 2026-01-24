---
name: Overview
description: Routing guide for SolidJS skill modules.
---

# Overview

## Apply When
- Building or reviewing SolidJS UI, primitives, or SolidStart apps.

## Do
- Pick the smallest Solid module that fits:
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

## Playbooks
- Reactive helpers: @skills/code/solid/reactive-helpers.md (batch/untrack/on/selectors)
- Signals: @skills/code/solid/signals.md (local state with setters)
- Memos: @skills/code/solid/memos.md (derived values and caching)
- Effects: @skills/code/solid/effects.md (side effects and cleanup)
- Components + JSX: @skills/code/solid/components.md (props patterns and component APIs)
- DOM APIs: @skills/code/solid/dom.md (refs, classList, style, spreads)
- Events: @skills/code/solid/events.md (handlers, delegation, cleanup)
- Actions: @skills/code/solid/actions.md (use: directives and behaviors)
- State: @skills/code/solid/state.md (signals vs context vs stores)
- Context: @skills/code/solid/context.md (app-wide dependencies and providers)
- Stores: @skills/code/solid/stores.md (structured state updates)
- Store helpers: @skills/code/solid/store-helpers.md (produce/reconcile/unwrap)
- Ownership: @skills/code/solid/ownership.md (createRoot and disposal boundaries)
- Lifecycle: @skills/code/solid/lifecycle.md (onMount/onCleanup, browser-only logic)
- Data fetching: @skills/code/solid/data.md (createResource + boundaries)
- Resources: @skills/code/solid/resources.md (refetch/mutate patterns)
- Suspense: @skills/code/solid/suspense.md (loading boundaries and fallbacks)
- Error boundaries: @skills/code/solid/error-boundary.md (isolate failures, recovery)
- Transitions: @skills/code/solid/transitions.md (deferred updates, pending state)
- Control flow: @skills/code/solid/control-flow.md (Show/For/Switch/Index)
- Rendering: @skills/code/solid/rendering.md (render/hydrate entrypoints)
- SSR + hydration: @skills/code/solid/ssr.md (server/client parity)
- Performance: @skills/code/solid/performance.md (memoization, scope tuning)

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
