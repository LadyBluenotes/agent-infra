---
name: skills/performance/references/responsive-images
description: >
  Deeper responsive-image reference for `srcset`, `sizes`, density
  descriptors, and art-direction patterns with `<picture>`.
type: reference
category: performance
sources:
  - https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
---

# Responsive Image References

## Two Different Problems

| Problem | Primary tool | Goal |
| --- | --- | --- |
| Resolution switching | `img[srcset]` with `sizes` or density descriptors | Send an appropriately sized file |
| Art direction | `<picture>` with `<source media>` | Send a different crop or composition |

## Resolution Switching

```html
<img
  src="/images/card-800.webp"
  srcset="/images/card-400.webp 400w, /images/card-800.webp 800w, /images/card-1200.webp 1200w"
  sizes="(max-width: 40rem) 100vw, 33vw"
  alt="Product card"
  width="1200"
  height="900"
/>
```

Use width descriptors plus `sizes` when the rendered slot changes with layout.

## Fixed Slot Density Example

```html
<img
  src="/images/avatar@1x.webp"
  srcset="/images/avatar@1x.webp 1x, /images/avatar@2x.webp 2x"
  alt="Avatar"
  width="64"
  height="64"
/>
```

Use density descriptors when the rendered slot size is fixed and only screen density varies.

## Art Direction

```html
<picture>
  <source media="(max-width: 48rem)" srcset="/images/hero-mobile.webp" />
  <source media="(min-width: 48.001rem)" srcset="/images/hero-desktop.webp" />
  <img src="/images/hero-desktop.webp" alt="Runner on a ridge" width="1440" height="900" />
</picture>
```

Use `<picture>` when the crop or composition should change, not just the file size.

## Common Misreads

- Do not rely on JS swaps after page load for responsive image selection.
- Keep a fallback `src` and `alt` on the `img` inside `<picture>`.
- Include the viewport meta tag so mobile browsers choose candidates against the real layout width.
