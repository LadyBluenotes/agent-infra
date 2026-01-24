---
name: Error Boundaries
description: Isolating failures and providing recovery UI.
resources:
  - https://docs.solidjs.com/reference/components/error-boundary
---

# Error Boundaries

## Apply When
- Guarding UI against runtime errors in subtrees.

## Do
- Use `ErrorBoundary` around unstable or third-party UI.
- Provide recovery UI and optional reset paths.
- Log errors where needed without exposing sensitive data.

## Don't
- Don't wrap the entire app unless you need a global fallback.
- Don't swallow errors without surfacing them to logs.

## Output
- Isolated failures with clear recovery UX.

## Examples

```tsx
import { ErrorBoundary } from "solid-js";

export function SafeArea(props: { children: JSX.Element }) {
  return (
    <ErrorBoundary
      fallback={(err, reset) => (
        <div role="alert">
          <p>Something went wrong: {String(err)}</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </div>
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
}
```
