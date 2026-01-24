# SolidJS Rules

## Apply When
- Working on SolidJS or SolidStart code.

## Do
- Treat components as render-once functions; rely on fine-grained updates.
- Keep reactive reads inside tracked contexts (JSX, memos, effects, resources).
- Use signals for local state and stores for nested state.
- Use `splitProps` or accessors instead of destructuring props.
- Prefer `createMemo` for derived values; keep memos pure.
- Use `createResource` for async data and pair with `Suspense` and `ErrorBoundary`.
- Use `Show`, `For`, `Index`, `Switch`/`Match` for control flow, not array `.map` in JSX.
- Use `onCleanup` for subscriptions, timers, and event listeners.
- Keep SSR/hydration parity; guard browser-only APIs behind client-only logic.
- Keep DOM access inside `onMount` or effects.

## Don't
- Don't emulate virtual DOM patterns or rerender loops.
- Don't hide reactive reads in untracked helpers.
- Don't mutate stores directly; use setters or helpers.
- Don't use effects for pure derivations.
- Don't access `window`/DOM during server render.
- Don't store derived values inside stores or signals.
