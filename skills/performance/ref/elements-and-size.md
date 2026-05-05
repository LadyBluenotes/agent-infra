---
name: skills/performance/ref/elements-and-size
description: >
  LCP element and size reference for eligible element types, Chromium
  exclusions, visible area rules, and text/image sizing.
type: reference
category: performance
depth: reference
aliases:
  - lcp elements
  - lcp size
tags:
  - lcp
  - performance
  - chromium
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/debug-optimize-lcp/references/elements-and-size.md
---

# LCP Elements And Size

## Eligible elements

- `<img>` elements, including the first frame presentation time for animated content.
- `<image>` elements inside SVG.
- `<video>` elements, using poster image load time or first frame presentation time.
- Elements with background images loaded through `url()`.
- Block-level elements containing text nodes or inline text children.

## Chromium exclusions

Chromium-based browsers exclude likely non-contentful elements, including
zero-opacity elements, full-viewport background-like elements, placeholder
images, and low-entropy images.

## Size rules

- Visible area usually determines size.
- Clipped or overflow portions do not count.
- Image elements use the smaller of visible size and intrinsic size.
- Text uses the smallest rectangle containing all text nodes.
- Margin, padding, and borders do not count toward size.
