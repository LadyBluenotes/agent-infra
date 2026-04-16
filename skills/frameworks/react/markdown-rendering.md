---
name: skills/frameworks/react/markdown-rendering
description: >
  React markdown rendering guidance for SSR/RSC boundaries, react-markdown,
  raw HTML handling, sanitization, hydration safety, and bundle-aware choices.
type: sub-skill
category: frameworks
library: react
depth: primary
aliases:
  - react markdown
  - markdown rendering
tags:
  - react
  - markdown
  - rsc
  - hydration
  - xss
references:
  - skills/frameworks/react/hydration
  - skills/frameworks/react/ref/rsc-markdown
  - skills/javascript/security
sources:
  - https://react.dev/reference/rsc/server-components
  - https://react.dev/reference/react-dom/client/hydrateRoot
  - https://github.com/remarkjs/react-markdown
  - https://github.com/rehypejs/rehype-sanitize
  - https://github.com/rehypejs/rehype-raw
---

# React Markdown Rendering

## Setup

Use this when adding markdown rendering to React, Next, static docs, MDX-adjacent pages, or user-authored content.

```tsx
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownBody({ source }: { source: string }) {
  return <Markdown remarkPlugins={[remarkGfm]}>{source}</Markdown>
}
```

## Core Patterns

### Choose the render boundary first

```text
Static or trusted content: prefer server/build-time rendering when the framework supports it.
Interactive markdown widgets: render client-side only when interactivity requires it.
User-authored HTML: sanitize or skip raw HTML.
```

React's Server Components docs use markdown rendering as an example of work that can stay out of the client bundle when done on the server.

### Keep first render deterministic

```tsx
// Avoid client-only markdown transforms during initial hydrated render
return <Markdown>{source}</Markdown>
```

For SSR hydration, React expects the first client render to match server output. Load browser-only transforms after hydration or keep markdown processing on the server.

### Treat raw HTML as unsafe until proven otherwise

```tsx
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

<Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
  {source}
</Markdown>
```

Use `rehype-sanitize` after unsafe HTML-producing transforms. If raw HTML is not required, leave it disabled or skip it.

### Route deeper cases to refs

```text
RSC/static markdown: @skills/frameworks/react/ref/rsc-markdown.md
Hydration mismatches: @skills/frameworks/react/hydration.md
Untrusted input: @skills/javascript/security.md
```

Load the narrow reference only when that risk appears.

## Common Mistakes

### HIGH Using raw HTML without sanitization

```tsx
// Wrong for untrusted content
<Markdown rehypePlugins={[rehypeRaw]}>{source}</Markdown>
```

```tsx
// Safer pattern when raw HTML is required
<Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{source}</Markdown>
```

The rehype-sanitize docs recommend sanitizing HTML when authors or plugins are not fully trusted.

### HIGH Hydrating different markdown output

```text
Wrong: server uses one plugin set, client uses another during first render.
Correct: keep the same serialized output or the same deterministic plugin chain.
```

Hydration mismatches are bugs unless a narrow React escape hatch is deliberately used.

### MEDIUM Turning docs content into client bundle work

```text
Wrong: parse static markdown in a client effect by default.
Correct: render static markdown at build/server time when the stack supports it.
```

Server-side rendering keeps non-interactive markdown work away from the client path.
