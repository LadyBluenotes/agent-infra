---
name: skills/frameworks/react/ref/rsc-markdown
description: >
  React RSC markdown rendering reference for hydration-safe generated markup,
  heading transforms, nested anchors, and client/server prop parity.
type: reference
category: frameworks
library: react
library_version: "19"
depth: reference
tags:
  - react
  - rsc
  - markdown
  - hydration
sources:
  - https://react.dev/reference/react-dom/client/hydrateRoot
---

# React RSC Markdown Reference

## Setup

Use this when markdown is rendered on the server and enhanced by client components.

## Core Patterns

### Keep generated markup deterministic

```text
Server markdown transform output must match the first client render.
```

IDs, anchors, heading text, and wrapper elements should be stable across server and client paths.

### Collect heading data before permalink injection

```text
Preferred order:
1. derive TOC text from heading children
2. inject permalink anchors
```

Collecting after permalink injection can add `#` or anchor text into the TOC.

### Avoid nested anchors

```html
<!-- Wrong -->
<a href="/docs"><h2><a href="#title">#</a>Title</h2></a>
```

```html
<!-- Correct -->
<h2 id="title"><a href="#title">Title</a></h2>
```

Markdown plugins and link components can accidentally create invalid anchor nesting.

## Common Mistakes

### HIGH Adding client-only attributes after server render

```text
Wrong: mutate `data-block-id` from an effect on server-rendered markdown.
Correct: render the attribute through React state/props or keep it out of hydrated markup.
```

React may warn because the server DOM and client props differ.
