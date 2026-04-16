---
name: skills/performance/css
description: >
  CSS delivery and stylesheet hygiene for front-end performance. Use when
  reducing CSS bytes, blocking behavior, unused selectors, or critical-path
  style work.
type: sub-skill
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
---

# CSS Performance

## Setup
Use this when pages are slow to render because of blocking stylesheets, oversized CSS payloads, or stylesheet complexity.

## Core Patterns

### Minify production stylesheets

```text
Build step:
- compile CSS
- remove comments and whitespace
- emit minified production assets
```

Minification is table stakes because CSS ships on nearly every page and blocking bytes compound quickly.

### Inline only the critical slice

```html
<head>
  <style>
    .hero{display:grid;place-items:center;min-height:50vh}
    .cta{font-weight:700}
  </style>
  <link rel="stylesheet" href="/assets/app.css" />
</head>
```

Keep the above-the-fold CSS small and inline only what is needed for the first render, with the full stylesheet loaded separately.

### Remove dead selectors and duplicates

```text
Audit flow:
- inspect coverage
- remove unused selectors
- merge duplicated declarations
- re-measure shipped CSS bytes
```

Unused and duplicated CSS increases transfer size and also makes the browser do more selector matching work.

### Keep delivery strategy tied to transport reality

```html
<!-- HTTP/2+ can keep split files if the split is meaningful -->
<link rel="stylesheet" href="/assets/base.css" />
<link rel="stylesheet" href="/assets/checkout.css" />
```

Concatenation is not automatically correct anymore; keep or merge files based on actual request overhead and cache behavior, not older HTTP/1 defaults.

## Common Mistakes

### HIGH Inlining the whole stylesheet into the document

```html
<!-- Wrong -->
<body>
  <style>
    /* thousands of lines of app CSS */
  </style>
</body>
```

```html
<!-- Correct -->
<head>
  <style>.hero{min-height:50vh}</style>
  <link rel="stylesheet" href="/assets/app.css" />
</head>
```

Inlining the entire stylesheet bloats HTML, hurts caching, and makes every navigation pay the full CSS cost again.

### HIGH Treating every stylesheet as equally critical

```html
<!-- Wrong -->
<link rel="stylesheet" href="/assets/base.css" />
<link rel="stylesheet" href="/assets/admin.css" />
<link rel="stylesheet" href="/assets/print.css" />
```

```html
<!-- Correct -->
<link rel="stylesheet" href="/assets/base.css" />
<link rel="stylesheet" href="/assets/admin.css" media="(min-width: 64rem)" />
```

Loading non-critical CSS as if it were required for the first paint keeps the render path blocked longer than needed.

### MEDIUM Keeping framework reset and unused utilities by default

```text
Wrong:
- ship the full framework bundle
- add another reset
- never audit coverage
```

```text
Correct:
- confirm what the framework already includes
- remove duplicate reset or normalize code
- purge unused utilities in production
```

Framework CSS often includes far more than the page needs, so unreviewed defaults become permanent payload bloat.

### MEDIUM Concatenating blindly without measuring cache tradeoffs

```text
Wrong:
- merge every stylesheet into one file because older guidance said so
```

```text
Correct:
- compare request overhead, cache reuse, and invalidation scope before merging
```

One large file may increase churn and cache misses even if it reduces request count.

## References

- @skills/performance/ref/css-delivery.md
