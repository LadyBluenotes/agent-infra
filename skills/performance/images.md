---
name: skills/performance/images
description: >
  Image delivery guidance for compression, format selection, responsive
  sources, explicit dimensions, and offscreen loading. Use when image bytes or
  layout shifts dominate front-end performance.
type: sub-skill
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
  - https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
---

# Image Performance

## Setup
Use this when page weight, LCP, or layout stability is being dominated by images.

## Core Patterns

### Compress images and pick the right format

```text
Selection guide:
- photos -> JPEG or modern equivalents such as WebP or AVIF
- logos and simple illustrations -> SVG
- transparency-heavy raster assets -> PNG or modern equivalent after testing
```

Format choice usually matters as much as compression level, so decide per image rather than by habit.

### Reserve layout space up front

```html
<img
  src="/images/product-card.webp"
  alt="Green running shoe"
  width="640"
  height="480"
  loading="lazy"
/>
```

Set `width` and `height` when the rendered asset size is known so the browser can allocate space before the image loads.

### Serve responsive variants instead of oversized assets

```html
<img
  src="/images/hero-800.webp"
  srcset="/images/hero-480.webp 480w, /images/hero-800.webp 800w, /images/hero-1200.webp 1200w"
  sizes="(max-width: 48rem) 100vw, 50vw"
  alt="Runner on a mountain trail"
  width="1200"
  height="800"
/>
```

Use `srcset` and `sizes` so smaller screens do not download desktop-sized assets.

### Lazy load only offscreen media

```html
<img src="/images/gallery-12.webp" alt="Gallery image" loading="lazy" width="400" height="300" />
```

Defer images users cannot see yet, but keep above-the-fold imagery eager enough for a fast first impression.

## Common Mistakes

### HIGH Shipping the same large image to every device

```html
<!-- Wrong -->
<img src="/images/hero-2400.jpg" alt="Runner" />
```

```html
<!-- Correct -->
<img
  src="/images/hero-800.webp"
  srcset="/images/hero-480.webp 480w, /images/hero-800.webp 800w, /images/hero-1200.webp 1200w"
  sizes="100vw"
  alt="Runner"
  width="1200"
  height="800"
/>
```

One oversized source forces small screens to pay desktop transfer cost for no visual gain.

### HIGH Omitting intrinsic dimensions on known-size images

```html
<!-- Wrong -->
<img src="/images/product.webp" alt="Product" />
```

```html
<!-- Correct -->
<img src="/images/product.webp" alt="Product" width="640" height="640" />
```

Without reserved dimensions, the layout shifts when the image finally arrives.

### MEDIUM Lazy loading the hero image

```html
<!-- Wrong -->
<img src="/images/hero.webp" alt="Hero" loading="lazy" />
```

```html
<!-- Correct -->
<img src="/images/hero.webp" alt="Hero" width="1280" height="720" />
```

Lazy loading first-viewport imagery can delay LCP instead of improving the page.

### MEDIUM Using base64 for ordinary content images

```text
Wrong:
- inline a full illustration as a base64 data URI in HTML or CSS
```

```text
Correct:
- reserve base64 only for tiny niche assets after measurement
- keep normal images as cacheable files
```

Base64 grows payload size, weakens caching, and quickly becomes counterproductive outside very small assets.

## References

- @skills/performance/references/responsive-images.md
