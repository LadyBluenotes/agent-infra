---
name: skills/performance/ref/loading
description: >
  Resource hint reference for HTML loading decisions. Use when the main HTML
  skill needs more detail on `preload`, `prefetch`, `preconnect`, or
  `dns-prefetch` tradeoffs.
type: reference
category: performance
sources:
  - https://css-tricks.com/prefetching-preloading-prebrowsing/
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
---

# Loading References

## Primary Distinctions

| Hint | Best for | Risk when misused |
| --- | --- | --- |
| `dns-prefetch` | Hostname resolution for likely future third-party work | Low value if the origin is never used |
| `preconnect` | Origins you know the page will hit soon | Extra connection setup if prediction is wrong |
| `preload` | Current-navigation critical assets | Priority inflation and bandwidth contention |
| `prefetch` | Likely future navigations or low-priority assets | No guarantee it completes when you need it |
| `prerender` | Extremely high-confidence next navigation | Very wasteful if the prediction is wrong |

## Decision Patterns

### Use `preconnect` for guaranteed cross-origin fetches

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Good fit for external font, CDN, or API origins the page will certainly contact early.

### Use `preload` only for current-page critical assets

```html
<link rel="preload" href="/assets/hero.css" as="style" />
<link rel="preload" href="/fonts/body-400.woff2" as="font" type="font/woff2" crossorigin />
```

Reserve it for assets that are definitely needed for the current navigation and whose earlier discovery matters.

### Use `prefetch` for likely next steps, not current render work

```html
<link rel="prefetch" href="/checkout" />
```

This is a prediction hint for later work and should not replace normal critical-path loading.

## Common Misreads

- `preload` is not a generic speed-up switch; it increases priority.
- `prefetch` is not reliable enough for current-page dependencies.
- `preconnect` is stronger than `dns-prefetch`; do not add both everywhere without reason.
- `prerender` is rarely appropriate outside highly predictable flows.
