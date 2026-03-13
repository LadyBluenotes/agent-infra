---
name: skills/performance/references/css-delivery
description: >
  Deeper CSS delivery reference for critical CSS, split versus concatenated
  files, and non-blocking stylesheet tradeoffs.
type: reference
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
---

# CSS Delivery References

## Critical CSS Scope

- Keep the inline slice limited to what is required for first paint.
- Move route-specific and below-the-fold styling into external stylesheets.
- Revisit critical CSS whenever the hero, nav, or shell markup changes.

## Split vs Concatenate

- Concatenate when many tiny CSS files create request overhead and do not cache independently.
- Keep files split when route-specific CSS can be cached or invalidated separately.
- Prefer measurement over dogma; HTTP/2 and HTTP/3 often change the tradeoff.

## Non-Blocking Delivery Caveat

```html
<link rel="preload" href="/assets/app.css" as="style" onload="this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="/assets/app.css" /></noscript>
```

- This pattern can help when stylesheet discovery is late, but it must be tested because incorrect use can complicate loading behavior.
- Keep the main skill focused on the goal: reduce blocking without hiding essential CSS from the browser.
