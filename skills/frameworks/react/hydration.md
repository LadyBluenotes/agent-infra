---
name: skills/frameworks/react/hydration
description: >
  React hydration guidance for deterministic first render, browser-only APIs,
  suppressHydrationWarning, RSC/client boundaries, and DOM mutation risks.
type: sub-skill
category: frameworks
library: react
library_version: "19"
depth: primary
aliases:
  - react hydration
tags:
  - react
  - hydration
  - ssr
  - rsc
references:
  - skills/frameworks/react/server
  - skills/frameworks/react/ref/rsc-markdown
sources:
  - https://react.dev/reference/react-dom/client/hydrateRoot
  - https://react.dev/reference/react/useEffect
---

# React Hydration

## Setup

```tsx
import { useEffect, useState } from 'react'

export function ThemeLabel() {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ?? 'system')
  }, [])

  return <span>{theme}</span>
}
```

## Core Patterns

### Make the first client render match the server

```tsx
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
}, [])
```

Use a second client pass only when the UI genuinely depends on browser-only data.

### Move browser-only reads out of render

```tsx
// Wrong during hydration
const theme = localStorage.getItem('theme')
```

```tsx
// Correct
useEffect(() => {
  setTheme(localStorage.getItem('theme') ?? 'system')
}, [])
```

`window`, `localStorage`, `matchMedia`, and time-dependent values can make server and first client output differ.

### Treat hydration mismatches as bugs

```text
Fix mismatched attributes, text, and element structure at the source.
```

Use `suppressHydrationWarning` only for narrow unavoidable text or attribute differences.

## Common Mistakes

### HIGH Mutating server-rendered DOM outside React

```tsx
// Wrong
document.querySelectorAll('h2').forEach((el) => {
  el.dataset.blockId = crypto.randomUUID()
})
```

```tsx
// Correct
return <h2 data-block-id={blockId}>{children}</h2>
```

Imperative mutations can leave server DOM attributes that React does not expect during hydration.

### HIGH Using `typeof window` to render different markup

```tsx
// Wrong
return typeof window === 'undefined' ? null : <ClientOnly />
```

```tsx
// Correct
return isClient ? <ClientOnly /> : null
```

The initial client render still needs to match server output.
