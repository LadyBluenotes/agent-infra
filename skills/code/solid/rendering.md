---
name: SolidJS Rendering
description: render/hydrate entrypoints.
resources:
  - https://docs.solidjs.com/reference/rendering/render
---

# Skill: SolidJS Rendering

## Apply When
- Using `render`/`hydrate` or building custom renderers.

## Do
- Use `render` for client-only apps.
- Use `hydrate` when attaching to SSR markup.
- Keep render entrypoints small and deterministic.

## Don't
- Don't mismatch server/client output.
- Don't invoke render multiple times on the same root node.

## Output
- Stable mount/hydration behavior.

## Examples

```tsx
import { render } from "solid-js/web";
import { App } from "./App";

render(() => <App />, document.getElementById("root")!);
```

```tsx
import { hydrate } from "solid-js/web";
import { App } from "./App";

hydrate(() => <App />, document.getElementById("root")!);
```
