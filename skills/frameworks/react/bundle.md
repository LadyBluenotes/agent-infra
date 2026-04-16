---
name: skills/frameworks/react/bundle
description: >
  React and Next.js bundle-size guidance for code splitting, dependency audits,
  lazy loading, server/client boundaries, and reducing shipped JavaScript.
type: sub-skill
category: frameworks
library: react
library_version: "18"
sources:
  - https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
---

# Bundle Optimization

## Setup
Use this when optimizing bundle size or load time in React or Next.js.

```ts
import dynamic from "next/dynamic";
import Script from "next/script";

const Chart = dynamic(() => import("@/components/Chart"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Script src="https://example.com/analytics.js" strategy="afterInteractive" />
      <Chart />
    </>
  );
}
```

## Core Patterns

### Avoid barrel imports
Import directly from the module to reduce unused exports.

```ts
import { Button } from "@/components/Button";
```

### Use dynamic imports for heavy components
Load large components only when needed.

```ts
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
```

### Defer third-party scripts
Load analytics and logging after hydration.

```tsx
<Script src="https://example.com/analytics.js" strategy="afterInteractive" />
```

### Load conditionally
Only load modules when a feature is active.

```ts
const DebugPanel = isDebug
  ? dynamic(() => import("@/components/DebugPanel"))
  : null;
```

### Preload on intent
Preload on hover or focus for perceived speed.

```ts
const Settings = dynamic(() => import("@/components/Settings"));
const preloadSettings = () => Settings.preload();
```

### Avoid loading entire utility bundles
Import only what you use to reduce output size.

```ts
import debounce from "lodash/debounce";
```

## Common Mistakes

### Barrel imports everywhere
Wrong
```ts
import { BigWidget } from "@/components";
```
Correct
```ts
import { BigWidget } from "@/components/BigWidget";
```
Explanation: Barrel files can pull in unused code and bloat bundles.

### Eager third-party scripts
Wrong
```ts
import "third-party-analytics";
```
Correct
```ts
<Script src="https://example.com/analytics.js" strategy="afterInteractive" />
```
Explanation: Defer non-critical scripts until after hydration.

### Importing heavy components unconditionally
Wrong
```ts
import Editor from "@/components/Editor";
```
Correct
```ts
const Editor = dynamic(() => import("@/components/Editor"));
```
Explanation: Dynamic imports keep heavy components out of the initial bundle.

### Preloading without user intent
Wrong
```ts
const Settings = dynamic(() => import("@/components/Settings"));
Settings.preload();
```
Correct
```ts
const Settings = dynamic(() => import("@/components/Settings"));
const preloadSettings = () => Settings.preload();
```
Explanation: Preload on intent to avoid unnecessary work.
