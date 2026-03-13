---
name: skills/performance/fonts
description: >
  Webfont loading guidance for payload size, connection setup, and readable
  rendering. Use when tuning WOFF2 delivery, preconnect hints, variant count,
  or `font-display` strategy.
type: sub-skill
category: performance
sources:
  - https://github.com/thedaviddias/Front-End-Performance-Checklist
  - https://www.zachleat.com/web/comprehensive-webfonts/#font-face
---

# Font Performance

## Setup
Use this when custom fonts delay text rendering, inflate early payload, or cause visible instability during first paint.

## Core Patterns

### Prefer modern formats with clear fallbacks

```css
@font-face {
  font-family: "Acme Sans";
  src:
    url("/fonts/acme-sans.woff2") format("woff2"),
    url("/fonts/acme-sans.woff") format("woff");
  font-display: swap;
}
```

Use WOFF2 first, keep fallback formats only as needed, and make fallback rendering explicit.

### Preconnect only the font origins you actually need

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

`preconnect` is most useful when the page will definitely fetch font files from another origin soon.

### Keep font payload and variants tight

```text
Preferred:
- 1 family for body text
- 1 family for display text
- only the weights actually used in the UI
```

Payload discipline usually helps more than fancy loading tricks, especially on slower mobile devices.

### Favor readable fallback behavior over invisible text

```css
@font-face {
  font-family: "Acme Sans";
  src: url("/fonts/acme-sans.woff2") format("woff2");
  font-display: fallback;
}
```

Choose a strategy that keeps text readable if the font is late or fails to load.

## Common Mistakes

### HIGH Shipping many unused weights and styles

```text
Wrong:
- 100, 200, 300, 400, 500, 600, 700, 800, 900
- roman + italic for each
```

```text
Correct:
- 400 and 700 only if that is what the UI uses
- add new variants only when the design actually needs them
```

Extra weights and styles add transfer cost and connection pressure long before users benefit from them.

### HIGH Accepting invisible text as the default behavior

```css
/* Wrong */
@font-face {
  font-family: "Brand Serif";
  src: url("/fonts/brand-serif.woff2") format("woff2");
}
```

```css
/* Correct */
@font-face {
  font-family: "Brand Serif";
  src: url("/fonts/brand-serif.woff2") format("woff2");
  font-display: swap;
}
```

When fallback behavior is not declared, users can get FOIT instead of readable content.

### MEDIUM Spraying `preconnect` and `preload` across every font file

```html
<!-- Wrong -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/fonts/body-400.woff2" as="font" crossorigin />
<link rel="preload" href="/fonts/body-700.woff2" as="font" crossorigin />
<link rel="preload" href="/fonts/body-italic.woff2" as="font" crossorigin />
<link rel="preload" href="/fonts/display-700.woff2" as="font" crossorigin />
```

```html
<!-- Correct -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/fonts/body-400.woff2" as="font" type="font/woff2" crossorigin />
```

Preloading too many fonts can compete with more important assets and weaken the benefit of the hint.

### MEDIUM Treating font files as separate from overall page budget

```text
Wrong:
- optimize JS and images
- never count font bytes in budgets
```

```text
Correct:
- include font bytes and variant count in page budgets
- review them during performance regressions
```

Font payload is part of the same early-page budget and should not escape review just because it lives in typography.

## References

- @skills/performance/references/font-loading.md
