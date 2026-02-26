---
name: skills/frameworks/react/rendering
description: Rendering performance patterns for React and Next.js.
type: sub-skill
category: frameworks
library: react
library_version: "18"
sources:
  - https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---

# Rendering Performance

## Setup
Use this when rendering performance or hydration is slow.

```tsx
import { useState } from "react";

const StaticHeader = <h1>Dashboard</h1>;

export function Page({ isClient }: { isClient: boolean }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <section>
      {StaticHeader}
      <button onClick={() => setShowDetails((prev) => !prev)}>Toggle</button>
      {showDetails ? <Details /> : null}
      {isClient ? <ClientTime /> : null}
    </section>
  );
}
```

## Core Patterns

### Hoist static JSX
Move static JSX outside components to avoid re-creation.

```tsx
const StaticHeader = <h1>Dashboard</h1>;
```

### Use content-visibility
Defer rendering of off-screen content with CSS.

```css
.feed {
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
}
```

### Prefer conditional render patterns
Use ternaries for conditional render instead of short-circuit chains.

```tsx
{isReady ? <Panel /> : null}
```

### Avoid hydration flicker
Inline client-only data carefully or guard with suspense.

```tsx
{isClient ? <Clock /> : null}
```

### Suppress expected hydration warnings
Use suppressHydrationWarning only for known mismatches.

```tsx
<span suppressHydrationWarning>{serverValue}</span>
```

### Animate wrappers, not SVGs
Wrap SVGs in divs when animating to reduce layout cost.

```tsx
<div className="spin"><LogoIcon /></div>
```

## Common Mistakes

### Inline heavy JSX in render
Wrong
```tsx
return <div>{expensiveTree()}</div>;
```
Correct
```tsx
const Tree = <div>{expensiveTree()}</div>;
return Tree;
```
Explanation: Hoisting static JSX reduces render work.

### Overusing suppressHydrationWarning
Wrong
```tsx
<span suppressHydrationWarning>{Date.now()}</span>
```
Correct
```tsx
{isClient ? <span>{Date.now()}</span> : null}
```
Explanation: Avoid hiding real hydration issues.

### Short-circuit rendering numeric values
Wrong
```tsx
{count && <Badge />}
```
Correct
```tsx
{count > 0 ? <Badge /> : null}
```
Explanation: `0` is rendered when count is zero, causing unexpected output.
