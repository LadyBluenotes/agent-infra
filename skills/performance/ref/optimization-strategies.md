---
name: skills/performance/ref/optimization-strategies
description: >
  LCP optimization strategy reference for resource discovery, preload,
  fetchpriority, lazy loading, render-blocking CSS and JS, image sizing, CDN
  placement, caching, redirects, and TTFB.
type: reference
category: performance
depth: reference
aliases:
  - lcp optimization strategies
tags:
  - lcp
  - performance
  - optimization
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/debug-optimize-lcp/references/optimization-strategies.md
---

# LCP Optimization Strategies

## Eliminate resource load delay

- Ensure the LCP resource is discoverable in the initial HTML response.
- Use `<link rel="preload">` with `fetchpriority="high"` for critical images or fonts when appropriate.
- Do not set `loading="lazy"` on the LCP image.
- Use `fetchpriority="high"` on the LCP `<img>` when browser support and markup ownership fit.
- Use same-origin critical resources or preconnect to required origins.

## Eliminate element render delay

- Inline critical CSS and defer non-critical CSS.
- Avoid synchronous scripts in `<head>`.
- Deliver complete initial markup with SSR when the app owns rendering.
- Break up long JavaScript tasks that block rendering.

## Reduce resource load duration

- Serve appropriate image sizes and modern formats.
- Compress images and fonts.
- Use CDN placement for user proximity.
- Use efficient `Cache-Control` policies.

## Reduce TTFB

- Remove unnecessary redirects.
- Cache static HTML at the edge when safe.
- Move latency-sensitive dynamic work closer to users when architecture allows.
- Preserve back/forward cache eligibility.
