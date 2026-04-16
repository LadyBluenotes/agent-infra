---
name: skills/performance/html
description: >
  Front-end HTML loading patterns for render path performance. Use when
  reviewing document order, iframes, resource hints, and production HTML
  output.
type: sub-skill
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
  - https://css-tricks.com/prefetching-preloading-prebrowsing/
---

# HTML Performance

## Setup
Use this when the bottleneck is in initial document delivery, render-blocking resource order, or speculative loading choices in the HTML shell.

## Core Patterns

### Keep production HTML lean

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Product</title>
  </head>
  <body>
    <main>...</main>
  </body>
</html>
```

Ship minified production HTML so comments, extra whitespace, and dead markup do not add unnecessary transfer cost.

### Load CSS before JavaScript

```html
<head>
  <link rel="stylesheet" href="/assets/app.css" />
  <script defer src="/assets/app.js"></script>
</head>
```

Put styles before scripts so the browser can discover render-critical CSS as early as possible.

### Use resource hints by certainty

```html
<head>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="preload" href="/assets/hero.css" as="style" />
  <link rel="prefetch" href="/pricing" />
</head>
```

Use `preload` for current-navigation critical assets, `preconnect` for origins you know you will hit soon, and `prefetch` only for likely future work.

### Treat iframes as expensive embeds

```html
<iframe
  src="https://www.youtube.com/embed/example"
  title="Demo video"
  loading="lazy"
  width="560"
  height="315"
></iframe>
```

Every iframe adds another browsing context and often more network, scripting, and layout work, so use them only when isolation is actually required.

## Common Mistakes

### HIGH Putting scripts before critical CSS

```html
<!-- Wrong -->
<script defer src="/assets/app.js"></script>
<link rel="stylesheet" href="/assets/app.css" />
```

```html
<!-- Correct -->
<link rel="stylesheet" href="/assets/app.css" />
<script defer src="/assets/app.js"></script>
```

The wrong order delays stylesheet discovery and can extend the render path.

### HIGH Using `preload` for non-critical assets

```html
<!-- Wrong -->
<link rel="preload" href="/assets/gallery-12.jpg" as="image" />
<link rel="preload" href="/assets/gallery-13.jpg" as="image" />
<link rel="preload" href="/assets/gallery-14.jpg" as="image" />
```

```html
<!-- Correct -->
<link rel="preload" href="/assets/app.css" as="style" />
<link rel="prefetch" href="/gallery" />
```

Overusing `preload` raises fetch priority for the wrong assets and can steal bandwidth from the real critical path.

### MEDIUM Treating `prefetch` like a guaranteed current-page load

```html
<!-- Wrong -->
<link rel="prefetch" href="/assets/app.css" />
```

```html
<!-- Correct -->
<link rel="preload" href="/assets/app.css" as="style" />
```

`prefetch` is only a low-priority hint for likely future work and may not complete in time for the current navigation.

### MEDIUM Embedding unnecessary third-party iframes above the fold

```html
<!-- Wrong -->
<iframe src="https://third-party.example/widget"></iframe>
<iframe src="https://third-party.example/chat"></iframe>
```

```html
<!-- Correct -->
<button type="button">Open chat</button>
```

Multiple eager iframes add network, scripting, and layout cost before the main page is stable.

## References

- @skills/performance/ref/loading.md
